import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function MinimalMarginNotesTemplate({ content, theme }: TemplateProps) {
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
    <div className="mn-template">
      <header className="header">
        <h1 className="name">{personalInfo.fullName}</h1>
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

      <div className="rule" />

      {aboutText && (
        <div className="marginRow">
          <div className="marginLabel">Profile</div>
          <div className="marginContent">
            <p className="aboutText">{aboutText}</p>
          </div>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <>
          {experienceSection.items.map((job, i) => (
            <div className="marginRow" key={i}>
              <div className="marginLabel">
                {i === 0 ? "Experience" : ""}
                <div className="marginDate">{job.start} – {job.end || "Present"}</div>
              </div>
              <div className="marginContent">
                <div className="jobTitle">{job.role || "Position"}</div>
                <div className="jobSub">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets[0]}</p>}
              </div>
            </div>
          ))}
        </>
      )}

      {educationSection && educationSection.items.length > 0 && (
        <>
          {educationSection.items.map((edu, i) => (
            <div className="marginRow" key={i}>
              <div className="marginLabel">
                {i === 0 ? "Education" : ""}
                <div className="marginDate">{edu.start} – {edu.end}</div>
              </div>
              <div className="marginContent">
                <div className="jobTitle">{edu.school}</div>
                <div className="jobSub">{edu.degree}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="marginRow">
          <div className="marginLabel">Skills</div>
          <div className="marginContent">
            <div className="skillLine">
              {ratedSkillsSection.items.map((s) => s.name).join("   ·   ")}
            </div>
          </div>
        </div>
      )}

      {referencesSection && referencesSection.items.length > 0 && (
        <div className="marginRow">
          <div className="marginLabel">References</div>
          <div className="marginContent">
            {referencesSection.items.map((ref, i) => (
              <div className="refItem" key={i}>
                <span className="refName">{ref.name}</span>
                {ref.phone && <span className="refLine"> · {ref.phone}</span>}
                {ref.email && <span className="refLine"> · {ref.email}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .mn-template {
          width: 100%;
          min-height: 100%;
          background: ${t.backgroundColor || "#FBFAF7"};
          color: ${t.textColor || "#33322E"};
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
          padding: 44px 54px 50px;
          box-sizing: border-box;
        }

        .header {
          margin-bottom: 4px;
        }

        .name {
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 32px;
          font-weight: 600;
          margin: 0;
        }

        .title {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: ${t.accentColor || "#5B8C85"};
          font-weight: 700;
          margin-top: 5px;
        }

        .contactRow {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 14px;
          margin-top: 12px;
        }

        .contactItem {
          font-size: 11px;
          color: #6b6b6b;
        }

        .rule {
          height: 1px;
          background: #ded9cc;
          margin: 20px 0 6px;
        }

        .marginRow {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid #eeebe1;
        }

        .marginLabel {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${t.accentColor || "#5B8C85"};
        }

        .marginDate {
          font-size: 10px;
          color: #a3a09a;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          margin-top: 4px;
        }

        .jobTitle {
          font-size: 13px;
          font-weight: 700;
          color: ${t.textColor || "#33322E"};
        }

        .jobSub {
          font-size: 11.5px;
          font-style: italic;
          color: #8a8a8a;
          margin-top: 2px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #55534c;
          margin: 6px 0 0;
        }

        .skillLine {
          font-size: 12px;
          color: #4a4943;
          line-height: 1.8;
        }

        .refItem {
          font-size: 11.5px;
          color: #55534c;
          margin-bottom: 6px;
        }

        .refName {
          font-weight: 700;
          color: ${t.textColor || "#33322E"};
        }

        @media (max-width: 650px) {
          .marginRow { grid-template-columns: 1fr; gap: 4px; }
        }

        @media print {
          .mn-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
