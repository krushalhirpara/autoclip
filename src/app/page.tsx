import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Video,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  Sliders,
  FileText,
  CheckCircle2,
  HardDrive,
  CreditCard,
} from "lucide-react";

import { DemoVideoAnalysis } from "@/components/marketing/DemoVideoAnalysis";
import { DemoClipScoring } from "@/components/marketing/DemoClipScoring";
import { DemoSmartReframe } from "@/components/marketing/DemoSmartReframe";
import { DemoAICaptions } from "@/components/marketing/DemoAICaptions";
import { DemoAIBroll } from "@/components/marketing/DemoAIBroll";
import { DemoAutoPosting } from "@/components/marketing/DemoAutoPosting";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:pt-20">
      {/* Technical CSS Grid Background Pattern */}
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 -z-10 h-[600px] w-full" />

      {/* Radial Purple Glow Background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7C5CFC]/12 blur-[120px] dark:bg-[#7C5CFC]/20" />

      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-semibold text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
          <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC] dark:text-[#A78BFA]" />
          <span>AI-Driven Video Moment Intelligence & Auto-Reframing</span>
        </div>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-7xl">
          Turn 1 Long Video Into <br />
          <span className="bg-gradient-to-r from-[#111118] via-[#7C5CFC] to-[#9B7CFF] bg-clip-text text-transparent dark:from-white dark:via-white dark:to-[#A78BFA]">
            10 Viral Shorts in 60 Seconds
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-[#6B6B78] dark:text-[#A1A1AA] sm:text-lg">
          Production-ready SaaS platform analyzing videos with AI transcription, detecting high-potential engaging
          moments, automatically cropping to vertical 9:16 formats, and burning animated captions.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 font-semibold bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] text-white shadow-[0_4px_16px_rgba(124,92,252,0.35)] hover:shadow-[0_6px_24px_rgba(124,92,252,0.55)]">
            <Link href="/signup">
              <Video className="mr-2 h-5 w-5" /> Start Free Project
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="rounded-full px-6 font-semibold border border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white">
            <Link href="/health">
              <Zap className="mr-2 h-5 w-5 text-[#7C5CFC] dark:text-[#A78BFA]" /> View Health API
            </Link>
          </Button>
        </div>
      </div>

      {/* Core Processing Pipeline */}
      <section id="features" className="mx-auto mt-28 max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
            Engineered Asynchronous Processing Pipeline
          </h2>
          <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
            Every step executed on scalable server-side background workers with real-time state reporting.
          </p>
        </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:border-[#7C5CFC]/40">
              <CardHeader className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFC]/10 text-[#A78BFA]">
                  <Video className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">1. Ingestion & Audio</CardTitle>
                <CardDescription className="text-xs text-[#A1A1AA]">
                  Direct multipart upload or YouTube URL import. Server extracts audio streams & probes metadata via
                  FFmpeg.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:border-[#7C5CFC]/40">
              <CardHeader className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFC]/10 text-[#A78BFA]">
                  <FileText className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">2. Diarized Transcript</CardTitle>
                <CardDescription className="text-xs text-[#A1A1AA]">
                  Multi-speaker diarization with word-level micro-timestamps via OpenAI Whisper / Deepgram abstraction.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:border-[#7C5CFC]/40">
              <CardHeader className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFC]/10 text-[#A78BFA]">
                  <Cpu className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">3. AI Moment Scoring</CardTitle>
                <CardDescription className="text-xs text-[#A1A1AA]">
                  GPT-4o detects peaks in hook curiosity, emotional intensity, clarity, and story completeness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:border-[#7C5CFC]/40">
              <CardHeader className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFC]/10 text-[#A78BFA]">
                  <Sliders className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">4. Reframe & Render</CardTitle>
                <CardDescription className="text-xs text-[#A1A1AA]">
                  Dynamic 9:16 vertical crop with face tracking, animated word-highlight subtitles, and instant export.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Animated Marketing Sections */}
        <section id="demo" className="mx-auto mt-28 max-w-6xl space-y-32">
          
          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
                1. AI Video Analysis
              </h2>
              <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                Intelligent parsing of long-form content.
              </p>
            </div>
            <DemoVideoAnalysis />
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
                2. Algorithmic Clip Scoring
              </h2>
              <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                Multi-factor evaluation for maximum engagement.
              </p>
            </div>
            <DemoClipScoring />
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
                3. Smart Subject Reframe
              </h2>
              <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                Dynamic tracking keeps the focus perfectly centered.
              </p>
            </div>
            <DemoSmartReframe />
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
                4. Dynamic AI Captions
              </h2>
              <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                Word-by-word highlighted captions to boost retention.
              </p>
            </div>
            <DemoAICaptions />
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
                5. Contextual AI B-Roll
              </h2>
              <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                Automatically matches visual assets to spoken keywords.
              </p>
            </div>
            <DemoAIBroll />
          </div>

          <div className="pt-12 border-t border-[#E8E7F0] dark:border-[#27272A]">
            <DemoAutoPosting />
          </div>

        </section>

        {/* Foundation Architecture Matrix */}
        <section id="architecture" className="mx-auto mt-28 max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
              Foundation Architecture & Services
            </h2>
            <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
              Fully decoupled provider abstractions allowing zero vendor lock-in.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-[#7C5CFC]" />
                  <CardTitle className="text-base">Database & Models</CardTitle>
                </div>
                <CardDescription className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">PostgreSQL with Prisma ORM</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] space-y-2">
                <p>• 18+ Relational models including Users, Subscriptions, Credits, Projects, Videos, Clips, Transcripts, Captions, Brands, and RenderJobs.</p>
                <p>• Full multi-tenant isolation enforcing project ownership guards.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5 text-[#7C5CFC]" />
                  <CardTitle className="text-base">Storage Abstraction</CardTitle>
                </div>
                <CardDescription className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">Cloudflare R2 / AWS S3 / Local</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] space-y-2">
                <p>• Pluggable <code className="text-[#7C5CFC] dark:text-[#A78BFA]">IStorageService</code> interface.</p>
                <p>• Local filesystem fallback for zero-cloud offline development.</p>
                <p>• Presigned URL upload generation for high-bandwidth direct uploads.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Layers className="h-5 w-5 text-[#7C5CFC]" />
                  <CardTitle className="text-base">Queue & Workers</CardTitle>
                </div>
                <CardDescription className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">BullMQ + Redis / In-Process Local</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] space-y-2">
                <p>• Decoupled <code className="text-[#7C5CFC] dark:text-[#A78BFA]">IQueueService</code> interface.</p>
                <p>• Heavy video extraction and rendering never runs in browser or main thread.</p>
                <p>• Real-time progress updates stored directly in database.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-[#7C5CFC]" />
                  <CardTitle className="text-base">AI Provider Layer</CardTitle>
                </div>
                <CardDescription className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">Whisper / GPT-4o / Claude / Mock</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] space-y-2">
                <p>• Pluggable transcription, clip moment detection, and hook generators.</p>
                <p>• Built-in deterministic mock provider for zero-cost rapid dev.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-[#7C5CFC]" />
                  <CardTitle className="text-base">Billing & Credits</CardTitle>
                </div>
                <CardDescription className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">Stripe & Credit Ledger System</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] space-y-2">
                <p>• Transactional credit balance deductions and top-ups.</p>
                <p>• Detailed audit trail in <code className="text-[#7C5CFC] dark:text-[#A78BFA]">CreditTransaction</code> and <code className="text-[#7C5CFC] dark:text-[#A78BFA]">UsageLog</code>.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-[#7C5CFC]" />
                  <CardTitle className="text-base">Auth & Security</CardTitle>
                </div>
                <CardDescription className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">JWT Sessions & Strict RBAC</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] space-y-2">
                <p>• Self-hosted JWT session cookies with bcryptjs password hashing.</p>
                <p>• Strict authorization guards protecting multi-user and admin routes.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Pricing Section */}
        <section id="pricing" className="mx-auto mt-32 max-w-7xl">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-semibold text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
              <CreditCard className="h-3.5 w-3.5" />
              <span>Simple & Transparent Pricing</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl">
              Pay only for what you process
            </h2>
            <p className="mt-4 text-base text-[#6B6B78] dark:text-[#A1A1AA]">
              No hidden fees. Scale your video production seamlessly.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Starter Plan */}
            <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Starter</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold text-[#111118] dark:text-white">
                $19<span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
              </div>
              <p className="mt-4 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">Perfect for individual creators just starting out.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#111118] dark:text-white flex-1">
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 120 minutes of video processing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> AI Moment Detection & Scoring</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Auto 9:16 Vertical Reframing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Standard rendering queue</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 720p Video Exports</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Basic subtitle templates</li>
                <li className="flex items-center text-[#6B6B78] dark:text-[#A1A1AA] opacity-50"><CheckCircle2 className="mr-3 h-4 w-4" /> No brand kits</li>
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-xl border-[#E8E7F0] dark:border-[#27272A]">Get Started</Button>
            </div>

            {/* Pro Plan */}
            <div className="relative flex flex-col rounded-3xl border-2 border-[#7C5CFC] bg-white p-8 shadow-xl dark:bg-[#141416]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#7C5CFC] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Pro</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold text-[#111118] dark:text-white">
                $49<span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
              </div>
              <p className="mt-4 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">For serious podcasters and content teams.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#111118] dark:text-white flex-1">
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 500 minutes of video processing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Advanced Virality Scoring Matrix</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Priority rendering queue</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 1080p High-Quality Exports</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Custom brand templates & fonts</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> AI B-Roll & Visual Hook overlays</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Remove AutoClipp watermark</li>
              </ul>
              <Button className="mt-8 w-full rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6A4BE5]">Upgrade to Pro</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Agency</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold text-[#111118] dark:text-white">
                $149<span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
              </div>
              <p className="mt-4 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">For marketing agencies managing multiple clients.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#111118] dark:text-white flex-1">
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 2000 minutes of video processing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Everything in Pro</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> API Access & Webhooks</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Multi-tenant workspace (up to 10)</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 4K Ultra-HD Exports</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Custom SSO integration</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Dedicated Slack support channel</li>
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-xl border-[#E8E7F0] dark:border-[#27272A]">Contact Sales</Button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="mx-auto mt-32 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How accurate is the AI moment detection?", a: "Our system uses fine-tuned GPT-4o models that analyze transcript semantics, emotional intensity, and narrative arcs. It consistently identifies hooks that perform 40% better than random manual clipping." },
              { q: "Do you support languages other than English?", a: "Yes, our Whisper-based transcription engine supports over 50 languages with automatic translation options for subtitles." },
              { q: "What happens if I run out of minutes?", a: "You can easily purchase add-on credit packs without having to upgrade your base subscription plan. Credits never expire as long as your account is active." },
              { q: "Can I customize the subtitle styles?", a: "Absolutely. You can upload custom fonts, change colors, adjust positioning, and apply dynamic animation presets (like pop, word-by-word highlight, or karaoke style)." }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-[#E8E7F0] bg-white p-6 dark:border-[#27272A] dark:bg-[#141416]">
                <h3 className="text-lg font-semibold text-[#111118] dark:text-white">{faq.q}</h3>
                <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto mt-32 mb-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-6 py-20 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
            <div className="pointer-events-none absolute inset-0 bg-white/5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
            <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to 10x your content output?
            </h2>
            <p className="relative z-10 mx-auto mt-6 max-w-xl text-lg text-[#A1A1AA]">
              Join thousands of creators using AutoClipp to dominate TikTok, YouTube Shorts, and Instagram Reels.
            </p>
            <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white px-8 text-[#111118] font-bold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Link href="/signup">Start Free Project</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 px-8 font-bold">
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
  );
}
