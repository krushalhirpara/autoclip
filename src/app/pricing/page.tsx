import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-32 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C]">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-6xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-6 text-lg text-[#6B6B78] dark:text-[#A1A1AA]">
          No hidden fees. Scale your video production seamlessly.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 text-left">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
            <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Free / Creator</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold text-[#111118] dark:text-white">
              $0<span className="ml-1 text-lg font-medium text-[#6B6B78]">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm flex-1 text-[#111118] dark:text-white">
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 30 minutes of video</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> AI Clipping</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Captions</li>
            </ul>
            <Button className="mt-8 w-full rounded-xl bg-[#111118] text-white hover:bg-[#27272A] dark:bg-white dark:text-[#111118]" asChild>
              <Link href="/signup">Sign Up Free</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="relative flex flex-col rounded-3xl border-2 border-[#7C5CFC] bg-white p-8 shadow-xl dark:bg-[#141416]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#7C5CFC] px-4 py-1 text-xs font-bold text-white uppercase">Most Popular</div>
            <h3 className="text-lg font-semibold text-[#111118] dark:text-white">Pro</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold text-[#111118] dark:text-white">
              $49<span className="ml-1 text-lg font-medium text-[#6B6B78]">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm flex-1 text-[#111118] dark:text-white">
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 500 minutes of video</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> 1080p Export Quality</li>
              <li className="flex items-center"><CheckCircle2 className="mr-3 h-4 w-4 text-[#059669]" /> Brand Kit included</li>
            </ul>
            <Button className="mt-8 w-full rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6A4BE5]" asChild>
              <Link href="/signup">Upgrade to Pro</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
