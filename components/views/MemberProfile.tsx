import Icon from "@/components/Icon";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";
import RepoCard from "@/components/RepoCard";
import ArchiveGrid from "@/components/ArchiveGrid";
import { Avatar } from "@/components/TeamCard";
import { fmtDate } from "@/lib/format";
import type { Member, Post } from "@/lib/queries";

export default function MemberProfile({ m, posts }: { m: Member; posts: Post[] }) {
  const mine = posts.filter((p) => p.author?.slug === m.slug);
  return (
    <main className="page">
      <div className="detail-crumb">
        <Link to="/team">TEAM</Link>
        <span>/</span>
        <span>{m.name.toUpperCase()}</span>
      </div>
      <PageHeader
        label="MEMBER PROFILE"
        title={m.name}
        intro={m.bio}
        aside={<Avatar m={m} size="small" />}
      />

      <section className="profile-bar">
        <div>
          <span className="eyebrow">ROLE</span>
          <b>{m.role}</b>
        </div>
        {m.location && (
          <div>
            <span className="eyebrow">LOCATION</span>
            <b>
              <Icon name="pin" size={14} /> {m.location}
            </b>
          </div>
        )}
        <div className="profile-actions">
          <Link to={`/github/${m.slug}`} className="chip chip-solid">
            <Icon name="github" size={14} /> GITHUB PROJECTS
          </Link>
          {m.linkedinUrl && (
            <a className="chip" href={m.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={14} /> LINKEDIN
            </a>
          )}
          {m.githubUrl && (
            <a className="chip" href={m.githubUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="external" size={14} /> GITHUB PROFILE
            </a>
          )}
          {m.email && (
            <a className="chip" href={`mailto:${m.email}`}>
              <Icon name="mail" size={14} /> EMAIL
            </a>
          )}
        </div>
      </section>

      {m.about && (
        <section className="editorial-split">
          <div>
            <span className="eyebrow">01 / ABOUT</span>
            <h2>Background and focus.</h2>
          </div>
          <div>
            {m.about.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      <section className="section profile-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">02 / EDUCATION &amp; QUALIFICATIONS</span>
            <h2>Training and credentials.</h2>
          </div>
        </div>
        {m.education.length === 0 ? (
          <p>No education details have been added yet.</p>
        ) : (
          <div className="edu-list">
            {m.education.map((e, i) => (
              <div className="edu-row" key={i}>
                <strong>
                  {e.startYear ?? "—"}
                  <small>{e.startYear === e.endYear ? "" : ` – ${e.endYear ?? "PRESENT"}`}</small>
                </strong>
                <div>
                  <h3>
                    {e.degree}
                    {e.field ? ` · ${e.field}` : ""}
                  </h3>
                  <span className="eyebrow">{e.institution}</span>
                  {e.description && <p>{e.description}</p>}
                </div>
                {e.grade && <b className="badge">{e.grade}</b>}
              </div>
            ))}
          </div>
        )}

        {m.certifications.length > 0 && (
          <div className="profile-sub">
            <span className="eyebrow">CERTIFICATIONS</span>
            <div className="cert-grid">
              {m.certifications.map((c) => (
                <div key={c.name}>
                  <b>{c.name}</b>
                  <span>
                    {[c.issuer, c.year].filter(Boolean).join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {m.skills.length > 0 && (
          <div className="profile-sub">
            <span className="eyebrow">SKILLS</span>
            <div className="tag-row">
              {m.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {m.repos.length > 0 && (
        <section className="section profile-section">
          <div className="section-title">
            <div>
              <span className="eyebrow">03 / OPEN SOURCE</span>
              <h2>Repositories.</h2>
            </div>
            <Link to={`/github/${m.slug}`}>
              VIEW ALL {m.repos.length} <Icon name="arrow" />
            </Link>
          </div>
          <div className="repo-grid">
            {m.repos.slice(0, 3).map((r) => (
              <RepoCard repo={r} key={r.url} />
            ))}
          </div>
        </section>
      )}

      {mine.length > 0 && (
        <section className="section profile-section">
          <div className="section-title">
            <div>
              <span className="eyebrow">04 / WRITING</span>
              <h2>Posts by {m.name}.</h2>
            </div>
          </div>
          <ArchiveGrid
            items={mine.map((p) => ({
              title: p.title,
              slug: p.slug,
              category: p.category,
              description: p.excerpt,
              meta: fmtDate(p.publishedAt),
              tags: p.tags,
            }))}
            base="blog"
            variant="list"
          />
        </section>
      )}
    </main>
  );
}
