import React from "react";
import Link from "next/link";
import { Scissors, Play, Layers, Sparkles } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen bg-[#F8F9FC] dark:bg-[#0A0A0C]">
      {/* Left Panel - Premium Brand Visual (Hidden on mobile) */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between bg-gradient-to-br from-[#111118] to-[#1E1B32] p-12 text-white relative overflow-hidden dark:from-[#0A0A0C] dark:to-[#14141C]">
        <div className="pointer-events-none absolute inset-0 bg-white/5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="pointer-events-none absolute -top-24 left-0 h-[400px] w-[400px] rounded-full bg-[#7C5CFC]/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#A78BFA]/10 blur-[80px]" />
        
        <div className="relative z-10 flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_0_12px_rgba(124,92,252,0.4)]">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AutoClipp</span>
          </Link>
        </div>

        <div className="relative z-10 my-auto">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#A78BFA] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Video Repurposing</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
            Turn 1 Long Video Into <br/>
            <span className="text-[#A78BFA]">10 Viral Shorts</span>
          </h2>
          <p className="text-lg text-white/70 max-w-md">
            Production-ready SaaS platform analyzing videos with AI transcription and detecting high-potential engaging moments.
          </p>

          {/* Visual abstract representation */}
          <div className="mt-12 flex items-center space-x-4 opacity-80">
            <div className="flex h-12 w-24 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur">
              <Play className="h-5 w-5 text-white/60" />
            </div>
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-[#7C5CFC] to-transparent"></div>
            <div className="flex items-center space-x-2">
              <div className="flex h-16 w-10 items-center justify-center rounded-lg border border-[#7C5CFC]/40 bg-[#7C5CFC]/10 backdrop-blur shadow-[0_0_15px_rgba(124,92,252,0.2)]">
                <Layers className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <div className="flex h-14 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur"></div>
              <div className="flex h-12 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 backdrop-blur"></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/50">
          © {new Date().getFullYear()} AutoClipp Inc. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex w-full lg:w-[55%] flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[440px]">
          {/* Mobile Logo */}
          <div className="mb-10 flex items-center justify-center lg:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_0_12px_rgba(124,92,252,0.4)]">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white">AutoClipp</span>
            </Link>
          </div>
          
          {children}
          
        </div>
      </div>
    </main>
  );
}
