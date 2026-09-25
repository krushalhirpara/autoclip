import React from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft, CheckCircle2, AlertTriangle, CreditCard, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Refund & Cancellation Policy | AutoClipp",
  description: "Understand AutoClipp's refund terms, subscription cancellation policy, and credit replenishment guarantees.",
};

export default function RefundPolicyPage() {
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
            <RefreshCw className="mr-1 h-3 w-3" /> Billing & Returns
          </Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#A1A1AA]">
            Effective Date: September 19, 2026 • Transparent Creator Guarantee
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-600 dark:text-[#A1A1AA] text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-[#22C55E]" /> 1. Our Creator Satisfaction Guarantee
            </h2>
            <p>
              We want you to love your experience with AutoClipp. Because digital compute resources (GPU encoding,
              speech-to-text models, and AI linguistic analysis) are consumed in real time when processing your videos,
              we maintain a clear and fair policy regarding refunds and credit restorations.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 2. 14-Day Subscription Refund Policy
            </h2>
            <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-5 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Eligibility Criteria for Full Subscription Refund:</h3>
              <ul className="list-disc list-inside space-y-2 text-xs">
                <li>You purchased your monthly or annual subscription within the past 14 calendar days.</li>
                <li>You have utilized fewer than 20% of your plan&apos;s allocated monthly processing credits.</li>
                <li>No previous refund has been claimed on your account within the past 12 months.</li>
              </ul>
            </div>
            <p>
              If eligible, your payment will be refunded in full back to your original payment method via Stripe within 5–10
              business days.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <RefreshCw className="mr-2 h-5 w-5 text-[#22C55E]" /> 3. Automatic Credit Replenishment on Failed Renders
            </h2>
            <p>
              We believe you should never pay for technical glitches or pipeline errors:
            </p>
            <div className="rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-4 text-xs text-gray-900 dark:text-white">
              <strong>Zero Risk for Render Failures:</strong> If any background transcription, AI moment detection, or
              FFmpeg vertical export job fails due to a server error, system timeout, or transcoding issue, all deducted
              credits are <em>instantly returned to your CreditBalance</em> ledger automatically.
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Subscription Cancellations</h2>
            <p>
              You may cancel your recurring subscription at any time with zero hassle:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                Navigate to your <strong>Dashboard &gt; Billing &gt; Manage Subscription</strong> to open the secure Stripe
                Customer Portal.
              </li>
              <li>Click &quot;Cancel Subscription&quot;. Your cancellation takes effect at the conclusion of your current billing period.</li>
              <li>You will retain complete access to all features and your remaining credits until the cycle concludes.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-400" /> 5. Non-Refundable Items
            </h2>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Standalone one-time credit booster packages where more than 20% of credits have already been consumed.</li>
              <li>Accounts terminated due to violations of our Acceptable Use Policy (e.g. uploading copyrighted or illegal media).</li>
              <li>Subscription renewal fees requested beyond the 14-day purchase window.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Mail className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 6. How to Request a Refund
            </h2>
            <p>
              To submit a refund inquiry, contact our dedicated billing support team with your account email and transaction receipt:
            </p>
            <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-4 text-xs text-gray-900 dark:text-white">
              Email: <a href="mailto:billing@autoclipp.local" className="text-purple-600 dark:text-[#A78BFA] underline">billing@autoclipp.local</a>
              <br />
              Response Time: Typically within 24 hours (Monday–Friday).
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
