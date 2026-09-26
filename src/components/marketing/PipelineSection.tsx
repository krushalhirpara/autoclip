import React from 'react';
import { Video, FileText, Cpu, Sliders } from 'lucide-react';

export function PipelineSection() {
  return (
    <section id="features" className="mx-auto mt-28 max-w-7xl px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
          Engineered Asynchronous Processing Pipeline
        </h2>
        <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
          Every step executed on scalable server-side background workers with real-time state reporting.
        </p>
      </div>

      <div className="relative mt-20">
        {/* Connection Lines */}
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#E8E7F0] to-transparent lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[5.5rem] lg:h-[1px] lg:w-auto lg:bg-gradient-to-r dark:via-[#27272A]" />
        
        {/* Animated Pulse Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#7C5CFC]/50 to-transparent lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[5.5rem] lg:h-[1px] lg:w-auto lg:bg-gradient-to-r dark:via-[#7C5CFC]/40 opacity-0 lg:opacity-100" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 relative z-10">
          
          {/* Step 1 */}
          <div className="group relative flex flex-col items-center text-center lg:items-center">
            <div className="mb-4 text-[10px] font-mono font-bold tracking-widest text-[#7C5CFC] uppercase">01 Phase</div>
            <div className="relative flex h-28 w-40 flex-col items-center justify-center rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#7C5CFC]/40 group-hover:shadow-[0_12px_40px_-10px_rgba(124,92,252,0.15)] dark:border-[#27272A] dark:bg-[#0A0A0C]">
              <div className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-[#059669] shadow-[0_0_8px_rgba(5,150,105,0.6)]" />
              <Video className="mb-2 h-6 w-6 text-[#111118] transition-transform duration-300 group-hover:scale-110 dark:text-white" />
              <div className="flex items-end gap-1 opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-2 w-1 animate-[bounce_1s_infinite_100ms] rounded-full bg-[#7C5CFC]" />
                <div className="h-4 w-1 animate-[bounce_1s_infinite_200ms] rounded-full bg-[#7C5CFC]" />
                <div className="h-3 w-1 animate-[bounce_1s_infinite_300ms] rounded-full bg-[#7C5CFC]" />
                <div className="h-5 w-1 animate-[bounce_1s_infinite_400ms] rounded-full bg-[#7C5CFC]" />
                <div className="h-2 w-1 animate-[bounce_1s_infinite_500ms] rounded-full bg-[#7C5CFC]" />
              </div>
            </div>
            <h3 className="mt-6 text-sm font-bold text-[#111118] dark:text-white">Ingestion & Audio</h3>
            <p className="mt-2 text-[13px] text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed max-w-[240px]">
              Direct multipart upload or YouTube URL import. Server extracts audio streams & probes metadata via FFmpeg.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group relative flex flex-col items-center text-center lg:items-center">
            <div className="mb-4 text-[10px] font-mono font-bold tracking-widest text-[#7C5CFC] uppercase">02 Phase</div>
            <div className="relative flex h-28 w-40 flex-col items-center justify-center rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#7C5CFC]/40 group-hover:shadow-[0_12px_40px_-10px_rgba(124,92,252,0.15)] dark:border-[#27272A] dark:bg-[#0A0A0C]">
              <FileText className="mb-2 h-6 w-6 text-[#111118] transition-transform duration-300 group-hover:scale-110 dark:text-white" />
              <div className="flex w-full flex-col gap-1.5 px-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC]" />
                  <div className="h-1 w-12 rounded-full bg-[#E8E7F0] dark:bg-[#27272A]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                  <div className="h-1 w-8 rounded-full bg-[#E8E7F0] dark:bg-[#27272A]" />
                </div>
              </div>
            </div>
            <h3 className="mt-6 text-sm font-bold text-[#111118] dark:text-white">Diarized Transcript</h3>
            <p className="mt-2 text-[13px] text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed max-w-[240px]">
              Multi-speaker diarization with word-level micro-timestamps via OpenAI Whisper / Deepgram abstraction.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group relative flex flex-col items-center text-center lg:items-center">
            <div className="mb-4 text-[10px] font-mono font-bold tracking-widest text-[#7C5CFC] uppercase">03 Phase</div>
            <div className="relative flex h-28 w-40 flex-col items-center justify-center rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#7C5CFC]/40 group-hover:shadow-[0_12px_40px_-10px_rgba(124,92,252,0.15)] dark:border-[#27272A] dark:bg-[#0A0A0C]">
              <Cpu className="mb-2 h-6 w-6 text-[#111118] transition-transform duration-300 group-hover:scale-110 dark:text-white" />
              <div className="flex w-full items-end justify-between px-3 opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-3 w-1.5 rounded-sm bg-[#E8E7F0] dark:bg-[#27272A]" />
                <div className="h-5 w-1.5 rounded-sm bg-[#E8E7F0] dark:bg-[#27272A]" />
                <div className="h-8 w-1.5 rounded-sm bg-[#7C5CFC]" />
                <div className="h-4 w-1.5 rounded-sm bg-[#E8E7F0] dark:bg-[#27272A]" />
                <div className="h-2 w-1.5 rounded-sm bg-[#E8E7F0] dark:bg-[#27272A]" />
              </div>
            </div>
            <h3 className="mt-6 text-sm font-bold text-[#111118] dark:text-white">AI Moment Scoring</h3>
            <p className="mt-2 text-[13px] text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed max-w-[240px]">
              GPT-4o detects peaks in hook curiosity, emotional intensity, clarity, and story completeness.
            </p>
          </div>

          {/* Step 4 */}
          <div className="group relative flex flex-col items-center text-center lg:items-center">
            <div className="mb-4 text-[10px] font-mono font-bold tracking-widest text-[#7C5CFC] uppercase">04 Phase</div>
            <div className="relative flex h-28 w-40 flex-col items-center justify-center rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#7C5CFC]/40 group-hover:shadow-[0_12px_40px_-10px_rgba(124,92,252,0.15)] dark:border-[#27272A] dark:bg-[#0A0A0C]">
              <div className="absolute right-3 top-3 flex h-2 items-center gap-0.5">
                <div className="h-1 w-1 rounded-full bg-[#7C5CFC] animate-ping" />
              </div>
              <Sliders className="mb-2 h-6 w-6 text-[#111118] transition-transform duration-300 group-hover:scale-110 dark:text-white" />
              <div className="relative h-6 w-12 rounded border border-[#E8E7F0] opacity-50 transition-all duration-500 group-hover:w-6 group-hover:opacity-100 dark:border-[#52525B]">
                <div className="absolute inset-x-[20%] inset-y-[10%] rounded-sm border border-[#7C5CFC] opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100" />
              </div>
            </div>
            <h3 className="mt-6 text-sm font-bold text-[#111118] dark:text-white">Reframe & Render</h3>
            <p className="mt-2 text-[13px] text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed max-w-[240px]">
              Dynamic 9:16 vertical crop with face tracking, animated word-highlight subtitles, and instant export.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
