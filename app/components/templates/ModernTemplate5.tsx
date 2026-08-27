// import React from "react";
// import type { TemplateProps } from "../../types/Content";

// const Icon = {
//   phone: (
//     <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
//       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
//     </svg>
//   ),
//   globe: (
//     <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
//       <circle cx="12" cy="12" r="10" />
//       <line x1="2" y1="12" x2="22" y2="12" />
//       <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
//     </svg>
//   ),
//   mail: (
//     <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//       <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
//     </svg>
//   ),
//   pin: (
//     <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
//       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   ),
// };

// export default function TechTemplate({ content, theme }: TemplateProps) {
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

//   // bucket skill level into a tier tag rather than a percent bar
//   const tierFor = (level: number) => {
//     if (level >= 85) return "expert";
//     if (level >= 60) return "proficient";
//     return "familiar";
//   };

//   return (
//     <div className="tech-template data-resume-root">
//       {/* ================= TOP BAR ================= */}
//       <div className="topBar data-resume-root">
//         <div className="promptLine data-resume-root">
//           <span className="promptSymbol">&gt;</span> whoami
//         </div>
//         <div className="headerRow data-resume-root">
//           {personalInfo.photoUrl && (
//             <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
//           )}
//           <div>
//             <div className="name data-resume-root">{personalInfo.fullName}</div>
//             <div className="title data-resume-root">{personalInfo.title || "SOFTWARE ENGINEER"}</div>
//           </div>
//         </div>

//         <div className="contactRow data-resume-root">
//           {contactItems.length > 0
//             ? contactItems.map((item, i) => {
//                 if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
//                   let icon = Icon.pin;
//                   if (item.label === "phone") icon = Icon.phone;
//                   else if (item.label === "email") icon = Icon.mail;
//                   else if (item.label === "web") icon = Icon.globe;
//                   return (
//                     <span className="contactChip" key={i}>
//                       <span className="ic">{icon}</span>{item.description}
//                     </span>
//                   );
//                 }
//                 return null;
//               })
//             : (
//               <>
//                 {personalInfo.phone && <span className="contactChip"><span className="ic">{Icon.phone}</span>{personalInfo.phone}</span>}
//                 {personalInfo.email && <span className="contactChip"><span className="ic">{Icon.mail}</span>{personalInfo.email}</span>}
//                 {personalInfo.location && <span className="contactChip"><span className="ic">{Icon.pin}</span>{personalInfo.location}</span>}
//                 {personalInfo.website && <span className="contactChip"><span className="ic">{Icon.globe}</span>{personalInfo.website}</span>}
//               </>
//             )}
//         </div>
//       </div>

//       {/* ================= BODY GRID ================= */}
//       <div className="grid data-resume-root">
//         <div className="mainCol data-resume-root">
//           {aboutText && (
//             <div className="block data-resume-root">
//               <div className="blockHeader data-resume-root"><span className="hash">#</span> about</div>
//               <p className="aboutText">{aboutText}</p>
//             </div>
//           )}

//           {experienceSection && experienceSection.items.length > 0 && (
//             <div className="block data-resume-root">
//               <div className="blockHeader data-resume-root"><span className="hash">#</span> {experienceSection.title || 'experience'}</div>
//               {experienceSection.items.map((job, i) => (
//                 <div className="job data-resume-root" key={i}>
//                   <div className="jobTop data-resume-root">
//                     <span className="jobTitle">{job.role || "Position"}</span>
//                     <span className="jobDate">{job.start} â€“ {job.end || "current"}</span>
//                   </div>
//                   <div className="jobSub data-resume-root">{job.company}{job.location ? ` Â· ${job.location}` : ""}</div>
//                   {job.bullets && job.bullets.length > 0 && (
//                     <div className="jobDesc data-resume-root">{job.bullets[0]}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {referencesSection && referencesSection.items.length > 0 && (
//             <div className="block data-resume-root">
//               <div className="blockHeader data-resume-root"><span className="hash">#</span> {referencesSection.title || 'references'}</div>
//               {referencesSection.items.map((ref, i) => (
//                 <div className="refItem data-resume-root" key={i}>
//                   <span className="refName">{ref.name}</span>
//                   {ref.phone && <span className="refLine">{ref.phone}</span>}
//                   {ref.email && <span className="refLine">{ref.email}</span>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="sideCol data-resume-root">
//           {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
//             <div className="block data-resume-root">
//               <div className="blockHeader data-resume-root"><span className="hash">#</span> {ratedSkillsSection.title || 'stack'}</div>
//               <div className="tagCloud data-resume-root">
//                 {ratedSkillsSection.items.map((skill, i) => (
//                   <span className={`tag tag-${tierFor(skill.level)}`} key={i}>{skill.name}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {educationSection && educationSection.items.length > 0 && (
//             <div className="block data-resume-root">
//               <div className="blockHeader data-resume-root"><span className="hash">#</span> {educationSection.title || 'education'}</div>
//               {educationSection.items.map((edu, i) => (
//                 <div className="eduItem data-resume-root" key={i}>
//                   <span className="eduSchool">{edu.school}</span>
//                   <span className="eduDegree">{edu.degree}</span>
//                   <span className="eduDate">{edu.start} â€“ {edu.end}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .tech-template {
//           width: 100%;
//           min-height: 100%;
//           background: ${t.primaryColor || "#0D0F14"};
//           color: #d7dbe0;
//           font-family: ${t.bodyFont || "Inter"}, sans-serif;
//           padding: 40px 46px 48px;
//           box-sizing: border-box;
//         }

//         .promptLine {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 12px;
//           color: ${t.accentColor || "#39E6C5"};
//           margin-bottom: 18px;
//         }

//         .promptSymbol {
//           color: #5b6675;
//           margin-right: 6px;
//         }

//         .headerRow {
//           display: flex;
//           align-items: center;
//           gap: 18px;
//         }

//         .photo, .photoFallback {
//           width: 58px;
//           height: 58px;
//           border-radius: 8px;
//           object-fit: cover;
//           border: 1px solid ${t.accentColor || "#39E6C5"};
//         }

//         .photoFallback {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 20px;
//           color: ${t.accentColor || "#39E6C5"};
//           background: #151821;
//         }

//         .name {
//           font-family: ${t.headingFont || "Space Grotesk"}, sans-serif;
//           font-size: 28px;
//           font-weight: 700;
//           color: #f2f4f7;
//           letter-spacing: -0.3px;
//         }

//         .title {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 12px;
//           color: ${t.accentColor || "#39E6C5"};
//           margin-top: 4px;
//         }

//         .contactRow {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 10px;
//           margin-top: 20px;
//         }

//         .contactChip {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 10.5px;
//           color: #aab2bf;
//           background: #151821;
//           border: 1px solid #232833;
//           border-radius: 5px;
//           padding: 5px 10px;
//         }

//         .contactChip .ic {
//           color: ${t.accentColor || "#39E6C5"};
//           display: flex;
//         }

//         .grid {
//           display: grid;
//           grid-template-columns: 1.7fr 1fr;
//           gap: 36px;
//           margin-top: 34px;
//         }

//         .block {
//           margin-bottom: 30px;
//         }

//         .blockHeader {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 12px;
//           letter-spacing: 1px;
//           color: #f2f4f7;
//           text-transform: lowercase;
//           margin-bottom: 14px;
//           padding-bottom: 8px;
//           border-bottom: 1px solid #232833;
//         }

//         .hash {
//           color: ${t.accentColor || "#39E6C5"};
//           margin-right: 6px;
//         }

//         .aboutText {
//           font-size: 12.5px;
//           line-height: 1.85;
//           color: #aab2bf;
//           margin: 0;
//         }

//         .job {
//           margin-bottom: 20px;
//           padding-left: 14px;
//           border-left: 2px solid #232833;
//         }

//         .jobTop {
//           display: flex;
//           justify-content: space-between;
//           flex-wrap: wrap;
//           gap: 6px;
//         }

//         .jobTitle {
//           font-size: 13.5px;
//           font-weight: 700;
//           color: #f2f4f7;
//         }

//         .jobDate {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 10.5px;
//           color: #6b7484;
//         }

//         .jobSub {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 11px;
//           color: ${t.accentColor || "#39E6C5"};
//           margin: 3px 0 7px;
//         }

//         .jobDesc {
//           font-size: 12px;
//           line-height: 1.7;
//           color: #aab2bf;
//         }

//         .refItem {
//           display: flex;
//           flex-direction: column;
//           margin-bottom: 12px;
//           font-size: 11.5px;
//         }

//         .refName {
//           color: #f2f4f7;
//           font-weight: 700;
//         }

//         .refLine {
//           color: #6b7484;
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 10.5px;
//         }

//         .tagCloud {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 8px;
//         }

//         .tag {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 10.5px;
//           padding: 6px 10px;
//           border-radius: 5px;
//           background: #151821;
//           border: 1px solid #232833;
//           color: #aab2bf;
//         }

//         .tag-expert {
//           border-color: ${t.accentColor || "#39E6C5"};
//           color: ${t.accentColor || "#39E6C5"};
//         }

//         .eduItem {
//           display: flex;
//           flex-direction: column;
//           margin-bottom: 14px;
//           font-size: 11.5px;
//         }

//         .eduSchool {
//           color: #f2f4f7;
//           font-weight: 700;
//         }

//         .eduDegree {
//           color: #aab2bf;
//           margin-top: 2px;
//         }

//         .eduDate {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 10px;
//           color: #6b7484;
//           margin-top: 2px;
//         }

//         @media (max-width: 800px) {
//           .grid { grid-template-columns: 1fr; }
//           .tech-template { padding: 28px 22px; }
//         }

//         @media print {
//           .tech-template { box-shadow: none; }
//         }
//       `}</style>
//     </div>
//   );
// }

































import React from "react";
import type { TemplateProps, CustomItem, ReferenceItem, LanguageItem, AchievementItem, RatedSkillItem } from "../../types/Content";

const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 21V4h16l-4 6 4 6H4z" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
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

  const initials = personalInfo.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
                  let icon = Icon.pin;
                  if (item.label === "phone") icon = Icon.phone;
                  else if (item.label === "email") icon = Icon.mail;
                  else if (item.label === "web" || item.label === "website") icon = Icon.globe;
                  return (
                    <span className="contactChip" key={i}>
                      <span className="ic">{icon}</span>{item.description}
                    </span>
                  );
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && <span className="contactChip"><span className="ic">{Icon.phone}</span>{personalInfo.phone}</span>}
                {personalInfo.email && <span className="contactChip"><span className="ic">{Icon.mail}</span>{personalInfo.email}</span>}
                {personalInfo.location && <span className="contactChip"><span className="ic">{Icon.pin}</span>{personalInfo.location}</span>}
                {personalInfo.website && <span className="contactChip"><span className="ic">{Icon.globe}</span>{personalInfo.website}</span>}
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
                    <div className="jobDesc data-resume-root">{job.bullets[0]}</div>
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

        .photoFallback {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
          font-size: 20px;
          color: ${t.accentColor || "#39E6C5"};
          background: #151821;
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

        .contactChip .ic {
          color: ${t.accentColor || "#39E6C5"};
          display: flex;
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

        /* ACHIEVEMENTS - Main Section */
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

        /* CUSTOM SECTIONS - Main Section */
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