import React from "react";
import type {
  TemplateProps,
  RatedSkillItem,
  LanguageItem,
  AchievementItem,
  CustomItem,
  ReferenceItem,
} from "../../types/Content";

// Type guards
const isCustomItem = (item: any): item is CustomItem =>
  item && typeof item === "object" && "label" in item;
const isLanguageItem = (item: any): item is LanguageItem =>
  item && typeof item === "object" && "name" in item;
const isAchievementItem = (item: any): item is AchievementItem =>
  item && typeof item === "object" && "title" in item;

export default function ProfessionalTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find(
    (s) => s.type === "custom" && s.id === "contact"
  );
  const contactItems = contactSection?.items || [];

  const leftSectionTypes = new Set([
    "skills",
    "ratedSkills",
    "languages",
    "references",
    "custom",
  ]);
  const leftSections = sections.filter(
    (s) =>
      leftSectionTypes.has(s.type) &&
      !(s.type === "custom" && s.id === "contact")
  );

  const rightSectionTypes = new Set(["experience", "education", "achievements"]);
  const rightSections = sections.filter((s) => rightSectionTypes.has(s.type));

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
    <div className="prof-tpl data-resume-root" style={rootStyle}>
      <header className="prof-header">
        <h1 className="prof-name">{personalInfo.fullName}</h1>
        <p className="prof-title">{personalInfo.title}</p>
      </header>

      <div className="prof-body data-resume-root">
        <aside className="prof-left">
          {/* Contact */}
          <div className="prof-block data-resume-root">
            <h2 className="prof-h2">Contact</h2>
            <div className="prof-contact data-resume-root">
              {contactItems.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <div className="contactItem data-resume-root" key={i}>
                      <span className="contact-text">{item.description}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {leftSections.map((section) => {
            if (section.type === "skills") {
              return (
                <div className="prof-block data-resume-root" key={section.id}>
                  <h2 className="prof-h2">{section.title || "Skills"}</h2>
                  <ul className="prof-skill-list">
                    {section.items.map((s, i) => (
                      <li key={i}>{String(s)}</li>
                    ))}
                  </ul>
                </div>
              );
            }

            if (section.type === "ratedSkills") {
              return (
                <div className="prof-block data-resume-root" key={section.id}>
                  <h2 className="prof-h2">{section.title || "Skills"}</h2>
                  <div className="prof-rated-list">
                    {section.items.map((skill: RatedSkillItem, i) => (
                      <div className="prof-rated-item" key={i}>
                        <div className="prof-rated-head">
                          <span className="prof-rated-name">{skill.name}</span>
                          <span className="prof-rated-pct">
                            {skill.level || 100}%
                          </span>
                        </div>
                        <div className="prof-rated-bar">
                          <div
                            className="prof-rated-fill"
                            style={{ width: `${skill.level || 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (section.type === "languages") {
              return (
                <div className="prof-block data-resume-root" key={section.id}>
                  <h2 className="prof-h2">{section.title || "Languages"}</h2>
                  <div className="prof-langs">
                    {section.items.map((lang, i) => {
                      if (isLanguageItem(lang)) {
                        return (
                          <div className="prof-lang-item" key={i}>
                            <span className="prof-lang-name">{lang.name}</span>
                            {lang.level && (
                              <span className="prof-lang-level">{lang.level}</span>
                            )}
                          </div>
                        );
                      }
                      return (
                        <div className="prof-lang-item" key={i}>
                          <span className="prof-lang-name">{String(lang)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (section.type === "references") {
              return (
                <div className="prof-block data-resume-root" key={section.id}>
                  <h2 className="prof-h2">
                    {section.title || "References"}
                  </h2>
                  {section.items.map((ref: ReferenceItem, i) => (
                    <div key={i} className="prof-reference data-resume-root">
                      <strong>{ref.name}</strong>
                      {ref.address && (
                        <div className="prof-muted data-resume-root">
                          {ref.address}
                        </div>
                      )}
                      {ref.phone && (
                        <div className="prof-muted data-resume-root">
                          {ref.phone}
                        </div>
                      )}
                      {ref.email && (
                        <div className="prof-muted data-resume-root">
                          {ref.email}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            }

            if (section.type === "custom" && section.id !== "contact") {
              return (
                <div className="prof-block data-resume-root" key={section.id}>
                  <h2 className="prof-h2">{section.title || "Custom"}</h2>
                  {section.items.map((item, i) => {
                    if (isCustomItem(item)) {
                      return (
                        <div key={i} className="prof-custom-item data-resume-root">
                          {item.label && <strong>{item.label}</strong>}
                          {item.description && (
                            <span className="prof-muted">
                              {item.description}
                            </span>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="prof-custom-item data-resume-root">
                        <span className="prof-muted">{String(item)}</span>
                      </div>
                    );
                  })}
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
              <h2 className="prof-h2">{section.title || section.type}</h2>

              {section.type === "experience" &&
                section.items.map((item, i) => (
                  <div className="prof-item data-resume-root" key={i}>
                    <div className="prof-row data-resume-root">
                      <strong>{item.role}</strong>
                      <span className="prof-date">
                        {item.start} – {item.end || "Present"}
                      </span>
                    </div>
                    <div className="prof-muted data-resume-root">
                      {item.company}
                      {item.location ? ` · ${item.location}` : ""}
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
                  <div className="prof-row prof-item data-resume-root" key={i}>
                    <div>
                      <strong>{item.degree}</strong>
                      <div className="prof-muted data-resume-root">
                        {item.school}
                      </div>
                    </div>
                    <span className="prof-date">
                      {item.start} – {item.end || "Present"}
                    </span>
                  </div>
                ))}

              {section.type === "achievements" && (
                <div className="prof-achievements">
                  {section.items.map((item, i) => {
                    if (isAchievementItem(item)) {
                      return (
                        <div
                          className="prof-achievement-item data-resume-root"
                          key={i}
                        >
                          <strong>{item.title}</strong>
                          {item.description && (
                            <div className="prof-muted data-resume-root">
                              {item.description}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div
                        className="prof-achievement-item data-resume-root"
                        key={i}
                      >
                        <strong>{String(item)}</strong>
                      </div>
                    );
                  })}
                </div>
              )}
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
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }
        .prof-header {
          padding: 26px 32px 18px;
          border-bottom: 3px solid var(--primary);
          flex-shrink: 0;
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
          flex: 1;
        }
        .prof-left {
          padding: 22px 24px;
          border-right: 1px solid #e6e2da;
          background: #FBF9F5;
        }
        .prof-right {
          padding: 22px 30px;
          background: var(--bg);
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

        .prof-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11.5px;
          line-height: 1.5;
          color: var(--text);
        }
        .contactItem {
          word-break: break-word;
        }
        .contactItem .contact-text {
          word-break: break-word;
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

        .prof-rated-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .prof-rated-item {
          font-size: 11.5px;
        }
        .prof-rated-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }
        .prof-rated-name {
          font-weight: 600;
          color: var(--text);
        }
        .prof-rated-pct {
          font-size: 10.5px;
          color: var(--muted);
        }
        .prof-rated-bar {
          height: 3px;
          background: #e6e2da;
          border-radius: 2px;
          overflow: hidden;
        }
        .prof-rated-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
        }

        .prof-langs {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
        }
        .prof-lang-item {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }
        .prof-lang-name {
          color: var(--text);
        }
        .prof-lang-level {
          color: var(--muted);
          font-style: italic;
          font-size: 11px;
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

        .prof-achievements {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .prof-achievement-item {
          padding-left: 12px;
          border-left: 2px solid var(--accent);
          font-size: 12px;
        }
        .prof-achievement-item strong {
          display: block;
          font-size: 12.5px;
          color: var(--text);
        }
        .prof-achievement-item .prof-muted {
          margin: 2px 0 0;
        }
      `}</style>
    </div>
  );
}