import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function ProfessionalCompactTemplate({ content, theme }: TemplateProps) {
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

  return (
    <div className="pc-template">
      {/* ================= BANNER ================= */}
      <div className="banner">
        {personalInfo.photoUrl ? (
          <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
        ) : (
          <div className="photoFallback">{initials || "U"}</div>
        )}
        <div className="bannerText">
          <div className="name">{personalInfo.fullName}</div>
          <div className="title">{personalInfo.title || "PROFESSIONAL"}</div>
        </div>
      </div>

      {/* ================= FORM-STYLE INFO ROW ================= */}
      <div className="infoRow">
        {personalInfo.phone && (
          <div className="infoCell"><span className="infoLabel">Phone</span><span className="infoValue">{personalInfo.phone}</span></div>
        )}
        {personalInfo.email && (
          <div className="infoCell"><span className="infoLabel">Email</span><span className="infoValue">{personalInfo.email}</span></div>
        )}
        {personalInfo.location && (
          <div className="infoCell"><span className="infoLabel">Location</span><span className="infoValue">{personalInfo.location}</span></div>
        )}
        {personalInfo.website && (
          <div className="infoCell"><span className="infoLabel">Website</span><span className="infoValue">{personalInfo.website}</span></div>
        )}
        {contactItems.length > 0 &&
          contactItems.map((item, i) => {
            if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
              return (
                <div className="infoCell" key={i}>
                  <span className="infoLabel">{String(item.label)}</span>
                  <span className="infoValue">{item.description}</span>
                </div>
              );
            }
            return null;
          })}
      </div>

      {/* ================= BODY ================= */}
      <div className="body">
        {aboutText && (
          <div className="section">
            <h2 className="sectionTitle">Profile</h2>
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

        <div className="footerCols">
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

          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="section">
              <h2 className="sectionTitle">Skills</h2>
              {ratedSkillsSection.items.map((skill, i) => (
                <div className="skillRow" key={i}>
                  <span className="skillName">{skill.name}</span>
                  <div className="skillBar"><div className="skillFill" style={{ width: `${skill.level}%` }} /></div>
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
        .pc-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
        }

        .banner {
          background: ${t.primaryColor || "#3E2723"};
          color: #fff;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 26px 42px;
        }

        .photo, .photoFallback {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          object-fit: cover;
        }

        .photoFallback {
          background: rgba(255,255,255,0.12);
          color: ${t.accentColor || "#4FB0A5"};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
        }

        .name {
          font-size: 25px;
          font-weight: 800;
        }

        .title {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${t.accentColor || "#4FB0A5"};
          margin-top: 4px;
          font-weight: 700;
        }

        .infoRow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #e3e0da;
        }

        .infoCell {
          padding: 12px 16px;
          border-right: 1px solid #e3e0da;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .infoCell:last-child {
          border-right: none;
        }

        .infoLabel {
          font-size: 9px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #a3a3a3;
          font-weight: 700;
        }

        .infoValue {
          font-size: 11px;
          color: #2b2b2b;
          font-weight: 600;
        }

        .body {
          padding: 30px 42px 36px;
          box-sizing: border-box;
        }

        .section {
          margin-bottom: 26px;
        }

        .sectionTitle {
          font-size: 13.5px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${t.primaryColor || "#3E2723"};
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
          color: ${t.accentColor || "#4FB0A5"};
          font-weight: 600;
          margin: 2px 0 6px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #5c5c5c;
        }

        .footerCols {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 26px;
        }

        .eduItem {
          margin-bottom: 12px;
        }

        .eduSchool {
          font-size: 11.5px;
          font-weight: 700;
        }

        .eduDegree {
          font-size: 10.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .eduDate {
          font-size: 9.5px;
          color: #a3a3a3;
          margin-top: 2px;
        }

        .skillRow {
          margin-bottom: 10px;
        }

        .skillName {
          font-size: 11px;
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
          background: ${t.accentColor || "#4FB0A5"};
        }

        .refItem {
          margin-bottom: 10px;
        }

        .refName {
          font-size: 11.5px;
          font-weight: 700;
        }

        .refLine {
          font-size: 10px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        @media (max-width: 800px) {
          .infoRow { grid-template-columns: 1fr 1fr; }
          .footerCols { grid-template-columns: 1fr; }
        }

        @media print {
          .pc-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
