"use client";

import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#FAFAFC] dark:bg-[#09090B] px-4 py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="w-full max-w-[440px]">
        {children}
      </div>
    </main>
  );
}
