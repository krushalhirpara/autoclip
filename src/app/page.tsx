import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
import { PipelineSection } from "@/components/marketing/PipelineSection";
import { ArchitectureSection } from "@/components/marketing/ArchitectureSection";
import { FaqSection } from "@/components/marketing/FaqSection";

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
          <Link 
            href="/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 font-semibold bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] text-white shadow-[0_4px_16px_rgba(124,92,252,0.35)] hover:shadow-[0_6px_24px_rgba(124,92,252,0.55)]"
            )}
          >
            <Video className="h-5 w-5 shrink-0" /> 
            <span>Start Free Project</span>
          </Link>
          <Link 
            href="/health"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 font-semibold border border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white"
            )}
          >
            <Zap className="h-5 w-5 shrink-0 text-[#7C5CFC] dark:text-[#A78BFA]" /> 
            <span>View Health API</span>
          </Link>
        </div>
      </div>

      <PipelineSection />

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

        <ArchitectureSection />
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

        <FaqSection />

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
              <Link 
                href="/signup"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "inline-flex flex-row items-center justify-center whitespace-nowrap rounded-full bg-white px-8 text-[#111118] font-bold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                )}
              >
                Start Free Project
              </Link>
              <Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 px-8 font-bold">
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
  );
}
