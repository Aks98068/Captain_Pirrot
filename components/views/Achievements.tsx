import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

export default function Achievements() {
  const years = [
    [
      "2026",
      "Top 50 · Nullcon HackIM",
      "CTF",
      "Ranked team finish across web, reverse, and forensic challenges.",
    ],
    [
      "2026",
      "Zebra reaches public beta",
      "OPEN SOURCE",
      "First stable extension API and reproducible graph exports.",
    ],
    [
      "2025",
      "Responsible disclosure acknowledged",
      "SECURITY RESEARCH",
      "Coordinated remediation of a high-impact authorization weakness.",
    ],
    [
      "2024",
      "Community mentor recognition",
      "COMMUNITY",
      "Supported an eight-week practical web security cohort.",
    ],
  ];
  return (
    <main className="page">
      <PageHeader
        label="ACHIEVEMENTS"
        title="Milestones, with evidence."
        intro="A chronological record of competition results, research outcomes, open-source progress, and community contribution."
      />
      <section className="achievement-timeline">
        {years.map((x, i) => (
          <div key={x[1]} className="achievement">
            <div className="year">{x[0]}</div>
            <i />
            <div>
              <span className="eyebrow">{x[2]}</span>
              <h2>{x[1]}</h2>
              <p>{x[3]}</p>
              <a href="#">
                VIEW SUPPORTING EVIDENCE <Icon name="external" />
              </a>
            </div>
            <span>0{i + 1}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
