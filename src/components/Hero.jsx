import { motion, useReducedMotion } from "framer-motion";
import { Button, Icon, Marquee, StatusDot } from "./ui";
import { PROFILE } from "../data/portfolio";
import css from "./Hero.module.css";

export default function Hero({ data }) {
  const reduce = useReducedMotion();
  const { projects, experience } = data;
  const liveCount = projects.filter((project) =>
    project.links?.some((link) => /apps\.apple\.com|play\.google\.com/.test(link.url))
  ).length;
  const nowRoles = experience.slice(0, 2);
  const marqueeItems = projects.map((project) => project.title.split(" — ")[0]);
  const role = data.title.trim().replace(/\s+-\s+/, " — ");

  const enter = (delay = 0, y = 26) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="top" className={css.hero}>
      <div className={css.glow} aria-hidden="true" />
      <div className={css.heroInner}>
        <div className={css.inner}>
          <div className={css.copy}>
            <motion.p className={css.badge} {...enter(0.05, 14)}>
              <StatusDot />
              Available for work
            </motion.p>

            <motion.h1 className={css.title} {...enter(0.12)}>
              {data.name}
              <span className={css.period}>.</span>
            </motion.h1>

            <motion.p className={css.role} {...enter(0.2)}>
              {role}
            </motion.p>

            <motion.p className={css.tagline} {...enter(0.28)}>
              {data.tagline}
            </motion.p>

            <motion.div className={css.actions} {...enter(0.36, 18)}>
              <Button href={`mailto:${data.email}`} icon="arrowUpRight">
                Let's talk
              </Button>
              <Button href={data.github} target="_blank" rel="noopener noreferrer" variant="ghost" icon="github">
                GitHub
              </Button>
            </motion.div>

            <motion.dl className={css.proof} {...enter(0.44, 16)}>
              <div>
                <dt>{projects.length}</dt>
                <dd>Products shipped</dd>
              </div>
              <div>
                <dt>{liveCount}</dt>
                <dd>Live on stores</dd>
              </div>
              <div>
                <dt>{experience.length}</dt>
                <dd>Roles &amp; builds</dd>
              </div>
            </motion.dl>
          </div>

          <motion.aside className={css.now} {...enter(0.3, 20)} aria-label="Currently building">
            <p className={css.nowLabel}>
              <span>Now</span>
              <span className={css.nowLine} aria-hidden="true" />
            </p>
            <div className={css.nowList}>
              {nowRoles.map((roleItem) => {
                const [company, ...place] = roleItem.company.split(" · ");
                return (
                  <div className={css.nowCard} key={`${roleItem.company}-${roleItem.title}`}>
                    <p className={css.nowPeriod}>{roleItem.period}</p>
                    <p className={css.nowRole}>{roleItem.title}</p>
                    <p className={css.nowCompany}>
                      {company}
                      {place.length ? ` · ${place.join(" · ")}` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className={css.nowMeta}>
              <span>
                <Icon name="pin" size={13} /> {PROFILE.location}
              </span>
              <span>
                <StatusDot /> {PROFILE.availability}
              </span>
            </div>
          </motion.aside>
        </div>
      </div>

      <Marquee items={marqueeItems} speed={58} className={css.marquee} />
    </section>
  );
}
