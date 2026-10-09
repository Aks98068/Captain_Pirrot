import Icon from "@/components/Icon";
import Link from "@/components/Link";
import Button from "@/components/Button";
import ArchiveGrid from "@/components/ArchiveGrid";
import NetworkVisual from "@/components/NetworkVisual";
import Terminal from "@/components/Terminal";
import TeamCard from "@/components/TeamCard";
import { data } from "@/lib/data";
import { getTeam } from "@/lib/queries";

export default async function Home() {
  const team = await getTeam();
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <i /> INDEPENDENT CYBERSECURITY RESEARCH COLLECTIVE
          </div>
          <h1>
            WE BREAK SYSTEMS
            <br />
            TO <em>UNDERSTAND</em> THEM.
          </h1>
          <p>
            Captain Pirrot is an independent collective focused on security
            research, open-source engineering, technical writing, and
            responsible disclosure.
          </p>
          <div className="hero-actions">
            <Link to="/research">
              <Button>EXPLORE RESEARCH</Button>
            </Link>
            <Link to="/projects">
              <Button variant="secondary">VIEW PROJECTS</Button>
            </Link>
          </div>
          <div className="hero-note">
            <span>RESEARCH-FIRST</span>
            <span>RESPONSIBLE BY DEFAULT</span>
            <span>OPEN WHERE POSSIBLE</span>
          </div>
        </div>
        <NetworkVisual />
      </section>
      <section className="stats">
        {[
          ["06", "PROJECTS"],
          ["18", "WRITEUPS"],
          ["09", "CTFs"],
          ["07", "CERTIFICATES"],
          ["12", "ACHIEVEMENTS"],
          ["04", "OPEN SOURCE"],
        ].map(([n, l], i) => (
          <div key={l}>
            <span>0{i + 1}</span>
            <strong>{n}</strong>
            <small>{l}</small>
          </div>
        ))}
      </section>
      <section className="featured section">
        <div className="section-title">
          <div>
            <span className="eyebrow">01 / CURRENT WORK</span>
            <h2>Research in motion.</h2>
          </div>
          <p>
            Methodical inquiry into systems that shape modern digital trust.
          </p>
          <Link to="/research">
            VIEW THE ARCHIVE <Icon name="arrow" />
          </Link>
        </div>
        <ArchiveGrid items={data.research.slice(0, 3)} base="research" />
      </section>
      <section className="manifesto section">
        <div>
          <span className="eyebrow">02 / PRINCIPLE</span>
          <h2>
            Security is a property of the whole system—not a feature added at
            the end.
          </h2>
        </div>
        <div>
          <p>
            We study systems by building, testing, documenting, and responsibly
            challenging them. The output is practical: research, tools, methods,
            and shared knowledge.
          </p>
          <Link to="/about">
            READ OUR PHILOSOPHY <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="projects-band section">
        <div className="section-title">
          <div>
            <span className="eyebrow">03 / ENGINEERING</span>
            <h2>
              Open tools.
              <br />
              Real utility.
            </h2>
          </div>
          <Link to="/projects">
            ALL PROJECTS <Icon name="arrow" />
          </Link>
        </div>
        <ArchiveGrid
          items={data.projects.slice(0, 3)}
          base="projects"
          variant="list"
        />
      </section>
      <section className="team-band section">
        <div className="section-title">
          <div>
            <span className="eyebrow">04 / THE COLLECTIVE</span>
            <h2>
              Meet the
              <br />
              team.
            </h2>
          </div>
          <Link to="/team">
            ALL MEMBERS <Icon name="arrow" />
          </Link>
        </div>
        <div className="team-grid team-grid-home">
          {team.map((m) => (
            <TeamCard m={m} key={m.slug} />
          ))}
        </div>
      </section>
      <Terminal />
    </main>
  );
}
