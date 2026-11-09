import { Reveal, SectionHeading } from "./ui";
import css from "./Education.module.css";

const focusOf = (description) => {
  const match = description.match(/focus on ([^.]+)\./i);
  if (!match) return [];
  return match[1]
    .split(/,| and /)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
};

export default function Education({ data }) {
  const education = data.education[0];
  if (!education) return null;
  const focus = focusOf(education.description);
  const classYear = education.period.match(/(\d{4})\s*$/)?.[1] ?? "";

  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="04"
            label="Foundation"
            title="The academic base."
            meta={`Class of ${classYear}`}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <article className={css.plate}>
            <span className={css.watermark} aria-hidden="true">
              {classYear}
            </span>

            <div className={css.copy}>
              <p className={css.kicker}>Bachelor of Science</p>
              <h3 className={css.degree}>Computer Science</h3>
              <p className={css.school}>{education.institution}</p>
              <p className={css.description}>{education.description}</p>

              {focus.length ? (
                <div className={css.focus}>
                  <span className={css.focusLabel}>Focus</span>
                  <ul className={css.focusList}>
                    {focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className={css.side}>
              <div className={css.seal} aria-hidden="true">
                <span className={css.sealMain}>SK</span>
                <span className={css.sealSmall}>Est. 2022</span>
              </div>
              <div className={css.sideMeta}>
                <p className={css.period}>{education.period}</p>
                <p className={css.class}>Class of {classYear}</p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
