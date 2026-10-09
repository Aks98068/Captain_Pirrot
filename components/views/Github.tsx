import Icon from "@/components/Icon";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";
import RepoCard from "@/components/RepoCard";
import { Avatar } from "@/components/TeamCard";
import { getSettings, getTeam } from "@/lib/queries";

export default async function Github() {
  const [team, settings] = await Promise.all([getTeam(), getSettings()]);
  const all = team.flatMap((m) => m.repos.map((r) => ({ r, owner: m.name })));
  const stars = all.reduce((n, x) => n + (x.r.stars ?? 0), 0);
  const forks = all.reduce((n, x) => n + (x.r.forks ?? 0), 0);
  const synced = all.some((x) => x.r.stars != null);
  const langs = new Set(all.map((x) => x.r.language).filter(Boolean)).size;

  return (
    <main className="page">
      <PageHeader
        label="GITHUB / OPEN SOURCE"
        title="Engineering in the open."
        intro="Every repository maintained by the collective, grouped by member. Choose a member to see all of their projects."
        aside={
          settings.github_org_url ? (
            <a className="chip chip-solid" href={settings.github_org_url} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={14} /> ORGANIZATION ↗
            </a>
          ) : undefined
        }
      />
      <section className="github-stats">
        {[
          ["REPOSITORIES", String(all.length), "FROM DATABASE"],
          ["TOTAL STARS", synced ? String(stars) : "—", synced ? "SYNCED" : "NOT SYNCED"],
          ["TOTAL FORKS", synced ? String(forks) : "—", synced ? "SYNCED" : "NOT SYNCED"],
          ["LANGUAGES", String(langs), "ACROSS REPOSITORIES"],
        ].map(([label, value, note]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{note}</small>
          </div>
        ))}
      </section>

      <section className="section gh-members">
        <div className="section-title">
          <div>
            <span className="eyebrow">BY MEMBER</span>
            <h2>Choose a contributor.</h2>
          </div>
        </div>
        <div className="member-strip">
          {team.map((m) => (
            <Link to={`/github/${m.slug}`} className="member-chip" key={m.slug}>
              <Avatar m={m} size="small" />
              <div>
                <b>{m.name}</b>
                <span>
                  {m.repos.length} {m.repos.length === 1 ? "REPOSITORY" : "REPOSITORIES"}
                </span>
              </div>
              <Icon name="arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section gh-members">
        <div className="section-title">
          <div>
            <span className="eyebrow">ALL REPOSITORIES</span>
            <h2>Maintained by the collective.</h2>
          </div>
        </div>
        {all.length === 0 ? (
          <p>No repositories have been added yet.</p>
        ) : (
          <div className="repo-grid">
            {all.map(({ r, owner }) => (
              <RepoCard repo={r} owner={owner} key={r.url} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
