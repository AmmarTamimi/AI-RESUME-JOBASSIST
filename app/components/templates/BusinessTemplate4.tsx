import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function BusinessRibbonTemplate({ content, theme }: TemplateProps) {
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
    <div className="br-template data-resume-root">
      {/* ================= RIBBON HEADER ================= */}
      <div className="ribbon data-resume-root">
        <div className="ribbonInner data-resume-root">
          {personalInfo.photoUrl ? (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          ) : (
            <div className="photoFallback data-resume-root">{initials || "U"}</div>
          )}
          <div>
            <div className="name data-resume-root">{personalInfo.fullName}</div>
            <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
          </div>
        </div>
        <div className="contactCol data-resume-root">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (typeof item === "object" && item !== null && "description" in item) {
                  return <div className="contactItem data-resume-root" key={i}>{item.description}</div>;
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && <div className="contactItem data-resume-root">{personalInfo.phone}</div>}
                {personalInfo.email && <div className="contactItem data-resume-root">{personalInfo.email}</div>}
                {personalInfo.location && <div className="contactItem data-resume-root">{personalInfo.location}</div>}
                {personalInfo.website && <div className="contactItem data-resume-root">{personalInfo.website}</div>}
              </>
            )}
        </div>
        <div className="ribbonEdge data-resume-root" />
      </div>

      {/* ================= BODY ================= */}
      <div className="body data-resume-root">
        {aboutText && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">Summary</h2>
            <p className="aboutText">{aboutText}</p>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">{experienceSection.title || 'Experience'}</h2>
            {experienceSection.items.map((job, i) => (
              <div className="job data-resume-root" key={i}>
                <span className="bullet" />
                <div className="jobContent data-resume-root">
                  <div className="jobTop data-resume-root">
                    <span className="jobTitle">{job.role || "Position"}</span>
                    <span className="jobDate">{job.start} â€“ {job.end || "Present"}</span>
                  </div>
                  <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                  {job.bullets && job.bullets.length > 0 && <div className="jobDesc data-resume-root">{job.bullets}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="footerCols data-resume-root">
          {educationSection && educationSection.items.length > 0 && (
            <div className="section data-resume-root">
              <h2 className="sectionTitle">{educationSection.title || 'Education'}</h2>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem data-resume-root" key={i}>
                  <div className="eduSchool data-resume-root">{edu.school}</div>
                  <div className="eduDegree data-resume-root">{edu.degree}</div>
                  <div className="eduDate data-resume-root">{edu.start} â€“ {edu.end}</div>
                </div>
              ))}
            </div>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="section data-resume-root">
              <h2 className="sectionTitle">{referencesSection.title || 'References'}</h2>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem data-resume-root" key={i}>
                  <div className="refName data-resume-root">{ref.name}</div>
                  {ref.phone && <div className="refLine data-resume-root">{ref.phone}</div>}
                  {ref.email && <div className="refLine data-resume-root">{ref.email}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= SKILL METER STRIP ================= */}
      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="skillStrip data-resume-root">
          {ratedSkillsSection.items.map((skill, i) => (
            <div className="skillCell data-resume-root" key={i}>
              <div className="skillTop data-resume-root">
                <span className="skillName">{skill.name}</span>
                <span className="skillPct">{skill.level}%</span>
              </div>
              <div className="skillBar data-resume-root"><div className="skillFill data-resume-root" style={{ width: `${skill.level}%` }} /></div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .br-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
        }

        .ribbon {
          background: ${t.primaryColor || "#1B4B91"};
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 42px 32px;
          position: relative;
        }

        .ribbonEdge {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -14px;
          height: 14px;
          background: ${t.primaryColor || "#1B4B91"};
          clip-path: polygon(0 0, 100% 0, 100% 40%, 50% 100%, 0 40%);
        }

        .ribbonInner {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .photo, .photoFallback {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid ${t.accentColor || "#FF6B4A"};
        }

        .photoFallback {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          background: rgba(255,255,255,0.12);
          color: ${t.accentColor || "#FF6B4A"};
        }

        .name {
          font-size: 25px;
          font-weight: 800;
        }

        .title {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${t.accentColor || "#FF6B4A"};
          font-weight: 700;
          margin-top: 4px;
        }

        .contactCol {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .contactItem {
          font-size: 10.5px;
          color: #dce6f5;
        }

        .body {
          padding: 34px 42px 8px;
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
          color: ${t.primaryColor || "#1B4B91"};
          margin: 0 0 14px;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.8;
          color: #4a4a4a;
          margin: 0;
        }

        .job {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${t.accentColor || "#FF6B4A"};
          margin-top: 5px;
          flex-shrink: 0;
        }

        .jobContent {
          flex: 1;
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
          color: ${t.primaryColor || "#1B4B91"};
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
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .eduItem {
          margin-bottom: 12px;
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

        .skillStrip {
          background: #f5f7fa;
          border-top: 1px solid #e6eaf0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          padding: 20px 42px;
        }

        .skillTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .skillName {
          font-size: 10.5px;
          font-weight: 700;
          color: #22262b;
        }

        .skillPct {
          font-size: 9.5px;
          color: #9aa1ab;
        }

        .skillBar {
          height: 4px;
          background: #e2e6eb;
          border-radius: 2px;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#FF6B4A"};
          border-radius: 2px;
        }

        @media (max-width: 800px) {
          .footerCols { grid-template-columns: 1fr; }
          .skillStrip { grid-template-columns: 1fr 1fr; }
          .ribbon { flex-wrap: wrap; }
        }

        @media print {
          .br-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}


