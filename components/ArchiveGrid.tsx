import Icon from "@/components/Icon";
import Link from "@/components/Link";
import { type Item } from "@/lib/data";

export default function ArchiveGrid({
  items,
  base,
  variant = "cards",
}: {
  items: Item[];
  base: string;
  variant?: "cards" | "list";
}) {
  return (
    <div className={variant === "list" ? "archive-list" : "card-grid"}>
      {items.map((item, i) => (
        <Link
          to={`/${base}/${item.slug}`}
          className="content-card"
          key={item.slug}
        >
          <div className="card-top">
            <span>
              {String(i + 1).padStart(2, "0")} / {item.category}
            </span>
            <span
              className={`badge ${item.status?.toLowerCase().replace(" ", "-") || ""}`}
            >
              {item.status || item.meta}
            </span>
          </div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <div className="card-bottom">
            <div>
              {item.tags?.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Icon name="arrow" />
          </div>
        </Link>
      ))}
    </div>
  );
}
