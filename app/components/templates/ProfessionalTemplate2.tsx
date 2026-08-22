import React from "react";
import type { TemplateProps } from "../../types/Content";

const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

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
    <div className="bold-template">
      {/* ================= HEADER BAND ================= */}
      <div className="headerBand">
        <div className="headerInner">
          {personalInfo.photoUrl ? (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          ) : (
            <div className="photoFallback">{initials || "U"}</div>
          )}
          <div className="nameBlock">
            <div className="name">{personalInfo.fullName}</div>
            <div className="title">{personalInfo.title || "PROFESSIONAL"}</div>
          </div>
          <div className="contactCol">
            {contactItems.length > 0
              ? contactItems.map((item, i) => {
                  if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
                    let icon = Icon.pin;
                    if (item.label === "phone") icon = Icon.phone;
                    else if (item.label === "email") icon = Icon.mail;
                    else if (item.label === "web") icon = Icon.globe;
                    return (
                      <div className="contactItem" key={i}>
                        <span className="ic">{icon}</span>{item.description}
                      </div>
                    );
                  }
                  return null;
                })
              : (
                <>
                  {personalInfo.phone && <div className="contactItem"><span className="ic">{Icon.phone}</span>{personalInfo.phone}</div>}
                  {personalInfo.email && <div className="contactItem"><span className="ic">{Icon.mail}</span>{personalInfo.email}</div>}
                  {personalInfo.location && <div className="contactItem"><span className="ic">{Icon.pin}</span>{personalInfo.location}</div>}
                  {personalInfo.website && <div className="contactItem"><span className="ic">{Icon.globe}</span>{personalInfo.website}</div>}
                </>
              )}
          </div>
        </div>
        <div className="angleCut" />
      </div>

      {/* ================= BODY ================= */}
      <div className="body">
        <div className="mainCol">
          {aboutText && (
            <div className="section">
              <div className="sectionTitle"><span className="tag">ABOUT</span></div>
              <p className="aboutText">{aboutText}</p>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="section">
              <div className="sectionTitle"><span className="tag">EXPERIENCE</span></div>
              {experienceSection.items.map((job, i) => (
                <div className="job" key={i}>
                  <div className="jobTop">
                    <span className="jobTitle">{job.role || "Position"}</span>
                    <span className="jobDate">{job.start} – {job.end || "Present"}</span>
                  </div>
                  <div className="jobSub">{job.company}{job.location ? ` / ${job.location}` : ""}</div>
                  {job.bullets && job.bullets.length > 0 && (
                    <div className="jobDesc">{job.bullets[0]}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sideCol">
          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="section">
              <div className="sectionTitle"><span className="tag">SKILLS</span></div>
              <div className="skills">
                {ratedSkillsSection.items.map((skill, i) => (
                  <div key={i}>
                    <div className="skillName">{skill.name}</div>
                    <div className="skillBar">
                      <div className="skillFill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {educationSection && educationSection.items.length > 0 && (
            <div className="section">
              <div className="sectionTitle"><span className="tag"><span className="tagIcon">{Icon.cap}</span>EDUCATION</span></div>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem" key={i}>
                  <b>{edu.school}</b>
                  <span>{edu.degree}</span>
                  <span className="dates">{edu.start} – {edu.end}</span>
                </div>
              ))}
            </div>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="section">
              <div className="sectionTitle"><span className="tag"><span className="tagIcon">{Icon.users}</span>REFERENCES</span></div>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem" key={i}>
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
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: #e9e2ea;
        }

        .contactItem .ic {
          color: ${t.accentColor || "#CFE85C"};
          display: flex;
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

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: ${t.primaryColor || "#3B1F3D"};
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 6px 14px;
          border-radius: 20px;
        }

        .tagIcon {
          display: flex;
          color: ${t.accentColor || "#CFE85C"};
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
