import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import { 
  Github, Mail, ArrowUpRight, MapPin, Newspaper, Home, Wrench, 
  Sparkles, Smartphone, Stethoscope, Car, ChevronLeft, ChevronRight, Code,
  Zap, Users, Trophy, Briefcase, Cpu, Download, ExternalLink
} from "lucide-react";

import BorderGlow from './components/BorderGlow';
import OrbitImages from './components/OrbitImages';

// ── ASSETS ────────────────────────────────────────────────
import aqareImg from "./assets/aqare.jpeg";
import mapoffImg from "./assets/mapoff.jpeg";
import carfixupImg from "./assets/carfixup.jpeg";
import smilelineImg from "./assets/smileline.jpeg";
import hammerloopImg from "./assets/Hammerloop.png";
import dailysindhyarImg from "./assets/dailysindyarcvr.jpg";
import atUrHomeImg from "./assets/atUrHomecvr.jpg";

const SKILL_ICONS = [
  "https://cdn.simpleicons.org/flutter/5E6AD2",
  "https://cdn.simpleicons.org/firebase/FFCA28",
  "https://cdn.simpleicons.org/dart/0175C2",
  "https://cdn.simpleicons.org/android/3DDC84",
  "https://cdn.simpleicons.org/ios/ffffff",
  "https://cdn.simpleicons.org/googlecloud/4285F4",
  "https://cdn.simpleicons.org/git/F05032",
  "https://cdn.simpleicons.org/getx/ffffff"
];

const PORTFOLIO_DATA = {
  name: "Shammas Khan",
  title: "Flutter App Developer",
  tagline: "Crafting polished mobile experiences — from concept to store.",
  email: "shammaskhann@gmail.com",
  github: "https://github.com/shammaskhann",
  linkedin: "https://linkedin.com/in/shammaskhann",
  stats: [
    { label: "Apps Shipped", value: "7+", icon: <Smartphone size={24} />, desc: "Production-ready applications" },
    { label: "Happy Clients", value: "15+", icon: <Users size={24} />, desc: "Businesses transformed" },
    { label: "Years in Dev", value: "3+", icon: <Briefcase size={24} />, desc: "Mobile expertise" },
    { label: "Code Commits", value: "1000+", icon: <Cpu size={24} />, desc: "Quality iterations" }
  ],
  projects: [
    { id: 1, title: "HammerLoop", type: "Workforce Ecosystem", desc: "A massive construction job-matching platform. Engineered trade-skill filtering, precise geolocation search, and high-frequency push notifications.", stack: ["Flutter", "FCM", "Firebase"], image: hammerloopImg, icon: <Wrench size={24} />, github: "https://github.com/shammaskhann", live: "https://play.google.com/store/apps/details?id=com.hammerloop.app" },
    { id: 2, title: "Aqare", type: "Real Estate Marketplace", desc: "Bilingual property ecosystem for Saudi market. Integrated NAFATH Govt API for verification and custom map-based property clustering.", stack: ["Flutter", "NAFATH API", "Maps"], image: aqareImg, icon: <Home size={24} />, github: "https://github.com/shammaskhann", live: "https://apps.apple.com/sa/app/aqare/id6741023384" },
    { id: 3, title: "Map Off", type: "Hyperlocal Marketing", desc: "Store-offer exploration engine. Features custom map markers, role-based access control, and deep-linking to specific shop deals.", stack: ["Flutter", "Maps SDK"], image: mapoffImg, icon: <MapPin size={24} />, github: "https://github.com/shammaskhann", live: "https://play.google.com/store/apps/details?id=net.mapoff.mapoffapp" },
    { id: 5, title: "Daily Sindhyar", type: "Media & News", desc: "Native performance wrapper for Sindhi news. Implemented full Google AdMob lifecycle and optimized WebView performance.", stack: ["WebView", "AdMob"], image: dailysindhyarImg, icon: <Newspaper size={24} />, github: "https://github.com/shammaskhann", live: "https://play.google.com/store/apps/details?id=com.dailysindhyar.app" },
    { id: 6, title: "Smileline", type: "Clinic Management", desc: "Dental healthcare platform. Automated patient scheduling and medical history tracking.", stack: ["Firebase", "WhatsApp API"], image: smilelineImg, icon: <Stethoscope size={24} />, github: "https://github.com/shammaskhann", live: "https://github.com/shammaskhann" },
    { id: 7, title: "AtUrHome", type: "UI Revamp", desc: "Complete visual redesign of a logistics platform. standarized design system components and interactive map routing.", stack: ["Flutter", "UI/UX"], image: atUrHomeImg, icon: <Sparkles size={24} />, github: "https://github.com/shammaskhann", live: "https://docs.google.com/document/d/1vpmzd8QccGyLyXEzMy2RCDO_oRWsapRXorcD1AdAEiM/edit" },
    { id: 4, title: "Car Fix Up", type: "Service Logistics", desc: "Connecting car owners with emergency help. Features real-time tow-truck tracking and ZegoCloud powered emergency video consultations.", stack: ["Flutter", "ZegoCloud"], image: carfixupImg, icon: <Car size={24} />, github: "https://github.com/shammaskhann/car_fix_up_fyp", live: "https://github.com/shammaskhann/car_fix_up_fyp" }
  ],
  experience: [
    { title: "Mobile App Developer", company: "iSky Information Technology", period: "Nov 2024 - Mar 2025", desc: "Developed bilingual Flutter apps with Google Maps integration and GetX management." },
    { title: "IT Intern", company: "Archroma Pakistan Limited", period: "Aug 2025 - Sept 2025", desc: "Assisted in FBR e-Invoicing integration and SAP Crystal Reports generation." },
    { title: "Freelance Flutter Dev", company: "Freelance", period: "Active", desc: "Building 60fps mobile experiences for global clients as a Top-Rated developer." }
  ]
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [experienceIdx, setExperienceIdx] = useState(0);

  const scrollRef = useRef(null);
  const formRef = useRef();
  const [status, setStatus] = useState("idle");

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIdx((prev) => (prev + newDirection + PORTFOLIO_DATA.projects.length) % PORTFOLIO_DATA.projects.length);
  };

  const handleTimelineScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const currentIdx = Math.round(scrollLeft / clientWidth);
    setExperienceIdx(currentIdx);
  };

  const project = PORTFOLIO_DATA.projects[activeIdx];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formRef.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => { setStatus("success"); formRef.current.reset(); }).catch(() => setStatus("error"));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <div className="grid-overlay" />
      
      <main className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* HERO SECTION */}
        <motion.section style={{ opacity: heroOpacity }} className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center py-20 gap-12">
          <div className="hidden lg:block relative h-[600px] w-full">
            <OrbitImages images={SKILL_ICONS} radiusX={220} radiusY={220} duration={25} itemSize={70} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-mono tracking-[0.2em] text-accent uppercase mb-8">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span></span>
              Shammas.Dev_Engine
            </div>
            <h1 className="text-6xl font-bold tracking-tight md:text-8xl leading-[0.9] mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">{PORTFOLIO_DATA.name}</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="bg-gradient-to-r from-accent via-indigo-400 to-accent bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">{PORTFOLIO_DATA.title}</span>
            </h2>
            <p className="max-w-xl text-lg text-foreground-muted leading-relaxed mb-12">{PORTFOLIO_DATA.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => window.open(`mailto:${PORTFOLIO_DATA.email}`)} className="btn-primary"><Mail size={18} /> Contact</button>
              <button onClick={() => window.open(PORTFOLIO_DATA.github, "_blank")} className="btn-secondary"><Github size={18} /> GitHub</button>
            </div>
          </div>
        </motion.section>

        {/* STATS SECTION */}
        <motion.section className="py-24 border-t border-white/[0.06] relative" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO_DATA.stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <BorderGlow 
                  className="w-full"
                  borderRadius={16}
                  glowRadius={30}
                  edgeSensitivity={27}
                  backgroundColor="#120F17"
                  colors={['#c084fc', '#f472b6', '#38bdf8']}
                >
                  <div className="bg-background-elevated/40 p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent mb-6 inline-block">
                      {stat.icon}
                    </div>
                    <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>{stat.value}</div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted uppercase mb-2">{stat.label}</p>
                    <p className="text-sm text-foreground-subtle">{stat.desc}</p>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PROJECT SLIDER */}
        <section className="py-32 border-t border-white/[0.06] relative">
          <div className="mb-16 text-center">
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-4">Project Archive</h3>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-outfit)' }}>Software Engineering</h2>
            <p className="mt-6 text-lg text-foreground-muted max-w-2xl mx-auto">A curated collection of production-grade applications impacting millions of users worldwide</p>
          </div>

          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 md:-px-16 pointer-events-none z-30">
            <button onClick={() => paginate(-1)} className="pointer-events-auto p-4 md:p-6 rounded-full border border-white/5 hover:border-accent/40 bg-background-base/20 backdrop-blur-sm transition-all text-foreground-muted hover:text-white group">
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
            <button onClick={() => paginate(1)} className="pointer-events-auto p-4 md:p-6 rounded-full border border-white/5 hover:border-accent/40 bg-background-base/20 backdrop-blur-sm transition-all text-foreground-muted hover:text-white group">
              <ChevronRight size={32} strokeWidth={1} />
            </button>
          </div>

          <div className="relative min-h-[600px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div 
                key={activeIdx} 
                initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl"
              >
                <BorderGlow 
                  className="w-full"
                  borderRadius={34}
                  glowRadius={60}
                  edgeSensitivity={27}
                  backgroundColor="#120F17"
                  colors={['#c084fc', '#f472b6', '#38bdf8']}
                >
                  <div className="flex flex-col lg:flex-row min-h-[550px] bg-background-elevated/40">
                    <div className="relative w-full lg:w-[55%] h-[300px] lg:h-auto border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover grayscale-[20%]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-background-base/40 to-transparent" />
                      <a href={project.github} target="_blank" className="absolute bottom-6 right-6 flex items-center gap-2 bg-background-base/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-xs font-mono text-white hover:bg-accent transition-all z-20"><Code size={14} /> SOURCE_CODE</a>
                    </div>
                    <div className="flex-1 p-8 lg:p-14 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent">{project.icon}</div>
                         <div>
                            <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{project.type}</p>
                            <h4 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">{project.title}</h4>
                         </div>
                      </div>
                      <p className="text-lg text-foreground-muted leading-relaxed mb-10">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {project.stack.map(s => (
                          <span key={s} className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[10px] text-foreground-subtle uppercase tracking-widest">{s}</span>
                        ))}
                      </div>
                      <button onClick={() => window.open(project.live, "_blank")} className="btn-primary w-fit uppercase text-xs tracking-[0.2em]">Explore Project <ArrowUpRight size={18} /></button>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* TECH STACK SHOWCASE */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mb-16 text-center">
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-4">Arsenal</h3>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-outfit)' }}>Technology Stack</h2>
            <p className="mt-6 text-lg text-foreground-muted max-w-2xl mx-auto">Handpicked tools and frameworks crafted for performance, scalability, and user delight</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {SKILL_ICONS.map((icon, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="group relative"
              >
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/40 cursor-pointer">
                  <img src={icon} alt={`tech-${idx}`} className="w-12 h-12 mx-auto group-hover:brightness-125 transition-all" />
                  <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CARRIER LOG */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mb-16">
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-4">Carrier Log</h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-outfit)' }}>Experience Timeline</h2>
            <p className="mt-6 text-lg text-foreground-muted">Professional journey building scalable, user-centric mobile applications</p>
          </div>

          {/* Wrapper with horizontal touch-scrolling enabled, native scrollbars fully hidden */}
          <div 
            ref={scrollRef}
            onScroll={handleTimelineScroll}
            className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PORTFOLIO_DATA.experience.map((exp, i) => (
              <div key={i} className="min-w-[90%] md:min-w-[48%] lg:min-w-0 snap-center flex flex-col h-full">
                <BorderGlow 
                  className="w-full flex-1"
                  borderRadius={16}
                  glowRadius={30}
                  edgeSensitivity={30}
                  backgroundColor="#120F17"
                >
                  <div className="bg-background-elevated/40 h-full p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-accent mb-4 block uppercase tracking-widest">{exp.period}</span>
                      <h4 className="text-2xl font-bold mb-1 text-white tracking-tight">{exp.company}</h4>
                      <p className="text-foreground-muted text-sm mb-6 font-medium">{exp.title}</p>
                      <p className="text-sm text-foreground-subtle leading-relaxed mb-8">{exp.desc}</p>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>

          {/* Animated Interactive Dot Pagination Indicators for mobile view */}
          <div className="flex lg:hidden justify-center items-center gap-2.5 mt-8">
            {PORTFOLIO_DATA.experience.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  experienceIdx === i ? "w-6 bg-accent" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h3 className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-6">Contact</h3>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>Let's Build Something Great</h2>
              <p className="text-foreground-muted mb-8">Got an exciting mobile app idea? Let's collaborate and turn your vision into reality. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
              <div className="space-y-6">
                <a href={`mailto:${PORTFOLIO_DATA.email}`} className="flex items-center gap-4 text-foreground-muted hover:text-white transition-all group"><div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent"><Mail size={20} /></div><span className="font-mono text-sm">{PORTFOLIO_DATA.email}</span></a>
                <a href={PORTFOLIO_DATA.github} target="_blank" className="flex items-center gap-4 text-foreground-muted hover:text-white transition-all group"><div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent"><Github size={20} /></div><span className="font-mono text-sm">github/shammaskhann</span></a>
              </div>
            </div>
            <div className="lg:col-span-7">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="from_name" required className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-accent outline-none text-white" placeholder="IDENT_NAME" />
                  <input name="reply_to" type="email" required className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-accent outline-none text-white" placeholder="REPLY_ADDR" />
                </div>
                <textarea name="message" required rows={5} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-accent outline-none text-white resize-none" placeholder="TRANSMISSION_PAYLOAD..." />
                <button type="submit" className="w-full btn-primary justify-center uppercase tracking-widest">{status === "sending" ? "TRANSMITTING..." : "Send Transmission"}</button>
                {status === "success" && <p className="text-center font-mono text-xs text-green-400 mt-4">Payload delivered.</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/[0.06] bg-background-deep text-center relative z-10 font-mono text-[10px] tracking-[0.5em] text-foreground-subtle uppercase">&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name} // BUILT FOR SCALE</footer>
    </div>
  );
}