"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, ShieldCheck, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return (
      <footer className="border-t border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#0A0A0C] py-6 px-6 relative z-10 transition-colors">
        <div className="mx-auto flex max-w-[460px] flex-col items-center justify-between gap-4 text-xs sm:flex-row text-gray-500 dark:text-[#71717A]">
          <span>© {new Date().getFullYear()} AutoClipp Inc.</span>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link href="/security" className="hover:text-gray-900 dark:hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#0E0E11] text-gray-600 dark:text-[#A1A1AA] transition-colors">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-gray-200 dark:border-[#1F1F24] bg-gray-50 dark:bg-[#141417]/60 py-4 px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2 text-gray-800 dark:text-white/90">
            <ShieldCheck className="h-4 w-4 text-[#7C5CFC]" />
            <span>Enterprise-grade data encryption (AES-256) & strict multi-tenant video isolation.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-[#22C55E]">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              All Systems Operational (99.99% Uptime)
            </span>
            <Link
              href="/api/v1/health"
              target="_blank"
              className="inline-flex items-center text-purple-600 dark:text-[#A78BFA] hover:underline"
            >
              System API Health <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#A78BFA] shadow-[0_0_15px_rgba(124,92,252,0.4)]">
                <Scissors className="h-5 w-5 text-gray-900 dark:text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Auto<span className="text-purple-600 dark:text-[#A78BFA]">Clipp</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm text-gray-600 dark:text-[#A1A1AA] leading-relaxed">
              Production-ready AI video clipping SaaS platform. Turn hours of long-form podcasts and videos into
              high-converting viral short-form clips with automated transcription, virality scoring, and 9:16 vertical
              reframing.
            </p>

            <div className="pt-2 text-xs text-gray-500 dark:text-[#71717A]">
              Built with Next.js, Prisma, Tailwind CSS, BullMQ, and FFmpeg video pipeline.
            </div>
          </div>

          {/* Column 1: Product & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="hover:text-gray-900 dark:text-white transition-colors">
                  AI Moment Detection
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-gray-900 dark:text-white transition-colors">
                  Auto 9:16 Reframing
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-gray-900 dark:text-white transition-colors">
                  Animated Word Subtitles
                </Link>
              </li>
              <li>
                <Link href="/#clip-preview" className="hover:text-gray-900 dark:text-white transition-colors">
                  Virality Score Matrix
                </Link>
              </li>
              <li>
                <Link href="/#architecture" className="hover:text-gray-900 dark:text-white transition-colors">
                  Cloudflare R2 & S3
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Legal & Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-purple-600 dark:text-[#A78BFA] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-600 dark:text-[#A78BFA] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-purple-600 dark:text-[#A78BFA] transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-purple-600 dark:text-[#A78BFA] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-purple-600 dark:text-[#A78BFA] transition-colors">
                  Security & Data Retention
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-purple-600 dark:text-[#A78BFA] transition-colors">
                  DMCA & Copyright
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Platform & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/security#data-protection" className="hover:text-gray-900 dark:text-white transition-colors">
                  Data Protection (GDPR)
                </Link>
              </li>
              <li>
                <Link href="/api/v1/health" target="_blank" className="hover:text-gray-900 dark:text-white transition-colors">
                  API Status & Health
                </Link>
              </li>
              <li>
                <Link href="/terms#fair-usage" className="hover:text-gray-900 dark:text-white transition-colors">
                  Fair Usage Guidelines
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@autoclipp.local"
                  className="hover:text-purple-600 dark:text-[#A78BFA] transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-gray-200 dark:border-[#1F1F24] bg-white dark:bg-[#0A0A0B] py-6 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} AutoClipp Inc. All rights reserved.</span>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/refund" className="hover:underline">
              Refunds
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookies
            </Link>
            <Link href="/security" className="hover:underline">
              Security
            </Link>
          </div>

          <div className="flex items-center space-x-2 text-gray-500 dark:text-[#71717A]">
            <span>Crafted for creators & editors</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
