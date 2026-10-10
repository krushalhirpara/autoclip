import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Star, Zap, Briefcase } from "lucide-react";
import { SmartCtaButton } from "@/components/marketing/SmartCtaButton";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-24 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C] overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-[#7C5CFC]/10 blur-[120px] dark:bg-[#7C5CFC]/15" />
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-50" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-12 mt-8 flex items-center space-x-2 text-xs font-semibold tracking-wide text-[#6B6B78] dark:text-[#A1A1AA]">
          <Link href="/" className="hover:text-[#7C5CFC] dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Solutions</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111118] dark:text-white">For Businesses</span>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-[#A78BFA]">
              <Zap className="h-3.5 w-3.5" />
              <span>Solutions</span>
            </div>
            <h1 className="mt-8 text-4xl font-black tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              For Businesses
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA] mx-auto lg:mx-0">
              Transform company webinars, product walkthroughs, and executive keynotes into engaging social lead magnets.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <SmartCtaButton targetRoute="/uploads" variant="primary" size="lg">
                Repurpose Corporate Videos
              </SmartCtaButton>
            </div>
            
            <div className="mt-12 flex flex-col items-center justify-center space-y-3 lg:flex-row lg:justify-start lg:space-x-4 lg:space-y-0 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
              <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full border-2 border-[#F8F9FC] bg-indigo-200 dark:border-[#0A0A0C]"></div>
                 <div className="w-10 h-10 rounded-full border-2 border-[#F8F9FC] bg-purple-200 dark:border-[#0A0A0C]"></div>
                 <div className="w-10 h-10 rounded-full border-2 border-[#F8F9FC] bg-blue-200 dark:border-[#0A0A0C]"></div>
                 <div className="w-10 h-10 rounded-full border-2 border-[#F8F9FC] bg-pink-200 dark:border-[#0A0A0C]"></div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 text-[#FACC15] fill-[#FACC15]" />)}
                </div>
                <span className="mt-1 font-medium text-[#111118] dark:text-white">Trusted by top creators</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative group">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] border border-[#E8E7F0] bg-white p-3 shadow-2xl dark:border-[#27272A] dark:bg-[#141416]">
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-[#F8F9FC] to-[#E8E7F0] dark:from-[#09090B] dark:to-[#141416] relative overflow-hidden flex flex-col">
                 <div className="flex items-center px-4 py-3 border-b border-black/5 dark:border-white/5">
                   <div className="flex space-x-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="mx-auto rounded-md bg-black/5 dark:bg-white/5 px-4 py-1 text-[10px] font-mono text-[#6B6B78] dark:text-[#A1A1AA]">
                     autoclipp.com/uploads
                   </div>
                 </div>
                 <div className="flex-1 flex items-center justify-center relative p-8">
                    <Briefcase className="h-16 w-16 text-[#7C5CFC] animate-pulse" />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 mb-16 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-8 py-24 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
          
          <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to upgrade your video content?
          </h2>
          <div className="relative z-10 mt-10 flex justify-center">
            <SmartCtaButton targetRoute="/uploads" variant="white" size="lg">
              Repurpose Corporate Videos
            </SmartCtaButton>
          </div>
        </div>

      </div>
    </main>
  );
}
