"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Flame } from "lucide-react";
import { VideoCreationStudio } from "@/components/studio/VideoCreationStudio";

export default function ClipsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/clips");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#FAFAFC] dark:bg-[#09090B]">
        <Loader2 className="h-8 w-8 animate-spin text-[#7C5CFC]" />
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-[#FAFAFC] dark:bg-[#09090B] px-4 py-8 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="border-b border-gray-200 dark:border-white/10 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Flame className="h-6 w-6 text-amber-500" />
            <span>Generated Clips Library</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Browse and download all AI-generated clips, virality scores, and vertical renders across your projects.
          </p>
        </div>

        <VideoCreationStudio />
      </div>
    </main>
  );
}
