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
};

export default function ElegantTemplate({ content, theme }: TemplateProps) {
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
    <div className="elegant-template">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="photoWrap">
          <div className="photoCircle">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
            ) : (
              <span className="photoFallback">{initials || "U"}</span>
            )}
          </div>
        </div>

        <div className="sidebarContent">
          <div className="sideHeading">
            <div className="iconBadge">{Icon.mail}</div>
            <h3>Contact</h3>
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
                  {personalInfo.phone && <div className="contactItem"><span className="ic">{Icon.phone}</span><span>{personalInfo.phone}</span></div>}
                  {personalInfo.email && <div className="contactItem"><span className="ic">{Icon.mail}</span><span>{personalInfo.email}</span></div>}
                  {personalInfo.location && <div className="contactItem"><span className="ic">{Icon.pin}</span><span>{personalInfo.location}</span></div>}
                  {personalInfo.website && <div className="contactItem"><span className="ic">{Icon.globe}</span><span>{personalInfo.website}</span></div>}
                </>
              )}
          </div>

          <div className="ornament" />

          {educationSection && educationSection.items.length > 0 && (
            <>
              <div className="sideHeading">
                <div className="iconBadge">{Icon.cap}</div>
                <h3>Education</h3>
              </div>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem" key={i}>
                  <b>{edu.school}</b>
                  <span>{edu.degree}</span>
                  <span className="dates">{edu.start} – {edu.end}</span>
                </div>
              ))}
              <div className="ornament" />
            </>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <>
              <div className="sideHeading">
                <div className="iconBadge">{Icon.users}</div>
                <h3>References</h3>
              </div>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem" key={i}>
                  <b>{ref.name}</b>
                  {ref.phone && <span>Tel: {ref.phone}</span>}
                  {ref.email && <span>{ref.email}</span>}
                </div>
              ))}
            </>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="content">
        <div className="headerBlock">
          <div className="name">{personalInfo.fullName}</div>
          <div className="title">{personalInfo.title || "Professional"}</div>
          <div className="hairline" />
        </div>

        {aboutText && (
          <div className="section">
            <h2 className="sectionTitle">Profile</h2>
            <div className="aboutText">{aboutText}</div>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section">
            <h2 className="sectionTitle">Experience</h2>
            {experienceSection.items.map((job, i) => (
              <div className="job" key={i}>
                <div className="jobTop">
                  <div className="jobTitle">{job.role || "Position"}</div>
                  <div className="jobDate">{job.start} – {job.end || "Present"}</div>
                </div>
                <div className="jobSub">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                {job.bullets && job.bullets.length > 0 && (
                  <div className="jobDesc">{job.bullets[0]}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
          <div className="section">
            <h2 className="sectionTitle">Skills</h2>
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
      </div>

      <style jsx>{`
        .elegant-template {
          width: 100%;
          min-height: 100%;
          background: ${t.backgroundColor || "#FBF9F3"};
          display: flex;
          position: relative;
          overflow: hidden;
          font-family: ${t.bodyFont || "Karla"}, sans-serif;
        }

        /* ================= SIDEBAR ================= */
        .sidebar {
          width: 33%;
          background: ${t.primaryColor || "#1F3D2B"};
          color: #f1ece0;
          position: relative;
          padding: 0 0 40px;
          flex-shrink: 0;
        }

        .photoWrap {
          position: relative;
          height: 210px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(193,154,73,0.18), transparent);
        }

        .photoCircle {
          width: 138px;
          height: 138px;
          border-radius: 50%;
          background: #cfc7ae;
          border: 4px solid ${t.accentColor || "#C19A49"};
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        .photoCircle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photoFallback {
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 44px;
          color: ${t.accentColor || "#C19A49"};
        }

        .sidebarContent {
          padding: 10px 32px 0;
        }

        .sideHeading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 22px 0 16px;
        }

        .iconBadge {
          color: ${t.accentColor || "#C19A49"};
          display: flex;
        }

        .sideHeading h3 {
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 1.5px;
          margin: 0;
          color: ${t.accentColor || "#C19A49"};
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .contactItem {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 12px;
          line-height: 1.5;
          color: #e3ddcb;
        }

        .contactItem .ic {
          color: ${t.accentColor || "#C19A49"};
          margin-top: 2px;
        }

        .ornament {
          height: 1px;
          background: linear-gradient(90deg, ${t.accentColor || "#C19A49"}, transparent);
          margin: 26px 0;
        }

        .eduItem, .refItem {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          font-size: 12px;
          color: #e3ddcb;
          line-height: 1.6;
        }

        .eduItem b, .refItem b {
          color: #fff;
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .dates {
          color: #b9b199;
          font-size: 11px;
        }

        /* ================= CONTENT ================= */
        .content {
          flex: 1;
          padding: 48px 46px;
        }

        .name {
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 42px;
          font-weight: 600;
          color: ${t.textColor || "#1F3D2B"};
          letter-spacing: 0.5px;
        }

        .title {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${t.accentColor || "#A9843C"};
          margin-top: 6px;
          font-weight: 600;
        }

        .hairline {
          height: 1px;
          background: #ddd5bf;
          margin-top: 24px;
        }

        .section {
          margin-top: 32px;
        }

        .sectionTitle {
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 20px;
          font-weight: 700;
          color: ${t.textColor || "#1F3D2B"};
          margin: 0 0 14px;
        }

        .aboutText {
          font-size: 13px;
          line-height: 1.9;
          color: #5a5747;
        }

        .job {
          margin-bottom: 20px;
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
          color: ${t.textColor || "#1F3D2B"};
        }

        .jobDate {
          font-size: 11.5px;
          color: #9a9484;
        }

        .jobSub {
          font-size: 12px;
          font-style: italic;
          color: ${t.accentColor || "#A9843C"};
          margin: 3px 0 7px;
        }

        .jobDesc {
          font-size: 12.5px;
          color: #635f4f;
          line-height: 1.75;
        }

        .skills {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 28px;
        }

        .skillName {
          font-size: 12px;
          font-weight: 700;
          color: ${t.textColor || "#1F3D2B"};
          margin-bottom: 6px;
        }

        .skillBar {
          height: 5px;
          background: #e6e0cc;
          border-radius: 3px;
          overflow: hidden;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#C19A49"};
          border-radius: 3px;
        }

        @media (max-width: 900px) {
          .elegant-template { flex-direction: column; }
          .sidebar { width: 100%; }
        }

        @media print {
          .elegant-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
