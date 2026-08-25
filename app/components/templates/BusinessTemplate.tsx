import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function BusinessTemplate({ content, theme }: TemplateProps) {
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
    <div className="biz-tpl data-resume-root" style={rootStyle}>
      <header className="biz-header">
        <h1 className="biz-name">{personalInfo.fullName}</h1>
        <p className="biz-title">{personalInfo.title}</p>
        <div className="biz-contact data-resume-root">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website]
            .filter(Boolean)
            .join("  |  ")}
        </div>
      </header>

      <main className="biz-main">
        {personalInfo.summary && (
          <section className="biz-section">
            <h2 className="biz-h2">Profile</h2>
            <p className="biz-summary">{personalInfo.summary}</p>
          </section>
        )}

        {sections.map((section) => (
          <section className="biz-section" key={section.id}>
            <h2 className="biz-h2">{section.title}</h2>

            {section.type === "experience" &&
              section.items.map((item, i) => (
                <div className="biz-item data-resume-root" key={i}>
                  <div className="biz-row data-resume-root">
                    <strong className="biz-role">{item.role}</strong>
                    <span className="biz-date">
                      {item.start} â€” {item.end}
                    </span>
                  </div>
                  <div className="biz-muted data-resume-root">
                    {item.company} Â· {item.location}
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
                <div className="biz-row biz-item data-resume-root" key={i}>
                  <div>
                    <strong>{item.degree}</strong>
                    <div className="biz-muted data-resume-root">{item.school}</div>
                  </div>
                  <span className="biz-date">
                    {item.start} â€” {item.end}
                  </span>
                </div>
              ))}

            {section.type === "skills" && (
              <div className="biz-skills data-resume-root">
                {section.items.map((s, i) => (
                  <span className="biz-skill" key={i}>
                    {s}
                  </span>
                ))}
              </div>
            )}

            {section.type === "custom" &&
              section.items.map((item, i) => (
                <div className="biz-row biz-item data-resume-root" key={i}>
                  <strong>{item.label}</strong>
                  <span className="biz-muted">{item.description}</span>
                </div>
              ))}
          </section>
        ))}
      </main>

      <style>{`
        .biz-tpl {
          background: var(--bg); color: var(--text);
          font-family: var(--body-font), sans-serif; font-size: 13px;
        }
        .biz-header {
          background: var(--primary); color: #fff;
          padding: 30px 34px;
        }
        .biz-name {
          font-family: var(--heading-font), sans-serif;
          font-weight: 700; letter-spacing: 0.02em;
          font-size: 27px; margin: 0 0 4px; text-transform: uppercase;
        }
        .biz-title { font-size: 13px; opacity: 0.9; margin: 0 0 12px; letter-spacing: 0.03em; }
        .biz-contact { font-size: 11px; opacity: 0.85; }
        .biz-main { padding: 24px 34px; }
        .biz-section { margin-bottom: 20px; }
        .biz-h2 {
          font-family: var(--heading-font), sans-serif;
          font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--primary); margin: 0 0 12px; padding-bottom: 6px;
          border-bottom: 3px solid var(--primary);
        }
        .biz-summary { line-height: 1.65; }
        .biz-item { margin-bottom: 14px; }
        .biz-row { display: flex; justify-content: space-between; align-items: baseline; }
        .biz-role { text-transform: uppercase; font-size: 12.5px; letter-spacing: 0.02em; }
        .biz-date { font-size: 11px; color: var(--muted); white-space: nowrap; }
        .biz-muted { color: var(--muted); font-size: 12px; margin: 2px 0 6px; }
        .biz-item ul { margin: 0; padding-left: 16px; line-height: 1.6; }
        .biz-skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .biz-skill {
          font-size: 11px; background: var(--primary); color: #fff;
          padding: 4px 10px;
        }
      `}</style>
    </div>
  );
}
