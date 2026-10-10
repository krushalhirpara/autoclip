import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ThemeToggle } from "@/components/shared/theme-toggle";

import { AuthProvider } from "@/context/AuthContext";
import { OrganizationAndWebsiteJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.autoclipp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AutoClipp – AI Video Clipping & Shorts Generator",
    template: "%s | AutoClipp",
  },
  description:
    "Turn long videos into short clips with AutoClipp. Explore AI-powered video clipping, automatic animated captions, and 9:16 vertical reframing for creators and podcasters.",
  keywords: [
    "AI video clipping software",
    "AI clip generator",
    "podcast to shorts AI",
    "AI shorts generator",
    "long video to shorts",
    "automatic video clipping",
    "AI video repurposing tool",
    "video subtitle generator",
    "smart vertical reframing",
  ],
  authors: [{ name: "AutoClipp Team", url: siteUrl }],
  creator: "AutoClipp",
  publisher: "AutoClipp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AutoClipp",
    title: "AutoClipp – AI Video Clipping & Shorts Generator",
    description:
      "Turn long videos into short clips with AutoClipp. Explore AI-powered video clipping, automatic animated captions, and 9:16 vertical reframing.",
    images: [
      {
        url: "/apple-icon.png",
        width: 512,
        height: 512,
        alt: "AutoClipp – AI Video Clipping & Shorts Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoClipp – AI Video Clipping & Shorts Generator",
    description:
      "Turn long videos into short clips with AutoClipp. AI-powered video clipping, auto captions, and smart 9:16 reframing.",
    images: ["/apple-icon.png"],
    creator: "@autoclipp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#7C5CFC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <OrganizationAndWebsiteJsonLd />
        <SoftwareApplicationJsonLd />
      </head>
      <body className="min-h-screen bg-[#F8F9FC] text-[#111118] dark:bg-[#0A0A0C] dark:text-white antialiased selection:bg-[#7C5CFC]/30 selection:text-white flex flex-col transition-colors duration-300">
        <AuthProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <ThemeToggle />
        </AuthProvider>
      </body>
    </html>
  );
}
