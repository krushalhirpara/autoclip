import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Video, Zap, CreditCard, CheckCircle2 } from "lucide-react";

import { DemoVideoAnalysis } from "@/components/marketing/DemoVideoAnalysis";
import { DemoClipScoring } from "@/components/marketing/DemoClipScoring";
import { DemoSmartReframe } from "@/components/marketing/DemoSmartReframe";
import { DemoAICaptions } from "@/components/marketing/DemoAICaptions";
import { DemoAIBroll } from "@/components/marketing/DemoAIBroll";
import { DemoAutoPosting } from "@/components/marketing/DemoAutoPosting";
import { PipelineSection } from "@/components/marketing/PipelineSection";
import { ArchitectureSection } from "@/components/marketing/ArchitectureSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FaqJsonLd } from "@/components/seo/JsonLd";

const homeFaqs = [
  {
    question: "How accurate is the AI moment detection?",
    answer:
      "Our system uses fine-tuned AI models that analyze transcript semantics, emotional intensity, and narrative arcs to identify hooks that perform significantly better than manual clipping.",
  },
  {
    question: "Do you support languages other than English?",
    answer:
      "Yes, our Whisper-based transcription engine supports over 50 languages with automatic subtitle generation.",
  },
  {
    question: "What happens if I run out of minutes?",
    answer:
      "You can purchase credit top-ups without having to upgrade your base subscription tier. Credits never expire on active accounts.",
  },
  {
    question: "Can I customize the subtitle styles?",
    answer:
      "Absolutely. You can choose font families, adjust colors, positioning, and apply dynamic animated presets (word-by-word highlight, pop, or karaoke style).",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-4 sm:px-6 pb-16 sm:pb-24 pt-8 sm:pt-16">
      <FaqJsonLd faqs={homeFaqs} />
      {/* Technical CSS Grid Background Pattern */}
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 -z-10 h-[480px] sm:h-[600px] w-full opacity-60 sm:opacity-80" />

      {/* Radial Purple Glow Background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[360px] sm:h-[500px] w-[95%] max-w-[800px] -translate-x-1/2 rounded-full bg-[#7C5CFC]/10 sm:bg-[#7C5CFC]/12 blur-[90px] sm:blur-[120px] dark:bg-[#7C5CFC]/15 dark:sm:bg-[#7C5CFC]/20" />

      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex max-w-full items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-3.5 py-1.5 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#7C5CFC] dark:text-[#A78BFA]" />
          <span className="truncate">AI-Driven Video Moment Intelligence & Auto-Reframing</span>
        </div>

        <h1 className="mt-6 sm:mt-8 text-[32px] min-[360px]:text-[36px] min-[390px]:text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111118] dark:text-white leading-[1.14] sm:leading-[1.1] max-w-4xl mx-auto [text-wrap:balance]">
          Turn 1 Long Video Into{" "}
          <span className="bg-gradient-to-r from-[#111118] via-[#5B36EC] to-[#7C5CFC] bg-clip-text text-transparent dark:from-white dark:via-purple-100 dark:to-[#A78BFA]">
            <span className="inline-block">10 Viral Shorts</span>{" "}
            <span className="inline-block">in 60 Seconds</span>
          </span>
        </h1>

        <p className="mx-auto mt-4 sm:mt-6 max-w-2xl px-2 sm:px-0 text-sm sm:text-base md:text-lg text-[#52525E] dark:text-[#A1A1AA] leading-relaxed sm:leading-[1.7]">
          Production-ready SaaS platform analyzing videos with AI transcription, detecting high-potential engaging
          moments, automatically cropping to vertical 9:16 formats, and burning animated captions.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <Link 
            href="/get-started"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto inline-flex flex-row items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3.5 font-semibold text-sm sm:text-base bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] text-white shadow-[0_4px_16px_rgba(124,92,252,0.35)] hover:shadow-[0_6px_24px_rgba(124,92,252,0.55)] min-h-[44px]"
            )}
          >
            <Video className="h-5 w-5 shrink-0" /> 
            <span>Start Free Project</span>
          </Link>
          <Link 
            href="/health"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "w-full sm:w-auto inline-flex flex-row items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-sm sm:text-base border border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white min-h-[44px]"
            )}
          >
            <Zap className="h-5 w-5 shrink-0 text-[#7C5CFC] dark:text-[#A78BFA]" /> 
            <span>View Health API</span>
          </Link>
        </div>
      </div>

      <PipelineSection />

        {/* Animated Marketing Sections */}
        <section id="demo" className="mx-auto mt-16 sm:mt-24 lg:mt-28 max-w-6xl space-y-16 sm:space-y-24 lg:space-y-32">
          
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

        <ArchitectureSection />
        {/* Pricing Section */}
        <section id="pricing" className="mx-auto mt-16 sm:mt-24 lg:mt-32 max-w-7xl">
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

          <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Starter Plan */}
            <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Starter</h3>
              <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
                $19<span className="ml-1 text-base sm:text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
              </div>
              <p className="mt-4 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">Perfect for individual creators just starting out.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#111118] dark:text-white flex-1">
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 120 minutes of video processing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> AI Moment Detection & Scoring</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Auto 9:16 Vertical Reframing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Standard rendering queue</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 720p Video Exports</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Basic subtitle templates</li>
                <li className="flex items-center text-[#6B6B78] dark:text-[#A1A1AA] opacity-50"><CheckCircle2 className="mr-3 h-4 w-4 shrink-0" /> No brand kits</li>
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-xl border-[#E8E7F0] dark:border-[#27272A] min-h-[44px]" asChild>
                <Link href="/pricing">Get Started</Link>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative flex flex-col rounded-3xl border-2 border-[#7C5CFC] bg-white p-6 sm:p-8 shadow-xl dark:bg-[#141416]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#7C5CFC] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Pro</h3>
              <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
                $49<span className="ml-1 text-base sm:text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
              </div>
              <p className="mt-4 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">For serious podcasters and content teams.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#111118] dark:text-white flex-1">
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 500 minutes of video processing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Advanced Virality Scoring Matrix</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Priority rendering queue</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 1080p High-Quality Exports</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Custom brand templates & fonts</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> AI B-Roll & Visual Hook overlays</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Remove AutoClipp watermark</li>
              </ul>
              <Button className="mt-8 w-full rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6A4BE5] min-h-[44px]" asChild>
                <Link href="/pricing">Upgrade to Pro</Link>
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Agency</h3>
              <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
                $149<span className="ml-1 text-base sm:text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
              </div>
              <p className="mt-4 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">For marketing agencies managing multiple clients.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#111118] dark:text-white flex-1">
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 2000 minutes of video processing</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Everything in Pro</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> API Access & Webhooks</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Multi-tenant workspace (up to 10)</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 4K Ultra-HD Exports</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Custom SSO integration</li>
                <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Dedicated Slack support channel</li>
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-xl border-[#E8E7F0] dark:border-[#27272A] min-h-[44px]" asChild>
                <Link href="/pricing">Buy Agency Plan</Link>
              </Button>
            </div>
          </div>
        </section>

        <FaqSection />

        {/* Final CTA */}
        <section className="mx-auto mt-16 sm:mt-24 lg:mt-32 mb-12 sm:mb-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-4 sm:px-6 py-12 sm:py-20 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
            <div className="pointer-events-none absolute inset-0 bg-white/5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
            <h2 className="relative z-10 text-2xl min-[360px]:text-3xl font-extrabold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
              Ready to 10x your content output?
            </h2>
            <p className="relative z-10 mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-[#A1A1AA]">
              Join thousands of creators using AutoClipp to dominate TikTok, YouTube Shorts, and Instagram Reels.
            </p>
            <div className="relative z-10 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
              <Link 
                href="/get-started"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto inline-flex flex-row items-center justify-center rounded-full bg-white px-6 sm:px-8 py-3.5 text-sm sm:text-base text-[#111118] font-bold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)] min-h-[44px]"
                )}
              >
                Start Free Project
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-bold min-h-[44px]" asChild>
                <Link href="/get-started">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
  );
}
