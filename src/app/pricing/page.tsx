import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Zap, Building2 } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-12 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-semibold text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Simple & Transparent Pricing</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-5xl">
          Pay only for what you process
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#6B6B78] dark:text-[#A1A1AA] max-w-2xl mx-auto">
          No hidden fees. Scale your video production seamlessly with our flexible SaaS plans.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 text-left">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#7C5CFC]" />
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Starter</h3>
            </div>
            <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
              $19<span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
              Perfect for individual creators just starting out.
            </p>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm flex-1 text-[#111118] dark:text-white">
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 120 minutes of video processing</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> AI Moment Detection & Scoring</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Auto 9:16 Vertical Reframing</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Standard rendering queue</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 720p Video Exports</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Basic subtitle templates</li>
              <li className="flex items-center text-[#6B6B78] dark:text-[#71717A] opacity-60"><CheckCircle2 className="mr-3 h-4 w-4 shrink-0" /> No brand kit customization</li>
            </ul>
            <Button variant="outline" className="mt-8 w-full rounded-xl border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="relative flex flex-col rounded-3xl border-2 border-[#7C5CFC] bg-white p-8 shadow-xl dark:bg-[#141416]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#7C5CFC] px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              Most Popular
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#7C5CFC]" />
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Pro</h3>
            </div>
            <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
              $49<span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
              For serious podcasters and content production teams.
            </p>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm flex-1 text-[#111118] dark:text-white">
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 500 minutes of video processing</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Advanced Virality Scoring Matrix</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Priority rendering queue</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 1080p High-Quality Exports</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Custom brand templates & fonts</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> AI B-Roll & Visual Hook overlays</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Remove AutoClipp watermark</li>
            </ul>
            <Button className="mt-8 w-full rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6A4BE5] shadow-[0_4px_14px_rgba(124,92,252,0.35)]" asChild>
              <Link href="/signup">Upgrade to Pro</Link>
            </Button>
          </div>

          {/* Agency Plan */}
          <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#7C5CFC]" />
              <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Agency</h3>
            </div>
            <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
              $149<span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">/mo</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
              For marketing agencies managing multi-client pipelines.
            </p>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm flex-1 text-[#111118] dark:text-white">
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 2000 minutes of video processing</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Everything in Pro</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> API Access & Webhooks</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Multi-tenant workspace (up to 10)</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> 4K Ultra-HD Exports</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Custom SSO integration</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669] shrink-0" /> Dedicated priority support</li>
            </ul>
            <Button variant="outline" className="mt-8 w-full rounded-xl border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white" asChild>
              <Link href="/signup">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
