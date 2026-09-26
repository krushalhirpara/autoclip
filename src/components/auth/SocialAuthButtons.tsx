"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/lib/firebase";
import { getFriendlyAuthErrorMessage } from "@/lib/firebase-errors";
import { Loader2 } from "lucide-react";

interface SocialAuthButtonsProps {
  onError?: (error: string | null) => void;
  disabled?: boolean;
}

export function SocialAuthButtons({ onError, disabled }: SocialAuthButtonsProps) {
  const router = useRouter();
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);

  const handleSocialLogin = async (providerName: "google" | "apple") => {
    if (loadingProvider || disabled) return;
    
    setLoadingProvider(providerName);
    if (onError) onError(null);

    try {
      const provider = providerName === "google" ? googleProvider : appleProvider;
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email) {
        throw new Error("Unable to retrieve email from identity provider.");
      }

      // Sync with PostgreSQL database & establish HTTP session
      const sessionRes = await fetch("/api/v1/auth/firebase-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || null,
          image: user.photoURL || null,
          provider: providerName,
        }),
      });

      const sessionData = await sessionRes.json();
      if (!sessionRes.ok) {
        throw new Error(sessionData.error || "Failed to create application session");
      }

      // Successful login -> Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error(`Firebase ${providerName} sign-in error:`, err);
      const friendlyMessage = getFriendlyAuthErrorMessage(
        err,
        providerName === "google" ? "Google" : "Apple"
      );
      if (onError) onError(friendlyMessage);
      setLoadingProvider(null);
    }
  };

  const isBusy = loadingProvider !== null || disabled;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Google Button */}
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        disabled={isBusy}
        className="group relative flex h-[52px] w-full items-center justify-center rounded-[10px] border border-gray-200 bg-white px-4 text-[14px] font-semibold text-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 focus:border-[#7C5CFC] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100 dark:hover:bg-white/[0.08]"
      >
        {loadingProvider === "google" ? (
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Loader2 className="h-4 w-4 animate-spin text-[#7C5CFC]" />
            <span>Connecting to Google...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </span>
        )}
      </button>

      {/* Apple Button */}
      <button
        type="button"
        onClick={() => handleSocialLogin("apple")}
        disabled={isBusy}
        className="group relative flex h-[52px] w-full items-center justify-center rounded-[10px] border border-gray-200 bg-white px-4 text-[14px] font-semibold text-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20 focus:border-[#7C5CFC] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100 dark:hover:bg-white/[0.08]"
      >
        {loadingProvider === "apple" ? (
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Loader2 className="h-4 w-4 animate-spin text-[#7C5CFC]" />
            <span>Connecting to Apple...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current shrink-0">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z" />
            </svg>
            <span>Continue with Apple</span>
          </span>
        )}
      </button>
    </div>
  );
}
