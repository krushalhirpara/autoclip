"use client";

import React, { useEffect, useState, useRef } from "react";
import { Video, Image, MessageCircle, CheckCircle2, Loader2, CalendarClock, ArrowDown } from "lucide-react";
import { VideoThumbnail } from "../media/VideoThumbnail";

export function DemoAutoPosting() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const [status1, setStatus1] = useState("Processing");
  const [status2, setStatus2] = useState("Processing");
  const [status3, setStatus3] = useState("Processing");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    // Animate statuses sequentially
    setTimeout(() => setStatus1("Ready"), 1000);
    setTimeout(() => setStatus1("Scheduled"), 1500);
    setTimeout(() => setStatus1("Published"), 3000);

    setTimeout(() => setStatus2("Ready"), 1800);
    setTimeout(() => setStatus2("Scheduled"), 2500);

    setTimeout(() => setStatus3("Ready"), 2200);
    setTimeout(() => setStatus3("Scheduled"), 3500);

  }, [inView]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Processing": return "bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20";
      case "Ready": return "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20";
      case "Scheduled": return "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
      case "Published": return "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      default: return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Processing": return <Loader2 className="w-3 h-3 animate-spin mr-1" />;
      case "Scheduled": return <CalendarClock className="w-3 h-3 mr-1" />;
      case "Published": return <CheckCircle2 className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto rounded-3xl bg-[#F8F9FC] dark:bg-[#0A0A0B] border border-[#E8E7F0] dark:border-[#27272A] p-8 md:p-12 shadow-2xl">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111118] dark:text-white">
          Your content, on autopilot.
        </h3>
        <p className="mt-4 text-[#6B6B78] dark:text-[#A1A1AA] text-lg">
          Create once. Publish everywhere.
        </p>
      </div>

      {/* Workflow Diagram */}
      <div className="flex flex-col items-center mb-12">
        
        <div className="flex items-center justify-between w-full max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-3">
              <VideoThumbnail 
                orientation="portrait" 
                duration="14:20" 
                label="" 
                className="w-10 h-10 rounded-full" 
              />
            </div>
            <p className="text-xs font-bold text-[#111118] dark:text-white uppercase">SOURCE VIDEO</p>
            <p className="text-[10px] text-[#6B6B78] dark:text-[#A1A1AA] mt-1">New upload detected</p>
          </div>

          <div className="flex-1 h-px bg-dashed border-t-2 border-dashed border-[#DCD9E8] dark:border-[#27272A] mx-4 relative">
            <ArrowDown className="w-4 h-4 text-[#A1A1AA] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90" />
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#7C5CFC]/10 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(124,92,252,0.3)]">
              <Loader2 className="w-8 h-8 text-[#7C5CFC] animate-spin" />
            </div>
            <p className="text-xs font-bold text-[#111118] dark:text-white uppercase">AI PROCESSING</p>
            <p className="text-[10px] text-[#7C5CFC] font-semibold mt-1">8 clips generated</p>
          </div>

          <div className="flex-1 h-px bg-dashed border-t-2 border-dashed border-[#DCD9E8] dark:border-[#27272A] mx-4 relative">
            <ArrowDown className="w-4 h-4 text-[#A1A1AA] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90" />
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
            </div>
            <p className="text-xs font-bold text-[#111118] dark:text-white uppercase">READY TO PUBLISH</p>
          </div>
        </div>

      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* YouTube Shorts */}
        <div className={`transition-all duration-700 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} delay-100 bg-white dark:bg-[#141416] border border-[#E8E7F0] dark:border-[#27272A] rounded-2xl p-5 shadow-sm hover:shadow-md`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-red-500" />
              <span className="font-bold text-[#111118] dark:text-white text-sm">YouTube Shorts</span>
            </div>
            <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(status1)}`}>
              {getStatusIcon(status1)}
              {status1}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="w-16 shrink-0">
              <VideoThumbnail 
                orientation="portrait" 
                duration="00:45" 
                label="" 
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <p className="text-xs font-semibold text-[#111118] dark:text-white line-clamp-2">How to actually grow your audience in 2026 #shorts</p>
              <div>
                <p className="text-[10px] font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">SCHEDULED FOR</p>
                <p className="text-xs font-bold text-[#111118] dark:text-white">Today · 9:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Reels */}
        <div className={`transition-all duration-700 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} delay-200 bg-white dark:bg-[#141416] border border-[#E8E7F0] dark:border-[#27272A] rounded-2xl p-5 shadow-sm hover:shadow-md`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-pink-500" />
              <span className="font-bold text-[#111118] dark:text-white text-sm">Instagram Reels</span>
            </div>
            <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(status2)}`}>
              {getStatusIcon(status2)}
              {status2}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="w-16 shrink-0">
              <VideoThumbnail 
                orientation="portrait" 
                duration="00:30" 
                label="" 
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <p className="text-xs font-semibold text-[#111118] dark:text-white line-clamp-2">Stop ignoring these 3 rules... 🤫</p>
              <div>
                <p className="text-[10px] font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">SCHEDULED FOR</p>
                <p className="text-xs font-bold text-[#111118] dark:text-white">Today · 11:30 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* X / Twitter */}
        <div className={`transition-all duration-700 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} delay-300 bg-white dark:bg-[#141416] border border-[#E8E7F0] dark:border-[#27272A] rounded-2xl p-5 shadow-sm hover:shadow-md`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-[#111118] dark:text-white text-sm">X (Twitter)</span>
            </div>
            <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(status3)}`}>
              {getStatusIcon(status3)}
              {status3}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="w-16 shrink-0">
              <VideoThumbnail 
                orientation="portrait" 
                duration="00:20" 
                label="" 
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <p className="text-xs font-semibold text-[#111118] dark:text-white line-clamp-2">A quick masterclass in retention.</p>
              <div>
                <p className="text-[10px] font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">SCHEDULED FOR</p>
                <p className="text-xs font-bold text-[#111118] dark:text-white">Today · 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
