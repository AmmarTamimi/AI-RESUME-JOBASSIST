import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ATSFormalTemplate({ content, theme }: TemplateProps) {
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
    <div className="atsf-template">
      <div className="name">{personalInfo.fullName}</div>
      <div className="contactLine">{contactStrings.join("  |  ")}</div>
      <div className="title">{personalInfo.title || "Professional"}</div>

      {aboutText && (
        <div className="section">
          <div className="sectionTitle">Summary</div>
          <div className="sectionRule" />
          <p className="bodyText">{aboutText}</p>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">Professional Experience</div>
          <div className="sectionRule" />
          {experienceSection.items.map((job, i) => (
            <div className="entry" key={i}>
              <div className="entryTop">{job.company}{job.location ? `, ${job.location}` : ""} — {job.role || "Position"}</div>
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
          <div className="sectionRule" />
          {educationSection.items.map((edu, i) => (
            <div className="entry" key={i}>
              <div className="entryTop">{edu.school} — {edu.degree}</div>
              <div className="entryDate">{edu.start} – {edu.end}</div>
            </div>
          ))}
        </div>
      )}

      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">Skills</div>
          <div className="sectionRule" />
          <p className="bodyText">{ratedSkillsSection.items.map((s) => s.name).join(", ")}</p>
        </div>
      )}

      {referencesSection && referencesSection.items.length > 0 && (
        <div className="section">
          <div className="sectionTitle">References</div>
          <div className="sectionRule" />
          {referencesSection.items.map((ref, i) => (
            <div className="entry" key={i}>
              <div className="entryTop">
                {ref.name}
                {ref.phone ? `, ${ref.phone}` : ""}
                {ref.email ? `, ${ref.email}` : ""}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .atsf-template {
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: #000000;
          font-family: ${t.bodyFont || "Times New Roman"}, Georgia, serif;
          padding: 40px 54px 46px;
          box-sizing: border-box;
          text-align: center;
        }

        .name {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #000000;
        }

        .contactLine {
          font-size: 11px;
          color: #333333;
          margin-top: 6px;
        }

        .title {
          font-size: 12px;
          font-style: italic;
          color: #333333;
          margin-top: 4px;
        }

        .section {
          margin-top: 22px;
          text-align: left;
        }

        .sectionTitle {
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: ${t.accentColor || "#2E4053"};
        }

        .sectionRule {
          height: 1px;
          background: #999999;
          margin: 5px 0 10px;
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
          font-style: italic;
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
          .atsf-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
