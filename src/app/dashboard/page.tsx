import React from "react";
import Link from "next/link";
export default function Dashboard() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F8F9FC] dark:bg-[#0A0A0C]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#111118] dark:text-white">Dashboard</h1>
        <p className="mt-4 text-[#6B6B78]">Welcome to your AutoClipp workspace.</p>
        <Link href="/" className="mt-8 inline-block text-[#7C5CFC]">Back to Home</Link>
      </div>
    </div>
  );
}
