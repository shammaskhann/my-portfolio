import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon, Reveal, StatusDot, cx } from "./ui";
import css from "./Experience.module.css";

const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const startIndex = (period) => {
  const start = period.split(/[–-]/)[0].trim();
  const [month, year] = start.split(/\s+/);
  return Number(year) * 12 + (MONTHS[month] ?? 0);
};

const bulletsOf = (description) =>
  description
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean);

export default function Experience({ data }) {
  const roles = [...data.experience].sort((a, b) => startIndex(b.period) - startIndex(a.period));
  const currentCount = roles.filter((role) => /present/i.test(role.period)).length;
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className={css.grid}>
          <Reveal className={css.aside}>
            <p className={css.eyebrow}>
              <span className={css.eyebrowIndex}>03</span>
              <span className={css.eyebrowDash} aria-hidden="true" />
              Track record
            </p>
            <h2 className={css.title}>Where I've built.</h2>
            <p className={css.lead}>
              Product studios, a startup I co-founded, and a scale-focused backend team. Mobile first — full stack
              when the product needs it.
            </p>

            <div className={css.stats}>
              <div>
                <strong>{roles.length}</strong>
                <span>Roles</span>
              </div>
              <div>
                <strong>{currentCount}</strong>
                <span>Current</span>
              </div>
              <div>
                <strong>2024</strong>
                <span>Since</span>
              </div>
            </div>

            <div className={css.nowCard}>
              <StatusDot />
              <div>
                <p className={css.nowLabel}>Currently</p>
                <p className={css.nowRole}>{roles[0].title}</p>
                <p className={css.nowCompany}>{roles[0].company.split(" · ")[0]}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className={css.list} delay={0.08}>
            {roles.map((role, index) => {
              const bullets = bulletsOf(role.description);
              const isOpen = open === index;
              const current = /present/i.test(role.period);
              const [company, ...place] = role.company.split(" · ");
              return (
                <div className={cx(css.role, isOpen && css.roleOpen)} key={`${role.company}-${role.title}-${role.period}`}>
                  <button
                    type="button"
                    className={css.roleButton}
                    aria-expanded={isOpen}
                    aria-controls={`role-panel-${index}`}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className={css.period}>
                      {role.period}
                      {current ? <span className={css.current}>Current</span> : null}
                    </span>
                    <span className={css.main}>
                      <span className={css.roleTitle}>{role.title}</span>
                      <span className={css.company}>
                        {company}
                        {place.length ? ` · ${place.join(" · ")}` : ""}
                      </span>
                      <span className={css.summary}>{bullets[0]}</span>
                    </span>
                    <span className={css.toggle}>
                      <Icon name={isOpen ? "minus" : "plus"} size={15} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`role-panel-${index}`}
                        className={css.panel}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={css.panelInner}>
                          <ul className={css.bullets}>
                            {bullets.map((bullet, i) => (
                              <li key={i}>
                                <span className={css.bulletIndex}>{String(i + 1).padStart(2, "0")}</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          {role.links && Object.keys(role.links).length ? (
                            <div className={css.docs}>
                              {Object.entries(role.links).map(([label, url]) => (
                                <a
                                  key={label}
                                  className={css.docLink}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Icon name="external" size={12} />
                                  {label.charAt(0).toUpperCase() + label.slice(1)}
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
