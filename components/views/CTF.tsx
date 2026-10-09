import Icon from "@/components/Icon";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";

export default function CTF() {
  const cats = [
    ["WEB", "24"],
    ["PWN", "11"],
    ["FORENSICS", "18"],
    ["REVERSE", "09"],
    ["CRYPTO", "07"],
    ["OSINT", "13"],
  ];
  return (
    <main className="page">
      <PageHeader
        label="CTF OPERATIONS"
        title="Pressure-tested practice."
        intro="A transparent archive of competitions, solved challenges, team results, and the writeups that preserve what we learned."
      />
      <section className="ctf-dashboard">
        <div className="radar">
          <span className="eyebrow">CATEGORY DISTRIBUTION</span>
          <svg viewBox="0 0 300 300">
            <polygon points="150,28 252,88 252,212 150,272 48,212 48,88" />
            <polygon
              points="150,62 222,104 216,194 150,235 78,194 82,110"
              className="fill"
            />
            {[
              [150, 28],
              [252, 88],
              [252, 212],
              [150, 272],
              [48, 212],
              [48, 88],
            ].map(([x, y], i) => (
              <line key={i} x1="150" y1="150" x2={x} y2={y} />
            ))}
          </svg>
        </div>
        <div className="ctf-metrics">
          {[
            ["09", "EVENTS"],
            ["82", "SOLVES"],
            ["04", "PLATFORMS"],
            ["14", "WRITEUPS"],
          ].map((x) => (
            <div key={x[1]}>
              <strong>{x[0]}</strong>
              <span>{x[1]}</span>
            </div>
          ))}
        </div>
        <div className="cat-metrics">
          {cats.map((x) => (
            <div key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]}</b>
              <i>
                <em style={{ width: `${Number(x[1]) * 3}%` }} />
              </i>
            </div>
          ))}
        </div>
      </section>
      <section className="events section">
        <div className="section-title">
          <div>
            <span className="eyebrow">EVENT LOG</span>
            <h2>Competition archive.</h2>
          </div>
        </div>
        {[
          ["Nullcon HackIM 2026", "CTFtime · Team CP", "42 / 516", "2,840 PTS"],
          [
            "Cyber Apocalypse 2026",
            "Hack The Box · Team CP",
            "118 / 8,130",
            "6,425 PTS",
          ],
          ["picoCTF 2026", "picoCTF · Community", "—", "EDUCATION"],
        ].map((x, i) => (
          <Link to={`/ctf/event-${i}`} className="event-row" key={x[0]}>
            <span>0{i + 1}</span>
            <div>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </div>
            <b>{x[2]}</b>
            <small>{x[3]}</small>
            <Icon name="arrow" />
          </Link>
        ))}
      </section>
    </main>
  );
}
