import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { getContactInfo, getSettings } from "@/lib/queries";

export default async function Contact() {
  const [info, settings] = await Promise.all([getContactInfo(), getSettings()]);
  return (
    <main className="page">
      <PageHeader
        label="CONTACT"
        title="Start with context."
        intro={settings.contact_intro ?? "For research collaboration, responsible disclosure, project work, or community questions."}
      />
      <section className="contact-layout">
        <aside>
          <span className="eyebrow">DIRECT CHANNELS</span>
          {info.map((c) => (
            <div key={c.label + c.value}>
              <Icon name={c.icon} />
              <p>
                <b>{c.label}</b>
                <br />
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </p>
            </div>
          ))}
          <hr />
          <span className="eyebrow">RESPONSE STANDARD</span>
          <p>{settings.contact_response}</p>
        </aside>
        <ContactForm />
      </section>
    </main>
  );
}
