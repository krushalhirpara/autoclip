import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Scissors,
  Sparkles,
  Zap,
  Crop,
  FileText,
  Sliders,
  Film,
  Cpu,
  Video,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Flame,
  Clock,
  Share2,
  FolderKanban,
  Palette,
  Calendar,
} from "lucide-react";
import { SmartCtaButton } from "@/components/marketing/SmartCtaButton";
import { InteractiveProductTour } from "@/components/marketing/InteractiveProductTour";
import { FaqSection } from "@/components/marketing/FaqSection";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Get Started | AutoClipp - AI Video Clipping Platform",
  description:
    "Explore all AutoClipp features and start creating viral 9:16 shorts from long videos. AI transcription, smart reframing, animated captions, and moment scoring.",
};

interface FeatureCardData {
  id: string;
  title: string;
  category: string;
  status: "live" | "beta" | "coming_soon";
  statusLabel: string;
  description: string;
  capabilities: string[];
  icon: React.ElementType;
  route: string;
  actionLabel: string;
  previewWidget: React.ReactNode;
}

export default function GetStartedPage() {
  const features: FeatureCardData[] = [
    {
      id: "ai-clipping",
      title: "AI Video Clipping",
      category: "Core Engine",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Extract high-impact, contextually complete viral moments from hours of long-form podcasts, interviews, and webinars.",
      capabilities: [
        "Autonomous hook detection",
        "Natural topic boundary segmentation",
        "Batch multi-clip extraction in minutes",
      ],
      icon: Scissors,
      route: "/features/ai-clipping",
      actionLabel: "Explore AI Clipping",
      previewWidget: (
        <div className="rounded-xl border border-purple-200/60 bg-purple-50/50 p-3 dark:border-purple-900/30 dark:bg-purple-950/20">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#7C5CFC] dark:text-[#A78BFA]">
              Moments Detected: 12 Clips
            </span>
            <span className="font-mono text-[11px] text-gray-500">01:02:45 video</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-[#7C5CFC]" />
            <div className="h-1.5 w-12 rounded-full bg-emerald-400" />
            <div className="h-1.5 flex-1 rounded-full bg-[#7C5CFC]/40" />
            <div className="h-1.5 w-8 rounded-full bg-[#7C5CFC]" />
          </div>
        </div>
      ),
    },
    {
      id: "ai-transcription",
      title: "AI Speech Transcription",
      category: "Speech Intelligence",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Generate 99% accurate word-by-word transcripts with millisecond timestamps powered by OpenAI Whisper.",
      capabilities: [
        "50+ language automatic detection",
        "Word-level precise timestamps",
        "Spoken keyword indexing & search",
      ],
      icon: FileText,
      route: "/features/ai-transcription",
      actionLabel: "Learn Transcription",
      previewWidget: (
        <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-3 dark:border-blue-900/30 dark:bg-blue-950/20">
          <div className="font-mono text-[11px] text-gray-700 dark:text-gray-300">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">[00:14.20]</span> &ldquo;The secret to scaling video is...&rdquo;
          </div>
          <div className="mt-1 font-mono text-[11px] text-gray-700 dark:text-gray-300">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">[00:18.05]</span> &ldquo;...letting AI extract the best moments.&rdquo;
          </div>
        </div>
      ),
    },
    {
      id: "ai-clip-scoring",
      title: "Algorithmic Virality Scoring",
      category: "Predictive Analytics",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Evaluate every detected moment against a comprehensive virality matrix (0–100) assessing hook speed, pacing, and retention.",
      capabilities: [
        "Opening hook retention prediction",
        "Speech cadence & energy scoring",
        "Instant prioritized clip sorting",
      ],
      icon: Flame,
      route: "/features/ai-clip-scoring",
      actionLabel: "View Scoring Matrix",
      previewWidget: (
        <div className="flex items-center justify-between rounded-xl border border-amber-200/60 bg-amber-50/50 p-3 dark:border-amber-900/30 dark:bg-amber-950/20">
          <div>
            <div className="text-xs font-bold text-gray-900 dark:text-white">Predicted Virality</div>
            <div className="text-[11px] text-gray-500">Top 5% of podcast moments</div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 font-black text-amber-700 dark:text-amber-300">
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>96 / 100</span>
          </div>
        </div>
      ),
    },
    {
      id: "smart-reframe",
      title: "Smart 9:16 Speaker Reframe",
      category: "Computer Vision",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Convert widescreen 16:9 landscape video into vertical 9:16 shorts with automated speaker tracking and face centering.",
      capabilities: [
        "Dynamic keyframe speaker tracking",
        "Landscape-to-vertical auto cropping",
        "Host & guest split-screen support",
      ],
      icon: Crop,
      route: "/features/smart-reframe",
      actionLabel: "Explore Smart Reframe",
      previewWidget: (
        <div className="flex items-center justify-center gap-3 rounded-xl border border-purple-200/60 bg-purple-50/50 p-2.5 dark:border-purple-900/30 dark:bg-purple-950/20">
          <div className="rounded border border-gray-400/40 px-2 py-1 text-[10px] text-gray-500">
            16:9 Landscape
          </div>
          <ArrowRight className="h-3 w-3 text-[#7C5CFC]" />
          <div className="rounded border-2 border-[#7C5CFC] bg-white px-2.5 py-1 text-[10px] font-bold text-[#7C5CFC] dark:bg-[#1C1C28]">
            9:16 Vertical
          </div>
        </div>
      ),
    },
    {
      id: "ai-captions",
      title: "Dynamic Kinetic Captions",
      category: "Viewer Retention",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Add animated, synchronized subtitles with word-by-word highlights in Hormozi, Neon, and Minimalist creator styles.",
      capabilities: [
        "Word-by-word active highlight sync",
        "Auto-sentiment emoji insertion",
        "Custom creator font & color presets",
      ],
      icon: FileText,
      route: "/features/ai-captions",
      actionLabel: "Explore AI Captions",
      previewWidget: (
        <div className="rounded-xl border border-purple-200/60 bg-[#121218] p-3 text-center text-white">
          <p className="text-xs font-black uppercase">
            THE <span className="rounded bg-[#FACC15] px-1 text-black">VIRAL</span> SECRET 🚀
          </p>
        </div>
      ),
    },
    {
      id: "ai-hooks",
      title: "AI Hooks, Titles & Hashtags",
      category: "Copy Generation",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Generate captivating video titles, opening hook lines, platform-tailored descriptions, and trending hashtag packs.",
      capabilities: [
        "High-CTR title variations",
        "TikTok & Shorts hook suggestions",
        "Optimized hashtag sets",
      ],
      icon: Sparkles,
      route: "/features/ai-clipping",
      actionLabel: "Generate Hooks",
      previewWidget: (
        <div className="space-y-1.5 rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-3 dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
            Hook: &ldquo;Never make this $50K video mistake...&rdquo;
          </div>
          <div className="text-[10px] text-gray-500">Tags: #saas #contentcreator #videotips</div>
        </div>
      ),
    },
    {
      id: "ai-b-roll",
      title: "Contextual AI B-Roll",
      category: "Visual Engagement",
      status: "live",
      statusLabel: "Live Feature",
      description:
        "Keep viewer eyes glued by automatically matching and overlaying contextually relevant visual assets over spoken concepts.",
      capabilities: [
        "Speech keyword visual matching",
        "Seamless overlay timing control",
        "Custom opacity & scaling layers",
      ],
      icon: Film,
      route: "/features/ai-b-roll",
      actionLabel: "Explore AI B-Roll",
      previewWidget: (
        <div className="flex items-center space-x-2 rounded-xl border border-purple-200/60 bg-purple-50/50 p-3 dark:border-purple-900/30 dark:bg-purple-950/20">
          <Film className="h-4 w-4 text-[#7C5CFC]" />
          <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
            Auto-matched visual layer: <strong className="text-[#7C5CFC]">Market Growth</strong>
          </span>
        </div>
      ),
    },
    {
      id: "ai-video-editor",
      title: "Studio Timeline Video Editor",
      category: "Timeline Studio",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Trim start/end boundaries with millisecond precision, edit subtitle text, adjust fonts, and re-render directly in your browser.",
      capabilities: [
        "Non-destructive timeline trimming",
        "Direct inline transcript subtitle editing",
        "Instant canvas aspect ratio switching",
      ],
      icon: Sliders,
      route: "/features/ai-video-editor",
      actionLabel: "Open Video Editor",
      previewWidget: (
        <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#1A1A24]">
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span>Timeline Trimmer</span>
            <span className="font-mono font-bold text-[#7C5CFC]">00:15 - 00:45</span>
          </div>
          <div className="mt-2 flex h-4 items-center gap-1 rounded bg-gray-100 px-1 dark:bg-gray-800">
            <div className="h-2 w-1/4 rounded bg-gray-300 dark:bg-gray-600" />
            <div className="h-3 flex-1 rounded bg-[#7C5CFC]" />
            <div className="h-2 w-1/4 rounded bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>
      ),
    },
    {
      id: "export-rendering",
      title: "High-Speed Export & Rendering",
      category: "Video Processing",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Render high-bitrate MP4 video files in 720p, 1080p, and 4K through our distributed BullMQ queue and FFmpeg engine.",
      capabilities: [
        "Distributed queue with parallel workers",
        "Clean burnt-in subtitles & watermark control",
        "Fast direct CDN download links",
      ],
      icon: Zap,
      route: "/features/export-rendering",
      actionLabel: "View Export Specs",
      previewWidget: (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-3 dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            Resolution: 1080x1920 (60FPS)
          </div>
          <span className="rounded bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
            Render Ready
          </span>
        </div>
      ),
    },
    {
      id: "projects-library",
      title: "Projects & Media Workspace",
      category: "Asset Management",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Manage all your video sources, generated clips, transcripts, and export history in one centralized workspace.",
      capabilities: [
        "Secure per-user isolated media storage",
        "Fast search across transcript keywords",
        "Organized project folders & status tags",
      ],
      icon: FolderKanban,
      route: "/dashboard",
      actionLabel: "Go to Workspace",
      previewWidget: (
        <div className="flex items-center space-x-2.5 rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#181824]">
          <FolderKanban className="h-4 w-4 text-[#7C5CFC]" />
          <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
            Workspace: <strong>Podcasts & Webinars</strong> (4 Projects)
          </div>
        </div>
      ),
    },
    {
      id: "credits-billing",
      title: "Pay-As-You-Go Credits & Billing",
      category: "Billing System",
      status: "live",
      statusLabel: "Live Core",
      description:
        "Transparent minute-based pricing with instant PayPal Business one-time passes and monthly plans. No predatory locks.",
      capabilities: [
        "Instant credit top-ups via PayPal Business",
        "Detailed transaction & invoice history",
        "Starter (120m), Pro (500m), Agency (2000m)",
      ],
      icon: CreditCard,
      route: "/pricing",
      actionLabel: "View Pricing Plans",
      previewWidget: (
        <div className="flex items-center justify-between rounded-xl border border-purple-200/60 bg-purple-50/50 p-3 dark:border-purple-900/30 dark:bg-purple-950/20">
          <span className="text-xs font-semibold text-gray-900 dark:text-white">
            Starter, Pro & Agency Passes
          </span>
          <span className="font-mono text-xs font-bold text-[#7C5CFC]">From $19 USD</span>
        </div>
      ),
    },
    {
      id: "brand-kit",
      title: "Brand Kit & Presets",
      category: "Brand Customization",
      status: "coming_soon",
      statusLabel: "Coming Soon",
      description:
        "Automatically apply your brand color palette, custom typography fonts, watermark logo, and custom outro slides.",
      capabilities: [
        "Custom font upload support",
        "Logo watermark placement & opacity",
        "Saved multi-brand style presets",
      ],
      icon: Palette,
      route: "/features/brand-kit",
      actionLabel: "Learn More",
      previewWidget: (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/70 p-3 dark:border-white/5 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500">Custom Brand Kits</span>
          <Badge variant="outline" className="text-[10px] text-amber-600 dark:text-amber-400">
            Planned for v1.2
          </Badge>
        </div>
      ),
    },
    {
      id: "social-publishing",
      title: "Social Media Multi-Publishing",
      category: "Distribution",
      status: "beta",
      statusLabel: "Export Ready • Auto-Post Preview",
      description:
        "Export pre-formatted clips for YouTube Shorts, Instagram Reels, and TikTok. Direct automated API posting is currently in beta preview.",
      capabilities: [
        "Native aspect ratio exports",
        "Publishing queue & review dashboard",
        "Direct platform OAuth syndication (in preview)",
      ],
      icon: Share2,
      route: "/publishing",
      actionLabel: "View Publishing Queue",
      previewWidget: (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#181824]">
          <div className="flex gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
            <span>TikTok</span> • <span>Reels</span> • <span>Shorts</span>
          </div>
          <Badge className="bg-purple-100 text-[#7C5CFC] dark:bg-purple-950 dark:text-[#A78BFA] text-[10px]">
            Queue Ready
          </Badge>
        </div>
      ),
    },
    {
      id: "scheduler",
      title: "Content Scheduler & Automation",
      category: "Pipeline Automation",
      status: "beta",
      statusLabel: "In Preview",
      description:
        "Plan your posting calendar in advance and automate long-form video ingestion from connected channels.",
      capabilities: [
        "Visual content release calendar",
        "Automated clip generation triggers",
        "Scheduled publishing queue",
      ],
      icon: Calendar,
      route: "/scheduler",
      actionLabel: "Explore Scheduler",
      previewWidget: (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#181824]">
          <span className="text-xs text-gray-700 dark:text-gray-300">Content Calendar View</span>
          <span className="font-mono text-xs text-[#7C5CFC]">Mon • Wed • Fri</span>
        </div>
      ),
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#F8F9FC] pb-24 pt-12 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C]">
      {/* Background Gradients & Patterns */}
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 -z-10 h-[800px] w-full opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#7C5CFC]/12 blur-[140px] dark:bg-[#7C5CFC]/20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section className="mx-auto max-w-4xl text-center pt-8 sm:pt-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
            <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC] dark:text-[#A78BFA]" />
            <span>AI Video Intelligence & Feature Catalog</span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-7xl">
            Everything You Need to <br />
            <span className="bg-gradient-to-r from-[#111118] via-[#7C5CFC] to-[#9B7CFF] bg-clip-text text-transparent dark:from-white dark:via-white dark:to-[#A78BFA]">
              Create Viral Shorts
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-[#6B6B78] dark:text-[#A1A1AA] sm:text-lg">
            Turn long-form podcasts, interviews, webinars, and YouTube videos into high-converting
            vertical shorts in seconds. Powered by speech transcription, viral moment scoring,
            smart 9:16 speaker reframing, and dynamic subtitles.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <SmartCtaButton variant="primary" size="lg">
              Start Creating
            </SmartCtaButton>

            <Link
              href="#features-grid"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E7F0] bg-white px-7 py-3.5 text-base font-semibold text-[#111118] shadow-sm transition-all hover:bg-[#F4F3FF] hover:border-[#7C5CFC]/30 dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white dark:hover:bg-[#222227]"
            >
              <span>Explore Features</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE PRODUCT PREVIEW SHOWCASE
           ========================================================================= */}
        <section className="mt-16 sm:mt-20">
          <InteractiveProductTour />
        </section>

        {/* =========================================================================
            3. HOW IT WORKS (5-STEP WORKFLOW)
           ========================================================================= */}
        <section className="mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1 text-xs font-semibold text-[#7C5CFC] dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
              <Clock className="h-3.5 w-3.5" />
              <span>Simple 5-Step Process</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl">
              From Raw Video to Viral Shorts in 60 Seconds
            </h2>
            <p className="mt-3 text-base text-[#6B6B78] dark:text-[#A1A1AA]">
              A complete, automated pipeline engineered to maximize viewer retention on TikTok, Reels, and YouTube Shorts.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Upload Video",
                desc: "Paste a YouTube link or upload MP4/MOV files up to 4K resolution.",
                icon: Video,
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "Whisper speech-to-text transcribes audio and NLP models detect engaging moments.",
                icon: Cpu,
              },
              {
                step: "03",
                title: "Select Clips",
                desc: "Review extracted clips ranked by virality score, hook strength, and pacing.",
                icon: Flame,
              },
              {
                step: "04",
                title: "Style & Refine",
                desc: "Apply animated subtitles, 9:16 speaker reframing, and optional B-roll overlays.",
                icon: Sliders,
              },
              {
                step: "05",
                title: "Export & Share",
                desc: "Download high-bitrate vertical video ready for immediate social distribution.",
                icon: Zap,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#7C5CFC]/50 hover:shadow-xl hover:-translate-y-1 dark:border-[#27272A] dark:bg-[#141418]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F3FF] text-[#7C5CFC] dark:bg-[#1C1C28] dark:text-[#A78BFA] group-hover:bg-[#7C5CFC] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-2xl font-black text-gray-300 dark:text-gray-700 group-hover:text-[#7C5CFC] transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-[#111118] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            4. SHOWCASE ALL MAJOR FEATURES (COMPREHENSIVE BENTO GRID)
           ========================================================================= */}
        <section id="features-grid" className="mt-32 scroll-mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1 text-xs font-semibold text-[#7C5CFC] dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
              <Layers className="h-3.5 w-3.5" />
              <span>Complete Feature Directory</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl">
              Explore Every Feature in the AutoClipp Suite
            </h2>
            <p className="mt-3 text-base text-[#6B6B78] dark:text-[#A1A1AA]">
              Honest breakdown of implemented core features and upcoming roadmap capabilities.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="flex flex-col justify-between rounded-3xl border border-[#E8E7F0] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#7C5CFC]/40 hover:shadow-lg dark:border-[#27272A] dark:bg-[#141418]"
                >
                  <div>
                    {/* Top Status & Category Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F3FF] text-[#7C5CFC] dark:bg-[#1C1C28] dark:text-[#A78BFA]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {feature.category}
                        </span>
                      </div>

                      {feature.status === "live" && (
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {feature.statusLabel}
                        </span>
                      )}
                      {feature.status === "beta" && (
                        <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-[#7C5CFC] dark:text-[#A78BFA] border border-[#7C5CFC]/20">
                          {feature.statusLabel}
                        </span>
                      )}
                      {feature.status === "coming_soon" && (
                        <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {feature.statusLabel}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-5 text-lg font-bold text-[#111118] dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA]">
                      {feature.description}
                    </p>

                    {/* Capabilities Bullet List */}
                    <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-white/5">
                      {feature.capabilities.map((cap, i) => (
                        <li
                          key={i}
                          className="flex items-center text-xs text-gray-700 dark:text-gray-300"
                        >
                          <CheckCircle2 className="mr-2 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Dynamic Preview Widget */}
                    <div className="mt-5">{feature.previewWidget}</div>
                  </div>

                  {/* Card Action Link */}
                  <div className="mt-6 border-t border-gray-100 pt-4 dark:border-white/5">
                    <Link
                      href={feature.route}
                      className="group inline-flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-xs font-semibold text-[#111118] transition-all hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:bg-white/[0.04] dark:text-gray-200 dark:hover:bg-[#7C5CFC]/15 dark:hover:text-white"
                    >
                      <span>{feature.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            5. WHY AUTOCLIPP (GROUNDED ARCHITECTURE & PRODUCT ADVANTAGES)
           ========================================================================= */}
        <section className="mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1 text-xs font-semibold text-[#7C5CFC] dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Engineered for Reliability</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl">
              Why Serious Creators Choose AutoClipp
            </h2>
            <p className="mt-3 text-base text-[#6B6B78] dark:text-[#A1A1AA]">
              Built with modern serverless architecture, production-grade video workers, and strict data privacy.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141418]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-[#7C5CFC] dark:bg-purple-950/40 dark:text-[#A78BFA]">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-[#111118] dark:text-white">
                Contextual NLP vs Random Splits
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA]">
                Unlike basic tools that blindly chop videos into arbitrary 60-second segments, AutoClipp analyzes narrative context, sentiment peaks, and speech coherence to deliver complete standalone clips.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141418]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-[#111118] dark:text-white">
                Distributed BullMQ Processing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA]">
                Our rendering pipeline operates on isolated Redis BullMQ queues with hardware-accelerated FFmpeg workers, ensuring your video export never crashes or freezes your browser.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141418]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-[#111118] dark:text-white">
                Transparent Minutes Billing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA]">
                Pay only for the exact video processing minutes you consume. Powered by secure PayPal Business one-time passes and monthly plans with zero hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. FREQUENTLY ASKED QUESTIONS
           ========================================================================= */}
        <section className="mt-32">
          <FaqSection />
        </section>

        {/* =========================================================================
            7. FINAL CALL TO ACTION
           ========================================================================= */}
        <section className="mt-32 mb-16">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#111118] via-[#1A1828] to-[#121218] px-6 py-20 text-center shadow-2xl dark:from-[#0A0A0C] dark:via-[#14141C] dark:to-[#0A0A0C]">
            <div className="pointer-events-none absolute inset-0 bg-white/5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />

            <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to create your first clip?
            </h2>
            <p className="relative z-10 mx-auto mt-6 max-w-xl text-base text-[#A1A1AA] sm:text-lg">
              Join creators, podcasters, and media agencies scaling their short-form content output with AutoClipp.
            </p>

            <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
              <SmartCtaButton variant="white" size="lg">
                Start Free Project
              </SmartCtaButton>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span>View Pricing & Passes</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
