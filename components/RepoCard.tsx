import Icon from "@/components/Icon";
import { fmtDate } from "@/lib/format";
import type { Repo } from "@/lib/queries";

/** Repository card. Opens the real repository on GitHub in a new tab. */
export default function RepoCard({ repo, owner }: { repo: Repo; owner?: string }) {
  return (
    <a className="repo-card" href={repo.url} target="_blank" rel="noopener noreferrer">
      <div className="repo-top">
        <span className="repo-name">
          <Icon name="github" size={15} /> {repo.name}
        </span>
        <Icon name="external" size={15} />
      </div>
      {owner && <span className="eyebrow">{owner}</span>}
      <p>{repo.description || "No description provided."}</p>
      {repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.slice(0, 5).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      <div className="repo-meta">
        {repo.language && (
          <span>
            <i className="lang-dot" /> {repo.language}
          </span>
        )}
        {repo.stars != null && (
          <span>
            <Icon name="star" size={13} /> {repo.stars}
          </span>
        )}
        {repo.forks != null && (
          <span>
            <Icon name="fork" size={13} /> {repo.forks}
          </span>
        )}
        {repo.updatedAt && <span className="repo-date">UPDATED {fmtDate(repo.updatedAt)}</span>}
      </div>
    </a>
  );
}
