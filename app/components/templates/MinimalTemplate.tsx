import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function MinimalTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const rootStyle = {
    "--primary": t.primaryColor,
    "--bg": t.backgroundColor,
    "--text": t.textColor,
    "--muted": t.mutedColor,
    "--heading-font": t.headingFont,
    "--body-font": t.bodyFont,
  } as React.CSSProperties;

  return (
    <div className="min-tpl" style={rootStyle}>
      <header className="min-header">
        <h1 className="min-name">{personalInfo.fullName}</h1>
        <p className="min-title">{personalInfo.title}</p>
        <div className="min-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website]
            .filter(Boolean)
            .join("   ·   ")}
        </div>
      </header>

      <hr className="min-rule" />

      {personalInfo.summary && <p className="min-summary">{personalInfo.summary}</p>}

      {sections.map((section) => (
        <section className="min-section" key={section.id}>
          <h2 className="min-h2">{section.title}</h2>

          {section.type === "experience" &&
            section.items.map((item, i) => (
              <div className="min-item" key={i}>
                <div className="min-row">
                  <span className="min-role">
                    {item.role}, <span className="min-company">{item.company}</span>
                  </span>
                  <span className="min-date">
                    {item.start} — {item.end}
                  </span>
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
              <div className="min-row min-item" key={i}>
                <span>
                  {item.degree}, <span className="min-company">{item.school}</span>
                </span>
                <span className="min-date">
                  {item.start} — {item.end}
                </span>
              </div>
            ))}

          {section.type === "skills" && (
            <p className="min-skills">{section.items.join("  ·  ")}</p>
          )}

          {section.type === "custom" &&
            section.items.map((item, i) => (
              <div className="min-row min-item" key={i}>
                <span>{item.label}</span>
                <span className="min-date">{item.description}</span>
              </div>
            ))}
        </section>
      ))}

      <style>{`
        .min-tpl {
          background: var(--bg);
          color: var(--text);
          font-family: var(--body-font), sans-serif;
          font-size: 13px;
          padding: 44px 48px;
          max-width: 720px;
          margin: 0 auto;
        }
        .min-header { text-align: center; margin-bottom: 18px; }
        .min-name {
          font-family: var(--heading-font), serif;
          font-weight: 500; font-size: 30px; letter-spacing: 0.01em;
          margin: 0 0 4px; color: var(--primary);
        }
        .min-title { font-size: 13px; color: var(--muted); margin: 0 0 10px; letter-spacing: 0.03em; }
        .min-contact { font-size: 11px; color: var(--muted); }
        .min-rule { border: none; border-top: 1px solid #ddd; margin: 22px 0; }
        .min-summary { text-align: center; line-height: 1.7; color: var(--text); margin-bottom: 26px; font-size: 12.5px; }
        .min-section { margin-bottom: 22px; }
        .min-h2 {
          font-family: var(--heading-font), serif;
          font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em;
          color: var(--primary); margin: 0 0 12px; text-align: center;
        }
        .min-item { margin-bottom: 12px; }
        .min-row { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
        .min-role { font-weight: 600; }
        .min-company { font-weight: 400; color: var(--muted); }
        .min-date { font-size: 11px; color: var(--muted); white-space: nowrap; }
        .min-item ul { margin: 6px 0 0; padding-left: 16px; line-height: 1.65; }
        .min-skills { text-align: center; color: var(--text); }
      `}</style>
    </div>
  );
}