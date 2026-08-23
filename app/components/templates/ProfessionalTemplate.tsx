import React from "react";
import type { TemplateProps } from "../../types/Content";

const Icon = {
  phone: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),

  mail: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),

  pin: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),

  globe: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
};

export default function ProfessionalTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  // Filter sections for left and right
  const leftSections = sections.filter((s) => s.type === "skills" || s.type === "custom" || s.type === "references");
  const rightSections = sections.filter((s) => s.type !== "skills" && s.type !== "custom" && s.type !== "references");

  const contactSection = sections.find(
    (s) => s.type === "custom" && s.id === "contact",
  );
  const contactItems = contactSection?.items || [];

  const rootStyle = {
    "--primary": t.primaryColor,
    "--accent": t.accentColor,
    "--bg": t.backgroundColor,
    "--text": t.textColor,
    "--muted": t.mutedColor,
    "--heading-font": t.headingFont,
    "--body-font": t.bodyFont,
  } as React.CSSProperties;

  return (
    <div className="prof-tpl" style={rootStyle}>
      <header className="prof-header">
        <h1 className="prof-name">{personalInfo.fullName}</h1>
        <p className="prof-title">{personalInfo.title}</p>
      </header>

      <div className="prof-body">
        <aside className="prof-left">
          {/* Contact Section */}
          <div className="prof-block">
            <h2 className="prof-h2">Contact</h2>
            <div className="prof-contact">
              {contactItems.map((item, i) => {
                if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
                  let icon = Icon.pin;
                  if (item.label === "phone") icon = Icon.phone;
                  else if (item.label === "email") icon = Icon.mail;
                  else if (item.label === "web") icon = Icon.globe;
                  return (
                    <div className="contactItem" key={i}>
                      <span className="ic">{icon}</span>
                      <span className="contact-text">{item.description}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Skills & Other Left Sections */}
          {leftSections.map((section) => {
            if (section.type === "skills") {
              return (
                <div className="prof-block" key={section.id}>
                  <h2 className="prof-h2">{section.title}</h2>
                  <ul className="prof-skill-list">
                    {section.items.map((s, i) => {
                      const skillName = s;
                      return <li key={i}>{skillName}</li>;
                    })}
                  </ul>
                </div>
              );
            }
            if (section.type === "references") {
              return (
                <div className="prof-block" key={section.id}>
                  <h2 className="prof-h2">{section.title}</h2>
                  {section.items.map((ref, i) => (
                    <div key={i} className="prof-reference">
                      <strong>{ref.name}</strong>
                      {ref.address && <div className="prof-muted">{ref.address}</div>}
                      {ref.phone && <div className="prof-muted">{ref.phone}</div>}
                      {ref.email && <div className="prof-muted">{ref.email}</div>}
                    </div>
                  ))}
                </div>
              );
            }
            if (section.type === "custom" && section.id !== "contact") {
              return (
                <div className="prof-block" key={section.id}>
                  <h2 className="prof-h2">{section.title}</h2>
                  {section.items.map((item, i) => (
                    <div key={i} className="prof-custom-item">
                      {item.label && <strong>{item.label}</strong>}
                      {item.description && <span className="prof-muted">{item.description}</span>}
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </aside>

        <main className="prof-right">
          {personalInfo.summary && (
            <section className="prof-section">
              <h2 className="prof-h2">Profile</h2>
              <p className="prof-summary">{personalInfo.summary}</p>
            </section>
          )}

          {rightSections.map((section) => (
            <section className="prof-section" key={section.id}>
              <h2 className="prof-h2">{section.title}</h2>

              {section.type === "experience" &&
                section.items.map((item, i) => (
                  <div className="prof-item" key={i}>
                    <div className="prof-row">
                      <strong>{item.role}</strong>
                      <span className="prof-date">
                        {item.start} — {item.end || 'Present'}
                      </span>
                    </div>
                    <div className="prof-muted">
                      {item.company} {item.location ? `· ${item.location}` : ''}
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul>
                        {item.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

              {section.type === "education" &&
                section.items.map((item, i) => (
                  <div className="prof-row prof-item" key={i}>
                    <div>
                      <strong>{item.degree}</strong>
                      <div className="prof-muted">{item.school}</div>
                    </div>
                    <span className="prof-date">
                      {item.start} — {item.end || 'Present'}
                    </span>
                  </div>
                ))}
            </section>
          ))}
        </main>
      </div>

      <style>{`
        .prof-tpl {
          background: var(--bg);
          color: var(--text);
          font-family: var(--body-font), sans-serif;
          font-size: 13px;
        }
        .prof-header {
          padding: 26px 32px 18px;
          border-bottom: 3px solid var(--primary);
        }
        .prof-name {
          font-family: var(--heading-font), serif;
          font-size: 26px;
          color: var(--primary);
          margin: 0 0 4px;
        }
        .prof-title {
          font-size: 13px;
          color: var(--accent);
          letter-spacing: 0.04em;
          margin: 0;
          font-weight: 600;
        }
        .prof-body {
          display: grid;
          grid-template-columns: 190px 1fr;
        }
        .prof-left {
          padding: 22px 24px;
          border-right: 1px solid #e6e2da;
          background: #FBF9F5;
        }
        .prof-right {
          padding: 22px 30px;
        }
        .prof-block {
          margin-bottom: 22px;
        }
        .prof-h2 {
          font-family: var(--heading-font), serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary);
          border-bottom: 1px solid var(--accent);
          padding-bottom: 5px;
          margin: 0 0 10px;
        }
        
        /* Contact - Fixed Alignment */
        .prof-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11.5px;
          line-height: 1.5;
          color: var(--text);
        }
        
        .contactItem {
          display: grid;
          grid-template-columns: 20px 1fr;
          gap: 8px;
          align-items: start;
        }
        
        .contactItem .ic {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          color: var(--accent);
        }
        
        .contactItem .ic svg {
          width: 14px;
          height: 14px;
          display: block;
        }
        
        .contactItem .contact-text {
          word-break: break-word;
          padding-top: 1px;
        }
        
        .prof-skill-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 12px;
          line-height: 2;
        }
        .prof-skill-list li {
          padding-left: 0;
        }
        
        .prof-reference {
          margin-bottom: 10px;
          font-size: 12px;
        }
        .prof-reference:last-child {
          margin-bottom: 0;
        }
        .prof-reference strong {
          display: block;
          font-size: 12px;
        }
        .prof-reference .prof-muted {
          margin: 1px 0;
        }
        
        .prof-custom-item {
          margin-bottom: 6px;
          font-size: 12px;
        }
        .prof-custom-item strong {
          display: block;
        }
        .prof-custom-item .prof-muted {
          margin: 1px 0;
        }
        
        .prof-section {
          margin-bottom: 20px;
        }
        .prof-summary {
          line-height: 1.65;
          margin: 0;
        }
        .prof-item {
          margin-bottom: 14px;
        }
        .prof-item:last-child {
          margin-bottom: 0;
        }
        .prof-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }
        .prof-date {
          font-size: 11px;
          color: var(--muted);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .prof-muted {
          color: var(--muted);
          font-size: 12px;
          margin: 2px 0 6px;
        }
        .prof-item ul {
          margin: 4px 0 0;
          padding-left: 16px;
          line-height: 1.6;
        }
        .prof-item ul li {
          margin-bottom: 2px;
        }
      `}</style>
    </div>
  );
}