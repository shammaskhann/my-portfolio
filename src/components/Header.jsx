import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, Icon, StatusDot, cx } from "./ui";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import css from "./Header.module.css";

const NAV = [
  { id: "work", label: "Work" },
  { id: "toolkit", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV.map((item) => item.id);

export default function Header({ data }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useActiveSection(SECTION_IDS);
  const reduce = useReducedMotion();
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={cx(css.header, scrolled && css.scrolled)}>
        <div className={cx("container", css.inner)}>
          <a href="#top" className={css.logo} aria-label={`${data.name} — back to top`}>
            SK<span className={css.logoDot}>.</span>
          </a>

          <nav className={css.nav} aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cx(css.link, active === item.id && css.linkActive)}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={css.actions}>
            <span className={css.availability}>
              <StatusDot />
              Available
            </span>
            <Button as="a" href="#contact" size="sm" icon="arrowUpRight" className={css.talk}>
              Let's talk
            </Button>
            <button
              type="button"
              className={css.menuButton}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
        <div className={css.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className={css.sheet}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className={css.sheetNav} aria-label="Mobile">
              {NAV.map((item, index) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
                  <span className={css.sheetIndex}>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                  <Icon name="arrowUpRight" size={20} />
                </a>
              ))}
            </nav>
            <div className={css.sheetMeta}>
              <a href={`mailto:${data.email}`}>{data.email}</a>
              <p>
                <StatusDot /> Available for full-time &amp; contract
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
