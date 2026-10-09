import seedJson from "@/db/seed.json";
import { dbConfigured, query } from "@/lib/db";
import { readMinutes } from "@/lib/format";

/* ---------- types ---------- */
export type Education = {
  degree: string;
  field: string | null;
  institution: string;
  startYear: number | null;
  endYear: number | null; // null = present
  grade: string | null;
  description: string | null;
};
export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number | null;
  forks: number | null;
  url: string;
  topics: string[];
  updatedAt: string | null;
};
export type Certification = { name: string; issuer?: string; year?: number };
export type Member = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  about: string | null;
  location: string | null;
  email: string | null;
  avatarUrl: string | null;
  githubUsername: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  skills: string[];
  certifications: Certification[];
  education: Education[];
  repos: Repo[];
};
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: { slug: string; name: string } | null;
  publishedAt: string;
  readMinutes: number;
};
export type ContactItem = { label: string; value: string; href: string | null; icon: string };

/* ---------- helpers ---------- */
// JSON columns are TEXT so they work on both MySQL and MariaDB.
function parseJson<T>(v: unknown, fallback: T): T {
  if (v == null) return fallback;
  if (typeof v !== "string") return v as T;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

async function withFallback<T>(fromDb: () => Promise<T>, fromSeed: () => T): Promise<T> {
  if (!dbConfigured) return fromSeed();
  try {
    return await fromDb();
  } catch (err) {
    console.warn("[db] query failed, serving bundled sample data:", (err as Error).message);
    return fromSeed();
  }
}

/* ---------- seed fallback (used until a database is configured) ---------- */
type Seed = {
  team: (Omit<Member, "education" | "repos"> & { education: Education[]; repos: Repo[]; sortOrder?: number })[];
  blog: { slug: string; title: string; excerpt: string; content: string; category: string; tags: string[]; authorSlug: string; publishedAt: string }[];
  contact: ContactItem[];
  settings: Record<string, string>;
};
const seed = seedJson as unknown as Seed;

function seedTeam(): Member[] {
  return seed.team.map((m) => ({ ...m }));
}
function seedPosts(): Post[] {
  return seed.blog
    .map((p) => {
      const a = seed.team.find((m) => m.slug === p.authorSlug);
      return {
        slug: p.slug, title: p.title, excerpt: p.excerpt, content: p.content, category: p.category, tags: p.tags,
        author: a ? { slug: a.slug, name: a.name } : null,
        publishedAt: p.publishedAt, readMinutes: readMinutes(p.content),
      };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/* ---------- team ---------- */
type MemberRow = {
  id: number; slug: string; name: string; initials: string; role: string; bio: string; about: string | null;
  location: string | null; email: string | null; avatar_url: string | null; github_username: string | null;
  github_url: string | null; linkedin_url: string | null; skills: unknown; certifications: unknown;
};
type EduRow = {
  member_id: number; degree: string; field: string | null; institution: string; start_year: number | null;
  end_year: number | null; grade: string | null; description: string | null;
};
type RepoRow = {
  member_id: number; name: string; description: string | null; language: string | null; stars: number | null;
  forks: number | null; url: string; topics: unknown; updated_at: string | null;
};

async function teamFromDb(): Promise<Member[]> {
  const [members, edu, repos] = await Promise.all([
    query<MemberRow>("SELECT * FROM team_members ORDER BY sort_order, id"),
    query<EduRow>("SELECT * FROM member_education ORDER BY sort_order, id"),
    query<RepoRow>("SELECT * FROM member_repos ORDER BY sort_order, id"),
  ]);
  return members.map((m) => ({
    slug: m.slug, name: m.name, initials: m.initials, role: m.role, bio: m.bio, about: m.about,
    location: m.location, email: m.email, avatarUrl: m.avatar_url, githubUsername: m.github_username,
    githubUrl: m.github_url, linkedinUrl: m.linkedin_url,
    skills: parseJson<string[]>(m.skills, []),
    certifications: parseJson<Certification[]>(m.certifications, []),
    education: edu.filter((e) => e.member_id === m.id).map((e) => ({
      degree: e.degree, field: e.field, institution: e.institution, startYear: e.start_year,
      endYear: e.end_year, grade: e.grade, description: e.description,
    })),
    repos: repos.filter((r) => r.member_id === m.id).map((r) => ({
      name: r.name, description: r.description, language: r.language, stars: r.stars, forks: r.forks,
      url: r.url, topics: parseJson<string[]>(r.topics, []), updatedAt: r.updated_at,
    })),
  }));
}

export const getTeam = () => withFallback(teamFromDb, seedTeam);

/** Public GitHub repos for a username (cached 1h). Only used when the DB holds no repos for a member. */
async function liveRepos(username: string): Promise<Repo[]> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const list = (await res.json()) as {
      name: string; description: string | null; language: string | null; stargazers_count: number;
      forks_count: number; html_url: string; topics?: string[]; pushed_at: string | null; fork: boolean;
    }[];
    return list.filter((r) => !r.fork).map((r) => ({
      name: r.name, description: r.description, language: r.language, stars: r.stargazers_count,
      forks: r.forks_count, url: r.html_url, topics: r.topics ?? [], updatedAt: r.pushed_at?.slice(0, 10) ?? null,
    }));
  } catch {
    return [];
  }
}

export async function getMember(slug: string): Promise<Member | null> {
  const m = (await getTeam()).find((x) => x.slug === slug);
  if (!m) return null;
  if (m.repos.length === 0 && m.githubUsername) m.repos = await liveRepos(m.githubUsername);
  return m;
}

/* ---------- blog ---------- */
type PostRow = {
  slug: string; title: string; excerpt: string; content: string; category: string; tags: unknown;
  published_at: string; author_slug: string | null; author_name: string | null;
};

async function postsFromDb(): Promise<Post[]> {
  const rows = await query<PostRow>(
    `SELECT p.slug,p.title,p.excerpt,p.content,p.category,p.tags,p.published_at,
            t.slug AS author_slug,t.name AS author_name
       FROM blog_posts p LEFT JOIN team_members t ON t.id=p.author_id
      WHERE p.status='published' ORDER BY p.published_at DESC, p.id DESC`,
  );
  return rows.map((r) => ({
    slug: r.slug, title: r.title, excerpt: r.excerpt, content: r.content, category: r.category,
    tags: parseJson<string[]>(r.tags, []),
    author: r.author_slug ? { slug: r.author_slug, name: r.author_name ?? r.author_slug } : null,
    publishedAt: r.published_at.slice(0, 10), readMinutes: readMinutes(r.content),
  }));
}

export const getPosts = () => withFallback(postsFromDb, seedPosts);
export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug) ?? null;
}

/* ---------- contact / settings ---------- */
export const getContactInfo = () =>
  withFallback(
    async () => {
      const rows = await query<{ label: string; value: string; href: string | null; icon: string }>(
        "SELECT label,value,href,icon FROM contact_info ORDER BY sort_order,id",
      );
      return rows.map((r) => ({ label: r.label, value: r.value, href: r.href, icon: r.icon }));
    },
    () => seed.contact,
  );

export const getSettings = () =>
  withFallback(
    async () => {
      const rows = await query<{ k: string; v: string }>("SELECT k,v FROM site_settings");
      return Object.fromEntries(rows.map((r) => [r.k, r.v])) as Record<string, string>;
    },
    () => seed.settings,
  );
