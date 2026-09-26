"use client";

import React, { useEffect, useState } from "react";
import { Play, Sparkles, Wand2, MonitorPlay, Film } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-[#F8F9FC] dark:bg-[#0A0A0C] overflow-hidden">
      
      {/* --- SUBTLE BACKGROUND GRID --- */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-30 dark:opacity-20">
        <div className="h-full w-full max-w-[1400px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* --- LIGHTING & GRADIENTS --- */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-b from-[#7C5CFC]/10 to-transparent blur-[120px] dark:from-[#7C5CFC]/15" />

      {/* --- DESKTOP PRODUCT CANVAS (Hidden on Mobile) --- */}
      <div className="pointer-events-none absolute inset-0 hidden lg:flex items-center justify-center">
        
        {/* Left Side Miniature UI */}
        <div className="absolute left-[8%] 2xl:left-[15%] top-1/2 -translate-y-1/2 flex flex-col space-y-8 opacity-70">
          
          {/* Source Video Module */}
          <div className="relative rounded-2xl border border-black/5 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]">
            <div className="flex items-center space-x-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              <Film className="h-3 w-3" />
              <span>Source Material</span>
            </div>
            <div className="h-20 w-48 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
               <div className="h-8 w-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center">
                 <Play className="h-3 w-3 text-gray-500 dark:text-gray-400 ml-0.5" />
               </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-medium text-gray-500">
              <span>01:24:32</span>
              <span className="h-1.5 w-16 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                <span className="block h-full w-1/3 bg-gray-400 dark:bg-gray-500 rounded-full" />
              </span>
            </div>
          </div>

          {/* Connection Line */}
          <div className="absolute -right-16 top-[15%] h-px w-16 bg-gradient-to-r from-gray-200 to-[#7C5CFC]/50 dark:from-gray-800" />

        </div>

        {/* Right Side Miniature UI */}
        <div className="absolute right-[8%] 2xl:right-[15%] top-1/2 -translate-y-1/2 flex flex-col space-y-8 opacity-70">
          
          {/* AI Analysis Module */}
          <div className="relative rounded-2xl border border-black/5 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]">
            <div className="flex items-center space-x-2 text-[10px] font-semibold text-[#7C5CFC] uppercase tracking-wider mb-3">
              <Sparkles className="h-3 w-3" />
              <span>AI Detection</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-medium text-gray-600 dark:text-gray-300">
                <span>Peak Moment 1</span>
                <span className="text-[#22C55E]">98%</span>
              </div>
              <div className="h-1.5 w-40 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                <span className={`block h-full w-[98%] bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] rounded-full ${mounted ? 'animate-pulse' : ''}`} />
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-gray-600 dark:text-gray-300 pt-2">
                <span>Peak Moment 2</span>
                <span className="text-[#22C55E]">94%</span>
              </div>
              <div className="h-1.5 w-40 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                <span className="block h-full w-[94%] bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] rounded-full" />
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="absolute -left-16 bottom-[30%] h-px w-16 bg-gradient-to-l from-gray-200 to-[#7C5CFC]/50 dark:from-gray-800" />

          {/* 9:16 Reframe Module */}
          <div className="relative rounded-2xl border border-[#7C5CFC]/20 bg-[#7C5CFC]/5 p-4 shadow-sm backdrop-blur-md dark:border-[#7C5CFC]/30 dark:bg-[#7C5CFC]/10 ml-8">
            <div className="flex items-center space-x-2 text-[10px] font-semibold text-[#7C5CFC] uppercase tracking-wider mb-3">
              <MonitorPlay className="h-3 w-3" />
              <span>9:16 Shorts</span>
            </div>
            <div className="h-24 w-14 rounded-lg border-2 border-[#7C5CFC]/30 bg-white dark:bg-black/20 flex flex-col items-center justify-between py-2 mx-auto relative overflow-hidden">
              <div className="h-1 w-6 rounded-full bg-gray-200 dark:bg-white/10" />
              <div className="h-6 w-6 rounded-full bg-[#7C5CFC]/20 flex items-center justify-center">
                <Play className="h-2 w-2 text-[#7C5CFC] ml-0.5" />
              </div>
              <div className="h-1 w-8 rounded-full bg-gray-200 dark:bg-white/10" />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#7C5CFC]/30">
                <div className={`h-full w-1/2 bg-[#7C5CFC] ${mounted ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''}`} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- AUTH WORKSPACE AREA --- */}
      <div className="relative z-10 w-full max-w-[440px] px-6 py-12">
        {children}
      </div>

    </main>
  );
}
