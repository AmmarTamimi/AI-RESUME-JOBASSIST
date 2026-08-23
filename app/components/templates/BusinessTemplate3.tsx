import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function BusinessLetterheadTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];

  return (
    <div className="bl-template">
      {/* ================= LETTERHEAD ================= */}
      <div className="letterhead">
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
      </div>

      <div className="doubleRule" />

      {/* ================= BODY ================= */}
      <div className="body">
        {aboutText && (
          <div className="section">
            <div className="sectionHead"><span className="bar" />Professional Summary</div>
            <p className="aboutText">{aboutText}</p>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section">
            <div className="sectionHead"><span className="bar" />Work Experience</div>
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

        {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
          <div className="section">
            <div className="sectionHead"><span className="bar" />Core Skills</div>
            <div className="pillRow">
              {ratedSkillsSection.items.map((skill, i) => (
                <span className="pill" key={i}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        <div className="footerGrid">
          {educationSection && educationSection.items.length > 0 && (
            <div className="section">
              <div className="sectionHead"><span className="bar" />Education</div>
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

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="section">
              <div className="sectionHead"><span className="bar" />References</div>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem" key={i}>
                  <span className="refName">{ref.name}</span>
                  {ref.phone && <span className="refLine">{ref.phone}</span>}
                  {ref.email && <span className="refLine">{ref.email}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bl-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          color: #232323;
          font-family: ${t.bodyFont || "Arial"}, sans-serif;
          padding: 42px 50px 46px;
          box-sizing: border-box;
        }

        .letterhead {
          text-align: center;
        }

        .name {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 1px;
          color: ${t.primaryColor || "#26344B"};
        }

        .title {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${t.accentColor || "#8C1F28"};
          font-weight: 700;
          margin-top: 6px;
        }

        .contactRow {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 4px 14px;
          margin-top: 12px;
        }

        .contactItem {
          font-size: 11px;
          color: #5c5c5c;
        }

        .contactItem:not(:last-child)::after {
          content: "|";
          margin-left: 14px;
          color: #ccc;
        }

        .doubleRule {
          height: 3px;
          border-top: 1px solid ${t.primaryColor || "#26344B"};
          border-bottom: 1px solid ${t.primaryColor || "#26344B"};
          margin-top: 18px;
        }

        .body {
          margin-top: 26px;
        }

        .section {
          margin-bottom: 24px;
        }

        .sectionHead {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: ${t.primaryColor || "#26344B"};
          margin-bottom: 12px;
        }

        .bar {
          width: 4px;
          height: 14px;
          background: ${t.accentColor || "#8C1F28"};
          display: inline-block;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.8;
          color: #4a4a4a;
          margin: 0;
          padding-left: 12px;
        }

        .job {
          margin-bottom: 16px;
          padding-left: 12px;
        }

        .jobTop {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }

        .jobTitle {
          font-size: 13px;
          font-weight: 700;
        }

        .jobDate {
          font-size: 11px;
          color: #999;
        }

        .jobSub {
          font-size: 11.5px;
          font-style: italic;
          color: #6b6b6b;
          margin: 2px 0 6px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #5c5c5c;
        }

        .pillRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-left: 12px;
        }

        .pill {
          font-size: 11px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 3px;
          background: #f1f1ee;
          border: 1px solid #e0ded6;
          color: ${t.primaryColor || "#26344B"};
        }

        .footerGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .eduItem {
          margin-bottom: 12px;
          padding-left: 12px;
        }

        .eduTop {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }

        .eduSchool {
          font-size: 12px;
          font-weight: 700;
        }

        .eduDate {
          font-size: 10px;
          color: #999;
        }

        .eduDegree {
          font-size: 11px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .refItem {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          padding-left: 12px;
        }

        .refName {
          font-size: 12px;
          font-weight: 700;
        }

        .refLine {
          font-size: 10.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        @media (max-width: 700px) {
          .footerGrid { grid-template-columns: 1fr; }
        }

        @media print {
          .bl-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
