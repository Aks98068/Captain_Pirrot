import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

export default function Resume() {
  return (
    <main className="page resume">
      <PageHeader
        label="CURRICULUM VITAE"
        title="Researcher. Engineer. Builder."
        intro="Independent security researcher focused on application security, digital forensics, open-source tooling, and technical education."
        aside={
          <div className="resume-buttons">
            <Button icon="download">DOWNLOAD PDF</Button>
            <Button variant="secondary" icon="file">
              PRINT RESUME
            </Button>
          </div>
        }
      />
      <section className="resume-grid">
        <aside>
          <span className="eyebrow">CONTACT</span>
          <p>
            research@captainpirrot.org
            <br />
            UTC +00:00
            <br />
            Available for select research collaborations
          </p>
          <span className="eyebrow">CORE DISCIPLINES</span>
          {[
            "Application Security",
            "Digital Forensics",
            "Security Engineering",
            "Reverse Engineering",
            "OSINT",
          ].map((x) => (
            <b key={x}>{x}</b>
          ))}
        </aside>
        <div>
          {[
            [
              "EXPERIENCE",
              "Independent Security Researcher",
              "Captain Pirrot Collective · 2023—Present",
              "Lead applied research, tooling, responsible disclosure, and technical publication across the collective.",
            ],
            [
              "EDUCATION",
              "Computer Science & Security",
              "Independent study / professional training",
              "Continuous study across systems, networks, application security, and evidence handling.",
            ],
            [
              "OPEN SOURCE",
              "Maintainer",
              "Zebra · Trace Evidence · Spectra",
              "Design and maintain focused security utilities with documented interfaces and reproducible releases.",
            ],
          ].map((x) => (
            <section key={x[0]}>
              <span className="eyebrow">{x[0]}</span>
              <h2>{x[1]}</h2>
              <b>{x[2]}</b>
              <p>{x[3]}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
