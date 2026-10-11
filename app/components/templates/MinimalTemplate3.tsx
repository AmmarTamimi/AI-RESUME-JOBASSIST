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

const isCustomItem = (item: any): item is CustomItem => {
  return item && typeof item === "object" && "label" in item;
};

const isLanguageItem = (item: any): item is LanguageItem => {
  return item && typeof item === "object" && "name" in item;
};

const isAchievementItem = (item: any): item is AchievementItem => {
  return item && typeof item === "object" && "title" in item;
};

/** Stacked date badge: start / — / end (kept for education + experience) */
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

/** Inline date format used for references and other simple rows */
function formatDate(start?: string, end?: string) {
  if (start && end) return `${start} — ${end}`;
  if (start) return `${start} — Present`;
  return end || "";
}

/* ============================================================
   MAIN TEMPLATE — full page, no scroll
============================================================ */

export default function MinimalTemplate3({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;

  const education = findSection(sections, "education");
  const experience = findSection(sections, "experience");
  const skills = findSection(sections, "skills");
  const ratedSkills = findSection(sections, "ratedSkills");
  const contact = findSection(sections, "custom");
  const references = findSection(sections, "references");
  const languages =
    findSection(sections, "languages") ||
    sections.find((s) => s.id === "languages");
  const achievements = findSection(sections, "achievements");
  const otherCustomSections = sections.filter(
    (s) => s.type === "custom" && s.id !== "contact",
  );

  const name = personalInfo.fullName?.trim() || "Your Name";
  const title = personalInfo.title?.trim() || "";

  const textColor = theme.textColor || "#212121";
  const accentColor = theme.accentColor || "#212121";

  // ---- SKILLS: merge flat + rated, split into two columns
  const allSkillNames: string[] = [
    ...(skills?.items || []),
    ...((ratedSkills?.items as RatedSkillItem[] | undefined)?.map(
      (s) => s.name,
    ) || []),
  ];
  const skillsMid = Math.ceil(allSkillNames.length / 2);
  const skillsColA = allSkillNames.slice(0, skillsMid);
  const skillsColB = allSkillNames.slice(skillsMid);

  // ---- CONTACT: prefer the contact section, fall back to personalInfo.
  //      Never render both — that's what caused the duplicate lines.
  const contactFromSection: string[] = (contact?.items || [])
    .map((item) => {
      if (isCustomItem(item)) {
        return String(item.description || "").trim();
      }
      return "";
    })
    .filter(Boolean);

  const contactFromPersonal: string[] = [
    personalInfo.location,
    personalInfo.email,
    personalInfo.website,
    personalInfo.phone,
  ]
    .map((v) => (v ? String(v).trim() : ""))
    .filter(Boolean);

  const contactLines: string[] =
    contactFromSection.length > 0 ? contactFromSection : contactFromPersonal;

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
          {title && <div className="profession">{title}</div>}
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
              <div className="blockLabel">
                {education.title || "Education"}
              </div>
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
              <div className="blockLabel">
                {achievements.title || "Achievements"}
              </div>
              <div className="items">
                {achievements.items.map((item, index) => {
                  if (isAchievementItem(item)) {
                    return (
                      <div className="item" key={index}>
                        <div className="itemMain">
                          <div className="itemTitle">{item.title}</div>
                          {item.description && (
                            <p className="bodyText itemBody">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  if (typeof item === "string") {
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
                            {item.level && (
                              <span className="langLevel"> — {item.level}</span>
                            )}
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

          {/* REFERENCES — now aligned to the same grid as Education
              (date badge column + main content), even when there is
              no date; the badge column stays reserved for alignment */}
          {references && references.items.length > 0 && (
            <section className="block">
              <div className="blockLabel">
                {references.title || "References"}
              </div>
              <div className="items">
                {references.items.map((ref: ReferenceItem, index) => (
                  <div className="item" key={index}>
                    <DateBadge start={undefined} end={undefined} />
                    <div className="itemMain">
                      <div className="itemTitle">{ref.name}</div>
                      {ref.address && (
                        <p className="bodyText itemBody">{ref.address}</p>
                      )}
                      {ref.phone && (
                        <p className="bodyText itemBody">
                          Tel: {ref.phone}
                        </p>
                      )}
                      {ref.email && (
                        <p className="bodyText itemBody">{ref.email}</p>
                      )}
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
                          {item.label && (
                            <div className="itemTitle">{item.label}</div>
                          )}
                          {item.description && (
                            <p className="bodyText itemBody">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  if (typeof item === "string") {
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
              <div className="blockLabel">
                {experience.title || "Employment"}
              </div>
              <div className="items">
                {experience.items.map((job: ExperienceItem, index) => (
                  <div className="item" key={index}>
                    <DateBadge start={job.start} end={job.end} />
                    <div className="itemMain">
                      <div className="itemTitle">
                        {job.role}
                        {job.company ? ` at ${job.company}` : ""}
                      </div>
                      {job.bullets && job.bullets.length > 0 && (
                        <p className="bodyText itemBody">
                          {job.bullets.join(" ")}
                        </p>
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
           PAGE — fills the A4 canvas
        ====================================================== */
        .figmaResume {
          width: 100%;
          height: 100%;
          min-height: 1123px;
          background: #ffffff;
          color: ${textColor};
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          padding: 48px 52px;
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
          gap: 24px;
          padding-bottom: 22px;
          flex-shrink: 0;
        }

        .avatar {
          flex: 0 0 auto;
          width: 96px;
          height: 96px;
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
          font-size: 30px;
          line-height: 1.1;
          font-weight: 700;
          color: ${textColor};
          letter-spacing: 0.5px;
        }

        .profession {
          margin-top: 6px;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 13px;
          line-height: 1.35;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.65;
        }

        .contactBlock {
          display: flex;
          flex-direction: column;
          gap: 3px;
          text-align: right;
          flex-shrink: 0;
        }

        .contactLine {
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 12px;
          line-height: 1.5;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.65;
          white-space: nowrap;
        }

        /* ===== DIVIDER ===== */
        .headerDivider {
          width: 100%;
          height: 1px;
          background: ${textColor};
          opacity: 0.12;
          margin-bottom: 26px;
          flex-shrink: 0;
        }

        /* ===== TWO-COLUMN BODY ===== */
        .columns {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0;
          flex: 1;
          min-height: 0;
        }

        .col {
          padding: 0 22px;
          min-width: 0;
        }

        .colLeft {
          padding-left: 0;
          padding-right: 22px;
        }

        .colRight {
          padding-left: 22px;
          padding-right: 0;
        }

        .colDivider {
          width: 1px;
          background: ${textColor};
          opacity: 0.12;
          height: 100%;
        }

        /* ===== SECTION BLOCK ===== */
        .block {
          margin-top: 26px;
        }

        .block:first-child {
          margin-top: 0;
        }

        .blockLabel {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 13px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0.6px;
          color: ${textColor};
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .bodyText {
          margin: 0;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 12px;
          line-height: 1.7;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.72;
        }

        /* ===== ITEMS =====
           .dateBadge is 38px wide; .item has 46px left padding so
           education, experience, and references all line up on the
           same vertical grid. */
        .items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .item {
          position: relative;
          padding-left: 46px;
        }

        .dateBadge {
          position: absolute;
          left: 0;
          top: 0;
          width: 38px;
          display: flex;
          flex-direction: column;
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 10.5px;
          line-height: 1.4;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.55;
          text-align: left;
        }

        .dateDash {
          opacity: 0.7;
        }

        .itemMain {
          min-width: 0;
        }

        .itemTitle {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 12.5px;
          line-height: 1.35;
          font-weight: 700;
          color: ${textColor};
          overflow-wrap: anywhere;
        }

        .itemBody {
          margin-top: 4px;
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
          gap: 20px;
        }

        .skillsColHeader {
          font-family: ${theme.headingFont || "'IBM Plex Sans'"}, sans-serif;
          font-size: 10.5px;
          line-height: 1.2;
          font-weight: 700;
          color: ${textColor};
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          opacity: 0.6;
        }

        .skillItem {
          font-family: ${theme.bodyFont || "Hind"}, sans-serif;
          font-size: 12px;
          line-height: 1.75;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.72;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .figmaResume {
            padding: 24px 20px;
            min-height: auto;
            overflow-y: auto;
          }

          .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
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
          }

          .colDivider {
            display: none;
          }

          .col {
            padding: 0 !important;
          }

          .colRight {
            margin-top: 24px;
          }

          .skillsRow {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          .figmaResume {
            padding: 48px 52px;
            overflow: hidden;
            height: 100%;
            min-height: 297mm;
          }
        }
      `}</style>
    </div>
  );
}