// import React from "react";
// import type { TemplateProps } from "../../types/Content";

// export default function MinimalTimelineTemplate({ content, theme }: TemplateProps) {
//   const { personalInfo, sections } = content;
//   const t = theme;

//   const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
//   const referencesSection = sections.find((s) => s.type === "references");
//   const educationSection = sections.find((s) => s.type === "education");
//   const experienceSection = sections.find((s) => s.type === "experience");
//   const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
//   const aboutText = personalInfo.summary;

//   const contactItems = contactSection?.items || [];

//   const initials = personalInfo.fullName
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <div className="mt-template data-resume-root">
//       {/* ================= HEADER ================= */}
//       <header className="header">
//         {personalInfo.photoUrl ? (
//           <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
//         ) : (
//           <div className="photoFallback data-resume-root">{initials || "U"}</div>
//         )}
//         <h1 className="name">{personalInfo.fullName}</h1>
//         <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>

//         <div className="contactRow data-resume-root">
//           {contactItems.length > 0
//             ? contactItems.map((item, i) => {
//                 if (typeof item === "object" && item !== null && "description" in item) {
//                   return (
//                     <span className="contactItem" key={i}>
//                       {item.description}
//                     </span>
//                   );
//                 }
//                 return null;
//               })
//             : (
//               <>
//                 {personalInfo.phone && <span className="contactItem">{personalInfo.phone}</span>}
//                 {personalInfo.email && <span className="contactItem">{personalInfo.email}</span>}
//                 {personalInfo.location && <span className="contactItem">{personalInfo.location}</span>}
//                 {personalInfo.website && <span className="contactItem">{personalInfo.website}</span>}
//               </>
//             )}
//         </div>
//       </header>

//       {/* ================= ABOUT ================= */}
//       {aboutText && (
//         <div className="aboutBlock data-resume-root">
//           <p className="aboutText">{aboutText}</p>
//         </div>
//       )}

//       {/* ================= TIMELINE ================= */}
//       {experienceSection && experienceSection.items.length > 0 && (
//         <div className="section data-resume-root">
//           <h2 className="sectionLabel centered">{experienceSection.title || 'Experience'}</h2>
//           <div className="timeline data-resume-root">
//             {experienceSection.items.map((job, i) => {
//               const isLeft = i % 2 === 0;
//               return (
//                 <div className="timelineRow data-resume-root" key={i}>
//                   <div className={`timelineCard ${isLeft ? "left" : "leftEmpty"}`}>
//                     {isLeft && (
//                       <>
//                         <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
//                         <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
//                         <div className="jobDate data-resume-root">{job.start} â€“ {job.end || "Present"}</div>
//                         {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets[0]}</p>}
//                       </>
//                     )}
//                   </div>
//                   <div className="timelineNode data-resume-root">
//                     <span className="nodeDot" />
//                   </div>
//                   <div className={`timelineCard ${!isLeft ? "right" : "rightEmpty"}`}>
//                     {!isLeft && (
//                       <>
//                         <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
//                         <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
//                         <div className="jobDate data-resume-root">{job.start} â€“ {job.end || "Present"}</div>
//                         {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets[0]}</p>}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* ================= FOOTER GRID ================= */}
//       <div className="footerGrid data-resume-root">
//         {educationSection && educationSection.items.length > 0 && (
//           <div className="section footerCol data-resume-root">
//             <h2 className="sectionLabel">{educationSection.title || 'Education'}</h2>
//             {educationSection.items.map((edu, i) => (
//               <div className="eduItem data-resume-root" key={i}>
//                 <div className="eduTop data-resume-root">
//                   <span className="eduSchool">{edu.school}</span>
//                   <span className="eduDate">{edu.start} â€“ {edu.end}</span>
//                 </div>
//                 <div className="eduDegree data-resume-root">{edu.degree}</div>
//               </div>
//             ))}
//           </div>
//         )}

//         {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
//           <div className="section footerCol data-resume-root">
//             <h2 className="sectionLabel">{ratedSkillsSection.title || 'Skills'}</h2>
//             <div className="skillsGrid data-resume-root">
//               {ratedSkillsSection.items.map((skill, i) => (
//                 <div className="skillRow data-resume-root" key={i}>
//                   <div className="skillTop data-resume-root">
//                     <span className="skillName">{skill.name}</span>
//                     <span className="skillPct">{skill.level}%</span>
//                   </div>
//                   <div className="skillBar data-resume-root">
//                     <div className="skillFill data-resume-root" style={{ width: `${skill.level}%` }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {referencesSection && referencesSection.items.length > 0 && (
//           <div className="section footerCol data-resume-root">
//             <h2 className="sectionLabel">{referencesSection.title || 'References'}</h2>
//             {referencesSection.items.map((ref, i) => (
//               <div className="refItem data-resume-root" key={i}>
//                 <div className="refName data-resume-root">{ref.name}</div>
//                 {ref.phone && <div className="refLine data-resume-root">{ref.phone}</div>}
//                 {ref.email && <div className="refLine data-resume-root">{ref.email}</div>}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .mt-template {
//           width: 100%;
//           min-height: 100%;
//           background: ${t.backgroundColor || "#FCFCFA"};
//           color: ${t.textColor || "#1c1c1c"};
//           font-family: ${t.bodyFont || "Inter"}, sans-serif;
//           padding: 46px 56px 50px;
//           box-sizing: border-box;
//         }

//         .header {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           text-align: center;
//         }

//         .photo, .photoFallback {
//           width: 68px;
//           height: 68px;
//           border-radius: 50%;
//           object-fit: cover;
//           margin-bottom: 14px;
//         }

//         .photoFallback {
//           background: ${t.textColor || "#1c1c1c"};
//           color: #fff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: ${t.headingFont || "Fraunces"}, serif;
//           font-size: 24px;
//           font-weight: 600;
//         }

//         .name {
//           font-family: ${t.headingFont || "Fraunces"}, serif;
//           font-size: 34px;
//           font-weight: 500;
//           margin: 0;
//         }

//         .title {
//           font-size: 11px;
//           letter-spacing: 3px;
//           text-transform: uppercase;
//           color: ${t.accentColor || "#B8552F"};
//           font-weight: 600;
//           margin-top: 6px;
//         }

//         .contactRow {
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: center;
//           gap: 6px 16px;
//           margin-top: 16px;
//         }

//         .contactItem {
//           font-size: 11.5px;
//           color: #666;
//         }

//         .contactItem:not(:last-child)::after {
//           content: "Â·";
//           margin-left: 16px;
//           color: #bbb;
//         }

//         .aboutBlock {
//           max-width: 560px;
//           margin: 26px auto 0;
//           text-align: center;
//         }

//         .aboutText {
//           font-size: 13px;
//           line-height: 1.85;
//           color: #4a4a4a;
//           margin: 0;
//         }

//         .section {
//           margin-top: 36px;
//         }

//         .sectionLabel {
//           font-family: ${t.headingFont || "Fraunces"}, serif;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 3px;
//           text-transform: uppercase;
//           color: ${t.accentColor || "#B8552F"};
//           margin: 0 0 22px;
//         }

//         .sectionLabel.centered {
//           text-align: center;
//         }

//         .timeline {
//           position: relative;
//         }

//         .timeline::before {
//           content: "";
//           position: absolute;
//           left: 50%;
//           top: 0;
//           bottom: 0;
//           width: 2px;
//           background: #e4e1d8;
//           transform: translateX(-50%);
//         }

//         .timelineRow {
//           display: grid;
//           grid-template-columns: 1fr 40px 1fr;
//           align-items: start;
//           margin-bottom: 22px;
//         }

//         .timelineCard.left {
//           text-align: right;
//           padding-right: 26px;
//         }

//         .timelineCard.right {
//           text-align: left;
//           padding-left: 26px;
//         }

//         .timelineNode {
//           display: flex;
//           justify-content: center;
//           padding-top: 4px;
//         }

//         .nodeDot {
//           width: 11px;
//           height: 11px;
//           border-radius: 50%;
//           background: ${t.accentColor || "#B8552F"};
//           border: 3px solid ${t.backgroundColor || "#FCFCFA"};
//           box-shadow: 0 0 0 1.5px ${t.accentColor || "#B8552F"};
//           display: block;
//         }

//         .jobTitle {
//           font-size: 13.5px;
//           font-weight: 700;
//           color: ${t.textColor || "#1c1c1c"};
//         }

//         .jobSub {
//           font-size: 11.5px;
//           font-style: italic;
//           color: #8a8a8a;
//           margin-top: 2px;
//         }

//         .jobDate {
//           font-size: 10.5px;
//           color: #a3a3a3;
//           margin-top: 2px;
//         }

//         .jobDesc {
//           font-size: 12px;
//           line-height: 1.65;
//           color: #5c5c5c;
//           margin: 6px 0 0;
//         }

//         .footerGrid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 30px;
//           margin-top: 10px;
//         }

//         .footerCol {
//           margin-top: 26px;
//         }

//         .eduItem {
//           margin-bottom: 14px;
//         }

//         .eduTop {
//           display: flex;
//           justify-content: space-between;
//           gap: 6px;
//         }

//         .eduSchool {
//           font-size: 12.5px;
//           font-weight: 700;
//         }

//         .eduDate {
//           font-size: 10px;
//           color: #a3a3a3;
//         }

//         .eduDegree {
//           font-size: 11.5px;
//           color: #6b6b6b;
//           margin-top: 2px;
//         }

//         .skillsGrid {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .skillTop {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 4px;
//         }

//         .skillName {
//           font-size: 11.5px;
//           font-weight: 600;
//         }

//         .skillPct {
//           font-size: 10px;
//           color: #a3a3a3;
//         }

//         .skillBar {
//           height: 3px;
//           background: #e9e6dc;
//         }

//         .skillFill {
//           height: 100%;
//           background: ${t.accentColor || "#B8552F"};
//         }

//         .refItem {
//           margin-bottom: 12px;
//         }

//         .refName {
//           font-size: 12.5px;
//           font-weight: 700;
//         }

//         .refLine {
//           font-size: 11px;
//           color: #6b6b6b;
//           margin-top: 2px;
//         }

//         @media (max-width: 750px) {
//           .footerGrid { grid-template-columns: 1fr; }
//           .timelineRow { grid-template-columns: 1fr; }
//           .timelineCard.left, .timelineCard.right { text-align: left; padding: 0; }
//           .timelineNode { display: none; }
//         }

//         @media print {
//           .mt-template { box-shadow: none; }
//         }
//       `}</style>
//     </div>
//   );
// }



































import React from "react";
import type { 
  TemplateProps, 
  CustomItem, 
  ReferenceItem, 
  LanguageItem, 
  AchievementItem, 
  RatedSkillItem 
} from "../../types/Content";

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

export default function MinimalTimelineTemplate({ content, theme }: TemplateProps) {
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
    <div className="mt-template data-resume-root">
      {/* ================= HEADER ================= */}
      <header className="header">
        {personalInfo.photoUrl ? (
          <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
        ) : (
          <div className="photoFallback data-resume-root">{initials || "U"}</div>
        )}
        <h1 className="name">{personalInfo.fullName}</h1>
        <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>

        <div className="contactRow data-resume-root">
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
                {personalInfo.phone && <span className="contactItem">{personalInfo.phone}</span>}
                {personalInfo.email && <span className="contactItem">{personalInfo.email}</span>}
                {personalInfo.location && <span className="contactItem">{personalInfo.location}</span>}
                {personalInfo.website && <span className="contactItem">{personalInfo.website}</span>}
              </>
            )}
        </div>
      </header>

      {/* ================= ABOUT ================= */}
      {aboutText && (
        <div className="aboutBlock data-resume-root">
          <p className="aboutText">{aboutText}</p>
        </div>
      )}

      {/* ================= TIMELINE ================= */}
      {experienceSection && experienceSection.items.length > 0 && (
        <div className="section data-resume-root">
          <h2 className="sectionLabel centered">{experienceSection.title || 'Experience'}</h2>
          <div className="timeline data-resume-root">
            {experienceSection.items.map((job, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div className="timelineRow data-resume-root" key={i}>
                  <div className={`timelineCard ${isLeft ? "left" : "leftEmpty"}`}>
                    {isLeft && (
                      <>
                        <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
                        <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                        <div className="jobDate data-resume-root">{job.start} – {job.end || "Present"}</div>
                        {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets[0]}</p>}
                      </>
                    )}
                  </div>
                  <div className="timelineNode data-resume-root">
                    <span className="nodeDot" />
                  </div>
                  <div className={`timelineCard ${!isLeft ? "right" : "rightEmpty"}`}>
                    {!isLeft && (
                      <>
                        <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
                        <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                        <div className="jobDate data-resume-root">{job.start} – {job.end || "Present"}</div>
                        {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets[0]}</p>}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= ACHIEVEMENTS ================= */}
      {achievementsSection && achievementsSection.items.length > 0 && (
        <div className="section data-resume-root">
          <h2 className="sectionLabel centered">{achievementsSection.title || 'Achievements'}</h2>
          <div className="achievementsGrid data-resume-root">
            {achievementsSection.items.map((item, i) => {
              if (isAchievementItem(item)) {
                return (
                  <div className="achievementItem data-resume-root" key={i}>
                    <div className="achievementTitle">{item.title}</div>
                    {item.description && (
                      <div className="achievementDesc">{item.description}</div>
                    )}
                  </div>
                );
              }
              if (typeof item === 'string') {
                return (
                  <div className="achievementItem data-resume-root" key={i}>
                    <div className="achievementTitle">{item}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {/* ================= FOOTER GRID ================= */}
      <div className="footerGrid data-resume-root">
        {educationSection && educationSection.items.length > 0 && (
          <div className="section footerCol data-resume-root">
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
          </div>
        )}

        {/* RATED SKILLS */}
        {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
          <div className="section footerCol data-resume-root">
            <h2 className="sectionLabel">{ratedSkillsSection.title || 'Skills'}</h2>
            <div className="skillsGrid data-resume-root">
              {ratedSkillsSection.items.map((skill: RatedSkillItem, i) => (
                <div className="skillRow data-resume-root" key={i}>
                  <div className="skillTop data-resume-root">
                    <span className="skillName">{skill.name}</span>
                    <span className="skillPct">{skill.level || 50}%</span>
                  </div>
                  <div className="skillBar data-resume-root">
                    <div className="skillFill data-resume-root" style={{ width: `${skill.level || 50}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS (Tags) */}
        {skillsSection && skillsSection.items.length > 0 && !ratedSkillsSection && (
          <div className="section footerCol data-resume-root">
            <h2 className="sectionLabel">{skillsSection.title || 'Technical Skills'}</h2>
            <div className="skillsTags data-resume-root">
              {skillsSection.items.map((skill: string, i) => (
                <span key={i} className="skillTag data-resume-root">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {languagesSection && languagesSection.items.length > 0 && (
          <div className="section footerCol data-resume-root">
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
          </div>
        )}

        {referencesSection && referencesSection.items.length > 0 && (
          <div className="section footerCol data-resume-root">
            <h2 className="sectionLabel">{referencesSection.title || 'References'}</h2>
            {referencesSection.items.map((ref: ReferenceItem, i) => (
              <div className="refItem data-resume-root" key={i}>
                <div className="refName data-resume-root">{ref.name}</div>
                {ref.address && <div className="refLine data-resume-root">{ref.address}</div>}
                {ref.phone && <div className="refLine data-resume-root">{ref.phone}</div>}
                {ref.email && <div className="refLine data-resume-root">{ref.email}</div>}
              </div>
            ))}
          </div>
        )}

        {/* OTHER CUSTOM SECTIONS */}
        {otherCustomSections.map((section) => (
          <div className="section footerCol data-resume-root" key={section.id}>
            <h2 className="sectionLabel">{section.title || 'Custom'}</h2>
            <div className="customItems data-resume-root">
              {section.items.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <div key={i} className="customItem data-resume-root">
                      {item.label && <div className="customLabel">{item.label}</div>}
                      {item.description && <div className="customDesc">{item.description}</div>}
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div key={i} className="customItem data-resume-root">
                      <div className="customDesc">{item}</div>
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
        .mt-template {
          width: 100%;
          min-height: 100%;
          background: ${t.backgroundColor || "#FCFCFA"};
          color: ${t.textColor || "#1c1c1c"};
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
          padding: 46px 56px 50px;
          box-sizing: border-box;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .photo, .photoFallback {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 14px;
        }

        .photoFallback {
          background: ${t.textColor || "#1c1c1c"};
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 24px;
          font-weight: 600;
        }

        .name {
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 34px;
          font-weight: 500;
          margin: 0;
        }

        .title {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${t.accentColor || "#B8552F"};
          font-weight: 600;
          margin-top: 6px;
        }

        .contactRow {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px 16px;
          margin-top: 16px;
        }

        .contactItem {
          font-size: 11.5px;
          color: #666;
        }

        .contactItem:not(:last-child)::after {
          content: "·";
          margin-left: 16px;
          color: #bbb;
        }

        .aboutBlock {
          max-width: 560px;
          margin: 26px auto 0;
          text-align: center;
        }

        .aboutText {
          font-size: 13px;
          line-height: 1.85;
          color: #4a4a4a;
          margin: 0;
        }

        .section {
          margin-top: 36px;
        }

        .sectionLabel {
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${t.accentColor || "#B8552F"};
          margin: 0 0 22px;
        }

        .sectionLabel.centered {
          text-align: center;
        }

        .timeline {
          position: relative;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e4e1d8;
          transform: translateX(-50%);
        }

        .timelineRow {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: start;
          margin-bottom: 22px;
        }

        .timelineCard.left {
          text-align: right;
          padding-right: 26px;
        }

        .timelineCard.right {
          text-align: left;
          padding-left: 26px;
        }

        .timelineNode {
          display: flex;
          justify-content: center;
          padding-top: 4px;
        }

        .nodeDot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: ${t.accentColor || "#B8552F"};
          border: 3px solid ${t.backgroundColor || "#FCFCFA"};
          box-shadow: 0 0 0 1.5px ${t.accentColor || "#B8552F"};
          display: block;
        }

        .jobTitle {
          font-size: 13.5px;
          font-weight: 700;
          color: ${t.textColor || "#1c1c1c"};
        }

        .jobSub {
          font-size: 11.5px;
          font-style: italic;
          color: #8a8a8a;
          margin-top: 2px;
        }

        .jobDate {
          font-size: 10.5px;
          color: #a3a3a3;
          margin-top: 2px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #5c5c5c;
          margin: 6px 0 0;
        }

        /* ACHIEVEMENTS */
        .achievementsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 30px;
          max-width: 700px;
          margin: 0 auto;
        }

        .achievementItem {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || "#B8552F"};
        }

        .achievementTitle {
          font-size: 13px;
          font-weight: 600;
          color: ${t.textColor || "#1c1c1c"};
        }

        .achievementDesc {
          font-size: 11.5px;
          color: #5c5c5c;
          line-height: 1.6;
          margin-top: 2px;
        }

        .footerGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 10px;
        }

        .footerCol {
          margin-top: 26px;
        }

        .eduItem {
          margin-bottom: 14px;
        }

        .eduTop {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }

        .eduSchool {
          font-size: 12.5px;
          font-weight: 700;
        }

        .eduDate {
          font-size: 10px;
          color: #a3a3a3;
        }

        .eduDegree {
          font-size: 11.5px;
          color: #6b6b6b;
          margin-top: 2px;
        }

        .skillsGrid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skillTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .skillName {
          font-size: 11.5px;
          font-weight: 600;
        }

        .skillPct {
          font-size: 10px;
          color: #a3a3a3;
        }

        .skillBar {
          height: 3px;
          background: #e9e6dc;
        }

        .skillFill {
          height: 100%;
          background: ${t.accentColor || "#B8552F"};
        }

        /* SKILLS TAGS */
        .skillsTags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skillTag {
          font-size: 11px;
          color: ${t.textColor || "#1c1c1c"};
          padding: 4px 12px;
          background: #e9e6dc;
          border-radius: 12px;
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
          font-size: 12px;
          color: ${t.textColor || "#1c1c1c"};
        }

        .langName {
          font-weight: 500;
        }

        .langLevel {
          color: #8a8a8a;
          font-style: italic;
        }

        .refItem {
          margin-bottom: 12px;
        }

        .refName {
          font-size: 12.5px;
          font-weight: 700;
        }

        .refLine {
          font-size: 11px;
          color: #6b6b6b;
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
          border-left: 2px solid ${t.accentColor || "#B8552F"};
        }

        .customLabel {
          font-size: 12.5px;
          font-weight: 600;
          color: ${t.textColor || "#1c1c1c"};
        }

        .customDesc {
          font-size: 11.5px;
          color: #5c5c5c;
          line-height: 1.6;
          margin-top: 2px;
        }

        @media (max-width: 750px) {
          .footerGrid { 
            grid-template-columns: 1fr; 
          }
          .timelineRow { 
            grid-template-columns: 1fr; 
          }
          .timelineCard.left, .timelineCard.right { 
            text-align: left; 
            padding: 0; 
          }
          .timelineNode { 
            display: none; 
          }
          .achievementsGrid {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          .mt-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}