"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Safely log error without leaking sensitive credentials to the client console
    console.error("AutoClipp Application Error:", error?.message || "Unknown error");
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-140px)] w-full flex-col items-center justify-center bg-[#F8F9FC] px-4 py-16 text-center dark:bg-[#0A0A0C]">
      <div className="relative mx-auto max-w-md space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Application Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white">
            Something went wrong
          </h1>
          <p className="text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
            An unexpected error occurred while processing your request. Please try again or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center gap-2 rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6b47fa]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto rounded-xl border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#141416] dark:text-white"
          >
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
