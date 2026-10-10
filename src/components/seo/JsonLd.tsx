import React from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Organization & WebSite Structured Data JSON-LD
 */
export function OrganizationAndWebsiteJsonLd({ baseUrl = "https://www.autoclipp.com" }: { baseUrl?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "AutoClipp",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          "url": `${baseUrl}/icon.svg`,
          "caption": "AutoClipp Logo"
        },
        "description": "Production AI Video Clipping and Content Repurposing SaaS Platform.",
        "email": "support@autoclipp.com",
        "sameAs": [
          "https://twitter.com/autoclipp",
          "https://www.youtube.com/@autoclipp",
          "https://github.com/krushalhirpara/autoclip"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "AutoClipp",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "description": "Turn long videos into short viral vertical clips with AI moment detection and auto captions.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/get-started?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * SoftwareApplication Structured Data JSON-LD
 */
export function SoftwareApplicationJsonLd({
  baseUrl = "https://www.autoclipp.com",
  name = "AutoClipp – AI Video Clipping & Shorts Generator",
  description = "AutoClipp turns long-form podcasts, webinars, and videos into high-converting 9:16 vertical shorts with AI transcription, smart reframing, and animated subtitles.",
  price = "0",
  priceCurrency = "USD",
}: {
  baseUrl?: string;
  name?: string;
  description?: string;
  price?: string;
  priceCurrency?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "operatingSystem": "Web, macOS, Windows, Linux, iOS, Android",
    "applicationCategory": "MultimediaApplication",
    "applicationSubCategory": "Video Editing Software",
    "url": baseUrl,
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}/pricing`
    },
    "featureList": [
      "AI Viral Moment Detection",
      "Automated Whisper Transcription",
      "Smart 9:16 Vertical Video Reframing",
      "Dynamic Word-by-Word Animated Captions",
      "Context-Aware AI B-Roll Integration",
      "Fast Multi-Threaded Cloud Rendering",
      "Direct Export for TikTok, YouTube Shorts, and Instagram Reels"
    ],
    "creator": {
      "@type": "Organization",
      "name": "AutoClipp",
      "url": baseUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Structured Data JSON-LD
 */
export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Structured Data JSON-LD
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
