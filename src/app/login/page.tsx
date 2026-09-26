"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getFriendlyAuthErrorMessage } from "@/lib/firebase-errors";
import { Scissors, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialError ? decodeURIComponent(initialError) : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Firebase Authentication with Email & Password
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = userCredential.user;

      // 2. Synchronize session with backend & PostgreSQL database
      const syncRes = await fetch("/api/v1/auth/firebase-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || null,
          image: fbUser.photoURL || null,
          provider: "password",
        }),
      });

      const syncData = await syncRes.json();
      if (!syncRes.ok) {
        throw new Error(syncData.error || "Failed to synchronize user session.");
      }

      // 3. Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error("Login submission error:", err);
      const friendly = getFriendlyAuthErrorMessage(err);
      setErrorMessage(friendly);
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
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Sign in to your AutoClipp account
        </p>
      </div>

      {/* Error Message Box */}
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Social Providers (Google & Apple) */}
      <SocialAuthButtons onError={setErrorMessage} disabled={isLoading} />

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-200 dark:border-white/10" />
        <span className="mx-4 text-[11px] font-semibold tracking-wider text-gray-400 uppercase whitespace-nowrap">
          or continue with email
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-white/10" />
      </div>

      {/* Email & Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Email
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

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="•••••••••••"
              className="block h-[50px] w-full rounded-[10px] border border-gray-200 bg-white pl-3.5 pr-11 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#7C5CFC] focus:ring-[#7C5CFC] dark:border-white/20 dark:bg-black/30"
            />
            <span className="ml-2 text-[13px] text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[13px] font-medium text-[#7C5CFC] hover:text-[#6A47EB] transition-colors focus:outline-none focus-visible:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#7C5CFC] text-[15px] font-semibold text-white shadow-[0_2px_8px_rgba(124,92,252,0.25)] transition-all hover:bg-[#6D49F0] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-gray-900 hover:text-[#7C5CFC] dark:text-white dark:hover:text-[#7C5CFC] transition-colors focus:outline-none focus-visible:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[#7C5CFC]" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
