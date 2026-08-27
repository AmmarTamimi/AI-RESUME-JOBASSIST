// import React from "react";
// import type { TemplateProps } from "../../types/Content";

// const phoneIcon = (
//   <svg
//     width="10"
//     height="10"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );

// const mailIcon = (
//   <svg
//     width="10"
//     height="10"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <rect x="2" y="4" width="20" height="16" rx="2" />
//     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//   </svg>
// );

// const locationIcon = (
//   <svg
//     width="10"
//     height="10"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );

// const globeIcon = (
//   <svg
//     width="10"
//     height="10"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <path d="M2 12h20" />
//     <path d="M12 2a15.3 15.3 0 0 1 0 20" />
//     <path d="M12 2a15.3 15.3 0 0 0 0 20" />
//   </svg>
// );

// function record(value: unknown): Record<string, any> {
//   if (typeof value === "object" && value !== null) {
//     return value as Record<string, any>;
//   }

//   return {};
// }

// const Icon = {
//   phone: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
//     </svg>
//   ),
//   globe: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <line x1="2" y1="12" x2="22" y2="12" />
//       <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
//     </svg>
//   ),
//   mail: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//       <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
//     </svg>
//   ),
//   pin: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   ),
//   person: (
//     <svg
//       viewBox="0 0 24 24"
//       width="16"
//       height="16"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   ),
//   cap: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
//       <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
//     </svg>
//   ),
//   users: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M23 21v-2a4 4 0 00-3-3.87" />
//       <path d="M16 3.13a4 4 0 010 7.75" />
//     </svg>
//   ),
//   info: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <line x1="12" y1="16" x2="12" y2="12" />
//       <line x1="12" y1="8" x2="12.01" y2="8" />
//     </svg>
//   ),
//   briefcase: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
//       <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
//     </svg>
//   ),
//   chart: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M12 20v-6M18 20V4M6 20v-4" />
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//     </svg>
//   ),
//   award: (
//     <svg
//       viewBox="0 0 24 24"
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <circle cx="12" cy="8" r="6" />
//       <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
//     </svg>
//   ),
// };

// function value(object: unknown, key: string): string {
//   const v = record(object)[key];

//   if (v === undefined || v === null) {
//     return "";
//   }

//   return String(v);
// }

// function getSection(sections: any[], type: string) {
//   return sections.find((section) => section.type === type);
// }

// function formatDate(start?: string, end?: string) {
//   if (start && end) {
//     return `${start} - ${end}`;
//   }

//   if (start) {
//     return `${start} - Present`;
//   }

//   return end || "";
// }

// export default function ModernTemplate3({ content, theme }: TemplateProps) {
//   const { personalInfo, sections } = content;

//   const contactSection = sections.find(
//     (s) => s.type === "custom" && s.id === "contact",
//   );

//   const contactItems = contactSection?.items || [];

//   const education = getSection(sections, "education");

//   const experience = getSection(sections, "experience");

//   const skills = sections.find(
//     (section) => section.type === "skills" || section.type === "ratedSkills",
//   );

//   const languages = sections.find(
//     (section) => section.type === "languages" || section.id === "languages",
//   );

//   const achievement = sections.find(
//     (section) => section.type === "achievements",
//   );

//   const fullName = personalInfo.fullName?.trim() || "JONATHAN PATTERSON";

//   const nameParts = fullName.split(/\s+/);

//   const firstName =
//     nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : nameParts[0];

//   const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

//   const initials = fullName
//     .split(/\s+/)
//     .map((name) => name.charAt(0))
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   const primary = theme.primaryColor || "#777674";

//   const accent = theme.accentColor || "#7B2CFF";

//   const text = theme.textColor || "#444444";

//   return (
//     <div
//       className="modern3 data-resume-root"
//       style={
//         {
//           "--m3-primary": primary,
//           "--m3-accent": accent,
//           "--m3-text": text,
//         } as React.CSSProperties
//       }
//     >
//       {/* ======================================================
//           HEADER
//       ======================================================= */}

//       <div className="m3-header data-resume-root">
//         <div className="m3-name data-resume-root">
//           <div className="m3-first-name data-resume-root">{firstName}</div>

//           {lastName && <div className="m3-last-name data-resume-root">{lastName}</div>}
//         </div>

//         <div className="m3-title data-resume-root">{personalInfo.title || "Art Director"}</div>
//       </div>

//       {/* ======================================================
//           LEFT SIDEBAR
//       ======================================================= */}

//       <aside className="m3-sidebar">
//         {/* PHOTO */}

//         {personalInfo.photoUrl && (
//           <div className="m3-photo data-resume-root">
//             <div className="m3-photo-inner data-resume-root">
//               <img
//                 src={personalInfo.photoUrl}
//                 alt={personalInfo.fullName || "Profile"}
//               />
//             </div>
//           </div>
//         )}

//         {/* EDUCATION */}

//         {education?.items?.length > 0 && (
//           <SidebarSection title={education.title || 'EDUCATION'}>
//             {education.items.map((item: any, index: number) => {
//               const edu = record(item);

//               return (
//                 <div className="m3-education data-resume-root" key={index}>
//                   <div className="m3-edu-date data-resume-root">
//                     {formatDate(value(edu, "start"), value(edu, "end"))}
//                   </div>

//                   <div className="m3-edu-degree data-resume-root">{value(edu, "degree")}</div>

//                   <div className="m3-edu-school data-resume-root">{value(edu, "school")}</div>

//                   {value(edu, "description") && (
//                     <div className="m3-edu-description data-resume-root">
//                       â€¢ {value(edu, "description")}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </SidebarSection>
//         )}

//         {/* SKILLS */}

//         {(skills?.items ?? []).length > 0 && (
//           <SidebarSection title={skills?.title || 'SKILLS'}>
//             <ul className="m3-bullet-list">
//               {skills?.items.map((item: any, index: number) => {
//                 const skill = record(item);

//                 const name = value(skill, "name") || value(skill, "label");

//                 return <li key={index}>{name}</li>;
//               })}
//             </ul>
//           </SidebarSection>
//         )}

//         {/* LANGUAGES */}

//         {(languages?.items ?? []).length > 0 && (
//           <SidebarSection title={languages?.title || 'LANGUAGES'}>
//             <ul className="m3-bullet-list">
//               {languages?.items.map((item: any, index: number) => {
//                 const language = record(item);

//                 const name =
//                   value(language, "name") || value(language, "label");

//                 const level = value(language, "level");

//                 return (
//                   <li key={index}>
//                     {name}
//                     {level ? ` (${level})` : ""}
//                   </li>
//                 );
//               })}
//             </ul>
//           </SidebarSection>
//         )}

//         {/* CONTACT */}

//         {/* CONTACT */}

//         <SidebarSection title="CONTACT">
//           <div className="m3-contact data-resume-root">
//             {contactItems.map((item, i) => {
//               if (
//                 typeof item === "object" &&
//                 item !== null &&
//                 "label" in item &&
//                 "description" in item
//               ) {
//                 let icon = Icon.pin;
//                 if (item.label === "phone") icon = Icon.phone;
//                 else if (item.label === "email") icon = Icon.mail;
//                 else if (item.label === "web") icon = Icon.globe;

//                 return (
//                   <div className="m3-contact-row data-resume-root" key={i}>
//                     <span className="m3-contact-icon">{icon}</span>
//                     <span className="m3-contact-value">{item.description}</span>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>
//         </SidebarSection>
//       </aside>






      




//       {/* ======================================================
//           MAIN
//       ======================================================= */}

//       <main className="m3-main">
//         {/* PROFILE INFO */}

//         {personalInfo.summary && (
//           <MainSection title="PROFILE INFO">
//             <p className="m3-profile">{personalInfo.summary}</p>
//           </MainSection>
//         )}

//         {/* EXPERIENCE */}

//         {experience?.items?.length > 0 && (
//           <MainSection title={experience.title || 'EXPERIENCE'}>
//             <div className="m3-experience data-resume-root">
//               {experience.items.map((item: any, index: number) => {
//                 const job = record(item);

//                 const bullets = Array.isArray(job.bullets) ? job.bullets : [];

//                 return (
//                   <div className="m3-experience-item data-resume-root" key={index}>
//                     {/* TIMELINE */}

//                     <div className="m3-timeline data-resume-root">
//                       <span className="m3-circle" />

//                       {index < experience.items.length - 1 && (
//                         <span className="m3-line" />
//                       )}
//                     </div>

//                     {/* JOB CONTENT */}

//                     <div className="m3-job data-resume-root">
//                       <div className="m3-job-header data-resume-root">
//                         <div>
//                           <div className="m3-role data-resume-root">{value(job, "role")}</div>

//                           <div className="m3-company data-resume-root">
//                             {value(job, "company")}
//                           </div>
//                         </div>

//                         <div className="m3-date data-resume-root">
//                           {formatDate(value(job, "start"), value(job, "end"))}
//                         </div>
//                       </div>

//                       {value(job, "description") && (
//                         <p className="m3-job-description">
//                           {value(job, "description")}
//                         </p>
//                       )}

//                       {bullets.length > 0 && (
//                         <ul className="m3-job-bullets">
//                           {bullets.map(
//                             (bullet: string, bulletIndex: number) => (
//                               <li key={bulletIndex}>{bullet}</li>
//                             ),
//                           )}
//                         </ul>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </MainSection>
//         )}

//         {/* ACHIEVEMENT */}

//         {(achievement?.items ?? []).length > 0 && (
//           <MainSection title={achievement?.title || 'ACHIEVEMENT'}>
//             <div className="m3-achievements data-resume-root">
//               {achievement?.items.map((item: any, index: number) => {
//                 const achievementItem = record(item);

//                 return (
//                   <div className="m3-achievement data-resume-root" key={index}>
//                     <span className="m3-achievement-dot">â€¢</span>

//                     <div>
//                       <div className="m3-achievement-year data-resume-root">
//                         {value(achievementItem, "year")}
//                       </div>

//                       {value(achievementItem, "title") && (
//                         <div className="m3-achievement-title data-resume-root">
//                           {value(achievementItem, "title")}
//                         </div>
//                       )}

//                       {value(achievementItem, "description") && (
//                         <div className="m3-achievement-description data-resume-root">
//                           {value(achievementItem, "description")}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </MainSection>
//         )}
//       </main>

//       <style jsx>{`
//         /* ====================================================
//            BASE
//         ==================================================== */

//         .modern3 {
//           position: relative;
//           width: 100%;
//           min-height: 100%;
//           background: #ffffff;
//           color: #414141;
//           font-family: "Montserrat", Arial, sans-serif;
//           overflow: hidden;
//         }

//         .modern3 * {
//           box-sizing: border-box;
//         }

//         /* ====================================================
//            HEADER
//         ==================================================== */

//         .m3-header {
//           height: 181px;
//           width: 100%;
//           background: var(--m3-primary);
//           position: relative;

//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//           justify-content: center;

//           padding-right: 27px;
//           padding-bottom: 19px;
//         }

//         .m3-name {
//           color: #ffffff;
//           text-align: right;
//           text-transform: uppercase;
//           font-family: "Montserrat", Arial, sans-serif;

//           font-size: 32px;
//           line-height: 0.92;
//           letter-spacing: 1.5px;
//         }

//         .m3-first-name {
//           font-weight: 300;
//         }

//         .m3-last-name {
//           font-weight: 700;
//           letter-spacing: 1px;
//         }

//         .m3-title {
//           margin-top: 15px;

//           color: #ffffff;

//           font-family: "Montserrat", Arial, sans-serif;
//           font-size: 13px;
//           font-weight: 500;

//           letter-spacing: 0.1px;
//         }

//         /* ====================================================
//            SIDEBAR
//         ==================================================== */

//         .m3-sidebar {
//           position: absolute;
//           left: 24px;
//           top: 26px;
//           width: 196px;
//           min-height: calc(100% - 26px);
//           background: var(--m3-accent);
//           border: 3px solid var(--m3-accent);
//           border-radius: 100px 100px 0 0;
//           padding: 210px 20px 22px;
//           z-index: 10;
//           overflow: hidden; /* Add this to prevent content from overflowing */
//           word-wrap: break-word; /* Add this to wrap long words */
//         }

//         /* ====================================================
//            PHOTO
//         ==================================================== */

//         .m3-photo {
//           position: absolute;

//           left: 0;
//           top: 0;

//           width: 190px;
//           height: 190px;

//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .m3-photo-inner {
//           width: 164px;
//           height: 164px;

//           border-radius: 50%;

//           background: #808080;

//           border: 12px solid #dedede;

//           overflow: hidden;

//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .m3-photo-inner img {
//           width: 100%;
//           height: 100%;

//           object-fit: cover;

//           border-radius: 50%;

//           display: block;
//         }

//         .m3-initials {
//           width: 100%;
//           height: 100%;

//           display: flex;
//           align-items: center;
//           justify-content: center;

//           color: #ffffff;

//           font-size: 28px;
//           font-weight: 700;
//         }

//         /* ====================================================
//            SIDEBAR SECTION
//         ==================================================== */

//         .m3-sidebar-section {
//           margin: 0 0 25px 0;
//           width: 100%;
//           max-width: 100%;
//           overflow: hidden;
//         }

//         .m3-sidebar-heading {
//           display: flex;
//           align-items: center;
//           height: 14px;
//           margin-bottom: 11px;
//           width: 100%;
//         }

//         .m3-sidebar-heading span {
//           flex: 0 0 auto;
//           color: #3d3d3d;
//           font-size: 11.5px;
//           font-weight: 800;
//           letter-spacing: 0.1px;
//           white-space: nowrap;
//         }

//         .m3-sidebar-heading::after {
//           content: "";
//           flex: 1;
//           height: 1px;
//           background: #a9a9a9;
//           margin-left: 12px;
//           min-width: 10px;
//         }

//         /* ====================================================
//    EDUCATION - Fix overflow
// ==================================================== */

//         .m3-education {
//           margin-bottom: 12px;
//           font-family: Arial, sans-serif;
//           color: #4d4d4d;
//           width: 100%;
//           max-width: 100%;
//           overflow: hidden;
//           word-wrap: break-word;
//         }

//         .m3-edu-date {
//           font-size: 8.9px;
//           line-height: 1.25;
//           margin-bottom: 2px;
//         }

//         .m3-edu-degree {
//           font-size: 8.2px;
//           line-height: 1.25;
//           font-weight: 800;
//           text-transform: uppercase;
//           word-wrap: break-word;
//         }

//         .m3-edu-school {
//           font-size: 8.2px;
//           line-height: 1.25;
//           font-weight: 800;
//           text-transform: uppercase;
//           word-wrap: break-word;
//         }

//         .m3-edu-description {
//           margin-top: 4px;
//           font-size: 8.3px;
//           line-height: 1.35;
//           color: #646464;
//           word-wrap: break-word;
//         }

//         /* ====================================================
//    BULLET LIST - Fix overflow
// ==================================================== */

//         .m3-bullet-list {
//           list-style: none;
//           margin: 0;
//           padding: 0;
//           font-family: Arial, sans-serif;
//           font-size: 8.8px;
//           line-height: 1.8;
//           color: #505050;
//           width: 100%;
//           max-width: 100%;
//           overflow: hidden;
//         }

//         .m3-bullet-list li {
//           position: relative;
//           padding-left: 11px;
//           word-wrap: break-word;
//           overflow-wrap: anywhere;
//         }

//         .m3-bullet-list li::before {
//           content: "â€¢";
//           position: absolute;
//           left: 0;
//           top: 0;
//           color: #333333;
//         }

//         /* ====================================================
//            CONTACT
//         ==================================================== */

//         .m3-contact {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           width: 100%; /* Ensure it takes full sidebar width */
//           max-width: 100%; /* Prevent overflow */
//         }

//         .m3-contact-row {
//           display: grid;
//           grid-template-columns: 14px minmax(0, 1fr); /* Fixed icon width, content takes rest */
//           column-gap: 8px;
//           align-items: flex-start; /* Align items to top */
//           color: #4d4d4d;
//           font-family: Arial, sans-serif;
//           font-size: 8.1px;
//           line-height: 1.35;
//           width: 100%;
//           max-width: 100%;
//           overflow: hidden; /* Prevent overflow */
//         }

//         .m3-contact-icon {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0; /* Prevent icon from shrinking */
//           width: 14px;
//           height: 14px;
//           color: #4d4d4d;
//           margin-top: 1px;
//         }

//         .m3-contact-icon svg {
//           width: 10px;
//           height: 10px;
//           display: block;
//           flex-shrink: 0;
//         }

//         .m3-contact-value {
//           overflow-wrap: anywhere; /* Break long words if needed */
//           word-break: break-word;
//           min-width: 0; /* Allow shrinking */
//           color: #4d4d4d;
//         }

//         /* ====================================================
//            MAIN
//         ==================================================== */

//         .m3-main {
//           width: 100%;

//           min-height: 550px;

//           padding: 19px 28px 30px 230px;

//           background: #ffffff;
//         }

//         /* ====================================================
//            MAIN SECTION HEADING
           
//            IMPORTANT:
//            There is NO line before the heading.
//            The line starts ONLY after the heading.
//         ==================================================== */

//         .m3-main-section {
//           width: 100%;

//           margin-bottom: 28px;
//         }

//         .m3-main-heading {
//           display: flex;

//           align-items: center;

//           width: 100%;

//           height: 15px;

//           margin-bottom: 11px;
//         }

//         .m3-main-heading span {
//           flex: 0 0 auto;

//           color: #3b3b3b;

//           font-family: "Montserrat", Arial, sans-serif;

//           font-size: 11.5px;

//           font-weight: 800;

//           letter-spacing: 0.1px;

//           white-space: nowrap;
//         }

//         .m3-main-heading::after {
//           content: "";

//           flex: 1;

//           height: 1px;

//           background: #aaaaaa;

//           margin-left: 20px;
//         }

//         /* ====================================================
//            PROFILE
//         ==================================================== */

//         .m3-profile {
//           margin: 0;

//           color: #5a5a5a;

//           font-family: Arial, sans-serif;

//           font-size: 8.8px;

//           line-height: 1.48;

//           text-align: left;
//         }

//         /* ====================================================
//            EXPERIENCE
//         ==================================================== */

//         .m3-experience {
//           width: 100%;
//         }

//         .m3-experience-item {
//           display: grid;

//           grid-template-columns:
//             20px
//             minmax(0, 1fr);

//           column-gap: 7px;

//           position: relative;

//           min-height: 83px;
//         }

//         /* ====================================================
//            TIMELINE
//         ==================================================== */

//         .m3-timeline {
//           position: relative;

//           width: 20px;

//           min-height: 100%;
//         }

//         .m3-circle {
//           position: absolute;

//           top: 0;
//           left: 0;

//           width: 14px;
//           height: 14px;

//           border: 1px solid #333333;

//           border-radius: 50%;

//           background: #ffffff;

//           z-index: 2;
//         }

//         .m3-line {
//           position: absolute;

//           top: 13px;
//           bottom: -1px;

//           left: 6px;

//           width: 1px;

//           background: #444444;
//         }

//         /* ====================================================
//            JOB
//         ==================================================== */

//         .m3-job {
//           min-width: 0;

//           padding-bottom: 17px;
//         }

//         .m3-job-header {
//           width: 100%;

//           display: flex;

//           align-items: flex-start;

//           justify-content: space-between;

//           column-gap: 10px;
//         }

//         .m3-role {
//           color: #353535;

//           font-family: Arial, sans-serif;

//           font-size: 8.4px;

//           line-height: 1.2;

//           font-weight: 800;

//           text-transform: uppercase;
//         }

//         .m3-company {
//           margin-top: 1px;

//           color: #353535;

//           font-family: Arial, sans-serif;

//           font-size: 8.3px;

//           line-height: 1.2;

//           font-weight: 800;

//           text-transform: uppercase;
//         }

//         .m3-date {
//           flex-shrink: 0;

//           color: #676767;

//           font-family: Arial, sans-serif;

//           font-size: 8px;

//           line-height: 1.2;

//           white-space: nowrap;
//         }

//         .m3-job-description {
//           margin: 4px 0 0;

//           color: #5c5c5c;

//           font-family: Arial, sans-serif;

//           font-size: 8.3px;

//           line-height: 1.4;
//         }

//         .m3-job-bullets {
//           margin: 4px 0 0;

//           padding: 0;

//           list-style: none;

//           color: #5c5c5c;

//           font-family: Arial, sans-serif;

//           font-size: 8.3px;

//           line-height: 1.4;
//         }

//         .m3-job-bullets li {
//           margin: 0;
//         }

//         /* ====================================================
//            ACHIEVEMENTS
//         ==================================================== */

//         .m3-achievements {
//           display: grid;

//           grid-template-columns:
//             1fr
//             1fr;

//           column-gap: 27px;

//           width: 100%;
//         }

//         .m3-achievement {
//           display: grid;

//           grid-template-columns:
//             7px
//             minmax(0, 1fr);

//           column-gap: 4px;

//           font-family: Arial, sans-serif;
//         }

//         .m3-achievement-dot {
//           font-size: 10px;

//           line-height: 1.1;

//           color: #333333;
//         }

//         .m3-achievement-year {
//           color: #3b3b3b;

//           font-size: 8.2px;

//           line-height: 1.3;

//           font-weight: 800;
//         }

//         .m3-achievement-title {
//           color: #535353;

//           font-size: 8px;

//           line-height: 1.35;

//           margin-top: 1px;
//         }

//         .m3-achievement-description {
//           color: #626262;

//           font-size: 8px;

//           line-height: 1.35;

//           margin-top: 1px;
//         }

//         /* ====================================================
//            PRINT
//         ==================================================== */

//         @media print {
//           .modern3 {
//             width: 210mm;
//             min-height: 297mm;
//           }

//           .m3-header {
//             height: 181px;
//           }

//           .m3-sidebar {
//             min-height: calc(100% - 26px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ==============================================================
//    SIDEBAR SECTION
// ================================================================ */

// function SidebarSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="m3-sidebar-section">
//       <div className="m3-sidebar-heading data-resume-root">
//         <span>{title}</span>
//       </div>

//       {children}
//     </section>
//   );
// }

// /* ==============================================================
//    MAIN SECTION
// ================================================================ */

// function MainSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="m3-main-section">
//       <div className="m3-main-heading data-resume-root">
//         <span>{title}</span>
//       </div>

//       {children}
//     </section>
//   );
// }

// /* ==============================================================
//    CONTACT
// ================================================================ */

// function Contact({ icon, value }: { icon: React.ReactNode; value: string }) {
//   return (
//     <div className="m3-contact-row data-resume-root">
//       <span className="m3-contact-icon">{icon}</span>

//       <span className="m3-contact-value">{value}</span>
//     </div>
//   );
// }
















































import React from "react";
import type { TemplateProps, CustomItem, ReferenceItem, LanguageItem, AchievementItem, RatedSkillItem } from "../../types/Content";

const phoneIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const mailIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const locationIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const globeIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 0 20" />
    <path d="M12 2a15.3 15.3 0 0 0 0 20" />
  </svg>
);

function record(value: unknown): Record<string, any> {
  if (typeof value === "object" && value !== null) {
    return value as Record<string, any>;
  }
  return {};
}

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
  flag: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 21V4h16l-4 6 4 6H4z" />
    </svg>
  ),
};

function value(object: unknown, key: string): string {
  const v = record(object)[key];
  if (v === undefined || v === null) {
    return "";
  }
  return String(v);
}

function getSection(sections: any[], type: string) {
  return sections.find((section) => section.type === type);
}

function formatDate(start?: string, end?: string) {
  if (start && end) {
    return `${start} - ${end}`;
  }
  if (start) {
    return `${start} - Present`;
  }
  return end || "";
}

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

export default function ModernTemplate3({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;

  const contactSection = sections.find(
    (s) => s.type === "custom" && s.id === "contact",
  );

  const contactItems = contactSection?.items || [];

  const education = getSection(sections, "education");
  const experience = getSection(sections, "experience");
  const referencesSection = getSection(sections, "references");
  
  // Skills sections
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const skillsSection = sections.find((s) => s.type === "skills");
  
  // Other sections
  const languagesSection = sections.find((s) => s.type === "languages" || s.id === "languages");
  const achievementsSection = sections.find((s) => s.type === "achievements");
  
  // Custom sections (excluding contact)
  const otherCustomSections = sections.filter(
    (s) => s.type === "custom" && s.id !== "contact"
  );

  const fullName = personalInfo.fullName?.trim() || "JONATHAN PATTERSON";
  const nameParts = fullName.split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  const primary = theme.primaryColor || "#777674";
  const accent = theme.accentColor || "#7B2CFF";
  const text = theme.textColor || "#444444";

  return (
    <div
      className="modern3 data-resume-root"
      style={
        {
          "--m3-primary": primary,
          "--m3-accent": accent,
          "--m3-text": text,
        } as React.CSSProperties
      }
    >
      {/* ======================================================
          HEADER
      ======================================================= */}
      <div className="m3-header data-resume-root">
        <div className="m3-name data-resume-root">
          <div className="m3-first-name data-resume-root">{firstName}</div>
          {lastName && <div className="m3-last-name data-resume-root">{lastName}</div>}
        </div>
        <div className="m3-title data-resume-root">{personalInfo.title || "Art Director"}</div>
      </div>

      {/* ======================================================
          LEFT SIDEBAR
      ======================================================= */}
      <aside className="m3-sidebar">
        {/* PHOTO */}
        {personalInfo.photoUrl && (
          <div className="m3-photo data-resume-root">
            <div className="m3-photo-inner data-resume-root">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName || "Profile"} />
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {education?.items?.length > 0 && (
          <SidebarSection title={education.title || 'EDUCATION'}>
            {education.items.map((item: any, index: number) => {
              const edu = record(item);
              return (
                <div className="m3-education data-resume-root" key={index}>
                  <div className="m3-edu-date data-resume-root">
                    {formatDate(value(edu, "start"), value(edu, "end"))}
                  </div>
                  <div className="m3-edu-degree data-resume-root">{value(edu, "degree")}</div>
                  <div className="m3-edu-school data-resume-root">{value(edu, "school")}</div>
                  {value(edu, "description") && (
                    <div className="m3-edu-description data-resume-root">• {value(edu, "description")}</div>
                  )}
                </div>
              );
            })}
          </SidebarSection>
        )}

        {/* RATED SKILLS */}
        {ratedSkillsSection?.items && ratedSkillsSection.items.length > 0 && (
          <SidebarSection title={ratedSkillsSection.title || 'SKILLS'}>
            <div className="m3-rated-skills data-resume-root">
              {ratedSkillsSection.items.map((skill: RatedSkillItem, index: number) => (
                <div className="m3-rated-skill data-resume-root" key={index}>
                  <div className="m3-rated-skill-name data-resume-root">{skill.name}</div>
                  <div className="m3-rated-skill-bar data-resume-root">
                    <div 
                      className="m3-rated-skill-fill data-resume-root" 
                      style={{ width: `${skill.level || 50}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* SKILLS (Tags) */}
        {(skillsSection?.items?.length ?? 0) > 0 && (
          <SidebarSection title={skillsSection?.title || 'TECHNICAL SKILLS'}>
            <div className="m3-skills-tags data-resume-root">
              {skillsSection?.items.map((skill: string, index: number) => (
                <span key={index} className="m3-skill-tag data-resume-root">{skill}</span>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* LANGUAGES */}
        {(languagesSection?.items?.length ?? 0) > 0 && (
          <SidebarSection title={languagesSection?.title || 'LANGUAGES'}>
            <ul className="m3-bullet-list">
              {languagesSection?.items.map((item: any, index: number) => {
                if (isLanguageItem(item)) {
                  return (
                    <li key={index}>
                      {item.name}
                      {item.level ? ` (${item.level})` : ""}
                    </li>
                  );
                }
                return <li key={index}>{String(item)}</li>;
              })}
            </ul>
          </SidebarSection>
        )}

        {/* REFERENCES */}
        {referencesSection?.items?.length > 0 && (
          <SidebarSection title={referencesSection.title || 'REFERENCES'}>
            {referencesSection.items.map((ref: ReferenceItem, index: number) => (
              <div className="m3-reference data-resume-root" key={index}>
                <div className="m3-reference-name data-resume-root">{ref.name}</div>
                {ref.address && <div className="m3-reference-detail data-resume-root">{ref.address}</div>}
                {ref.phone && <div className="m3-reference-detail data-resume-root">Tel: {ref.phone}</div>}
                {ref.email && <div className="m3-reference-detail data-resume-root">Email: {ref.email}</div>}
              </div>
            ))}
          </SidebarSection>
        )}

        {/* CONTACT */}
        <SidebarSection title="CONTACT">
          <div className="m3-contact data-resume-root">
            {contactItems.map((item, i) => {
              if (isCustomItem(item)) {
                let icon = Icon.pin;
                if (item.label === "phone") icon = Icon.phone;
                else if (item.label === "email") icon = Icon.mail;
                else if (item.label === "web" || item.label === "website") icon = Icon.globe;
                
                return (
                  <div className="m3-contact-row data-resume-root" key={i}>
                    <span className="m3-contact-icon">{icon}</span>
                    <span className="m3-contact-value">{item.description}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </SidebarSection>
      </aside>

      {/* ======================================================
          MAIN
      ======================================================= */}
      <main className="m3-main">
        {/* PROFILE INFO */}
        {personalInfo.summary && (
          <MainSection title="PROFILE INFO">
            <p className="m3-profile">{personalInfo.summary}</p>
          </MainSection>
        )}

        {/* EXPERIENCE */}
        {experience?.items?.length > 0 && (
          <MainSection title={experience.title || 'EXPERIENCE'}>
            <div className="m3-experience data-resume-root">
              {experience.items.map((item: any, index: number) => {
                const job = record(item);
                const bullets = Array.isArray(job.bullets) ? job.bullets : [];
                return (
                  <div className="m3-experience-item data-resume-root" key={index}>
                    <div className="m3-timeline data-resume-root">
                      <span className="m3-circle" />
                      {index < experience.items.length - 1 && (
                        <span className="m3-line" />
                      )}
                    </div>
                    <div className="m3-job data-resume-root">
                      <div className="m3-job-header data-resume-root">
                        <div>
                          <div className="m3-role data-resume-root">{value(job, "role")}</div>
                          <div className="m3-company data-resume-root">{value(job, "company")}</div>
                        </div>
                        <div className="m3-date data-resume-root">
                          {formatDate(value(job, "start"), value(job, "end"))}
                        </div>
                      </div>
                      {value(job, "description") && (
                        <p className="m3-job-description">{value(job, "description")}</p>
                      )}
                      {bullets.length > 0 && (
                        <ul className="m3-job-bullets">
                          {bullets.map((bullet: string, bulletIndex: number) => (
                            <li key={bulletIndex}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </MainSection>
        )}

        {/* ACHIEVEMENTS */}
        {(achievementsSection?.items?.length ?? 0) > 0 && (
          <MainSection title={achievementsSection?.title || 'ACHIEVEMENTS'}>
            <div className="m3-achievements data-resume-root">
              {achievementsSection?.items.map((item: any, index: number) => {
                if (isAchievementItem(item)) {
                  return (
                    <div className="m3-achievement data-resume-root" key={index}>
                      <span className="m3-achievement-dot">•</span>
                      <div>
                        {value(item, 'year') && <div className="m3-achievement-year data-resume-root">{value(item, 'year')}</div>}
                        <div className="m3-achievement-title data-resume-root">{item.title}</div>
                        {item.description && (
                          <div className="m3-achievement-description data-resume-root">{item.description}</div>
                        )}
                      </div>
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div className="m3-achievement data-resume-root" key={index}>
                      <span className="m3-achievement-dot">•</span>
                      <div>
                        <div className="m3-achievement-title data-resume-root">{item}</div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </MainSection>
        )}

        {/* OTHER CUSTOM SECTIONS */}
        {otherCustomSections.map((section) => (
          <MainSection key={section.id} title={section.title || 'CUSTOM'}>
            <div className="m3-custom-items data-resume-root">
              {section.items.map((item, index) => {
                if (isCustomItem(item)) {
                  return (
                    <div className="m3-custom-item data-resume-root" key={index}>
                      {item.label && <div className="m3-custom-label data-resume-root">{item.label}</div>}
                      {item.description && <div className="m3-custom-description data-resume-root">{item.description}</div>}
                    </div>
                  );
                }
                if (typeof item === 'string') {
                  return (
                    <div className="m3-custom-item data-resume-root" key={index}>
                      <div className="m3-custom-description data-resume-root">{item}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </MainSection>
        ))}
      </main>

      <style jsx>{`
        /* ====================================================
           BASE
        ==================================================== */
        .modern3 {
          position: relative;
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: #414141;
          font-family: "Montserrat", Arial, sans-serif;
          overflow: hidden;
        }
        .modern3 * {
          box-sizing: border-box;
        }

        /* ====================================================
           HEADER
        ==================================================== */
        .m3-header {
          height: 181px;
          width: 100%;
          background: var(--m3-primary);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          padding-right: 27px;
          padding-bottom: 19px;
        }
        .m3-name {
          color: #ffffff;
          text-align: right;
          text-transform: uppercase;
          font-family: "Montserrat", Arial, sans-serif;
          font-size: 32px;
          line-height: 0.92;
          letter-spacing: 1.5px;
        }
        .m3-first-name {
          font-weight: 300;
        }
        .m3-last-name {
          font-weight: 700;
          letter-spacing: 1px;
        }
        .m3-title {
          margin-top: 15px;
          color: #ffffff;
          font-family: "Montserrat", Arial, sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1px;
        }

        /* ====================================================
           SIDEBAR
        ==================================================== */
        .m3-sidebar {
          position: absolute;
          left: 24px;
          top: 26px;
          width: 196px;
          min-height: calc(100% - 26px);
          background: var(--m3-accent);
          border: 3px solid var(--m3-accent);
          border-radius: 100px 100px 0 0;
          padding: 210px 20px 22px;
          z-index: 10;
          overflow: hidden;
          word-wrap: break-word;
        }

        /* ====================================================
           PHOTO
        ==================================================== */
        .m3-photo {
          position: absolute;
          left: 0;
          top: 0;
          width: 190px;
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .m3-photo-inner {
          width: 164px;
          height: 164px;
          border-radius: 50%;
          background: #808080;
          border: 12px solid #dedede;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .m3-photo-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          display: block;
        }

        /* ====================================================
           SIDEBAR SECTION
        ==================================================== */
        .m3-sidebar-section {
          margin: 0 0 25px 0;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .m3-sidebar-heading {
          display: flex;
          align-items: center;
          height: 14px;
          margin-bottom: 11px;
          width: 100%;
        }
        .m3-sidebar-heading span {
          flex: 0 0 auto;
          color: #3d3d3d;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.1px;
          white-space: nowrap;
        }
        .m3-sidebar-heading::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #a9a9a9;
          margin-left: 12px;
          min-width: 10px;
        }

        /* ====================================================
           EDUCATION
        ==================================================== */
        .m3-education {
          margin-bottom: 12px;
          font-family: Arial, sans-serif;
          color: #4d4d4d;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          word-wrap: break-word;
        }
        .m3-edu-date {
          font-size: 8.9px;
          line-height: 1.25;
          margin-bottom: 2px;
        }
        .m3-edu-degree {
          font-size: 8.2px;
          line-height: 1.25;
          font-weight: 800;
          text-transform: uppercase;
          word-wrap: break-word;
        }
        .m3-edu-school {
          font-size: 8.2px;
          line-height: 1.25;
          font-weight: 800;
          text-transform: uppercase;
          word-wrap: break-word;
        }
        .m3-edu-description {
          margin-top: 4px;
          font-size: 8.3px;
          line-height: 1.35;
          color: #646464;
          word-wrap: break-word;
        }

        /* ====================================================
           RATED SKILLS
        ==================================================== */
        .m3-rated-skills {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .m3-rated-skill {
          width: 100%;
        }
        .m3-rated-skill-name {
          font-size: 8.2px;
          font-weight: 700;
          color: #3d3d3d;
          margin-bottom: 3px;
          text-transform: uppercase;
          word-wrap: break-word;
        }
        .m3-rated-skill-bar {
          height: 4px;
          background: #d0d0d0;
          border-radius: 2px;
          overflow: hidden;
        }
        .m3-rated-skill-fill {
          height: 100%;
          background: #3d3d3d;
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        /* ====================================================
           SKILLS TAGS
        ==================================================== */
        .m3-skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .m3-skill-tag {
          background: rgba(0,0,0,0.08);
          color: #3d3d3d;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 7.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          word-wrap: break-word;
        }

        /* ====================================================
           REFERENCES
        ==================================================== */
        .m3-reference {
          margin-bottom: 10px;
          font-family: Arial, sans-serif;
          color: #4d4d4d;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          word-wrap: break-word;
        }
        .m3-reference-name {
          font-size: 8.5px;
          font-weight: 800;
          color: #3d3d3d;
          text-transform: uppercase;
        }
        .m3-reference-detail {
          font-size: 7.8px;
          line-height: 1.4;
          color: #5a5a5a;
        }

        /* ====================================================
           BULLET LIST
        ==================================================== */
        .m3-bullet-list {
          list-style: none;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          font-size: 8.8px;
          line-height: 1.8;
          color: #505050;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .m3-bullet-list li {
          position: relative;
          padding-left: 11px;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-bullet-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: 0;
          color: #333333;
        }

        /* ====================================================
           CONTACT
        ==================================================== */
        .m3-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 100%;
        }
        .m3-contact-row {
          display: grid;
          grid-template-columns: 14px minmax(0, 1fr);
          column-gap: 8px;
          align-items: flex-start;
          color: #4d4d4d;
          font-family: Arial, sans-serif;
          font-size: 8.1px;
          line-height: 1.35;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .m3-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 14px;
          height: 14px;
          color: #4d4d4d;
          margin-top: 1px;
        }
        .m3-contact-icon svg {
          width: 10px;
          height: 10px;
          display: block;
          flex-shrink: 0;
        }
        .m3-contact-value {
          overflow-wrap: anywhere;
          word-break: break-word;
          min-width: 0;
          color: #4d4d4d;
        }

        /* ====================================================
           MAIN
        ==================================================== */
        .m3-main {
          width: 100%;
          min-height: 550px;
          padding: 19px 28px 30px 230px;
          background: #ffffff;
        }

        /* ====================================================
           MAIN SECTION
        ==================================================== */
        .m3-main-section {
          width: 100%;
          margin-bottom: 28px;
        }
        .m3-main-heading {
          display: flex;
          align-items: center;
          width: 100%;
          height: 15px;
          margin-bottom: 11px;
        }
        .m3-main-heading span {
          flex: 0 0 auto;
          color: #3b3b3b;
          font-family: "Montserrat", Arial, sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.1px;
          white-space: nowrap;
        }
        .m3-main-heading::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #aaaaaa;
          margin-left: 20px;
        }

        /* ====================================================
           PROFILE
        ==================================================== */
        .m3-profile {
          margin: 0;
          color: #5a5a5a;
          font-family: Arial, sans-serif;
          font-size: 8.8px;
          line-height: 1.48;
          text-align: left;
        }

        /* ====================================================
           EXPERIENCE
        ==================================================== */
        .m3-experience {
          width: 100%;
        }
        .m3-experience-item {
          display: grid;
          grid-template-columns: 20px minmax(0, 1fr);
          column-gap: 7px;
          position: relative;
          min-height: 83px;
        }
        .m3-timeline {
          position: relative;
          width: 20px;
          min-height: 100%;
        }
        .m3-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 14px;
          height: 14px;
          border: 1px solid #333333;
          border-radius: 50%;
          background: #ffffff;
          z-index: 2;
        }
        .m3-line {
          position: absolute;
          top: 13px;
          bottom: -1px;
          left: 6px;
          width: 1px;
          background: #444444;
        }
        .m3-job {
          min-width: 0;
          padding-bottom: 17px;
        }
        .m3-job-header {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          column-gap: 10px;
        }
        .m3-role {
          color: #353535;
          font-family: Arial, sans-serif;
          font-size: 8.4px;
          line-height: 1.2;
          font-weight: 800;
          text-transform: uppercase;
        }
        .m3-company {
          margin-top: 1px;
          color: #353535;
          font-family: Arial, sans-serif;
          font-size: 8.3px;
          line-height: 1.2;
          font-weight: 800;
          text-transform: uppercase;
        }
        .m3-date {
          flex-shrink: 0;
          color: #676767;
          font-family: Arial, sans-serif;
          font-size: 8px;
          line-height: 1.2;
          white-space: nowrap;
        }
        .m3-job-description {
          margin: 4px 0 0;
          color: #5c5c5c;
          font-family: Arial, sans-serif;
          font-size: 8.3px;
          line-height: 1.4;
        }
        .m3-job-bullets {
          margin: 4px 0 0;
          padding: 0;
          list-style: none;
          color: #5c5c5c;
          font-family: Arial, sans-serif;
          font-size: 8.3px;
          line-height: 1.4;
        }
        .m3-job-bullets li {
          margin: 0;
        }

        /* ====================================================
           ACHIEVEMENTS
        ==================================================== */
        .m3-achievements {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 27px;
          width: 100%;
        }
        .m3-achievement {
          display: grid;
          grid-template-columns: 7px minmax(0, 1fr);
          column-gap: 4px;
          font-family: Arial, sans-serif;
          margin-bottom: 6px;
        }
        .m3-achievement-dot {
          font-size: 10px;
          line-height: 1.1;
          color: #333333;
        }
        .m3-achievement-year {
          color: #3b3b3b;
          font-size: 8.2px;
          line-height: 1.3;
          font-weight: 800;
        }
        .m3-achievement-title {
          color: #535353;
          font-size: 8px;
          line-height: 1.35;
          margin-top: 1px;
          font-weight: 600;
        }
        .m3-achievement-description {
          color: #626262;
          font-size: 8px;
          line-height: 1.35;
          margin-top: 1px;
        }

        /* ====================================================
           CUSTOM SECTIONS
        ==================================================== */
        .m3-custom-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .m3-custom-item {
          font-family: Arial, sans-serif;
        }
        .m3-custom-label {
          font-size: 8.5px;
          font-weight: 700;
          color: #3b3b3b;
          text-transform: uppercase;
        }
        .m3-custom-description {
          font-size: 8.5px;
          color: #5a5a5a;
          line-height: 1.4;
        }

        /* ====================================================
           PRINT
        ==================================================== */
        @media print {
          .modern3 {
            width: 210mm;
            min-height: 297mm;
          }
          .m3-header {
            height: 181px;
          }
          .m3-sidebar {
            min-height: calc(100% - 26px);
          }
        }
      `}</style>
    </div>
  );
}

/* ==============================================================
   SIDEBAR SECTION
================================================================ */
function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="m3-sidebar-section">
      <div className="m3-sidebar-heading data-resume-root">
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

/* ==============================================================
   MAIN SECTION
================================================================ */
function MainSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="m3-main-section">
      <div className="m3-main-heading data-resume-root">
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}