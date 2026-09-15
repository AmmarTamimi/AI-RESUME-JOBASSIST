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

export default function TechTemplate({ content, theme }: TemplateProps) {
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

  // bucket skill level into a tier tag rather than a percent bar
  const tierFor = (level: number) => {
    if (level >= 85) return "expert";
    if (level >= 60) return "proficient";
    return "familiar";
  };

  return (
    <div className="tech-template data-resume-root">
      {/* ================= TOP BAR ================= */}
      <div className="topBar data-resume-root">
        <div className="promptLine data-resume-root">
          <span className="promptSymbol">&gt;</span> whoami
        </div>
        <div className="headerRow data-resume-root">
          {personalInfo.photoUrl && (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          )}
          <div>
            <div className="name data-resume-root">{personalInfo.fullName}</div>
            <div className="title data-resume-root">{personalInfo.title || "SOFTWARE ENGINEER"}</div>
          </div>
        </div>

        <div className="contactRow data-resume-root">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <span className="contactChip" key={i}>
                      {item.description}
                    </span>
                  );
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && <span className="contactChip">{personalInfo.phone}</span>}
                {personalInfo.email && <span className="contactChip">{personalInfo.email}</span>}
                {personalInfo.location && <span className="contactChip">{personalInfo.location}</span>}
                {personalInfo.website && <span className="contactChip">{personalInfo.website}</span>}
              </>
            )}
        </div>
      </div>

      {/* ================= BODY GRID ================= */}
      <div className="grid data-resume-root">
        <div className="mainCol data-resume-root">
          {aboutText && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> about</div>
              <p className="aboutText">{aboutText}</p>
            </div>
          )}

          {experienceSection && experienceSection.items.length > 0 && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {experienceSection.title || 'experience'}</div>
              {experienceSection.items.map((job, i) => (
                <div className="job data-resume-root" key={i}>
                  <div className="jobTop data-resume-root">
                    <span className="jobTitle">{job.role || "Position"}</span>
                    <span className="jobDate">{job.start} – {job.end || "current"}</span>
                  </div>
                  <div className="jobSub data-resume-root">{job.company}{job.location ? ` · ${job.location}` : ""}</div>
                  {job.bullets && job.bullets.length > 0 && (
                    <div className="jobDesc data-resume-root">{job.bullets}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ACHIEVEMENTS - Main Section */}
          {achievementsSection && achievementsSection.items.length > 0 && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {achievementsSection.title || 'achievements'}</div>
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
            <div key={section.id} className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {section.title || 'custom'}</div>
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

          {referencesSection && referencesSection.items.length > 0 && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {referencesSection.title || 'references'}</div>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem data-resume-root" key={i}>
                  <span className="refName">{ref.name}</span>
                  {ref.address && <span className="refLine">{ref.address}</span>}
                  {ref.phone && <span className="refLine">{ref.phone}</span>}
                  {ref.email && <span className="refLine">{ref.email}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sideCol data-resume-root">
          {/* RATED SKILLS */}
          {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {ratedSkillsSection.title || 'stack'}</div>
              <div className="tagCloud data-resume-root">
                {ratedSkillsSection.items.map((skill: RatedSkillItem, i) => (
                  <span className={`tag tag-${tierFor(skill.level || 50)}`} key={i}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS (Tags) */}
          {skillsSection && skillsSection.items.length > 0 && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {skillsSection.title || 'technical skills'}</div>
              <div className="tagCloud data-resume-root">
                {skillsSection.items.map((skill: string, i) => (
                  <span className="tag tag-proficient" key={i}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languagesSection && languagesSection.items.length > 0 && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {languagesSection.title || 'languages'}</div>
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
            </div>
          )}

          {educationSection && educationSection.items.length > 0 && (
            <div className="block data-resume-root">
              <div className="blockHeader data-resume-root"><span className="hash">#</span> {educationSection.title || 'education'}</div>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem data-resume-root" key={i}>
                  <span className="eduSchool">{edu.school}</span>
                  <span className="eduDegree">{edu.degree}</span>
                  <span className="eduDate">{edu.start} – {edu.end}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .tech-template {
          width: 100%;
          min-height: 100%;
          background: ${t.primaryColor || "#0D0F14"};
          color: #d7dbe0;
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
          padding: 40px 46px 48px;
          box-sizing: border-box;
        }

        .promptLine {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 12px;
          color: ${t.accentColor || "#39E6C5"};
          margin-bottom: 18px;
        }

        .promptSymbol {
          color: #5b6675;
          margin-right: 6px;
        }

        .headerRow {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .photo {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid ${t.accentColor || "#39E6C5"};
        }

        .name {
          font-family: ${t.headingFont || "Space Grotesk"}, sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #f2f4f7;
          letter-spacing: -0.3px;
        }

        .title {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 12px;
          color: ${t.accentColor || "#39E6C5"};
          margin-top: 4px;
        }

        .contactRow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .contactChip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
          color: #aab2bf;
          background: #151821;
          border: 1px solid #232833;
          border-radius: 5px;
          padding: 5px 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 36px;
          margin-top: 34px;
        }

        .block {
          margin-bottom: 30px;
        }

        .blockHeader {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 12px;
          letter-spacing: 1px;
          color: #f2f4f7;
          text-transform: lowercase;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid #232833;
        }

        .hash {
          color: ${t.accentColor || "#39E6C5"};
          margin-right: 6px;
        }

        .aboutText {
          font-size: 12.5px;
          line-height: 1.85;
          color: #aab2bf;
          margin: 0;
        }

        .job {
          margin-bottom: 20px;
          padding-left: 14px;
          border-left: 2px solid #232833;
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
          color: #f2f4f7;
        }

        .jobDate {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
          color: #6b7484;
        }

        .jobSub {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 11px;
          color: ${t.accentColor || "#39E6C5"};
          margin: 3px 0 7px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.7;
          color: #aab2bf;
        }

        .refItem {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          font-size: 11.5px;
        }

        .refName {
          color: #f2f4f7;
          font-weight: 700;
        }

        .refLine {
          color: #6b7484;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
        }

        .tagCloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10.5px;
          padding: 6px 10px;
          border-radius: 5px;
          background: #151821;
          border: 1px solid #232833;
          color: #aab2bf;
        }

        .tag-expert {
          border-color: ${t.accentColor || "#39E6C5"};
          color: ${t.accentColor || "#39E6C5"};
        }

        .tag-proficient {
          border-color: #4a9eff;
          color: #4a9eff;
        }

        .tag-familiar {
          border-color: #6b7484;
          color: #6b7484;
        }

        .eduItem {
          display: flex;
          flex-direction: column;
          margin-bottom: 14px;
          font-size: 11.5px;
        }

        .eduSchool {
          color: #f2f4f7;
          font-weight: 700;
        }

        .eduDegree {
          color: #aab2bf;
          margin-top: 2px;
        }

        .eduDate {
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 10px;
          color: #6b7484;
          margin-top: 2px;
        }

        /* ACHIEVEMENTS */
        .achievementsList {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .achievementItem {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || "#39E6C5"};
        }

        .achievementTitle {
          font-size: 12.5px;
          font-weight: 600;
          color: #f2f4f7;
        }

        .achievementDesc {
          font-size: 11.5px;
          color: #aab2bf;
          line-height: 1.6;
          margin-top: 2px;
        }

        /* CUSTOM SECTIONS */
        .customItems {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .customItem {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || "#39E6C5"};
        }

        .customLabel {
          font-size: 12.5px;
          font-weight: 600;
          color: #f2f4f7;
        }

        .customDesc {
          font-size: 11.5px;
          color: #aab2bf;
          line-height: 1.6;
          margin-top: 2px;
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
          color: #aab2bf;
        }

        .langName {
          color: #f2f4f7;
        }

        .langLevel {
          color: #6b7484;
          font-size: 10.5px;
        }

        @media (max-width: 800px) {
          .grid { grid-template-columns: 1fr; }
          .tech-template { padding: 28px 22px; }
        }

        @media print {
          .tech-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}