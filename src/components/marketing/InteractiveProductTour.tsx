"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Scissors,
  Crop,
  FileText,
  Sliders,
  Play,
  Pause,
  CheckCircle2,
  Flame,
  Clock,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "moments" | "reframe" | "captions" | "scoring" | "editor";

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
  badge: string;
}

const TABS: TabConfig[] = [
  { id: "moments", label: "AI Moment Detection", icon: Scissors, badge: "Core AI" },
  { id: "reframe", label: "Smart 9:16 Reframe", icon: Crop, badge: "Auto-Track" },
  { id: "captions", label: "Dynamic Captions", icon: FileText, badge: "Word Sync" },
  { id: "scoring", label: "Virality Scoring", icon: Flame, badge: "NLP Matrix" },
  { id: "editor", label: "Studio Timeline", icon: Sliders, badge: "Interactive" },
];

export function InteractiveProductTour() {
  const [activeTab, setActiveTab] = useState<TabId>("moments");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedCaptionStyle, setSelectedCaptionStyle] = useState<"hormozi" | "neon" | "clean">("hormozi");
  const [activeSpeaker, setActiveSpeaker] = useState<"left" | "right" | "auto">("auto");
  const [clipIndex, setClipIndex] = useState<number>(0);

  // Auto-cycle simulation animation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setClipIndex((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const mockClips = [
    {
      title: "The $10M SaaS Playbook Secret",
      hook: "Most founders fail because they build before validating...",
      score: 96,
      duration: "00:48",
      views: "1.2M",
      tags: ["#startup", "#growth", "#saas"],
    },
    {
      title: "How to 10x Content Production",
      hook: "If you spend more than 2 hours editing shorts, you're doing it wrong...",
      score: 93,
      duration: "00:54",
      views: "890K",
      tags: ["#contentcreator", "#ai", "#viral"],
    },
    {
      title: "Why Retention is the Only Metric",
      hook: "The first 3 seconds determine 90% of your total watch time...",
      score: 89,
      duration: "00:39",
      views: "640K",
      tags: ["#growthhacks", "#marketing", "#video"],
    },
  ];

  const currentClip = mockClips[clipIndex];

  return (
    <div className="w-full rounded-[2.5rem] border border-[#E8E7F0] bg-white/95 p-4 sm:p-8 shadow-[0_20px_60px_rgba(124,92,252,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#121218]/95 dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
      {/* Top Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E7F0] pb-6 dark:border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#111118] dark:text-white">
                AutoClipp Studio Intelligence
              </h3>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Live Interactive Simulation
              </span>
            </div>
            <p className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
              Explore how AutoClipp extracts, reframes, captions, and renders viral clips.
            </p>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-[#E8E7F0] bg-[#F4F3FF] p-1.5 dark:border-white/10 dark:bg-[#1A1A24]">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "bg-[#7C5CFC] text-white shadow-md"
                    : "text-[#6B6B78] hover:bg-white/60 hover:text-[#111118] dark:text-[#A1A1AA] dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Interactive Canvas */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Interactive Control / Inspection Panel */}
        <div className="space-y-6 lg:col-span-5">
          {activeTab === "moments" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="rounded-2xl border border-[#7C5CFC]/20 bg-[#F4F3FF]/70 p-5 dark:border-[#7C5CFC]/30 dark:bg-[#7C5CFC]/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC] dark:text-[#A78BFA]">
                    AI Moment Detection
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Confidence: 98.4%
                  </span>
                </div>
                <h4 className="mt-2 text-base font-bold text-[#111118] dark:text-white">
                  {currentClip.title}
                </h4>
                <p className="mt-1 text-xs text-[#6B6B78] dark:text-[#A1A1AA] italic">
                  &ldquo;{currentClip.hook}&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">
                  Extracted High-Impact Clips (Select to preview):
                </span>
                {mockClips.map((clip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setClipIndex(idx)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all",
                      clipIndex === idx
                        ? "border-[#7C5CFC] bg-white shadow-md dark:border-[#7C5CFC] dark:bg-[#1C1C28]"
                        : "border-[#E8E7F0] bg-[#FAFAFC] hover:border-gray-300 dark:border-white/5 dark:bg-[#14141C] dark:hover:bg-[#181824]"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7C5CFC]/15 text-xs font-black text-[#7C5CFC] dark:text-[#A78BFA]">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#111118] dark:text-white">
                          {clip.title}
                        </div>
                        <div className="text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">
                          {clip.duration} • Predicted Views: {clip.views}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-extrabold text-[#7C5CFC] dark:bg-purple-950/60 dark:text-[#A78BFA]">
                      <Flame className="h-3 w-3" />
                      <span>{clip.score}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reframe" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="rounded-2xl border border-blue-500/20 bg-blue-50/70 p-5 dark:border-blue-500/30 dark:bg-blue-950/20">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Dynamic 9:16 Speaker Tracking
                </span>
                <h4 className="mt-2 text-base font-bold text-[#111118] dark:text-white">
                  Center Active Speaker in Real-Time
                </h4>
                <p className="mt-1 text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                  AutoClipp calculates speaker bounding boxes across video keyframes to ensure the active speaker never drifts out of the 9:16 viewport.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">
                  Reframe Framing Mode:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "auto" as const, label: "Auto Speaker" },
                    { id: "left" as const, label: "Host Focus" },
                    { id: "right" as const, label: "Guest Focus" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveSpeaker(mode.id)}
                      className={cn(
                        "rounded-xl border py-2.5 px-3 text-xs font-semibold text-center transition-all",
                        activeSpeaker === mode.id
                          ? "border-[#7C5CFC] bg-[#7C5CFC] text-white shadow-sm"
                          : "border-[#E8E7F0] bg-white text-[#6B6B78] hover:bg-gray-50 dark:border-white/10 dark:bg-[#181824] dark:text-[#A1A1AA]"
                      )}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="flex items-center justify-between text-xs font-medium text-[#6B6B78] dark:text-[#A1A1AA]">
                  <span>Face Detection Accuracy</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">99.1%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-[#7C5CFC] to-emerald-400" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "captions" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="rounded-2xl border border-purple-500/20 bg-purple-50/70 p-5 dark:border-purple-500/30 dark:bg-purple-950/20">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC] dark:text-[#A78BFA]">
                  Kinetic Subtitle Styles
                </span>
                <h4 className="mt-2 text-base font-bold text-[#111118] dark:text-white">
                  Word-by-Word Synchronized Highlights
                </h4>
                <p className="mt-1 text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                  Transcribed with Whisper audio alignments down to the millisecond. Words highlight rhythmically as the speaker speaks.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">
                  Select Subtitle Preset:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "hormozi" as const, label: "Hormozi Pop", color: "#FACC15" },
                    { id: "neon" as const, label: "Neon Cyber", color: "#38BDF8" },
                    { id: "clean" as const, label: "Minimalist", color: "#FFFFFF" },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedCaptionStyle(style.id)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all",
                        selectedCaptionStyle === style.id
                          ? "border-[#7C5CFC] bg-white shadow-md dark:border-[#7C5CFC] dark:bg-[#1A1A28]"
                          : "border-[#E8E7F0] bg-gray-50 hover:bg-gray-100 dark:border-white/10 dark:bg-[#14141C]"
                      )}
                    >
                      <span className="text-xs font-bold text-[#111118] dark:text-white">
                        {style.label}
                      </span>
                      <span
                        className="mt-1 inline-block h-2 w-6 rounded-full"
                        style={{ backgroundColor: style.color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Auto-Emoji placement active based on spoken sentiment.</span>
              </div>
            </div>
          )}

          {activeTab === "scoring" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="rounded-2xl border border-amber-500/20 bg-amber-50/70 p-5 dark:border-amber-500/30 dark:bg-amber-950/20">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Virality Evaluation Matrix
                </span>
                <h4 className="mt-2 text-base font-bold text-[#111118] dark:text-white">
                  Multi-Factor Engagement Potential
                </h4>
                <p className="mt-1 text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                  Our AI evaluates hook velocity, speech sentiment, pacing density, and conclusion punch to score clips out of 100.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { metric: "Opening Hook Strength", val: 98, color: "bg-emerald-500" },
                  { metric: "Speech Energy & Pace", val: 94, color: "bg-[#7C5CFC]" },
                  { metric: "Topic Evergreen Demand", val: 89, color: "bg-blue-500" },
                  { metric: "Audio Clarity & Signal", val: 96, color: "bg-teal-500" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-[#111118] dark:text-white">
                      <span>{item.metric}</span>
                      <span className="font-mono">{item.val}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={cn("h-full rounded-full transition-all duration-700", item.color)}
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "editor" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/70 p-5 dark:border-emerald-500/30 dark:bg-emerald-950/20">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Studio Timeline & Trimming
                </span>
                <h4 className="mt-2 text-base font-bold text-[#111118] dark:text-white">
                  Browser-Based Precision Editing
                </h4>
                <p className="mt-1 text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                  Fine-tune start and end timestamps down to 100ms, modify subtitle text, adjust fonts, and instantly re-render without complex desktop software.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E8E7F0] bg-white p-3 text-center dark:border-white/10 dark:bg-[#161622]">
                  <div className="text-[11px] font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">
                    Start Time
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-[#111118] dark:text-white">
                    00:04:12.10
                  </div>
                </div>
                <div className="rounded-xl border border-[#E8E7F0] bg-white p-3 text-center dark:border-white/10 dark:bg-[#161622]">
                  <div className="text-[11px] font-semibold text-[#6B6B78] dark:text-[#A1A1AA]">
                    End Time
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-[#111118] dark:text-white">
                    00:05:00.14
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                <span>Export Preset: 1080x1920 (9:16) 60FPS</span>
                <span className="font-semibold text-[#7C5CFC] dark:text-[#A78BFA]">MP4 (H.264)</span>
              </div>
            </div>
          )}

          {/* Player controls */}
          <div className="flex items-center justify-between border-t border-[#E8E7F0] pt-4 dark:border-white/10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 rounded-full bg-[#111118] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-[#111118] dark:hover:bg-gray-200"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause Demo</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>Play Demo</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-2 text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-mono">Timeline: 00:24 / 00:54</span>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Vertical Phone & Video Stage */}
        <div className="relative flex items-center justify-center lg:col-span-7">
          {/* Glowing Aura */}
          <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#7C5CFC]/30 to-[#9B7CFF]/20 blur-3xl" />

          {/* 9:16 Vertical Smartphone Frame Mockup */}
          <div className="relative aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-[2.5rem] border-[6px] border-[#181822] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/20">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-28 rounded-full bg-[#181822]" />

            {/* Video Background Simulation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#141424] via-[#1E1B38] to-[#0A0A10]">
              {/* Speaker Face Simulation Box */}
              <div
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center transition-all duration-500",
                  activeSpeaker === "left" && "scale-105 translate-x-3",
                  activeSpeaker === "right" && "scale-105 -translate-x-3"
                )}
              >
                {/* Simulated Speaker Avatar */}
                <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-tr from-[#7C5CFC] via-[#9B7CFF] to-pink-500 p-1 shadow-2xl">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#181824] text-white text-3xl font-extrabold shadow-inner">
                    🎙️
                  </div>
                  {/* Active Speaker Ping Halo */}
                  <span className="absolute -inset-2 rounded-full border-2 border-[#7C5CFC] animate-ping opacity-30" />
                  <span className="absolute -bottom-2 rounded-full bg-[#7C5CFC] px-2.5 py-0.5 text-[9px] font-bold uppercase text-white shadow-md">
                    Active Speaker
                  </span>
                </div>

                {/* Animated Subtitle Box */}
                <div className="mx-4 mt-4 rounded-2xl bg-black/70 px-4 py-3 text-center backdrop-blur-md border border-white/10 shadow-xl">
                  {selectedCaptionStyle === "hormozi" && (
                    <div className="space-y-1">
                      <p className="text-sm font-black uppercase tracking-tight text-white">
                        THE <span className="bg-[#FACC15] px-1.5 py-0.5 text-black rounded font-black">#1 SECRET</span> TO
                      </p>
                      <p className="text-base font-black uppercase text-[#FACC15] drop-shadow-md">
                        🔥 10X RETENTION!
                      </p>
                    </div>
                  )}

                  {selectedCaptionStyle === "neon" && (
                    <div className="space-y-1">
                      <p className="text-sm font-bold tracking-wide text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                        Stop Editing Manually ⚡
                      </p>
                      <p className="text-xs font-semibold text-white">
                        Let AI find your best viral hooks.
                      </p>
                    </div>
                  )}

                  {selectedCaptionStyle === "clean" && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">
                        &ldquo;Most creators fail before validating their ideas.&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Overlay Elements */}
              <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center space-y-4 text-white">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                    <Flame className="h-5 w-5 text-red-500 fill-red-500" />
                  </div>
                  <span className="mt-1 text-[10px] font-bold">142K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                    <Share2 className="h-4 w-4" />
                  </div>
                  <span className="mt-1 text-[10px] font-bold">28K</span>
                </div>
              </div>

              {/* Bottom Social Info Bar */}
              <div className="absolute bottom-3 left-3 right-16 z-20 text-white">
                <div className="flex items-center space-x-1.5 text-xs font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#7C5CFC]" />
                  <span>@autoclipp</span>
                </div>
                <p className="mt-1 truncate text-[11px] text-gray-300">
                  {currentClip.title}
                </p>
                <div className="mt-1 flex gap-1">
                  {currentClip.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-semibold text-[#A78BFA]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Virality Pill */}
              <div className="absolute top-8 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/10 text-white">
                <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black">{currentClip.score}/100</span>
                <span className="text-[10px] text-gray-300">• Viral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
