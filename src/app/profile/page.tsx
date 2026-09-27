"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { isValidIndianMobile, normalizeIndianMobile } from "@/lib/validation";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Scissors,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Authenticated route protection
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Sync state when profile loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || profile.name || user?.displayName || "");
      setMobileNumber(profile.mobileNumber || "");
    } else if (user) {
      setFullName(user.displayName || "");
    }
  }, [profile, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#FAFAFC] dark:bg-[#09090B]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#7C5CFC]" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Active Member";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      setSuccessMessage(null);
      return;
    }

    if (!mobileNumber.trim()) {
      setErrorMessage("Please enter your mobile number.");
      setSuccessMessage(null);
      return;
    }

    if (!isValidIndianMobile(mobileNumber)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      setSuccessMessage(null);
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formattedMobile = normalizeIndianMobile(mobileNumber);

    try {
      // 1. Update Firebase Auth displayName
      if (auth.currentUser) {
        try {
          await updateProfile(auth.currentUser, {
            displayName: fullName.trim(),
          });
        } catch (fbErr) {
          console.warn("Firebase displayName update warning:", fbErr);
        }
      }

      // 2. Update Application Database Profile via API
      const res = await fetch("/api/v1/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobileNumber: formattedMobile,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile.");
      }

      await refreshProfile();
      setSuccessMessage("Profile updated successfully!");
    } catch (err: any) {
      console.error("Profile update error:", err);
      setErrorMessage(err.message || "Something went wrong while saving changes.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-[#FAFAFC] dark:bg-[#09090B] px-4 py-10 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-3xl space-y-6">
        
        {/* Top Back Nav & Title */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#7C5CFC] dark:text-gray-400 dark:hover:text-[#A78BFA] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Header Bar */}
        <div className="flex items-center space-x-3.5 border-b border-gray-200 dark:border-white/10 pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_4px_14px_rgba(124,92,252,0.35)]">
            <Scissors className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Account Profile
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Manage your personal information and contact details
            </p>
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50/80 p-4 text-xs font-medium text-green-800 dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-300">
            <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-4 text-xs font-medium text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Profile Form Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216] sm:p-8">
          
          {/* Avatar & Summary */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] text-white font-bold text-2xl shadow-md">
              {(fullName || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {fullName || "AutoClipp Creator"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>Member since {memberSince}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label
                htmlFor="profileFullName"
                className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="profileFullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSaving}
                  placeholder="Krushal Hirpara"
                  className="block h-[48px] w-full rounded-[10px] border border-gray-200 bg-white pl-10 pr-3.5 text-[14px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Email Address (Read-only) */}
            <div>
              <label
                htmlFor="profileEmail"
                className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="profileEmail"
                  type="email"
                  readOnly
                  value={user.email || ""}
                  className="block h-[48px] w-full rounded-[10px] border border-gray-200 bg-gray-50/80 pl-10 pr-10 text-[14px] text-gray-600 cursor-not-allowed dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-1 text-[11px] text-gray-400">
                Email address is linked to your authentication account and cannot be changed here.
              </p>
            </div>

            {/* Mobile Number */}
            <div>
              <label
                htmlFor="profileMobile"
                className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  id="profileMobile"
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  disabled={isSaving}
                  placeholder="e.g. 9876543210 or +91 98765 43210"
                  className="block h-[48px] w-full rounded-[10px] border border-gray-200 bg-white pl-10 pr-3.5 text-[14px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-400">
                Standard 10-digit Indian mobile format (e.g. +91 98765 43210)
              </p>
            </div>

            {/* Submit / Save Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-[10px] bg-[#7C5CFC] px-6 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(124,92,252,0.25)] transition-all hover:bg-[#6D49F0] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

      </div>
    </main>
  );
}
