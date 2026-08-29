import React from "react";
import type { TemplateProps } from "../../types/Content";

export default function BusinessCardedTemplate({ content, theme }: TemplateProps) {
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
    <div className="bc-template data-resume-root">
      {/* ================= TOP BAND ================= */}
      <div className="topBand data-resume-root">
        {personalInfo.photoUrl ? (
          <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
        ) : (
          <div className="photoFallback data-resume-root">{initials || "U"}</div>
        )}
        <div className="idBlock data-resume-root">
          <div className="name data-resume-root">{personalInfo.fullName}</div>
          <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
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
      </div>

      {/* ================= BODY: CARD GRID ================= */}
      <div className="body data-resume-root">
        <div className="mainCol data-resume-root">
          {aboutText && (
            <div className="card data-resume-root">
              <div className="cardHeader data-resume-root"><span className="cardNum">01</span>Summary</div>
              <div className="cardBody data-resume-root">
                <p className="aboutText">{aboutText}</p>
              </div>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="card data-resume-root">
              <div className="cardHeader data-resume-root"><span className="cardNum">02</span>{experienceSection.title || 'Experience'}</div>
              <div className="cardBody data-resume-root">
                {experienceSection.items.map((job, i) => (
                  <div className="job data-resume-root" key={i}>
                    <div className="jobTop data-resume-root">
                      <span className="jobTitle">{job.role || "Position"}</span>
                      <span className="jobDate">{job.start} â€“ {job.end || "Present"}</span>
                    </div>
                    <div className="jobSub data-resume-root">{job.company}{job.location ? ` / ${job.location}` : ""}</div>
                    {job.bullets && job.bullets.length > 0 && <div className="jobDesc data-resume-root">{job.bullets}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sideCol data-resume-root">
          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="card data-resume-root">
              <div className="cardHeader data-resume-root"><span className="cardNum">03</span>{ratedSkillsSection.title || 'Skills'}</div>
              <div className="cardBody data-resume-root">
                {ratedSkillsSection.items.map((skill, i) => (
                  <div className="skillRow data-resume-root" key={i}>
                    <div className="skillTop data-resume-root">
                      <span className="skillName">{skill.name}</span>
                      <span className="skillPct">{skill.level}%</span>
                    </div>
                    <div className="skillBar data-resume-root"><div className="skillFill data-resume-root" style={{ width: `${skill.level}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {educationSection && educationSection.items.length > 0 && (
            <div className="card data-resume-root">
              <div className="cardHeader data-resume-root"><span className="cardNum">04</span>{educationSection.title || 'Education'}</div>
              <div className="cardBody data-resume-root">
                {educationSection.items.map((edu, i) => (
                  <div className="eduItem data-resume-root" key={i}>
                    <div className="eduSchool data-resume-root">{edu.school}</div>
                    <div className="eduDegree data-resume-root">{edu.degree}</div>
                    <div className="eduDate data-resume-root">{edu.start} â€“ {edu.end}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="card data-resume-root">
              <div className="cardHeader data-resume-root"><span className="cardNum">05</span>{referencesSection.title || 'References'}</div>
              <div className="cardBody data-resume-root">
                {referencesSection.items.map((ref, i) => (
                  <div className="refItem data-resume-root" key={i}>
                    <div className="refName data-resume-root">{ref.name}</div>
                    {ref.phone && <div className="refLine data-resume-root">{ref.phone}</div>}
                    {ref.email && <div className="refLine data-resume-root">{ref.email}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bc-template {
          width: 100%;
          min-height: 100%;
          background: #f4f5f7;
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
        }

        .topBand {
          background: ${t.primaryColor || "#1B3A5C"};
          color: #fff;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 28px 40px;
        }

        .photo, .photoFallback {
          width: 54px;
          height: 54px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .photoFallback {
          background: rgba(255,255,255,0.12);
          color: ${t.accentColor || "#E8A33D"};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 19px;
        }

        .idBlock {
          flex: 1;
        }

        .name {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }

        .title {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${t.accentColor || "#E8A33D"};
          margin-top: 3px;
          font-weight: 700;
        }

        .contactCol {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .contactItem {
          font-size: 10.5px;
          color: #d7dee7;
        }

        .body {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 18px;
          padding: 24px 40px 34px;
          box-sizing: border-box;
        }

        .card {
          background: #fff;
          border: 1px solid #e3e6eb;
          border-radius: 8px;
          margin-bottom: 18px;
          overflow: hidden;
        }

        .cardHeader {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #eef1f5;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: ${t.primaryColor || "#1B3A5C"};
          border-bottom: 1px solid #e3e6eb;
        }

        .cardNum {
          font-size: 10.5px;
          font-weight: 700;
          color: #fff;
          background: ${t.accentColor || "#E8A33D"};
          border-radius: 4px;
          padding: 2px 6px;
        }

        .cardBody {
          padding: 16px;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.75;
          color: #4a4a4a;
          margin: 0;
        }

        .job {
          margin-bottom: 16px;
        }

        .job:last-child {
          margin-bottom: 0;
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
          color: #22262b;
        }

        .jobDate {
          font-size: 10.5px;
          color: #9aa1ab;
        }

        .jobSub {
          font-size: 11.5px;
          color: ${t.primaryColor || "#1B3A5C"};
          font-weight: 600;
          margin: 2px 0 6px;
        }

        .jobDesc {
          font-size: 11.5px;
          color: #5c5c5c;
          line-height: 1.6;
        }

        .skillRow {
          margin-bottom: 12px;
        }

        .skillRow:last-child {
          margin-bottom: 0;
        }

        .skillTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .skillName {
          font-size: 11.5px;
          font-weight: 600;
        }

        .skillPct {
          font-size: 10px;
          color: #9aa1ab;
        }

        .skillBar {
          height: 5px;
          background: #eef1f5;
          border-radius: 3px;
          overflow: hidden;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#E8A33D"};
        }

        .eduItem {
          margin-bottom: 12px;
        }

        .eduItem:last-child {
          margin-bottom: 0;
        }

        .eduSchool {
          font-size: 12px;
          font-weight: 700;
          color: #22262b;
        }

        .eduDegree {
          font-size: 11px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .eduDate {
          font-size: 10px;
          color: #9aa1ab;
          margin-top: 2px;
        }

        .refItem {
          margin-bottom: 12px;
        }

        .refItem:last-child {
          margin-bottom: 0;
        }

        .refName {
          font-size: 12px;
          font-weight: 700;
          color: #22262b;
        }

        .refLine {
          font-size: 10.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        @media (max-width: 850px) {
          .body { grid-template-columns: 1fr; padding: 20px; }
          .topBand { padding: 22px 20px; flex-wrap: wrap; }
        }

        @media print {
          .bc-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}


