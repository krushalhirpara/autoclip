import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Server, Database, EyeOff, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Security & Data Protection | AutoClipp",
  description: "Detailed overview of AutoClipp's encryption standards, media isolation, and data retention policies.",
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0B] text-gray-900 dark:text-white py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-[#A78BFA] hover:text-gray-900 dark:text-white transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="border-b border-gray-200 dark:border-[#27272A] pb-8">
          <Badge variant="default" className="text-xs">
            <ShieldCheck className="mr-1 h-3 w-3" /> Enterprise Security
          </Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Security & Data Protection
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#A1A1AA]">
            Robust safeguards protecting your media assets, transcripts, and credentials.
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-600 dark:text-[#A1A1AA] text-sm leading-relaxed">
          {/* Section 1: Encryption */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Lock className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 1. End-to-End Encryption
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">In Transit (TLS 1.3)</h3>
                <p className="text-xs text-gray-600 dark:text-[#A1A1AA]">
                  All web traffic, video upload streams, and API communications are encrypted using modern Transport
                  Layer Security (TLS 1.3) with perfect forward secrecy.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">At Rest (AES-256)</h3>
                <p className="text-xs text-gray-600 dark:text-[#A1A1AA]">
                  All raw source videos, extracted audio files, rendered vertical clips, and database records are encrypted
                  at rest using industry-standard AES-256 encryption.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Multi-Tenant Isolation */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Database className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 2. Multi-Tenant Asset Isolation
            </h2>
            <p>
              AutoClipp is built with strict multi-tenant authorization barriers:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs">
              <li>
                <strong className="text-gray-900 dark:text-white">Strict Authorization Guards:</strong> Every database query and API endpoint
                executes backend ownership verification (<code className="text-purple-600 dark:text-[#A78BFA]">requireProjectAccess</code>, <code className="text-purple-600 dark:text-[#A78BFA]">requireVideoAccess</code>). Users can never access or inspect another creator&apos;s media.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Presigned Expiring Media URLs:</strong> Video downloads and streaming links
                are signed with time-limited cryptographic tokens that expire automatically.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Role-Based Access Control (RBAC):</strong> Administrative routes are isolated
                behind strict role verification checks.
              </li>
            </ul>
          </section>

          {/* Section 3: AI Model Sandbox & Privacy */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <EyeOff className="mr-2 h-5 w-5 text-[#22C55E]" /> 3. AI Processing Privacy
            </h2>
            <div className="rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-5 text-xs text-gray-900 dark:text-white space-y-2">
              <div className="font-bold flex items-center">
                <CheckCircle2 className="mr-1.5 h-4 w-4 text-[#22C55E]" /> No AI Model Training on User Videos
              </div>
              <p className="text-gray-700 dark:text-white/80">
                We contractually ensure that all speech-to-text transcription models and LLM moment detectors execute in
                zero-retention inference mode. Your speech, face, transcripts, and proprietary clips are never used to train
                or refine public artificial intelligence models.
              </p>
            </div>
          </section>

          {/* Section 4: Worker Sandboxing */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Server className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 4. Worker Queue Sandboxing
            </h2>
            <p>
              Video processing and FFmpeg encoding pipelines run inside isolated background worker instances. Temporary
              files created during audio extraction or reframing are automatically wiped from ephemeral disks immediately
              after storage upload completion.
            </p>
          </section>

          {/* Section 5: Responsible Disclosure */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Vulnerability Reporting</h2>
            <p>
              We welcome reports from independent security researchers. If you discover a security vulnerability in our
              platform, please contact us immediately at <a href="mailto:security@autoclipp.local" className="text-purple-600 dark:text-[#A78BFA] underline">security@autoclipp.local</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
