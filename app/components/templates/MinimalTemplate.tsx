// import React from "react";
// import type { TemplateProps } from "../../types/Content";

// // Simple SVG Icons
// const Icon = {
//   mail: (
//     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//       <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
//     </svg>
//   ),
//   phone: (
//     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
//     </svg>
//   ),
//   pin: (
//     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   ),
//   user: (
//     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   ),
//   briefcase: (
//     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
//       <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
//     </svg>
//   ),
//   cap: (
//     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
//       <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
//     </svg>
//   ),
//   chart: (
//     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M12 20v-6M18 20V4M6 20v-4" />
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//     </svg>
//   ),
// };

// export default function MinimalTemplate({ content, theme }: TemplateProps) {
//   const { personalInfo, sections } = content;
//   const t = theme;

//   // Find sections
//   const experienceSection = sections.find((s) => s.type === "experience");
//   const educationSection = sections.find((s) => s.type === "education");
//   const skillsSection = sections.find((s) => s.type === "skills");
//   const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
//   const aboutText = personalInfo.summary;

//   // Parse skills as tags if it's a string
//   const skillsTags = skillsSection?.items?.length && typeof skillsSection.items[0] === 'string'
//     ? skillsSection.items as string[]
//     : [];

//   // Use rated skills if available
//   const hasRatedSkills = ratedSkillsSection && ratedSkillsSection.items.length > 0;

//   // Get contact info from personalInfo - filtered to remove empty values
//   const contacts = [
//     personalInfo.email ? { icon: Icon.mail, label: personalInfo.email } : null,
//     personalInfo.phone ? { icon: Icon.phone, label: personalInfo.phone } : null,
//     personalInfo.location ? { icon: Icon.pin, label: personalInfo.location } : null,
//   ].filter((contact): contact is { icon: React.ReactElement; label: string } => contact !== null);

//   return (
//     <div className="minimal-template data-resume-root">
//       <div className="minimal-content data-resume-root">
//         {/* ===== HEADER ===== */}
//         <header className="minimal-header">
//           <h1 className="minimal-name">
//             {personalInfo.fullName || 'Alexandra Chen'}
//           </h1>
//           <p className="minimal-title">
//             {personalInfo.title || 'Product Designer'}
//           </p>
//           <div className="minimal-divider data-resume-root" />
//           <div className="minimal-contact data-resume-root">
//             {contacts.map((contact, i) => (
//               <span key={i} className="minimal-contact-item">
//                 <span className="minimal-contact-icon">{contact.icon}</span>
//                 {contact.label}
//               </span>
//             ))}
//           </div>
//         </header>

//         {/* ===== PROFILE / ABOUT ===== */}
//         {aboutText && (
//           <section className="minimal-section">
//             <h2 className="minimal-section-heading">Profile</h2>
//             <p className="minimal-profile-text">{aboutText}</p>
//           </section>
//         )}

//         {/* ===== EXPERIENCE ===== */}
//         {experienceSection && experienceSection.items.length > 0 && (
//           <section className="minimal-section">
//             <h2 className="minimal-section-heading">{experienceSection.title || 'Experience'}</h2>
//             {experienceSection.items.map((job, i) => (
//               <div key={i} className="minimal-experience-item data-resume-root">
//                 <h3 className="minimal-experience-role">{job.role || 'Role'}</h3>
//                 <p className="minimal-experience-company">
//                   {job.company} â€” {job.start}â€“{job.end || 'Present'}
//                 </p>
//                 {job.bullets && job.bullets.length > 0 && (
//                   <p className="minimal-experience-desc">{job.bullets[0]}</p>
//                 )}
//               </div>
//             ))}
//           </section>
//         )}

//         {/* ===== EDUCATION ===== */}
//         {educationSection && educationSection.items.length > 0 && (
//           <section className="minimal-section">
//             <h2 className="minimal-section-heading">{educationSection.title || 'Education'}</h2>
//             {educationSection.items.map((edu, i) => (
//               <div key={i} className="minimal-education-item data-resume-root">
//                 <h3 className="minimal-education-degree">{edu.degree || 'Degree'}</h3>
//                 <p className="minimal-education-school">
//                   {edu.school} â€” {edu.start}â€“{edu.end}
//                 </p>
//               </div>
//             ))}
//           </section>
//         )}

//         {/* ===== SKILLS ===== */}
//         {(hasRatedSkills || skillsTags.length > 0) && (
//           <section className="minimal-section">
//             <h2 className="minimal-section-heading">{ratedSkillsSection.title || 'Skills'}</h2>
//             {hasRatedSkills ? (
//               <div className="minimal-skills-rated data-resume-root">
//                 {ratedSkillsSection!.items.map((skill, i) => (
//                   <div key={i} className="minimal-skill-item data-resume-root">
//                     <span className="minimal-skill-name">{skill.name}</span>
//                     <div className="minimal-skill-bar data-resume-root">
//                       <div 
//                         className="minimal-skill-fill data-resume-root" 
//                         style={{ width: `${skill.level || 80}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="minimal-skills-text">
//                 {skillsTags.join(' Â· ')}
//               </p>
//             )}
//           </section>
//         )}
//       </div>

//       <style jsx>{`
//         .minimal-template {
//           width: 100%;
//           min-height: 100%;
//           background: ${t.backgroundColor || '#fdfdfd'};
//           font-family: ${t.bodyFont || 'Libre Franklin'}, sans-serif;
//           padding: 48px 32px;
//           display: flex;
//           justify-content: center;
//         }

//         .minimal-content {
//           max-width: 600px;
//           width: 100%;
//         }

//         /* ===== HEADER ===== */
//         .minimal-header {
//           margin-bottom: 40px;
//         }

//         .minimal-name {
//           font-family: ${t.headingFont || 'Cardo'}, serif;
//           font-weight: 700;
//           font-size: 42px;
//           color: ${t.textColor || '#1a1a1a'};
//           margin: 0;
//           letter-spacing: -0.5px;
//         }

//         .minimal-title {
//           font-size: 13px;
//           text-transform: uppercase;
//           letter-spacing: 0.15rem;
//           color: ${t.mutedColor || '#555'};
//           margin: 4px 0 0 0;
//           font-weight: 400;
//         }

//         .minimal-divider {
//           border-top: 1px solid ${t.primaryColor || '#1a1a1a'};
//           margin: 20px 0 16px 0;
//         }

//         .minimal-contact {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 16px 24px;
//         }

//         .minimal-contact-item {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 14px;
//           color: ${t.textColor || '#333'};
//         }

//         .minimal-contact-icon {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: ${t.accentColor || '#666'};
//         }

//         .minimal-contact-icon svg {
//           width: 14px;
//           height: 14px;
//         }

//         /* ===== SECTIONS ===== */
//         .minimal-section {
//           margin-bottom: 40px;
//         }

//         .minimal-section:last-child {
//           margin-bottom: 0;
//         }

//         .minimal-section-heading {
//           font-size: 12px;
//           text-transform: uppercase;
//           letter-spacing: 0.12rem;
//           font-weight: 600;
//           color: ${t.primaryColor || '#1a1a1a'};
//           margin: 0 0 16px 0;
//         }

//         /* ===== PROFILE ===== */
//         .minimal-profile-text {
//           font-size: 15px;
//           line-height: 1.7;
//           color: ${t.textColor || '#333'};
//           margin: 0;
//         }

//         /* ===== EXPERIENCE ===== */
//         .minimal-experience-item {
//           margin-bottom: 24px;
//         }

//         .minimal-experience-item:last-child {
//           margin-bottom: 0;
//         }

//         .minimal-experience-role {
//           font-size: 16px;
//           font-weight: 600;
//           color: ${t.primaryColor || '#1a1a1a'};
//           margin: 0;
//         }

//         .minimal-experience-company {
//           font-size: 14px;
//           color: ${t.mutedColor || '#666'};
//           margin: 4px 0 0 0;
//         }

//         .minimal-experience-desc {
//           font-size: 15px;
//           line-height: 1.6;
//           color: ${t.textColor || '#333'};
//           margin: 8px 0 0 0;
//         }

//         /* ===== EDUCATION ===== */
//         .minimal-education-item {
//           margin-bottom: 16px;
//         }

//         .minimal-education-item:last-child {
//           margin-bottom: 0;
//         }

//         .minimal-education-degree {
//           font-size: 16px;
//           font-weight: 600;
//           color: ${t.primaryColor || '#1a1a1a'};
//           margin: 0;
//         }

//         .minimal-education-school {
//           font-size: 14px;
//           color: ${t.mutedColor || '#666'};
//           margin: 4px 0 0 0;
//         }

//         /* ===== SKILLS ===== */
//         .minimal-skills-text {
//           font-size: 15px;
//           line-height: 1.7;
//           color: ${t.textColor || '#333'};
//           margin: 0;
//         }

//         .minimal-skills-rated {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .minimal-skill-item {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .minimal-skill-name {
//           font-size: 14px;
//           font-weight: 500;
//           color: ${t.textColor || '#333'};
//         }

//         .minimal-skill-bar {
//           height: 4px;
//           background: #e8e8e8;
//           border-radius: 2px;
//           overflow: hidden;
//         }

//         .minimal-skill-fill {
//           height: 100%;
//           background: ${t.accentColor || '#1a1a1a'};
//           border-radius: 2px;
//           transition: width 0.6s ease;
//         }

//         @media (max-width: 640px) {
//           .minimal-template {
//             padding: 32px 20px;
//           }

//           .minimal-name {
//             font-size: 32px;
//           }

//           .minimal-contact {
//             gap: 8px 16px;
//           }

//           .minimal-contact-item {
//             font-size: 13px;
//           }

//           .minimal-experience-role {
//             font-size: 15px;
//           }

//           .minimal-experience-desc {
//             font-size: 14px;
//           }

//           .minimal-profile-text {
//             font-size: 14px;
//           }
//         }

//         @media print {
//           .minimal-template {
//             padding: 40px 30px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
















import React from "react";
import type { TemplateProps, CustomItem, ReferenceItem, LanguageItem, AchievementItem, RatedSkillItem } from "../../types/Content";

// Simple SVG Icons
const Icon = {
  mail: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20v-6M18 20V4M6 20v-4" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 21V4h16l-4 6 4 6H4z" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
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

export default function MinimalTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  // Find sections
  const experienceSection = sections.find((s) => s.type === "experience");
  const educationSection = sections.find((s) => s.type === "education");
  const skillsSection = sections.find((s) => s.type === "skills");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const languagesSection = sections.find((s) => s.type === "languages" || s.id === "languages");
  const achievementsSection = sections.find((s) => s.type === "achievements");
  const referencesSection = sections.find((s) => s.type === "references");
  const otherCustomSections = sections.filter((s) => s.type === "custom" && s.id !== "contact");
  
  const aboutText = personalInfo.summary;

  // Parse skills as tags if it's a string
  const skillsTags = skillsSection?.items?.length && typeof skillsSection.items[0] === 'string'
    ? skillsSection.items as string[]
    : [];

  // Use rated skills if available
  const hasRatedSkills = ratedSkillsSection && ratedSkillsSection.items.length > 0;

  // Get contact info from personalInfo - filtered to remove empty values
  const contacts = [
    personalInfo.email ? { icon: Icon.mail, label: personalInfo.email } : null,
    personalInfo.phone ? { icon: Icon.phone, label: personalInfo.phone } : null,
    personalInfo.location ? { icon: Icon.pin, label: personalInfo.location } : null,
    personalInfo.website ? { icon: Icon.globe, label: personalInfo.website } : null,
  ].filter((contact): contact is { icon: React.ReactElement; label: string } => contact !== null);

  return (
    <div className="minimal-template data-resume-root">
      <div className="minimal-content data-resume-root">
        {/* ===== HEADER ===== */}
        <header className="minimal-header">
          <h1 className="minimal-name">
            {personalInfo.fullName || 'Alexandra Chen'}
          </h1>
          <p className="minimal-title">
            {personalInfo.title || 'Product Designer'}
          </p>
          <div className="minimal-divider data-resume-root" />
          <div className="minimal-contact data-resume-root">
            {contacts.map((contact, i) => (
              <span key={i} className="minimal-contact-item">
                <span className="minimal-contact-icon">{contact.icon}</span>
                {contact.label}
              </span>
            ))}
          </div>
        </header>

        {/* ===== PROFILE / ABOUT ===== */}
        {aboutText && (
          <section className="minimal-section">
            <h2 className="minimal-section-heading">Profile</h2>
            <p className="minimal-profile-text">{aboutText}</p>
          </section>
        )}

        {/* ===== EXPERIENCE ===== */}
        {experienceSection && experienceSection.items.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-section-heading">{experienceSection.title || 'Experience'}</h2>
            {experienceSection.items.map((job, i) => (
              <div key={i} className="minimal-experience-item data-resume-root">
                <h3 className="minimal-experience-role">{job.role || 'Role'}</h3>
                <p className="minimal-experience-company">
                  {job.company} — {job.start}–{job.end || 'Present'}
                </p>
                {job.bullets && job.bullets.length > 0 && (
                  <p className="minimal-experience-desc">{job.bullets[0]}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ===== ACHIEVEMENTS ===== */}
        {achievementsSection && achievementsSection.items.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-section-heading">{achievementsSection.title || 'Achievements'}</h2>
            <div className="minimal-achievements data-resume-root">
              {achievementsSection.items.map((item, i) => {
                if (isAchievementItem(item)) {
                  return (
                    <div key={i} className="minimal-achievement-item data-resume-root">
                      <h3 className="minimal-achievement-title">{item.title}</h3>
                      {item.description && (
                        <p className="minimal-achievement-desc">{item.description}</p>
                      )}
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div key={i} className="minimal-achievement-item data-resume-root">
                      <h3 className="minimal-achievement-title">{item}</h3>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </section>
        )}

        {/* ===== EDUCATION ===== */}
        {educationSection && educationSection.items.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-section-heading">{educationSection.title || 'Education'}</h2>
            {educationSection.items.map((edu, i) => (
              <div key={i} className="minimal-education-item data-resume-root">
                <h3 className="minimal-education-degree">{edu.degree || 'Degree'}</h3>
                <p className="minimal-education-school">
                  {edu.school} — {edu.start}–{edu.end}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* ===== SKILLS ===== */}
        {(hasRatedSkills || skillsTags.length > 0) && (
          <section className="minimal-section">
            <h2 className="minimal-section-heading">
              {ratedSkillsSection?.title || skillsSection?.title || 'Skills'}
            </h2>
            {hasRatedSkills ? (
              <div className="minimal-skills-rated data-resume-root">
                {ratedSkillsSection!.items.map((skill: RatedSkillItem, i) => (
                  <div key={i} className="minimal-skill-item data-resume-root">
                    <span className="minimal-skill-name">{skill.name}</span>
                    <div className="minimal-skill-bar data-resume-root">
                      <div 
                        className="minimal-skill-fill data-resume-root" 
                        style={{ width: `${skill.level || 80}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="minimal-skills-text">
                {skillsTags.join(' · ')}
              </p>
            )}
          </section>
        )}

        {/* ===== LANGUAGES ===== */}
        {languagesSection && languagesSection.items.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-section-heading">{languagesSection.title || 'Languages'}</h2>
            <div className="minimal-languages data-resume-root">
              {languagesSection.items.map((item, i) => {
                if (isLanguageItem(item)) {
                  return (
                    <div key={i} className="minimal-language-item data-resume-root">
                      <span className="minimal-language-name">{item.name}</span>
                      {item.level && <span className="minimal-language-level">{item.level}</span>}
                    </div>
                  );
                }
                return (
                  <div key={i} className="minimal-language-item data-resume-root">
                    <span className="minimal-language-name">{String(item)}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== REFERENCES ===== */}
        {referencesSection && referencesSection.items.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-section-heading">{referencesSection.title || 'References'}</h2>
            {referencesSection.items.map((ref: ReferenceItem, i) => (
              <div key={i} className="minimal-reference-item data-resume-root">
                <h3 className="minimal-reference-name">{ref.name}</h3>
                {ref.address && <p className="minimal-reference-detail">{ref.address}</p>}
                {ref.phone && <p className="minimal-reference-detail">Tel: {ref.phone}</p>}
                {ref.email && <p className="minimal-reference-detail">{ref.email}</p>}
              </div>
            ))}
          </section>
        )}

        {/* ===== OTHER CUSTOM SECTIONS ===== */}
        {otherCustomSections.map((section) => (
          <section key={section.id} className="minimal-section">
            <h2 className="minimal-section-heading">{section.title || 'Custom'}</h2>
            <div className="minimal-custom-items data-resume-root">
              {section.items.map((item, i) => {
                if (isCustomItem(item)) {
                  return (
                    <div key={i} className="minimal-custom-item data-resume-root">
                      {item.label && <h3 className="minimal-custom-label">{item.label}</h3>}
                      {item.description && <p className="minimal-custom-desc">{item.description}</p>}
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div key={i} className="minimal-custom-item data-resume-root">
                      <p className="minimal-custom-desc">{item}</p>
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
          background: ${t.backgroundColor || '#fdfdfd'};
          font-family: ${t.bodyFont || 'Libre Franklin'}, sans-serif;
          padding: 48px 32px;
          display: flex;
          justify-content: center;
        }

        .minimal-content {
          max-width: 600px;
          width: 100%;
        }

        /* ===== HEADER ===== */
        .minimal-header {
          margin-bottom: 40px;
        }

        .minimal-name {
          font-family: ${t.headingFont || 'Cardo'}, serif;
          font-weight: 700;
          font-size: 42px;
          color: ${t.textColor || '#1a1a1a'};
          margin: 0;
          letter-spacing: -0.5px;
        }

        .minimal-title {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15rem;
          color: ${t.mutedColor || '#555'};
          margin: 4px 0 0 0;
          font-weight: 400;
        }

        .minimal-divider {
          border-top: 1px solid ${t.primaryColor || '#1a1a1a'};
          margin: 20px 0 16px 0;
        }

        .minimal-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 24px;
        }

        .minimal-contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: ${t.textColor || '#333'};
        }

        .minimal-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${t.accentColor || '#666'};
        }

        .minimal-contact-icon svg {
          width: 14px;
          height: 14px;
        }

        /* ===== SECTIONS ===== */
        .minimal-section {
          margin-bottom: 40px;
        }

        .minimal-section:last-child {
          margin-bottom: 0;
        }

        .minimal-section-heading {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12rem;
          font-weight: 600;
          color: ${t.primaryColor || '#1a1a1a'};
          margin: 0 0 16px 0;
        }

        /* ===== PROFILE ===== */
        .minimal-profile-text {
          font-size: 15px;
          line-height: 1.7;
          color: ${t.textColor || '#333'};
          margin: 0;
        }

        /* ===== EXPERIENCE ===== */
        .minimal-experience-item {
          margin-bottom: 24px;
        }

        .minimal-experience-item:last-child {
          margin-bottom: 0;
        }

        .minimal-experience-role {
          font-size: 16px;
          font-weight: 600;
          color: ${t.primaryColor || '#1a1a1a'};
          margin: 0;
        }

        .minimal-experience-company {
          font-size: 14px;
          color: ${t.mutedColor || '#666'};
          margin: 4px 0 0 0;
        }

        .minimal-experience-desc {
          font-size: 15px;
          line-height: 1.6;
          color: ${t.textColor || '#333'};
          margin: 8px 0 0 0;
        }

        /* ===== ACHIEVEMENTS ===== */
        .minimal-achievements {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .minimal-achievement-item {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || '#1a1a1a'};
        }

        .minimal-achievement-title {
          font-size: 15px;
          font-weight: 600;
          color: ${t.primaryColor || '#1a1a1a'};
          margin: 0;
        }

        .minimal-achievement-desc {
          font-size: 14px;
          color: ${t.textColor || '#333'};
          line-height: 1.6;
          margin: 4px 0 0 0;
        }

        /* ===== EDUCATION ===== */
        .minimal-education-item {
          margin-bottom: 16px;
        }

        .minimal-education-item:last-child {
          margin-bottom: 0;
        }

        .minimal-education-degree {
          font-size: 16px;
          font-weight: 600;
          color: ${t.primaryColor || '#1a1a1a'};
          margin: 0;
        }

        .minimal-education-school {
          font-size: 14px;
          color: ${t.mutedColor || '#666'};
          margin: 4px 0 0 0;
        }

        /* ===== SKILLS ===== */
        .minimal-skills-text {
          font-size: 15px;
          line-height: 1.7;
          color: ${t.textColor || '#333'};
          margin: 0;
        }

        .minimal-skills-rated {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .minimal-skill-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .minimal-skill-name {
          font-size: 14px;
          font-weight: 500;
          color: ${t.textColor || '#333'};
        }

        .minimal-skill-bar {
          height: 4px;
          background: #e8e8e8;
          border-radius: 2px;
          overflow: hidden;
        }

        .minimal-skill-fill {
          height: 100%;
          background: ${t.accentColor || '#1a1a1a'};
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        /* ===== LANGUAGES ===== */
        .minimal-languages {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .minimal-language-item {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          color: ${t.textColor || '#333'};
        }

        .minimal-language-name {
          font-weight: 500;
        }

        .minimal-language-level {
          color: ${t.mutedColor || '#666'};
          font-style: italic;
          font-size: 14px;
        }

        /* ===== REFERENCES ===== */
        .minimal-reference-item {
          margin-bottom: 16px;
        }

        .minimal-reference-item:last-child {
          margin-bottom: 0;
        }

        .minimal-reference-name {
          font-size: 15px;
          font-weight: 600;
          color: ${t.primaryColor || '#1a1a1a'};
          margin: 0;
        }

        .minimal-reference-detail {
          font-size: 14px;
          color: ${t.mutedColor || '#666'};
          margin: 2px 0 0 0;
        }

        /* ===== CUSTOM SECTIONS ===== */
        .minimal-custom-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .minimal-custom-item {
          padding-left: 14px;
          border-left: 2px solid ${t.accentColor || '#1a1a1a'};
        }

        .minimal-custom-label {
          font-size: 15px;
          font-weight: 600;
          color: ${t.primaryColor || '#1a1a1a'};
          margin: 0;
        }

        .minimal-custom-desc {
          font-size: 14px;
          color: ${t.textColor || '#333'};
          line-height: 1.6;
          margin: 4px 0 0 0;
        }

        @media (max-width: 640px) {
          .minimal-template {
            padding: 32px 20px;
          }

          .minimal-name {
            font-size: 32px;
          }

          .minimal-contact {
            gap: 8px 16px;
          }

          .minimal-contact-item {
            font-size: 13px;
          }

          .minimal-experience-role {
            font-size: 15px;
          }

          .minimal-experience-desc {
            font-size: 14px;
          }

          .minimal-profile-text {
            font-size: 14px;
          }
        }

        @media print {
          .minimal-template {
            padding: 40px 30px;
          }
        }
      `}</style>
    </div>
  );
}