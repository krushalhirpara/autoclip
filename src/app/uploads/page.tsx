"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2, UploadCloud } from "lucide-react";
import { VideoCreationStudio } from "@/components/studio/VideoCreationStudio";

export default function UploadsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/uploads");
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
            <UploadCloud className="h-6 w-6 text-[#7C5CFC]" />
            <span>Upload & AI Moment Extraction</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Submit your video file to run the AI Whisper transcription, viral moment analysis, and vertical framing pipeline.
          </p>
        </div>

        <VideoCreationStudio />
      </div>
    </main>
  );
}
