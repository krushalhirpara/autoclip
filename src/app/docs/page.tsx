import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronRight, Play, Star, ShieldCheck, Zap, Activity, Cpu, Layers, Scissors, FileText, Crop, Film, Sliders, Mic, Video, UserCheck, Building2, Briefcase } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-24 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C] overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-[#7C5CFC]/10 blur-[120px] dark:bg-[#7C5CFC]/15" />
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-50" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-12 mt-8 flex items-center space-x-2 text-xs font-semibold tracking-wide text-[#6B6B78] dark:text-[#A1A1AA]">
          <Link href="/" className="hover:text-[#7C5CFC] dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="capitalize">{String("Resources")}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111118] dark:text-white">{String("Documentation")}</span>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-[#A78BFA]">
              <Zap className="h-3.5 w-3.5" />
              <span>{String("Resources")}</span>
            </div>
            <h1 className="mt-8 text-4xl font-black tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              {String("Documentation")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA] mx-auto lg:mx-0">
              {String("Learn how the AutoClipp platform works. Explore architecture, queue workers, and API specifications.")}
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] px-8 text-base font-bold text-white shadow-[0_4px_20px_rgba(124,92,252,0.4)] hover:shadow-[0_8px_30px_rgba(124,92,252,0.6)] transition-all duration-300 hover:-translate-y-1" asChild>
                <Link href="{String('/docs')}">
                  {String("View API Reference")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Social Proof / Trust */}
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
          
          {/* MOCKUP VISUAL */}
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
                     autoclipp.com/studio
                   </div>
                 </div>
                 <div className="flex-1 flex items-center justify-center relative p-8">
                   {/* DYNAMIC FAKE DASHBOARD CONTENT */}
                   
      <div className="w-full h-full bg-[#0A0A0C] rounded-xl font-mono text-[10px] text-green-400 p-4 flex flex-col space-y-2 border border-gray-800 text-left">
        <div className="text-gray-500">POST /api/v1/projects</div>
        <div>{'{'}</div>
        <div className="pl-4"><span className="text-blue-300">"videoUrl"</span>: <span className="text-yellow-300">"https://youtube.com/..."</span>,</div>
        <div className="pl-4"><span className="text-blue-300">"webhook"</span>: <span className="text-yellow-300">"https://api.acme.com/hook"</span></div>
        <div>{'}'}</div>
        <div className="text-gray-500 mt-2">HTTP/1.1 200 OK</div>
      </div>
    
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS WORKFLOW */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#111118] dark:text-white sm:text-4xl">Seamless Workflow</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-[#7C5CFC]/0 via-[#7C5CFC]/30 to-[#7C5CFC]/0 -z-10"></div>
            
            {["Authentication","Upload Endpoint","Webhook Setup","Render Status","Download Output"].map((step, idx, arr) => (
              <div key={idx} className="relative group">
                <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#E8E7F0] shadow-sm hover:shadow-xl hover:border-[#7C5CFC]/40 transition-all duration-300 dark:bg-[#141416] dark:border-[#27272A] dark:hover:border-[#7C5CFC]/40 z-10 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F3FF] text-[#7C5CFC] font-black text-lg dark:bg-[#1B1B1F] dark:text-[#A78BFA] group-hover:scale-110 group-hover:bg-[#7C5CFC] group-hover:text-white transition-all duration-300">
                    {idx + 1}
                  </div>
                  <h3 className="mt-6 font-bold text-[#111118] dark:text-white">{step}</h3>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-10 -right-4 h-5 w-5 text-[#A1A1AA] dark:text-[#52525B]" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* UNIQUE BENEFITS (BENTO GRID) */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#111118] dark:text-white sm:text-4xl">Engineered for Excellence</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{"title":"REST API","desc":"Fully documented REST API to integrate AutoClipp directly into your own applications."},{"title":"Webhooks","desc":"Real-time event notification system. Know exactly when your clips are finished rendering."},{"title":"SDKs","desc":"Official client libraries available for Node.js, Python, and Go."}].map((benefit, idx) => (
              <div key={idx} className="rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6 text-[#7C5CFC]" />
                </div>
                <h3 className="text-xl font-bold text-[#111118] dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 mb-16 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#111118] to-[#1E1B32] px-8 py-24 text-center shadow-2xl dark:from-[#0A0A0C] dark:to-[#14141C]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/30 blur-[80px]" />
          
          <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to upgrade your workflow?
          </h2>
          <div className="relative z-10 mt-10 flex justify-center">
            <Button size="lg" className="rounded-full bg-white px-10 py-7 text-lg font-bold text-[#111118] hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300" asChild>
              <Link href="{String('/docs')}">
                {String("View API Reference")}
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
