"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { data } from "@/lib/data";

export default function Admin() {
  const [section, setSection] = useState("Overview");
  const modules = [
    "Overview",
    "Projects",
    "Research",
    "Writeups",
    "Blog",
    "CTF",
    "Certificates",
    "Achievements",
    "GitHub",
    "Team",
    "Skills",
    "Resources",
    "Resume",
    "Contacts",
  ];
  return (
    <main className="admin">
      <aside className="admin-side">
        <Logo />
        <span className="eyebrow">WORKSPACE</span>
        {modules.map((x) => (
          <button
            className={section === x ? "active" : ""}
            onClick={() => setSection(x)}
            key={x}
          >
            <Icon name={x === "Overview" ? "grid" : "file"} />
            {x}
            {x === "Contacts" && <b>3</b>}
          </button>
        ))}
        <div className="admin-user">
          <span>CP</span>
          <div>
            <b>Captain Pirrot</b>
            <small>Administrator</small>
          </div>
        </div>
      </aside>
      <section className="admin-main">
        <header>
          <div>
            <span className="eyebrow">ADMIN / {section.toUpperCase()}</span>
            <h1>{section}</h1>
          </div>
          <Button icon="plus">
            NEW{" "}
            {section === "Overview"
              ? "ENTRY"
              : section.toUpperCase().replace(/S$/, "")}
          </Button>
        </header>
        {section === "Overview" ? (
          <>
            <div className="admin-stats">
              {[
                ["06", "Projects", "+1 this month"],
                ["04", "Published research", "1 in review"],
                ["18", "Writeups", "2 drafts"],
                ["03", "Unread contacts", "Requires response"],
              ].map((x) => (
                <div key={x[1]}>
                  <span>{x[1]}</span>
                  <strong>{x[0]}</strong>
                  <small>{x[2]}</small>
                </div>
              ))}
            </div>
            <div className="admin-panels">
              <div>
                <div className="panel-head">
                  <h2>Recent activity</h2>
                  <button>VIEW ALL</button>
                </div>
                {[
                  [
                    "Research published",
                    "Modern Session Boundaries",
                    "12 min ago",
                  ],
                  ["Project updated", "Zebra v0.8.2", "2 hr ago"],
                  ["Contact received", "Research collaboration", "Yesterday"],
                  ["Draft saved", "Linux Forensic Triage", "Yesterday"],
                ].map((x) => (
                  <div className="activity-row" key={x[1]}>
                    <i />
                    <div>
                      <b>{x[0]}</b>
                      <span>{x[1]}</span>
                    </div>
                    <small>{x[2]}</small>
                  </div>
                ))}
              </div>
              <div>
                <div className="panel-head">
                  <h2>Publishing status</h2>
                </div>
                {[
                  ["Published", "31"],
                  ["Draft", "06"],
                  ["In review", "03"],
                  ["Archived", "08"],
                ].map((x) => (
                  <div className="publish-row" key={x[0]}>
                    <span>{x[0]}</span>
                    <b>{x[1]}</b>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <ContentManager section={section} />
        )}
      </section>
    </main>
  );
}

function ContentManager({ section }: { section: string }) {
  const rows = data[section.toLowerCase()] || data.projects;
  return (
    <>
      <div className="manager-tools">
        <div>
          <Icon name="search" />
          <input placeholder={`Search ${section.toLowerCase()}…`} />
        </div>
        <select>
          <option>All statuses</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select>
          <option>Newest first</option>
          <option>Oldest first</option>
        </select>
      </div>
      <div className="admin-table">
        <div className="table-head">
          <span>TITLE</span>
          <span>CATEGORY</span>
          <span>STATUS</span>
          <span>UPDATED</span>
          <span></span>
        </div>
        {rows.map((x) => (
          <div className="table-row" key={x.slug}>
            <div>
              <b>{x.title}</b>
              <small>/{x.slug}</small>
            </div>
            <span>{x.category}</span>
            <span className="table-status">
              <i />
              {x.status || "Published"}
            </span>
            <span>{x.meta || "Today"}</span>
            <button>•••</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <span>
          Showing 1–{rows.length} of {rows.length}
        </span>
        <div>
          <button>←</button>
          <button className="active">1</button>
          <button>→</button>
        </div>
      </div>
    </>
  );
}
