import React from "react";
import type { TemplateProps } from "../../types/Content";

const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
};

export default function ExecutiveTemplate({ content, theme }: TemplateProps) {
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
    <div className="exec-template">
      {/* ================= MAIN ================= */}
      <div className="content">
        <div className="headerBlock">
          <div className="name">{personalInfo.fullName}</div>
          <div className="goldRule" />
          <div className="title">{personalInfo.title || "EXECUTIVE PROFILE"}</div>
        </div>

        {aboutText && (
          <div className="section">
            <h2 className="sectionTitle">Executive Summary</h2>
            <p className="aboutText">{aboutText}</p>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section">
            <h2 className="sectionTitle">Professional Experience</h2>
            {experienceSection.items.map((job, i) => (
              <div className="job" key={i}>
                <div className="jobTop">
                  <div className="jobTitle">{job.role || "Position"}</div>
                  <div className="jobDate">{job.start} – {job.end || "Present"}</div>
                </div>
                <div className="jobSub">{job.company}{job.location ? `  |  ${job.location}` : ""}</div>
                {job.bullets && job.bullets.length > 0 && (
                  <div className="jobDesc">{job.bullets[0]}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
       {personalInfo.photoUrl &&  <div className="photoBlock">
          
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          
           
        </div>}

        <div className="sideHeading">
          <div className="iconBadge">{Icon.mail}</div>
          <h3>CONTACT</h3>
        </div>
        <div className="contactList">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
                  let icon = Icon.pin;
                  if (item.label === "phone") icon = Icon.phone;
                  else if (item.label === "email") icon = Icon.mail;
                  else if (item.label === "web") icon = Icon.globe;
                  return (
                    <div className="contactItem" key={i}>
                      <span className="ic">{icon}</span>
                      <span>{item.description}</span>
                    </div>
                  );
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && (
                  <div className="contactItem"><span className="ic">{Icon.phone}</span><span>{personalInfo.phone}</span></div>
                )}
                {personalInfo.email && (
                  <div className="contactItem"><span className="ic">{Icon.mail}</span><span>{personalInfo.email}</span></div>
                )}
                {personalInfo.location && (
                  <div className="contactItem"><span className="ic">{Icon.pin}</span><span>{personalInfo.location}</span></div>
                )}
                {personalInfo.website && (
                  <div className="contactItem"><span className="ic">{Icon.globe}</span><span>{personalInfo.website}</span></div>
                )}
              </>
            )}
        </div>

        <hr className="thinLine" />

        {educationSection && educationSection.items.length > 0 && (
          <>
            <div className="sideHeading">
              <div className="iconBadge">{Icon.cap}</div>
              <h3>EDUCATION</h3>
            </div>
            {educationSection.items.map((edu, i) => (
              <div className="eduItem" key={i}>
                <b>{edu.school}</b>
                <span>{edu.degree}</span>
                <span className="dates">{edu.start} – {edu.end}</span>
              </div>
            ))}
            <hr className="thinLine" />
          </>
        )}

        {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
          <>
            <div className="sideHeading">
              <div className="iconBadge">{Icon.award}</div>
              <h3>CORE COMPETENCIES</h3>
            </div>
            <div className="skillList">
              {ratedSkillsSection.items.map((skill, i) => (
                <div className="skillItem" key={i}>
                  <div className="skillName">{skill.name}</div>
                  <div className="skillBar">
                    <div className="skillFill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <hr className="thinLine" />
          </>
        )}

        {referencesSection && referencesSection.items.length > 0 && (
          <>
            <div className="sideHeading">
              <div className="iconBadge">{Icon.users}</div>
              <h3>REFERENCES</h3>
            </div>
            {referencesSection.items.map((ref, i) => (
              <div className="refItem" key={i}>
                <b>{ref.name}</b>
                {ref.address && <span>{ref.address}</span>}
                {ref.phone && <span>Tel: {ref.phone}</span>}
                {ref.email && <span>{ref.email}</span>}
              </div>
            ))}
          </>
        )}
      </aside>

      <style jsx>{`
        .exec-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          display: flex;
          flex-direction: row-reverse;
          font-family: ${t.bodyFont || "Source Serif Pro"}, serif;
        }

        /* ================= SIDEBAR (right) ================= */
        .sidebar {
          width: 32%;
          background: ${t.primaryColor || "#111C33"};
          color: #f2f0ea;
          padding: 44px 30px 40px;
          flex-shrink: 0;
        }

        .photoBlock {
          width: 108px;
          height: 108px;
          border: 2px solid ${t.accentColor || "#B79355"};
          margin: 0 auto 32px;
          overflow: hidden;
        }

        .photoBlock img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photoFallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${t.headingFont || "Playfair Display"}, serif;
          font-size: 34px;
          color: ${t.accentColor || "#B79355"};
        }

        .sideHeading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 24px 0 14px;
        }

        .iconBadge {
          color: ${t.accentColor || "#B79355"};
          display: flex;
        }

        .sideHeading h3 {
          font-family: ${t.headingFont || "Playfair Display"}, serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 2px;
          margin: 0;
          color: ${t.accentColor || "#B79355"};
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .contactItem {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 11.5px;
          line-height: 1.5;
          color: #d7d4c9;
        }

        .contactItem .ic {
          color: ${t.accentColor || "#B79355"};
          margin-top: 2px;
        }

        .thinLine {
          border: none;
          border-top: 1px solid rgba(183, 147, 85, 0.35);
          margin: 24px 0;
        }

        .eduItem, .refItem {
          display: flex;
          flex-direction: column;
          font-size: 11.5px;
          color: #d7d4c9;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .eduItem b, .refItem b {
          color: #fff;
          font-size: 12.5px;
          margin-bottom: 2px;
        }

        .dates {
          color: #a8a496;
          font-size: 10.5px;
        }

        .skillList {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skillName {
          font-size: 11.5px;
          color: #e8e6df;
          margin-bottom: 5px;
        }

        .skillBar {
          height: 4px;
          background: rgba(255,255,255,0.15);
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#B79355"};
        }

        /* ================= MAIN CONTENT ================= */
        .content {
          flex: 1;
          padding: 50px 48px;
        }

        .headerBlock {
          margin-bottom: 8px;
        }

        .name {
          font-family: ${t.headingFont || "Playfair Display"}, serif;
          font-size: 36px;
          font-weight: 700;
          color: ${t.textColor || "#111C33"};
          letter-spacing: 0.5px;
        }

        .goldRule {
          width: 64px;
          height: 3px;
          background: ${t.accentColor || "#B79355"};
          margin: 14px 0 12px;
        }

        .title {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #6b6b6b;
          font-family: ${t.bodyFont || "Source Serif Pro"}, serif;
        }

        .section {
          margin-top: 34px;
        }

        .sectionTitle {
          font-family: ${t.headingFont || "Playfair Display"}, serif;
          font-size: 17px;
          font-weight: 700;
          color: ${t.textColor || "#111C33"};
          border-bottom: 1px solid #ddd8ca;
          padding-bottom: 8px;
          margin: 0 0 16px;
        }

        .aboutText {
          font-size: 13px;
          line-height: 1.9;
          color: #454545;
          margin: 0;
        }

        .job {
          margin-bottom: 22px;
        }

        .jobTop {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }

        .jobTitle {
          font-size: 14.5px;
          font-weight: 700;
          color: ${t.textColor || "#111C33"};
        }

        .jobDate {
          font-size: 11.5px;
          color: #8c8c8c;
        }

        .jobSub {
          font-size: 12px;
          font-style: italic;
          color: ${t.accentColor || "#8c7238"};
          margin: 3px 0 8px;
        }

        .jobDesc {
          font-size: 12.5px;
          color: #565656;
          line-height: 1.75;
        }

        @media (max-width: 900px) {
          .exec-template { flex-direction: column; }
          .sidebar { width: 100%; }
        }

        @media print {
          .exec-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
