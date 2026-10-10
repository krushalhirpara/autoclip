import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  ChevronRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  Activity,
  Zap,
} from "lucide-react";
import { SmartCtaButton } from "@/components/marketing/SmartCtaButton";

import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Virality Scoring (0–100) – Predict Clip Engagement",
  description:
    "Evaluate video clips with AutoClipp's proprietary virality scoring model (0-100). Analyzes hook intensity, speech cadence, emotional inflection, and retention velocity.",
  alternates: {
    canonical: "/features/ai-clip-scoring",
  },
  openGraph: {
    title: "AI Virality Scoring – Predict Clip Engagement | AutoClipp",
    description: "Multi-factor virality scoring model assessing hook velocity, speech cadence, and retention.",
    url: "https://www.autoclipp.com/features/ai-clip-scoring",
  },
};

const breadcrumbs = [
  { name: "Home", item: "https://www.autoclipp.com" },
  { name: "Features", item: "https://www.autoclipp.com/get-started" },
  { name: "AI Clip Scoring", item: "https://www.autoclipp.com/features/ai-clip-scoring" },
];

export default function AIClipScoringPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-20 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C] overflow-hidden">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareApplicationJsonLd
        name="AutoClipp AI Virality Scoring"
        description="Predictive engagement and virality scoring algorithm for short-form video clips."
      />
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
          <span className="text-[#111118] dark:text-white">Algorithmic Virality Scoring</span>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/25 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 shadow-sm dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-300">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Predictive Engagement Engine</span>
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              Algorithmic Virality Scoring
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA] mx-auto lg:mx-0">
              Stop guessing which moments will perform. Our NLP model scores every extracted clip from 0 to 100 based on opening hook power, emotional intensity, pacing, and retention probability.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <SmartCtaButton variant="primary" size="lg">
                Score Your First Video
              </SmartCtaButton>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E7F0] bg-white px-7 py-3.5 text-base font-semibold text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white"
              >
                All Features
              </Link>
            </div>
          </div>

          {/* Matrix Card Mockup */}
          <div className="flex-1 w-full relative group">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-[#7C5CFC] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] border border-[#E8E7F0] bg-white p-6 shadow-2xl dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-full h-full rounded-[2rem] bg-[#FAFAFC] p-6 dark:bg-[#0E0E12] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Virality Matrix Evaluation
                    </span>
                    <p className="text-[11px] text-gray-500">Podcast Ep. 42 • Clip #3</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 font-black text-amber-700 dark:text-amber-300">
                    <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span>94 / 100</span>
                  </div>
                </div>

                <div className="space-y-3 my-4">
                  {[
                    { label: "Hook Velocity (First 3s)", score: 98, color: "bg-emerald-500" },
                    { label: "Speech Cadence & Energy", score: 92, color: "bg-[#7C5CFC]" },
                    { label: "Audience Retention Probability", score: 95, color: "bg-blue-500" },
                  ].map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-800 dark:text-gray-200">
                        <span>{m.label}</span>
                        <span className="font-mono">{m.score}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-2 border-t border-gray-100 dark:border-white/5">
                  <span>Recommendation: Priority Post on TikTok & Reels</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 mb-16 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-8 py-24 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
          <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Find Your Highest-Scoring Moments
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
