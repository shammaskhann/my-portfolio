import './App.css'
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

// Import project images
import aqareImg from "./assets/aqare.jpeg";
import mapoffImg from "./assets/mapoff.jpeg";
import carfixupImg from "./assets/carfixup.jpeg";
import smilelineImg from "./assets/smileline.jpeg";
import hammerloopImg from "./assets/Hammerloop.png";
import dailysindhyarImg from "./assets/dailysindyarcvr.jpg";
import atUrHomeImg from "./assets/atUrHomecvr.jpg";
import sondosImg from "./assets/sonddos.png";
import washappImg from "./assets/washapp.png";

// ─────────────────────────────────────────────
// ✦  SINGLE SOURCE OF TRUTH — ALL DATA HERE  ✦
// ─────────────────────────────────────────────
const PORTFOLIO_DATA = {
  name: "Shammas Khan",
  title: "Flutter App Developer",
  tagline: "Crafting polished mobile experiences — from concept to store.",
  email: "shammas.khan90321@gmail.com",
  github: "https://github.com/shammaskhann",

  skills: [
    "Flutter", "Firebase", "API Integrations", "GetX", "Bloc",
    "Clean Architecture", "Google Maps SDK", "AdMob", "ZegoCloud",
    "FCM - Notifications", "NAFATH API", "WebView"
  ],

  projects: [
    {
      id: 1,
      title: "HammerLoop",
      category: "Workforce Platform",
      description:
        "Construction job-matching platform with dual worker/employer roles, trade-skill filtering, geolocation-based search, and real-time push notifications.",
      stack: ["Flutter", "API Integrations", "OpenStreetMap", "Firebase", "FCM"],
      coverUrl: hammerloopImg,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.hammerloop.app&pcampaignid=web_share", icon: "▶" },
        { label: "App Store", url: "https://apps.apple.com/ng/app/hammerloop/id6756441384", icon: "◆" },
      ],
      accent: "#FF4500", emoji: "⚒️",
    },
    {
      id: 2,
      title: "Aqare",
      category: "Real Estate",
      description:
        "Bilingual property marketplace with map-based listings, auction modules, and Saudi Govt NAFATH digital identity verification.",
      stack: ["Flutter", "Google Maps SDK", "NAFATH API", "API Integrations"],
      coverUrl: aqareImg,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=net.aqare.aqareapp&pcampaignid=web_share&pli=1", icon: "▶" },
        { label: "App Store", url: "https://apps.apple.com/sa/app/aqare/id6741023384", icon: "◆" },
      ],
      accent: "#FF4500", emoji: "🏠",
    },
    {
      id: 3,
      title: "Map Off",
      category: "Location & Offers",
      description:
        "Bilingual store-offer explorer using Google Maps with custom markers, deep linking, and role-based access for guests, customers, and shop owners.",
      stack: ["Flutter", "Google Maps SDK", "API Integrations"],
      coverUrl: mapoffImg,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=net.mapoff.mapoffapp", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "📍",
    },
    {
      id: 4,
      title: "Daily Sindhyar",
      category: "News App",
      description:
        "Sindhi-language news app wrapping dailysindhyar.com in a native WebView shell with Complete Admob Setup— published successfully on the Play Store.",
      stack: ["Flutter", "WebView", "AdMob"],
      coverUrl: dailysindhyarImg,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.dailysindhyar.app&hl=en", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "📰",
    },
    {
      id: 5,
      title: "Car Fix Up",
      category: "Auto Services",
      description:
        "Dual-role platform connecting car owners and mechanics — live tow-truck tracking, video call emergencies via ZegoCloud, repair estimates, and booking.",
      stack: ["Flutter", "Firebase", "ZegoCloud SDK", "Google Maps SDK"],
      coverUrl: carfixupImg,
      links: [
        { label: "Screenshots", url: "https://github.com/shammaskhann/car_fix_up_fyp", icon: "◉" },
      ],
      accent: "#FF4500", emoji: "🔧",
    },
    {
      id: 6,
      title: "Smileline",
      category: "Clinic Management",
      description:
        "Full-featured dental clinic app — appointments, medical history, invoicing, prescriptions, and automated WhatsApp reminders via Firebase Cloud Functions.",
      stack: ["Flutter", "Firebase", "WhatsApp Business API", "FCM"],
      coverUrl: smilelineImg,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.smileline.patient", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "🦷",
    },
    {
      id: 7,
      title: "Sonddos",
      category: "Recruitment & Visa",
      description:
        "Dedicated platform for Saudi families to manage and hire domestic help (maids, nannies, workers). Allows recruitment, visa processing, contract management, and sponsorship transfers.",
      stack: ["Flutter", "API Integrations", "Firebase"],
      coverUrl: sondosImg,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.sonddossa.sonddosapp", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "👳‍♂️",
    },
    {
      id: 8,
      title: "Washapp",
      category: "On‑Demand Services",
      description:
        "End‑to‑end laundry pickup and delivery platform operating in the Philippines – customer app with real‑time tracking and payments.",
      stack: ["Flutter", "Google Maps", "Firebase", "Payment Gateway"],
      coverUrl: washappImg,
      links: [
        { label: "App Store", url: "https://apps.apple.com/ph/app/customer-washapp/id6478976728", icon: "◆" },
      ],
      accent: "#FF4500", emoji: "🧺",
    },
    {
      id: 9,
      title: "AtUrHome",
      category: "UI Revamp",
      description:
        "Complete UI overhaul of a logistics app — animated navigation, illustrated error states, wallet graph, and theme standardization across all screens.",
      stack: ["Flutter", "Map Routing", "UI/UX"],
      coverUrl: atUrHomeImg,
      links: [
        { label: "Case Study", url: "https://docs.google.com/document/d/1vpmzd8QccGyLyXEzMy2RCDO_oRWsapRXorcD1AdAEiM/edit?tab=t.0", icon: "◉" },
      ],
      accent: "#FF4500", emoji: "✨",
    },
  ],

  experience: [
    {
      title: "Mobile App Developer",
      company: "iSky Information Technology",
      description:
        "Developed bilingual (Arabic/English) Flutter apps with Google Maps integration and GetX state management.\nOptimized app performance and fixed memory leaks using GetX.\nCreated custom UI components following Middle Eastern design standards.\nApps worked on: Aqare, Map Off, Sounds, Qhub (Smileline, Washapp).",
      period: "Nov 2024 - Mar 2025",
      links: {
        "offer letter": "https://drive.google.com/file/d/1UL37WOkYHzBfYP9iKSV9IX90oCCR9LeK/view?usp=sharing",
        "exp letter": "https://drive.google.com/file/d/1apWgMwTHIRp6nAmMkhtbSnHDSVgKiBpb/view?usp=sharing"
      }
    },
    {
      title: "Outsourced Freelance Flutter Developer",
      company: "Esol Information Technology (subsidiary of iSky)",
      description:
        "Collaborated with Esol on flagship projects including Aqare, Map Off, and Sounds.\nPartnered with Qhub to deliver Smileline (dental clinic management) and Washapp (laundry platform in the Philippines).\nBuilt and maintained cross‑platform applications from concept to store.",
      period: "Sep 2024 - Feb 2026",
      links: {}
    },
    {
      title: "Information Technology (Intern)",
      company: "Archroma Pakistan Limited",
      description:
        "Assisted in integrating FBR e‑Invoicing functionality using PRAL‑provided APIs within a .NET C# environment.\nIntegrated SAP Crystal Reports into a C# application for e‑invoice generation with FBR QR code support.",
      period: "Aug 2025 - Sept 2025",
      links: {
        "offer letter": "https://drive.google.com/file/d/1MvjNEOIsmHDsYwrmjMC8sV1S6ayIy5Q8/view?usp=sharing",
        "internship certificate": "https://drive.google.com/file/d/1H70ggOO8VRVYnc-vbSIcCys8KcQbJvBa/view?usp=sharing",
      }
    },
  ],

  education: [
    {
      title: "BS in Computer Science",
      institution: "Bahria University Karachi",
      description:
        "Pursuing a Bachelor's degree in Computer Science with a focus on software development, algorithms, and data structures. Engaged in various projects and coursework to enhance programming skills and problem-solving abilities.",
      period: "Oct 2022 - May 2026",
      links: {
        // "transcript": "https://drive.google.com/file/d/1ak3QModyEQ-dymdkKwYa8dMkxbYcwfjx/view?usp=sharing",
      }
    },
  ],
};

// ─────────────────────────────────────────────
// EMAILJS CONFIG — reads from .env
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

function Tag({ label, accent }) {
  return (
    <span style={{
      background: accent + "12",
      color: accent,
      border: `1px solid ${accent}25`,
      borderRadius: 8,
      padding: "3px 10px",
      fontSize: "clamp(10px, 2vw, 11px)",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.04em",
      fontWeight: 500,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function LinkButton({ link, accent }) {
  return (
    <motion.a
      href={link.url} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.96 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 16px",
        borderRadius: 12,
        fontSize: "clamp(11px, 2.5vw, 12px)",
        fontWeight: 600,
        fontFamily: "var(--font-body)",
        background: accent,
        color: "#fff",
        border: "none",
        whiteSpace: "nowrap",
        textDecoration: "none",
        boxShadow: `0 0 14px ${accent}50, var(--neumorph-raised)`,
        transition: "box-shadow 0.3s ease",
      }}
    >
      <span style={{ fontSize: "clamp(9px, 2vw, 10px)" }}>{link.icon}</span>
      <span>{link.label}</span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref} custom={index} variants={fadeUp}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="neumorphic-card"
      style={{
        borderRadius: "var(--radius-card)",
        padding: "clamp(22px, 4vw, 30px)",
        display: "flex", flexDirection: "column", gap: "clamp(12px, 2.5vw, 16px)",
        cursor: "default",
        border: hovered ? `1px solid ${project.accent}30` : `1px solid var(--border-subtle)`,
        position: "relative", overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        boxShadow: hovered
          ? `var(--neumorph-raised-hover), 0 0 30px ${project.accent}15`
          : `var(--neumorph-raised)`,
      }}
    >
      {/* Background emoji watermark */}
      <div style={{
        position: "absolute", top: -16, right: 8, fontSize: "clamp(70px, 18vw, 100px)",
        opacity: 0.04, pointerEvents: "none", userSelect: "none", lineHeight: 1,
      }}>
        {project.emoji}
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: "clamp(10px, 2vw, 11px)",
            fontFamily: "var(--font-mono)",
            color: project.accent,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 6,
            opacity: 0.9,
          }}>
            {project.category}
          </div>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(20px, 4.5vw, 24px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            {project.title}
          </h3>
        </div>
        <span style={{
          fontSize: "clamp(26px, 6vw, 34px)", flexShrink: 0,
          filter: hovered ? `drop-shadow(0 0 8px ${project.accent}60)` : "none",
          transition: "filter 0.3s ease",
        }}>
          {project.emoji}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "clamp(13px, 2.5vw, 14px)",
        color: "var(--text-secondary)",
        margin: 0,
        lineHeight: 1.7,
      }}>
        {project.description}
      </p>

      {/* Tech stack tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.stack.map((t) => <Tag key={t} label={t} accent={project.accent} />)}
      </div>

      {/* Cover image */}
      {project.coverUrl && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            borderRadius: 16, overflow: "hidden",
            border: `1px solid ${project.accent}20`,
            boxShadow: `inset 0 0 20px ${project.accent}08`,
          }}
        >
          <img
            src={project.coverUrl}
            alt={`${project.title} screenshot`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>
      )}

      {/* Store links */}
      {project.links.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {project.links.map((l) => <LinkButton key={l.label} link={l} accent={project.accent} />)}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE CARD (Experience & Education)
// ─────────────────────────────────────────────
function TimelineCard({ item, index, type }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const accent = type === "experience" ? "#FF4500" : "#00BFFF";
  const emoji = type === "experience" ? "💼" : "🎓";
  const subtitle = type === "experience" ? item.company : item.institution;

  return (
    <motion.div
      ref={ref} custom={index} variants={fadeUp}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="neumorphic-card"
      style={{
        borderRadius: "var(--radius-card)",
        padding: "clamp(22px, 4vw, 28px)",
        display: "flex", flexDirection: "column", gap: "clamp(10px, 2vw, 14px)",
        cursor: "default",
        border: hovered ? `1px solid ${accent}30` : `1px solid var(--border-subtle)`,
        position: "relative", overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        boxShadow: hovered
          ? `var(--neumorph-raised-hover), 0 0 20px ${accent}10`
          : `var(--neumorph-raised)`,
      }}
    >
      {/* Background emoji watermark */}
      <div style={{
        position: "absolute", top: -14, right: 10, fontSize: "clamp(60px, 15vw, 90px)",
        opacity: 0.04, pointerEvents: "none", userSelect: "none", lineHeight: 1,
      }}>
        {emoji}
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: "clamp(10px, 2vw, 11px)",
            fontFamily: "var(--font-mono)",
            color: accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
            opacity: 0.9,
            display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
          }}>
            <span>{subtitle}</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>{item.period}</span>
          </div>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(17px, 3.5vw, 21px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            {item.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "clamp(13px, 2.5vw, 14px)",
        color: "var(--text-secondary)",
        margin: 0,
        lineHeight: 1.7,
        whiteSpace: "pre-line",
      }}>
        {item.description}
      </p>

      {/* Links */}
      {item.links && Object.keys(item.links).length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {Object.entries(item.links).map(([label, url]) => (
            <LinkButton key={label} link={{ label: label.charAt(0).toUpperCase() + label.slice(1), url, icon: "🔗" }} accent={accent} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// CONTACT SECTION  (EmailJS powered)
// ─────────────────────────────────────────────
function ContactSection({ email, github }) {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ from_name: "", reply_to: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ from_name: "", reply_to: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const sideLinks = [
    { icon: "✉", label: "Email", value: email, href: `mailto:${email}` },
    { icon: "◉", label: "GitHub", value: "shammaskhann", href: github },
  ];

  return (
    <section ref={sectionRef} className="container section">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 48, textAlign: "center" }}
      >
        <p className="section-subtitle">
          Let's Work Together
        </p>
        <h2 className="section-title">
          Get in Touch
        </h2>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-secondary)",
          margin: "0 auto", maxWidth: 600, lineHeight: 1.7, textAlign: "center",
        }}>
          Have a project in mind? Drop a message and I'll get back to you within 24 hours.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="contact-grid">
        {/* ── FORM ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="neumorphic-card"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid rgba(255, 69, 0, 0.2)",
                  borderRadius: "var(--radius-card)",
                  padding: "48px 32px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: 24,
                  fontWeight: 800, color: "var(--accent)", margin: "0 0 8px",
                  textShadow: "0 0 20px rgba(255, 69, 0, 0.4)",
                }}>
                  Message Sent!
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)", color: "var(--text-secondary)",
                  margin: "0 0 28px", fontSize: 15,
                }}>
                  Thanks for reaching out. I'll reply shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStatus("idle")}
                  className="btn neumorphic-btn btn-primary"
                  style={{ cursor: "pointer" }}
                >
                  Send another
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form" ref={formRef} onSubmit={handleSubmit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="neumorphic-card"
                style={{
                  borderRadius: "var(--radius-card)",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Name */}
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    name="from_name" value={form.from_name} onChange={handleChange}
                    placeholder="John Doe" required className="form-input neumorphic-input"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email" name="reply_to" value={form.reply_to}
                    onChange={handleChange} placeholder="john@example.com"
                    required className="form-input neumorphic-input"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project…" required rows={5}
                    className="form-input neumorphic-input"
                    style={{ resize: "vertical", minHeight: 130 }}
                  />
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div style={{
                    background: "rgba(255, 69, 0, 0.08)",
                    border: "1px solid rgba(255, 69, 0, 0.2)",
                    borderRadius: 12, padding: "12px 16px",
                    fontFamily: "var(--font-body)", fontSize: 13,
                    color: "#FF6B4A",
                  }}>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit" disabled={status === "sending"}
                  whileHover={status !== "sending" ? { scale: 1.02 } : {}}
                  whileTap={status !== "sending" ? { scale: 0.97 } : {}}
                  className="btn neumorphic-btn btn-primary"
                  style={{
                    opacity: status === "sending" ? 0.7 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    width: "100%",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        style={{ display: "inline-block" }}
                      >◌</motion.span>
                      Sending…
                    </>
                  ) : "✉ Send Message"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── SIDEBAR ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {sideLinks.map((item) => (
            <motion.a
              key={item.label} href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ x: 4, boxShadow: `var(--neumorph-raised-hover), 0 0 16px rgba(255, 69, 0, 0.1)` }}
              className="neumorphic-card"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                borderRadius: 20, padding: "18px 20px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{
                fontSize: 18, width: 44, height: 44, borderRadius: 14,
                background: "var(--bg-recessed)", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0, color: "var(--accent)",
                boxShadow: "var(--neumorph-inset-sm)",
              }}>
                {item.icon}
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-tertiary)",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: 14,
                  fontWeight: 600, color: "var(--text-primary)",
                }}>
                  {item.value}
                </div>
              </div>
            </motion.a>
          ))}

          {/* Response time badge */}
          <div className="neumorphic-card" style={{
            borderRadius: 20, padding: "16px 20px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent), 0 0 20px rgba(255, 69, 0, 0.3)",
              flexShrink: 0,
            }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)" }}>
              Typically replies within <strong style={{ color: "var(--text-primary)" }}>24 hours</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function Portfolio() {
  const { name, title, tagline, email, github, skills, projects, experience, education } = PORTFOLIO_DATA;

  return (
    <div className="portfolio-app">

      {/* ── HERO ── */}
      <section className="container hero-wrapper">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Available badge */}
          <div className="available-badge">
            <span className="status-dot" />
            AVAILABLE FOR WORK
          </div>

          <h1 className="hero-title">
            {name}
          </h1>

          <h2 className="hero-role">
            {title}
          </h2>

          <p className="hero-description">
            {tagline}
          </p>

          {/* CTA buttons */}
          <div className="hero-actions">
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="btn neumorphic-btn btn-primary"
            >
              ✉ Get in touch
            </motion.a>
            <motion.a
              href={github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="btn neumorphic-btn btn-outline"
            >
              ◉ GitHub
            </motion.a>
          </div>
        </motion.div>

        {/* Skills strip (recessed tags) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            marginTop: "clamp(44px, 8vw, 60px)",
            display: "flex", flexWrap: "wrap", gap: "clamp(8px, 2vw, 10px)",
          }}
        >
          {skills.map((s) => (
            <span key={s} className="neumorphic-tag">
              {s}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ padding: "clamp(32px, 6vw, 64px) 0" }}>
        <div className="divider" />
      </div>

      {/* ── PROJECTS ── */}
      <section className="container section" style={{ paddingTop: 0 }}>
        <AnimatedSection>
          <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
            <p className="section-subtitle">Selected Work</p>
            <h2 className="section-title">Projects</h2>
          </motion.div>
        </AnimatedSection>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ padding: "clamp(32px, 6vw, 64px) 0" }}>
        <div className="divider" />
      </div>

      {/* ── EXPERIENCE & EDUCATION ── */}
      <section className="container section" style={{ paddingTop: 0 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(32px, 6vw, 48px)"
        }}>

          {/* Experience */}
          <div>
            <AnimatedSection>
              <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
                <p className="section-subtitle">Career</p>
                <h2 className="section-title">Experience</h2>
              </motion.div>
            </AnimatedSection>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {experience?.map((item, i) => (
                <TimelineCard key={`exp-${i}`} item={item} index={i} type="experience" />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <AnimatedSection>
              <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
                <p className="section-subtitle">Academic</p>
                <h2 className="section-title">Education</h2>
              </motion.div>
            </AnimatedSection>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {education?.map((item, i) => (
                <TimelineCard key={`edu-${i}`} item={item} index={i} type="education" />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ padding: "clamp(32px, 6vw, 64px) 0" }}>
        <div className="divider" />
      </div>

      {/* ── CONTACT ── */}
      <ContactSection email={email} github={github} />

      {/* ── FOOTER ── */}
      <footer className="portfolio-footer">
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 12,
          color: "var(--text-tertiary)", margin: 0,
          letterSpacing: "0.05em",
        }}>
          {name} · Flutter Developer · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
