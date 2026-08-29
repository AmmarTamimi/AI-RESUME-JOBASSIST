import React from "react";
import type { TemplateProps } from "../../types/Content";

const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function ProfessionalStripTemplate({ content, theme }: TemplateProps) {
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
    <div className="ps-template data-resume-root">
      <div className="spine data-resume-root" />

      <div className="layout data-resume-root">
        {/* ================= MAIN ================= */}
        <div className="main data-resume-root">
          <div className="headerBlock data-resume-root">
            <div className="name data-resume-root">{personalInfo.fullName}</div>
            <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
          </div>

          {aboutText && (
            <div className="section data-resume-root">
              <h2 className="sectionTitle">Profile</h2>
              <p className="aboutText">{aboutText}</p>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="section data-resume-root">
              <h2 className="sectionTitle">{experienceSection.title || 'Experience'}</h2>
              {experienceSection.items.map((job, i) => (
                <div className="job data-resume-root" key={i}>
                  <div className="jobTop data-resume-root">
                    <span className="jobTitle">{job.role || "Position"}</span>
                    <span className="jobDate">{job.start} â€“ {job.end || "Present"}</span>
                  </div>
                  <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                  {job.bullets && job.bullets.length > 0 && <div className="jobDesc data-resume-root">{job.bullets}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= PANEL ================= */}
        <div className="panel data-resume-root">
          {personalInfo.photoUrl ? (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          ) : (
            <div className="photoFallback data-resume-root">{initials || "U"}</div>
          )}

          <div className="panelSection data-resume-root">
            <h3 className="panelLabel">Contact</h3>
            <div className="contactList data-resume-root">
              {contactItems.length > 0
                ? contactItems.map((item, i) => {
                    if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
                      let icon = Icon.pin;
                      if (item.label === "phone") icon = Icon.phone;
                      else if (item.label === "email") icon = Icon.mail;
                      else if (item.label === "web") icon = Icon.globe;
                      return (
                        <div className="contactItem data-resume-root" key={i}>
                          <span className="ic">{icon}</span><span>{item.description}</span>
                        </div>
                      );
                    }
                    return null;
                  })
                : (
                  <>
                    {personalInfo.phone && <div className="contactItem data-resume-root"><span className="ic">{Icon.phone}</span><span>{personalInfo.phone}</span></div>}
                    {personalInfo.email && <div className="contactItem data-resume-root"><span className="ic">{Icon.mail}</span><span>{personalInfo.email}</span></div>}
                    {personalInfo.location && <div className="contactItem data-resume-root"><span className="ic">{Icon.pin}</span><span>{personalInfo.location}</span></div>}
                    {personalInfo.website && <div className="contactItem data-resume-root"><span className="ic">{Icon.globe}</span><span>{personalInfo.website}</span></div>}
                  </>
                )}
            </div>
          </div>

          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="panelSection data-resume-root">
              <h3 className="panelLabel">{ratedSkillsSection.title || 'Skills'}</h3>
              {ratedSkillsSection.items.map((skill, i) => (
                <div className="skillRow data-resume-root" key={i}>
                  <div className="skillName data-resume-root">{skill.name}</div>
                  <div className="skillBar data-resume-root"><div className="skillFill data-resume-root" style={{ width: `${skill.level}%` }} /></div>
                </div>
              ))}
            </div>
          )}

          {educationSection && educationSection.items.length > 0 && (
            <div className="panelSection data-resume-root">
              <h3 className="panelLabel">{educationSection.title || 'Education'}</h3>
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
            <div className="panelSection data-resume-root">
              <h3 className="panelLabel">{referencesSection.title || 'References'}</h3>
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
        .ps-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          display: flex;
          font-family: ${t.bodyFont || "Georgia"}, serif;
        }

        .spine {
          width: 10px;
          background: ${t.accentColor || "#0F4C4C"};
          flex-shrink: 0;
        }

        .layout {
          flex: 1;
          display: flex;
        }

        .main {
          flex: 1.7;
          padding: 40px 38px 40px 42px;
          box-sizing: border-box;
        }

        .headerBlock {
          margin-bottom: 8px;
        }

        .name {
          font-size: 30px;
          font-weight: 700;
          color: ${t.textColor || "#1b1b1b"};
        }

        .title {
          font-size: 12px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: ${t.accentColor || "#0F4C4C"};
          margin-top: 6px;
          font-weight: 600;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .section {
          margin-top: 26px;
        }

        .sectionTitle {
          font-size: 15px;
          font-weight: 700;
          color: ${t.textColor || "#1b1b1b"};
          border-bottom: 2px solid ${t.accentColor || "#0F4C4C"};
          display: inline-block;
          padding-bottom: 4px;
          margin: 0 0 14px;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.8;
          color: #4a4a4a;
          margin: 0;
          font-family: ${t.bodyFont || "Georgia"}, serif;
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
          color: ${t.textColor || "#1b1b1b"};
        }

        .jobDate {
          font-size: 11px;
          color: #999;
        }

        .jobSub {
          font-size: 11.5px;
          font-style: italic;
          color: #7a7a7a;
          margin: 2px 0 6px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #565656;
        }

        .panel {
          flex: 1;
          border-left: 1px solid #e6e6e2;
          padding: 40px 34px;
          box-sizing: border-box;
        }

        .photo, .photoFallback {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 22px;
        }

        .photoFallback {
          background: ${t.accentColor || "#0F4C4C"};
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 24px;
        }

        .panelSection {
          margin-bottom: 26px;
        }

        .panelLabel {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9a9a9a;
          margin: 0 0 12px;
          font-family: ${t.headingFont || "Arial"}, sans-serif;
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contactItem {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11px;
          color: #4a4a4a;
          line-height: 1.5;
        }

        .contactItem .ic {
          color: ${t.accentColor || "#0F4C4C"};
          margin-top: 2px;
        }

        .skillRow {
          margin-bottom: 12px;
        }

        .skillName {
          font-size: 11.5px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .skillBar {
          height: 3px;
          background: #ececec;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#0F4C4C"};
        }

        .eduItem {
          margin-bottom: 14px;
        }

        .eduSchool {
          font-size: 12px;
          font-weight: 700;
          color: #333;
        }

        .eduDegree {
          font-size: 11px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .eduDate {
          font-size: 10px;
          color: #9a9a9a;
          margin-top: 2px;
        }

        .refItem {
          margin-bottom: 12px;
        }

        .refName {
          font-size: 12px;
          font-weight: 700;
          color: #333;
        }

        .refLine {
          font-size: 10.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        @media (max-width: 850px) {
          .layout { flex-direction: column; }
          .panel { border-left: none; border-top: 1px solid #e6e6e2; }
        }

        @media print {
          .ps-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}


