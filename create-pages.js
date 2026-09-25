const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, 'src/app');

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const generatePage = (category, categorySlug, title, description, workflow, ctaText, ctaHref, mockupContent, benefits) => {
  return `import React from "react";
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
          <span className="capitalize">{String("${category}")}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111118] dark:text-white">{String("${title}")}</span>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-[#A78BFA]">
              <Zap className="h-3.5 w-3.5" />
              <span>{String("${category}")}</span>
            </div>
            <h1 className="mt-8 text-4xl font-black tracking-tight text-[#111118] dark:text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              {String("${title}")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA] mx-auto lg:mx-0">
              {String("${description}")}
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] px-8 text-base font-bold text-white shadow-[0_4px_20px_rgba(124,92,252,0.4)] hover:shadow-[0_8px_30px_rgba(124,92,252,0.6)] transition-all duration-300 hover:-translate-y-1" asChild>
                <Link href="{String('${ctaHref}')}">
                  {String("${ctaText}")} <ArrowRight className="ml-2 h-5 w-5" />
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
                   ${mockupContent}
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
            
            {${JSON.stringify(workflow)}.map((step, idx, arr) => (
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
            {${JSON.stringify(benefits)}.map((benefit, idx) => (
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
              <Link href="{String('${ctaHref}')}">
                {String("${ctaText}")}
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
`;
};

const pages = [
  {
    path: 'features/ai-clipping',
    category: 'Product',
    title: 'AI Video Clipping',
    description: "AutoClipp's proprietary AI automatically identifies the most engaging hooks and viral moments in your long-form videos.",
    workflow: ['Upload Long-form', 'AI Analysis', 'Hook Detection', 'Clip Selection', 'Export'],
    ctaText: 'Create Your First Clip',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full flex flex-col space-y-4">
        <div className="h-32 w-full bg-[#111118] rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10"></div>
          <div className="h-full w-1 bg-white/20 absolute left-1/3"></div>
          <div className="h-full w-32 bg-[#7C5CFC]/30 absolute left-1/3 border-l border-r border-[#7C5CFC]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7C5CFC] text-white text-[8px] px-2 py-0.5 rounded-full font-bold">VIRAL HOOK</div>
          </div>
          <Scissors className="h-8 w-8 text-white/50" />
        </div>
        <div className="h-4 w-3/4 rounded-full bg-black/10 dark:bg-white/10"></div>
        <div className="h-4 w-1/2 rounded-full bg-black/5 dark:bg-white/5"></div>
      </div>
    `,
    benefits: [
      {title: 'Retention-Optimized', desc: 'Our AI analyzes speech patterns and energy levels to extract clips mathematically proven to retain attention.'},
      {title: 'Batch Processing', desc: 'Generate 15-30 ready-to-post clips from a single 1-hour podcast episode in just a few minutes.'},
      {title: 'Viral Score', desc: 'Every generated clip is assigned a virality score, helping you decide which ones to post first.'}
    ]
  },
  {
    path: 'features/ai-captions',
    category: 'Product',
    title: 'AI Captions',
    description: 'Add dynamic, highly engaging animated captions to your videos automatically. Boost viewer retention instantly.',
    workflow: ['AI Transcription', 'Word-by-word sync', 'Style Selection', 'Highlight Words', 'Render'],
    ctaText: 'Try AI Captions',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="text-2xl font-black uppercase text-center space-y-2">
          <div className="text-[#6B6B78] dark:text-[#A1A1AA]">HOW TO MAKE</div>
          <div className="text-[#111118] dark:text-white text-3xl">YOUR <span className="bg-[#7C5CFC] text-white px-2 rounded-md">VIDEOS</span></div>
          <div className="text-[#6B6B78] dark:text-[#A1A1AA]">GO VIRAL</div>
        </div>
        <div className="mt-8 flex gap-2">
          <div className="w-8 h-8 rounded-full bg-red-400"></div>
          <div className="w-8 h-8 rounded-full bg-blue-400"></div>
          <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white dark:border-[#0A0A0C]"></div>
        </div>
      </div>
    `,
    benefits: [
      {title: '99% Accuracy', desc: 'Industry-leading transcription models ensure your captions are perfectly accurate in 50+ languages.'},
      {title: 'Hormozi Style', desc: 'Apply popular creator caption styles instantly, complete with emojis, highlights, and animations.'},
      {title: 'Auto-Emojis', desc: 'Context-aware AI automatically inserts relevant emojis to match spoken words.'}
    ]
  },
  {
    path: 'features/smart-reframe',
    category: 'Product',
    title: 'Smart Reframe',
    description: 'Intelligently crop your landscape videos into perfect 9:16 vertical shorts while keeping the active speaker in frame.',
    workflow: ['Upload 16:9', 'Face Tracking', 'Active Speaker', 'Auto-Framing', 'Vertical Export'],
    ctaText: 'Try Smart Reframe',
    ctaHref: '/signup',
    mockupContent: `
      <div className="relative w-full aspect-video bg-[#111118] rounded-xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        {/* The 9:16 Crop Box */}
        <div className="h-full aspect-[9/16] border-4 border-[#7C5CFC] shadow-[0_0_0_1000px_rgba(0,0,0,0.6)] flex items-center justify-center relative">
          <div className="absolute top-2 right-2 bg-[#7C5CFC] text-white text-[8px] px-2 py-0.5 rounded-full font-bold flex items-center">
            <Crop className="w-3 h-3 mr-1" /> REFRAMED
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white/50"></div>
        </div>
      </div>
    `,
    benefits: [
      {title: 'Active Speaker Tracking', desc: 'In multi-person podcasts, the camera automatically cuts and pans to whoever is currently speaking.'},
      {title: 'Smooth Panning', desc: 'Cinematic, eased panning motions that look like they were operated by a professional cameraperson.'},
      {title: 'Subject Lock', desc: 'Ensure faces are never cut in half, keeping subjects perfectly centered at all times.'}
    ]
  },
  {
    path: 'features/ai-b-roll',
    category: 'Product',
    title: 'AI B-Roll',
    description: 'Automatically insert context-aware B-roll footage to keep your audience engaged through long speaking segments.',
    workflow: ['Context Analysis', 'Keyword Match', 'Stock Search', 'Timeline Insert', 'Export'],
    ctaText: 'Try AI B-Roll',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full flex flex-col space-y-4">
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="aspect-video bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Film className="w-6 h-6 text-blue-500" />
          </div>
          <div className="aspect-video bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#7C5CFC]/20"></div>
            <CheckCircle2 className="w-6 h-6 text-[#7C5CFC] relative z-10" />
          </div>
          <div className="aspect-video bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <Film className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-2 items-center">
          <div className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] flex-1">"The stock market crashed in 2008..."</div>
          <div className="bg-[#7C5CFC] text-white text-[10px] px-2 py-1 rounded font-bold">INSERT B-ROLL</div>
        </div>
      </div>
    `,
    benefits: [
      {title: 'Contextual Accuracy', desc: 'AI analyzes the literal meaning of sentences to find the perfect visual metaphor from our stock library.'},
      {title: 'Millions of Assets', desc: 'Integrated directly with premium stock libraries, giving you access to 10M+ 4K videos.'},
      {title: 'Auto-Timing', desc: 'B-roll is perfectly timed to appear exactly when the relevant keyword is spoken.'}
    ]
  },
  {
    path: 'features/ai-video-editor',
    category: 'Product',
    title: 'AI Video Editor',
    description: 'A powerful studio timeline to trim, adjust, and perfect your AI-generated clips before exporting.',
    workflow: ['Transcript Edit', 'Timeline Adjust', 'Captions Tune', 'Reframe Check', 'Final Export'],
    ctaText: 'Open Clip Studio',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full h-full flex flex-col space-y-2">
        {/* Fake Video Preview */}
        <div className="flex-1 bg-[#111118] rounded-xl flex items-center justify-center relative">
          <Play className="w-8 h-8 text-white/50" />
        </div>
        {/* Fake Timeline */}
        <div className="h-16 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 p-2 flex flex-col justify-between">
          <div className="h-3 w-full bg-[#7C5CFC]/20 rounded-sm overflow-hidden flex">
            <div className="w-1/4 h-full border-r border-[#7C5CFC]/40"></div>
            <div className="w-1/2 h-full bg-[#7C5CFC]/50"></div>
            <div className="w-1/4 h-full border-l border-[#7C5CFC]/40"></div>
          </div>
          <div className="h-3 w-3/4 bg-blue-500/20 rounded-sm"></div>
        </div>
      </div>
    `,
    benefits: [
      {title: 'Text-Based Editing', desc: 'Edit your video by simply deleting text from the transcript. The video cuts automatically.'},
      {title: 'Multi-Track Timeline', desc: 'Fine-tune audio, add background music, or adjust B-roll on a professional timeline.'},
      {title: 'Cloud Rendering', desc: 'Export 4K videos directly from the browser without slowing down your computer.'}
    ]
  },
  {
    path: 'solutions/podcasters',
    category: 'Solutions',
    title: 'For Podcasters',
    description: 'Transform your 1-hour podcast episodes into a month worth of viral TikToks and YouTube Shorts.',
    workflow: ['Import Audio/Video', 'AI Highlights', 'Auto-Captions', 'Split Screen', 'Export to Socials'],
    ctaText: 'Grow Your Podcast',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
          <Mic className="w-8 h-8 text-white" />
        </div>
        <div className="flex space-x-1 items-end h-8">
           <div className="w-1 h-3 bg-[#7C5CFC] rounded-full animate-pulse"></div>
           <div className="w-1 h-6 bg-[#7C5CFC] rounded-full animate-pulse delay-75"></div>
           <div className="w-1 h-8 bg-[#7C5CFC] rounded-full animate-pulse delay-150"></div>
           <div className="w-1 h-5 bg-[#7C5CFC] rounded-full animate-pulse delay-75"></div>
           <div className="w-1 h-2 bg-[#7C5CFC] rounded-full animate-pulse"></div>
        </div>
        <div className="text-sm font-bold text-[#111118] dark:text-white">1hr Episode → 15 Viral Shorts</div>
      </div>
    `,
    benefits: [
      {title: 'Multi-Speaker Layouts', desc: 'Automatically arrange 2 or 3 speakers into split-screen layouts perfect for vertical video.'},
      {title: 'Silence Removal', desc: 'Automatically cut out dead air, "ums", and "ahs" to keep the pace punchy.'},
      {title: 'Brand Consistency', desc: 'Save your podcast colors, fonts, and logos as a preset to apply to every generated clip.'}
    ]
  },
  {
    path: 'solutions/youtubers',
    category: 'Solutions',
    title: 'For YouTubers',
    description: 'Repurpose your long-form YouTube videos to grow your Shorts channel and TikTok following.',
    workflow: ['Paste URL', 'AI Analyzes', 'Best Hooks Found', 'Captions Added', 'Publish'],
    ctaText: 'Boost Your Views',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full flex flex-col space-y-4 items-center">
        <div className="w-full bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-[#27272A] rounded-xl p-3 flex shadow-sm">
           <div className="w-1/3 aspect-video bg-gray-200 dark:bg-gray-800 rounded-md relative overflow-hidden flex items-center justify-center">
             <Play className="w-4 h-4 text-gray-400" />
           </div>
           <div className="w-2/3 pl-3 flex flex-col justify-center space-y-2">
             <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
             <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
           </div>
        </div>
        <ArrowRight className="w-5 h-5 text-[#7C5CFC]" />
        <div className="flex gap-2">
           <div className="w-10 h-16 bg-[#7C5CFC]/20 rounded-md border border-[#7C5CFC] flex items-center justify-center"><Video className="w-4 h-4 text-[#7C5CFC]"/></div>
           <div className="w-10 h-16 bg-[#7C5CFC]/20 rounded-md border border-[#7C5CFC] flex items-center justify-center"><Video className="w-4 h-4 text-[#7C5CFC]"/></div>
           <div className="w-10 h-16 bg-[#7C5CFC]/20 rounded-md border border-[#7C5CFC] flex items-center justify-center"><Video className="w-4 h-4 text-[#7C5CFC]"/></div>
        </div>
      </div>
    `,
    benefits: [
      {title: 'Direct URL Import', desc: 'Just paste your YouTube link. No need to download and re-upload gigabytes of video files.'},
      {title: 'High-Retention Hooks', desc: 'Our AI specifically searches for high-energy moments that perform well in the Shorts algorithm.'},
      {title: 'End Screen Safe', desc: 'Automatic padding ensures your captions don\'t overlap with YouTube Shorts UI elements.'}
    ]
  },
  {
    path: 'solutions/creators',
    category: 'Solutions',
    title: 'For Creators',
    description: 'Streamline your daily automated content generation workflows and focus on creating, not editing.',
    workflow: ['Shoot Vlogs', 'Auto-trimming', 'AI Captions', 'B-Roll Insert', 'Schedule Post'],
    ctaText: 'Save Editing Time',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full flex justify-center items-center h-full relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7C5CFC]/20 to-transparent"></div>
        <div className="w-20 h-20 bg-white dark:bg-[#111118] border border-[#7C5CFC] rounded-2xl shadow-xl flex items-center justify-center z-10 transform rotate-12 transition-transform hover:rotate-0">
          <Star className="w-10 h-10 text-[#FACC15] fill-[#FACC15]" />
        </div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-12 h-12 bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-white/10 rounded-xl flex items-center justify-center shadow-lg -rotate-12">
          <Zap className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-10 h-10 bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-white/10 rounded-xl flex items-center justify-center shadow-lg rotate-6">
          <Activity className="w-5 h-5 text-emerald-400" />
        </div>
      </div>
    `,
    benefits: [
      {title: 'Vlog Condensing', desc: 'Automatically condense a 20-minute rambling vlog into a punchy 60-second narrative.'},
      {title: 'Trend Awareness', desc: 'AI styles your captions and pacing to match current TikTok and Reels trends.'},
      {title: 'Draft Generation', desc: 'Wake up to 5 new video drafts ready for review in your inbox every morning.'}
    ]
  },
  {
    path: 'solutions/agencies',
    category: 'Solutions',
    title: 'For Agencies',
    description: 'Scale multi-client video clipping pipelines with multi-tenant workspaces and custom brand templates.',
    workflow: ['Client Workspaces', 'Brand Kits', 'Bulk Processing', 'Client Approval', 'Delivery'],
    ctaText: 'Scale Your Agency',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full h-full flex flex-col space-y-2">
        <div className="flex space-x-2 w-full">
          <div className="bg-blue-500/20 text-blue-700 dark:text-blue-300 px-3 py-1 text-xs font-bold rounded-md border border-blue-500/30">Client A</div>
          <div className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 text-xs font-bold rounded-md border border-emerald-500/30">Client B</div>
          <div className="bg-purple-500/20 text-purple-700 dark:text-purple-300 px-3 py-1 text-xs font-bold rounded-md border border-purple-500/30">Client C</div>
        </div>
        <div className="flex-1 bg-white dark:bg-[#111118] rounded-xl border border-[#E8E7F0] dark:border-[#27272A] p-4 flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-[#111118] dark:text-white">Batch Output</div>
            <div className="bg-[#7C5CFC] text-white text-[10px] px-2 py-0.5 rounded">34/34 Clips Done</div>
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-14 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="w-10 h-14 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="w-10 h-14 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="w-10 h-14 bg-gray-100 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    `,
    benefits: [
      {title: 'Multi-Tenant Workspaces', desc: 'Keep client projects, billing, and assets completely separated in dedicated workspaces.'},
      {title: 'Approval Workflows', desc: 'Share a white-labeled link with clients where they can leave comments and approve clips.'},
      {title: 'Unlimited Brand Kits', desc: 'Store unlimited fonts, color palettes, and logo watermarks for all your different clients.'}
    ]
  },
  {
    path: 'solutions/businesses',
    category: 'Solutions',
    title: 'For Businesses',
    description: 'Transform your webinars, internal meetings, and product demos into punchy social media clips.',
    workflow: ['Zoom Upload', 'Key Metrics Found', 'Brand Applied', 'Review', 'LinkedIn Post'],
    ctaText: 'Transform Your Webinars',
    ctaHref: '/signup',
    mockupContent: `
      <div className="w-full flex flex-col items-center">
        <div className="w-48 aspect-video bg-[#111118] rounded-lg relative overflow-hidden flex items-center justify-center border-4 border-gray-800">
           {/* Fake Zoom Grid */}
           <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
             <div className="bg-gray-700 rounded-sm"></div>
             <div className="bg-gray-700 rounded-sm border-2 border-green-500 relative"><Mic className="w-3 h-3 text-white absolute bottom-1 right-1"/></div>
             <div className="bg-gray-700 rounded-sm"></div>
             <div className="bg-gray-700 rounded-sm"></div>
           </div>
        </div>
        <div className="h-4 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
        <div className="bg-[#0077b5] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center">
          Share to LinkedIn
        </div>
      </div>
    `,
    benefits: [
      {title: 'B2B Optimized', desc: 'Our AI is trained to recognize business terminology, stats, and key performance indicators.'},
      {title: 'Webinar Repurposing', desc: 'Squeeze maximum ROI from your expensive 1-hour webinars by generating 20 LinkedIn clips.'},
      {title: 'Professional Subtitles', desc: 'Clean, corporate-friendly subtitle styles that look highly professional for business audiences.'}
    ]
  },
  {
    path: 'docs',
    category: 'Resources',
    title: 'Documentation',
    description: 'Learn how the AutoClipp platform works. Explore architecture, queue workers, and API specifications.',
    workflow: ['Authentication', 'Upload Endpoint', 'Webhook Setup', 'Render Status', 'Download Output'],
    ctaText: 'View API Reference',
    ctaHref: '/docs',
    mockupContent: `
      <div className="w-full h-full bg-[#0A0A0C] rounded-xl font-mono text-[10px] text-green-400 p-4 flex flex-col space-y-2 border border-gray-800 text-left">
        <div className="text-gray-500">POST /api/v1/projects</div>
        <div>{'{'}</div>
        <div className="pl-4"><span className="text-blue-300">"videoUrl"</span>: <span className="text-yellow-300">"https://youtube.com/..."</span>,</div>
        <div className="pl-4"><span className="text-blue-300">"webhook"</span>: <span className="text-yellow-300">"https://api.acme.com/hook"</span></div>
        <div>{'}'}</div>
        <div className="text-gray-500 mt-2">HTTP/1.1 200 OK</div>
      </div>
    `,
    benefits: [
      {title: 'REST API', desc: 'Fully documented REST API to integrate AutoClipp directly into your own applications.'},
      {title: 'Webhooks', desc: 'Real-time event notification system. Know exactly when your clips are finished rendering.'},
      {title: 'SDKs', desc: 'Official client libraries available for Node.js, Python, and Go.'}
    ]
  },
  {
    path: 'help',
    category: 'Resources',
    title: 'Help Center',
    description: 'Find guides, troubleshooting steps, and answers to developer FAQs.',
    workflow: ['Search Query', 'Find Article', 'Follow Steps', 'Resolve Issue', 'Contact Support'],
    ctaText: 'Search Articles',
    ctaHref: '/help',
    mockupContent: `
      <div className="w-full flex flex-col space-y-3">
        <div className="w-full bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-white/10 rounded-full px-4 py-2 flex items-center shadow-sm">
          <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
          <div className="ml-2 h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-white/10 rounded-md"></div>
          <div className="h-10 bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-white/10 rounded-md"></div>
          <div className="h-10 bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-white/10 rounded-md"></div>
          <div className="h-10 bg-white dark:bg-[#111118] border border-[#E8E7F0] dark:border-white/10 rounded-md"></div>
        </div>
      </div>
    `,
    benefits: [
      {title: '24/7 Support', desc: 'Pro and Agency plans include 24/7 priority email and chat support.'},
      {title: 'Video Tutorials', desc: 'Hundreds of step-by-step video guides showing you how to get the most out of AutoClipp.'},
      {title: 'Community Forum', desc: 'Connect with other creators, share prompts, and learn new workflows.'}
    ]
  },
  {
    path: 'examples',
    category: 'Resources',
    title: 'Examples & Showcase',
    description: 'Explore interactive clip showcases and viral breakdowns generated by AutoClipp.',
    workflow: ['Browse Gallery', 'Filter Style', 'Watch Clip', 'Copy Settings', 'Apply Project'],
    ctaText: 'Browse Gallery',
    ctaHref: '/examples',
    mockupContent: `
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="aspect-[9/16] bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        <div className="aspect-[9/16] bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        <div className="aspect-[9/16] bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      </div>
    `,
    benefits: [
      {title: 'Viral Breakdowns', desc: 'We analyze why certain generated clips went viral and explain the psychology behind the hook.'},
      {title: 'One-Click Clone', desc: 'Found a caption style you love in our gallery? Apply it to your account with one click.'},
      {title: 'Niche Filters', desc: 'Filter examples by industry: Real Estate, Finance, Comedy, Education, and more.'}
    ]
  },
  {
    path: 'blog',
    category: 'Resources',
    title: 'AutoClipp Blog',
    description: 'Insights, strategies, and news about AI video processing and social media growth.',
    workflow: ['Read Article', 'Learn Strategies', 'Implement Tips', 'Grow Audience', 'Subscribe'],
    ctaText: 'Read Latest Post',
    ctaHref: '/blog',
    mockupContent: `
      <div className="w-full flex flex-col space-y-3">
        <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
      </div>
    `,
    benefits: [
      {title: 'Algorithm Updates', desc: 'Stay ahead of the curve. When TikTok or YouTube changes their algorithm, we report it first.'},
      {title: 'Creator Spotlights', desc: 'Interviews with creators who scaled from 0 to 1M followers using AutoClipp.'},
      {title: 'Product News', desc: 'Be the first to know about new features, AI models, and capabilities.'}
    ]
  }
];

pages.forEach(p => {
  const dir = path.join(APP_DIR, p.path);
  createDir(dir);
  fs.writeFileSync(path.join(dir, 'page.tsx'), generatePage(p.category, p.category.toLowerCase(), p.title, p.description, p.workflow, p.ctaText, p.ctaHref, p.mockupContent, p.benefits));
});

console.log("Unique Premium Pages generated successfully.");
