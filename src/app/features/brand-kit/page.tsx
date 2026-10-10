import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Palette,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SmartCtaButton } from "@/components/marketing/SmartCtaButton";

import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Brand Kit & Style Presets – Consistent Video Branding",
  description:
    "Apply custom brand colors, typography, logos, watermarks, and intro/outro animations across all AI-extracted short-form clips automatically.",
  alternates: {
    canonical: "/features/brand-kit",
  },
  openGraph: {
    title: "Brand Kit & Style Presets | AutoClipp",
    description: "Apply custom branding, fonts, colors, and logos to all your vertical video clips.",
    url: "https://www.autoclipp.com/features/brand-kit",
  },
};

const breadcrumbs = [
  { name: "Home", item: "https://www.autoclipp.com" },
  { name: "Features", item: "https://www.autoclipp.com/get-started" },
  { name: "Brand Kit", item: "https://www.autoclipp.com/features/brand-kit" },
];

export default function BrandKitPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-20 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C] overflow-hidden">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareApplicationJsonLd
        name="AutoClipp Brand Kit & Templates"
        description="Brand kit manager for consistent styling, colors, and watermarks across video clips."
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
          <span className="text-[#111118] dark:text-white">Brand Kit & Style Presets</span>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/25 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 shadow-sm dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-300">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <span>In Active Development • Coming Soon</span>
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              Brand Kit & Custom Presets
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA] mx-auto lg:mx-0">
              Maintain consistent visual branding across every viral clip. Upload your company fonts, custom color hex codes, logo watermarks, and intro/outro animations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <SmartCtaButton variant="primary" size="lg">
                Get Started with AutoClipp
              </SmartCtaButton>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E7F0] bg-white px-7 py-3.5 text-base font-semibold text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white"
              >
                Explore Live Features
              </Link>
            </div>
          </div>

          {/* Brand Kit Mockup */}
          <div className="flex-1 w-full relative group">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#7C5CFC] to-amber-500 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] border border-[#E8E7F0] bg-white p-6 shadow-2xl dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-full h-full rounded-[2rem] bg-[#FAFAFC] p-6 dark:bg-[#0E0E12] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4 text-[#7C5CFC]" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Brand Palette & Watermark
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-amber-600 dark:text-amber-400">
                    Roadmap Preview
                  </Badge>
                </div>

                <div className="space-y-4 my-4">
                  <div>
                    <span className="text-[11px] font-semibold text-gray-500">Primary Colors</span>
                    <div className="mt-2 flex gap-2">
                      <div className="h-7 w-7 rounded-lg bg-[#7C5CFC] ring-2 ring-purple-400/40" />
                      <div className="h-7 w-7 rounded-lg bg-[#111118] dark:bg-white" />
                      <div className="h-7 w-7 rounded-lg bg-[#FACC15]" />
                      <div className="h-7 w-7 rounded-lg bg-[#10B981]" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-gray-500">Custom Typography</span>
                    <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">
                      Poppins Bold (900) • Hormozi Animation Style
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-white/5">
                  <span>Target Release: AutoClipp v1.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 mb-16 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-8 py-24 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
          <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Start Creating Viral Clips Today
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
