"use client";

import React, { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { VideoThumbnail } from "../media/VideoThumbnail";

const clips = [
  { id: "01", score: 94, factors: { hook: 96, retention: 92, shareability: 95, emotion: 90, clarity: 94 } },
  { id: "02", score: 89, factors: { hook: 88, retention: 90, shareability: 85, emotion: 85, clarity: 95 } },
  { id: "03", score: 86, factors: { hook: 85, retention: 82, shareability: 88, emotion: 89, clarity: 86 } },
];

export function DemoClipScoring() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [activeClip, setActiveClip] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

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
    const targetScore = clips[activeClip].score;
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= targetScore) {
        setCurrentScore(targetScore);
        clearInterval(interval);
      } else {
        setCurrentScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [inView, activeClip]);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center md:items-stretch">
      
      {/* Video Preview */}
      <div className="w-48 shrink-0 flex items-center justify-center">
        <VideoThumbnail 
          orientation="portrait" 
          duration="00:12" 
          label={`CLIP #${clips[activeClip].id}`}
          className="w-full h-full shadow-2xl"
          title="The Secret to Retention..."
        />
      </div>

      <div className="flex-1 flex flex-col gap-3 justify-center">
        {clips.map((clip, idx) => (
          <button
            key={clip.id}
            onClick={() => {
              if (activeClip !== idx) {
                setActiveClip(idx);
                setCurrentScore(0);
              }
            }}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
              activeClip === idx
                ? "border-[#7C5CFC] bg-[#F4F3FF] shadow-md dark:bg-[#7C5CFC]/10 dark:border-[#7C5CFC]"
                : "border-[#E8E7F0] bg-white hover:border-[#7C5CFC]/40 dark:bg-[#141416] dark:border-[#27272A]"
            }`}
          >
            <div className="text-left">
              <span className="text-xs font-bold text-[#6B6B78] dark:text-[#A1A1AA]">CLIP #{clip.id}</span>
              <h4 className={`font-bold ${activeClip === idx ? "text-[#111118] dark:text-white" : "text-[#6B6B78] dark:text-[#A1A1AA]"}`}>
                High-Potential Moment
              </h4>
            </div>
            <div className={`text-2xl font-black ${activeClip === idx ? "text-[#7C5CFC] dark:text-[#A78BFA]" : "text-[#111118] dark:text-white"}`}>
              {inView && activeClip === idx ? currentScore : clip.score}
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 rounded-3xl border border-[#E8E7F0] bg-white p-6 shadow-xl dark:border-[#27272A] dark:bg-[#141416]">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#6B6B78] dark:text-[#A1A1AA] mb-6">
          AI Content Score Factors
        </h4>
        
        <div className="space-y-5">
          {[
            { label: "Hook Strength", value: clips[activeClip].factors.hook },
            { label: "Retention Prediction", value: clips[activeClip].factors.retention },
            { label: "Shareability", value: clips[activeClip].factors.shareability },
            { label: "Emotional Impact", value: clips[activeClip].factors.emotion },
            { label: "Clarity", value: clips[activeClip].factors.clarity },
          ].map((factor, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-[#111118] dark:text-white">{factor.label}</span>
                <span className="font-bold text-[#7C5CFC]">{factor.value}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] transition-all duration-700 ease-out"
                  style={{ width: inView ? `${factor.value}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
