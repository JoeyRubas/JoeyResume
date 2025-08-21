import React from "react";
import {
  ResumeType,
  ResumeContact,
  ContactType,
  ResumeSection,
  ResumeEntry,
} from "../../types/resume";
import { exampleResume } from "./exampleResumeData";
import "./styles.css";

const contactEmojis: Record<ContactType, string> = {
  [ContactType.EMAIL]: "📧",
  [ContactType.PHONE]: "📞",
  [ContactType.LINKEDIN]: "💼",
  [ContactType.GITHUB]: "💻",
  [ContactType.WEBSITE]: "🌐",
};

function linkFor(contact: ResumeContact): { href?: string; text: string } {
  const raw = contact.contact.trim();
  if (contact.contact_type === ContactType.EMAIL) return { href: `mailto:${raw}`, text: raw };
  if ([ContactType.LINKEDIN, ContactType.GITHUB, ContactType.WEBSITE].includes(contact.contact_type)) {
    const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    return { href, text: raw.replace(/^https?:\/\//, "") };
  }
  return { text: raw };
}

const ContactItem: React.FC<{ contact: ResumeContact }> = ({ contact }) => {
  const emoji = contactEmojis[contact.contact_type] ?? "📋";
  const { href, text } = linkFor(contact);
  return (
    <span className="contact-item" key={contact.id}>
      <span aria-hidden="true">{emoji}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </span>
  );
};

const Entry: React.FC<{ entry: ResumeEntry }> = ({ entry }) => {
  return (
    <article className="resume-entry">
      <header className="entry-header">
        <h5 className="entry-title">{entry.title}</h5>
        <time className="entry-date">
          {entry.startDate} – {entry.endDate || "Present"}
        </time>
      </header>
      {entry.subtitle && <div className="entry-subtitle">{entry.subtitle}</div>}
      {entry.bulletpoints?.length ? (
        <ul className="bulletpoint">
          {entry.bulletpoints.map((bp, idx) => (
            <li key={idx}>{bp}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

const Section: React.FC<{ section: ResumeSection }> = ({ section }) => {
  return (
    <section className="resume-section" aria-label={section.title}>
      <h4 className="resume-section-title">{section.title}</h4>
      <hr className="resume-section-separator" />
      <div className="resume-section-entries">
        {section.entries.map((e) => (
          <Entry key={e.id ?? `${e.title}-${e.startDate}`} entry={e} />
        ))}
      </div>
    </section>
  );
};

const ResumeDocument: React.FC<{ resume: ResumeType }> = ({ resume }) => {
  return (
    <div className="resume-sheet" role="document">
      {/* Blueprint vertical rails */}
      <div className="sheet-rail sheet-rail-left" aria-hidden="true" />
      <div className="sheet-rail sheet-rail-right" aria-hidden="true" />

      <header className="resume-header">
        <h1 className="resume-name">{resume.name}</h1>
        <div className="contacts">
          {resume.contacts.map((c) => (
            <ContactItem key={c.id} contact={c} />
          ))}
        </div>
      </header>

      <div className="resume-layout">
        <main className="resume-main">
          {resume.sections.map((s) => (
            <Section key={s.id ?? s.title} section={s} />
          ))}
        </main>

        <aside className="resume-aside">
          {/* Optional: skills summary, awards, quick facts */}
          {resume.quickFacts?.length ? (
            <section className="quick-facts-resume">
              <h4 className="resume-section-title">Highlights</h4>
              <hr className="resume-section-separator" />
              <ul className="quick-list">
                {resume.quickFacts.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

const Resume: React.FC = () => {
  return (
    <div className="resume-page">
      <ResumeDocument resume={exampleResume} />
    </div>
  );
};

export default Resume;
