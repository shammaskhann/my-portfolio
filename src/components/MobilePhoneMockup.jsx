import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Database, Smartphone, Zap, Book, Cloud, 
  Layers, Cpu, Figma, GitBranch, Terminal, Rocket 
} from 'lucide-react';

export default function MobilePhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [time, setTime] = useState('9:41');
  
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
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }, 1000);
    
    const rotateScreen = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    
    return () => {
      clearInterval(timer);
      clearInterval(rotateScreen);
    };
  }, []);

  const current = screens[activeScreen];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* iPhone Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Outer bezel */}
        <div className="relative w-80 h-[640px] bg-black rounded-[2.75rem] shadow-2xl border-[12px] border-gray-950 overflow-hidden">
          
          {/* Top status bar area */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent z-40 flex items-start justify-between px-6 pt-2">
            <span className="text-white text-xs font-semibold">Coding</span>
            <div className="flex items-center gap-1 text-white text-xs">
              <span>📶</span>
              <span>5G</span>
            </div>
            <div className="text-white text-xs">100%🔋</div>
          </div>

          {/* Dynamic Island */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 border border-gray-800"
          />

          {/* Screen content area */}
          <div className="absolute inset-0 pt-16 pb-6 px-4 overflow-hidden">
            {/* Time display */}
            <motion.div 
              className="text-center mb-2"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-4xl font-bold text-white tracking-wider">{time}</div>
            </motion.div>

            {/* Screen content */}
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`h-[calc(100%-6rem)] bg-gradient-to-br ${current.color} rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white overflow-hidden`}
            >
              {/* Title */}
              <h2 className="text-xl font-bold mb-1">{current.title}</h2>
              <p className="text-xs opacity-80 mb-4">{current.subtitle}</p>

              {/* Skills grid */}
              <div className="grid grid-cols-3 gap-3 w-full">
                {current.skills.map((skill, idx) => {
                  const IconComponent = skill.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                        current.highlight 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-white/10 backdrop-blur-sm'
                      } hover:bg-white/30 transition-all`}
                    >
                      <IconComponent className="w-6 h-6 mb-1" />
                      <p className="text-xs font-semibold leading-tight">{skill.name}</p>
                      <p className="text-[10px] opacity-75">{skill.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

              {current.highlight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-xs font-semibold text-center px-2 py-2 bg-white/20 rounded-lg border border-white/30"
                >
                  🚀 Actively learning & exploring!
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white rounded-full" />

          {/* Screen reflection shine */}
          <div className="absolute inset-0 rounded-[2.5rem] opacity-10 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {screens.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveScreen(idx)}
              animate={{
                scale: idx === activeScreen ? 1.3 : 1,
                backgroundColor: idx === activeScreen ? '#a855f7' : 'rgba(255,255,255,0.3)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-2 h-2 rounded-full transition-all cursor-pointer"
              aria-label={`Go to screen ${idx + 1}`}
            />
          ))}
        </div>

        {/* Glowing background effect */}
        <div className="absolute -inset-24 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
      </motion.div>
    </div>
  );
}
