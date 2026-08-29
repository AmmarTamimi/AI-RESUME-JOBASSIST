// import React from "react";
// import type { TemplateProps } from "../../types/Content";

// export default function MinimalMarginNotesTemplate({ content, theme }: TemplateProps) {
//   const { personalInfo, sections } = content;
//   const t = theme;

//   const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
//   const referencesSection = sections.find((s) => s.type === "references");
//   const educationSection = sections.find((s) => s.type === "education");
//   const experienceSection = sections.find((s) => s.type === "experience");
//   const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
//   const aboutText = personalInfo.summary;

//   const contactItems = contactSection?.items || [];

//   return (
//     <div className="mn-template data-resume-root">
//       <header className="header">
//         <h1 className="name">{personalInfo.fullName}</h1>
//         <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
//         <div className="contactRow data-resume-root">
//           {contactItems.length > 0
//             ? contactItems.map((item, i) => {
//                 if (typeof item === "object" && item !== null && "description" in item) {
//                   return <span className="contactItem" key={i}>{item.description}</span>;
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

//       <div className="rule data-resume-root" />

//       {aboutText && (
//         <div className="marginRow data-resume-root">
//           <div className="marginLabel data-resume-root">Profile</div>
//           <div className="marginContent data-resume-root">
//             <p className="aboutText">{aboutText}</p>
//           </div>
//         </div>
//       )}

//       {experienceSection && experienceSection.items.length > 0 && (
//         <>
//           {experienceSection.items.map((job, i) => (
//             <div className="marginRow data-resume-root" key={i}>
//               <div className="marginLabel data-resume-root">
//                 {i === 0 ? (experienceSection.title || 'Experience') : ""}
//                 <div className="marginDate data-resume-root">{job.start} â€“ {job.end || "Present"}</div>
//               </div>
//               <div className="marginContent data-resume-root">
//                 <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
//                 <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
//                 {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets}</p>}
//               </div>
//             </div>
//           ))}
//         </>
//       )}

//       {educationSection && educationSection.items.length > 0 && (
//         <>
//           {educationSection.items.map((edu, i) => (
//             <div className="marginRow data-resume-root" key={i}>
//               <div className="marginLabel data-resume-root">
//                 {i === 0 ? (educationSection.title || 'Education') : ""}
//                 <div className="marginDate data-resume-root">{edu.start} â€“ {edu.end}</div>
//               </div>
//               <div className="marginContent data-resume-root">
//                 <div className="jobTitle data-resume-root">{edu.school}</div>
//                 <div className="jobSub data-resume-root">{edu.degree}</div>
//               </div>
//             </div>
//           ))}
//         </>
//       )}

//       {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
//         <div className="marginRow data-resume-root">
//           <div className="marginLabel data-resume-root">{ratedSkillsSection.title || 'Skills'}</div>
//           <div className="marginContent data-resume-root">
//             <div className="skillLine data-resume-root">
//               {ratedSkillsSection.items.map((s) => s.name).join("   Â·   ")}
//             </div>
//           </div>
//         </div>
//       )}

//       {referencesSection && referencesSection.items.length > 0 && (
//         <div className="marginRow data-resume-root">
//           <div className="marginLabel data-resume-root">{referencesSection.title || 'References'}</div>
//           <div className="marginContent data-resume-root">
//             {referencesSection.items.map((ref, i) => (
//               <div className="refItem data-resume-root" key={i}>
//                 <span className="refName">{ref.name}</span>
//                 {ref.phone && <span className="refLine"> Â· {ref.phone}</span>}
//                 {ref.email && <span className="refLine"> Â· {ref.email}</span>}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .mn-template {
//           width: 100%;
//           min-height: 100%;
//           background: ${t.backgroundColor || "#FBFAF7"};
//           color: ${t.textColor || "#33322E"};
//           font-family: ${t.bodyFont || "Inter"}, sans-serif;
//           padding: 44px 54px 50px;
//           box-sizing: border-box;
//         }

//         .header {
//           margin-bottom: 4px;
//         }

//         .name {
//           font-family: ${t.headingFont || "Fraunces"}, serif;
//           font-size: 32px;
//           font-weight: 600;
//           margin: 0;
//         }

//         .title {
//           font-size: 11px;
//           letter-spacing: 2.5px;
//           text-transform: uppercase;
//           color: ${t.accentColor || "#5B8C85"};
//           font-weight: 700;
//           margin-top: 5px;
//         }

//         .contactRow {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 4px 14px;
//           margin-top: 12px;
//         }

//         .contactItem {
//           font-size: 11px;
//           color: #6b6b6b;
//         }

//         .rule {
//           height: 1px;
//           background: #ded9cc;
//           margin: 20px 0 6px;
//         }

//         .marginRow {
//           display: grid;
//           grid-template-columns: 110px 1fr;
//           gap: 20px;
//           padding: 16px 0;
//           border-bottom: 1px solid #eeebe1;
//         }

//         .marginLabel {
//           font-size: 10.5px;
//           font-weight: 800;
//           letter-spacing: 1.5px;
//           text-transform: uppercase;
//           color: ${t.accentColor || "#5B8C85"};
//         }

//         .marginDate {
//           font-size: 10px;
//           color: #a3a09a;
//           font-weight: 400;
//           letter-spacing: 0;
//           text-transform: none;
//           margin-top: 4px;
//         }

//         .jobTitle {
//           font-size: 13px;
//           font-weight: 700;
//           color: ${t.textColor || "#33322E"};
//         }

//         .jobSub {
//           font-size: 11.5px;
//           font-style: italic;
//           color: #8a8a8a;
//           margin-top: 2px;
//         }

//         .jobDesc {
//           font-size: 12px;
//           line-height: 1.65;
//           color: #55534c;
//           margin: 6px 0 0;
//         }

//         .skillLine {
//           font-size: 12px;
//           color: #4a4943;
//           line-height: 1.8;
//         }

//         .refItem {
//           font-size: 11.5px;
//           color: #55534c;
//           margin-bottom: 6px;
//         }

//         .refName {
//           font-weight: 700;
//           color: ${t.textColor || "#33322E"};
//         }

//         @media (max-width: 650px) {
//           .marginRow { grid-template-columns: 1fr; gap: 4px; }
//         }

//         @media print {
//           .mn-template { box-shadow: none; }
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

export default function MinimalMarginNotesTemplate({ content, theme }: TemplateProps) {
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

  return (
    <div className="mn-template data-resume-root">
      <header className="header">
        <h1 className="name">{personalInfo.fullName}</h1>
        <div className="title data-resume-root">{personalInfo.title || "PROFESSIONAL"}</div>
        <div className="contactRow data-resume-root">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (isCustomItem(item)) {
                  return <span className="contactItem" key={i}>{item.description}</span>;
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

      <div className="rule data-resume-root" />

      {aboutText && (
        <div className="marginRow data-resume-root">
          <div className="marginLabel data-resume-root">Profile</div>
          <div className="marginContent data-resume-root">
            <p className="aboutText">{aboutText}</p>
          </div>
        </div>
      )}

      {experienceSection && experienceSection.items.length > 0 && (
        <>
          {experienceSection.items.map((job, i) => (
            <div className="marginRow data-resume-root" key={i}>
              <div className="marginLabel data-resume-root">
                {i === 0 ? (experienceSection.title || 'Experience') : ""}
                <div className="marginDate data-resume-root">{job.start} – {job.end || "Present"}</div>
              </div>
              <div className="marginContent data-resume-root">
                <div className="jobTitle data-resume-root">{job.role || "Position"}</div>
                <div className="jobSub data-resume-root">{job.company}{job.location ? `, ${job.location}` : ""}</div>
                {job.bullets && job.bullets.length > 0 && <p className="jobDesc">{job.bullets}</p>}
              </div>
            </div>
          ))}
        </>
      )}

      {educationSection && educationSection.items.length > 0 && (
        <>
          {educationSection.items.map((edu, i) => (
            <div className="marginRow data-resume-root" key={i}>
              <div className="marginLabel data-resume-root">
                {i === 0 ? (educationSection.title || 'Education') : ""}
                <div className="marginDate data-resume-root">{edu.start} – {edu.end}</div>
              </div>
              <div className="marginContent data-resume-root">
                <div className="jobTitle data-resume-root">{edu.school}</div>
                <div className="jobSub data-resume-root">{edu.degree}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ACHIEVEMENTS */}
      {achievementsSection && achievementsSection.items.length > 0 && (
        <>
          {achievementsSection.items.map((item, i) => (
            <div className="marginRow data-resume-root" key={i}>
              <div className="marginLabel data-resume-root">
                {i === 0 ? (achievementsSection.title || 'Achievements') : ""}
              </div>
              <div className="marginContent data-resume-root">
                <div className="jobTitle data-resume-root">
                  {isAchievementItem(item) ? item.title : String(item)}
                </div>
                {isAchievementItem(item) && item.description && (
                  <p className="jobDesc">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {/* RATED SKILLS */}
      {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
        <div className="marginRow data-resume-root">
          <div className="marginLabel data-resume-root">{ratedSkillsSection.title || 'Skills'}</div>
          <div className="marginContent data-resume-root">
            <div className="skillLine data-resume-root">
              {ratedSkillsSection.items.map((s: RatedSkillItem) => s.name).join("   ·   ")}
            </div>
          </div>
        </div>
      )}

      {/* SKILLS (Tags) */}
      {skillsSection && skillsSection.items.length > 0 && !ratedSkillsSection && (
        <div className="marginRow data-resume-root">
          <div className="marginLabel data-resume-root">{skillsSection.title || 'Technical Skills'}</div>
          <div className="marginContent data-resume-root">
            <div className="skillsTags data-resume-root">
              {skillsSection.items.map((skill: string, i) => (
                <span key={i} className="skillTag data-resume-root">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGES */}
      {languagesSection && languagesSection.items.length > 0 && (
        <div className="marginRow data-resume-root">
          <div className="marginLabel data-resume-root">{languagesSection.title || 'Languages'}</div>
          <div className="marginContent data-resume-root">
            <div className="languageLine data-resume-root">
              {languagesSection.items.map((item, i) => {
                if (isLanguageItem(item)) {
                  return (
                    <span key={i} className="languageItem">
                      {item.name}
                      {item.level && <span className="langLevel"> ({item.level})</span>}
                    </span>
                  );
                }
                return <span key={i} className="languageItem">{String(item)}</span>;
              })}
            </div>
          </div>
        </div>
      )}

      {referencesSection && referencesSection.items.length > 0 && (
        <div className="marginRow data-resume-root">
          <div className="marginLabel data-resume-root">{referencesSection.title || 'References'}</div>
          <div className="marginContent data-resume-root">
            {referencesSection.items.map((ref: ReferenceItem, i) => (
              <div className="refItem data-resume-root" key={i}>
                <span className="refName">{ref.name}</span>
                {ref.address && <span className="refLine"> · {ref.address}</span>}
                {ref.phone && <span className="refLine"> · {ref.phone}</span>}
                {ref.email && <span className="refLine"> · {ref.email}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OTHER CUSTOM SECTIONS */}
      {otherCustomSections.map((section) => (
        <div className="marginRow data-resume-root" key={section.id}>
          <div className="marginLabel data-resume-root">{section.title || 'Custom'}</div>
          <div className="marginContent data-resume-root">
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

      <style jsx>{`
        .mn-template {
          width: 100%;
          min-height: 100%;
          background: ${t.backgroundColor || "#FBFAF7"};
          color: ${t.textColor || "#33322E"};
          font-family: ${t.bodyFont || "Inter"}, sans-serif;
          padding: 44px 54px 50px;
          box-sizing: border-box;
        }

        .header {
          margin-bottom: 4px;
        }

        .name {
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 32px;
          font-weight: 600;
          margin: 0;
        }

        .title {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: ${t.accentColor || "#5B8C85"};
          font-weight: 700;
          margin-top: 5px;
        }

        .contactRow {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 14px;
          margin-top: 12px;
        }

        .contactItem {
          font-size: 11px;
          color: #6b6b6b;
        }

        .rule {
          height: 1px;
          background: #ded9cc;
          margin: 20px 0 6px;
        }

        .marginRow {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid #eeebe1;
        }

        .marginLabel {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${t.accentColor || "#5B8C85"};
        }

        .marginDate {
          font-size: 10px;
          color: #a3a09a;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          margin-top: 4px;
        }

        .jobTitle {
          font-size: 13px;
          font-weight: 700;
          color: ${t.textColor || "#33322E"};
        }

        .jobSub {
          font-size: 11.5px;
          font-style: italic;
          color: #8a8a8a;
          margin-top: 2px;
        }

        .jobDesc {
          font-size: 12px;
          line-height: 1.65;
          color: #55534c;
          margin: 6px 0 0;
        }

        .skillLine {
          font-size: 12px;
          color: #4a4943;
          line-height: 1.8;
        }

        /* SKILLS TAGS */
        .skillsTags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skillTag {
          font-size: 11px;
          color: ${t.textColor || "#33322E"};
          padding: 3px 10px;
          background: #eeebe1;
          border-radius: 12px;
        }

        /* LANGUAGES */
        .languageLine {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 16px;
          font-size: 12px;
          color: #4a4943;
        }

        .languageItem {
          display: inline;
        }

        .langLevel {
          color: #a3a09a;
          font-style: italic;
        }

        .refItem {
          font-size: 11.5px;
          color: #55534c;
          margin-bottom: 6px;
        }

        .refItem:last-child {
          margin-bottom: 0;
        }

        .refName {
          font-weight: 700;
          color: ${t.textColor || "#33322E"};
        }

        .refLine {
          color: #8a8a8a;
        }

        /* CUSTOM SECTIONS */
        .customItem {
          margin-bottom: 8px;
        }

        .customItem:last-child {
          margin-bottom: 0;
        }

        .customLabel {
          font-size: 12.5px;
          font-weight: 600;
          color: ${t.textColor || "#33322E"};
        }

        .customDesc {
          font-size: 12px;
          color: #55534c;
          line-height: 1.6;
          margin-top: 2px;
        }

        @media (max-width: 650px) {
          .marginRow { grid-template-columns: 1fr; gap: 4px; }
        }

        @media print {
          .mn-template { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}












