import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function MinimalSplitTemplate({ content, theme }: TemplateProps) {
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
    <div className="ms-template data-resume-root">
      {/* ================= FULL-WIDTH IDENTITY BAND ================= */}
      <div className="identityBand data-resume-root">
        <div className="identityLeft data-resume-root">
          {personalInfo.photoUrl ? (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          ) : (
            <div className="photoFallback data-resume-root">{initials || "U"}</div>
          )}
          <div>
            <h1 className="name">{personalInfo.fullName}</h1>
            <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
          </div>
        </div>
        <div className="identityRight data-resume-root">
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
      </div>

      <div className="fullRule data-resume-root" />

      {/* ================= 50/50 SPLIT BODY ================= */}
      <div className="splitBody data-resume-root">
        <div className="colLeft data-resume-root">
          {aboutText && (
            <div className="section data-resume-root">
              <h2 className="sectionLabel">Profile</h2>
              <p className="aboutText">{aboutText}</p>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="section data-resume-root">
              <h2 className="sectionLabel">{experienceSection.title || 'Experience'}</h2>
              {experienceSection.items.map((job, i) => (
                <div className="job data-resume-root" key={i}>
                  <div className="jobTop data-resume-root">
                    <span className="jobTitle">{job.role || "Position"}</span>
                    <span className="jobDate">{job.start} â€“ {job.end || "Present"}</span>
                  </div>
                  <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                  {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets[0]}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="verticalDivider data-resume-root" />

        <div className="colRight data-resume-root">
          {educationSection && educationSection.items.length > 0 && (
            <div className="section data-resume-root">
              <h2 className="sectionLabel">{educationSection.title || 'Education'}</h2>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem data-resume-root" key={i}>
                  <div className="eduSchool data-resume-root">{edu.school}</div>
                  <div className="eduDegree data-resume-root">{edu.degree}</div>
                  <div className="eduDate data-resume-root">{edu.start} â€“ {edu.end}</div>
                </div>
              ))}
            </div>
          )}

          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="section data-resume-root">
              <h2 className="sectionLabel">{ratedSkillsSection.title || 'Skills'}</h2>
              <div className="skillList data-resume-root">
                {ratedSkillsSection.items.map((skill, i) => (
                  <div className="skillRow data-resume-root" key={i}>
                    <span className="skillName">{skill.name}</span>
                    <div className="skillBar data-resume-root"><div className="skillFill data-resume-root" style={{ width: `${skill.level}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="section data-resume-root">
              <h2 className="sectionLabel">{referencesSection.title || 'References'}</h2>
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

      <style jsx>{`
        .ms-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          color: ${t.textColor || "#212121"};
          font-family: ${t.bodyFont || "Work Sans"}, sans-serif;
          padding: 44px 50px 46px;
          box-sizing: border-box;
        }

        .identityBand {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }

        .identityLeft {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .photo, .photoFallback {
          width: 56px;
          height: 56px;
          border-radius: 6px;
          object-fit: cover;
        }

        .photoFallback {
          background: ${t.accentColor || "#3E5C4F"};
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
        }

        .name {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
          color: ${t.textColor || "#212121"};
          letter-spacing: -0.4px;
        }

        .title {
          font-size: 11.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${t.accentColor || "#3E5C4F"};
          font-weight: 700;
          margin-top: 4px;
        }

        .identityRight {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .contactItem {
          font-size: 11.5px;
          color: #666;
        }

        .fullRule {
          height: 2px;
          background: ${t.accentColor || "#3E5C4F"};
          margin: 22px 0 0;
        }

        .splitBody {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 36px;
          margin-top: 30px;
        }

        .verticalDivider {
          background: #e8e6e0;
        }

        .section {
          margin-bottom: 28px;
        }

        .sectionLabel {
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9a9a9a;
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
          color: ${t.textColor || "#212121"};
        }

        .jobDate {
          font-size: 10.5px;
          color: #a3a3a3;
        }

        .jobSub {
          font-size: 11.5px;
          font-style: italic;
          color: ${t.accentColor || "#3E5C4F"};
          margin: 2px 0 6px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #5c5c5c;
          margin: 0;
        }

        .eduItem {
          margin-bottom: 14px;
        }

        .eduSchool {
          font-size: 12.5px;
          font-weight: 700;
        }

        .eduDegree {
          font-size: 11.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .eduDate {
          font-size: 10px;
          color: #a3a3a3;
          margin-top: 2px;
        }

        .skillList {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skillName {
          font-size: 11.5px;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .skillBar {
          height: 3px;
          background: #eeece6;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#3E5C4F"};
        }

        .refItem {
          margin-bottom: 12px;
        }

        .refName {
          font-size: 12.5px;
          font-weight: 700;
        }

        .refLine {
          font-size: 11px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        @media (max-width: 750px) {
          .splitBody { grid-template-columns: 1fr; }
          .verticalDivider { display: none; }
          .identityRight { align-items: flex-start; }
        }

        @media print {
          .ms-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}


