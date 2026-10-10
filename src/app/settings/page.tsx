"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Share2, CreditCard, Shield, ChevronRight, Loader2, Scissors } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#FAFAFC] dark:bg-[#09090B]">
        <Loader2 className="h-8 w-8 animate-spin text-[#7C5CFC]" />
      </div>
    );
  }

  const displayName = profile?.fullName || profile?.name || user.displayName || "Creator";

  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-[#FAFAFC] dark:bg-[#09090B] px-4 py-10 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-3xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-3.5 border-b border-gray-200 dark:border-white/10 pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_4px_14px_rgba(124,92,252,0.35)]">
            <Scissors className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Settings & Preferences
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Manage your workspace, account connections, and personal preferences
            </p>
          </div>
        </div>

        {/* Settings Links List */}
        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white shadow-sm dark:divide-white/5 dark:border-white/10 dark:bg-[#121216] overflow-hidden">
          
          {/* Profile Setting */}
          <Link
            href="/profile"
            className="flex items-center justify-between p-5 transition-colors hover:bg-gray-50/80 dark:hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFC]/10 text-[#7C5CFC]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Personal Profile
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Update your full name, mobile number, and contact info ({displayName})
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>

          {/* Social Accounts Setting */}
          <Link
            href="/settings/social-accounts"
            className="flex items-center justify-between p-5 transition-colors hover:bg-gray-50/80 dark:hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Social Accounts
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Connect YouTube, Instagram, TikTok, and other social publishing channels
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>

          {/* Billing & Subscriptions */}
          <Link
            href="/settings/billing"
            className="flex items-center justify-between p-5 transition-colors hover:bg-gray-50/80 dark:hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Billing & Plans
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  View usage credits, starter tier limits, and subscription options
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>

          {/* Security & Access */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Security & Authentication
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Protected with Firebase Authentication and secure HTTP sessions
                </p>
              </div>
            </div>
            <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-600 dark:text-green-400">
              Active
            </span>
          </div>

        </div>

      </div>
    </main>
  );
}
