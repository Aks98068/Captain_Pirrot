// Creates the database + tables and loads db/seed.json.
// Usage:  npm run db:setup      (reads .env.local)
// Re-running updates team members and blog posts by slug; contact info/settings are only seeded when empty.
import mysql from "mysql2/promise";
import { readFileSync } from "node:fs";

const seed = JSON.parse(readFileSync(new URL("../db/seed.json", import.meta.url), "utf8"));
const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");

const dbName = process.env.DB_NAME || "captain_pirrot";
if (!/^[A-Za-z0-9_]+$/.test(dbName)) throw new Error("DB_NAME may only contain letters, numbers and underscores");

const conn = await mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  multipleStatements: true,
});

const json = (v) => (v == null ? null : JSON.stringify(v));

try {
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4`);
  await conn.query(`USE \`${dbName}\``);
  await conn.query(schema);
  console.log("✓ tables ready");

  const ids = {};
  for (const m of seed.team) {
    await conn.execute(
      `INSERT INTO team_members (slug,name,initials,role,bio,about,location,email,avatar_url,github_username,github_url,linkedin_url,skills,certifications,sort_order)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE name=VALUES(name),initials=VALUES(initials),role=VALUES(role),bio=VALUES(bio),about=VALUES(about),
         location=VALUES(location),email=VALUES(email),avatar_url=VALUES(avatar_url),github_username=VALUES(github_username),
         github_url=VALUES(github_url),linkedin_url=VALUES(linkedin_url),skills=VALUES(skills),certifications=VALUES(certifications),sort_order=VALUES(sort_order)`,
      [m.slug, m.name, m.initials, m.role, m.bio, m.about ?? null, m.location ?? null, m.email ?? null, m.avatarUrl ?? null,
       m.githubUsername ?? null, m.githubUrl ?? null, m.linkedinUrl ?? null, json(m.skills), json(m.certifications), m.sortOrder ?? 0],
    );
    const [[row]] = await conn.execute("SELECT id FROM team_members WHERE slug=?", [m.slug]);
    ids[m.slug] = row.id;
    await conn.execute("DELETE FROM member_education WHERE member_id=?", [row.id]);
    await conn.execute("DELETE FROM member_repos WHERE member_id=?", [row.id]);
    let i = 0;
    for (const e of m.education ?? []) {
      await conn.execute(
        "INSERT INTO member_education (member_id,degree,field,institution,start_year,end_year,grade,description,sort_order) VALUES (?,?,?,?,?,?,?,?,?)",
        [row.id, e.degree, e.field ?? null, e.institution, e.startYear ?? null, e.endYear ?? null, e.grade ?? null, e.description ?? null, i++],
      );
    }
    i = 0;
    for (const r of m.repos ?? []) {
      await conn.execute(
        "INSERT INTO member_repos (member_id,name,description,language,stars,forks,url,topics,updated_at,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [row.id, r.name, r.description ?? null, r.language ?? null, r.stars ?? null, r.forks ?? null, r.url, json(r.topics), r.updatedAt ?? null, i++],
      );
    }
  }
  console.log(`✓ ${seed.team.length} team members`);

  for (const p of seed.blog) {
    await conn.execute(
      `INSERT INTO blog_posts (slug,title,excerpt,content,category,tags,author_id,status,published_at)
       VALUES (?,?,?,?,?,?,?,'published',?)
       ON DUPLICATE KEY UPDATE title=VALUES(title),excerpt=VALUES(excerpt),content=VALUES(content),category=VALUES(category),
         tags=VALUES(tags),author_id=VALUES(author_id),published_at=VALUES(published_at)`,
      [p.slug, p.title, p.excerpt, p.content, p.category, json(p.tags), ids[p.authorSlug] ?? null, p.publishedAt],
    );
  }
  console.log(`✓ ${seed.blog.length} blog posts`);

  const [[{ n }]] = await conn.query("SELECT COUNT(*) AS n FROM contact_info");
  if (n === 0) {
    let i = 0;
    for (const c of seed.contact) {
      await conn.execute("INSERT INTO contact_info (label,value,href,icon,sort_order) VALUES (?,?,?,?,?)", [c.label, c.value, c.href ?? null, c.icon, i++]);
    }
  }
  for (const [k, v] of Object.entries(seed.settings)) {
    await conn.execute("INSERT IGNORE INTO site_settings (k,v) VALUES (?,?)", [k, v]);
  }
  console.log("✓ contact info + settings");
  console.log(`\nDone. Database "${dbName}" is ready.`);
} finally {
  await conn.end();
}
