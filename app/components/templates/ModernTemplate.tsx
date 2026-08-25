import React from "react";
import type { 
  TemplateProps, 
  CustomItem, 
  ReferenceItem,
  LanguageItem,
  AchievementItem,
  RatedSkillItem 
} from "../../types/Content";

// SVG Icons - clean and minimal
const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20v-6M18 20V4M6 20v-4" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 21V4h16l-4 6 4 6H4z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
};

export default function ModernTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  // Find all sections
  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const skillsSection = sections.find((s) => s.type === "skills");
  const languagesSection = sections.find((s) => s.type === "languages");
  const achievementsSection = sections.find((s) => s.type === "achievements");
  const aboutText = personalInfo.summary;

  // Name parsing for display
  const nameParts = personalInfo.fullName.trim().split(" ");
  const lastWord = nameParts.length > 1 ? nameParts.pop() : "";
  const firstPart = nameParts.join(" ");

  // Contact items - parse from the custom section
  const contactItems = contactSection?.items || [];

  // Get all custom sections except contact
  const otherCustomSections = sections.filter(
    (s) => s.type === "custom" && s.id !== "contact"
  );

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

  // Count total items to determine if we need to reduce spacing
  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  const isContentHeavy = totalItems > 15;

  return (
    <div className="modern-template data-resume-root" data-content-heavy={isContentHeavy}>
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        {/* Photo Section */}
        {personalInfo.photoUrl && (
          <div className="photoWrap data-resume-root">
            <div className="photoTriangle data-resume-root" />
            <div className="photoCircle data-resume-root">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
            </div>
          </div>
        )}

        <div className="sidebarContent data-resume-root">
          {/* Contact Section */}
          <div className="sideHeading data-resume-root">
            <div className="iconBadge data-resume-root">{Icon.person}</div>
            <h3>CONTACT ME</h3>
          </div>
          
          <div className="contactList data-resume-root">
            {contactItems.length > 0 ? (
              contactItems.map((item, i) => {
                if (isCustomItem(item)) {
                  let icon = Icon.pin;
                  if (item.label === "phone") icon = Icon.phone;
                  else if (item.label === "email") icon = Icon.mail;
                  else if (item.label === "web") icon = Icon.globe;
                  
                  return (
                    <div className="contactItem data-resume-root" key={i}>
                      <span className="ic">{icon}</span>
                      <span>{item.description || item.label}</span>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <>
                {personalInfo.phone && (
                  <div className="contactItem data-resume-root">
                    <span className="ic">{Icon.phone}</span>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="contactItem data-resume-root">
                    <span className="ic">{Icon.mail}</span>
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="contactItem data-resume-root">
                    <span className="ic">{Icon.pin}</span>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="contactItem data-resume-root">
                    <span className="ic">{Icon.globe}</span>
                    <span>{personalInfo.website}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <hr className="dottedLine" />

          {/* References Section */}
          {referencesSection && referencesSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
                <div className="iconBadge data-resume-root">{Icon.users}</div>
                <h3>REFERENCES</h3>
              </div>
              {referencesSection.items.map((ref: ReferenceItem, i) => (
                <div className="refItem data-resume-root" key={i}>
                  <b>{ref.name}</b>
                  {ref.address && <span>{ref.address}</span>}
                  {ref.phone && <span>Tel: {ref.phone}</span>}
                  {ref.email && <span>Email: {ref.email}</span>}
                </div>
              ))}
              <hr className="dottedLine" />
            </>
          )}

          {/* Education Section */}
          {educationSection && educationSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
                <div className="iconBadge data-resume-root">{Icon.cap}</div>
                <h3>EDUCATION</h3>
              </div>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem data-resume-root" key={i}>
                  <b>{edu.school}</b>
                  {edu.degree}
                  <br />
                  {edu.start} - {edu.end}
                </div>
              ))}
            </>
          )}
        </div>
      </aside>

      <div className="divider data-resume-root" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="content data-resume-root">
        {/* Header Block */}
        <div className="headerBlock data-resume-root">
          <div className="name data-resume-root">
            {firstPart} <span>{lastWord}</span>
          </div>
          <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
        </div>

        {/* About Me */}
        {aboutText && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <div className="iconBadge iconBadgeYellow data-resume-root">{Icon.info}</div>
              <h2>ABOUT ME</h2>
            </div>
            <div className="aboutText data-resume-root">{aboutText}</div>
          </div>
        )}

        {/* Job Experience */}
        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <div className="iconBadge iconBadgeYellow data-resume-root">{Icon.briefcase}</div>
              <h2>JOB EXPERIENCE</h2>
            </div>
            {experienceSection.items.map((job, i) => (
              <div className="job data-resume-root" key={i}>
                <div className="jobTop data-resume-root">
                  <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
                  <div className="jobDate data-resume-root">
                    {job.start} - {job.end || "Present"}
                  </div>
                </div>
                <div className="jobSub data-resume-root">
                  {job.company} {job.location ? `/ ${job.location}` : ""}
                </div>
                {job.bullets && job.bullets.length > 0 && (
                  <div className="jobDesc data-resume-root">{job.bullets[0]}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills (Rated) */}
        {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <div className="iconBadge iconBadgeYellow data-resume-root">{Icon.chart}</div>
              <h2>{ratedSkillsSection.title || 'Skills'}</h2>
            </div>
            <div className="skills data-resume-root">
              {ratedSkillsSection.items.map((skill: RatedSkillItem, i) => (
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

        {/* Skills (Tags) */}
        {skillsSection && skillsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <div className="iconBadge iconBadgeYellow data-resume-root">{Icon.star}</div>
              <h2>{skillsSection.title || 'TECHNICAL SKILLS'}</h2>
            </div>
            <div className="skillsTags data-resume-root">
              {skillsSection.items.map((skill, i) => (
                <span key={i} className="skillTag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {languagesSection && languagesSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <div className="iconBadge iconBadgeYellow data-resume-root">{Icon.flag}</div>
              <h2>{languagesSection.title || 'LANGUAGES'}</h2>
            </div>
            <div className="languages data-resume-root">
              {languagesSection.items.map((lang, i) => {
                if (isLanguageItem(lang)) {
                  return (
                    <div key={i} className="languageItem data-resume-root">
                      <span className="languageName">{lang.name}</span>
                      {lang.level && <span className="languageLevel">{lang.level}</span>}
                    </div>
                  );
                }
                return (
                  <div key={i} className="languageItem data-resume-root">
                    <span className="languageName">{String(lang)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {achievementsSection && achievementsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <div className="iconBadge iconBadgeYellow data-resume-root">{Icon.award}</div>
              <h2>{achievementsSection.title || 'ACHIEVEMENTS'}</h2>
            </div>
            <div className="achievements data-resume-root">
              {achievementsSection.items.map((achievement, i) => {
                if (isAchievementItem(achievement)) {
                  return (
                    <div key={i} className="achievementItem data-resume-root">
                      <div className="achievementText data-resume-root">{achievement.title}</div>
                      {achievement.description && (
                        <div className="achievementDescription data-resume-root">{achievement.description}</div>
                      )}
                    </div>
                  );
                }
                if (typeof achievement === 'string') {
                  return (
                    <div key={i} className="achievementItem data-resume-root">
                      <div className="achievementText data-resume-root">{achievement}</div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="achievementItem data-resume-root">
                    <div className="achievementText data-resume-root">{String(achievement)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Custom Sections */}
        {otherCustomSections.map((section) => (
          <div key={section.id} className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <div className="iconBadge iconBadgeYellow data-resume-root">{Icon.plus}</div>
              <h2>{section.title || "Custom"}</h2>
            </div>
            <div className="customItems data-resume-root">
              {section.items.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <div key={i} className="customItem data-resume-root">
                      {item.label && <div className="customLabel data-resume-root">{item.label}</div>}
                      {item.description && <div className="customDescription data-resume-root">{item.description}</div>}
                    </div>
                  );
                }
                return (
                  <div key={i} className="customItem data-resume-root">
                    <div className="customDescription data-resume-root">{String(item)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Corner Decoration */}
        <div className="cornerTriangle data-resume-root" />
      </div>

      <style jsx>{`
        .modern-template {
          width: 100%;
          min-height: 100%;
          background: #fff;
          display: flex;
          position: relative;
          overflow: hidden;
          font-family: ${t.bodyFont || 'Inter'}, sans-serif;
        }

        /* ================= SIDEBAR ================= */
        .sidebar {
          width: 34%;
          background: ${t.primaryColor || '#2b2b2b'};
          color: #fff;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding-bottom: 32px;
        }

        .sidebarContent {
          padding: 0 32px;
          margin-top: 20px;
          flex: 1;
        }

        .photoWrap {
          position: relative;
          height: 230px;
          background: ${t.accentColor || '#f4a51c'};
          clip-path: polygon(0 0, 100% 0, 100% 55%, 0 100%);
          overflow: hidden;
          flex-shrink: 0;
        }

        .photoTriangle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${t.accentColor || '#f4a51c'};
          clip-path: polygon(0 0, 65% 0, 0 55%);
        }

        .photoCircle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #ccc;
          border: 6px solid #fff;
          position: absolute;
          top: 45px;
          left: 30px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .photoCircle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sideHeading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 26px 0 16px 0;
        }

        .iconBadge {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: ${t.accentColor || '#f4a51c'};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
        }

        .iconBadge svg {
          width: 14px;
          height: 14px;
        }

        .sideHeading h3 {
          font-size: 15px;
          letter-spacing: 1px;
          font-weight: 700;
          font-family: ${t.headingFont || 'Poppins'}, sans-serif;
          margin: 0;
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contactItem {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 12.5px;
          line-height: 1.5;
          color: #e5e5e5;
        }

        .contactItem .ic {
          color: ${t.accentColor || '#f4a51c'};
          font-size: 14px;
          margin-top: 2px;
          flex-shrink: 0;
          width: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contactItem .ic svg {
          width: 14px;
          height: 14px;
        }

        .dottedLine {
          border: none;
          border-top: 2px dotted rgba(255,255,255,0.25);
          margin: 22px 0;
        }

        .refItem {
          margin-bottom: 18px;
          font-size: 12px;
          color: #dcdcdc;
          line-height: 1.6;
        }

        .refItem b {
          display: block;
          color: #fff;
          font-size: 13px;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
        }

        .refItem span {
          display: block;
          color: rgba(255,255,255,0.65);
        }

        .eduItem {
          margin-bottom: 18px;
          font-size: 12px;
          color: #dcdcdc;
          line-height: 1.6;
          position: relative;
          padding-left: 16px;
        }

        .eduItem b {
          display: block;
          color: #fff;
          font-size: 13px;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
        }

        .eduItem::before {
          content: "";
          position: absolute;
          left: 0;
          top: 6px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${t.accentColor || '#f4a51c'};
        }

        /* ================= DIVIDER ================= */
        .divider {
          width: 2px;
          background: ${t.accentColor || '#f4a51c'};
          flex-shrink: 0;
        }

        /* ================= CONTENT ================= */
        .content {
          flex: 1;
          background: #fff;
          padding: 0 40px 20px 46px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .headerBlock {
          background: #f5f5f5;
          padding: 38px 40px 30px 0;
          margin: 0 -40px 0 -46px;
          padding-left: 46px;
          position: relative;
        }

        .headerBlock::before {
          content: "";
          position: absolute;
          left: 10;
          top: 15px;
          bottom: 15px;
          width: 6px;
          background: ${t.accentColor || '#f4a51c'};
        }

        .name {
          font-size: 34px;
          font-weight: 800;
          color: ${t.textColor || '#2b2b2b'};
          letter-spacing: 1px;
          font-family: ${t.headingFont || 'Poppins'}, sans-serif;
        }

        .name span {
          color: ${t.accentColor || '#f4a51c'};
        }

        .title {
          font-size: 13px;
          letter-spacing: 4px;
          color: #555;
          margin-top: 6px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .section {
          padding: 26px 0 6px 0;
        }

        /* Reduce spacing when content is heavy */
        .modern-template[data-content-heavy="true"] .section {
          padding-top: 18px;
          padding-bottom: 2px;
        }

        .modern-template[data-content-heavy="true"] .job {
          margin-bottom: 12px;
        }

        .modern-template[data-content-heavy="true"] .jobDesc {
          font-size: 11px;
        }

        .modern-template[data-content-heavy="true"] .aboutText {
          font-size: 11.5px;
        }

        .sectionTitle {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .iconBadgeYellow {
          background: ${t.accentColor || '#f4a51c'};
          color: #fff;
        }

        .iconBadgeYellow svg {
          width: 14px;
          height: 14px;
        }

        .sectionTitle h2 {
          font-size: 17px;
          letter-spacing: 1px;
          color: ${t.textColor || '#2b2b2b'};
          font-weight: 800;
          font-family: ${t.headingFont || 'Poppins'}, sans-serif;
          margin: 0;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.9;
          color: #666;
          padding-left: 0;
          margin: 0;
        }

        .job {
          padding-left: 0;
          margin-bottom: 20px;
          position: relative;
        }

        .jobTop {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 4px;
        }

        .jobTitle {
          font-size: 14px;
          font-weight: 800;
          color: ${t.textColor || '#2b2b2b'};
          letter-spacing: 0.5px;
          font-family: ${t.headingFont || 'Poppins'}, sans-serif;
        }

        .jobDate {
          font-size: 11.5px;
          color: #999;
          font-weight: 600;
        }

        .jobSub {
          font-size: 12px;
          font-style: italic;
          color: #888;
          margin: 3px 0 6px 0;
        }

        .jobDesc {
          font-size: 12px;
          color: #777;
          line-height: 1.7;
        }

        .skills {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 30px;
          margin-bottom: 30px;
        }

        .skillName {
          font-size: 12px;
          font-weight: 700;
          color: ${t.textColor || '#2b2b2b'};
          margin-bottom: 6px;
        }

        .skillBar {
          height: 6px;
          background: #e2e2e2;
          border-radius: 3px;
          overflow: hidden;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || '#f4a51c'};
          border-radius: 3px;
          transition: width 0.6s ease;
        }

        .skillsTags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }

        .skillTag {
          background: ${t.accentColor || '#f4a51c'}20;
          color: ${t.accentColor || '#f4a51c'};
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .languages {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .languageItem {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: ${t.textColor || '#2b2b2b'};
        }

        .languageLevel {
          color: ${t.mutedColor || '#666'};
          font-style: italic;
        }

        .achievements {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .achievementItem {
          font-size: 13px;
          color: ${t.textColor || '#2b2b2b'};
          padding-left: 20px;
          position: relative;
        }

        .achievementItem::before {
          content: "â–¸";
          position: absolute;
          left: 0;
          color: ${t.accentColor || '#f4a51c'};
        }

        .achievementDescription {
          font-size: 12px;
          color: ${t.mutedColor || '#666'};
          margin-top: 2px;
          padding-left: 4px;
        }

        .customItems {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .customItem {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .customLabel {
          font-weight: 600;
          color: ${t.textColor || '#2b2b2b'};
          font-size: 14px;
        }

        .customDescription {
          font-size: 12.5px;
          color: #666;
          line-height: 1.6;
        }

        .cornerTriangle {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 90px 90px;
          border-color: transparent transparent ${t.accentColor || '#f4a51c'} transparent;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .modern-template {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
          }
          .divider {
            width: 100%;
            height: 2px;
          }
          .headerBlock {
            margin: 0;
            padding-left: 20px;
          }
          .content {
            padding: 0 20px 20px;
          }
          .photoWrap {
            height: 180px;
          }
          .photoCircle {
            width: 120px;
            height: 120px;
            top: 35px;
            left: 20px;
          }
          .skills {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          .modern-template {
            box-shadow: none;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
