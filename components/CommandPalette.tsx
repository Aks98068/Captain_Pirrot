"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Link from "@/components/Link";

export type SearchItem = { type: string; slug: string; title: string; category: string };

export default function CommandPalette({
  open,
  close,
  items,
}: {
  open: boolean;
  close: () => void;
  items: SearchItem[];
}) {
  const [query, setQuery] = useState("");
  const all = items;
  const results = all
    .filter((x) =>
      `${x.title} ${x.category}`.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 7);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="command" onMouseDown={(e) => e.stopPropagation()}>
        <div className="command-input">
          <Icon name="search" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the Captain Pirrot archive…"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="command-results">
          <span className="eyebrow">
            {query ? `${results.length} results` : "Suggested"}
          </span>
          {results.map((x) => (
            <Link
              key={`${x.type}-${x.slug}`}
              to={`/${x.type}/${x.slug}`}
              onClick={close}
            >
              <div>
                <b>{x.title}</b>
                <span>
                  {x.type} · {x.category}
                </span>
              </div>
              <Icon name="chevron" />
            </Link>
          ))}
          {results.length === 0 && (
            <div className="empty">
              No results in the archive. Try a broader query.
            </div>
          )}
        </div>
        <div className="command-foot">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>Captain Pirrot Search v1.0</span>
        </div>
      </div>
    </div>
  );
}
