import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, FileText, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "DMCA & Copyright Policy | AutoClipp",
  description: "Learn how AutoClipp handles copyright protection, infringement claims, and DMCA notices.",
};

export default function DmcaPage() {
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
            <AlertCircle className="mr-1 h-3 w-3" /> Copyright Compliance
          </Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            DMCA & Copyright Notice
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#A1A1AA]">
            Digital Millennium Copyright Act Notice & Takedown Policy
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-600 dark:text-[#A1A1AA] text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 1. Commitment to Intellectual Property
            </h2>
            <p>
              AutoClipp respects the intellectual property rights of creators and media copyright holders. We comply with
              the provisions of the Digital Millennium Copyright Act (17 U.S.C. § 512, &quot;DMCA&quot;) and expeditiously
              respond to proper notices of alleged copyright infringement.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Filing a DMCA Notice of Infringement</h2>
            <p>
              If you are a copyright owner or authorized agent and believe that content processed on AutoClipp infringes
              your work, submit a written notification including:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2 text-xs">
              <li>A physical or electronic signature of the copyright holder or authorized representative.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the infringing material on our Service, including URL links and project identifiers.</li>
              <li>Your contact information: legal name, address, telephone number, and email address.</li>
              <li>A statement that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement made under penalty of perjury that the information provided in the notice is accurate.</li>
            </ol>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Mail className="mr-2 h-5 w-5 text-[#7C5CFC]" /> 3. Designated Copyright Agent
            </h2>
            <div className="rounded-xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#141416] p-4 text-xs text-gray-900 dark:text-white">
              <p className="font-semibold">AutoClipp Copyright Agent</p>
              <p className="mt-1 text-gray-600 dark:text-[#A1A1AA]">AutoClipp Legal & Compliance Department</p>
              <p className="text-gray-600 dark:text-[#A1A1AA]">Email: <a href="mailto:dmca@autoclipp.local" className="text-purple-600 dark:text-[#A78BFA] underline">dmca@autoclipp.local</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
