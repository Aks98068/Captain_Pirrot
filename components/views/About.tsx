import PageHeader from "@/components/PageHeader";

export default function About() {
  return (
    <main className="page">
      <PageHeader
        label="ABOUT"
        title="Independent by design."
        intro="Captain Pirrot is a research collective for people who believe security work should be rigorous, useful, responsible, and open to scrutiny."
      />
      <section className="editorial-split">
        <div>
          <span className="eyebrow">01 / WHO WE ARE</span>
          <h2>
            Small enough to stay curious. Structured enough to do serious work.
          </h2>
        </div>
        <div>
          <p>
            We are security researchers, engineers, writers, and competitors
            working across offensive and defensive disciplines. The collective
            exists to turn careful inquiry into public value.
          </p>
          <p>
            We collaborate selectively with open-source communities, educators,
            researchers, and organizations whose work benefits from independent
            technical judgment.
          </p>
        </div>
      </section>
      <section className="beliefs">
        {[
          [
            "MISSION",
            "Make security knowledge more precise, practical, and accessible.",
          ],
          [
            "VISION",
            "A technical culture where responsible research improves systems before failure forces the lesson.",
          ],
          [
            "PHILOSOPHY",
            "Question assumptions. Preserve evidence. Publish clearly. Build what is missing.",
          ],
        ].map(([a, b], i) => (
          <div key={a}>
            <span>0{i + 1}</span>
            <h3>{a}</h3>
            <p>{b}</p>
          </div>
        ))}
      </section>
      <section className="timeline section">
        <div className="section-title">
          <div>
            <span className="eyebrow">04 / TIMELINE</span>
            <h2>An evolving record.</h2>
          </div>
        </div>
        {[
          [
            "2026",
            "Trace Evidence enters public beta",
            "The forensic collaboration platform opens to invited research teams.",
          ],
          [
            "2025",
            "Captain Pirrot becomes a collective",
            "Independent projects consolidate under a shared research philosophy.",
          ],
          [
            "2024",
            "First public tooling released",
            "Small assessment utilities become maintained open-source projects.",
          ],
          [
            "2023",
            "The first field notes",
            "A personal research archive begins with CTF notes and web security studies.",
          ],
        ].map((x) => (
          <div className="time-row" key={x[0] + x[1]}>
            <strong>{x[0]}</strong>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
