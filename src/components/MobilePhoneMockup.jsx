import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MobilePhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0);
  
  const screens = [
    {
      title: "Flutter",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
      features: ["60fps Performance", "Cross-platform", "Beautiful UIs"]
    },
    {
      title: "Firebase",
      icon: "🔥",
      color: "from-yellow-500 to-orange-500",
      features: ["Real-time DB", "Auth", "Cloud Functions"]
    },
    {
      title: "Native APIs",
      icon: "📱",
      color: "from-green-500 to-emerald-500",
      features: ["iOS/Android", "Sensors", "Camera & Maps"]
    },
    {
      title: "State Management",
      icon: "⚙️",
      color: "from-purple-500 to-pink-500",
      features: ["GetX", "Provider", "Clean Architecture"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = screens[activeScreen];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phone Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Outer phone bezel */}
        <div className="relative w-72 h-96 bg-black rounded-[3.5rem] shadow-2xl border-8 border-gray-900 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />
          
          {/* Screen */}
          <div className="absolute inset-8 bg-black rounded-3xl overflow-hidden">
            {/* Status bar */}
            <div className="h-8 bg-black flex items-center justify-between px-4 text-white text-[10px] font-mono">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>📶</span>
                <span>📡</span>
                <span>🔋</span>
              </div>
            </div>

            {/* App Screen Content */}
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`h-[calc(100%-2rem)] bg-gradient-to-br ${current.color} p-6 flex flex-col items-center justify-center text-center text-white`}
            >
              <div className="text-6xl mb-4 animate-bounce">{current.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{current.title}</h3>
              <div className="space-y-2">
                {current.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-sm font-medium opacity-90"
                  >
                    ✓ {feature}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Screen reflection shine */}
          <div className="absolute inset-0 rounded-[3rem] opacity-20 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {screens.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveScreen(idx)}
              animate={{
                scale: idx === activeScreen ? 1.2 : 1,
                backgroundColor: idx === activeScreen ? '#c084fc' : 'rgba(255,255,255,0.3)'
              }}
              className="w-2 h-2 rounded-full transition-all cursor-pointer"
              aria-label={`Go to screen ${idx + 1}`}
            />
          ))}
        </div>

        {/* Glowing background effect */}
        <div className="absolute -inset-20 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
      </motion.div>

      {/* Side info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-white max-w-xs ml-16"
      >
        <div className="space-y-4">
          <p className="text-sm text-foreground-muted">
            Building production-grade mobile applications with cutting-edge technologies
          </p>
          <div className="flex gap-3">
            {['iOS', 'Android', 'Web'].map((platform) => (
              <span key={platform} className="px-3 py-1 rounded-full text-xs font-mono bg-accent/20 border border-accent/50 text-accent">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
