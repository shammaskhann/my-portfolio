import { Reveal, SectionHeading } from "./ui";
import { CORE_STACK, SKILL_GROUPS } from "../data/portfolio";
import css from "./Toolkit.module.css";

export default function Toolkit() {
  const total = SKILL_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="toolkit" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="02"
            label="Toolkit"
            title="Full stack, one engineer."
            description="The tools I reach for when a product has to go from idea to store release — and stay up under load."
            meta={`${total} tools · 4 layers`}
          />
        </Reveal>

        <Reveal className={css.core} delay={0.05}>
          <p className={css.coreLabel}>Core stack</p>
          <div className={css.coreWords}>
            {CORE_STACK.map((word) => (
              <span key={word} className={css.coreWord}>
                {word}
              </span>
            ))}
          </div>
        </Reveal>

        <div className={css.groups}>
          {SKILL_GROUPS.map((group, index) => (
            <Reveal as="div" className={css.group} delay={index * 0.06} key={group.label}>
              <div className={css.groupHead}>
                <span className={css.groupIndex}>{group.index}</span>
                <h3 className={css.groupLabel}>{group.label}</h3>
                <span className={css.groupCount}>{String(group.items.length).padStart(2, "0")}</span>
              </div>
              <p className={css.groupNote}>{group.note}</p>
              <ul className={css.list}>
                {group.items.map((item) => (
                  <li key={item}>
                    <span className={css.bullet} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
