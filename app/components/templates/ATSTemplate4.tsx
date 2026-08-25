import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ATSTwoToneTemplate({ content, theme }: TemplateProps) {
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
    <div className="atst-template">
      <div className="name">{personalInfo.fullName}</div>
      <div className="title">{personalInfo.title || "Professional"}</div>
      <div className="contactLine">{contactStrings.join("   |   ")}</div>

      {aboutText && (
        <div className="section">
          <div className="sectionTitle">Summary</div>
          <p className="bodyText">{aboutText}</p>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">Professional Experience</div>
          {experienceSection.items.map((job, i) => (
            <div className="entry" key={i}>
              <div className="entryRow">
                <span className="entryRole">{job.role || "Position"}</span>
                <span className="entryDate">{job.start} – {job.end || "Present"}</span>
              </div>
              <div className="entryCompany">{job.company}{job.location ? `, ${job.location}` : ""}</div>
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
              <div className="entryRow">
                <span className="entryRole">{edu.school}</span>
                <span className="entryDate">{edu.start} – {edu.end}</span>
              </div>
              <div className="entryCompany">{edu.degree}</div>
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
              <div className="entryRole">{ref.name}</div>
              <div className="entryCompany">{[ref.phone, ref.email].filter(Boolean).join("  ·  ")}</div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .atst-template {
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: #141414;
          font-family: ${t.bodyFont || "Arial"}, Helvetica, sans-serif;
          padding: 40px 52px 46px;
          box-sizing: border-box;
        }

        .name {
          font-size: 25px;
          font-weight: 800;
          color: ${t.accentColor || "#3B3A6B"};
        }

        .title {
          font-size: 12.5px;
          color: #444444;
          margin-top: 3px;
        }

        .contactLine {
          font-size: 11px;
          color: #444444;
          margin-top: 10px;
          padding-bottom: 14px;
          border-bottom: 1px solid #dddddd;
        }

        .section {
          margin-top: 20px;
        }

        .sectionTitle {
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #141414;
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

        .entryRow {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }

        .entryRole {
          font-size: 12.5px;
          font-weight: 700;
          color: #141414;
        }

        .entryDate {
          font-size: 11px;
          color: #555555;
        }

        .entryCompany {
          font-size: 11.5px;
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
          .atst-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
