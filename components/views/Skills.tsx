import Icon from "@/components/Icon";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";

export default function Skills() {
  const groups = [
    [
      "PROGRAMMING",
      [
        ["TypeScript", "ADVANCED"],
        ["Python", "EXPERT"],
        ["Go", "ADVANCED"],
        ["Rust", "LEARNING"],
      ],
    ],
    [
      "SECURITY",
      [
        ["Web Assessment", "EXPERT"],
        ["Digital Forensics", "ADVANCED"],
        ["Reverse Engineering", "INTERMEDIATE"],
        ["Cloud Security", "INTERMEDIATE"],
      ],
    ],
    [
      "SYSTEMS",
      [
        ["Linux", "EXPERT"],
        ["Networking", "ADVANCED"],
        ["MySQL", "ADVANCED"],
        ["Docker", "ADVANCED"],
      ],
    ],
  ];
  return (
    <main className="page">
      <PageHeader
        label="CAPABILITY MAP"
        title="Evidence over percentages."
        intro="Skills are described by working proficiency and connected to the projects, research, and artifacts where they are actively applied."
      />
      <section className="skill-groups">
        {groups.map((g, gi) => (
          <div key={g[0] as string}>
            <span className="eyebrow">
              0{gi + 1} / {g[0]}
            </span>
            {(g[1] as string[][]).map((x) => (
              <div className="skill-row" key={x[0]}>
                <h3>{x[0]}</h3>
                <span className={`level ${x[1].toLowerCase()}`}>{x[1]}</span>
                <Link to="/projects">
                  EVIDENCE <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
