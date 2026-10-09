import Link from "@/components/Link";
import ArchiveGrid from "@/components/ArchiveGrid";
import { data } from "@/lib/data";

export default function DetailPage({
  type,
  slug,
}: {
  type: string;
  slug: string;
}) {
  const item = data[type]?.find((x) => x.slug === slug) || data.research[0];
  const isProject = type === "projects";
  return (
    <main className="page detail-page">
      <div className="detail-crumb">
        <Link to={`/${type}`}>{type.toUpperCase()}</Link>
        <span>/</span>
        <span>{item.category.toUpperCase()}</span>
      </div>
      <section className="detail-hero">
        <div>
          <span className="eyebrow">
            {item.category} · {item.status || "Published"}
          </span>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="tag-row">
            {item.tags?.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <aside>
          <div>
            <span>STATUS</span>
            <b>{item.status || "Published"}</b>
          </div>
          <div>
            <span>UPDATED</span>
            <b>{item.meta || "18 JUN 2026"}</b>
          </div>
          <div>
            <span>REFERENCE</span>
            <b>CP/{type.toUpperCase()}/026</b>
          </div>
        </aside>
      </section>
      <div className="detail-layout">
        <aside className="toc">
          <span className="eyebrow">ON THIS PAGE</span>
          {(isProject
            ? [
                "Overview",
                "Problem",
                "Solution",
                "Features",
                "Architecture",
                "Technology stack",
                "Repository",
              ]
            : [
                "Abstract",
                "Objectives",
                "Method",
                "Findings",
                "Limitations",
                "References",
              ]
          ).map((x, i) => (
            <a href={`#${x.toLowerCase()}`} key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {x}
            </a>
          ))}
        </aside>
        <article className="article">
          <section>
            <span className="eyebrow">
              01 / {isProject ? "OVERVIEW" : "ABSTRACT"}
            </span>
            <h2>
              {isProject
                ? "A precise tool for a defined problem."
                : "Start with the boundary, not the exploit."}
            </h2>
            <p>
              {item.description} This work treats security as a system property
              and documents assumptions before conclusions. Our goal is to
              produce evidence that remains useful beyond a single tool,
              version, or environment.
            </p>
            <p>
              Every investigation follows an explicit scope, reproducible
              method, and responsible publication process. Where evidence is
              incomplete, we say so.
            </p>
          </section>
          <blockquote>
            “The useful result is not merely that a system failed, but a precise
            account of why its assumptions stopped holding.”
          </blockquote>
          <section>
            <span className="eyebrow">02 / METHOD</span>
            <h2>Measured, reproducible, and deliberately constrained.</h2>
            <div className="method-grid">
              {[
                "Define trust boundaries",
                "Build controlled models",
                "Observe failure modes",
                "Validate independently",
              ].map((x, i) => (
                <div key={x}>
                  <b>0{i + 1}</b>
                  <h3>{x}</h3>
                  <p>
                    Capture inputs, assumptions, artifacts, and decisions at
                    each stage.
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="code-block">
            <div>
              <span>analysis.ts</span>
              <span>REPRODUCIBLE EXAMPLE</span>
            </div>
            <pre>
              <code>{`const boundary = await model.observe({
  surface: "${item.category.toLowerCase()}",
  assumptions: ["identity", "integrity", "availability"],
  mode: "controlled"
});

assert(boundary.evidence.length > 0);`}</code>
            </pre>
          </section>
          <section>
            <span className="eyebrow">03 / FINDINGS</span>
            <h2>What the evidence supports.</h2>
            {[
              "Boundary conditions matter more than nominal controls.",
              "Observability changes the cost of both attack and response.",
              "Simple controls remain effective when their ownership is explicit.",
            ].map((x, i) => (
              <div className="finding" key={x}>
                <span>F-{i + 1}</span>
                <p>{x}</p>
                <b>{i === 0 ? "HIGH CONFIDENCE" : "SUPPORTED"}</b>
              </div>
            ))}
          </section>
        </article>
      </div>
      <section className="related section">
        <div className="section-title">
          <div>
            <span className="eyebrow">RELATED WORK</span>
            <h2>Continue the thread.</h2>
          </div>
        </div>
        <ArchiveGrid
          items={(isProject ? data.research : data.projects).slice(0, 3)}
          base={isProject ? "research" : "projects"}
        />
      </section>
    </main>
  );
}
