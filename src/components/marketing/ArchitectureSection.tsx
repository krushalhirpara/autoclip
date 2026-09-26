import React from 'react';
import { Database, HardDrive, Layers, Cpu, CreditCard, ShieldCheck } from 'lucide-react';

export function ArchitectureSection() {
  return (
    <section id="architecture" className="mx-auto mt-32 max-w-7xl px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
          Foundation Architecture & Services
        </h2>
        <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
          Fully decoupled provider abstractions allowing zero vendor lock-in.
        </p>
      </div>

      <div className="relative mt-20 hidden md:block">
        {/* Connection Lines Container */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg className="h-[400px] w-full max-w-[900px]" viewBox="0 0 900 400" fill="none" preserveAspectRatio="xMidYMid meet">
            {/* Horizontal Main Bus */}
            <path d="M 150 200 L 750 200" stroke="currentColor" className="text-[#E8E7F0] dark:text-[#27272A]" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Core to Top (Database) */}
            <path d="M 450 200 L 450 90" stroke="currentColor" className="text-[#E8E7F0] dark:text-[#27272A]" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Core to Bottom (AI) */}
            <path d="M 450 200 L 450 310" stroke="currentColor" className="text-[#E8E7F0] dark:text-[#27272A]" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Bottom AI to Auth/Billing */}
            <path d="M 450 310 L 250 310" stroke="currentColor" className="text-[#E8E7F0] dark:text-[#27272A]" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 450 310 L 650 310" stroke="currentColor" className="text-[#E8E7F0] dark:text-[#27272A]" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Nodes Grid Layout */}
        <div className="relative mx-auto flex max-w-[900px] h-[400px] flex-col items-center justify-between z-10">
          
          {/* TOP ROW */}
          <div className="flex w-full justify-center">
            <div className="group relative w-64 rounded-2xl border border-[#E8E7F0] bg-white/95 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-[#7C5CFC]/40 hover:shadow-md dark:border-[#27272A] dark:bg-[#0A0A0C]/95">
              <div className="mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-[#7C5CFC]" />
                <h3 className="text-sm font-bold text-[#111118] dark:text-white">Database & Models</h3>
              </div>
              <p className="text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">PostgreSQL with Prisma ORM. 18+ Relational models. Full multi-tenant isolation.</p>
            </div>
          </div>

          {/* MIDDLE ROW */}
          <div className="flex w-full items-center justify-between px-4">
            <div className="group relative w-64 rounded-2xl border border-[#E8E7F0] bg-white/95 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-[#7C5CFC]/40 hover:shadow-md dark:border-[#27272A] dark:bg-[#0A0A0C]/95">
              <div className="mb-2 flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-[#7C5CFC]" />
                <h3 className="text-sm font-bold text-[#111118] dark:text-white">Storage Abstraction</h3>
              </div>
              <p className="text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">Cloudflare R2 / AWS S3 / Local. Pluggable <code className="text-[#7C5CFC]">IStorageService</code>. Presigned uploads.</p>
            </div>

            {/* CORE / API HUB */}
            <div className="group relative flex h-32 w-48 flex-col items-center justify-center rounded-3xl border border-[#7C5CFC]/30 bg-[#F4F3FF] shadow-[0_0_30px_rgba(124,92,252,0.15)] transition-all hover:scale-105 hover:border-[#7C5CFC] hover:shadow-[0_0_40px_rgba(124,92,252,0.25)] dark:border-[#7C5CFC]/40 dark:bg-[#7C5CFC]/10">
              <div className="absolute -top-1.5 -right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#059669]">
                <div className="h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-75" />
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#7C5CFC]">CORE</span>
              <span className="mt-1 text-sm font-extrabold text-[#111118] dark:text-white">API Service</span>
            </div>

            <div className="group relative w-64 rounded-2xl border border-[#E8E7F0] bg-white/95 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-[#7C5CFC]/40 hover:shadow-md dark:border-[#27272A] dark:bg-[#0A0A0C]/95">
              <div className="mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#7C5CFC]" />
                <h3 className="text-sm font-bold text-[#111118] dark:text-white">Queue & Workers</h3>
              </div>
              <p className="text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">BullMQ + Redis. Decoupled async video rendering with real-time DB progress tracking.</p>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex w-full items-center justify-between px-16 relative">
            <div className="group relative w-56 rounded-2xl border border-[#E8E7F0] bg-white/95 p-4 shadow-sm backdrop-blur transition-all hover:translate-y-1 hover:border-[#7C5CFC]/40 hover:shadow-md dark:border-[#27272A] dark:bg-[#0A0A0C]/95">
              <div className="mb-2 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#7C5CFC]" />
                <h3 className="text-sm font-bold text-[#111118] dark:text-white">Billing & Credits</h3>
              </div>
              <p className="text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">Stripe & Credit Ledger. Transactional balance deductions.</p>
            </div>

            <div className="group relative z-10 w-64 translate-y-4 rounded-2xl border border-[#E8E7F0] bg-white/95 p-4 shadow-sm backdrop-blur transition-all hover:translate-y-5 hover:border-[#7C5CFC]/40 hover:shadow-md dark:border-[#27272A] dark:bg-[#0A0A0C]/95">
              <div className="mb-2 flex items-center justify-center gap-2 text-center">
                <Cpu className="h-4 w-4 text-[#7C5CFC]" />
                <h3 className="text-sm font-bold text-[#111118] dark:text-white">AI Provider Layer</h3>
              </div>
              <p className="text-center text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">Whisper / GPT-4o / Claude. Pluggable transcription & moment detection.</p>
            </div>

            <div className="group relative w-56 rounded-2xl border border-[#E8E7F0] bg-white/95 p-4 shadow-sm backdrop-blur transition-all hover:translate-y-1 hover:border-[#7C5CFC]/40 hover:shadow-md dark:border-[#27272A] dark:bg-[#0A0A0C]/95">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#7C5CFC]" />
                <h3 className="text-sm font-bold text-[#111118] dark:text-white">Auth & Security</h3>
              </div>
              <p className="text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">JWT Sessions & strict RBAC. Multi-tenant guards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stack (Vertical System Timeline) */}
      <div className="mt-12 flex flex-col gap-6 md:hidden relative">
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#E8E7F0] dark:bg-[#27272A]" />
        
        {/* Database */}
        <div className="relative pl-14">
          <div className="absolute left-[21px] top-4 h-2.5 w-2.5 rounded-full border-2 border-[#7C5CFC] bg-white dark:bg-[#0A0A0C]" />
          <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#0A0A0C]">
            <div className="mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-[#7C5CFC]" />
              <h3 className="text-sm font-bold text-[#111118] dark:text-white">Database & Models</h3>
            </div>
            <p className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">PostgreSQL with Prisma ORM. 18+ Relational models. Full multi-tenant isolation.</p>
          </div>
        </div>

        {/* Core API */}
        <div className="relative pl-14">
          <div className="absolute left-[21px] top-4 h-2.5 w-2.5 rounded-full border-2 border-[#7C5CFC] bg-[#7C5CFC]" />
          <div className="rounded-2xl border border-[#7C5CFC]/40 bg-[#F4F3FF] p-4 shadow-sm dark:border-[#7C5CFC]/40 dark:bg-[#7C5CFC]/10">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#7C5CFC]">CORE</span>
            <h3 className="text-sm font-bold text-[#111118] dark:text-white">API Service</h3>
            <p className="mt-1 text-xs text-[#6B6B78] dark:text-[#A1A1AA]">Central hub coordinating all async jobs and data flow.</p>
          </div>
        </div>

        {/* Queue */}
        <div className="relative pl-14">
          <div className="absolute left-[21px] top-4 h-2.5 w-2.5 rounded-full border-2 border-[#7C5CFC] bg-white dark:bg-[#0A0A0C]" />
          <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#0A0A0C]">
            <div className="mb-2 flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#7C5CFC]" />
              <h3 className="text-sm font-bold text-[#111118] dark:text-white">Queue & Workers</h3>
            </div>
            <p className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">BullMQ + Redis. Decoupled async video rendering with real-time DB progress tracking.</p>
          </div>
        </div>

        {/* AI */}
        <div className="relative pl-14">
          <div className="absolute left-[21px] top-4 h-2.5 w-2.5 rounded-full border-2 border-[#7C5CFC] bg-white dark:bg-[#0A0A0C]" />
          <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#0A0A0C]">
            <div className="mb-2 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#7C5CFC]" />
              <h3 className="text-sm font-bold text-[#111118] dark:text-white">AI Provider Layer</h3>
            </div>
            <p className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">Whisper / GPT-4o / Claude. Pluggable transcription & moment detection.</p>
          </div>
        </div>
        
        {/* Storage */}
        <div className="relative pl-14">
          <div className="absolute left-[21px] top-4 h-2.5 w-2.5 rounded-full border-2 border-[#7C5CFC] bg-white dark:bg-[#0A0A0C]" />
          <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#0A0A0C]">
            <div className="mb-2 flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-[#7C5CFC]" />
              <h3 className="text-sm font-bold text-[#111118] dark:text-white">Storage Abstraction</h3>
            </div>
            <p className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">Cloudflare R2 / AWS S3 / Local. Pluggable <code className="text-[#7C5CFC]">IStorageService</code>.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
