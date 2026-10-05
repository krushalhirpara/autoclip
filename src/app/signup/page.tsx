"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { getFriendlyAuthErrorMessage } from "@/lib/firebase-errors";
import { isValidIndianMobile, normalizeIndianMobile } from "@/lib/validation";
import { Scissors, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuthButtons, OnboardingData } from "@/components/auth/SocialAuthButtons";
import { ProfileCompletionModal } from "@/components/auth/ProfileCompletionModal";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialError = searchParams.get("error");
  const { user, loading, refreshProfile } = useAuth();

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialError ? decodeURIComponent(initialError) : null
  );

  // State for Google/Apple onboarding modal
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  // Authenticated route protection: Logged-in users redirect to /dashboard
  useEffect(() => {
    if (!loading && user && !onboardingData) {
      router.replace("/dashboard");
    }
  }, [user, loading, router, onboardingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!name.trim()) {
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

    if (!email.trim()) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const formattedMobile = normalizeIndianMobile(mobileNumber);

    try {
      // 1. Create account with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = userCredential.user;

      // 2. Set user display name with Full Name
      if (name.trim()) {
        await updateProfile(fbUser, {
          displayName: name.trim(),
        }).catch((profileErr) => console.warn("Profile name update error:", profileErr));
      }

      // 3. Synchronize user in PostgreSQL database & create session cookie
      const syncRes = await fetch("/api/v1/auth/firebase-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "signup",
          uid: fbUser.uid,
          email: fbUser.email,
          name: name.trim(),
          mobileNumber: formattedMobile,
          image: fbUser.photoURL || null,
          provider: "password",
        }),
      });

      const syncData = await syncRes.json();
      if (!syncRes.ok) {
        throw new Error(syncData.error || "Failed to initialize user session.");
      }

      await refreshProfile();

      // 4. Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      console.error("Signup submission error:", err);
      const friendly = getFriendlyAuthErrorMessage(err);
      setErrorMessage(friendly);
      setIsLoading(false);
    }
  };

  if (loading || (user && !onboardingData)) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#7C5CFC]" />
      </div>
    );
  }

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
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Start turning long videos into short-form content.
        </p>
      </div>

      {/* Error Message Box */}
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Social Providers (Google & Apple) in Signup Mode */}
      <SocialAuthButtons
        mode="signup"
        onError={setErrorMessage}
        onRequireOnboarding={(data) => setOnboardingData(data)}
        disabled={isLoading}
      />

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-200 dark:border-white/10" />
        <span className="mx-4 text-[11px] font-semibold tracking-wider text-gray-400 uppercase whitespace-nowrap">
          or continue with email
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-white/10" />
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            placeholder="Krushal Hirpara"
            className="block h-[50px] w-full rounded-[10px] border border-gray-200 bg-white px-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label
            htmlFor="mobileNumber"
            className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            id="mobileNumber"
            type="tel"
            autoComplete="tel"
            required
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. 9876543210 or +91 98765 43210"
            className="block h-[50px] w-full rounded-[10px] border border-gray-200 bg-white px-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="krushal@example.com"
            className="block h-[50px] w-full rounded-[10px] border border-gray-200 bg-white px-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={6}
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

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              placeholder="•••••••••••"
              className="block h-[50px] w-full rounded-[10px] border border-gray-200 bg-white pl-3.5 pr-11 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#7C5CFC] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-300"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#7C5CFC] text-[15px] font-semibold text-white shadow-[0_2px_8px_rgba(124,92,252,0.25)] transition-all hover:bg-[#6D49F0] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating account...</span>
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-gray-900 hover:text-[#7C5CFC] dark:text-white dark:hover:text-[#7C5CFC] transition-colors focus:outline-none focus-visible:underline"
        >
          Sign in
        </Link>
      </p>

      {/* Google/Apple Onboarding Modal for New Users */}
      {onboardingData && (
        <ProfileCompletionModal
          isOpen={true}
          email={onboardingData.email}
          initialName={onboardingData.initialName}
          firebaseUid={onboardingData.firebaseUid}
          photoURL={onboardingData.photoURL}
          provider={onboardingData.provider}
          onComplete={async () => {
            await refreshProfile();
            router.push("/dashboard");
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

export default function SignupPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[#7C5CFC]" />
          </div>
        }
      >
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}
