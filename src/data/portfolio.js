// ─────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH — CONTENT
//  Text is unchanged from the original portfolio.
//  Only artwork references and display metadata live here.
// ─────────────────────────────────────────────
import aqareLg from "../assets/opt/aqare-lg.jpg";
import aqareThumb from "../assets/opt/aqare-thumb.jpg";
import atUrHomeLg from "../assets/opt/aturhomecvr-lg.jpg";
import atUrHomeThumb from "../assets/opt/aturhomecvr-thumb.jpg";
import carfixupLg from "../assets/opt/carfixup-lg.jpg";
import carfixupThumb from "../assets/opt/carfixup-thumb.jpg";
import courtifyLg from "../assets/opt/courtify-lg.jpg";
import courtifyThumb from "../assets/opt/courtify-thumb.jpg";
import dailysindhyarLg from "../assets/opt/dailysindyarcvr-lg.jpg";
import dailysindhyarThumb from "../assets/opt/dailysindyarcvr-thumb.jpg";
import hammerloopLg from "../assets/opt/hammerloop-lg.jpg";
import hammerloopThumb from "../assets/opt/hammerloop-thumb.jpg";
import mapoffLg from "../assets/opt/mapoff-lg.jpg";
import mapoffThumb from "../assets/opt/mapoff-thumb.jpg";
import smilelineLg from "../assets/opt/smileline-lg.jpg";
import smilelineThumb from "../assets/opt/smileline-thumb.jpg";
import sonddosLg from "../assets/opt/sonddos-lg.jpg";
import sonddosThumb from "../assets/opt/sonddos-thumb.jpg";
import washappLg from "../assets/opt/washapp-lg.jpg";
import washappThumb from "../assets/opt/washapp-thumb.jpg";

const ART = {
  aqare: { lg: aqareLg, thumb: aqareThumb },
  aturhome: { lg: atUrHomeLg, thumb: atUrHomeThumb, fit: "contain" },
  carfixup: { lg: carfixupLg, thumb: carfixupThumb },
  courtify: { lg: courtifyLg, thumb: courtifyThumb },
  dailysindhyar: { lg: dailysindhyarLg, thumb: dailysindhyarThumb },
  hammerloop: { lg: hammerloopLg, thumb: hammerloopThumb },
  mapoff: { lg: mapoffLg, thumb: mapoffThumb },
  smileline: { lg: smilelineLg, thumb: smilelineThumb },
  sonddos: { lg: sonddosLg, thumb: sonddosThumb },
  washapp: { lg: washappLg, thumb: washappThumb },
};

const PORTFOLIO_DATA = {
  name: "Shammas Khan",
  title: "Software Engineer - Full Stack Mobile App Developer ",
  tagline: "Building production-ready mobile applications and scalable product ecosystems — from mobile UI to backend APIs and cloud infrastructure.",
  email: "shammas.khan90321@gmail.com",
  github: "https://github.com/shammaskhann",
  linkedin: "https://linkedin.com/in/shammaskhan",

  skills: [
    "Flutter", "Dart", "Swift", "SwiftUI", "iOS & Android",
    "Java", "Spring Boot", "REST APIs", "Spring Security",
    "PostgreSQL", "Redis", "RabbitMQ", "MongoDB", "SQL Server", "Supabase", "Firebase",
    "AWS", "AWS EKS", "AWS S3", "Docker", "NGINX", "Terraform", "CI/CD (GitHub Actions)",
    "Clean Architecture", "Bloc", "GetX",
    "Google Maps SDK", "Push Notifications (FCM)", "AdMob", "ZegoCloud", "NAFATH API"
  ],

  projects: [
    {
      id: 1,
      title: "Courtify — Sports Court Booking Platform",
      category: "Full-Stack Booking Platform",
      description:
        "Full-stack sports booking platform featuring a Spring Boot backend and Flutter frontend, deployed on AWS. Includes Court Owner App (venue, court, and booking management) and Player App (court browsing, bookings, equipment marketplace) backed by PostgreSQL, Redis caching, AWS S3, and Firebase phone auth.",
      stack: ["Spring Boot", "Flutter", "AWS", "PostgreSQL", "Redis", "S3", "Firebase Auth"],
      art: ART.courtify,
      links: [
        { label: "Website", url: "https://www.courtify.pk", icon: "🌐" },
        { label: "Top 7 Startups (IoBM)", url: "https://incubation.iobm.edu.pk/startup-cohort-5/", icon: "🎖️" },
      ],
      accent: "#FF4500", emoji: "🏆",
    },
    {
      id: 2,
      title: "HammerLoop",
      category: "Workforce Platform",
      description:
        "Construction job-matching platform with dual worker/employer roles, trade-skill filtering, geolocation-based search, and real-time push notifications.",
      stack: ["Flutter", "API Integrations", "OpenStreetMap", "Firebase", "FCM"],
      art: ART.hammerloop,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.hammerloop.app", icon: "▶" },
        { label: "App Store", url: "https://apps.apple.com/ng/app/hammerloop/id6756441384", icon: "◆" },
      ],
      accent: "#FF4500", emoji: "⚒️",
    },
    {
      id: 3,
      title: "Washapp",
      category: "On‑Demand Services",
      description:
        "Multi-sided laundry pickup and delivery ecosystem operating in the Philippines connecting customers, riders, and vendors with real-time tracking and payments.",
      stack: ["Flutter", "Google Maps", "Firebase", "Payment Gateway"],
      art: ART.washapp,
      links: [
        { label: "Customer App", url: "https://apps.apple.com/ph/app/customer-washapp/id6478976728", icon: "◆" },
        { label: "Rider App", url: "https://apps.apple.com/ph/app/rider-washapp/id6478977966", icon: "◆" },
        { label: "Vendor App", url: "https://apps.apple.com/ph/app/vendor-washapp/id6478974984", icon: "◆" },
      ],
      accent: "#FF4500", emoji: "🧺",
    },
    {
      id: 4,
      title: "Inventory Tracking System",
      category: "Backend & Microservices",
      description:
        "High-scale backend designed for 1,000+ retail stores, migrated from SQLite to master-slave SQL Server. Implemented Redis caching, RabbitMQ messaging, Dockerized microservices behind NGINX, and secured with JWT, Spring Security, and Resilience4j rate limiting.",
      stack: ["Java", "Spring Boot", "SQL Server", "Redis", "RabbitMQ", "Docker", "NGINX", "Spring Security"],
      links: [
        { label: "GitHub Repo", url: "https://github.com/shammaskhann/Bazaar-Inventory-Tracking-System", icon: "◉" },
      ],
      accent: "#FF4500", emoji: "📦",
    },
    {
      id: 5,
      title: "Aqare",
      category: "Real Estate",
      description:
        "Bilingual property marketplace with map-based listings, auction modules, and Saudi Govt NAFATH digital identity verification.",
      stack: ["Flutter", "Google Maps SDK", "NAFATH API", "API Integrations"],
      art: ART.aqare,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=net.aqare.aqareapp", icon: "▶" },
        { label: "App Store", url: "https://apps.apple.com/sa/app/aqare/id6741023384", icon: "◆" },
      ],
      accent: "#FF4500", emoji: "🏠",
    },
    {
      id: 6,
      title: "Map Off",
      category: "Location & Offers",
      description:
        "Bilingual store-offer explorer using Google Maps with custom markers, deep linking, and role-based access for guests, customers, and shop owners.",
      stack: ["Flutter", "Google Maps SDK", "API Integrations"],
      art: ART.mapoff,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=net.mapoff.mapoffapp", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "📍",
    },
    {
      id: 7,
      title: "Daily Sindhyar",
      category: "News App",
      description:
        "Sindhi-language news app wrapping dailysindhyar.com in a native WebView shell with complete AdMob setup — published successfully on Google Play Store.",
      stack: ["Flutter", "WebView", "AdMob"],
      art: ART.dailysindhyar,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.dailysindhyar.app", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "📰",
    },
    {
      id: 8,
      title: "Car Fix Up",
      category: "Auto Services",
      description:
        "Dual-role platform connecting car owners and mechanics — live tow-truck tracking, video call emergencies via ZegoCloud, repair estimates, and booking.",
      stack: ["Flutter", "Firebase", "ZegoCloud SDK", "Google Maps SDK"],
      art: ART.carfixup,
      links: [
        { label: "Screenshots", url: "https://github.com/shammaskhann/car_fix_up_fyp", icon: "◉" },
      ],
      accent: "#FF4500", emoji: "🔧",
    },
    {
      id: 9,
      title: "Smileline",
      category: "Clinic Management",
      description:
        "Full-featured dental clinic app — appointments, medical history, invoicing, prescriptions, and automated WhatsApp reminders via Firebase Cloud Functions.",
      stack: ["Flutter", "Firebase", "WhatsApp Business API", "FCM"],
      art: ART.smileline,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.smileline.patient", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "🦷",
    },
    {
      id: 10,
      title: "Sonddos",
      category: "Recruitment",
      description:
        "Dedicated platform for Saudi families to manage and hire domestic help (maids, nannies, workers). Allows recruitment, visa processing, contract management, and sponsorship transfers.",
      stack: ["Flutter", "API Integrations", "Firebase"],
      art: ART.sonddos,
      links: [
        { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.sonddossa.sonddosapp", icon: "▶" },
      ],
      accent: "#FF4500", emoji: "👳‍♂️",
    },
    {
      id: 11,
      title: "AtUrHome",
      category: "UI Revamp",
      description:
        "Complete UI overhaul of a logistics app — animated navigation, illustrated error states, wallet graph, and theme standardization across all screens.",
      stack: ["Flutter", "Map Routing", "UI/UX"],
      art: ART.aturhome,
      links: [
        { label: "Case Study", url: "https://docs.google.com/document/d/1vpmzd8QccGyLyXEzMy2RCDO_oRWsapRXorcD1AdAEiM/edit?tab=t.0", icon: "◉" },
      ],
      accent: "#FF4500", emoji: "✨",
    },
  ],

  experience: [
    {
      title: "Mobile App Developer — Flutter & iOS",
      company: "ForInApps · Karachi",
      description:
        "• Engineer scalable cross-platform Flutter applications and native iOS applications.\n• Migrated a complete native iOS application to Flutter, enabling Android deployment from a shared codebase while maintaining native UI and performance standards.\n• Developed 4 native iOS applications using SwiftUI.\n• Integrated Firebase and Supabase for authentication, real-time synchronization, and backend services.\n• Built a Flutter application with a Next.js admin dashboard backed by Supabase/PostgreSQL and Row-Level Security.\n• Work across Flutter, Dart, SwiftUI, Swift, Next.js, Supabase, Firebase, PostgreSQL, and REST APIs.",
      period: "Jul 2026 – Present",
      links: {}
    },
    {
      title: "Co-Founder & CTO",
      company: "Courtify.pk · Karachi",
      description:
        "Co-founded and engineered Courtify.pk, a sports-tech platform spanning mobile applications, backend services, databases, and cloud infrastructure.\n• Built the cross-platform mobile application using Flutter.\n• Developed real-time facility booking and tournament tracking functionality.\n• Engineered a high-concurrency Spring Boot backend for secure reservations and complex league data models.\n• Designed and provisioned cloud infrastructure using Terraform (IaC).\n• Managed containerized workloads on AWS EKS using Helm.\n• Built end-to-end GitHub Actions CI/CD pipelines for automated deployments and zero-downtime updates.\n• Worked across the complete product engineering lifecycle — mobile → backend → database → cloud → CI/CD.",
      period: "Mar 2026 – Present",
      links: {}
    },
    {
      title: "Mobile App Developer — Flutter (Freelance)",
      company: "QHub Tech · Karachi",
      description:
        "• Delivered production-ready Flutter applications including HammerLoop, WashApp, and Smileline across healthcare, workforce management, and on-demand services.\n• Developed applications from requirements gathering through production deployment.\n• Integrated REST APIs, Firebase, push notifications, Google Maps, authentication, payment gateways, and third-party SDKs.\n• Designed scalable and maintainable application architectures.\n• Optimized application performance and resolved production issues.\n• Published and maintained applications on Google Play Store and Apple App Store.\n• Worked using Git, Agile methodologies, code reviews, and collaborative development practices.",
      period: "Jan 2025 – Jan 2026",
      links: {}
    },
    {
      title: "Information Technology Intern — .NET",
      company: "Archroma · Karachi",
      description:
        "• Assisted with FBR e-Invoicing integration using PRAL-provided APIs within a .NET C# environment.\n• Contributed to integrating SAP Crystal Reports into a C# application.\n• Worked on e-invoice generation with FBR QR code support.",
      period: "Aug 2025 – Sep 2025",
      links: {
        "offer letter": "https://drive.google.com/file/d/1MvjNEOIsmHDsYwrmjMC8sV1S6ayIy5Q8/view?usp=sharing",
        "internship certificate": "https://drive.google.com/file/d/1H70ggOO8VRVYnc-vbSIcCys8KcQbJvBa/view?usp=sharing",
      }
    },
    {
      title: "Mobile Application Developer",
      company: "i Sky Information Technology · Dubai, UAE",
      description:
        "• Developed and maintained multilingual Arabic/English Flutter applications.\n• Integrated Google Maps and REST APIs with GetX state management.\n• Optimized application startup and load performance; fixed memory leaks.\n• Resolved UI and production issues across multiple devices.\n• Improved real-time location tracking, animations, and transitions.\n• Apps worked on: Aqare, Map Off, Sonddos.",
      period: "Nov 2024 – Mar 2025",
      links: {
        "offer letter": "https://drive.google.com/file/d/1UL37WOkYHzBfYP9iKSV9IX90oCCR9LeK/view?usp=sharing",
        "exp letter": "https://drive.google.com/file/d/1apWgMwTHIRp6nAmMkhtbSnHDSVgKiBpb/view?usp=sharing"
      }
    },
    {
      title: "Mobile App Developer — Flutter (Freelance)",
      company: "Esol Information Technology · UAE",
      description:
        "• Worked on production Flutter applications including Aqare, Map Off, and Sonddos across real estate, mapping, and business domains.\n• Developed and maintained Flutter applications from feature development through production release.\n• Built responsive and reusable Flutter UI components.\n• Integrated REST APIs, Firebase, Google Maps, authentication, localization, and payment solutions.\n• Optimized application performance and resolved production issues.\n• Managed Google Play Store and Apple App Store releases.\n• Participated in code reviews, bug fixes, feature development, and Agile workflows.",
      period: "Jul 2024 – Nov 2024",
      links: {}
    },
  ],

  education: [
    {
      title: "BS in Computer Science",
      institution: "Bahria University Karachi",
      description:
        "Bachelor of Science in Computer Science with a focus on software engineering, mobile systems, backend architectures, and algorithms. Built production-grade mobile and full-stack projects.",
      period: "Sep 2022 – Jun 2026",
      links: {}
    },
  ],
};

export const PROFILE = {
  location: "Karachi, Pakistan",
  availability: "Available for full-time & contract",
};

export const SKILL_GROUPS = [
  {
    index: "01",
    label: "Mobile",
    note: "Product UI, native iOS, and cross-platform delivery.",
    items: ["Flutter", "Dart", "Swift", "SwiftUI", "iOS & Android", "Clean Architecture", "Bloc", "GetX"],
  },
  {
    index: "02",
    label: "Backend",
    note: "APIs, data models, and high-concurrency services.",
    items: ["Java", "Spring Boot", "REST APIs", "Spring Security", "PostgreSQL", "SQL Server", "MongoDB", "Redis", "RabbitMQ"],
  },
  {
    index: "03",
    label: "Cloud & DevOps",
    note: "Provisioning, containers, and zero-downtime delivery.",
    items: ["AWS", "AWS EKS", "AWS S3", "Docker", "NGINX", "Terraform", "CI/CD (GitHub Actions)"],
  },
  {
    index: "04",
    label: "Integrations",
    note: "The third-party pieces that make products real.",
    items: ["Google Maps SDK", "Push Notifications (FCM)", "AdMob", "ZegoCloud", "NAFATH API", "Supabase", "Firebase"],
  },
];

export const CORE_STACK = ["Flutter", "SwiftUI", "Spring Boot", "PostgreSQL", "AWS"];

export default PORTFOLIO_DATA;
