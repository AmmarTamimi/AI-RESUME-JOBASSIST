import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ATSClassicTemplate({ content, theme }: TemplateProps) {
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
    <div className="atsc-template">
      {/* Plain-text header — no images, no icons, no tables */}
      <div className="name">{personalInfo.fullName}</div>
      <div className="title">{personalInfo.title || "Professional"}</div>
      <div className="contactLine">{contactStrings.join("  |  ")}</div>

      <div className="rule" />

      {aboutText && (
        <div className="section">
          <div className="sectionTitle">Summary</div>
          <p className="bodyText">{aboutText}</p>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">Experience</div>
          {experienceSection.items.map((job, i) => (
            <div className="entry" key={i}>
              <div className="entryTop">{job.role || "Position"} — {job.company}{job.location ? `, ${job.location}` : ""}</div>
              <div className="entryDate">{job.start} – {job.end || "Present"}</div>
              {job.bullets && job.bullets.length > 0 && (
                <ul className="bullets">
                  {job.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {educationSection && educationSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">Education</div>
          {educationSection.items.map((edu, i) => (
            <div className="entry" key={i}>
              <div className="entryTop">{edu.degree} — {edu.school}</div>
              <div className="entryDate">{edu.start} – {edu.end}</div>
            </div>
          ))}
        </div>
      )}

      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">Skills</div>
          <p className="bodyText">{ratedSkillsSection.items.map((s) => s.name).join(", ")}</p>
        </div>
      )}

      {referencesSection && referencesSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">References</div>
          {referencesSection.items.map((ref, i) => (
            <div className="entry" key={i}>
              <div className="entryTop">
                {ref.name}
                {ref.phone ? ` — ${ref.phone}` : ""}
                {ref.email ? ` — ${ref.email}` : ""}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .atsc-template {
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: #000000;
          font-family: ${t.bodyFont || "Georgia"}, "Times New Roman", serif;
          padding: 40px 52px 46px;
          box-sizing: border-box;
          text-align: center;
        }

        .name {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
        }

        .title {
          font-size: 13px;
          color: #333333;
          margin-top: 4px;
        }

        .contactLine {
          font-size: 11.5px;
          color: #333333;
          margin-top: 10px;
        }

        .rule {
          height: 1px;
          background: ${t.accentColor || "#1F3864"};
          margin: 18px 0 4px;
        }

        .section {
          margin-top: 22px;
          text-align: left;
        }

        .sectionTitle {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${t.accentColor || "#1F3864"};
          border-bottom: 1px solid #cccccc;
          padding-bottom: 4px;
          margin-bottom: 10px;
        }

        .bodyText {
          font-size: 12.5px;
          line-height: 1.7;
          color: #1a1a1a;
          margin: 0;
        }

        .entry {
          margin-bottom: 14px;
        }

        .entryTop {
          font-size: 12.5px;
          font-weight: 700;
          color: #000000;
        }

        .entryDate {
          font-size: 11px;
          color: #444444;
          margin-top: 2px;
        }

        .bullets {
          margin: 6px 0 0;
          padding-left: 18px;
        }

        .bullets li {
          font-size: 12px;
          line-height: 1.6;
          color: #1a1a1a;
          margin-bottom: 3px;
        }

        @media print {
          .atsc-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
