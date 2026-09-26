"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getFriendlyAuthErrorMessage } from "@/lib/firebase-errors";
import { Scissors, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      // For security & friendly UX, if user-not-found we can show success or gentle message
      if (err?.code === "auth/user-not-found") {
        setIsSuccess(true);
      } else {
        const friendly = getFriendlyAuthErrorMessage(err);
        setErrorMessage(friendly);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Brand & Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <Link
          href="/"
          className="group mb-6 flex items-center space-x-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
          aria-label="AutoClipp Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_4px_14px_rgba(124,92,252,0.35)] transition-transform group-hover:scale-105">
            <Scissors className="h-5 w-5 text-white transition-transform group-hover:rotate-12" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Auto<span className="text-[#7C5CFC]">Clipp</span>
          </span>
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          Reset your password
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Enter your email to receive a password reset link.
        </p>
      </div>

      {/* Error Message Box */}
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Success Notification */}
      {isSuccess ? (
        <div className="rounded-xl border border-green-200 bg-green-50/80 p-5 text-center dark:border-green-900/40 dark:bg-green-950/30">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
          </div>
          <h2 className="text-[15px] font-semibold text-green-900 dark:text-green-200">
            Check your inbox
          </h2>
          <p className="mt-1.5 text-sm text-green-700 dark:text-green-300">
            We sent a password reset link to <span className="font-semibold">{email}</span>. Please click the link in that email to reset your password.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-[#7C5CFC] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#6D49F0] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/40"
          >
            Return to sign in
          </Link>
        </div>
      ) : (
        /* Reset Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="email@example.com"
              className="block h-[50px] w-full rounded-[10px] border border-gray-200 bg-white px-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#7C5CFC] text-[15px] font-semibold text-white shadow-[0_2px_8px_rgba(124,92,252,0.25)] transition-all hover:bg-[#6D49F0] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending reset link...</span>
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      )}

      {/* Return to login link */}
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-gray-900 hover:text-[#7C5CFC] dark:text-white dark:hover:text-[#7C5CFC] transition-colors focus:outline-none focus-visible:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[#7C5CFC]" />
          </div>
        }
      >
        <ForgotPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
