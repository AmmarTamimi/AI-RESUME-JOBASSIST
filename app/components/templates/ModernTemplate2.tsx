import React from "react";
import type { TemplateProps } from "../../types/Content";

const Icon = {
  phone: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),

  mail: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),

  pin: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),

  globe: (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
};

export default function ModernTemplate2({
  content,
  theme,
}: TemplateProps) {
  const { personalInfo, sections } = content;
  const t = theme;

  const contactSection = sections.find(
    (s) => s.type === "custom" && s.id === "contact",
  );

  const educationSection = sections.find(
    (s) => s.type === "education",
  );

  const experienceSection = sections.find(
    (s) => s.type === "experience",
  );

  const skillsSection = sections.find(
    (s) => s.type === "ratedSkills",
  );

  const contactItems = contactSection?.items || [];

  const name = personalInfo.fullName?.trim() || "Your Name";

  const nameParts = name.split(/\s+/);

  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1]
      : "";

  const initials = nameParts
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const primaryColor = t.primaryColor || "#2b687d";
  const accentColor = t.accentColor || "#2b687d";
  const textColor = t.textColor || "#333333";

  /*
   * Some resume systems may not currently have these optional
   * education fields. They are therefore accessed safely.
   */
  const getOptionalEducationValue = (
    education: unknown,
    key:
      | "honors"
      | "coursework"
      | "awards"
      | "activities"
      | "relevantCoursework"
      | "extracurricularActivities",
  ) => {
    if (!education || typeof education !== "object") return "";

    return String(
      (education as Record<string, unknown>)[key] || "",
    );
  };

  return (
    <div className="digital-marketing-template">
      {/* =========================================================
          TOP HEADER
      ========================================================== */}
      <header className="topHeader">
        <div className="headerName">
          {firstName && <span>{firstName} </span>}
          <span>{lastName || firstName}</span>
        </div>

        <div className="headerTitle">
          {personalInfo.title || "DIGITAL MARKETING SPECIALIST"}
        </div>
      </header>

      {/* =========================================================
          MAIN TWO-COLUMN AREA
      ========================================================== */}
      <div className="resumeBody">

        {/* =======================================================
            LEFT COLUMN
        ======================================================== */}
        <aside className="leftColumn">

          {/* Profile image */}
          <div className="profileArea">
            <div className="profileImage">
              {personalInfo.photoUrl ? (
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Profile"}
                />
              ) : (
                <span className="profileFallback">
                  {initials || "U"}
                </span>
              )}
            </div>
          </div>

          {/* =====================================================
              SUMMARY
          ====================================================== */}
          {personalInfo.summary && (
            <section className="leftSection summarySection">
              <SectionHeading title="SUMMARY" />

              <p className="summaryText">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* =====================================================
              EDUCATION
          ====================================================== */}
          {educationSection &&
            educationSection.items.length > 0 && (
              <section className="leftSection educationSection">
                <SectionHeading title="EDUCATION" />

                {educationSection.items.map((edu, index) => {
                  const honors = getOptionalEducationValue(
                    edu,
                    "honors",
                  );

                  const coursework =
                    getOptionalEducationValue(
                      edu,
                      "coursework",
                    ) ||
                    getOptionalEducationValue(
                      edu,
                      "relevantCoursework",
                    );

                  const awards =
                    getOptionalEducationValue(
                      edu,
                      "awards",
                    );

                  const activities =
                    getOptionalEducationValue(
                      edu,
                      "activities",
                    ) ||
                    getOptionalEducationValue(
                      edu,
                      "extracurricularActivities",
                    );

                  return (
                    <div
                      className="educationItem"
                      key={index}
                    >
                      <div className="educationDate">
                        {edu.start}
                        {edu.start && edu.end ? " - " : ""}
                        {edu.end}
                      </div>

                      <div className="educationDegree">
                        {edu.degree}
                      </div>

                      {honors && (
                        <div className="educationDetail">
                          {honors}
                        </div>
                      )}

                      <div className="educationSchool">
                        {edu.school}
                      </div>

                      {coursework && (
                        <div className="educationExtra">
                          <span>Relevant Coursework</span>
                          <span>{coursework}</span>
                        </div>
                      )}

                      {awards && (
                        <div className="educationExtra">
                          <span>Awards and Honors</span>
                          <span>{awards}</span>
                        </div>
                      )}

                      {activities && (
                        <div className="educationExtra">
                          <span>
                            Extracurricular Activities
                          </span>
                          <span>{activities}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            )}

          {/* =====================================================
              RELEVANT SKILLS
          ====================================================== */}
          {skillsSection &&
            skillsSection.items.length > 0 && (
              <section className="leftSection skillsSection">
                <SectionHeading title="RELEVANT SKILLS" />

                <div className="skillsList">
                  {skillsSection.items.map(
                    (skill, index) => (
                      <div
                        className="skillItem"
                        key={index}
                      >
                        <div className="skillTop">
                          <span className="skillName">
                            {skill.name}
                          </span>

                          <span className="skillPercentage">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="skillBar">
                          <div
                            className="skillProgress"
                            style={{
                              width: `${Math.min(
                                Math.max(skill.level, 0),
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}
        </aside>

        {/* =======================================================
            VERTICAL DIVIDER
        ======================================================== */}
        <div className="verticalDivider" />

        {/* =======================================================
            RIGHT COLUMN
        ======================================================== */}
        <main className="rightColumn">

          {/* =====================================================
              CONTACT
          ====================================================== */}
          <section className="rightSection contactSection">
            <SectionHeading title="CONTACT" />

            <div className="contactList">
              {contactItems.length > 0 ? (
                contactItems.map((item, index) => {
                  if (
                    typeof item !== "object" ||
                    item === null ||
                    !("label" in item) ||
                    !("description" in item)
                  ) {
                    return null;
                  }

                  const label = String(
                    item.label || "",
                  ).toLowerCase();

                  const description = String(
                    item.description || "",
                  );

                  let icon = Icon.pin;

                  if (label === "phone") {
                    icon = Icon.phone;
                  } else if (label === "email") {
                    icon = Icon.mail;
                  } else if (
                    label === "web" ||
                    label === "website"
                  ) {
                    icon = Icon.globe;
                  }

                  return (
                    <div
                      className="contactRow"
                      key={index}
                    >
                      <span className="contactLabel">
                        {label}
                      </span>

                      <span className="contactValue">
                        {description}
                      </span>
                    </div>
                  );
                })
              ) : (
                <>
                  {personalInfo.phone && (
                    <div className="contactRow">
                      <span className="contactLabel">
                        phone
                      </span>
                      <span className="contactValue">
                        {personalInfo.phone}
                      </span>
                    </div>
                  )}

                  {personalInfo.email && (
                    <div className="contactRow">
                      <span className="contactLabel">
                        email
                      </span>
                      <span className="contactValue">
                        {personalInfo.email}
                      </span>
                    </div>
                  )}

                  {personalInfo.location && (
                    <div className="contactRow">
                      <span className="contactLabel">
                        address
                      </span>
                      <span className="contactValue">
                        {personalInfo.location}
                      </span>
                    </div>
                  )}

                  {personalInfo.website && (
                    <div className="contactRow">
                      <span className="contactLabel">
                        website
                      </span>
                      <span className="contactValue">
                        {personalInfo.website}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* =====================================================
              PROFESSIONAL EXPERIENCE
          ====================================================== */}
          {experienceSection &&
            experienceSection.items.length > 0 && (
              <section className="rightSection experienceSection">
                <SectionHeading
                  title="PROFESSIONAL EXPERIENCE"
                />

                <div className="experienceList">
                  {experienceSection.items.map(
                    (job, index) => (
                      <article
                        className="experienceItem"
                        key={index}
                      >
                        <div className="experienceHeader">
                          <div className="experienceDate">
                            {formatDateRange(
                              job.start,
                              job.end,
                            )}
                          </div>

                          <h3 className="jobRole">
                            {job.role || "Position"}
                          </h3>

                          <div className="jobCompany">
                            {job.company}
                            {job.location
                              ? `, ${job.location}`
                              : ""}
                          </div>
                        </div>

                        {job.bullets &&
                          job.bullets.length > 0 && (
                            <ul className="jobBullets">
                              {job.bullets.map(
                                (bullet, bulletIndex) => (
                                  <li
                                    key={bulletIndex}
                                  >
                                    {bullet}
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                      </article>
                    ),
                  )}
                </div>
              </section>
            )}
        </main>
      </div>

      <style jsx>{`
        /* =========================================================
           ROOT
        ========================================================== */

        .digital-marketing-template {
          width: 100%;
          min-height: 100%;
          background: #ffffff;
          color: ${textColor};
          font-family: ${t.bodyFont || "Arial"}, sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }

        .digital-marketing-template *,
        .digital-marketing-template *::before,
        .digital-marketing-template *::after {
          box-sizing: border-box;
        }

        /* =========================================================
           HEADER
        ========================================================== */

        .topHeader {
          width: 100%;
          min-height: 104px;
          background: ${primaryColor};
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px 30px 22px;
        }

        .headerName {
          font-family: ${t.headingFont ||
          "'Georgia', serif"};
          font-size: clamp(22px, 3.2vw, 30px);
          line-height: 1.1;
          letter-spacing: 5px;
          font-weight: 400;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .headerTitle {
          margin-top: 9px;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 2.3px;
          font-weight: 400;
          text-transform: uppercase;
          opacity: 0.9;
        }

        /* =========================================================
           BODY
        ========================================================== */

        .resumeBody {
          display: grid;
          grid-template-columns: minmax(0, 46%) 1px minmax(0, 54%);
          width: 100%;
        }

        .leftColumn {
          min-width: 0;
          padding: 28px 24px 35px 27px;
        }

        .rightColumn {
          min-width: 0;
          padding: 28px 29px 35px 28px;
        }

        .verticalDivider {
          width: 1px;
          background: #e3e7e8;
          min-height: 100%;
        }

        /* =========================================================
           PROFILE
        ========================================================== */

        .profileArea {
          width: 100%;
          height: 90px;
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding-right: 4px;
        }

        .profileImage {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background: #f2f2f2;
          border: 5px solid #ffffff;
          overflow: hidden;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.16),
            0 0 0 1px #dddddd;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .profileImage img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .profileFallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eeeeee;
          color: ${primaryColor};
          font-size: 22px;
          font-weight: 700;
        }

        /* =========================================================
           SECTION HEADING
        ========================================================== */

        .leftSection,
        .rightSection {
          position: relative;
        }

        .leftSection {
          margin-bottom: 28px;
        }

        .rightSection {
          margin-bottom: 31px;
        }

        .summarySection {
          margin-top: 5px;
        }

        .sectionHeading {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 14px;
        }

        .sectionHeading h2 {
          margin: 0;
          font-family: ${t.headingFont ||
          "'Georgia', serif"};
          color: ${primaryColor};
          font-size: 15px;
          line-height: 1;
          letter-spacing: 2.2px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .sectionHeading::after {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${accentColor};
          position: absolute;
          right: -28px;
          top: 50%;
          transform: translateY(-50%);
        }

        .rightColumn .sectionHeading::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${accentColor};
          position: absolute;
          left: -32px;
          top: 50%;
          transform: translateY(-50%);
        }

        .rightColumn .sectionHeading::after {
          display: none;
        }

        /* =========================================================
           SUMMARY
        ========================================================== */

        .summaryText {
          margin: 0;
          padding-right: 8px;
          text-align: right;
          font-size: 10.5px;
          line-height: 1.48;
          color: #4d4d4d;
          font-weight: 400;
        }

        /* =========================================================
           EDUCATION
        ========================================================== */

        .educationSection {
          text-align: right;
        }

        .educationItem {
          margin-bottom: 18px;
          color: #555555;
          font-size: 10.5px;
          line-height: 1.45;
        }

        .educationDate {
          color: ${primaryColor};
          margin-bottom: 2px;
          font-size: 10.5px;
        }

        .educationDegree {
          color: #3d3d3d;
          font-weight: 700;
          font-size: 11px;
        }

        .educationDetail {
          color: #555555;
          font-size: 10.5px;
        }

        .educationSchool {
          color: #555555;
          font-size: 10.5px;
        }

        .educationExtra {
          display: flex;
          flex-direction: column;
          margin-top: 7px;
          color: #777777;
          line-height: 1.4;
        }

        .educationExtra span:first-child {
          color: #777777;
        }

        /* =========================================================
           SKILLS
        ========================================================== */

        .skillsList {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 2px;
        }

        .skillItem {
          width: 100%;
        }

        .skillTop {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 32px;
          align-items: center;
          gap: 7px;
          margin-bottom: 5px;
        }

        .skillName {
          text-align: right;
          font-size: 10.5px;
          line-height: 1.2;
          color: #555555;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .skillPercentage {
          text-align: right;
          color: ${primaryColor};
          font-size: 10px;
          font-weight: 700;
        }

        .skillBar {
          width: calc(100% - 39px);
          height: 4px;
          margin-left: 0;
          background: #e0e3e4;
          position: relative;
          overflow: hidden;
        }

        .skillProgress {
          height: 100%;
          background: ${primaryColor};
          transition: width 0.3s ease;
        }

        /* =========================================================
           CONTACT
        ========================================================== */

        .contactSection {
          margin-top: 4px;
        }

        .contactList {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .contactRow {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 8px;
          align-items: baseline;
          font-size: 10.5px;
          line-height: 1.35;
        }

        .contactLabel {
          color: #777777;
          font-weight: 700;
          text-transform: lowercase;
        }

        .contactValue {
          color: #555555;
          overflow-wrap: anywhere;
        }

        /* =========================================================
           EXPERIENCE
        ========================================================== */

        .experienceList {
          display: flex;
          flex-direction: column;
        }

        .experienceItem {
          margin-bottom: 21px;
          position: relative;
        }

        .experienceItem:last-child {
          margin-bottom: 0;
        }

        .experienceHeader {
          margin-bottom: 7px;
        }

        .experienceDate {
          color: ${primaryColor};
          font-size: 10px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 2px;
        }

        .jobRole {
          margin: 0;
          color: #383838;
          font-size: 11.5px;
          line-height: 1.3;
          font-weight: 700;
        }

        .jobCompany {
          color: #555555;
          font-size: 10.5px;
          font-weight: 600;
          line-height: 1.35;
        }

        .jobBullets {
          margin: 0;
          padding: 0 0 0 15px;
          color: #555555;
          font-size: 10.5px;
          line-height: 1.45;
        }

        .jobBullets li {
          padding-left: 3px;
          margin-bottom: 4px;
        }

        .jobBullets li::marker {
          color: ${primaryColor};
          font-size: 7px;
        }

        /* =========================================================
           RESPONSIVE
        ========================================================== */

        @media (max-width: 700px) {
          .topHeader {
            min-height: 88px;
            padding: 17px 15px;
          }

          .headerName {
            font-size: 22px;
            letter-spacing: 3px;
          }

          .headerTitle {
            font-size: 8px;
            letter-spacing: 1.7px;
          }

          .resumeBody {
            grid-template-columns: minmax(0, 47%) 1px minmax(0, 53%);
          }

          .leftColumn {
            padding: 22px 15px 25px 16px;
          }

          .rightColumn {
            padding: 22px 17px 25px 17px;
          }

          .profileImage {
            width: 68px;
            height: 68px;
          }

          .profileArea {
            height: 77px;
          }

          .sectionHeading h2 {
            font-size: 12px;
            letter-spacing: 1.5px;
          }

          .summaryText,
          .educationItem,
          .skillName,
          .skillPercentage,
          .contactRow,
          .jobBullets {
            font-size: 9px;
          }

          .jobRole {
            font-size: 10px;
          }

          .jobCompany {
            font-size: 9px;
          }

          .sectionHeading::after {
            right: -18px;
            width: 5px;
            height: 5px;
          }

          .rightColumn .sectionHeading::before {
            left: -21px;
            width: 5px;
            height: 5px;
          }
        }

        /* =========================================================
           PRINT
        ========================================================== */

        @media print {
          .digital-marketing-template {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            box-shadow: none;
          }

          .topHeader {
            min-height: 36mm;
          }

          .resumeBody {
            min-height: calc(297mm - 36mm);
          }

          .leftColumn,
          .rightColumn {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

/* ===============================================================
   SECTION HEADING COMPONENT
================================================================ */

function SectionHeading({
  title,
}: {
  title: string;
}) {
  return (
    <div className="sectionHeading">
      <h2>{title}</h2>
    </div>
  );
}

/* ===============================================================
   DATE FORMATTER
================================================================ */

function formatDateRange(
  start?: string,
  end?: string,
) {
  if (!start && !end) return "";

  if (start && !end) {
    return `${start} - Present`;
  }

  if (!start && end) {
    return end;
  }

  return `${start} - ${end}`;
}