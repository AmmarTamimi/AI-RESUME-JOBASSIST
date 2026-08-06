import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ProfessionalTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const leftSections = sections.filter((s) => s.type === "skills");
  const rightSections = sections.filter((s) => s.type !== "skills");

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
          <div className="prof-block">
            <h2 className="prof-h2">Contact</h2>
            <div className="prof-contact">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.website && <div>{personalInfo.website}</div>}
            </div>
          </div>

          {leftSections.map((section) =>
            section.type === "skills" ? (
              <div className="prof-block" key={section.id}>
                <h2 className="prof-h2">{section.title}</h2>
                <ul className="prof-skill-list">
                  {section.items.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
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
                        {item.start} — {item.end}
                      </span>
                    </div>
                    <div className="prof-muted">
                      {item.company} · {item.location}
                    </div>
                    <ul>
                      {item.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
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
                      {item.start} — {item.end}
                    </span>
                  </div>
                ))}

              {section.type === "custom" &&
                section.items.map((item, i) => (
                  <div className="prof-row prof-item" key={i}>
                    <strong>{item.label}</strong>
                    <span className="prof-muted">{item.description}</span>
                  </div>
                ))}
            </section>
          ))}
        </main>
      </div>

      <style>{`
        .prof-tpl {
          background: var(--bg); color: var(--text);
          font-family: var(--body-font), sans-serif; font-size: 13px;
        }
        .prof-header {
          padding: 26px 32px 18px;
          border-bottom: 3px solid var(--primary);
        }
        .prof-name {
          font-family: var(--heading-font), serif;
          font-size: 26px; color: var(--primary); margin: 0 0 4px;
        }
        .prof-title { font-size: 13px; color: var(--accent); letter-spacing: 0.04em; margin: 0; font-weight: 600; }
        .prof-body { display: grid; grid-template-columns: 190px 1fr; }
        .prof-left { padding: 22px 24px; border-right: 1px solid #e6e2da; background: #FBF9F5; }
        .prof-right { padding: 22px 30px; }
        .prof-block { margin-bottom: 22px; }
        .prof-h2 {
          font-family: var(--heading-font), serif;
          font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--primary); border-bottom: 1px solid var(--accent);
          padding-bottom: 5px; margin: 0 0 10px;
        }
        .prof-contact { font-size: 11.5px; line-height: 1.9; color: var(--text); }
        .prof-skill-list { list-style: none; padding: 0; margin: 0; font-size: 12px; line-height: 2; }
        .prof-section { margin-bottom: 20px; }
        .prof-summary { line-height: 1.65; }
        .prof-item { margin-bottom: 14px; }
        .prof-row { display: flex; justify-content: space-between; align-items: baseline; }
        .prof-date { font-size: 11px; color: var(--muted); white-space: nowrap; }
        .prof-muted { color: var(--muted); font-size: 12px; margin: 2px 0 6px; }
        .prof-item ul { margin: 0; padding-left: 16px; line-height: 1.6; }
      `}</style>
    </div>
  );
}