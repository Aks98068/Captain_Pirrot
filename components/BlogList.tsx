"use client";

import { useMemo, useState } from "react";
import ArchiveGrid from "@/components/ArchiveGrid";
import type { Item } from "@/lib/data";

/** Category filter + newest/oldest toggle over posts that were loaded from the database. */
export default function BlogList({ items }: { items: (Item & { date: string })[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [active, setActive] = useState("All");
  const [newest, setNewest] = useState(true);

  const shown = items
    .filter((i) => active === "All" || i.category === active)
    .sort((a, b) => (newest ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

  return (
    <>
      <div className="filter-bar">
        <div>
          {categories.map((c) => (
            <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>
              {c}
            </button>
          ))}
        </div>
        <button className="sort" onClick={() => setNewest(!newest)}>
          {newest ? "LATEST FIRST" : "OLDEST FIRST"} <span>{newest ? "↓" : "↑"}</span>
        </button>
      </div>
      <section className="archive-wrap">
        {shown.length ? (
          <ArchiveGrid items={shown} base="blog" variant="list" />
        ) : (
          <p className="empty-note">No posts in this category yet.</p>
        )}
      </section>
    </>
  );
}
