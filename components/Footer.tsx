import Logo from "@/components/Logo";
import Link from "@/components/Link";
import { getSettings } from "@/lib/queries";

export default async function Footer() {
  const settings = await getSettings();
  const cols = {
    Explore: ["Research", "Projects", "Writeups", "Blog"],
    Activity: ["CTF", "Certificates", "Achievements", "GitHub"],
    Organization: ["About", "Team", "Resume", "Resources"],
    Security: ["Security Policy", "Responsible Disclosure", "Security.txt"],
  };
  return (
    <footer>
      <div className="footer-lead">
        <Logo />
        <p>
          Independent cybersecurity research collective. Building safer systems
          through rigorous inquiry and open engineering.
        </p>
        <div className="status">
          <i /> SYSTEM STATUS&nbsp; <strong>OPERATIONAL</strong>
        </div>
      </div>
      <div className="footer-grid">
        {Object.entries(cols).map(([k, links]) => (
          <div key={k}>
            <span className="eyebrow">{k}</span>
            {links.map((x) => (
              <Link key={x} to={`/${x.toLowerCase().replaceAll(" ", "-")}`}>
                {x}
              </Link>
            ))}
          </div>
        ))}
        <div>
          <span className="eyebrow">Connect</span>
          {settings.github_org_url && (
            <a href={settings.github_org_url} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
          {settings.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          )}
          <a href={`mailto:${settings.general_email ?? "hello@captainpirrot.org"}`}>Email</a>
        </div>
      </div>
      <div className="footer-word">CAPTAIN PIRROT</div>
      <div className="footer-bottom">
        <span>© 2026 CAPTAIN PIRROT</span>
        <span>INDEPENDENT CYBERSECURITY RESEARCH COLLECTIVE</span>
        <span>UTC +00:00</span>
      </div>
    </footer>
  );
}
