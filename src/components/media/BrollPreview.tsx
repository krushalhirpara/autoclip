"use client";

import React, { useEffect, useState } from "react";
import { Film } from "lucide-react";

export function BrollPreview() {
  const [position, setPosition] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden border border-[#E8E7F0] dark:border-[#27272A] shadow-xl bg-[#111118]">
      {/* Simulated Stock Video: Editor Workspace */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-800 to-purple-900 opacity-90" />
      
      {/* Laptop Screen glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 h-16 bg-blue-400/20 rounded blur-xl" />
      
      {/* Laptop shape */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-20 border-2 border-slate-600 rounded-t-lg bg-slate-800 flex flex-col justify-end">
        {/* Screen Content - Editor Timeline Fake */}
        <div className="flex-1 p-2 flex flex-col gap-1 opacity-60">
          <div className="h-1 bg-slate-500 rounded w-full" />
          <div className="h-2 bg-blue-500/50 rounded w-3/4" />
          <div className="h-2 bg-purple-500/50 rounded w-1/2" />
        </div>
        {/* Keyboard base */}
        <div className="h-1 w-32 -ml-2 bg-slate-400 rounded-b-xl border-t border-slate-500 shadow-xl" />
      </div>

      {/* Subtle Pan/Scan Animation Effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
        style={{ transform: `translateX(${position * 2 - 100}%) skewX(12deg)` }}
      />

      {/* Overlay UI */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        <span className="text-[9px] font-bold bg-[#059669] text-white px-2 py-0.5 rounded-sm backdrop-blur-md border border-[#059669]/50 shadow-sm">
          MATCH FOUND
        </span>
        <div className="bg-black/50 p-1 rounded backdrop-blur-sm">
          <Film className="h-3 w-3 text-white/80" />
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md rounded px-2 py-1 border border-white/10">
        <p className="text-[10px] font-bold text-white truncate">video_editing_4k.mp4</p>
        <p className="text-[8px] font-medium text-[#FACC15]">Keyword: "editing"</p>
      </div>
    </div>
  );
}
