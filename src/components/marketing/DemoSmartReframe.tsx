"use client";

import React, { useEffect, useState, useRef } from "react";
import { ScanFace, Smartphone } from "lucide-react";

export function DemoSmartReframe() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Animation state 0-100 representing position
  const [position, setPosition] = useState(50);
  const [direction, setDirection] = useState(1);
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
    
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev >= 80) {
          setDirection(-1);
          return prev - 1;
        }
        if (prev <= 20) {
          setDirection(1);
          return prev + 1;
        }
        return prev + direction;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [inView, direction]);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
      
      {/* 16:9 Source Video */}
      <div className="flex-1 w-full max-w-lg">
        <div className="flex items-center gap-2 mb-3">
          <ScanFace className="h-5 w-5 text-[#7C5CFC]" />
          <h4 className="font-bold text-[#111118] dark:text-white">AI Subject Tracking</h4>
        </div>
        
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#111118] border border-[#E8E7F0] dark:border-[#27272A] shadow-xl">
          {/* Simulated Video Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 opacity-80" />
          
          {/* Moving Subject */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-24 w-16 bg-white/20 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center border border-white/40 transition-all duration-[50ms] ease-linear"
            style={{ left: `calc(${position}% - 32px)` }}
          >
            <div className="h-8 w-8 rounded-full bg-white/80" />
          </div>

          {/* Tracking Frame */}
          <div 
            className="absolute top-0 bottom-0 w-[31.6%] border-2 border-[#7C5CFC] bg-[#7C5CFC]/10 transition-all duration-[50ms] ease-linear flex flex-col justify-between p-2"
            style={{ left: `calc(${position}% - 15.8%)` }}
          >
            <div className="flex justify-between">
              <div className="w-2 h-2 border-t-2 border-l-2 border-white" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white" />
            </div>
            <div className="text-center">
              <span className="bg-[#7C5CFC] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">TRACKING</span>
            </div>
            <div className="flex justify-between">
              <div className="w-2 h-2 border-b-2 border-l-2 border-white" />
              <div className="w-2 h-2 border-b-2 border-r-2 border-white" />
            </div>
          </div>
        </div>
      </div>

      {/* 9:16 Result */}
      <div className="w-48 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="h-5 w-5 text-[#059669]" />
          <h4 className="font-bold text-[#111118] dark:text-white">9:16 Reframed</h4>
        </div>
        
        <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#111118] border border-[#E8E7F0] dark:border-[#27272A] shadow-xl">
          {/* We fake the crop by shifting the background opposite to the movement */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 opacity-80 w-[316%] transition-all duration-[50ms] ease-linear"
            style={{ left: `calc(-${position}vw * 3.16 + 50%)` /* Approximation for visual effect */ }}
          />
          
          {/* Centered Subject in Result */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-28 bg-white/20 backdrop-blur-md rounded-[40px] shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center border border-white/40">
            <div className="h-12 w-12 rounded-full bg-white/80" />
          </div>
        </div>
      </div>

    </div>
  );
}
