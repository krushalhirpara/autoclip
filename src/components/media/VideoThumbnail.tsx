"use client";

import React, { useRef, useState } from "react";
import { Play } from "lucide-react";

interface VideoThumbnailProps {
  title?: string;
  duration?: string;
  label?: string;
  orientation?: "landscape" | "portrait";
  className?: string;
  videoSrc?: string;
  poster?: string;
  fallback?: React.ReactNode;
}

export function VideoThumbnail({ 
  title, 
  duration = "00:42", 
  label, 
  orientation = "landscape",
  className = "",
  videoSrc,
  poster,
  fallback
}: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      setIsPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // reset
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg border border-[#E8E7F0] dark:border-[#27272A] shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${orientation === "landscape" ? "aspect-video" : "aspect-[9/16]"} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background / Fallback */}
      <div className="absolute inset-0 bg-[#F8F9FC] dark:bg-[#111118]">
        {fallback ? (
          fallback
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B32] via-[#111118] to-[#0A0A0C]">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#7C5CFC]/30 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-white/5 rounded-t-full blur-xl border-t border-white/10 opacity-30" />
          </div>
        )}
      </div>

      {/* Actual Video playback (if provided) */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        />
      )}
      
      {/* Poster overlay if video is provided but not playing */}
      {poster && !isPlaying && (
        <img 
          src={poster} 
          alt="Thumbnail" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* AI Label */}
      {label && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 flex items-center z-10">
          <span className="text-[9px] font-bold tracking-wider text-[#FACC15]">{label}</span>
        </div>
      )}

      {/* Duration Badge */}
      {duration && (
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 z-10">
          <span className="text-[10px] font-mono font-medium text-white">{duration}</span>
        </div>
      )}

      {/* Play Button */}
      <div className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <Play className="w-4 h-4 text-white ml-0.5" />
        </div>
      </div>

      {/* Waveform / Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-10">
        <div className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] w-1/3 group-hover:w-full transition-all duration-700 ease-out" />
      </div>

      {/* Title Overlay */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 bg-gradient-to-t from-black/90 to-transparent z-10">
          <p className="text-xs font-semibold text-white line-clamp-1">{title}</p>
        </div>
      )}
      
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none z-20" />
    </div>
  );
}
