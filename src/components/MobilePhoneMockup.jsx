import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Database, Smartphone, Zap, Book, Cloud, 
  Layers, Cpu, Figma, GitBranch, Terminal, Rocket 
} from 'lucide-react';

export default function MobilePhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [time, setTime] = useState('9:41');
  const [dateStr, setDateStr] = useState('Friday, May 29');
  
  const screens = [
    {
      title: "Mobile Development",
      subtitle: "Core Skills",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { icon: Code2, name: "Flutter", desc: "Cross-platform" },
        { icon: Smartphone, name: "Kotlin", desc: "Native Android" },
        { icon: Cloud, name: "Swift", desc: "Native iOS" }
      ]
    },
    {
      title: "Backend & Database",
      subtitle: "Infrastructure",
      color: "from-yellow-500 to-orange-500",
      skills: [
        { icon: Database, name: "Firebase", desc: "Real-time DB" },
        { icon: Cloud, name: "REST APIs", desc: "Backend Services" },
        { icon: Layers, name: "SQL", desc: "Data Management" }
      ]
    },
    {
      title: "Frontend & State",
      subtitle: "App Architecture",
      color: "from-green-500 to-emerald-500",
      skills: [
        { icon: Zap, name: "GetX", desc: "State Management" },
        { icon: Layers, name: "Provider", desc: "Clean Patterns" },
        { icon: Book, name: "UI/UX", desc: "Beautiful Design" }
      ]
    },
    {
      title: "Tools & Workflow",
      subtitle: "Development Stack",
      color: "from-purple-500 to-pink-500",
      skills: [
        { icon: GitBranch, name: "Git", desc: "Version Control" },
        { icon: Terminal, name: "CLI", desc: "Development Tools" },
        { icon: Figma, name: "Figma", desc: "Design Tools" }
      ]
    },
    {
      title: "Ready to Learn",
      subtitle: "Backend Infrastructure",
      color: "from-orange-500 to-red-500",
      skills: [
        { icon: Rocket, name: "Spring Boot", desc: "Java Framework" },
        { icon: Cpu, name: "Microservices", desc: "System Design" },
        { icon: Cloud, name: "Cloud Deploy", desc: "DevOps" }
      ],
      highlight: true
    }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
      
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      setDateStr(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    const rotateScreen = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    
    return () => {
      clearInterval(timer);
      clearInterval(rotateScreen);
    };
  }, []);

  const current = screens[activeScreen];
  
  const getPillClass = (index) => {
    const classes = ['bg-blue-500/30 border-blue-500/50', 'bg-cyan-500/30 border-cyan-500/50', 'bg-purple-500/30 border-purple-500/50', 'bg-orange-500/30 border-orange-500/50', 'bg-yellow-500/30 border-yellow-500/50', 'bg-green-500/30 border-green-500/50'];
    return classes[index % classes.length];
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
        
        .iphone-outer-custom {
          width: 320px;
          height: 680px;
          background: linear-gradient(145deg, #2a2a2e, #1a1a1d, #2a2a2e);
          border-radius: 56px;
          padding: 4px;
          box-shadow: 0 0 0 1px #4a4a50, inset 0 0 0 1px #3a3a40, 0 40px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4);
          position: relative;
        }
        
        .iphone-screen-custom {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 52px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        
        .screen-bg-custom {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #0d1b2a 0%, #1a0a2e 40%, #0a1628 70%, #101820 100%);
          z-index: 0;
        }
        
        .bg-orb1 {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(99,63,224,0.25) 0%, transparent 70%);
          top: 60px;
          left: -40px;
          z-index: 0;
        }
        
        .bg-orb2 {
          position: absolute;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(30,120,255,0.2) 0%, transparent 70%);
          bottom: 80px;
          right: -20px;
          z-index: 0;
        }
        
        .status-bar-custom {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 14px 24px 0;
          height: 50px;
          font-family: 'Roboto', sans-serif;
        }
        
        .screen-content-custom {
          flex: 1;
          position: relative;
          z-index: 5;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 8px 0;
        }
        
        .clock-section-custom {
          text-align: center;
          padding: 10px 0 14px;
        }
        
        .clock-time-custom {
          font-family: 'Roboto', sans-serif;
          font-size: 64px;
          font-weight: 200;
          color: #fff;
          letter-spacing: -3px;
          line-height: 1;
        }
        
        .clock-date-custom {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          margin-top: 4px;
        }
        
        .skill-card-custom {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 20px;
          padding: 16px 18px;
          margin: 0 16px 12px;
          animation: slideInCustom 0.4s ease forwards;
          opacity: 0;
          transform: translateY(8px);
        }
        
        .skill-card-custom.active {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.28);
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes slideInCustom {
          to { opacity: 1; transform: translateY(0); }
        }
        
        .skill-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .skill-title {
          font-family: 'Roboto', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }
        
        .skill-subtitle {
          font-family: 'Roboto', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
          line-height: 1.4;
          margin-bottom: 10px;
        }
        
        .skill-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .skill-pill {
          font-family: 'Roboto', sans-serif;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 16px;
          border: 1px solid;
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
        
        .home-bar-custom {
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
          flex-shrink: 0;
        }
        
        .home-indicator-custom {
          width: 120px;
          height: 5px;
          background: rgba(255,255,255,0.5);
          border-radius: 10px;
        }
        
        .dot-row-custom {
          display: flex;
          justify-content: center;
          gap: 6px;
          padding: 8px 0 4px;
          position: relative;
          z-index: 5;
        }
        
        .dot-custom {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: all 0.3s;
          cursor: pointer;
        }
        
        .dot-custom.on {
          background: #fff;
          transform: scale(1.3);
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="iphone-outer-custom">
          <div className="iphone-screen-custom">
            <div className="screen-bg-custom"></div>
            <div className="bg-orb1"></div>
            <div className="bg-orb2"></div>

            {/* Status Bar */}
            <div className="status-bar-custom">
              <span className="text-white text-xs font-semibold">Coding</span>
              <div className="flex items-center gap-2 text-white text-xs">
                <span>5G</span>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <rect x="0" y="4" width="3" height="8" rx="1" fill="rgba(255,255,255,0.4)"/>
                  <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="rgba(255,255,255,0.6)"/>
                  <rect x="9" y="1" width="3" height="11" rx="1" fill="rgba(255,255,255,0.85)"/>
                  <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#fff"/>
                </svg>
                <span>100%🔋</span>
              </div>
            </div>

            {/* Dynamic Island */}
            <motion.div
              className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 border border-gray-800"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Content */}
            <div className="screen-content-custom">
              <div className="clock-section-custom">
                <div className="clock-time-custom">{time}</div>
                <div className="clock-date-custom">{dateStr}</div>
              </div>

              <div className="dot-row-custom">
                {screens.map((_, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => setActiveScreen(idx)}
                    className={`dot-custom ${idx === activeScreen ? 'on' : ''}`}
                    animate={{
                      scale: idx === activeScreen ? 1.3 : 1,
                      backgroundColor: idx === activeScreen ? '#fff' : 'rgba(255,255,255,0.3)'
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                ))}
              </div>

              {/* Skill Cards */}
              <motion.div
                key={`skill-${activeScreen}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="skill-card-custom active">
                  <div className="skill-header">
                    <span className="text-lg">📱</span>
                  </div>
                  <div className="skill-title">{current.title}</div>
                  <div className="skill-subtitle">{current.subtitle}</div>
                  
                  <div className="space-y-3">
                    {current.skills.map((skill, idx) => {
                      const IconComponent = skill.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">{skill.name}</p>
                            <p className="text-xs text-white/60">{skill.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {current.highlight && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 p-2 bg-white/15 rounded-lg border border-white/20 text-center text-xs font-semibold text-white"
                    >
                      🚀 Actively learning & exploring!
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Home Indicator */}
            <div className="home-bar-custom">
              <div className="home-indicator-custom"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
