"use client";

import React from "react";
import type {
  TemplateProps,
  Section,
  EducationItem,
  ExperienceItem,
  RatedSkillItem,
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
   MAIN TEMPLATE
   Matches the Figma export exactly:
   - Header: circular photo (left) + name/title, contact block (right)
   - Full-width divider
   - Two-column body below the divider, separated by a vertical rule:
       LEFT col  (232px): Profile, Education, Key Skills (2 sub-columns)
       RIGHT col (232px): Employment
============================================================ */

export default function MinimalTemplate3({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;

  const education = findSection(sections, "education");
  const experience = findSection(sections, "experience");
  const skills = findSection(sections, "skills");
  const ratedSkills = findSection(sections, "ratedSkills");
  const contact = findSection(sections, "custom");

  const name = personalInfo.fullName?.trim() || "Barry Lucero";
  const title = personalInfo.title?.trim() || "Web-Designer";

  const textColor = theme.textColor || "#212121";

  // Merge flat skills + rated skills into one list of names, then split
  // into two even columns ("Professional" / "Personal" per the design).
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
    ...(contact?.items?.map((item) => String(item.description || "")) || []),
  ].filter(Boolean) as string[];

  return (
    <div
      className="figmaResume"
      style={{
        width: 595,
        minHeight: 842,
        backgroundColor: "#ffffff",
      }}
    >
      {/* ===== HEADER: photo + name/title (left) — contact block (right) ===== */}
      <header className="header">
       {personalInfo.photoUrl &&  <div className="avatar">
         <img src={personalInfo.photoUrl} alt={name} className="avatarImg" />
         
        </div>}

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

      {/* ===== BODY: two columns separated by a vertical rule ===== */}
      <div className="columns">
        {/* -------- LEFT COLUMN -------- */}
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

          {(skillsColA.length > 0 || skillsColB.length > 0) && (
            <section className="block">
              <div className="blockLabel">Key Skills</div>
              <div className="skillsRow">
                <div className="skillsCol">
                  <div className="skillsColHeader">Professional</div>
                  {skillsColA.map((s, i) => (
                    <div className="skillItem" key={i}>
                      {s}
                    </div>
                  ))}
                </div>
                <div className="skillsCol">
                  <div className="skillsColHeader">Personal</div>
                  {skillsColB.map((s, i) => (
                    <div className="skillItem" key={i}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* -------- VERTICAL DIVIDER -------- */}
        <div className="colDivider" />

        {/* -------- RIGHT COLUMN -------- */}
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
           PAGE
        ====================================================== */
        .figmaResume {
          position: relative;
          width: 595px;
          min-height: 842px;
          background: #ffffff;
          color: ${textColor};
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          box-sizing: border-box;
          overflow: hidden;
          padding: 0;
          margin: 0;
        }

        .figmaResume *,
        .figmaResume *::before,
        .figmaResume *::after {
          box-sizing: border-box;
        }

        /* =====================================================
           HEADER — avatar + name/title left, contact block right
           (matches SVG: avatar 40,40 98x98; name/title start x≈159;
           contact block x≈362; divider at y=158, full width 40-555)
        ====================================================== */
        .header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 40px 40px 0 40px;
        }

        .avatar {
          flex: 0 0 auto;
          width: 98px;
          height: 98px;
          border-radius: 50%;
          overflow: hidden;
          background: #eeeeee;
        }

        .avatarImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .avatarPlaceholder {
          width: 100%;
          height: 100%;
          background: #ececec;
        }

        .nameBlock {
          display: flex;
          flex-direction: column;
        }

        .name {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 24px;
          line-height: 25px;
          font-weight: 700;
          color: ${textColor};
          letter-spacing: 0.5px;
        }

        .profession {
          margin-top: 12px;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 11px;
          line-height: 12px;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.6;
        }

        .contactBlock {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }

        .contactLine {
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 11px;
          line-height: 19px;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.6;
          white-space: nowrap;
        }

        /* =====================================================
           DIVIDER (full width, y=158 in the Figma file)
        ====================================================== */
        .headerDivider {
          margin: 20px 40px 0 40px;
          height: 1px;
          background: ${textColor};
          opacity: 0.1;
        }

        /* =====================================================
           TWO-COLUMN BODY (content starts 27px below the divider,
           columns 232px each, 51px gap with a vertical rule in the
           middle — matches x=40..272 and x=323..555)
        ====================================================== */
        .columns {
          display: grid;
          grid-template-columns: 232px 51px 232px;
          margin: 27px 40px 40px 40px;
        }

        .col {
          min-width: 0;
        }

        .colDivider {
          justify-self: center;
          width: 1px;
          align-self: stretch;
          min-height: 600px;
          background: ${textColor};
          opacity: 0.1;
        }

        /* =====================================================
           SECTION BLOCK (label stacked ABOVE its content — not
           side-by-side like a sidebar-label layout)
        ====================================================== */
        .block {
          margin-top: 32px;
        }

        .block:first-child {
          margin-top: 0;
        }

        .blockLabel {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 13px;
          line-height: 15px;
          font-weight: 700;
          letter-spacing: 0.2px;
          color: ${textColor};
          margin-bottom: 16px;
        }

        .bodyText {
          margin: 0;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 11px;
          line-height: 19px;
          font-weight: 400;
          letter-spacing: -0.2px;
          color: ${textColor};
          opacity: 0.6;
        }

        /* =====================================================
           ITEMS (education / experience) — a small stacked date
           badge sits to the left, title + body sit to the right.
           Matches: date column ~36-40px wide, main content indented.
        ====================================================== */
        .items {
          display: flex;
          flex-direction: column;
        }

        .item {
          position: relative;
          padding-left: 42px;
          margin-bottom: 18px;
        }

        .item:last-child {
          margin-bottom: 0;
        }

        .dateBadge {
          position: absolute;
          left: 0;
          top: 0;
          width: 36px;
          display: flex;
          flex-direction: column;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 10px;
          line-height: 14px;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.5;
        }

        .dateDash {
          opacity: 0.7;
        }

        .itemTitle {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 11px;
          line-height: 14px;
          font-weight: 700;
          color: ${textColor};
        }

        .itemBody {
          margin-top: 8px;
        }

        /* =====================================================
           KEY SKILLS — two sub-columns, no bullets
        ====================================================== */
        .skillsRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 16px;
        }

        .skillsColHeader {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 11px;
          line-height: 14px;
          font-weight: 700;
          color: ${textColor};
          margin-bottom: 8px;
        }

        .skillItem {
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 11px;
          line-height: 19px;
          font-weight: 400;
          letter-spacing: -0.2px;
          color: ${textColor};
          opacity: 0.6;
        }

        /* =====================================================
           PRINT
        ====================================================== */
        @media print {
          .figmaResume {
            width: 595px;
            height: 842px;
            min-height: 842px;
            overflow: hidden;
          }
        }

        @media (max-width: 650px) {
          .figmaResume {
            width: 100%;
            min-height: auto;
            padding: 20px;
          }
          .header {
            flex-wrap: wrap;
            padding: 0;
          }
          .contactBlock {
            margin-left: 0;
            width: 100%;
          }
          .headerDivider {
            margin: 20px 0 0 0;
          }
          .columns {
            grid-template-columns: 1fr;
            margin: 20px 0 0 0;
          }
          .colDivider {
            display: none;
          }
          .col {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}