import React from "react";
import type { TemplateProps, CustomItem, ReferenceItem, LanguageItem, AchievementItem, RatedSkillItem } from "../../types/Content";

const isCustomItem = (item: any): item is CustomItem => item && typeof item === 'object' && 'label' in item;
const isLanguageItem = (item: any): item is LanguageItem => item && typeof item === 'object' && 'name' in item;
const isAchievementItem = (item: any): item is AchievementItem => item && typeof item === 'object' && 'title' in item;

export default function ElegantTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;
  const accent = t.accentColor || "#C19A49";

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
    <div className="elegant-template data-resume-root">
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
            <h3>Contact</h3>
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
                  {personalInfo.phone && <div className="contactItem data-resume-root"><span>{personalInfo.phone}</span></div>}
                  {personalInfo.email && <div className="contactItem data-resume-root"><span>{personalInfo.email}</span></div>}
                  {personalInfo.location && <div className="contactItem data-resume-root"><span>{personalInfo.location}</span></div>}
                  {personalInfo.website && <div className="contactItem data-resume-root"><span>{personalInfo.website}</span></div>}
                </>
              )}
          </div>

          <div className="ornament data-resume-root" />

          {educationSection && educationSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
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

          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
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

          {skillsSection && skillsSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
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

          {languagesSection && languagesSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
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
          border: 4px solid ${accent};
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

        .sidebarContent { padding: 10px 32px 0; }

        .sideHeading {
          margin: 22px 0 16px;
        }

        .sideHeading h3 {
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 1.5px;
          margin: 0;
          color: ${accent};
          line-height: 1.2;
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .contactItem {
          font-size: 12px;
          line-height: 1.4;
          color: #e3ddcb;
        }

        .ornament {
          height: 1px;
          background: linear-gradient(90deg, ${accent}, transparent);
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

        .dates { color: #b9b199; font-size: 11px; }

        .skillList { display: flex; flex-direction: column; gap: 12px; }
        .skillItem { width: 100%; }
        .skillName { font-size: 11.5px; color: #e3ddcb; margin-bottom: 4px; }
        .skillBar { height: 4px; background: rgba(255,255,255,0.15); border-radius: 2px; overflow: hidden; }
        .skillFill { height: 100%; background: ${accent}; border-radius: 2px; }

        .skillsTags { display: flex; flex-wrap: wrap; gap: 6px; }
        .skillTag {
          background: rgba(255,255,255,0.08);
          color: #e3ddcb;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 10px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(193,154,73,0.2);
        }

        .languagesList { display: flex; flex-direction: column; gap: 6px; }
        .languageItem { display: flex; justify-content: space-between; font-size: 11.5px; color: #e3ddcb; }
        .langName { color: #fff; }
        .langLevel { color: #b9b199; font-size: 10.5px; }

        .content { flex: 1; padding: 48px 46px; }

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

        .hairline { height: 1px; background: #ddd5bf; margin-top: 24px; }
        .section { margin-top: 32px; }

        .sectionTitle {
          font-family: ${t.headingFont || "Cormorant Garamond"}, serif;
          font-size: 20px;
          font-weight: 700;
          color: ${t.textColor || "#1F3D2B"};
          margin: 0 0 14px;
        }

        .aboutText { font-size: 13px; line-height: 1.9; color: #5a5747; }

        .job { margin-bottom: 20px; }
        .jobTop { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px; }
        .jobTitle { font-size: 14.5px; font-weight: 700; color: ${t.textColor || "#1F3D2B"}; }
        .jobDate { font-size: 11.5px; color: #9a9484; }
        .jobSub { font-size: 12px; font-style: italic; color: ${t.accentColor || "#A9843C"}; margin: 3px 0 7px; }
        .jobDesc { font-size: 12.5px; color: #635f4f; line-height: 1.75; }

        .achievementsList { display: flex; flex-direction: column; gap: 10px; }
        .achievementItem { padding-left: 14px; border-left: 2px solid ${accent}; }
        .achievementTitle { font-size: 13px; font-weight: 600; color: ${t.textColor || "#1F3D2B"}; }
        .achievementDesc { font-size: 12px; color: #5a5747; line-height: 1.6; margin-top: 2px; }

        .customItems { display: flex; flex-direction: column; gap: 10px; }
        .customItem { padding-left: 14px; border-left: 2px solid ${accent}; }
        .customLabel { font-size: 13px; font-weight: 600; color: ${t.textColor || "#1F3D2B"}; }
        .customDesc { font-size: 12px; color: #5a5747; line-height: 1.6; margin-top: 2px; }

        @media (max-width: 900px) {
          .elegant-template { flex-direction: column; }
          .sidebar { width: 100%; }
        }
        @media print { .elegant-template { box-shadow: none; } }
      `}</style>
    </div>
  );
}