import React from "react";
import type { TemplateProps, CustomItem, ReferenceItem, LanguageItem, AchievementItem, RatedSkillItem } from "../../types/Content";

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
  star: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 21V4h16l-4 6 4 6H4z" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

// Type guards
const isCustomItem = (item: any): item is CustomItem => {
  return item && typeof item === 'object' && 'label' in item;
};

const isLanguageItem = (item: any): item is LanguageItem => {
  return item && typeof item === 'object' && 'name' in item;
};

const isAchievementItem = (item: any): item is AchievementItem => {
  return item && typeof item === 'object' && 'title' in item;
};

const isRatedSkillItem = (item: any): item is RatedSkillItem => {
  return item && typeof item === 'object' && 'name' in item && 'level' in item;
};

export default function ElegantTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const skillsSection = sections.find((s) => s.type === "skills");
  const languagesSection = sections.find((s) => s.type === "languages" || s.id === "languages");
  const achievementsSection = sections.find((s) => s.type === "achievements");
  const otherCustomSections = sections.filter((s) => s.type === "custom" && s.id !== "contact");

  const aboutText = personalInfo.summary;
  const contactItems = contactSection?.items || [];

  const initials = personalInfo.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="elegant-template data-resume-root">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        {personalInfo.photoUrl && (
          <div className="photoWrap data-resume-root">
            <div className="photoCircle data-resume-root">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
            </div>
          </div>
        )}

        <div className="sidebarContent data-resume-root">
          <div className="sideHeading data-resume-root">
            <div className="iconBadge data-resume-root">{Icon.mail}</div>
            <h3>Contact</h3>
          </div>
          <div className="contactList data-resume-root">
            {contactItems.length > 0
              ? contactItems.map((item, i) => {
                  if (isCustomItem(item)) {
                    let icon = Icon.pin;
                    if (item.label === "phone") icon = Icon.phone;
                    else if (item.label === "email") icon = Icon.mail;
                    else if (item.label === "web" || item.label === "website") icon = Icon.globe;
                    return (
                      <div className="contactItem data-resume-root" key={i}>
                        <span className="ic">{icon}</span>
                        <span>{item.description}</span>
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

          <div className="ornament data-resume-root" />

          {educationSection && educationSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
                <div className="iconBadge data-resume-root">{Icon.cap}</div>
                <h3>{educationSection.title || 'Education'}</h3>
              </div>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem data-resume-root" key={i}>
                  <b>{edu.school}</b>
                  <span>{edu.degree}</span>
                  <span className="dates">{edu.start} – {edu.end}</span>
                </div>
              ))}
              <div className="ornament data-resume-root" />
            </>
          )}

          {/* RATED SKILLS */}
          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
                <div className="iconBadge data-resume-root">{Icon.award}</div>
                <h3>{ratedSkillsSection.title || 'Core Competencies'}</h3>
              </div>
              <div className="skillList data-resume-root">
                {ratedSkillsSection.items.map((skill: RatedSkillItem, i) => (
                  <div className="skillItem data-resume-root" key={i}>
                    <div className="skillName data-resume-root">{skill.name}</div>
                    <div className="skillBar data-resume-root">
                      <div className="skillFill data-resume-root" style={{ width: `${skill.level || 50}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="ornament data-resume-root" />
            </>
          )}

          {/* SKILLS (Tags) */}
          {skillsSection && skillsSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
                <div className="iconBadge data-resume-root">{Icon.star}</div>
                <h3>{skillsSection.title || 'Technical Skills'}</h3>
              </div>
              <div className="skillsTags data-resume-root">
                {skillsSection.items.map((skill: string, i) => (
                  <span key={i} className="skillTag data-resume-root">{skill}</span>
                ))}
              </div>
              <div className="ornament data-resume-root" />
            </>
          )}

          {/* LANGUAGES */}
          {languagesSection && languagesSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
                <div className="iconBadge data-resume-root">{Icon.flag}</div>
                <h3>{languagesSection.title || 'Languages'}</h3>
              </div>
              <div className="languagesList data-resume-root">
                {languagesSection.items.map((item, i) => {
                  if (isLanguageItem(item)) {
                    return (
                      <div className="languageItem data-resume-root" key={i}>
                        <span className="langName">{item.name}</span>
                        {item.level && <span className="langLevel">{item.level}</span>}
                      </div>
                    );
                  }
                  return (
                    <div className="languageItem data-resume-root" key={i}>
                      <span className="langName">{String(item)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="ornament data-resume-root" />
            </>
          )}

          {referencesSection && referencesSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
                <div className="iconBadge data-resume-root">{Icon.users}</div>
                <h3>{referencesSection.title || 'References'}</h3>
              </div>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem data-resume-root" key={i}>
                  <b>{ref.name}</b>
                  {ref.address && <span>{ref.address}</span>}
                  {ref.phone && <span>Tel: {ref.phone}</span>}
                  {ref.email && <span>{ref.email}</span>}
                </div>
              ))}
            </>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="content data-resume-root">
        <div className="headerBlock data-resume-root">
          <div className="name data-resume-root">{personalInfo.fullName}</div>
          <div className="title data-resume-root">{personalInfo.title || "Professional"}</div>
          <div className="hairline data-resume-root" />
        </div>

        {aboutText && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">Profile</h2>
            <div className="aboutText data-resume-root">{aboutText}</div>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">{experienceSection.title || 'Experience'}</h2>
            {experienceSection.items.map((job, i) => (
              <div className="job data-resume-root" key={i}>
                <div className="jobTop data-resume-root">
                  <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
                  <div className="jobDate data-resume-root">{job.start} – {job.end || "Present"}</div>
                </div>
                <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                {job.bullets && job.bullets.length > 0 && (
                  <div className="jobDesc data-resume-root">{job.bullets}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ACHIEVEMENTS - Main Section */}
        {achievementsSection && achievementsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">{achievementsSection.title || 'Achievements'}</h2>
            <div className="achievementsList data-resume-root">
              {achievementsSection.items.map((item, i) => {
                if (isAchievementItem(item)) {
                  return (
                    <div className="achievementItem data-resume-root" key={i}>
                      <div className="achievementTitle data-resume-root">{item.title}</div>
                      {item.description && (
                        <div className="achievementDesc data-resume-root">{item.description}</div>
                      )}
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div className="achievementItem data-resume-root" key={i}>
                      <div className="achievementTitle data-resume-root">{item}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* OTHER CUSTOM SECTIONS - Main Section */}
        {otherCustomSections.map((section) => (
          <div key={section.id} className="section data-resume-root">
            <h2 className="sectionTitle">{section.title || 'Custom'}</h2>
            <div className="customItems data-resume-root">
              {section.items.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <div className="customItem data-resume-root" key={i}>
                      {item.label && <div className="customLabel data-resume-root">{item.label}</div>}
                      {item.description && <div className="customDesc data-resume-root">{item.description}</div>}
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div className="customItem data-resume-root" key={i}>
                      <div className="customDesc data-resume-root">{item}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
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

        .sidebarContent {
          padding: 10px 32px 0;
        }

        /* Fixed: this used to be display:flex + align-items:center. That
           centers correctly in a real browser, but html2canvas (used for
           PNG/PDF export) does not reliably implement flexbox cross-axis
           centering — it tends to anchor flex children near the top of the
           row instead, which is exactly why the icon looked "lifted" above
           the text only in exported files, never in the live preview.
           Absolute positioning + translateY(-50%) is plain pixel math, so
           html2canvas renders it identically to the live browser. */
        .sideHeading {
          position: relative;
          min-height: 24px;
          padding-left: 30px;
          margin: 22px 0 16px;
        }

        .iconBadge {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          color: ${t.accentColor || "#C19A49"};
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
        }

        .sideHeading h3 {
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 1.5px;
          margin: 0;
          color: ${t.accentColor || "#C19A49"};
          line-height: 24px;
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        /* Fixed twice now, same root cause both times: html2canvas doesn't
           reliably implement flexbox align-items:center (it tends to anchor
           flex children near the top of the row instead of centering them),
           so anything centered with flexbox here looks right in the live
           browser but drifts in exported PNG/PDF. Absolute positioning +
           translateY(-50%) is plain pixel math — html2canvas renders that
           identically to the live browser, so this is deterministic. */
        .contactItem {
          position: relative;
          min-height: 18px;
          padding-left: 24px;
          font-size: 12px;
          line-height: 1.5;
          color: #e3ddcb;
        }

        .contactItem .ic {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          color: ${t.accentColor || "#C19A49"};
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
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

        /* RATED SKILLS */
        .skillList {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skillItem {
          width: 100%;
        }

        .skillName {
          font-size: 11.5px;
          color: #e3ddcb;
          margin-bottom: 4px;
        }

        .skillBar {
          height: 4px;
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
          overflow: hidden;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#C19A49"};
          border-radius: 2px;
        }

        /* SKILLS TAGS */
        .skillsTags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skillTag {
          background: rgba(255,255,255,0.08);
          color: #e3ddcb;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 10px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(193,154,73,0.2);
        }

        /* LANGUAGES */
        .languagesList {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .languageItem {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          color: #e3ddcb;
        }

        .langName {
          color: #fff;
        }

        .langLevel {
          color: #b9b199;
          font-size: 10.5px;
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

        /* ACHIEVEMENTS - Main Section */
        .achievementsList {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .achievementItem {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || "#C19A49"};
        }

        .achievementTitle {
          font-size: 13px;
          font-weight: 600;
          color: ${t.textColor || "#1F3D2B"};
        }

        .achievementDesc {
          font-size: 12px;
          color: #5a5747;
          line-height: 1.6;
          margin-top: 2px;
        }

        /* CUSTOM SECTIONS - Main Section */
        .customItems {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .customItem {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || "#C19A49"};
        }

        .customLabel {
          font-size: 13px;
          font-weight: 600;
          color: ${t.textColor || "#1F3D2B"};
        }

        .customDesc {
          font-size: 12px;
          color: #5a5747;
          line-height: 1.6;
          margin-top: 2px;
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
