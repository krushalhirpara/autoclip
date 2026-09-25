import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9FC] p-6 dark:bg-[#0A0A0C]">
      <div className="w-full max-w-md rounded-[2.5rem] border border-[#E8E7F0] bg-white p-8 shadow-xl dark:border-[#27272A] dark:bg-[#141416] sm:p-12">
        <div className="flex justify-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_0_16px_rgba(124,92,252,0.35)]">
            <Scissors className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-[#111118] dark:text-white">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-[#6B6B78] dark:text-[#A1A1AA]">Sign in to your AutoClipp account</p>
        
        <form className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-[#111118] dark:text-[#E4E4E7]">Email</label>
            <input type="email" className="mt-1 w-full rounded-xl border border-[#E8E7F0] bg-[#F4F3FF] px-4 py-3 text-sm focus:border-[#7C5CFC] focus:outline-none dark:border-[#27272A] dark:bg-[#0A0A0C] dark:text-white" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-[#111118] dark:text-[#E4E4E7]">Password</label>
            <input type="password" className="mt-1 w-full rounded-xl border border-[#E8E7F0] bg-[#F4F3FF] px-4 py-3 text-sm focus:border-[#7C5CFC] focus:outline-none dark:border-[#27272A] dark:bg-[#0A0A0C] dark:text-white" placeholder="••••••••" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-[#6B6B78] dark:text-[#A1A1AA]">
              <input type="checkbox" className="mr-2 rounded" /> Remember me
            </label>
            <Link href="#" className="font-medium text-[#7C5CFC] hover:text-[#6A4BE5]">Forgot password?</Link>
          </div>
          <Button className="w-full rounded-xl bg-[#7C5CFC] py-6 text-white hover:bg-[#6A4BE5]" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
          Don't have an account? <Link href="/signup" className="font-semibold text-[#111118] hover:text-[#7C5CFC] dark:text-white">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
