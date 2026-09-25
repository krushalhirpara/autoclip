import React from "react";
import Link from "next/link";
import { Cookie, ArrowLeft, Shield, Sliders, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Cookie Policy | AutoClipp",
  description: "Learn about how AutoClipp uses cookies and similar storage technologies.",
};

export default function CookiePolicyPage() {
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
            <Cookie className="mr-1 h-3 w-3" /> Storage & Tracking
          </Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#A1A1AA]">
            Last Updated: September 19, 2026 • Compliant with ePrivacy & GDPR
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-600 dark:text-[#A1A1AA] text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Info className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your device by websites that you visit. They are widely used to
              enable website features, improve user session security, and provide reporting insights to site operators.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Shield className="mr-2 h-5 w-5 text-[#22C55E]" /> 2. The Cookies We Use
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white">Strictly Necessary / Authentication Cookies</h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-[#A1A1AA]">
                  Essential for the platform to operate. These cookies keep you logged into your AutoClipp workspace,
                  protect your session from cross-site request forgery (CSRF), and verify project authorization.
                </p>
                <div className="mt-3 text-xs font-mono text-purple-600 dark:text-[#A78BFA] bg-white dark:bg-[#0A0A0B] p-2 rounded-lg">
                  autoclipp_session • httpOnly, Secure, SameSite=Lax (30-day expiration)
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white">Functional & Preferences Cookies</h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-[#A1A1AA]">
                  Remember your UI customizations such as dark mode preference, video player volume level, and default
                  aspect ratio choices (9:16 vs 1:1) in the video studio.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white">Performance & Error Monitoring</h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-[#A1A1AA]">
                  Helps us detect video transcoding issues, queue delays, and API response errors so we can continuously
                  improve reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Sliders className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 3. Managing Cookie Preferences
            </h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. Note that disabling strictly
              necessary cookies will prevent you from signing in or using the AutoClipp editor.
            </p>
            <p>
              For further questions regarding our cookie practices, reach out to <a href="mailto:privacy@autoclipp.local" className="text-purple-600 dark:text-[#A78BFA] underline">privacy@autoclipp.local</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
