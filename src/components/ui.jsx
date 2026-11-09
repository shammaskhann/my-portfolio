import { motion, useReducedMotion } from "framer-motion";
import css from "./ui.module.css";

export const cx = (...parts) => parts.filter(Boolean).join(" ");

const ICONS = {
  arrowUpRight: {
    node: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </>
    ),
  },
  arrowRight: {
    node: (
      <>
        <path d="M4 12h16" />
        <path d="m14 6 6 6-6 6" />
      </>
    ),
  },
  arrowUp: {
    node: (
      <>
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </>
    ),
  },
  chevronDown: { node: <path d="m6 9 6 6 6-6" /> },
  plus: { node: <path d="M12 5v14M5 12h14" /> },
  minus: { node: <path d="M5 12h14" /> },
  close: { node: <path d="m6 6 12 12M18 6 6 18" /> },
  menu: { node: <path d="M4 7h16M4 12h16M4 17h16" /> },
  mail: {
    node: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </>
    ),
  },
  external: {
    node: (
      <>
        <path d="M14 4h6v6" />
        <path d="M20 4 10 14" />
        <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
      </>
    ),
  },
  copy: {
    node: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V5a1 1 0 0 1 1-1h10" />
      </>
    ),
  },
  check: { node: <path d="m5 12 4.5 4.5L19 7" /> },
  expand: { node: <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" /> },
  pin: {
    node: (
      <>
        <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  github: {
    fill: true,
    node: (
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    ),
  },
  linkedin: {
    fill: true,
    node: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.71h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9V9Z" />
    ),
  },
  apple: {
    fill: true,
    node: (
      <path d="M16.36 12.66c.02-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.78-3.3 1.99-1.4 2.44-.36 6.05 1 8.03.67.96 1.47 2.04 2.51 2 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.08-.02 1.77-.98 2.43-1.94.77-1.1 1.08-2.17 1.1-2.22-.02-.01-2.11-.81-2.13-3.26ZM14.2 6.6c.55-.67.92-1.6.82-2.53-.79.03-1.75.53-2.32 1.2-.51.58-.96 1.53-.84 2.44.88.07 1.79-.44 2.34-1.11Z" />
    ),
  },
  play: {
    fill: true,
    node: <path d="M6 3.5 20.5 12 6 20.5V3.5Z" />,
  },
};

export function Icon({ name, size = 18, className, strokeWidth = 1.6 }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={icon.fill ? "currentColor" : "none"}
      stroke={icon.fill ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icon.node}
    </svg>
  );
}

export function Button({
  as: Tag = "a",
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}) {
  return (
    <Tag className={cx(css.btn, css[variant], css[size], className)} {...rest}>
      <span className={css.btnLabel}>{children}</span>
      {icon ? <Icon name={icon} size={size === "sm" ? 14 : 16} className={css.btnIcon} /> : null}
    </Tag>
  );
}

export function Chip({ children, tone = "default", className }) {
  return <span className={cx(css.chip, tone === "accent" && css.chipAccent, className)}>{children}</span>;
}

export function StatusDot({ className }) {
  return <span className={cx(css.statusDot, className)} aria-hidden="true" />;
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  meta,
  center = false,
  className,
}) {
  return (
    <div className={cx(css.heading, center && css.headingCenter, className)}>
      <div className={css.headingTop}>
        <p className={css.eyebrow}>
          <span className={css.headIndex}>{index}</span>
          <span className={css.headDash} aria-hidden="true" />
          <span>{label}</span>
        </p>
        {meta ? <p className={css.meta}>{meta}</p> : null}
      </div>
      <h2 className={css.title}>{title}</h2>
      {description ? <p className={css.description}>{description}</p> : null}
    </div>
  );
}

export function Reveal({ as = "div", delay = 0, y = 26, className, children }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function Marquee({ items, speed = 48, variant = "outline", className }) {
  const group = (hidden) => (
    <div className={css.marqueeGroup} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span className={css.marqueeItem} key={`${item}-${i}`}>
          {item}
          <span className={css.marqueeStar}>✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cx(css.marquee, variant === "solid" && css.marqueeSolid, className)}>
      <div className={css.marqueeTrack} style={{ "--speed": `${speed}s` }}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
