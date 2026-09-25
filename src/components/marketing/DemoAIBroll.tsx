"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search, Film, Layers } from "lucide-react";
import { BrollPreview } from "../media/BrollPreview";

export function DemoAIBroll() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const [step, setStep] = useState(0);

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
    
    let interval: NodeJS.Timeout;
    const runAnimation = () => {
      setStep(0); // Start
      
      setTimeout(() => setStep(1), 1000); // Read transcript
      setTimeout(() => setStep(2), 2500); // Highlight keyword
      setTimeout(() => setStep(3), 3500); // Find B-roll
      setTimeout(() => setStep(4), 5000); // Insert B-roll in timeline
    };
    
    runAnimation();
    interval = setInterval(runAnimation, 8000); // Loop
    
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto rounded-3xl border border-[#E8E7F0] bg-white p-6 shadow-xl dark:border-[#27272A] dark:bg-[#141416]">
      
      {/* Top area - Transcript and B-roll discovery */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        
        {/* Transcript Box */}
        <div className="flex-1 p-4 rounded-xl border border-[#E8E7F0] bg-[#F8F9FC] dark:border-[#27272A] dark:bg-[#0A0A0B]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B6B78] dark:text-[#A1A1AA] mb-2">Transcript</h4>
          <p className="text-lg font-medium text-[#111118] dark:text-white leading-relaxed">
            Most creators waste hours{" "}
            <span className={`inline-block transition-all duration-500 ${
              step >= 2 ? "bg-[#7C5CFC]/20 text-[#7C5CFC] px-1 rounded border border-[#7C5CFC]/30" : ""
            }`}>
              editing
            </span>{" "}
            their content.
          </p>
        </div>

        {/* AI Action Box */}
        <div className="w-64 h-32 relative shrink-0">
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E8E7F0] dark:border-[#27272A] transition-opacity duration-500 ${step >= 2 && step < 3 ? "opacity-100" : "opacity-0"}`}>
            <Search className="h-6 w-6 text-[#7C5CFC] animate-bounce mb-2" />
            <span className="text-sm font-semibold text-[#7C5CFC]">Searching B-Roll...</span>
          </div>

          <div className={`absolute inset-0 transition-all duration-500 transform ${step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
            <BrollPreview />
          </div>
        </div>

      </div>

      {/* Timeline Area */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Layers className="h-4 w-4 text-[#111118] dark:text-white" />
          <h4 className="text-sm font-bold text-[#111118] dark:text-white">Timeline</h4>
        </div>

        <div className="space-y-2 relative">
          
          {/* Playhead */}
          <div className={`absolute top-0 bottom-0 w-px bg-red-500 z-10 transition-all duration-1000 ease-linear ${step >= 1 ? "left-1/2" : "left-0"}`}>
            <div className="absolute -top-2 -left-1.5 w-3 h-3 bg-red-500 rounded-sm" />
          </div>

          {/* B-Roll Track */}
          <div className="flex h-10 rounded-md bg-[#F8F9FC] dark:bg-[#0A0A0B] overflow-hidden border border-[#E8E7F0] dark:border-[#27272A]">
            <div className="w-24 shrink-0 bg-[#E8E7F0] dark:bg-[#27272A] border-r border-[#DCD9E8] dark:border-[#141416] flex items-center px-2 text-[10px] font-bold text-[#6B6B78] dark:text-[#A1A1AA]">
              B-ROLL
            </div>
            <div className="flex-1 relative">
              <div 
                className={`absolute top-1 bottom-1 left-1/3 w-1/3 bg-[#059669]/80 rounded border border-[#059669] flex items-center justify-center transition-all duration-700 transform ${
                  step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <span className="text-[10px] font-bold text-white uppercase">Stock_Editor_01.mp4</span>
              </div>
            </div>
          </div>

          {/* Main Video Track */}
          <div className="flex h-10 rounded-md bg-[#F8F9FC] dark:bg-[#0A0A0B] overflow-hidden border border-[#E8E7F0] dark:border-[#27272A]">
            <div className="w-24 shrink-0 bg-[#E8E7F0] dark:bg-[#27272A] border-r border-[#DCD9E8] dark:border-[#141416] flex items-center px-2 text-[10px] font-bold text-[#6B6B78] dark:text-[#A1A1AA]">
              VIDEO
            </div>
            <div className="flex-1 p-1">
              <div className="h-full w-full bg-[#7C5CFC]/80 rounded border border-[#7C5CFC] flex items-center px-3">
                <span className="text-[10px] font-bold text-white">Source_Camera.mp4</span>
              </div>
            </div>
          </div>

          {/* Captions Track */}
          <div className="flex h-8 rounded-md bg-[#F8F9FC] dark:bg-[#0A0A0B] overflow-hidden border border-[#E8E7F0] dark:border-[#27272A]">
            <div className="w-24 shrink-0 bg-[#E8E7F0] dark:bg-[#27272A] border-r border-[#DCD9E8] dark:border-[#141416] flex items-center px-2 text-[10px] font-bold text-[#6B6B78] dark:text-[#A1A1AA]">
              CAPTIONS
            </div>
            <div className="flex-1 p-1 flex gap-1">
              <div className="h-full w-1/4 bg-[#EAB308]/80 rounded border border-[#EAB308]" />
              <div className="h-full w-1/4 bg-[#EAB308]/80 rounded border border-[#EAB308]" />
              <div className="h-full w-1/2 bg-[#EAB308]/80 rounded border border-[#EAB308]" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
