"use client";

import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Scissors, User, Phone, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { isValidIndianMobile, normalizeIndianMobile } from "@/lib/validation";

interface ProfileCompletionModalProps {
  isOpen: boolean;
  email: string;
  initialName?: string;
  firebaseUid: string;
  photoURL?: string | null;
  provider: "google" | "apple" | string;
  onComplete: (user: Record<string, unknown>) => void;
}

export function ProfileCompletionModal({
  isOpen,
  email,
  initialName = "",
  firebaseUid,
  photoURL,
  provider,
  onComplete,
}: ProfileCompletionModalProps) {
  const [fullName, setFullName] = useState(initialName);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const providerTitle = provider.charAt(0).toUpperCase() + provider.slice(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!mobileNumber.trim()) {
      setErrorMessage("Please enter your mobile number.");
      return;
    }

    if (!isValidIndianMobile(mobileNumber)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const formattedMobile = normalizeIndianMobile(mobileNumber);

    try {
      // 1. Update Firebase User displayName
      if (auth.currentUser) {
        try {
          await updateProfile(auth.currentUser, {
            displayName: fullName.trim(),
          });
        } catch (fbErr) {
          console.warn("Firebase updateProfile warning:", fbErr);
        }
      }

      // 2. Create application user profile & establish session
      const res = await fetch("/api/v1/auth/firebase-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "signup",
          uid: firebaseUid,
          email,
          name: fullName.trim(),
          mobileNumber: formattedMobile,
          image: photoURL || null,
          provider,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to complete account profile.");
      }

      onComplete(data.user);
    } catch (err: unknown) {
      console.error("Profile completion error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to complete profile. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#121216] sm:p-8">
        
        {/* Header with Icon */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_4px_14px_rgba(124,92,252,0.35)]">
            <Scissors className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Complete your AutoClipp profile
          </h2>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            {providerTitle} account connected successfully. Let&apos;s finish setting up your workspace.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Read-only Email */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                readOnly
                value={email}
                className="block h-[48px] w-full rounded-[10px] border border-gray-200 bg-gray-50/80 pl-10 pr-10 text-[14px] text-gray-600 cursor-not-allowed dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-1 text-[11px] text-gray-400">
              Verified with {providerTitle}
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="modalFullName"
              className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <User className="h-4 w-4" />
              </div>
              <input
                id="modalFullName"
                type="text"
                required
                autoFocus
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                placeholder="Krushal Hirpara"
                className="block h-[48px] w-full rounded-[10px] border border-gray-200 bg-white pl-10 pr-3.5 text-[14px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="modalMobileNumber"
              className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                id="modalMobileNumber"
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={isLoading}
                placeholder="e.g. 9876543210 or +91 98765 43210"
                className="block h-[48px] w-full rounded-[10px] border border-gray-200 bg-white pl-10 pr-3.5 text-[14px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
              />
            </div>
            <p className="mt-1 text-[11px] text-gray-400">
              Valid 10-digit Indian mobile number
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 flex h-[48px] w-full items-center justify-center rounded-[10px] bg-[#7C5CFC] text-[15px] font-semibold text-white shadow-[0_2px_8px_rgba(124,92,252,0.25)] transition-all hover:bg-[#6D49F0] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Completing Account...</span>
              </span>
            ) : (
              "Complete Account"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
