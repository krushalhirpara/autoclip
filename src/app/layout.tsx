import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export const metadata: Metadata = {
  title: "AutoClipp | Production AI Video Clipping SaaS Platform",
  description: "Turn long-form videos and podcasts into high-converting viral vertical shorts with automated transcription, AI moment detection, auto reframing, and animated subtitles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#F8F9FC] text-[#111118] dark:bg-[#0A0A0B] dark:text-white antialiased selection:bg-[#7C5CFC]/30 selection:text-white flex flex-col transition-colors duration-300">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  );
}
