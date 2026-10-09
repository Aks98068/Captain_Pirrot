import Icon from "@/components/Icon";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";
import RepoCard from "@/components/RepoCard";
import type { Member } from "@/lib/queries";

export default function MemberGithub({ m, team }: { m: Member; team: Member[] }) {
  const stars = m.repos.reduce((n, r) => n + (r.stars ?? 0), 0);
  const forks = m.repos.reduce((n, r) => n + (r.forks ?? 0), 0);
  const synced = m.repos.some((r) => r.stars != null);
  const langs = [...new Set(m.repos.map((r) => r.language).filter(Boolean))] as string[];

  return (
    <main className="page">
      <div className="detail-crumb">
        <Link to="/github">GITHUB</Link>
        <span>/</span>
        <span>{m.name.toUpperCase()}</span>
      </div>
      <PageHeader
        label="GITHUB / MEMBER"
        title={`${m.name}'s projects.`}
        intro={`All repositories by ${m.name} — ${m.role.toLowerCase()}. Select a repository to open it on GitHub.`}
      />

      <section className="gh-toolbar">
        <div className="gh-switch">
          {team.map((t) => (
            <Link to={`/github/${t.slug}`} key={t.slug} className={t.slug === m.slug ? "active" : ""}>
              {t.name}
            </Link>
          ))}
        </div>
        <div className="profile-actions">
          {m.githubUrl && (
            <a className="chip chip-solid" href={m.githubUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={14} /> OPEN ON GITHUB ↗
            </a>
          )}
          {m.linkedinUrl && (
            <a className="chip" href={m.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={14} /> LINKEDIN
            </a>
          )}
          <Link to={`/team/${m.slug}`} className="chip">
            <Icon name="book" size={14} /> EDUCATION &amp; PROFILE
          </Link>
        </div>
      </section>

      <section className="github-stats">
        {[
          ["REPOSITORIES", String(m.repos.length)],
          ["STARS", synced ? String(stars) : "—"],
          ["FORKS", synced ? String(forks) : "—"],
          ["LANGUAGES", String(langs.length)],
        ].map(([label, value]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section gh-members">
        {m.repos.length === 0 ? (
          <div className="empty-state">
            <h3>No repositories listed yet.</h3>
            <p>
              {m.githubUrl
                ? "Public repositories will appear here once they are added or synced."
                : "This member has not linked a GitHub account."}
            </p>
          </div>
        ) : (
          <div className="repo-grid">
            {m.repos.map((r) => (
              <RepoCard repo={r} key={r.url} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
