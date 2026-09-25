import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, AlertCircle, FileCheck, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms of Service | AutoClipp",
  description: "Read the Terms of Service governing your use of AutoClipp video clipping SaaS platform.",
};

export default function TermsOfServicePage() {
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
            <Scale className="mr-1 h-3 w-3" /> Legal Agreement
          </Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#A1A1AA]">
            Last Revised: September 19, 2026 • Version 1.2
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-600 dark:text-[#A1A1AA] text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileCheck className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or creating an account on AutoClipp (&quot;Platform,&quot; &quot;Service&quot;), you agree
              to be legally bound by these Terms of Service. If you do not agree with any portion of these Terms, you must
              immediately discontinue use of the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. User Accounts & Responsibilities</h2>
            <p>
              To use video analysis and clipping features, you must register for an account. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Maintaining the confidentiality of your login credentials and session tokens.</li>
              <li>All activities occurring under your account.</li>
              <li>Notifying us immediately of any unauthorized account access or security breach.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#22C55E]" /> 3. Ownership of Content & Generated Clips
            </h2>
            <div className="rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-4 text-gray-900 dark:text-white">
              <strong>Your Content Belongs to You:</strong> You retain 100% full intellectual property ownership,
              copyright, and commercial rights in and to the videos you upload and the short-form clips rendered by AutoClipp.
            </div>
            <p>
              AutoClipp does not claim any ownership rights over your media. By uploading video content, you grant us solely
              a limited, non-exclusive license to store, encode, reframe, transcribe, and render your video for the sole purpose
              of providing the Service to you.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Credit System & Billing</h2>
            <p>
              AutoClipp operates on a credit and subscription basis:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong className="text-gray-900 dark:text-white">Credit Consumption:</strong> Credits are debited when videos are processed for
                transcription, moment detection, or rendered into vertical exports. The exact credit cost is displayed prior to job execution.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Subscriptions:</strong> Paid plans renew automatically at the end of each billing
                cycle (monthly or annually) via Stripe unless cancelled prior to the renewal date.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Failed Jobs:</strong> If an asynchronous background video rendering job fails due
                to internal system error, the deducted credits are automatically refunded to your ledger.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="fair-usage" className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Acceptable Use & Content Restrictions</h2>
            <p>
              You represent and warrant that you own or have obtained all necessary licenses, permissions, and rights to
              the audio and video content you upload. You agree not to upload content that:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Infringes upon any third party&apos;s copyright, trademark, patent, or privacy rights.</li>
              <li>Contains illegal, defamatory, abusive, harassing, hateful, or pornographic material.</li>
              <li>Attempts to reverse engineer, disrupt, overload, or exploit the background worker queues or APIs.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-400" /> 6. Algorithmic Viral Scoring Disclaimer
            </h2>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
              <strong>No Guarantee of Virality:</strong> While our AI models calculate multi-factor scores (Hook Strength,
              Engagement Potential, Clarity, Story Completeness) based on historical social media patterns, AutoClipp does
              NOT guarantee that any generated clip will achieve viral status, views, engagement, or followers on external platforms.
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, AutoClipp shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your use of or inability to use the Service, including
              lost profits, data corruption, or video export failures.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
