"use client";

import { useState } from "react";

export default function FilterBar({
  types = [
    "All",
    "Web Security",
    "Network Security",
    "Reverse Engineering",
    "AI Security",
  ],
}: {
  types?: string[];
}) {
  const [active, setActive] = useState(types[0]);
  return (
    <div className="filter-bar">
      <div>
        {types.map((x) => (
          <button
            key={x}
            className={active === x ? "active" : ""}
            onClick={() => setActive(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <button className="sort">
        LATEST FIRST <span>↓</span>
      </button>
    </div>
  );
}
