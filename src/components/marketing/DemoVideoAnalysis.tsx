"use client";

import React, { useEffect, useState, useRef } from "react";
import { CheckCircle2, Loader2, Play } from "lucide-react";
import { VideoThumbnail } from "../media/VideoThumbnail";

export function DemoVideoAnalysis() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
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
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let progressInterval: NodeJS.Timeout;
    if (progress < 100) {
      progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 100));
      }, 50);
    }

    return () => clearInterval(progressInterval);
  }, [inView, progress]);

  useEffect(() => {
    if (progress > 20 && step < 1) setStep(1);
    if (progress > 50 && step < 2) setStep(2);
    if (progress > 75 && step < 3) setStep(3);
    if (progress === 100 && step < 4) setStep(4);
  }, [progress, step]);

  const steps = [
    { id: 1, label: "Transcript generated" },
    { id: 2, label: "Speakers detected" },
    { id: 3, label: "12 moments found" },
    { id: 4, label: "8 clips selected" },
  ];

  return (
    <div ref={ref} className="w-full max-w-md mx-auto rounded-3xl border border-[#E8E7F0] bg-white p-6 shadow-xl dark:border-[#27272A] dark:bg-[#141416]">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 shrink-0">
          <VideoThumbnail 
            duration="45:20" 
            label="SOURCE" 
          />
        </div>
        <div>
          <h4 className="font-bold text-[#111118] dark:text-white">Podcast_Episode_42.mp4</h4>
          <p className="text-sm text-[#6B6B78] dark:text-[#A1A1AA]">45:20 • 2.4 GB</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-semibold text-[#111118] dark:text-white">
            {progress < 100 ? "Analyzing your video..." : "8 Clips Ready"}
          </span>
          <span className="text-sm font-bold text-[#7C5CFC]">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((s, idx) => (
          <div 
            key={s.id} 
            className={`flex items-center gap-3 transition-all duration-500 transform ${
              step >= s.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {step >= s.id && step < 4 && idx === step - 1 ? (
              <Loader2 className="h-5 w-5 animate-spin text-[#7C5CFC]" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-[#059669] dark:text-emerald-400" />
            )}
            <span className={`text-sm ${step >= s.id ? "text-[#111118] dark:text-white font-medium" : "text-[#6B6B78] dark:text-[#A1A1AA]"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
