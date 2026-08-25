import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ProfessionalLedgerTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];

  const indexEntries: string[] = [];
  if (aboutText) indexEntries.push("Profile");
  if (experienceSection && experienceSection.items.length > 0) indexEntries.push("Experience");
  if (educationSection && educationSection.items.length > 0) indexEntries.push("Education");
  if (ratedSkillsSection && ratedSkillsSection.items.length > 0) indexEntries.push("Skills");
  if (referencesSection && referencesSection.items.length > 0) indexEntries.push("References");

  return (
    <div className="pl-template">
      <div className="mainArea">
        <header className="header">
          <div className="name">{personalInfo.fullName}</div>
          <div className="title">{personalInfo.title || "PROFESSIONAL"}</div>
          <div className="contactRow">
            {contactItems.length > 0
              ? contactItems.map((item, i) => {
                  if (typeof item === "object" && item !== null && "description" in item) {
                    return <span className="contactItem" key={i}>{item.description}</span>;
                  }
                  return null;
                })
              : (
                <>
                  {personalInfo.phone && <span className="contactItem">{personalInfo.phone}</span>}
                  {personalInfo.email && <span className="contactItem">{personalInfo.email}</span>}
                  {personalInfo.location && <span className="contactItem">{personalInfo.location}</span>}
                  {personalInfo.website && <span className="contactItem">{personalInfo.website}</span>}
                </>
              )}
          </div>
        </header>

        {aboutText && (
          <div className="section" id="sec-profile">
            <h2 className="sectionTitle">Profile</h2>
            <p className="aboutText">{aboutText}</p>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section" id="sec-experience">
            <h2 className="sectionTitle">Experience</h2>
            {experienceSection.items.map((job, i) => (
              <div className="job" key={i}>
                <div className="jobTop">
                  <span className="jobTitle">{job.role || "Position"}</span>
                  <span className="jobDate">{job.start} – {job.end || "Present"}</span>
                </div>
                <div className="jobSub">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                {job.bullets && job.bullets.length > 0 && <div className="jobDesc">{job.bullets[0]}</div>}
              </div>
            ))}
          </div>
        )}

        {educationSection && educationSection.items.length > 0 && (
          <div className="section" id="sec-education">
            <h2 className="sectionTitle">Education</h2>
            {educationSection.items.map((edu, i) => (
              <div className="eduItem" key={i}>
                <div className="eduTop">
                  <span className="eduSchool">{edu.school}</span>
                  <span className="eduDate">{edu.start} – {edu.end}</span>
                </div>
                <div className="eduDegree">{edu.degree}</div>
              </div>
            ))}
          </div>
        )}

        {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
          <div className="section" id="sec-skills">
            <h2 className="sectionTitle">Skills</h2>
            <div className="skillsGrid">
              {ratedSkillsSection.items.map((skill, i) => (
                <div className="skillRow" key={i}>
                  <span className="skillName">{skill.name}</span>
                  <div className="skillBar"><div className="skillFill" style={{ width: `${skill.level}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {referencesSection && referencesSection.items.length > 0 && (
          <div className="section" id="sec-references">
            <h2 className="sectionTitle">References</h2>
            {referencesSection.items.map((ref, i) => (
              <div className="refItem" key={i}>
                <span className="refName">{ref.name}</span>
                {ref.phone && <span className="refLine"> · {ref.phone}</span>}
                {ref.email && <span className="refLine"> · {ref.email}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= RIGHT INDEX RAIL ================= */}
      <div className="indexRail">
        <div className="indexTitle">Index</div>
        {indexEntries.map((entry, i) => (
          <div className="indexEntry" key={i}>
            <span className="indexNum">{String(i + 1).padStart(2, "0")}</span>
            <span>{entry}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .pl-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          display: flex;
          font-family: ${t.bodyFont || "Georgia"}, serif;
        }

        .mainArea {
          flex: 1;
          padding: 42px 40px 40px 46px;
          box-sizing: border-box;
        }

        .header {
          margin-bottom: 8px;
        }

        .name {
          font-size: 30px;
          font-weight: 700;
          color: ${t.textColor || "#141B2D"};
        }

        .title {
          font-size: 12px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: ${t.accentColor || "#B76E79"};
          margin-top: 6px;
          font-weight: 600;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .contactRow {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 16px;
          margin-top: 12px;
        }

        .contactItem {
          font-size: 11px;
          color: #666;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .section {
          margin-top: 26px;
        }

        .sectionTitle {
          font-size: 15px;
          font-weight: 700;
          color: ${t.textColor || "#141B2D"};
          border-bottom: 2px solid ${t.accentColor || "#B76E79"};
          display: inline-block;
          padding-bottom: 4px;
          margin: 0 0 14px;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.8;
          color: #4a4a4a;
          margin: 0;
        }

        .job {
          margin-bottom: 18px;
        }

        .jobTop {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }

        .jobTitle {
          font-size: 13.5px;
          font-weight: 700;
          color: ${t.textColor || "#141B2D"};
        }

        .jobDate {
          font-size: 11px;
          color: #999;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .jobSub {
          font-size: 11.5px;
          font-style: italic;
          color: #7a7a7a;
          margin: 2px 0 6px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #565656;
        }

        .eduItem {
          margin-bottom: 14px;
        }

        .eduTop {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }

        .eduSchool {
          font-size: 12.5px;
          font-weight: 700;
        }

        .eduDate {
          font-size: 10px;
          color: #999;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .eduDegree {
          font-size: 11.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .skillsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 24px;
        }

        .skillName {
          font-size: 11.5px;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .skillBar {
          height: 3px;
          background: #efefef;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#B76E79"};
        }

        .refItem {
          font-size: 11.5px;
          color: #565656;
          margin-bottom: 6px;
        }

        .refName {
          font-weight: 700;
          color: ${t.textColor || "#141B2D"};
        }

        .indexRail {
          width: 150px;
          background: ${t.primaryColor || "#141B2D"};
          color: #fff;
          padding: 42px 22px;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .indexTitle {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${t.accentColor || "#B76E79"};
          margin-bottom: 20px;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .indexEntry {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-size: 11.5px;
          color: #e6e2e0;
          margin-bottom: 16px;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .indexNum {
          font-size: 10px;
          color: ${t.accentColor || "#B76E79"};
          font-weight: 700;
        }

        @media (max-width: 800px) {
          .pl-template { flex-direction: column; }
          .indexRail { width: 100%; }
        }

        @media print {
          .pl-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
