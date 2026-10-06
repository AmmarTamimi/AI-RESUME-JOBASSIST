import React from "react";
import type {
  TemplateProps,
  CustomItem,
  ReferenceItem,
  LanguageItem,
  AchievementItem,
  RatedSkillItem,
} from "../../types/Content";

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
};

function value(object: unknown, key: string): string {
  const v = record(object)[key];
  if (v === undefined || v === null) return "";
  return String(v);
}

function getSection(sections: any[], type: string) {
  return sections.find((section) => section.type === type);
}

function formatDate(start?: string, end?: string) {
  if (start && end) return `${start} - ${end}`;
  if (start) return `${start} - Present`;
  return end || "";
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

export default function ModernTemplate3({ content, theme }: TemplateProps) {
  const { personalInfo, sections } = content;

  const contactSection = sections.find(
    (s) => s.type === "custom" && s.id === "contact",
  );
  const contactItems = contactSection?.items || [];

  const education = getSection(sections, "education");
  const experience = getSection(sections, "experience");
  const referencesSection = getSection(sections, "references");
  const ratedSkillsSection = sections.find((s) => s.type === "ratedSkills");
  const skillsSection = sections.find((s) => s.type === "skills");
  const languagesSection = sections.find(
    (s) => s.type === "languages" || s.id === "languages",
  );
  const achievementsSection = sections.find((s) => s.type === "achievements");
  const otherCustomSections = sections.filter(
    (s) => s.type === "custom" && s.id !== "contact",
  );

  const fullName = personalInfo.fullName?.trim() || "JONATHAN PATTERSON";
  const nameParts = fullName.split(/\s+/);
  const firstName =
    nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : nameParts[0];
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  const primary = theme.primaryColor || "#37b3c3";
  const accent = theme.accentColor || "#91d9f8";
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
      {/* HEADER */}
      <div className="m3-header data-resume-root">
        <div className="m3-name data-resume-root">
          <div className="m3-first-name data-resume-root">{firstName}</div>
          {lastName && (
            <div className="m3-last-name data-resume-root">{lastName}</div>
          )}
        </div>
        <div className="m3-title data-resume-root">
          {personalInfo.title || "Art Director"}
        </div>
      </div>

      {/* LEFT SIDEBAR */}
      <aside className="m3-sidebar">
        {personalInfo.photoUrl && (
          <div className="m3-photo data-resume-root">
            <div className="m3-photo-inner data-resume-root">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Profile"}
              />
            </div>
          </div>
        )}

        {education?.items?.length > 0 && (
          <SidebarSection title={education.title || "EDUCATION"}>
            {education.items.map((item: any, index: number) => {
              const edu = record(item);
              return (
                <div className="m3-education data-resume-root" key={index}>
                  <div className="m3-edu-date data-resume-root">
                    {formatDate(value(edu, "start"), value(edu, "end"))}
                  </div>
                  <div className="m3-edu-degree data-resume-root">
                    {value(edu, "degree")}
                  </div>
                  <div className="m3-edu-school data-resume-root">
                    {value(edu, "school")}
                  </div>
                  {value(edu, "description") && (
                    <div className="m3-edu-description data-resume-root">
                      • {value(edu, "description")}
                    </div>
                  )}
                </div>
              );
            })}
          </SidebarSection>
        )}

        {(languagesSection?.items?.length ?? 0) > 0 && (
          <SidebarSection title={languagesSection?.title || "LANGUAGES"}>
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

        {referencesSection?.items?.length > 0 && (
          <SidebarSection title={referencesSection.title || "REFERENCES"}>
            {referencesSection.items.map(
              (ref: ReferenceItem, index: number) => (
                <div className="m3-reference data-resume-root" key={index}>
                  <div className="m3-reference-name data-resume-root">
                    {ref.name}
                  </div>
                  {ref.address && (
                    <div className="m3-reference-detail data-resume-root">
                      {ref.address}
                    </div>
                  )}
                  {ref.phone && (
                    <div className="m3-reference-detail data-resume-root">
                      Tel: {ref.phone}
                    </div>
                  )}
                  {ref.email && (
                    <div className="m3-reference-detail data-resume-root">
                      Email: {ref.email}
                    </div>
                  )}
                </div>
              ),
            )}
          </SidebarSection>
        )}

        <SidebarSection title="CONTACT">
          <div className="m3-contact data-resume-root">
            {contactItems.map((item, i) => {
              if (isCustomItem(item)) {
                let icon = Icon.pin;
                if (item.label === "phone") icon = Icon.phone;
                else if (item.label === "email") icon = Icon.mail;
                else if (item.label === "web" || item.label === "website")
                  icon = Icon.globe;

                return (
                  <div className="m3-contact-row data-resume-root" key={i}>
                    <span className="m3-contact-icon">{icon}</span>
                    <span className="m3-contact-value">
                      {item.description}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </SidebarSection>
      </aside>

      {/* MAIN */}
      <main className="m3-main">
        {personalInfo.summary && (
          <MainSection title="PROFILE INFO">
            <p className="m3-profile">{personalInfo.summary}</p>
          </MainSection>
        )}

        {experience?.items?.length > 0 && (
          <MainSection title={experience.title || "EXPERIENCE"}>
            <div className="m3-experience data-resume-root">
              {experience.items.map((item: any, index: number) => {
                const job = record(item);
                const bullets = Array.isArray(job.bullets) ? job.bullets : [];
                return (
                  <div
                    className="m3-experience-item data-resume-root"
                    key={index}
                  >
                    <div className="m3-timeline data-resume-root">
                      <span className="m3-circle" />
                      {index < experience.items.length - 1 && (
                        <span className="m3-line" />
                      )}
                    </div>
                    <div className="m3-job data-resume-root">
                      <div className="m3-job-header data-resume-root">
                        <div>
                          <div className="m3-role data-resume-root">
                            {value(job, "role")}
                          </div>
                          <div className="m3-company data-resume-root">
                            {value(job, "company")}
                          </div>
                        </div>
                        <div className="m3-date data-resume-root">
                          {formatDate(value(job, "start"), value(job, "end"))}
                        </div>
                      </div>
                      {value(job, "description") && (
                        <p className="m3-job-description">
                          {value(job, "description")}
                        </p>
                      )}
                      {bullets.length > 0 && (
                        <ul className="m3-job-bullets">
                          {bullets.map(
                            (bullet: string, bulletIndex: number) => (
                              <li key={bulletIndex}>{bullet}</li>
                            ),
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </MainSection>
        )}

        {ratedSkillsSection?.items && ratedSkillsSection.items.length > 0 && (
          <MainSection title={ratedSkillsSection.title || "SKILLS"}>
            <div className="m3-skills-grid">
              {ratedSkillsSection.items.map(
                (skill: RatedSkillItem, index: number) => (
                  <div key={index} className="m3-skill-line">
                    <span className="m3-skill-line-name">{skill.name}</span>
                    <span className="m3-skill-line-pct">
                      {skill.level || 50}%
                    </span>
                  </div>
                ),
              )}
            </div>
          </MainSection>
        )}

        {(skillsSection?.items?.length ?? 0) > 0 && (
          <MainSection title={skillsSection?.title || "TECHNICAL SKILLS"}>
            <div className="m3-skills-tags-main">
              {skillsSection?.items.map((skill: string, index: number) => (
                <span key={index} className="m3-skill-tag-main">
                  {skill}
                </span>
              ))}
            </div>
          </MainSection>
        )}

        {(achievementsSection?.items?.length ?? 0) > 0 && (
          <MainSection title={achievementsSection?.title || "ACHIEVEMENTS"}>
            <div className="m3-achievements data-resume-root">
              {achievementsSection?.items.map((item: any, index: number) => {
                if (isAchievementItem(item)) {
                  return (
                    <div
                      className="m3-achievement data-resume-root"
                      key={index}
                    >
                      <span className="m3-achievement-dot">•</span>
                      <div>
                        {value(item, "year") && (
                          <div className="m3-achievement-year data-resume-root">
                            {value(item, "year")}
                          </div>
                        )}
                        <div className="m3-achievement-title data-resume-root">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="m3-achievement-description data-resume-root">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                if (typeof item === "string") {
                  return (
                    <div
                      className="m3-achievement data-resume-root"
                      key={index}
                    >
                      <span className="m3-achievement-dot">•</span>
                      <div>
                        <div className="m3-achievement-title data-resume-root">
                          {item}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </MainSection>
        )}

        {otherCustomSections.map((section) => (
          <MainSection key={section.id} title={section.title || "CUSTOM"}>
            <div className="m3-custom-items data-resume-root">
              {section.items.map((item, index) => {
                if (isCustomItem(item)) {
                  return (
                    <div
                      className="m3-custom-item data-resume-root"
                      key={index}
                    >
                      {item.label && (
                        <div className="m3-custom-label data-resume-root">
                          {item.label}
                        </div>
                      )}
                      {item.description && (
                        <div className="m3-custom-description data-resume-root">
                          {item.description}
                        </div>
                      )}
                    </div>
                  );
                }
                if (typeof item === "string") {
                  return (
                    <div
                      className="m3-custom-item data-resume-root"
                      key={index}
                    >
                      <div className="m3-custom-description data-resume-root">
                        {item}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </MainSection>
        ))}

        <div className="m3-bottom-spacer" aria-hidden="true" />
      </main>

      <style jsx>{`
        /* ====================================================
           BASE
        ==================================================== */
        .modern3 {
          position: relative;
          width: 100%;
          min-height: 1123px;
          background: #ffffff;
          color: #414141;
          font-family: "Montserrat", Arial, sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .modern3 * {
          box-sizing: border-box;
        }

        /* ====================================================
           HEADER
        ==================================================== */
        .m3-header {
          height: 200px;
          flex-shrink: 0;
          width: 100%;
          background: var(--m3-primary);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          padding-right: 32px;
          padding-bottom: 24px;
        }
        .m3-name {
          color: #ffffff;
          text-align: right;
          text-transform: uppercase;
          font-family: "Montserrat", Arial, sans-serif;
          font-size: 38px;
          line-height: 0.95;
          letter-spacing: 1.8px;
        }
        .m3-first-name {
          font-weight: 300;
        }
        .m3-last-name {
          font-weight: 700;
          letter-spacing: 1.2px;
        }
        .m3-title {
          margin-top: 18px;
          color: #ffffff;
          font-family: "Montserrat", Arial, sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        /* ====================================================
           SIDEBAR
        ==================================================== */
        .m3-sidebar {
          position: absolute;
          left: 24px;
          top: 26px;
          width: 220px;
          min-height: calc(100% - 26px);
          background: var(--m3-accent);
          border: 3px solid var(--m3-accent);
          border-radius: 110px 110px 0 0;
          padding: 230px 24px 26px;
          z-index: 10;
          overflow: visible;
          word-wrap: break-word;
          overflow-wrap: anywhere;
          display: flex;
          flex-direction: column;
        }

        .m3-photo {
          position: absolute;
          left: 0;
          top: 0;
          width: 214px;
          height: 214px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .m3-photo-inner {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: #808080;
          border: 13px solid #dedede;
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
          margin: 0 0 28px 0;
          width: 100%;
          max-width: 100%;
          overflow: visible;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .m3-sidebar-section:last-child {
          margin-bottom: 0;
        }
        .m3-sidebar-heading {
          display: flex;
          align-items: center;
          height: 18px;
          margin-bottom: 14px;
          width: 100%;
          flex-shrink: 0;
        }
        .m3-sidebar-heading span {
          flex: 0 0 auto;
          color: #3d3d3d;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }
        .m3-sidebar-heading::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #a9a9a9;
          margin-left: 14px;
          min-width: 10px;
        }

        .m3-education {
          margin-bottom: 16px;
          font-family: Arial, sans-serif;
          color: #4d4d4d;
          width: 100%;
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-edu-date {
          font-size: 11px;
          line-height: 1.3;
          margin-bottom: 3px;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-edu-degree {
          font-size: 10.5px;
          line-height: 1.35;
          font-weight: 800;
          text-transform: uppercase;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-edu-school {
          font-size: 10.5px;
          line-height: 1.35;
          font-weight: 800;
          text-transform: uppercase;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-edu-description {
          margin-top: 5px;
          font-size: 10.5px;
          line-height: 1.45;
          color: #646464;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }

        .m3-bullet-list {
          list-style: none;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          font-size: 11px;
          line-height: 1.9;
          color: #505050;
          width: 100%;
          max-width: 100%;
        }
        .m3-bullet-list li {
          position: relative;
          padding-left: 13px;
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

        .m3-reference {
          margin-bottom: 16px;
          font-family: Arial, sans-serif;
          color: #4d4d4d;
          width: 100%;
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-reference-name {
          font-size: 10.5px;
          font-weight: 800;
          color: #3d3d3d;
          text-transform: uppercase;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-reference-detail {
          font-size: 9.8px;
          line-height: 1.55;
          color: #5a5a5a;
          margin-top: 2px;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }

        /* ====================================================
           CONTACT — more breathing room
        ==================================================== */
        .m3-contact {
          display: flex;
          flex-direction: column;
          gap: 14px;                    /* was 10px */
          width: 100%;
          max-width: 100%;
        }
        .m3-contact-row {
          display: grid;
          grid-template-columns: 16px minmax(0, 1fr);
          column-gap: 10px;             /* was 9px */
          align-items: flex-start;
          color: #4d4d4d;
          font-family: Arial, sans-serif;
          font-size: 10.5px;
          line-height: 1.5;             /* was 1.4 */
          width: 100%;
          max-width: 100%;
        }
        .m3-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          color: #4d4d4d;
          margin-top: 2px;              /* was 1px */
        }
        .m3-contact-icon svg {
          width: 12px;
          height: 12px;
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
           MAIN — extra top padding pushes first section down
        ==================================================== */
        .m3-main {
          width: 100%;
          flex: 1 1 auto;
          min-height: 923px;
          padding: 44px 36px 40px 260px;   /* was 28px top → 44px */
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: relative;
        }

        .m3-bottom-spacer {
          flex: 1 1 auto;
          min-height: 0;
          width: 100%;
        }

        /* ====================================================
           MAIN SECTION — more gap between sections
        ==================================================== */
        .m3-main-section {
          width: 100%;
          margin-bottom: 40px;             /* was 32px */
          flex: 0 0 auto;
          position: relative;
          z-index: 1;
        }
        .m3-main-section:last-of-type {
          margin-bottom: 0;
        }
        /* Extra space above the Experience section, to breathe
           after the header and to line up visually with the
           sidebar's CONTACT block */
        .m3-main-section + .m3-main-section {
          margin-top: 12px;
        }
        .m3-main-heading {
          display: flex;
          align-items: center;
          width: 100%;
          height: 20px;
          margin-bottom: 18px;             /* was 16px */
          flex-shrink: 0;
        }
        .m3-main-heading span {
          flex: 0 0 auto;
          color: #3b3b3b;
          font-family: "Montserrat", Arial, sans-serif;
          font-size: 14.5px;
          font-weight: 800;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }
        .m3-main-heading::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #aaaaaa;
          margin-left: 22px;
        }

        /* ====================================================
           PROFILE
        ==================================================== */
        .m3-profile {
          margin: 0;
          color: #5a5a5a;
          font-family: Arial, sans-serif;
          font-size: 11.5px;
          line-height: 1.8;               /* was 1.75 */
          text-align: left;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }

        /* ====================================================
           EXPERIENCE
        ==================================================== */
        .m3-experience {
          width: 100%;
        }
        .m3-experience-item {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr);
          column-gap: 10px;
          position: relative;
          min-height: 100px;
        }
        .m3-experience-item + .m3-experience-item {
          margin-top: 16px;               /* extra gap between jobs */
        }
        .m3-timeline {
          position: relative;
          width: 24px;
          min-height: 100%;
        }
        .m3-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          border: 1.5px solid #333333;
          border-radius: 50%;
          background: #ffffff;
          z-index: 2;
        }
        .m3-line {
          position: absolute;
          top: 15px;
          bottom: -1px;
          left: 7px;
          width: 1.2px;
          background: #444444;
        }
        .m3-job {
          min-width: 0;
          padding-bottom: 24px;
        }
        .m3-job-header {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          column-gap: 12px;
        }
        .m3-role {
          color: #353535;
          font-family: Arial, sans-serif;
          font-size: 11px;
          line-height: 1.3;
          font-weight: 800;
          text-transform: uppercase;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-company {
          margin-top: 2px;
          color: #353535;
          font-family: Arial, sans-serif;
          font-size: 10.5px;
          line-height: 1.3;
          font-weight: 800;
          text-transform: uppercase;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-date {
          flex-shrink: 0;
          color: #676767;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.3;
          white-space: nowrap;
        }
        .m3-job-description {
          margin: 8px 0 0;                /* was 6px */
          color: #5c5c5c;
          font-family: Arial, sans-serif;
          font-size: 11px;
          line-height: 1.7;               /* was 1.65 */
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-job-bullets {
          margin: 8px 0 0;                /* was 6px */
          padding: 0;
          list-style: none;
          color: #5c5c5c;
          font-family: Arial, sans-serif;
          font-size: 11px;
          line-height: 1.7;               /* was 1.65 */
        }
        .m3-job-bullets li {
          margin: 0 0 5px 0;              /* was 3px */
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }

        /* ====================================================
           SKILLS GRID
        ==================================================== */
        .m3-skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 30px;                    /* was 10px */
          width: 100%;
        }
        .m3-skill-line {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: Arial, sans-serif;
          font-size: 11.5px;
          line-height: 1.6;
          color: #5a5a5a;
          border-bottom: 1px dotted #d0d0d0;
          padding-bottom: 6px;
          min-width: 0;
          gap: 8px;
        }
        .m3-skill-line-name {
          font-weight: 600;
          color: #454545;
          word-wrap: break-word;
          overflow-wrap: anywhere;
          min-width: 0;
        }
        .m3-skill-line-pct {
          color: #8a8a8a;
          font-weight: 700;
          flex-shrink: 0;
          margin-left: 10px;
        }

        /* ====================================================
           TECHNICAL SKILLS TAGS
        ==================================================== */
        .m3-skills-tags-main {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .m3-skill-tag-main {
          background: rgba(0, 0, 0, 0.06);
          color: #3d3d3d;
          padding: 5px 14px;
          border-radius: 14px;
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          word-wrap: break-word;
        }

        /* ====================================================
           ACHIEVEMENTS
        ==================================================== */
        .m3-achievements {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 30px;
          width: 100%;
        }
        .m3-achievement {
          display: grid;
          grid-template-columns: 9px minmax(0, 1fr);
          column-gap: 6px;
          font-family: Arial, sans-serif;
          margin-bottom: 12px;
        }
        .m3-achievement-dot {
          font-size: 12px;
          line-height: 1.1;
          color: #333333;
        }
        .m3-achievement-year {
          color: #3b3b3b;
          font-size: 10.5px;
          line-height: 1.4;
          font-weight: 800;
        }
        .m3-achievement-title {
          color: #535353;
          font-size: 11px;
          line-height: 1.55;
          margin-top: 2px;
          font-weight: 600;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-achievement-description {
          color: #626262;
          font-size: 10.5px;
          line-height: 1.55;
          margin-top: 2px;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }

        /* ====================================================
           CUSTOM SECTIONS
        ==================================================== */
        .m3-custom-items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .m3-custom-item {
          font-family: Arial, sans-serif;
        }
        .m3-custom-label {
          font-size: 11px;
          font-weight: 700;
          color: #3b3b3b;
          text-transform: uppercase;
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        .m3-custom-description {
          font-size: 11px;
          color: #5a5a5a;
          line-height: 1.6;
          word-wrap: break-word;
          overflow-wrap: anywhere;
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
            height: 200px;
          }
          .m3-sidebar {
            min-height: calc(100% - 26px);
          }
        }
      `}</style>
    </div>
  );
}

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