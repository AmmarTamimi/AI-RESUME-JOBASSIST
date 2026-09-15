import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function BoldTemplate({ content, theme }: TemplateProps) {
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
    <div className="bold-template data-resume-root">
      {/* ================= HEADER BAND ================= */}
      <div className="headerBand data-resume-root">
        <div className="headerInner data-resume-root">
          {personalInfo.photoUrl && (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          ) }
          <div className="nameBlock data-resume-root">
            <div className="name data-resume-root">{personalInfo.fullName}</div>
            <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
          </div>
          <div className="contactCol data-resume-root">
            {contactItems.length > 0
              ? contactItems.map((item, i) => {
                  if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
                    return (
                      <div className="contactItem data-resume-root" key={i}>
                        {item.description}
                      </div>
                    );
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
        </div>
        <div className="angleCut data-resume-root" />
      </div>

      {/* ================= BODY ================= */}
      <div className="body data-resume-root">
        <div className="mainCol data-resume-root">
          {aboutText && (
            <div className="section data-resume-root">
              <div className="sectionTitle data-resume-root"><span className="tag">ABOUT</span></div>
              <p className="aboutText">{aboutText}</p>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="section data-resume-root">
              <div className="sectionTitle data-resume-root"><span className="tag">{experienceSection.title || 'EXPERIENCE'}</span></div>
              {experienceSection.items.map((job, i) => (
                <div className="job data-resume-root" key={i}>
                  <div className="jobTop data-resume-root">
                    <span className="jobTitle">{job.role || "Position"}</span>
                    <span className="jobDate">{job.start} – {job.end || "Present"}</span>
                  </div>
                  <div className="jobSub data-resume-root">{job.company}{job.location ? ` / ${job.location}` : ""}</div>
                  {job.bullets && job.bullets.length > 0 && (
                    <div className="jobDesc data-resume-root">{job.bullets}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sideCol data-resume-root">
          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="section data-resume-root">
              <div className="sectionTitle data-resume-root"><span className="tag">{ratedSkillsSection.title || 'SKILLS'}</span></div>
              <div className="skills data-resume-root">
                {ratedSkillsSection.items.map((skill, i) => (
                  <div key={i}>
                    <div className="skillName data-resume-root">{skill.name}</div>
                    <div className="skillBar data-resume-root">
                      <div className="skillFill data-resume-root" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {educationSection && educationSection.items.length > 0 && (
            <div className="section data-resume-root">
              <div className="sectionTitle data-resume-root"><span className="tag">{educationSection.title || 'EDUCATION'}</span></div>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem data-resume-root" key={i}>
                  <b>{edu.school}</b>
                  <span>{edu.degree}</span>
                  <span className="dates">{edu.start} – {edu.end}</span>
                </div>
              ))}
            </div>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="section data-resume-root">
              <div className="sectionTitle data-resume-root"><span className="tag">{referencesSection.title || 'REFERENCES'}</span></div>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem data-resume-root" key={i}>
                  <b>{ref.name}</b>
                  {ref.phone && <span>Tel: {ref.phone}</span>}
                  {ref.email && <span>{ref.email}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bold-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          font-family: ${t.bodyFont || "Manrope"}, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .headerBand {
          background: ${t.primaryColor || "#3B1F3D"};
          color: #fff;
          position: relative;
          padding: 40px 46px 46px;
        }

        .angleCut {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 26px;
          background: #fff;
          clip-path: polygon(0 100%, 100% 0, 100% 100%);
        }

        .headerInner {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .photo, .photoFallback {
          width: 84px;
          height: 84px;
          border-radius: 12px;
          object-fit: cover;
          border: 3px solid ${t.accentColor || "#CFE85C"};
          flex-shrink: 0;
        }

        .photoFallback {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${t.headingFont || "Sora"}, sans-serif;
          font-size: 30px;
          font-weight: 700;
          background: rgba(255,255,255,0.08);
          color: ${t.accentColor || "#CFE85C"};
        }

        .nameBlock {
          flex: 1;
        }

        .name {
          font-family: ${t.headingFont || "Sora"}, sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.3px;
        }

        .title {
          font-size: 12.5px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${t.accentColor || "#CFE85C"};
          margin-top: 6px;
          font-weight: 700;
        }

        .contactCol {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contactItem {
          font-size: 11.5px;
          color: #e9e2ea;
        }

        .body {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 8px;
          padding: 40px 46px 46px;
        }

        .mainCol {
          padding-right: 30px;
          border-right: 1px solid #ececec;
        }

        .sideCol {
          padding-left: 30px;
        }

        .section {
          margin-bottom: 30px;
        }

        .sectionTitle {
          margin-bottom: 16px;
        }

        /* Section titles — purple text, no pill */
        .tag {
          display: inline-block;
          background: transparent;
          color: ${t.primaryColor || "#3B1F3D"};
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          padding: 0;
          border-radius: 0;
        }

        .aboutText {
          font-size: 13px;
          line-height: 1.85;
          color: #4a4a4a;
          margin: 0;
        }

        .job {
          margin-bottom: 20px;
          position: relative;
          padding-left: 18px;
        }

        .job::before {
          content: "";
          position: absolute;
          left: 0;
          top: 5px;
          width: 8px;
          height: 8px;
          background: ${t.accentColor || "#CFE85C"};
          border-radius: 2px;
        }

        .jobTop {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }

        .jobTitle {
          font-size: 14px;
          font-weight: 800;
          color: ${t.textColor || "#241227"};
        }

        .jobDate {
          font-size: 11px;
          font-weight: 700;
          color: #a3a3a3;
        }

        .jobSub {
          font-size: 12px;
          font-weight: 600;
          color: ${t.primaryColor || "#3B1F3D"};
          margin: 3px 0 7px;
        }

        .jobDesc {
          font-size: 12px;
          color: #6a6a6a;
          line-height: 1.7;
        }

        .skills {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .skillName {
          font-size: 12px;
          font-weight: 700;
          color: ${t.textColor || "#241227"};
          margin-bottom: 6px;
        }

        .skillBar {
          height: 7px;
          background: #efefef;
          border-radius: 4px;
          overflow: hidden;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#CFE85C"};
          border-radius: 4px;
        }

        .eduItem, .refItem {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          font-size: 12px;
          color: #6a6a6a;
          line-height: 1.6;
        }

        .eduItem b, .refItem b {
          color: ${t.textColor || "#241227"};
          font-size: 13px;
          margin-bottom: 2px;
        }

        .dates {
          font-size: 10.5px;
          color: #a3a3a3;
        }

        @media (max-width: 800px) {
          .headerInner { flex-wrap: wrap; }
          .body { grid-template-columns: 1fr; }
          .mainCol { border-right: none; padding-right: 0; border-bottom: 1px solid #ececec; padding-bottom: 20px; }
          .sideCol { padding-left: 0; }
        }

        @media print {
          .bold-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}