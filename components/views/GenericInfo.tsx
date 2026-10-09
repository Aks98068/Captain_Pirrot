import PageHeader from "@/components/PageHeader";
import ArchiveGrid from "@/components/ArchiveGrid";
import { data } from "@/lib/data";

export default function GenericInfo({ kind }: { kind: string }) {
  const map: Record<string, [string, string, string]> = {
    "github-repo": [
      "REPOSITORY",
      "Zebra / source",
      "Repository metadata, release history, contributors, languages, topics, and documentation will synchronize from GitHub.",
    ],
    "ctf-detail": [
      "CTF EVENT",
      "Nullcon HackIM 2026",
      "Competition results, solved challenges, category distribution, team details, and related technical writeups.",
    ],
    "team-detail": [
      "RESEARCHER PROFILE",
      "Captain Pirrot",
      "Security researcher and open-source engineer working across application security, forensics, and technical education.",
    ],
  };
  const x = map[kind] || [
    "RESOURCE DETAIL",
    "Web Assessment Field Guide",
    "A structured, evidence-linked resource maintained by the Captain Pirrot collective.",
  ];
  return (
    <main className="page">
      <PageHeader label={x[0]} title={x[1]} intro={x[2]} />
      <section className="editorial-split">
        <div>
          <span className="eyebrow">01 / OVERVIEW</span>
          <h2>Structured for evidence, context, and continued work.</h2>
        </div>
        <div>
          <p>
            This page is designed as a database-driven detail view with related
            projects, research, writeups, and activity records connected through
            stable identifiers.
          </p>
          <p>
            Content provenance, update history, status, authorship, and external
            sources remain visible throughout.
          </p>
        </div>
      </section>
      <section className="related section">
        <ArchiveGrid items={data.projects.slice(0, 3)} base="projects" />
      </section>
    </main>
  );
}
