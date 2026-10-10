import React from "react";
import type { Metadata } from "next";
import { SoftwareApplicationJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Pricing Plans – Simple & Transparent Video Repurposing",
  description:
    "Explore AutoClipp pricing. Start free with 60 credits or scale with Starter, Pro, and Agency tiers for creators, podcasters, and video editors.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "AutoClipp Pricing – Plans for Creators & Teams",
    description:
      "Pay only for what you process. Get high-converting vertical video shorts with AI transcription and auto captions.",
    url: "https://www.autoclipp.com/pricing",
  },
  twitter: {
    title: "AutoClipp Pricing – Plans for Creators & Teams",
    description:
      "Pay only for what you process. Get high-converting vertical video shorts with AI transcription and auto captions.",
  },
};

const pricingFaqs = [
  {
    question: "How do AutoClipp video processing credits work?",
    answer:
      "1 credit equals 1 minute of video analysis, moment scoring, auto reframing, and captioning. Unused credits rollover on active plans.",
  },
  {
    question: "Can I upgrade, downgrade, or cancel at any time?",
    answer:
      "Yes, you have full flexibility to switch plans or purchase one-time credit top-ups without any hidden cancellation fees.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We securely accept PayPal Business payments, credit cards, debit cards, and local payment methods supported by PayPal.",
  },
];

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="AutoClipp Video Clipping Platform"
        description="Scalable AI video clipping, subtitle generation, and 9:16 vertical reframing SaaS."
        price="0"
        priceCurrency="USD"
      />
      <FaqJsonLd faqs={pricingFaqs} />
      {children}
    </>
  );
}
