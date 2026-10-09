"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Link from "@/components/Link";
import { navGroups } from "@/lib/data";
import { useSearch } from "@/components/SearchProvider";

export default function Header() {
  const { openSearch } = useSearch();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  return (
    <header className="nav-shell">
      <nav className="navbar">
        <Link to="/">
          <Logo />
        </Link>
        <div className="desktop-nav">
          {["Research", "Projects", "Writeups", "CTF", "Blog"].map((item) => (
            <div
              className="nav-item"
              key={item}
              onMouseEnter={() => setDrop(item)}
              onMouseLeave={() => setDrop(null)}
            >
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              {drop === item &&
                (item === "Research" || item === "Projects") && (
                  <div className="dropdown">
                    <span className="eyebrow">{item} directory</span>
                    {(navGroups[item as keyof typeof navGroups] || []).map(
                      (x) => (
                        <Link key={x} to={`/${item.toLowerCase()}`}>
                          <span>{x}</span>
                          <Icon name="chevron" size={14} />
                        </Link>
                      ),
                    )}
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className="nav-actions">
          <button className="search-trigger" onClick={openSearch}>
            <Icon name="search" />
            <span>SEARCH</span>
            <kbd>⌘ K</kbd>
          </button>
          <Link to="/github" className="desktop-only">
            GitHub
          </Link>
          <Link to="/team" className="desktop-only">
            Team
          </Link>
          <Link to="/about" className="desktop-only">
            About
          </Link>
          <Link to="/contact" className="nav-cta desktop-only">
            CONTACT
          </Link>
          <button
            className="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="mobile-menu">
          {Object.entries(navGroups).map(([group, links]) => (
            <div key={group}>
              <span className="eyebrow">{group}</span>
              {links.map((x) => (
                <Link
                  key={x}
                  to={`/${x.toLowerCase().replaceAll(" ", "-")}`}
                  onClick={() => setOpen(false)}
                >
                  {x}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
