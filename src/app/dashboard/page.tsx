"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Scissors, LogOut, User, Mail, Phone, Edit3, Loader2, ArrowRight, Zap } from "lucide-react";

export default function Dashboard() {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#FAFAFC] dark:bg-[#09090B]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#7C5CFC]" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const fullName = profile?.fullName || profile?.name || user.displayName || "Creator";
  const email = profile?.email || user.email || "";
  const mobileNumber = profile?.mobileNumber || "Not provided";

  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-[#FAFAFC] dark:bg-[#09090B] px-4 py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-white/10 pb-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_4px_14px_rgba(124,92,252,0.35)]">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Workspace Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back, {fullName}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-200 dark:hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/30"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* User Profile Summary Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] text-white font-bold text-lg shadow-sm">
                {fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  Your Profile
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your personal account details
                </p>
              </div>
            </div>

            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[#7C5CFC] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#6D49F0] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/30"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Full Name */}
            <div className="flex items-center space-x-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C5CFC]/10 text-[#7C5CFC]">
                <User className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-gray-400">Full Name</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {fullName}
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center space-x-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-gray-400">Email Address</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {email}
                </p>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex items-center space-x-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Phone className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-gray-400">Mobile Number</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {mobileNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing & Subscription Summary Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C5CFC]/10 text-[#7C5CFC]">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  Plan & Processing Credits
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Instant processing minutes powered by PayPal Business
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/settings/billing"
                className="inline-flex items-center justify-center rounded-[10px] border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-200 dark:hover:bg-white/[0.08]"
              >
                Invoices & History
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[#7C5CFC] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#6D49F0] transition-all"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Upgrade / Refill</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50/50 p-5 dark:from-[#1A1828] dark:to-[#151420] border border-purple-100 dark:border-purple-900/30">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7C5CFC] dark:text-[#A78BFA]">
                Available Video Processing Balance
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900 dark:text-white">
                  {profile?.credits ?? 60}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Minutes</span>
              </div>
            </div>
            <p className="mt-3 sm:mt-0 text-xs text-gray-500 dark:text-gray-400 max-w-xs text-right">
              Use credits for AI transcriptions, smart clip extraction, vertical reframing, and ultra-HD rendering.
            </p>
          </div>
        </div>

        {/* Quick Navigation Action */}
        <div className="flex items-center justify-between rounded-xl bg-[#7C5CFC]/5 border border-[#7C5CFC]/15 p-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Ready to start clipping?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload long videos to turn them into viral vertical shorts.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#7C5CFC] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#6D49F0] transition-colors"
          >
            <span>Explore Features</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </main>
  );
}
