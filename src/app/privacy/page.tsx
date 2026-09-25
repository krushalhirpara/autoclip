import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Lock, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | AutoClipp",
  description: "Learn how AutoClipp collects, processes, and protects your video media, transcripts, and account data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0B] text-gray-900 dark:text-white py-16 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-[#A78BFA] hover:text-gray-900 dark:text-white transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-gray-200 dark:border-[#27272A] pb-8">
          <div className="flex items-center space-x-2">
            <Badge variant="default" className="text-xs">
              <Shield className="mr-1 h-3 w-3" /> Privacy & Data Protection
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#A1A1AA]">
            Last Updated: September 19, 2026 • Effective Date: September 19, 2026
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 space-y-10 text-gray-600 dark:text-[#A1A1AA] text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 1. Overview and Commitment
            </h2>
            <p>
              AutoClipp (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the AI video clipping platform at
              AutoClipp. This Privacy Policy explains what personal information and media files we collect when you
              use our services, how we use and store them, and your legal rights under applicable privacy laws (including
              GDPR, CCPA, and UK GDPR).
            </p>
            <p>
              We treat your media files, source video uploads, and resulting clips as strictly confidential.
              <strong className="text-gray-900 dark:text-white"> We do NOT sell your personal data or user-generated video content to third parties, nor do we use your private videos to train public AI models.</strong>
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Lock className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 2. Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account & Identification Data</h3>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Full Name and Email Address</li>
                  <li>Account Passwords (hashed via bcrypt)</li>
                  <li>Profile Image and Authentication tokens</li>
                  <li>Role assignments (User vs Admin)</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Media & Content Data</h3>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Uploaded video and audio recordings</li>
                  <li>Generated transcripts and speaker labels</li>
                  <li>Generated title hooks, captions, and short clips</li>
                  <li>Video metadata (resolution, fps, duration)</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Billing & Subscription Details</h3>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Stripe Customer and Subscription IDs</li>
                  <li>Credit balance and transactional ledger history</li>
                  <li>Payment transaction receipts and invoices</li>
                  <li>(Credit card data is handled exclusively by Stripe)</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Technical & Operational Data</h3>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>IP addresses and browser user-agent headers</li>
                  <li>Queue processing logs and execution errors</li>
                  <li>Audit logs of clip creations and renders</li>
                  <li>Cookies and session identification tokens</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-[#22C55E]" /> 3. How We Process Media with Artificial Intelligence
            </h2>
            <p>
              When you upload a video or submit a URL for clipping, our automated background pipelines perform the
              following operations:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                <strong className="text-gray-900 dark:text-white">Audio Stream Extraction:</strong> We separate the audio track using FFmpeg to
                prepare it for speech-to-text processing.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Transcription & Diarization:</strong> Audio is converted to text with word-level
                micro-timestamps using transcription provider APIs (e.g. Whisper API).
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">High-Potential Moment Detection:</strong> Algorithmic language models evaluate
                dialogue transcripts to identify viral narrative peaks based on hook strength, emotional impact, and completeness.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Smart Reframing & Render:</strong> The video frames are cropped to 9:16 vertical
                aspect ratios and burned with animated word subtitles according to your chosen styling.
              </li>
            </ol>
            <div className="rounded-xl border border-[#7C5CFC]/30 bg-[#7C5CFC]/10 p-4 text-xs text-purple-600 dark:text-[#A78BFA]">
              <strong>AI Training Policy:</strong> We explicitly contract with enterprise AI API providers to ensure zero data retention for training. Your video inputs and transcripts are never fed into training sets for public foundation models.
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Media Storage & Data Retention</h2>
            <p>
              Media files are stored in dedicated object storage buckets (AWS S3 / Cloudflare R2) secured with AES-256
              server-side encryption:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong className="text-gray-900 dark:text-white">Source Videos:</strong> Retained for 30 days from project creation by default
                to allow re-editing, after which raw files may be automatically purged to optimize storage.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Generated Short Clips:</strong> Retained as long as your account remains
                active or until deleted by you.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Account Deletion:</strong> If you delete your account or project, all
                associated source files, transcripts, clips, and metadata are permanently removed from our active databases and storage buckets within 14 days.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Third-Party Sub-Processors</h2>
            <p>
              We collaborate with reputable third-party infrastructure providers to run our platform:
            </p>
            <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-4 text-xs space-y-2">
              <p>• <strong className="text-gray-900 dark:text-white">Stripe Inc.:</strong> Payment processing, customer billing subscriptions, and fraud prevention.</p>
              <p>• <strong className="text-gray-900 dark:text-white">Amazon Web Services / Cloudflare:</strong> Object storage (S3/R2) and global edge content delivery.</p>
              <p>• <strong className="text-gray-900 dark:text-white">OpenAI / Anthropic:</strong> Speech-to-text audio transcription and transcript semantic analysis via private zero-retention API agreements.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Your Rights & Data Choices</h2>
            <p>
              Depending on your location, you have statutory rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Right to access and export your stored transcripts, videos, and usage logs.</li>
              <li>Right to rectify inaccurate account details.</li>
              <li>Right to erasure (&quot;Right to be Forgotten&quot;) of all uploaded media and account data.</li>
              <li>Right to withdraw consent or object to processing.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us directly at <a href="mailto:privacy@autoclipp.local" className="text-purple-600 dark:text-[#A78BFA] underline">privacy@autoclipp.local</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
