"use client";

import React, { useState } from 'react';

const faqs = [
  { 
    q: "How accurate is the AI moment detection?", 
    a: "Our system uses fine-tuned GPT-4o models that analyze transcript semantics, emotional intensity, and narrative arcs. It consistently identifies hooks that perform 40% better than random manual clipping." 
  },
  { 
    q: "Do you support languages other than English?", 
    a: "Yes, our Whisper-based transcription engine supports over 50 languages with automatic translation options for subtitles." 
  },
  { 
    q: "What happens if I run out of minutes?", 
    a: "You can easily purchase add-on credit packs without having to upgrade your base subscription plan. Credits never expire as long as your account is active." 
  },
  { 
    q: "Can I customize the subtitle styles?", 
    a: "Absolutely. You can upload custom fonts, change colors, adjust positioning, and apply dynamic animation presets (like pop, word-by-word highlight, or karaoke style)." 
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto mt-32 max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        
        {/* Left Side: Editorial Heading */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-[#E8E7F0] bg-[#F8F9FC] px-4 py-1.5 text-xs font-semibold text-[#6B6B78] dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A1A1AA]">
              Support & Documentation
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-[#6B6B78] dark:text-[#A1A1AA] max-w-md">
              Everything you need to know about the product and billing. For detailed technical integration, please refer to our developer API documentation.
            </p>
            <a href="mailto:support@autoclipp.com" className="mt-8 inline-flex items-center text-sm font-semibold text-[#7C5CFC] hover:text-[#6b47fa] dark:text-[#A78BFA] transition-colors">
              Contact our support team &rarr;
            </a>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:col-span-7">
          <div className="border-t border-[#E8E7F0] dark:border-[#27272A]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-[#E8E7F0] dark:border-[#27272A]">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-mono text-[#9CA3AF] transition-colors group-hover:text-[#7C5CFC] dark:text-[#52525B]">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-[#7C5CFC] dark:text-[#A78BFA]' : 'text-[#111118] dark:text-white group-hover:text-[#7C5CFC]'}`}>
                        {faq.q}
                      </span>
                    </div>
                    <span className="ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E8E7F0] text-[#6B6B78] transition-all group-hover:border-[#7C5CFC] group-hover:text-[#7C5CFC] dark:border-[#27272A] dark:text-[#A1A1AA]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="relative pl-12">
                      <div className="absolute left-[13px] top-1 bottom-1 w-0.5 rounded-full bg-[#7C5CFC]/20 dark:bg-[#7C5CFC]/30" />
                      <p className="text-[15px] leading-relaxed text-[#6B6B78] dark:text-[#A1A1AA]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
