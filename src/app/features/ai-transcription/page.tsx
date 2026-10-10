import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Mic,
  Languages,
  Search,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { SmartCtaButton } from "@/components/marketing/SmartCtaButton";

import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Video Transcription – 99% Accurate Whisper Subtitles",
  description:
    "Generate accurate word-by-word transcripts with millisecond-level timestamps using Whisper speech-to-text. Supports 50+ languages with automatic punctuation.",
  alternates: {
    canonical: "/features/ai-transcription",
  },
  openGraph: {
    title: "AI Video Transcription – Accurate Whisper Subtitles | AutoClipp",
    description: "Generate 99% accurate word-by-word transcripts with millisecond timestamps.",
    url: "https://www.autoclipp.com/features/ai-transcription",
  },
};

const breadcrumbs = [
  { name: "Home", item: "https://www.autoclipp.com" },
  { name: "Features", item: "https://www.autoclipp.com/get-started" },
  { name: "AI Transcription", item: "https://www.autoclipp.com/features/ai-transcription" },
];

export default function AITranscriptionPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-20 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C] overflow-hidden">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareApplicationJsonLd
        name="AutoClipp AI Video Transcription"
        description="High-accuracy AI speech-to-text and video transcription engine."
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
          <span className="text-[#111118] dark:text-white">AI Speech Transcription</span>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-[#A78BFA]">
              <FileText className="h-3.5 w-3.5" />
              <span>Whisper Speech Engine</span>
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              AI Speech Transcription
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA] mx-auto lg:mx-0">
              Transform hours of audio and video into pristine, synchronized text with 99% accuracy. Every word is stamped down to the millisecond to power kinetic captions and instant moment search.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <SmartCtaButton variant="primary" size="lg">
                Try AI Transcription
              </SmartCtaButton>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E7F0] bg-white px-7 py-3.5 text-base font-semibold text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white"
              >
                All Features
              </Link>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center space-y-3 lg:flex-row lg:justify-start lg:space-x-4 lg:space-y-0 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 text-[#FACC15] fill-[#FACC15]" />
                ))}
              </div>
              <span className="font-medium text-[#111118] dark:text-white">
                50+ Languages Auto-Detected
              </span>
            </div>
          </div>

          {/* Transcript Preview Mockup */}
          <div className="flex-1 w-full relative group">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] border border-[#E8E7F0] bg-white p-4 shadow-2xl dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-full h-full rounded-[2rem] bg-[#FAFAFC] p-6 dark:bg-[#0E0E12] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-[#7C5CFC]" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Live Audio Speech Track
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    99.2% Confidence
                  </span>
                </div>

                <div className="space-y-3 my-4">
                  <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-[#1A1A22] border border-gray-100 dark:border-white/5">
                    <span className="font-mono text-[10px] text-[#7C5CFC]">[00:04.12 - 00:08.50]</span>
                    <p className="mt-1 text-xs text-gray-800 dark:text-gray-200 font-medium">
                      &ldquo;When we launched our SaaS, our conversion rate was below 1%.&rdquo;
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#7C5CFC]/10 p-3 border border-[#7C5CFC]/30">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-[#7C5CFC] font-bold">[00:08.55 - 00:14.20]</span>
                      <span className="rounded bg-[#7C5CFC] text-[9px] font-bold text-white px-1.5 py-0.5">Top Hook</span>
                    </div>
                    <p className="mt-1 text-xs text-[#111118] dark:text-white font-bold">
                      &ldquo;Then we made one single change that increased retention by 400%.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-white/5">
                  <span>Language: English (US)</span>
                  <span>Audio Sample: 48kHz Stereo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#111118] dark:text-white sm:text-4xl">
              Engineered for Precision & Speed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-6 text-[#7C5CFC]">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#111118] dark:text-white mb-3">Word-Level Timestamps</h3>
              <p className="text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed text-sm">
                Each word has its own micro-timestamp, enabling synchronized kinetic caption animations and exact clip cutting.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 text-blue-600">
                <Languages className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#111118] dark:text-white mb-3">50+ Global Languages</h3>
              <p className="text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed text-sm">
                Seamless multi-lingual transcription with automatic accent handling and dialect recognition.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 text-emerald-600">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#111118] dark:text-white mb-3">Spoken Keyword Search</h3>
              <p className="text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed text-sm">
                Jump directly to any segment by typing any word or phrase spoken in hours of footage.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 mb-16 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-8 py-24 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
          <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Start Transcribing Your Videos
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
