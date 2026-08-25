import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function BusinessMonogramTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];

  const initials = personalInfo.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dotsFor = (level: number) => Math.max(1, Math.min(5, Math.round(level / 20)));

  return (
    <div className="bm-template">
      {/* ================= HEADER WITH MONOGRAM WATERMARK ================= */}
      <div className="header">
        <div className="monogram">{initials || "U"}</div>
        <div className="headerContent">
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
      </div>

      <div className="rule" />

      {/* ================= BODY ================= */}
      <div className="body">
        <div className="mainCol">
          {aboutText && (
            <div className="section">
              <h2 className="sectionTitle">Summary</h2>
              <p className="aboutText">{aboutText}</p>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="section">
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
        </div>

        <div className="sideCol">
          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="section">
              <h2 className="sectionTitle">Skills</h2>
              {ratedSkillsSection.items.map((skill, i) => (
                <div className="skillRow" key={i}>
                  <span className="skillName">{skill.name}</span>
                  <div className="dots">
                    {Array.from({ length: 5 }).map((_, d) => (
                      <span key={d} className={`dot ${d < dotsFor(skill.level) ? "filled" : ""}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {educationSection && educationSection.items.length > 0 && (
            <div className="section">
              <h2 className="sectionTitle">Education</h2>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem" key={i}>
                  <div className="eduSchool">{edu.school}</div>
                  <div className="eduDegree">{edu.degree}</div>
                  <div className="eduDate">{edu.start} – {edu.end}</div>
                </div>
              ))}
            </div>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="section">
              <h2 className="sectionTitle">References</h2>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem" key={i}>
                  <div className="refName">{ref.name}</div>
                  {ref.phone && <div className="refLine">{ref.phone}</div>}
                  {ref.email && <div className="refLine">{ref.email}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bm-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
          padding: 38px 44px 42px;
          box-sizing: border-box;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 22px;
          position: relative;
        }

        .monogram {
          width: 72px;
          height: 72px;
          border-radius: 6px;
          background: ${t.primaryColor || "#20232A"};
          color: ${t.accentColor || "#8E3B76"};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .name {
          font-size: 27px;
          font-weight: 800;
          color: ${t.primaryColor || "#20232A"};
          letter-spacing: -0.2px;
        }

        .title {
          font-size: 11.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${t.accentColor || "#8E3B76"};
          font-weight: 700;
          margin-top: 4px;
        }

        .contactRow {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 16px;
          margin-top: 10px;
        }

        .contactItem {
          font-size: 11px;
          color: #666;
        }

        .rule {
          height: 2px;
          background: ${t.accentColor || "#8E3B76"};
          margin-top: 22px;
        }

        .body {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 32px;
          margin-top: 26px;
        }

        .section {
          margin-bottom: 24px;
        }

        .sectionTitle {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${t.primaryColor || "#20232A"};
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
          color: #22262b;
        }

        .jobDate {
          font-size: 10.5px;
          color: #a3a3a3;
        }

        .jobSub {
          font-size: 11.5px;
          color: ${t.accentColor || "#8E3B76"};
          font-weight: 600;
          margin: 2px 0 6px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #5c5c5c;
        }

        .skillRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 11px;
        }

        .skillName {
          font-size: 11.5px;
          font-weight: 600;
          color: #333;
        }

        .dots {
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e5e2e6;
        }

        .dot.filled {
          background: ${t.accentColor || "#8E3B76"};
        }

        .eduItem {
          margin-bottom: 14px;
        }

        .eduSchool {
          font-size: 12px;
          font-weight: 700;
        }

        .eduDegree {
          font-size: 11px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .eduDate {
          font-size: 10px;
          color: #a3a3a3;
          margin-top: 2px;
        }

        .refItem {
          margin-bottom: 12px;
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

        @media (max-width: 800px) {
          .body { grid-template-columns: 1fr; }
        }

        @media print {
          .bm-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
