import React from "react";
import type { TemplateProps, CustomItem, ReferenceItem, LanguageItem, AchievementItem, RatedSkillItem } from "../../types/Content";

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

export default function MinimalTemplate2({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  // Find sections
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
    <div className="minimal-template data-resume-root">
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="headerTop data-resume-root">
          {personalInfo.photoUrl && (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          )}
          <div className="nameBlock data-resume-root">
            <h1 className="name">{personalInfo.fullName}</h1>
            <div className="titleRow data-resume-root">
              <span className="titleTick" />
              <span className="title">{personalInfo.title || "PROFESSIONAL"}</span>
            </div>
          </div>
        </div>

        <div className="contactBar data-resume-root">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <span className="contactItem" key={i}>
                      {item.description}
                    </span>
                  );
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && (
                  <span className="contactItem">{personalInfo.phone}</span>
                )}
                {personalInfo.email && (
                  <span className="contactItem">{personalInfo.email}</span>
                )}
                {personalInfo.location && (
                  <span className="contactItem">{personalInfo.location}</span>
                )}
                {personalInfo.website && (
                  <span className="contactItem">{personalInfo.website}</span>
                )}
              </>
            )}
        </div>
      </header>

      <div className="rule data-resume-root" />

      {/* ================= BODY ================= */}
      <div className="body data-resume-root">
        {/* About */}
        {aboutText && (
          <section className="section">
            <h2 className="sectionLabel">About</h2>
            <p className="aboutText">{aboutText}</p>
          </section>
        )}

        {/* Experience - ledger style */}
        {experienceSection && experienceSection.items.length > 0 && (
          <section className="section">
            <h2 className="sectionLabel">{experienceSection.title || 'Experience'}</h2>
            <div className="ledger data-resume-root">
              {experienceSection.items.map((job, i) => (
                <div className="ledgerRow data-resume-root" key={i}>
                  <div className="ledgerDate data-resume-root">
                    <span className="dot" />
                    {job.start} — {job.end || "Present"}
                  </div>
                  <div className="ledgerMain data-resume-root">
                    <div className="jobTop data-resume-root">
                      <span className="jobTitle">{job.role || "Position"}</span>
                      <span className="jobCompany">{job.company}{job.location ? `, ${job.location}` : ""}</span>
                    </div>
                    {job.bullets && job.bullets.length > 0 && (
                      <div className="jobDesc data-resume-root">
                        {job.bullets.map((bullet, idx) => (
                          <div key={idx}>• {bullet}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievementsSection && achievementsSection.items.length > 0 && (
          <section className="section">
            <h2 className="sectionLabel">{achievementsSection.title || 'Achievements'}</h2>
            <div className="achievementsList data-resume-root">
              {achievementsSection.items.map((item, i) => {
                if (isAchievementItem(item)) {
                  return (
                    <div key={i} className="achievementItem data-resume-root">
                      <div className="achievementTitle">{item.title}</div>
                      {item.description && (
                        <div className="achievementDesc">{item.description}</div>
                      )}
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div key={i} className="achievementItem data-resume-root">
                      <div className="achievementTitle">{item}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </section>
        )}

        <div className="twoCol data-resume-root">
          {/* Education */}
          {educationSection && educationSection.items.length > 0 && (
            <section className="section half">
              <h2 className="sectionLabel">{educationSection.title || 'Education'}</h2>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem data-resume-root" key={i}>
                  <div className="eduTop data-resume-root">
                    <span className="eduSchool">{edu.school}</span>
                    <span className="eduDate">{edu.start} – {edu.end}</span>
                  </div>
                  <div className="eduDegree data-resume-root">{edu.degree}</div>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {languagesSection && languagesSection.items.length > 0 && (
            <section className="section half">
              <h2 className="sectionLabel">{languagesSection.title || 'Languages'}</h2>
              <div className="languagesList data-resume-root">
                {languagesSection.items.map((item, i) => {
                  if (isLanguageItem(item)) {
                    return (
                      <div key={i} className="languageItem data-resume-root">
                        <span className="langName">{item.name}</span>
                        {item.level && <span className="langLevel">{item.level}</span>}
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="languageItem data-resume-root">
                      <span className="langName">{String(item)}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <div className="twoCol data-resume-root">
          {/* References */}
          {referencesSection && referencesSection.items.length > 0 && (
            <section className="section half">
              <h2 className="sectionLabel">{referencesSection.title || 'References'}</h2>
              {referencesSection.items.map((ref: ReferenceItem, i) => (
                <div className="refItem data-resume-root" key={i}>
                  <div className="refName data-resume-root">{ref.name}</div>
                  {ref.address && <div className="refLine data-resume-root">{ref.address}</div>}
                  {ref.phone && <div className="refLine data-resume-root">{ref.phone}</div>}
                  {ref.email && <div className="refLine data-resume-root">{ref.email}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Skills - supports both "skills" and "ratedSkills" */}
          {(ratedSkillsSection || skillsSection) && (
            <section className="section half">
              <h2 className="sectionLabel">
                {ratedSkillsSection?.title || skillsSection?.title || 'Skills'}
              </h2>
              
              {/* Rated Skills */}
              {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
                <div className="skillsGrid data-resume-root">
                  {ratedSkillsSection.items.map((skill: RatedSkillItem, i) => (
                    <div className="skillRow data-resume-root" key={i}>
                      <div className="skillTop data-resume-root">
                        <span className="skillName">{skill.name}</span>
                        <span className="skillPct">{skill.level || 100}</span>
                      </div>
                      <div className="skillBar data-resume-root">
                        <div className="skillFill data-resume-root" style={{ width: `${skill.level || 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Simple Skills (Tags) */}
              {skillsSection && skillsSection.items.length > 0 && !ratedSkillsSection && (
                <div className="skillsTags data-resume-root">
                  {skillsSection.items.map((skill: string, i) => (
                    <span key={i} className="skillTag data-resume-root">{skill}</span>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Other Custom Sections */}
        {otherCustomSections.map((section) => (
          <section className="section" key={section.id}>
            <h2 className="sectionLabel">{section.title || 'Custom'}</h2>
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
          </section>
        ))}
      </div>

      <style jsx>{`
        .minimal-template {
          width: 100%;
          min-height: 100%;
          background: ${t.backgroundColor || "#FAFAF8"};
          color: ${t.textColor || "#181818"};
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
          padding: 56px 64px 64px;
          box-sizing: border-box;
        }

        .headerTop {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .photo {
          width: 64px;
          height: 64px;
          border-radius: 4px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .name {
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 40px;
          font-weight: 500;
          letter-spacing: -0.5px;
          margin: 0;
          line-height: 1.05;
        }

        .titleRow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .titleTick {
          width: 18px;
          height: 2px;
          background: ${t.accentColor || "#2F4E9E"};
          display: inline-block;
        }

        .title {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #6b6b6b;
        }

        .contactBar {
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
          margin-top: 26px;
        }

        .contactItem {
          font-size: 12.5px;
          color: #444;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
        }

        .rule {
          height: 1px;
          background: #dcdad4;
          margin: 32px 0 0;
        }

        .body {
          margin-top: 8px;
        }

        .section {
          padding-top: 34px;
        }

        .sectionLabel {
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${t.accentColor || "#2F4E9E"};
          margin: 0 0 18px 0;
        }

        .aboutText {
          font-size: 13.5px;
          line-height: 1.85;
          color: #4a4a4a;
          margin: 0;
          max-width: 640px;
        }

        .ledger {
          display: flex;
          flex-direction: column;
        }

        .ledgerRow {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 24px;
          padding: 16px 0;
          border-top: 1px solid #e6e4de;
        }

        .ledgerRow:last-child {
          border-bottom: 1px solid #e6e4de;
        }

        .ledgerDate {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 11px;
          color: #8a8a8a;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${t.accentColor || "#2F4E9E"};
          flex-shrink: 0;
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
          color: ${t.textColor || "#181818"};
        }

        .jobCompany {
          font-size: 12px;
          color: #8a8a8a;
          font-style: italic;
        }

        .jobDesc {
          font-size: 12.5px;
          line-height: 1.75;
          color: #5c5c5c;
          margin: 8px 0 0;
        }

        .jobDesc div {
          margin-bottom: 2px;
        }

        .twoCol {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .half {
          padding-top: 34px;
        }

        .eduItem {
          margin-bottom: 16px;
        }

        .eduTop {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .eduSchool {
          font-size: 13px;
          font-weight: 700;
        }

        .eduDate {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
          color: #8a8a8a;
        }

        .eduDegree {
          font-size: 12px;
          color: #6b6b6b;
          margin-top: 3px;
        }

        .refItem {
          margin-bottom: 16px;
        }

        .refName {
          font-size: 13px;
          font-weight: 700;
        }

        .refLine {
          font-size: 11.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        /* Achievements */
        .achievementsList {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .achievementItem {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || "#2F4E9E"};
        }

        .achievementTitle {
          font-size: 13px;
          font-weight: 600;
          color: ${t.textColor || "#181818"};
        }

        .achievementDesc {
          font-size: 12px;
          color: #5c5c5c;
          line-height: 1.6;
          margin-top: 2px;
        }

        /* Languages */
        .languagesList {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .languageItem {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: ${t.textColor || "#181818"};
        }

        .langName {
          font-weight: 500;
        }

        .langLevel {
          color: #6b6b6b;
          font-style: italic;
          font-size: 12px;
        }

        /* Skills */
        .skillsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 32px;
        }

        .skillRow {
          margin-bottom: 4px;
        }

        .skillTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .skillName {
          font-size: 12.5px;
          font-weight: 600;
        }

        .skillPct {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 11px;
          color: #8a8a8a;
        }

        .skillBar {
          height: 3px;
          background: #e6e4de;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#2F4E9E"};
        }

        /* Skills Tags */
        .skillsTags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skillTag {
          font-size: 12px;
          color: ${t.textColor || "#181818"};
          padding: 4px 12px;
          background: #f0efe9;
          border-radius: 12px;
        }

        /* Custom Sections */
        .customItems {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .customItem {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || "#2F4E9E"};
        }

        .customLabel {
          font-size: 13px;
          font-weight: 600;
          color: ${t.textColor || "#181818"};
        }

        .customDesc {
          font-size: 12px;
          color: #5c5c5c;
          line-height: 1.6;
          margin-top: 2px;
        }

        @media (max-width: 700px) {
          .minimal-template { padding: 36px 24px; }
          .twoCol { grid-template-columns: 1fr; }
          .skillsGrid { grid-template-columns: 1fr; }
          .ledgerRow { grid-template-columns: 1fr; gap: 6px; }
        }

        @media print {
          .minimal-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}