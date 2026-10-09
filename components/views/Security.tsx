import Link from "@/components/Link";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

export default function Security() {
  return (
    <main className="page security-page">
      <PageHeader
        label="SECURITY & DISCLOSURE"
        title="Report responsibly. We will respond."
        intro="We welcome good-faith security research that helps protect Captain Pirrot, our projects, and the communities using them."
        aside={
          <Link to="/contact">
            <Button>REPORT A VULNERABILITY</Button>
          </Link>
        }
      />
      <section className="security-grid">
        <div>
          <span className="eyebrow">01 / RESPONSIBLE DISCLOSURE</span>
          <h2>Clear scope. Safe testing. Coordinated resolution.</h2>
          <p>
            Do not access, modify, or retain data that does not belong to you.
            Avoid privacy violations, service disruption, social engineering,
            and automated testing that degrades availability.
          </p>
        </div>
        <div className="policy-meta">
          <span>
            POLICY VERSION <b>1.2</b>
          </span>
          <span>
            LAST REVIEWED <b>18 JUN 2026</b>
          </span>
          <span>
            SAFE HARBOR <b>AVAILABLE</b>
          </span>
        </div>
      </section>
      <section className="disclosure-steps">
        {[
          ["SUBMIT", "Send a concise report with impact, steps, and evidence."],
          [
            "ACKNOWLEDGE",
            "We confirm receipt and establish a secure communication channel.",
          ],
          [
            "INVESTIGATE",
            "We reproduce, assess severity, and coordinate remediation.",
          ],
          [
            "DISCLOSE",
            "We agree on publication timing and provide attribution when desired.",
          ],
        ].map((x, i) => (
          <div key={x[0]}>
            <span>0{i + 1}</span>
            <h3>{x[0]}</h3>
            <p>{x[1]}</p>
          </div>
        ))}
      </section>
      <section className="pgp">
        <div>
          <span className="eyebrow">ENCRYPTED CONTACT</span>
          <h2>PGP information</h2>
          <p>
            security@captainpirrot.org
            <br />
            Fingerprint: 7F2A 91C4 88E1 02B7 31C0 9D4A 2B11 67A9 C0DE 2026
          </p>
        </div>
        <Button variant="secondary" icon="download">
          DOWNLOAD PUBLIC KEY
        </Button>
      </section>
    </main>
  );
}
