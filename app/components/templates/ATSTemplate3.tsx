import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ATSCompactTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];
  const contactStrings: string[] = contactItems.length > 0
    ? contactItems
        .map((item) => (typeof item === "object" && item !== null && "description" in item ? String(item.description) : ""))
        .filter(Boolean)
    : [personalInfo.phone, personalInfo.email, personalInfo.location, personalInfo.website].filter(Boolean) as string[];

  return (
    <div className="atsx-template">
      <div className="headerRow">
        <span className="name">{personalInfo.fullName}</span>
        <span className="title">{personalInfo.title || "Professional"}</span>
      </div>
      <div className="contactLine">{contactStrings.join("  |  ")}</div>

      {aboutText && (
        <div className="section">
          <div className="sectionTitle">SUMMARY:</div>
          <p className="bodyText">{aboutText}</p>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">EXPERIENCE:</div>
          {experienceSection.items.map((job, i) => (
            <div className="entry" key={i}>
              <span className="entryRole">{job.role || "Position"}, {job.company}</span>
              <span className="entryDate"> ({job.start} – {job.end || "Present"})</span>
              {job.bullets && job.bullets.length > 0 && (
                <div className="bullets">
                  {job.bullets.map((b, bi) => (
                    <span className="bulletLine" key={bi}>• {b}  </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {educationSection && educationSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">EDUCATION:</div>
          {educationSection.items.map((edu, i) => (
            <div className="entry" key={i}>
              <span className="entryRole">{edu.degree}, {edu.school}</span>
              <span className="entryDate"> ({edu.start} – {edu.end})</span>
            </div>
          ))}
        </div>
      )}

      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">SKILLS:</div>
          <p className="bodyText">{ratedSkillsSection.items.map((s) => s.name).join(", ")}</p>
        </div>
      )}

      {referencesSection && referencesSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">REFERENCES:</div>
          {referencesSection.items.map((ref, i) => (
            <div className="entry" key={i}>
              <span className="entryRole">{ref.name}</span>
              <span className="entryDate">
                {" "}({[ref.phone, ref.email].filter(Boolean).join(", ")})
              </span>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .atsx-template {
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: #141414;
          font-family: ${t.bodyFont || "Arial"}, Helvetica, sans-serif;
          padding: 32px 46px 38px;
          box-sizing: border-box;
          font-size: 11.5px;
        }

        .headerRow {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }

        .name {
          font-size: 20px;
          font-weight: 700;
          color: ${t.accentColor || "#7A1E1E"};
        }

        .title {
          font-size: 12px;
          color: #444444;
        }

        .contactLine {
          font-size: 10.5px;
          color: #444444;
          margin-top: 4px;
          padding-bottom: 10px;
          border-bottom: 1px solid #cccccc;
        }

        .section {
          margin-top: 14px;
        }

        .sectionTitle {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: ${t.accentColor || "#7A1E1E"};
          margin-bottom: 6px;
        }

        .bodyText {
          font-size: 11.5px;
          line-height: 1.55;
          color: #1a1a1a;
          margin: 0;
        }

        .entry {
          margin-bottom: 8px;
          line-height: 1.55;
        }

        .entryRole {
          font-weight: 700;
          color: #141414;
        }

        .entryDate {
          color: #555555;
        }

        .bullets {
          margin-top: 3px;
        }

        .bulletLine {
          font-size: 11px;
          color: #1a1a1a;
          margin-right: 10px;
        }

        @media print {
          .atsx-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
