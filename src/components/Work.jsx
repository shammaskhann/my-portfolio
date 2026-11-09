import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, Chip, Icon, Reveal, SectionHeading, cx } from "./ui";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useScrollLock } from "../hooks/useScrollLock";
import { useTilt } from "../hooks/useTilt";
import css from "./Work.module.css";

const hasStore = (project) =>
  project.links?.some((link) => /apps\.apple\.com|play\.google\.com/.test(link.url));

const linkIcon = (label) => {
  const value = label.toLowerCase();
  if (value.includes("app store")) return "apple";
  if (value.includes("play")) return "play";
  if (value.includes("github")) return "github";
  return "external";
};

function Poster({ project, compact = false }) {
  return (
    <div
      className={cx(css.poster, compact && css.posterCompact)}
      style={{ "--poster-accent": project.accent }}
    >
      <span className={css.posterGrid} aria-hidden="true" />
      <span className={css.posterEmoji} aria-hidden="true">
        {project.emoji}
      </span>
      {!compact ? (
        <>
          <span className={css.posterKicker}>{project.category}</span>
          <span className={css.posterName}>{project.title.split(" — ")[0]}</span>
          <span className={css.posterMark}>SK / {String(project.id).padStart(2, "0")}</span>
        </>
      ) : null}
    </div>
  );
}

function Artwork({ project, eager = false }) {
  if (!project.art) return <Poster project={project} />;
  return (
    <img
      className={cx(css.artImage, project.art.fit === "contain" && css.artImageContain)}
      src={project.art.lg}
      alt={`${project.title} — ${project.category}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
    />
  );
}

function Thumb({ project }) {
  if (!project.art) return <Poster project={project} compact />;
  return (
    <img
      className={cx(css.thumbImage, project.art.fit === "contain" && css.thumbContain)}
      src={project.art.thumb}
      alt=""
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}

function Print({ project, index, total, onZoom }) {
  const { ref, style } = useTilt(4);
  return (
    <div className={css.printOuter}>
      <div ref={ref} className={css.print} style={style}>
        <div className={cx(css.artFrame, project.art?.fit === "contain" && css.artFrameContain)}>
          <Artwork project={project} />
        </div>
        {onZoom ? (
          <button
            type="button"
            className={css.zoomButton}
            onClick={onZoom}
            aria-label={`View ${project.title} artwork full size`}
          >
            <Icon name="expand" size={15} />
          </button>
        ) : null}
      </div>
      <div className={css.printCaption}>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className={css.printStatus}>
          {hasStore(project) ? (
            <>
              <span className={css.liveDot} aria-hidden="true" />
              Live on stores
            </>
          ) : (
            "Product case"
          )}
        </span>
      </div>
    </div>
  );
}

function AppLinks({ project }) {
  if (!project.links?.length) return null;
  return (
    <div className={css.links}>
      {project.links.map((link) => (
        <a
          key={link.label}
          className={css.linkPill}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name={linkIcon(link.label)} size={13} />
          {link.label}
          <Icon name="arrowUpRight" size={12} className={css.linkArrow} />
        </a>
      ))}
    </div>
  );
}

function Stack({ project }) {
  return (
    <div className={css.stack}>
      {project.stack.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </div>
  );
}

function Lightbox({ project, total, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const reduce = useReducedMotion();
  useScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          ref={dialogRef}
          className={css.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} artwork`}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className={css.lightboxClose}
            onClick={onClose}
            aria-label="Close artwork"
          >
            <Icon name="close" size={20} />
          </button>

          <motion.div
            className={css.lightboxInner}
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={css.lightboxMatte}>
              <div className={cx(css.lightboxArt, project.art?.fit === "contain" && css.lightboxContain)}>
                <Artwork project={project} eager />
              </div>
            </div>
            <div className={css.lightboxCaption}>
              <div>
                <p className={css.lightboxKicker}>{project.category}</p>
                <h3>{project.title}</h3>
              </div>
              <span>
                {String(project.id).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Work({ data }) {
  const { projects } = data;
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const tabs = useRef([]);
  const reduce = useReducedMotion();
  const project = projects[active] ?? projects[0];

  const closeZoom = useCallback(() => setZoom(null), []);

  const onKeyDown = (event, index) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % projects.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + projects.length) % projects.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = projects.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="01"
            label="Selected work"
            title="Work that ships."
            description="Eleven products across mobile, backend, and cloud — from store releases to high-scale services. Pick one and look closer."
            meta={`${projects.length} products · 2024—2026`}
          />
        </Reveal>

        {desktop ? (
          <div className={css.console}>
            <div className={css.indexColumn}>
              <div className={css.indexHead}>
                <span>Index</span>
                <span>Select to preview</span>
              </div>
              <div className={css.index} role="tablist" aria-orientation="vertical" aria-label="Selected apps">
                {projects.map((item, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={item.id}
                      ref={(node) => {
                        tabs.current[i] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`app-tab-${item.id}`}
                      aria-selected={selected}
                      aria-controls="app-panel"
                      tabIndex={selected ? 0 : -1}
                      className={cx(css.row, selected && css.rowActive)}
                      onClick={() => setActive(i)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                    >
                      <span className={css.rowIndex}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={css.thumb}>
                        <Thumb project={item} />
                      </span>
                      <span className={css.rowText}>
                        <span className={css.rowTitle}>{item.title.split(" — ")[0]}</span>
                        <span className={css.rowCategory}>{item.category}</span>
                      </span>
                      <span className={css.rowArrow}>
                        <Icon name="arrowUpRight" size={14} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={css.stage}
              id="app-panel"
              role="tabpanel"
              aria-labelledby={`app-tab-${project.id}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Print
                    project={project}
                    index={active}
                    total={projects.length}
                    onZoom={() => setZoom(project)}
                  />
                  <div className={css.stageInfo}>
                    <p className={css.stageKicker}>
                      {project.category}
                      {hasStore(project) ? (
                        <span className={css.stageLive}>
                          <span className={css.liveDot} aria-hidden="true" />
                          Live
                        </span>
                      ) : null}
                    </p>
                    <h3 className={css.stageTitle}>{project.title.split(" — ")[0]}</h3>
                    <p className={css.stageDesc}>{project.description}</p>
                    <Stack project={project} />
                    <AppLinks project={project} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className={css.accordion}>
            <p className={css.accordionHint}>Tap an app to open its launch card</p>
            {projects.map((item, i) => {
              const open = i === active;
              return (
                <div className={cx(css.accItem, open && css.accItemOpen)} key={item.id}>
                  <button
                    type="button"
                    className={css.accHead}
                    aria-expanded={open}
                    aria-controls={`acc-panel-${item.id}`}
                    onClick={() => setActive(open ? -1 : i)}
                  >
                    <span className={css.rowIndex}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={css.thumb}>
                      <Thumb project={item} />
                    </span>
                    <span className={css.rowText}>
                      <span className={css.rowTitle}>{item.title.split(" — ")[0]}</span>
                      <span className={css.rowCategory}>{item.category}</span>
                    </span>
                    <span className={css.accToggle}>
                      <Icon name={open ? "minus" : "plus"} size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        id={`acc-panel-${item.id}`}
                        className={css.accPanel}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={css.accInner}>
                          <Print
                            project={item}
                            index={i}
                            total={projects.length}
                            onZoom={() => setZoom(item)}
                          />
                          <p className={css.accDesc}>{item.description}</p>
                          <Stack project={item} />
                          <AppLinks project={item} />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        <Reveal className={css.footNote} delay={0.1}>
          <span>Every project above is production work.</span>
          <Button href={data.github} target="_blank" rel="noopener noreferrer" variant="quiet" size="sm" icon="arrowUpRight">
            More on GitHub
          </Button>
        </Reveal>
      </div>

      <Lightbox project={zoom} total={projects.length} onClose={closeZoom} />
    </section>
  );
}
