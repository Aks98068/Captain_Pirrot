import Logo from "@/components/Logo";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import FilterBar from "@/components/FilterBar";

export default function Certificates() {
  const certs = [
    ["OSCP", "Offensive Security", "CYBERSECURITY", "ISSUED 2025"],
    ["GCFA", "SANS / GIAC", "FORENSICS", "ISSUED 2025"],
    ["CCNA", "Cisco", "NETWORKING", "ISSUED 2024"],
    ["AWS Security", "Amazon Web Services", "CLOUD", "ISSUED 2024"],
  ];
  return (
    <main className="page">
      <PageHeader
        label="CREDENTIAL ARCHIVE"
        title="Verified learning, documented."
        intro="Professional certifications and structured learning records, presented with source, scope, and verification details."
      />
      <FilterBar
        types={[
          "All",
          "Cybersecurity",
          "Networking",
          "Cloud",
          "Forensics",
          "Development",
        ]}
      />
      <section className="credential-list">
        {certs.map((x, i) => (
          <div className="credential" key={x[0]}>
            <div className="seal">
              <Logo compact />
            </div>
            <span>0{i + 1}</span>
            <div>
              <small>{x[2]}</small>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </div>
            <div>
              <small>CREDENTIAL STATUS</small>
              <b>ACTIVE</b>
              <small>{x[3]}</small>
            </div>
            <Button variant="secondary" icon="external">
              VERIFY CREDENTIAL
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
}
