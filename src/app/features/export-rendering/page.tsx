import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  ChevronRight,
} from "lucide-react";
import { SmartCtaButton } from "@/components/marketing/SmartCtaButton";

export const metadata: Metadata = {
  title: "High-Speed Export & Rendering | AutoClipp",
  description:
    "Render high-bitrate MP4 vertical videos in 720p, 1080p, and 4K with burnt-in animated captions using our distributed BullMQ FFmpeg queue.",
};

export default function ExportRenderingPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-20 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C] overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-[#7C5CFC]/10 blur-[120px] dark:bg-[#7C5CFC]/15" />
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-50" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center space-x-2 text-xs font-semibold tracking-wide text-[#6B6B78] dark:text-[#A1A1AA]">
          <Link href="/" className="hover:text-[#7C5CFC] dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/get-started" className="hover:text-[#7C5CFC] dark:hover:text-white transition-colors">
            Features
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111118] dark:text-white">High-Speed Export & Rendering</span>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/25 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-300">
              <Zap className="h-3.5 w-3.5 text-emerald-500" />
              <span>BullMQ Distributed Video Pipeline</span>
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              High-Speed Video Export & Rendering
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA] mx-auto lg:mx-0">
              Export crisp, high-bitrate MP4 videos in 720p, 1080p, or 4K with burnt-in dynamic subtitles. Powered by background BullMQ Redis workers and optimized FFmpeg encoding.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <SmartCtaButton variant="primary" size="lg">
                Export Your First Clip
              </SmartCtaButton>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E7F0] bg-white px-7 py-3.5 text-base font-semibold text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white"
              >
                All Features
              </Link>
            </div>
          </div>

          {/* Render Queue Mockup */}
          <div className="flex-1 w-full relative group">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-[#7C5CFC] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] border border-[#E8E7F0] bg-white p-6 shadow-2xl dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-full h-full rounded-[2rem] bg-[#FAFAFC] p-6 dark:bg-[#0E0E12] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Active Rendering Queue
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    4x Parallel Concurrency
                  </span>
                </div>

                <div className="space-y-3 my-4">
                  <div className="rounded-xl bg-white p-3.5 shadow-sm dark:bg-[#1A1A22] border border-gray-100 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-900 dark:text-white">
                      <span>Clip_01_Virality96.mp4 (1080x1920)</span>
                      <span className="text-emerald-600 dark:text-emerald-400">Complete</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                      <span>Render Time: 4.8s</span>
                      <span className="text-[#7C5CFC] font-semibold cursor-pointer">Download MP4</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-3.5 shadow-sm dark:bg-[#1A1A22] border border-gray-100 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-900 dark:text-white">
                      <span>Clip_02_Virality92.mp4 (1080x1920)</span>
                      <span className="text-[#7C5CFC]">Rendering 85%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#7C5CFC] to-emerald-400 w-[85%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-white/5">
                  <span>Codec: H.264 / AAC 320kbps</span>
                  <span>Container: MP4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 mb-16 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-8 py-24 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
          <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Experience Ultra-Fast Video Processing
          </h2>
          <div className="relative z-10 mt-10 flex justify-center">
            <SmartCtaButton variant="white" size="lg">
              Start Free Project
            </SmartCtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}
