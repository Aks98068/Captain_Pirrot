import Icon from "@/components/Icon";
import Link from "@/components/Link";
import type { Member } from "@/lib/queries";

export function Avatar({ m, size = "card" }: { m: Pick<Member, "name" | "initials" | "avatarUrl">; size?: "card" | "small" }) {
  return (
    <div className={`avatar ${size === "small" ? "avatar-small" : ""}`}>
      {m.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={m.avatarUrl} alt={m.name} />
      ) : (
        m.initials
      )}
      <span />
    </div>
  );
}

/** Team member card. Body -> profile (education), GitHub chip -> member's GitHub page, LinkedIn chip -> LinkedIn. */
export default function TeamCard({ m }: { m: Member }) {
  return (
    <article className="person">
      <Link to={`/team/${m.slug}`} className="person-main">
        <Avatar m={m} />
        <span className="eyebrow">{m.role}</span>
        <h2>{m.name}</h2>
        <p>{m.bio}</p>
      </Link>
      <div className="person-links">
        <Link to={`/github/${m.slug}`} className="chip">
          <Icon name="github" size={14} /> GITHUB{m.repos.length ? ` · ${m.repos.length}` : ""}
        </Link>
        {m.linkedinUrl && (
          <a className="chip" href={m.linkedinUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" size={14} /> LINKEDIN
          </a>
        )}
        <Link to={`/team/${m.slug}`} className="chip chip-solid">
          <Icon name="book" size={14} /> EDUCATION
        </Link>
      </div>
    </article>
  );
}
