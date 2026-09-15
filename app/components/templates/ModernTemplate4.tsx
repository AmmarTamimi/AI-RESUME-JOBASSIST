import React from "react";
import type { TemplateProps, CustomItem, ReferenceItem, LanguageItem, AchievementItem, RatedSkillItem } from "../../types/Content";

const isCustomItem = (item: any): item is CustomItem => item && typeof item === 'object' && 'label' in item;
const isLanguageItem = (item: any): item is LanguageItem => item && typeof item === 'object' && 'name' in item;
const isAchievementItem = (item: any): item is AchievementItem => item && typeof item === 'object' && 'title' in item;

export default function ExecutiveTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;
  const accent = t.accentColor || "#B79355";

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

  return (
    <div className="exec-template data-resume-root">
      <div className="content data-resume-root">
        <div className="headerBlock data-resume-root">
          <div className="name data-resume-root">{personalInfo.fullName}</div>
          <div className="goldRule data-resume-root" />
          <div className="title data-resume-root">{personalInfo.title || "EXECUTIVE PROFILE"}</div>
        </div>

        {aboutText && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">Executive Summary</h2>
            <p className="aboutText">{aboutText}</p>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">{experienceSection.title || 'Professional Experience'}</h2>
            {experienceSection.items.map((job, i) => (
              <div className="job data-resume-root" key={i}>
                <div className="jobTop data-resume-root">
                  <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
                  <div className="jobDate data-resume-root">{job.start} – {job.end || "Present"}</div>
                </div>
                <div className="jobSub data-resume-root">{job.company}{job.location ? `  |  ${job.location}` : ""}</div>
                {job.bullets && job.bullets.length > 0 && (
                  <div className="jobDesc data-resume-root">{job.bullets}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {achievementsSection && achievementsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <h2 className="sectionTitle">{achievementsSection.title || 'Key Achievements'}</h2>
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

      <aside className="sidebar">
        {personalInfo.photoUrl && (
          <div className="photoBlock data-resume-root">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          </div>
        )}

        <div className="sideHeading data-resume-root">
          <h3>CONTACT</h3>
        </div>
        <div className="contactList data-resume-root">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <div className="contactItem data-resume-root" key={i}>
                      <span>{item.description}</span>
                    </div>
                  );
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && (
                  <div className="contactItem data-resume-root"><span>{personalInfo.phone}</span></div>
                )}
                {personalInfo.email && (
                  <div className="contactItem data-resume-root"><span>{personalInfo.email}</span></div>
                )}
                {personalInfo.location && (
                  <div className="contactItem data-resume-root"><span>{personalInfo.location}</span></div>
                )}
                {personalInfo.website && (
                  <div className="contactItem data-resume-root"><span>{personalInfo.website}</span></div>
                )}
              </>
            )}
        </div>

        <hr className="thinLine" />

        {educationSection && educationSection.items.length > 0 && (
          <>
            <div className="sideHeading data-resume-root">
              <h3>{educationSection.title || 'EDUCATION'}</h3>
            </div>
            {educationSection.items.map((edu, i) => (
              <div className="eduItem data-resume-root" key={i}>
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
            <div className="sideHeading data-resume-root">
              <h3>{ratedSkillsSection.title || 'CORE COMPETENCIES'}</h3>
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
            <hr className="thinLine" />
          </>
        )}

        {skillsSection && skillsSection.items.length > 0 && (
          <>
            <div className="sideHeading data-resume-root">
              <h3>{skillsSection.title || 'TECHNICAL SKILLS'}</h3>
            </div>
            <div className="skillsTags data-resume-root">
              {skillsSection.items.map((skill: string, i) => (
                <span key={i} className="skillTag data-resume-root">{skill}</span>
              ))}
            </div>
            <hr className="thinLine" />
          </>
        )}

        {languagesSection && languagesSection.items.length > 0 && (
          <>
            <div className="sideHeading data-resume-root">
              <h3>{languagesSection.title || 'LANGUAGES'}</h3>
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
            <hr className="thinLine" />
          </>
        )}

        {referencesSection && referencesSection.items.length > 0 && (
          <>
            <div className="sideHeading data-resume-root">
              <h3>{referencesSection.title || 'REFERENCES'}</h3>
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
          border: 2px solid ${accent};
          margin: 0 auto 32px;
          overflow: hidden;
          border-radius: 50%;
        }

        .photoBlock img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sideHeading {
          margin: 24px 0 14px;
        }

        .sideHeading h3 {
          font-family: ${t.headingFont || "Playfair Display"}, serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 2px;
          margin: 0;
          color: ${accent};
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .contactItem {
          font-size: 11.5px;
          line-height: 1.5;
          color: #d7d4c9;
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

        .dates { color: #a8a496; font-size: 10.5px; }

        .skillList { display: flex; flex-direction: column; gap: 12px; }
        .skillName { font-size: 11.5px; color: #e8e6df; margin-bottom: 5px; }
        .skillBar { height: 4px; background: rgba(255,255,255,0.15); }
        .skillFill { height: 100%; background: ${accent}; }

        .skillsTags { display: flex; flex-wrap: wrap; gap: 6px; }
        .skillTag {
          background: rgba(255,255,255,0.1);
          color: #d7d4c9;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 10px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(183, 147, 85, 0.3);
        }

        .languagesList { display: flex; flex-direction: column; gap: 6px; }
        .languageItem { display: flex; justify-content: space-between; font-size: 11.5px; color: #d7d4c9; }
        .langName { color: #fff; }
        .langLevel { color: #a8a496; font-style: italic; font-size: 10.5px; }

        .achievementsList { display: flex; flex-direction: column; gap: 12px; }
        .achievementItem { padding-left: 16px; position: relative; }
        .achievementItem::before { content: "▸"; position: absolute; left: 0; color: ${accent}; }
        .achievementTitle { font-size: 13px; font-weight: 600; color: ${t.textColor || "#111C33"}; }
        .achievementDesc { font-size: 12px; color: #565656; line-height: 1.6; margin-top: 2px; }

        .customItems { display: flex; flex-direction: column; gap: 12px; }
        .customItem { padding-left: 16px; position: relative; }
        .customItem::before { content: "▸"; position: absolute; left: 0; color: ${accent}; }
        .customLabel { font-size: 13px; font-weight: 600; color: ${t.textColor || "#111C33"}; }
        .customDesc { font-size: 12px; color: #565656; line-height: 1.6; margin-top: 2px; }

        .content { flex: 1; padding: 50px 48px; }
        .headerBlock { margin-bottom: 8px; }
        .name {
          font-family: ${t.headingFont || "Playfair Display"}, serif;
          font-size: 36px;
          font-weight: 700;
          color: ${t.textColor || "#111C33"};
          letter-spacing: 0.5px;
        }
        .goldRule { width: 64px; height: 3px; background: ${accent}; margin: 14px 0 12px; }
        .title {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #6b6b6b;
          font-family: ${t.bodyFont || "Source Serif Pro"}, serif;
        }
        .section { margin-top: 34px; }
        .sectionTitle {
          font-family: ${t.headingFont || "Playfair Display"}, serif;
          font-size: 17px;
          font-weight: 700;
          color: ${t.textColor || "#111C33"};
          border-bottom: 1px solid #ddd8ca;
          padding-bottom: 8px;
          margin: 0 0 16px;
        }
        .aboutText { font-size: 13px; line-height: 1.9; color: #454545; margin: 0; }

        .job { margin-bottom: 22px; }
        .jobTop { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px; }
        .jobTitle { font-size: 14.5px; font-weight: 700; color: ${t.textColor || "#111C33"}; }
        .jobDate { font-size: 11.5px; color: #8c8c8c; }
        .jobSub { font-size: 12px; font-style: italic; color: ${accent}; margin: 3px 0 8px; }
        .jobDesc { font-size: 12.5px; color: #565656; line-height: 1.75; }

        @media (max-width: 900px) {
          .exec-template { flex-direction: column; }
          .sidebar { width: 100%; }
        }
        @media print { .exec-template { box-shadow: none; } }
      `}</style>
    </div>
  );
}