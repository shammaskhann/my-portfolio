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

// Import testimonial images
import carfixupTestimonial from "./assets/carfixup_testimonial.png";
import atUrHomeTestimonial from "./assets/aturhome_testimonial.png";

// ─────────────────────────────────────────────
// ✦  SINGLE SOURCE OF TRUTH — ALL DATA HERE  ✦
// ─────────────────────────────────────────────
const PORTFOLIO_DATA = {
  name: "Shammas Khan",
  title: "Flutter App Developer",
  tagline: "Crafting polished mobile experiences — from concept to store.",
  email: "shammaskhann@gmail.com",
  github: "https://github.com/shammaskhann",
  upwork: "https://www.upwork.com/freelancers/~01d6d922e25ece0d0e",

  skills: [
    "Flutter", "Firebase", "API Integrationss", "GetX", "Bloc",
    "Clean Architecture", "Google Maps SDK","AdMob","ZegoCloud", "FCM - Notifications", "NAFATH API", "WebView"
  ],

  projects: [
        {
      id: 1,
      title: "HammerLoop",
      category: "Workforce Platform",
      description:
        "Construction job-matching platform with dual worker/employer roles, trade-skill filtering, geolocation-based search, and real-time push notifications.",
      stack: ["Flutter", "API Integrations", "OpenStreetMap", "Firebase" , "FCM"],
      coverUrl: hammerloopImg,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.hammerloop.app&pcampaignid=web_share", icon: "▶" },
        { label: "App Store", url: "https://apps.apple.com/ng/app/hammerloop/id6756441384", icon: "◆" },
      ],
      color: "#FFF3E0", accent: "#BF360C", emoji: "⚒️",
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
      color: "#E8D5B7", accent: "#8B6914", emoji: "🏠",
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
      color: "#C8E6C9", accent: "#2E7D32", emoji: "📍",
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
      color: "#E8EAF6", accent: "#283593", emoji: "📰",
    },
    {
      id: 5,
      title: "Car Fix Up",
      category: "Auto Services",
      description:
        "Dual-role platform connecting car owners and mechanics — live tow-truck tracking, video call emergencies via ZegoCloud, repair estimates, and booking.",
      stack: ["Flutter", "Firebase", "ZegoCloud SDK", "Google Maps SDK"],
      coverUrl: carfixupImg,
      testimonialImg: carfixupTestimonial,
      links: [
        { label: "Screenshots", url: "https://github.com/shammaskhann/car_fix_up_fyp", icon: "◉" },
      ],
      color: "#FFE0B2", accent: "#E65100", emoji: "🔧",
    },
    {
      id: 6,
      title: "Smileline",
      category: "Clinic Management",
      description:
        "Full-featured dental clinic app — appointments, medical history, invoicing, prescriptions, and automated WhatsApp reminders via Firebase Cloud Functions.",
      stack: ["Flutter", "Firebase", "WhatsApp Business API", "FCM"],
      coverUrl: smilelineImg,
      links: [],
      color: "#E3F2FD", accent: "#1565C0", emoji: "🦷",
    },

    {
      id: 7,
      title: "AtUrHome",
      category: "UI Revamp",
      description:
        "Complete UI overhaul of a logistics app — animated navigation, illustrated error states, wallet graph, and theme standardization across all screens.",
      stack: ["Flutter", "Map Routing", "UI/UX"],
      coverUrl: atUrHomeImg,
      testimonialImg: atUrHomeTestimonial,
      links: [
        { label: "Case Study", url: "https://docs.google.com/document/d/1vpmzd8QccGyLyXEzMy2RCDO_oRWsapRXorcD1AdAEiM/edit?tab=t.0", icon: "◉" },
      ],
      color: "#F3E5F5", accent: "#6A1B9A", emoji: "✨",
    },
    
  ],
};

// ─────────────────────────────────────────────
// EMAILJS CONFIG — reads from .env
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
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
      background: accent + "18", color: accent, border: `1px solid ${accent}30`,
      borderRadius: "clamp(4px, 1vw, 6px)", 
      padding: "clamp(2px, 0.5vw, 2px) clamp(8px, 2vw, 10px)", 
      fontSize: "clamp(10px, 2vw, 11px)",
      fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em", fontWeight: 500,
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
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
      className="btn"
      style={{
        padding: "clamp(6px, 1.5vw, 7px) clamp(12px, 3vw, 16px)", 
        borderRadius: "clamp(6px, 1.5vw, 8px)", 
        fontSize: "clamp(11px, 2.5vw, 12px)", 
        background: accent, color: "#fff", border: "none",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "clamp(9px, 2vw, 10px)" }}>{link.icon}</span>
      <span>{link.label}</span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────
// TESTIMONIAL MODAL
// ─────────────────────────────────────────────
function TestimonialModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="modal-overlay"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-content"
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", 
            top: "clamp(12px, 3vw, 16px)", 
            right: "clamp(12px, 3vw, 16px)",
            background: "#f0f0f0", color: "var(--text-primary)", border: "none",
            borderRadius: "clamp(6px, 2vw, 8px)", 
            width: "clamp(28px, 6vw, 32px)", 
            height: "clamp(28px, 6vw, 32px)",
            cursor: "pointer", 
            fontSize: "clamp(16px, 4vw, 18px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          ×
        </button>
        
        <h3 style={{
          fontFamily: "'Syne', sans-serif", 
          fontSize: "clamp(18px, 4vw, 24px)",
          fontWeight: 800, color: project.accent, 
          marginBottom: "clamp(4px, 2vw, 8px)",
          paddingRight: "clamp(32px, 8vw, 48px)",
        }}>
          {project.title} - Client Testimonial
        </h3>
        
        <img
          src={project.testimonialImg}
          alt={`${project.title} testimonial`}
          style={{
            width: "100%", 
            borderRadius: "clamp(8px, 2vw, 12px)",
            border: `2px solid ${project.accent}30`,
            marginTop: "clamp(12px, 3vw, 16px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [showTestimonial, setShowTestimonial] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <AnimatePresence>
        {showTestimonial && project.testimonialImg && (
          <TestimonialModal 
            project={project} 
            onClose={() => setShowTestimonial(false)} 
          />
        )}
      </AnimatePresence>

    <motion.div
      ref={ref} custom={index} variants={fadeUp}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      style={{
        background: project.color, borderRadius: "clamp(12px, 3vw, 20px)", 
        padding: "clamp(20px, 4vw, 28px)",
        display: "flex", flexDirection: "column", gap: "clamp(10px, 2vw, 14px)", cursor: "default",
        border: `1.5px solid ${project.accent}18`, position: "relative", overflow: "hidden",
        transition: "box-shadow 0.3s",
        boxShadow: hovered
          ? `0 16px 48px ${project.accent}22, 0 2px 12px ${project.accent}14`
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{
        position: "absolute", top: -12, right: 12, fontSize: "clamp(60px, 15vw, 88px)",
        opacity: 0.07, pointerEvents: "none", userSelect: "none", lineHeight: 1,
      }}>
        {project.emoji}
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: "clamp(10px, 2vw, 11px)", fontFamily: "'DM Mono', monospace", color: project.accent,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, opacity: 0.8,
          }}>
            {project.category}
          </div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 800,
            color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em",
          }}>
            {project.title}
          </h3>
        </div>
        <span style={{ fontSize: "clamp(24px, 5vw, 30px)", flexShrink: 0 }}>{project.emoji}</span>
      </div>

      <p style={{ 
        fontFamily: "'DM Sans', sans-serif", 
        fontSize: "clamp(13px, 2.5vw, 14px)", 
        color: "var(--text-secondary)", 
        margin: 0, 
        lineHeight: 1.65 
      }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(4px, 1vw, 6px)" }}>
        {project.stack.map((t) => <Tag key={t} label={t} accent={project.accent} />)}
      </div>

      {project.coverUrl && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            borderRadius: "clamp(8px, 2vw, 12px)", overflow: "hidden",
            border: `1.5px solid ${project.accent}28`,
            background: project.accent + "12",
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

      {project.links.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(6px, 1.5vw, 8px)", marginTop: 2 }}>
          {project.links.map((l) => <LinkButton key={l.label} link={l} accent={project.accent} />)}
        </div>
      )}

      {project.testimonialImg && (
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowTestimonial(true)}
          className="btn"
          style={{
            marginTop: 4, width: "100%",
            background: project.accent, border: "none",
            color: "#fff",
            borderRadius: "clamp(8px, 2vw, 10px)",
            padding: "clamp(8px, 2vw, 10px) clamp(14px, 3vw, 20px)",
          }}
        >
          <span style={{ fontSize: "clamp(14px, 3vw, 16px)" }}>💬</span>
          <span>View Client Testimonial</span>
        </motion.button>
      )}
    </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────
// CONTACT SECTION  (EmailJS powered)
// ─────────────────────────────────────────────
function ContactSection({ email, github, upwork }) {
  const formRef   = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form,   setForm]   = useState({ from_name: "", reply_to: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

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
    { icon: "✉", label: "Email",  value: email,           href: `mailto:${email}` },
    { icon: "◉", label: "GitHub", value: "shammaskhann",  href: github },
    { icon: "⬡", label: "Upwork", value: "Hire on Upwork", href: upwork, color: "#14a800" },
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
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#777",
          margin: "0 auto", maxWidth: 600, lineHeight: 1.65, textAlign: "center",
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
                style={{
                  background: "#F0FDF4", border: "1.5px solid #BBF7D0",
                  borderRadius: 20, padding: "48px 32px", textAlign: "center",
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontSize: 24,
                  fontWeight: 800, color: "#166534", margin: "0 0 8px",
                }}>
                  Message Sent!
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", color: "#4A7C59",
                  margin: "0 0 28px", fontSize: 15,
                }}>
                  Thanks for reaching out. I'll reply shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStatus("idle")}
                  style={{
                    background: "#166534", color: "#fff", border: "none",
                    padding: "11px 26px", borderRadius: 10,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                    fontSize: 13, cursor: "pointer",
                  }}
                >
                  Send another
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form" ref={formRef} onSubmit={handleSubmit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{
                  background: "#fff", borderRadius: 20, padding: "32px",
                  border: "1.5px solid #ebebeb", display: "flex",
                  flexDirection: "column", gap: 18,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                {/* Name */}
                <div className="form-group">
                  <label className="form-label">
                    Your Name
                  </label>
                  <input
                    name="from_name" value={form.from_name} onChange={handleChange}
                    placeholder="John Doe" required className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email" name="reply_to" value={form.reply_to}
                    onChange={handleChange} placeholder="john@example.com"
                    required className="form-input"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">
                    Message
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project…" required rows={5}
                    className="form-input" style={{ resize: "vertical", minHeight: 130 }}
                  />
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div style={{
                    background: "#FEF2F2", border: "1px solid #FECACA",
                    borderRadius: 10, padding: "10px 14px",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#B91C1C",
                  }}>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit" disabled={status === "sending"}
                  whileHover={status !== "sending" ? { scale: 1.03 } : {}}
                  whileTap={status !== "sending"   ? { scale: 0.97 } : {}}
                  className="btn btn-primary"
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
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {sideLinks.map((item) => (
            <motion.a
              key={item.label} href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "#fff", border: "1.5px solid #ebebeb",
                borderRadius: 14, padding: "16px 18px",
                textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{
                fontSize: 18, width: 40, height: 40, borderRadius: 10,
                background: "#F4F4F4", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0, color: item.color || "var(--text-primary)",
              }}>
                {item.icon}
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--text-tertiary)",
                  letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2,
                  textAlign: "left",
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  fontWeight: 600, color: item.color || "var(--text-primary)",
                  textAlign: "left",
                }}>
                  {item.value}
                </div>
              </div>
            </motion.a>
          ))}

          {/* Response time badge */}
          <div style={{
            background: "var(--bg-primary)", border: "1.5px solid #e8e8e8",
            borderRadius: 14, padding: "14px 18px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#4CAF50", boxShadow: "0 0 6px #4CAF50", flexShrink: 0,
            }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555" }}>
              Typically replies within <strong>24 hours</strong>
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
  const { name, title, tagline, email, github, upwork, skills, projects } = PORTFOLIO_DATA;

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
              className="btn btn-primary"
            >
              ✉ Get in touch
            </motion.a>
            <motion.a
              href={github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="btn btn-outline"
            >
              ◉ GitHub
            </motion.a>
            <motion.a
              href={upwork} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="btn"
              style={{ background: "#14a800", color: "#fff" }}
            >
              ⬡ Upwork
            </motion.a>
          </div>
        </motion.div>

        {/* Skills strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginTop: "clamp(40px, 8vw, 56px)", display: "flex", flexWrap: "wrap", gap: "clamp(8px, 2vw, 10px)" }}
        >
          {skills.map((s) => (
            <span key={s} style={{
              fontFamily: "'DM Mono', monospace", 
              fontSize: "clamp(11px, 2vw, 12px)", 
              color: "#666",
              background: "#eee", 
              padding: "clamp(5px, 1vw, 6px) clamp(10px, 2vw, 14px)", 
              borderRadius: "clamp(6px, 1.5vw, 8px)", 
              letterSpacing: "0.02em",
            }}>
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
            <p className="section-subtitle">
              Selected Work
            </p>
            <h2 className="section-title">
              Projects
            </h2>
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

      {/* ── CONTACT ── */}
      <ContactSection email={email} github={github} upwork={upwork} />

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #e8e8e8", padding: "clamp(24px, 5vw, 32px)", textAlign: "center", width: "100%" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#aaa", margin: 0 }}>
          {name} · Flutter Developer · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}


