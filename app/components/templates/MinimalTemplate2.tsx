// import React from "react";
// import type { TemplateProps } from "../../types/Content";

// // Minimal line icons - hairline weight to match the editorial aesthetic
// const Icon = {
//   phone: (
//     <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
//     </svg>
//   ),
//   globe: (
//     <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <circle cx="12" cy="12" r="10" />
//       <line x1="2" y1="12" x2="22" y2="12" />
//       <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
//     </svg>
//   ),
//   mail: (
//     <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//       <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
//     </svg>
//   ),
//   pin: (
//     <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   ),
// };

// export default function MinimalTemplate({ content, theme }: TemplateProps) {
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
//     <div className="minimal-template">
//       {/* ================= HEADER ================= */}
//       <header className="header">
//         <div className="headerTop">
//           {personalInfo.photoUrl ? (
//             <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
//           ) : (
//             <div className="photoFallback">{initials || "U"}</div>
//           )}
//           <div className="nameBlock">
//             <h1 className="name">{personalInfo.fullName}</h1>
//             <div className="titleRow">
//               <span className="titleTick" />
//               <span className="title">{personalInfo.title || "PROFESSIONAL"}</span>
//             </div>
//           </div>
//         </div>

//         <div className="contactBar">
//           {contactItems.length > 0
//             ? contactItems.map((item, i) => {
//                 if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
//                   let icon = Icon.pin;
//                   if (item.label === "phone") icon = Icon.phone;
//                   else if (item.label === "email") icon = Icon.mail;
//                   else if (item.label === "web") icon = Icon.globe;
//                   return (
//                     <span className="contactItem" key={i}>
//                       <span className="ic">{icon}</span>
//                       {item.description}
//                     </span>
//                   );
//                 }
//                 return null;
//               })
//             : (
//               <>
//                 {personalInfo.phone && (
//                   <span className="contactItem"><span className="ic">{Icon.phone}</span>{personalInfo.phone}</span>
//                 )}
//                 {personalInfo.email && (
//                   <span className="contactItem"><span className="ic">{Icon.mail}</span>{personalInfo.email}</span>
//                 )}
//                 {personalInfo.location && (
//                   <span className="contactItem"><span className="ic">{Icon.pin}</span>{personalInfo.location}</span>
//                 )}
//                 {personalInfo.website && (
//                   <span className="contactItem"><span className="ic">{Icon.globe}</span>{personalInfo.website}</span>
//                 )}
//               </>
//             )}
//         </div>
//       </header>

//       <div className="rule" />

//       {/* ================= BODY ================= */}
//       <div className="body">
//         {/* About */}
//         {aboutText && (
//           <section className="section">
//             <h2 className="sectionLabel">About</h2>
//             <p className="aboutText">{aboutText}</p>
//           </section>
//         )}

//         {/* Experience - ledger style */}
//         {experienceSection && experienceSection.items.length > 0 && (
//           <section className="section">
//             <h2 className="sectionLabel">Experience</h2>
//             <div className="ledger">
//               {experienceSection.items.map((job, i) => (
//                 <div className="ledgerRow" key={i}>
//                   <div className="ledgerDate">
//                     <span className="dot" />
//                     {job.start} — {job.end || "Present"}
//                   </div>
//                   <div className="ledgerMain">
//                     <div className="jobTop">
//                       <span className="jobTitle">{job.role || "Position"}</span>
//                       <span className="jobCompany">{job.company}{job.location ? `, ${job.location}` : ""}</span>
//                     </div>
//                     {job.bullets && job.bullets.length > 0 && (
//                       <p className="jobDesc">{job.bullets[0]}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         <div className="twoCol">
//           {/* Education */}
//           {educationSection && educationSection.items.length > 0 && (
//             <section className="section half">
//               <h2 className="sectionLabel">Education</h2>
//               {educationSection.items.map((edu, i) => (
//                 <div className="eduItem" key={i}>
//                   <div className="eduTop">
//                     <span className="eduSchool">{edu.school}</span>
//                     <span className="eduDate">{edu.start} – {edu.end}</span>
//                   </div>
//                   <div className="eduDegree">{edu.degree}</div>
//                 </div>
//               ))}
//             </section>
//           )}

//           {/* References */}
//           {referencesSection && referencesSection.items.length > 0 && (
//             <section className="section half">
//               <h2 className="sectionLabel">References</h2>
//               {referencesSection.items.map((ref, i) => (
//                 <div className="refItem" key={i}>
//                   <div className="refName">{ref.name}</div>
//                   {ref.phone && <div className="refLine">{ref.phone}</div>}
//                   {ref.email && <div className="refLine">{ref.email}</div>}
//                 </div>
//               ))}
//             </section>
//           )}
//         </div>

//         {/* Skills - ledger numeric style */}
//         {ratedSkillsSection && ratedSkillsSection.items.length > 0 && (
//           <section className="section">
//             <h2 className="sectionLabel">Skills</h2>
//             <div className="skillsGrid">
//               {ratedSkillsSection.items.map((skill, i) => (
//                 <div className="skillRow" key={i}>
//                   <div className="skillTop">
//                     <span className="skillName">{skill.name}</span>
//                     <span className="skillPct">{skill.level}</span>
//                   </div>
//                   <div className="skillBar">
//                     <div className="skillFill" style={{ width: `${skill.level}%` }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       <style jsx>{`
//         .minimal-template {
//           width: 100%;
//           min-height: 100%;
//           background: ${t.backgroundColor || "#FAFAF8"};
//           color: ${t.textColor || "#181818"};
//           font-family: ${t.bodyFont || "Inter"}, sans-serif;
//           padding: 56px 64px 64px;
//           box-sizing: border-box;
//         }

//         .headerTop {
//           display: flex;
//           align-items: center;
//           gap: 22px;
//         }

//         .photo, .photoFallback {
//           width: 64px;
//           height: 64px;
//           border-radius: 4px;
//           object-fit: cover;
//           flex-shrink: 0;
//         }

//         .photoFallback {
//           background: ${t.textColor || "#181818"};
//           color: ${t.backgroundColor || "#FAFAF8"};
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: ${t.headingFont || "Fraunces"}, serif;
//           font-size: 22px;
//           font-weight: 600;
//         }

//         .name {
//           font-family: ${t.headingFont || "Fraunces"}, serif;
//           font-size: 40px;
//           font-weight: 500;
//           letter-spacing: -0.5px;
//           margin: 0;
//           line-height: 1.05;
//         }

//         .titleRow {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin-top: 8px;
//         }

//         .titleTick {
//           width: 18px;
//           height: 2px;
//           background: ${t.accentColor || "#2F4E9E"};
//           display: inline-block;
//         }

//         .title {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 11px;
//           letter-spacing: 2.5px;
//           text-transform: uppercase;
//           color: #6b6b6b;
//         }

//         .contactBar {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 22px;
//           margin-top: 26px;
//         }

//         .contactItem {
//           display: inline-flex;
//           align-items: center;
//           gap: 7px;
//           font-size: 12.5px;
//           color: #444;
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//         }

//         .contactItem .ic {
//           color: ${t.accentColor || "#2F4E9E"};
//           display: flex;
//         }

//         .rule {
//           height: 1px;
//           background: #dcdad4;
//           margin: 32px 0 0;
//         }

//         .body {
//           margin-top: 8px;
//         }

//         .section {
//           padding-top: 34px;
//         }

//         .sectionLabel {
//           font-family: ${t.headingFont || "Fraunces"}, serif;
//           font-size: 13px;
//           font-weight: 600;
//           letter-spacing: 3px;
//           text-transform: uppercase;
//           color: ${t.accentColor || "#2F4E9E"};
//           margin: 0 0 18px 0;
//         }

//         .aboutText {
//           font-size: 13.5px;
//           line-height: 1.85;
//           color: #4a4a4a;
//           margin: 0;
//           max-width: 640px;
//         }

//         .ledger {
//           display: flex;
//           flex-direction: column;
//         }

//         .ledgerRow {
//           display: grid;
//           grid-template-columns: 150px 1fr;
//           gap: 24px;
//           padding: 16px 0;
//           border-top: 1px solid #e6e4de;
//         }

//         .ledgerRow:last-child {
//           border-bottom: 1px solid #e6e4de;
//         }

//         .ledgerDate {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 11px;
//           color: #8a8a8a;
//           display: flex;
//           align-items: baseline;
//           gap: 8px;
//         }

//         .dot {
//           width: 5px;
//           height: 5px;
//           border-radius: 50%;
//           background: ${t.accentColor || "#2F4E9E"};
//           flex-shrink: 0;
//         }

//         .jobTop {
//           display: flex;
//           justify-content: space-between;
//           flex-wrap: wrap;
//           gap: 6px;
//         }

//         .jobTitle {
//           font-size: 14.5px;
//           font-weight: 700;
//           color: ${t.textColor || "#181818"};
//         }

//         .jobCompany {
//           font-size: 12px;
//           color: #8a8a8a;
//           font-style: italic;
//         }

//         .jobDesc {
//           font-size: 12.5px;
//           line-height: 1.75;
//           color: #5c5c5c;
//           margin: 8px 0 0;
//         }

//         .twoCol {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 40px;
//         }

//         .half {
//           padding-top: 34px;
//         }

//         .eduItem {
//           margin-bottom: 16px;
//         }

//         .eduTop {
//           display: flex;
//           justify-content: space-between;
//           gap: 8px;
//         }

//         .eduSchool {
//           font-size: 13px;
//           font-weight: 700;
//         }

//         .eduDate {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 10.5px;
//           color: #8a8a8a;
//         }

//         .eduDegree {
//           font-size: 12px;
//           color: #6b6b6b;
//           margin-top: 3px;
//         }

//         .refItem {
//           margin-bottom: 16px;
//         }

//         .refName {
//           font-size: 13px;
//           font-weight: 700;
//         }

//         .refLine {
//           font-size: 11.5px;
//           color: #6b6b6b;
//           margin-top: 2px;
//         }

//         .skillsGrid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px 32px;
//         }

//         .skillTop {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 6px;
//         }

//         .skillName {
//           font-size: 12.5px;
//           font-weight: 600;
//         }

//         .skillPct {
//           font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
//           font-size: 11px;
//           color: #8a8a8a;
//         }

//         .skillBar {
//           height: 3px;
//           background: #e6e4de;
//         }

//         .skillFill {
//           height: 100%;
//           background: ${t.accentColor || "#2F4E9E"};
//         }

//         @media (max-width: 700px) {
//           .minimal-template { padding: 36px 24px; }
//           .twoCol { grid-template-columns: 1fr; }
//           .skillsGrid { grid-template-columns: 1fr; }
//           .ledgerRow { grid-template-columns: 1fr; gap: 6px; }
//         }

//         @media print {
//           .minimal-template { box-shadow: none; }
//         }
//       `}</style>
//     </div>
//   );
// }


























import React from "react";
import type { TemplateProps } from "../../types/Content";

// Minimal line icons - hairline weight to match the editorial aesthetic
const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function MinimalTemplate({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  // Find sections - support both "skills" and "ratedSkills"
  const contactSection = sections.find((s) => s.type === "custom" && s.id === "contact");
  const referencesSection = sections.find((s) => s.type === "references");
  const educationSection = sections.find((s) => s.type === "education");
  const experienceSection = sections.find((s) => s.type === "experience");
  // Support both "skills" and "ratedSkills" section types
  const skillsSection = sections.find((s) => s.type === "skills" || s.type === "ratedSkills");
  const aboutText = personalInfo.summary;

  const contactItems = contactSection?.items || [];

  const initials = personalInfo.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Get other custom sections
  const otherSections = sections.filter(s => 
    s.type === "custom" && s.id !== "contact"
  );

  return (
    <div className="minimal-template">
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="headerTop">
          {personalInfo.photoUrl ? (
            <img className="photo" src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          ) : (
            <div className="photoFallback">{initials || "U"}</div>
          )}
          <div className="nameBlock">
            <h1 className="name">{personalInfo.fullName}</h1>
            <div className="titleRow">
              <span className="titleTick" />
              <span className="title">{personalInfo.title || "PROFESSIONAL"}</span>
            </div>
          </div>
        </div>

        <div className="contactBar">
          {contactItems.length > 0
            ? contactItems.map((item, i) => {
                if (typeof item === "object" && item !== null && "label" in item && "description" in item) {
                  let icon = Icon.pin;
                  if (item.label === "phone") icon = Icon.phone;
                  else if (item.label === "email") icon = Icon.mail;
                  else if (item.label === "website" || item.label === "web") icon = Icon.globe;
                  else if (item.label === "location") icon = Icon.pin;
                  return (
                    <span className="contactItem" key={i}>
                      <span className="ic">{icon}</span>
                      {item.description}
                    </span>
                  );
                }
                return null;
              })
            : (
              <>
                {personalInfo.phone && (
                  <span className="contactItem"><span className="ic">{Icon.phone}</span>{personalInfo.phone}</span>
                )}
                {personalInfo.email && (
                  <span className="contactItem"><span className="ic">{Icon.mail}</span>{personalInfo.email}</span>
                )}
                {personalInfo.location && (
                  <span className="contactItem"><span className="ic">{Icon.pin}</span>{personalInfo.location}</span>
                )}
                {personalInfo.website && (
                  <span className="contactItem"><span className="ic">{Icon.globe}</span>{personalInfo.website}</span>
                )}
              </>
            )}
        </div>
      </header>

      <div className="rule" />

      {/* ================= BODY ================= */}
      <div className="body">
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
            <h2 className="sectionLabel">Experience</h2>
            <div className="ledger">
              {experienceSection.items.map((job, i) => (
                <div className="ledgerRow" key={i}>
                  <div className="ledgerDate">
                    <span className="dot" />
                    {job.start} — {job.end || "Present"}
                  </div>
                  <div className="ledgerMain">
                    <div className="jobTop">
                      <span className="jobTitle">{job.role || "Position"}</span>
                      <span className="jobCompany">{job.company}{job.location ? `, ${job.location}` : ""}</span>
                    </div>
                    {job.bullets && job.bullets.length > 0 && (
                      <div className="jobDesc">
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

        <div className="twoCol">
          {/* Education */}
          {educationSection && educationSection.items.length > 0 && (
            <section className="section half">
              <h2 className="sectionLabel">Education</h2>
              {educationSection.items.map((edu, i) => (
                <div className="eduItem" key={i}>
                  <div className="eduTop">
                    <span className="eduSchool">{edu.school}</span>
                    <span className="eduDate">{edu.start} – {edu.end}</span>
                  </div>
                  <div className="eduDegree">{edu.degree}</div>
                </div>
              ))}
            </section>
          )}

          {/* References */}
          {referencesSection && referencesSection.items.length > 0 && (
            <section className="section half">
              <h2 className="sectionLabel">References</h2>
              {referencesSection.items.map((ref, i) => (
                <div className="refItem" key={i}>
                  <div className="refName">{ref.name}</div>
                  {ref.phone && <div className="refLine">{ref.phone}</div>}
                  {ref.email && <div className="refLine">{ref.email}</div>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Other Custom Sections */}
        {otherSections.map((section) => (
          <section className="section" key={section.id}>
            <h2 className="sectionLabel">{section.title}</h2>
            {section.items.map((item, i) => {
              if (typeof item === 'object' && item !== null && 'description' in item) {
                return (
                  <div className="otherItem" key={i}>
                    {item.label && <div className="otherLabel">{item.label}</div>}
                    <div className="otherDesc">{item.description}</div>
                  </div>
                );
              }
              return null;
            })}
          </section>
        ))}

        {/* Skills - supports both "skills" and "ratedSkills" */}
        {skillsSection && skillsSection.items.length > 0 && (
          <section className="section">
            <h2 className="sectionLabel">Skills</h2>
            <div className="skillsGrid">
              {skillsSection.items.map((skill, i) => {
                // Handle string skills (from "skills" section)
                if (typeof skill === 'string') {
                  return (
                    <div className="skillRow" key={i}>
                      <div className="skillTop">
                        <span className="skillName">{skill}</span>
                        <span className="skillPct">100</span>
                      </div>
                      <div className="skillBar">
                        <div className="skillFill" style={{ width: '100%' }} />
                      </div>
                    </div>
                  );
                }
                // Handle object skills (from "ratedSkills" section)
                if (typeof skill === 'object' && skill !== null && 'name' in skill) {
                  return (
                    <div className="skillRow" key={i}>
                      <div className="skillTop">
                        <span className="skillName">{skill.name}</span>
                        <span className="skillPct">{skill.level || 100}</span>
                      </div>
                      <div className="skillBar">
                        <div className="skillFill" style={{ width: `${skill.level || 100}%` }} />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </section>
        )}
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

        .photo, .photoFallback {
          width: 64px;
          height: 64px;
          border-radius: 4px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .photoFallback {
          background: ${t.textColor || "#181818"};
          color: ${t.backgroundColor || "#FAFAF8"};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${t.headingFont || "Fraunces"}, serif;
          font-size: 22px;
          font-weight: 600;
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
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          color: #444;
          font-family: ${t.bodyFont || "JetBrains Mono"}, monospace;
        }

        .contactItem .ic {
          color: ${t.accentColor || "#2F4E9E"};
          display: flex;
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

        .otherItem {
          margin-bottom: 12px;
        }

        .otherLabel {
          font-size: 13px;
          font-weight: 700;
        }

        .otherDesc {
          font-size: 12px;
          color: #6b6b6b;
          margin-top: 2px;
        }

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