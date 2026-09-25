"use client";

import React, { useEffect, useState, useRef } from "react";
import { Type, PlayCircle } from "lucide-react";

const STYLES = ["Karaoke", "Pop", "Bounce", "Minimal"] as const;
type StyleType = typeof STYLES[number];

const SCRIPT = [
  { text: "THIS", time: 0 },
  { text: "IS", time: 400 },
  { text: "HOW", time: 800 },
  { text: "YOU", time: 1400 },
  { text: "GROW", time: 1800 },
  { text: "YOUR", time: 2400 },
  { text: "AUDIENCE", time: 2800 },
];

export function DemoAICaptions() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const [activeStyle, setActiveStyle] = useState<StyleType>("Pop");
  const [currentTime, setCurrentTime] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    let start = Date.now();
    const interval = setInterval(() => {
      let elapsed = Date.now() - start;
      if (elapsed > 4000) {
        start = Date.now();
        elapsed = 0;
      }
      setCurrentTime(elapsed);
    }, 50);
    
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
      
      {/* 9:16 Video Mockup */}
      <div className="relative aspect-[9/16] w-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1E1B32] to-[#0A0A0C] border-4 border-gray-900 shadow-2xl shrink-0">
        {!videoFailed && (
          <video
            ref={videoRef}
            src="/videos/captions-demo.mp4"
            poster="/thumbnails/captions-demo.webp"
            loop
            muted
            playsInline
            autoPlay
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {videoFailed && (
          <>
            {/* Simulated Creator Background */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="w-3/4 h-2/3 bg-gradient-to-t from-black/80 to-[#7C5CFC]/20 rounded-t-full blur-sm border-t border-white/10" />
              <div className="absolute top-1/4 w-24 h-24 bg-white/5 rounded-full blur-md" />
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] text-white font-semibold">REC</span>
            </div>
          </>
        )}
        
        {/* Captions Area */}
        <div className="absolute bottom-24 left-4 right-4 flex flex-wrap justify-center gap-1.5 text-center">
          {SCRIPT.map((word, idx) => {
            const isActive = currentTime >= word.time && currentTime < (SCRIPT[idx + 1]?.time || 4000);
            const hasPassed = currentTime >= word.time;
            
            // Render logic based on style
            if (activeStyle === "Karaoke") {
              return (
                <span 
                  key={idx} 
                  className={`text-2xl font-black uppercase transition-colors duration-200 ${
                    hasPassed ? "text-[#FACC15]" : "text-white/60"
                  }`}
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                >
                  {word.text}
                </span>
              );
            }
            
            if (activeStyle === "Pop") {
              return (
                <span 
                  key={idx} 
                  className={`text-2xl font-black uppercase transition-all duration-150 ${
                    isActive ? "text-white scale-125 mx-2" : "text-white/80 scale-100"
                  }`}
                  style={{ textShadow: isActive ? "0 4px 15px rgba(124,92,252,0.8)" : "0 2px 10px rgba(0,0,0,0.5)" }}
                >
                  {word.text}
                </span>
              );
            }

            if (activeStyle === "Bounce") {
              return (
                <span 
                  key={idx} 
                  className={`text-2xl font-black uppercase transition-transform duration-300 ${
                    isActive ? "text-[#A78BFA] -translate-y-2" : "text-white translate-y-0"
                  }`}
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                >
                  {word.text}
                </span>
              );
            }

            // Minimal
            return (
              <span 
                key={idx} 
                className={`text-xl font-bold transition-opacity duration-300 ${
                  isActive ? "text-white opacity-100 bg-black/60 px-2 py-0.5 rounded" : "text-white opacity-40"
                }`}
              >
                {word.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* Style Selector */}
      <div className="flex-1 max-w-sm rounded-3xl border border-[#E8E7F0] bg-white p-6 shadow-xl dark:border-[#27272A] dark:bg-[#141416]">
        <div className="flex items-center gap-2 mb-6">
          <Type className="h-5 w-5 text-[#7C5CFC]" />
          <h4 className="font-bold text-[#111118] dark:text-white">Caption Styles</h4>
        </div>
        
        <div className="space-y-3">
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                activeStyle === style
                  ? "border-[#7C5CFC] bg-[#F4F3FF] shadow-sm dark:bg-[#7C5CFC]/10 dark:border-[#7C5CFC]"
                  : "border-[#E8E7F0] bg-transparent hover:border-[#7C5CFC]/40 dark:border-[#27272A]"
              }`}
            >
              <span className={`font-semibold ${activeStyle === style ? "text-[#7C5CFC] dark:text-[#A78BFA]" : "text-[#111118] dark:text-white"}`}>
                {style}
              </span>
              <div className={`w-4 h-4 rounded-full border-2 ${activeStyle === style ? "border-[#7C5CFC] bg-[#7C5CFC]" : "border-gray-300 dark:border-gray-600"}`} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
