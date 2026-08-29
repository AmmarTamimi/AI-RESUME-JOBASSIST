// "use client";

// import React from "react";
// import type {
//   TemplateProps,
//   Section,
//   EducationItem,
//   ExperienceItem,
//   RatedSkillItem,
// } from "../../types/Content";

// /* ============================================================
//    HELPERS
// ============================================================ */

// function isSectionType<T extends Section["type"]>(
//   section: Section,
//   type: T
// ): section is Extract<Section, { type: T }> {
//   return section.type === type;
// }

// function findSection<T extends Section["type"]>(sections: Section[], type: T) {
//   return sections.find((section) => isSectionType(section, type));
// }

// /** Renders "2005 â€“ 2010" as a stacked 3-line date badge: start / â€” / end */
// function DateBadge({ start, end }: { start?: string; end?: string }) {
//   if (!start && !end) return null;
//   return (
//     <div className="dateBadge data-resume-root">
//       <span>{start || ""}</span>
//       <span className="dateDash">â€”</span>
//       <span>{end || "Present"}</span>
//     </div>
//   );
// }

// /* ============================================================
//    MAIN TEMPLATE
//    Matches the Figma export exactly:
//    - Header: circular photo (left) + name/title, contact block (right)
//    - Full-width divider
//    - Two-column body below the divider, separated by a vertical rule:
//        LEFT col  (232px): Profile, Education, Key Skills (2 sub-columns)
//        RIGHT col (232px): Employment
// ============================================================ */

// export default function MinimalTemplate3({ content, theme }: TemplateProps) {
//   const { personalInfo, sections } = content;

//   const education = findSection(sections, "education");
//   const experience = findSection(sections, "experience");
//   const skills = findSection(sections, "skills");
//   const ratedSkills = findSection(sections, "ratedSkills");
//   const contact = findSection(sections, "custom");

//   const name = personalInfo.fullName?.trim() || "Barry Lucero";
//   const title = personalInfo.title?.trim() || "Web-Designer";

//   const textColor = theme.textColor || "#212121";

//   // Merge flat skills + rated skills into one list of names, then split
//   // into two even columns ("Professional" / "Personal" per the design).
//   const allSkillNames: string[] = [
//     ...(skills?.items || []),
//     ...((ratedSkills?.items as RatedSkillItem[] | undefined)?.map((s) => s.name) || []),
//   ];
//   const skillsMid = Math.ceil(allSkillNames.length / 2);
//   const skillsColA = allSkillNames.slice(0, skillsMid);
//   const skillsColB = allSkillNames.slice(skillsMid);

//   const contactLines: string[] = [
//     personalInfo.location,
//     personalInfo.email,
//     personalInfo.website,
//     personalInfo.phone,
//     ...(contact?.items?.map((item) => String(item.description || "")) || []),
//   ].filter(Boolean) as string[];

//   return (
//     <div
//       className="figmaResume data-resume-root"
//       style={{
//         width: 595,
//         minHeight: 842,
//         backgroundColor: "#ffffff",
//       }}
//     >
//       {/* ===== HEADER: photo + name/title (left) â€” contact block (right) ===== */}
//       <header className="header">
//        {personalInfo.photoUrl &&  <div className="avatar data-resume-root">
//          <img src={personalInfo.photoUrl} alt={name} className="avatarImg" />
         
//         </div>}

//         <div className="nameBlock data-resume-root">
//           <div className="name data-resume-root">{name}</div>
//           <div className="profession data-resume-root">{title}</div>
//         </div>

//         {contactLines.length > 0 && (
//           <div className="contactBlock data-resume-root">
//             {contactLines.map((line, i) => (
//               <div className="contactLine data-resume-root" key={i}>
//                 {line}
//               </div>
//             ))}
//           </div>
//         )}
//       </header>

//       {/* ===== DIVIDER ===== */}
//       <div className="headerDivider data-resume-root" />

//       {/* ===== BODY: two columns separated by a vertical rule ===== */}
//       <div className="columns data-resume-root">
//         {/* -------- LEFT COLUMN -------- */}
//         <div className="col colLeft data-resume-root">
//           {personalInfo.summary && (
//             <section className="block">
//               <div className="blockLabel data-resume-root">Profile</div>
//               <p className="bodyText">{personalInfo.summary}</p>
//             </section>
//           )}

//           {education && education.items.length > 0 && (
//             <section className="block">
//               <div className="blockLabel data-resume-root">{education.title || "Education"}</div>
//               <div className="items data-resume-root">
//                 {education.items.map((edu: EducationItem, index) => (
//                   <div className="item data-resume-root" key={index}>
//                     <DateBadge start={edu.start} end={edu.end} />
//                     <div className="itemMain data-resume-root">
//                       <div className="itemTitle data-resume-root">{edu.school}</div>
//                       <p className="bodyText itemBody">
//                         {edu.degree}
//                         {edu.location ? ` â€” ${edu.location}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {(skillsColA.length > 0 || skillsColB.length > 0) && (
//             <section className="block">
//               <div className="blockLabel data-resume-root">Key Skills</div>
//               <div className="skillsRow data-resume-root">
//                 <div className="skillsCol data-resume-root">
//                   <div className="skillsColHeader data-resume-root">Professional</div>
//                   {skillsColA.map((s, i) => (
//                     <div className="skillItem data-resume-root" key={i}>
//                       {s}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="skillsCol data-resume-root">
//                   <div className="skillsColHeader data-resume-root">Personal</div>
//                   {skillsColB.map((s, i) => (
//                     <div className="skillItem data-resume-root" key={i}>
//                       {s}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>
//           )}
//         </div>

//         {/* -------- VERTICAL DIVIDER -------- */}
//         <div className="colDivider data-resume-root" />

//         {/* -------- RIGHT COLUMN -------- */}
//         <div className="col colRight data-resume-root">
//           {experience && experience.items.length > 0 && (
//             <section className="block">
//               <div className="blockLabel data-resume-root">{experience.title || "Employment"}</div>
//               <div className="items data-resume-root">
//                 {experience.items.map((job: ExperienceItem, index) => (
//                   <div className="item data-resume-root" key={index}>
//                     <DateBadge start={job.start} end={job.end} />
//                     <div className="itemMain data-resume-root">
//                       <div className="itemTitle data-resume-root">
//                         {job.role}
//                         {job.company ? ` at ${job.company}` : ""}
//                       </div>
//                       {job.bullets?.length > 0 && (
//                         <p className="bodyText itemBody">{job.bullets.join(" ")}</p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         /* =====================================================
//            PAGE
//         ====================================================== */
//         .figmaResume {
//           position: relative;
//           width: 595px;
//           min-height: 842px;
//           background: #ffffff;
//           color: ${textColor};
//           font-family: ${theme.bodyFont || "Hind"}, sans-serif;
//           box-sizing: border-box;
//           overflow: hidden;
//           padding: 0;
//           margin: 0;
//         }

//         .figmaResume *,
//         .figmaResume *::before,
//         .figmaResume *::after {
//           box-sizing: border-box;
//         }

//         /* =====================================================
//            HEADER â€” avatar + name/title left, contact block right
//            (matches SVG: avatar 40,40 98x98; name/title start xâ‰ˆ159;
//            contact block xâ‰ˆ362; divider at y=158, full width 40-555)
//         ====================================================== */
//         .header {
//           display: flex;
//           align-items: center;
//           gap: 20px;
//           padding: 40px 40px 0 40px;
//         }

//         .avatar {
//           flex: 0 0 auto;
//           width: 98px;
//           height: 98px;
//           border-radius: 50%;
//           overflow: hidden;
//           background: #eeeeee;
//         }

//         .avatarImg {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           display: block;
//         }

//         .avatarPlaceholder {
//           width: 100%;
//           height: 100%;
//           background: #ececec;
//         }

//         .nameBlock {
//           display: flex;
//           flex-direction: column;
//         }

//         .name {
//           font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
//           font-size: 24px;
//           line-height: 25px;
//           font-weight: 700;
//           color: ${textColor};
//           letter-spacing: 0.5px;
//         }

//         .profession {
//           margin-top: 12px;
//           font-family: ${theme.bodyFont || "Hind"}, sans-serif;
//           font-size: 11px;
//           line-height: 12px;
//           font-weight: 400;
//           color: ${textColor};
//           opacity: 0.6;
//         }

//         .contactBlock {
//           margin-left: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//           text-align: left;
//         }

//         .contactLine {
//           font-family: ${theme.bodyFont || "Hind"}, sans-serif;
//           font-size: 11px;
//           line-height: 19px;
//           font-weight: 400;
//           color: ${textColor};
//           opacity: 0.6;
//           white-space: nowrap;
//         }

//         /* =====================================================
//            DIVIDER (full width, y=158 in the Figma file)
//         ====================================================== */
//         .headerDivider {
//           margin: 20px 40px 0 40px;
//           height: 1px;
//           background: ${textColor};
//           opacity: 0.1;
//         }

//         /* =====================================================
//            TWO-COLUMN BODY (content starts 27px below the divider,
//            columns 232px each, 51px gap with a vertical rule in the
//            middle â€” matches x=40..272 and x=323..555)
//         ====================================================== */
//         .columns {
//           display: grid;
//           grid-template-columns: 232px 51px 232px;
//           margin: 27px 40px 40px 40px;
//         }

//         .col {
//           min-width: 0;
//         }

//         .colDivider {
//           justify-self: center;
//           width: 1px;
//           align-self: stretch;
//           min-height: 600px;
//           background: ${textColor};
//           opacity: 0.1;
//         }

//         /* =====================================================
//            SECTION BLOCK (label stacked ABOVE its content â€” not
//            side-by-side like a sidebar-label layout)
//         ====================================================== */
//         .block {
//           margin-top: 32px;
//         }

//         .block:first-child {
//           margin-top: 0;
//         }

//         .blockLabel {
//           font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
//           font-size: 13px;
//           line-height: 15px;
//           font-weight: 700;
//           letter-spacing: 0.2px;
//           color: ${textColor};
//           margin-bottom: 16px;
//         }

//         .bodyText {
//           margin: 0;
//           font-family: ${theme.bodyFont || "Hind"}, sans-serif;
//           font-size: 11px;
//           line-height: 19px;
//           font-weight: 400;
//           letter-spacing: -0.2px;
//           color: ${textColor};
//           opacity: 0.6;
//         }

//         /* =====================================================
//            ITEMS (education / experience) â€” a small stacked date
//            badge sits to the left, title + body sit to the right.
//            Matches: date column ~36-40px wide, main content indented.
//         ====================================================== */
//         .items {
//           display: flex;
//           flex-direction: column;
//         }

//         .item {
//           position: relative;
//           padding-left: 42px;
//           margin-bottom: 18px;
//         }

//         .item:last-child {
//           margin-bottom: 0;
//         }

//         .dateBadge {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 36px;
//           display: flex;
//           flex-direction: column;
//           font-family: ${theme.bodyFont || "Hind"}, sans-serif;
//           font-size: 10px;
//           line-height: 14px;
//           font-weight: 400;
//           color: ${textColor};
//           opacity: 0.5;
//         }

//         .dateDash {
//           opacity: 0.7;
//         }

//         .itemTitle {
//           font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
//           font-size: 11px;
//           line-height: 14px;
//           font-weight: 700;
//           color: ${textColor};
//         }

//         .itemBody {
//           margin-top: 8px;
//         }

//         /* =====================================================
//            KEY SKILLS â€” two sub-columns, no bullets
//         ====================================================== */
//         .skillsRow {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           column-gap: 16px;
//         }

//         .skillsColHeader {
//           font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
//           font-size: 11px;
//           line-height: 14px;
//           font-weight: 700;
//           color: ${textColor};
//           margin-bottom: 8px;
//         }

//         .skillItem {
//           font-family: ${theme.bodyFont || "Hind"}, sans-serif;
//           font-size: 11px;
//           line-height: 19px;
//           font-weight: 400;
//           letter-spacing: -0.2px;
//           color: ${textColor};
//           opacity: 0.6;
//         }

//         /* =====================================================
//            PRINT
//         ====================================================== */
//         @media print {
//           .figmaResume {
//             width: 595px;
//             height: 842px;
//             min-height: 842px;
//             overflow: hidden;
//           }
//         }

//         @media (max-width: 650px) {
//           .figmaResume {
//             width: 100%;
//             min-height: auto;
//             padding: 20px;
//           }
//           .header {
//             flex-wrap: wrap;
//             padding: 0;
//           }
//           .contactBlock {
//             margin-left: 0;
//             width: 100%;
//           }
//           .headerDivider {
//             margin: 20px 0 0 0;
//           }
//           .columns {
//             grid-template-columns: 1fr;
//             margin: 20px 0 0 0;
//           }
//           .colDivider {
//             display: none;
//           }
//           .col {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

















































"use client";

import React from "react";
import type {
  TemplateProps,
  Section,
  EducationItem,
  ExperienceItem,
  RatedSkillItem,
  CustomItem,
  ReferenceItem,
  LanguageItem,
  AchievementItem,
} from "../../types/Content";

/* ============================================================
   HELPERS
============================================================ */

function isSectionType<T extends Section["type"]>(
  section: Section,
  type: T
): section is Extract<Section, { type: T }> {
  return section.type === type;
}

function findSection<T extends Section["type"]>(sections: Section[], type: T) {
  return sections.find((section) => isSectionType(section, type));
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

/** Renders "2005 – 2010" as a stacked 3-line date badge: start / — / end */
function DateBadge({ start, end }: { start?: string; end?: string }) {
  if (!start && !end) return null;
  return (
    <div className="dateBadge">
      <span>{start || ""}</span>
      <span className="dateDash">—</span>
      <span>{end || "Present"}</span>
    </div>
  );
}

/* ============================================================
   MAIN TEMPLATE - FULL PAGE NO SCROLL
============================================================ */

export default function MinimalTemplate3({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;

  const education = findSection(sections, "education");
  const experience = findSection(sections, "experience");
  const skills = findSection(sections, "skills");
  const ratedSkills = findSection(sections, "ratedSkills");
  const contact = findSection(sections, "custom");
  const references = findSection(sections, "references");
  const languages = findSection(sections, "languages") || sections.find((s) => s.id === "languages");
  const achievements = findSection(sections, "achievements");
  const otherCustomSections = sections.filter(
    (s) => s.type === "custom" && s.id !== "contact"
  );

  const name = personalInfo.fullName?.trim() || "Barry Lucero";
  const title = personalInfo.title?.trim() || "Web-Designer";

  const textColor = theme.textColor || "#212121";
  const accentColor = theme.accentColor || "#212121";

  // Merge flat skills + rated skills into one list of names
  const allSkillNames: string[] = [
    ...(skills?.items || []),
    ...((ratedSkills?.items as RatedSkillItem[] | undefined)?.map((s) => s.name) || []),
  ];
  const skillsMid = Math.ceil(allSkillNames.length / 2);
  const skillsColA = allSkillNames.slice(0, skillsMid);
  const skillsColB = allSkillNames.slice(skillsMid);

  const contactLines: string[] = [
    personalInfo.location,
    personalInfo.email,
    personalInfo.website,
    personalInfo.phone,
    ...(contact?.items?.map((item) => {
      if (isCustomItem(item)) {
        return String(item.description || "");
      }
      return "";
    }) || []),
  ].filter(Boolean) as string[];

  return (
    <div className="figmaResume">
      {/* ===== HEADER ===== */}
      <header className="header">
        {personalInfo.photoUrl && (
          <div className="avatar">
            <img src={personalInfo.photoUrl} alt={name} className="avatarImg" />
          </div>
        )}

        <div className="nameBlock">
          <div className="name">{name}</div>
          <div className="profession">{title}</div>
        </div>

        {contactLines.length > 0 && (
          <div className="contactBlock">
            {contactLines.map((line, i) => (
              <div className="contactLine" key={i}>
                {line}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* ===== DIVIDER ===== */}
      <div className="headerDivider" />

      {/* ===== BODY: two columns ===== */}
      <div className="columns">
        {/* LEFT COLUMN */}
        <div className="col colLeft">
          {personalInfo.summary && (
            <section className="block">
              <div className="blockLabel">Profile</div>
              <p className="bodyText">{personalInfo.summary}</p>
            </section>
          )}

          {education && education.items.length > 0 && (
            <section className="block">
              <div className="blockLabel">{education.title || "Education"}</div>
              <div className="items">
                {education.items.map((edu: EducationItem, index) => (
                  <div className="item" key={index}>
                    <DateBadge start={edu.start} end={edu.end} />
                    <div className="itemMain">
                      <div className="itemTitle">{edu.school}</div>
                      <p className="bodyText itemBody">
                        {edu.degree}
                        {edu.location ? ` — ${edu.location}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {achievements && achievements.items.length > 0 && (
            <section className="block">
              <div className="blockLabel">{achievements.title || "Achievements"}</div>
              <div className="items">
                {achievements.items.map((item, index) => {
                  if (isAchievementItem(item)) {
                    return (
                      <div className="item" key={index}>
                        <div className="itemMain">
                          <div className="itemTitle">{item.title}</div>
                          {item.description && (
                            <p className="bodyText itemBody">{item.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  if (typeof item === 'string') {
                    return (
                      <div className="item" key={index}>
                        <div className="itemMain">
                          <div className="itemTitle">{item}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </section>
          )}

          {(skillsColA.length > 0 || skillsColB.length > 0) && (
            <section className="block">
              <div className="blockLabel">
                {skills?.title || ratedSkills?.title || "Key Skills"}
              </div>
              <div className="skillsRow">
                {skillsColA.length > 0 && (
                  <div className="skillsCol">
                    <div className="skillsColHeader">Professional</div>
                    {skillsColA.map((s, i) => (
                      <div className="skillItem" key={i}>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
                {skillsColB.length > 0 && (
                  <div className="skillsCol">
                    <div className="skillsColHeader">Personal</div>
                    {skillsColB.map((s, i) => (
                      <div className="skillItem" key={i}>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {languages && languages.items.length > 0 && (
            <section className="block">
              <div className="blockLabel">{languages.title || "Languages"}</div>
              <div className="items">
                {languages.items.map((item, index) => {
                  if (isLanguageItem(item)) {
                    return (
                      <div className="item" key={index}>
                        <div className="itemMain">
                          <div className="itemTitle">
                            {item.name}
                            {item.level && <span className="langLevel"> — {item.level}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="item" key={index}>
                      <div className="itemMain">
                        <div className="itemTitle">{String(item)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {references && references.items.length > 0 && (
            <section className="block">
              <div className="blockLabel">{references.title || "References"}</div>
              <div className="items">
                {references.items.map((ref: ReferenceItem, index) => (
                  <div className="item" key={index}>
                    <div className="itemMain">
                      <div className="itemTitle">{ref.name}</div>
                      {ref.address && <p className="bodyText itemBody">{ref.address}</p>}
                      {ref.phone && <p className="bodyText itemBody">Tel: {ref.phone}</p>}
                      {ref.email && <p className="bodyText itemBody">{ref.email}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {otherCustomSections.map((section) => (
            <section className="block" key={section.id}>
              <div className="blockLabel">{section.title || "Custom"}</div>
              <div className="items">
                {section.items.map((item, index) => {
                  if (isCustomItem(item)) {
                    return (
                      <div className="item" key={index}>
                        <div className="itemMain">
                          {item.label && <div className="itemTitle">{item.label}</div>}
                          {item.description && (
                            <p className="bodyText itemBody">{item.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  if (typeof item === 'string') {
                    return (
                      <div className="item" key={index}>
                        <div className="itemMain">
                          <p className="bodyText itemBody">{item}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </section>
          ))}
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="colDivider" />

        {/* RIGHT COLUMN */}
        <div className="col colRight">
          {experience && experience.items.length > 0 && (
            <section className="block">
              <div className="blockLabel">{experience.title || "Employment"}</div>
              <div className="items">
                {experience.items.map((job: ExperienceItem, index) => (
                  <div className="item" key={index}>
                    <DateBadge start={job.start} end={job.end} />
                    <div className="itemMain">
                      <div className="itemTitle">
                        {job.role}
                        {job.company ? ` at ${job.company}` : ""}
                      </div>
                      {job.bullets?.length > 0 && (
                        <p className="bodyText itemBody">{job.bullets.join(" ")}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        /* =====================================================
           FULL PAGE RESUME - NO SCROLLBAR
        ====================================================== */
        .figmaResume {
          width: 100%;
          height: 100%;
          max-height: 100%;
          background: #ffffff;
          color: ${textColor};
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          padding: 32px 40px;
          overflow: hidden;
          position: relative;
        }

        .figmaResume *,
        .figmaResume *::before,
        .figmaResume *::after {
          box-sizing: border-box;
        }

        /* ===== HEADER ===== */
        .header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 16px;
          flex-shrink: 0;
        }

        .avatar {
          flex: 0 0 auto;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          background: #eeeeee;
          border: 2px solid ${accentColor};
        }

        .avatarImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .nameBlock {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .name {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 26px;
          line-height: 1.1;
          font-weight: 700;
          color: ${textColor};
          letter-spacing: 0.5px;
        }

        .profession {
          margin-top: 4px;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 12px;
          line-height: 1.3;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.6;
        }

        .contactBlock {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: right;
          flex-shrink: 0;
        }

        .contactLine {
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 11px;
          line-height: 1.4;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.6;
          white-space: nowrap;
        }

        /* ===== DIVIDER ===== */
        .headerDivider {
          width: 100%;
          height: 1px;
          background: ${textColor};
          opacity: 0.1;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        /* ===== TWO-COLUMN BODY ===== */
        .columns {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .col {
          padding: 0 16px;
          overflow: hidden;
        }

        .colLeft {
          padding-left: 0;
          padding-right: 16px;
        }

        .colRight {
          padding-left: 16px;
          padding-right: 0;
        }

        .colDivider {
          width: 1px;
          background: ${textColor};
          opacity: 0.1;
          height: 100%;
        }

        /* ===== SECTION BLOCK ===== */
        .block {
          margin-top: 16px;
        }

        .block:first-child {
          margin-top: 0;
        }

        .blockLabel {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 12px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: ${textColor};
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .bodyText {
          margin: 0;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 11px;
          line-height: 1.6;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.7;
        }

        /* ===== ITEMS ===== */
        .items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .item {
          position: relative;
          padding-left: 40px;
        }

        .dateBadge {
          position: absolute;
          left: 0;
          top: 0;
          width: 34px;
          display: flex;
          flex-direction: column;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 10px;
          line-height: 1.3;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.5;
        }

        .dateDash {
          opacity: 0.7;
        }

        .itemTitle {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 12px;
          line-height: 1.3;
          font-weight: 700;
          color: ${textColor};
        }

        .itemBody {
          margin-top: 3px;
        }

        .langLevel {
          font-weight: 400;
          opacity: 0.7;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
        }

        /* ===== KEY SKILLS ===== */
        .skillsRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .skillsColHeader {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 10px;
          line-height: 1.2;
          font-weight: 700;
          color: ${textColor};
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          opacity: 0.6;
        }

        .skillItem {
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 11px;
          line-height: 1.6;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.7;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .figmaResume {
            padding: 20px;
            overflow-y: auto;
          }

          .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .contactBlock {
            text-align: left;
            width: 100%;
          }

          .contactLine {
            white-space: normal;
          }

          .columns {
            grid-template-columns: 1fr;
            gap: 0;
            overflow-y: auto;
          }

          .colDivider {
            display: none;
          }

          .col {
            padding: 0 !important;
          }

          .colRight {
            margin-top: 20px;
          }

          .skillsRow {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          .figmaResume {
            padding: 32px 40px;
            overflow: hidden;
            height: 100%;
          }

          .colDivider {
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
}