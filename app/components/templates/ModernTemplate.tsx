import React from "react";
import type { 
  TemplateProps, 
  CustomItem, 
  ReferenceItem,
  LanguageItem,
  AchievementItem,
  RatedSkillItem 
} from "../../types/Content";

export default function ModernTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;
  const accent = t.accentColor || '#f4a51c';

  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const skillsSection = sections.find((s) => s.type === "skills");
  const languagesSection = sections.find((s) => s.type === "languages");
  const achievementsSection = sections.find((s) => s.type === "achievements");
  const aboutText = personalInfo.summary;

  const nameParts = personalInfo.fullName.trim().split(" ");
  const lastWord = nameParts.length > 1 ? nameParts.pop() : "";
  const firstPart = nameParts.join(" ");

  const contactItems = contactSection?.items || [];

  const otherCustomSections = sections.filter(
    (s) => s.type === "custom" && s.id !== "contact"
  );

  const isCustomItem = (item: any): item is CustomItem =>
    item && typeof item === 'object' && 'label' in item;
  const isLanguageItem = (item: any): item is LanguageItem =>
    item && typeof item === 'object' && 'name' in item;
  const isAchievementItem = (item: any): item is AchievementItem =>
    item && typeof item === 'object' && 'title' in item;

  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  const isContentHeavy = totalItems > 15;

  return (
    <div className="modern-template data-resume-root" data-content-heavy={isContentHeavy}>
      <aside className="sidebar">
        {personalInfo.photoUrl && (
          <div className="photoWrap data-resume-root">
            <div className="photoTriangle data-resume-root" />
            <div className="photoCircle data-resume-root">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
            </div>
          </div>
        )}

        <div className="sidebarContent data-resume-root">
          <div className="sideHeading data-resume-root">
            <h3>CONTACT ME</h3>
          </div>
          
          <div className="contactList data-resume-root">
            {contactItems.length > 0 ? (
              contactItems.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <div className="contactItem data-resume-root" key={i}>
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
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="contactItem data-resume-root">
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="contactItem data-resume-root">
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="contactItem data-resume-root">
                    <span>{personalInfo.website}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <hr className="dottedLine" />

          {referencesSection && referencesSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
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

          {educationSection && educationSection.items.length > 0 && (
            <>
              <div className="sideHeading data-resume-root">
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

      <div className="content data-resume-root">
        <div className="headerBlock data-resume-root">
          <div className="name data-resume-root">
            {firstPart} <span>{lastWord}</span>
          </div>
          <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
        </div>

        {aboutText && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <h2>ABOUT ME</h2>
            </div>
            <div className="aboutText data-resume-root">{aboutText}</div>
          </div>
        )}

        {experienceSection && experienceSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
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
                  <div className="jobDesc data-resume-root">{job.bullets}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
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

        {skillsSection && skillsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
              <h2>{skillsSection.title || 'TECHNICAL SKILLS'}</h2>
            </div>
            <div className="skillsTags data-resume-root">
              {skillsSection.items.map((skill, i) => (
                <span key={i} className="skillTag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {languagesSection && languagesSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
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

        {achievementsSection && achievementsSection.items.length > 0 && (
          <div className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
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

        {otherCustomSections.map((section) => (
          <div key={section.id} className="section data-resume-root">
            <div className="sectionTitle data-resume-root">
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
          background: ${accent};
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
          background: ${accent};
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
          margin: 26px 0 16px 0;
        }

        .sideHeading h3 {
          font-size: 15px;
          letter-spacing: 1px;
          font-weight: 700;
          font-family: ${t.headingFont || 'Poppins'}, sans-serif;
          margin: 0;
          color: ${accent};
          line-height: 1.2;
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contactItem {
          font-size: 12.5px;
          line-height: 1.5;
          color: #e5e5e5;
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
          background: ${accent};
        }

        .divider {
          width: 2px;
          background: ${accent};
          flex-shrink: 0;
        }

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
          left: 10px;
          top: 15px;
          bottom: 15px;
          width: 6px;
          background: ${accent};
        }

        .name {
          font-size: 34px;
          font-weight: 800;
          color: ${t.textColor || '#2b2b2b'};
          letter-spacing: 1px;
          font-family: ${t.headingFont || 'Poppins'}, sans-serif;
        }

        .name span {
          color: ${accent};
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
          margin-bottom: 16px;
        }

        .sectionTitle h2 {
          font-size: 17px;
          letter-spacing: 1px;
          color: ${t.textColor || '#2b2b2b'};
          font-weight: 800;
          font-family: ${t.headingFont || 'Poppins'}, sans-serif;
          margin: 0;
          padding-bottom: 6px;
          border-bottom: 2px solid ${accent};
          display: inline-block;
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
          background: ${accent};
          border-radius: 3px;
        }

        .skillsTags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }

        .skillTag {
          background: ${accent}20;
          color: ${accent};
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
          content: "▸";
          position: absolute;
          left: 0;
          color: ${accent};
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
          border-color: transparent transparent ${accent} transparent;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .modern-template { flex-direction: column; }
          .sidebar { width: 100%; }
          .divider { width: 100%; height: 2px; }
          .headerBlock { margin: 0; padding-left: 20px; }
          .content { padding: 0 20px 20px; }
          .photoWrap { height: 180px; }
          .photoCircle { width: 120px; height: 120px; top: 35px; left: 20px; }
          .skills { grid-template-columns: 1fr; }
        }

        @media print {
          .modern-template { box-shadow: none; margin: 0; }
        }
      `}</style>
    </div>
  );
}