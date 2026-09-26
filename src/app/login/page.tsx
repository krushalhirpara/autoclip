"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get("error");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(errorMsg ? decodeURIComponent(errorMsg) : null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
          Sign in to your AutoClipp account
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-center">
          <svg className="w-4 h-4 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      <SocialAuthButtons />

      <div className="mt-8 flex items-center">
        <div className="w-full border-t border-[#E8E7F0] dark:border-[#27272A]"></div>
        <span className="px-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Or continue with email
        </span>
        <div className="w-full border-t border-[#E8E7F0] dark:border-[#27272A]"></div>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-[#111118] dark:text-[#E4E4E7]">Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="mt-1.5 w-full rounded-xl border border-[#E8E7F0] bg-white px-4 py-3 text-sm focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC] focus:outline-none dark:border-[#27272A] dark:bg-[#141416] dark:text-white transition-shadow" 
            placeholder="you@example.com" 
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#111118] dark:text-[#E4E4E7]">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="mt-1.5 w-full rounded-xl border border-[#E8E7F0] bg-white px-4 py-3 text-sm focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC] focus:outline-none dark:border-[#27272A] dark:bg-[#141416] dark:text-white transition-shadow" 
            placeholder="••••••••" 
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-[#6B6B78] dark:text-[#A1A1AA] cursor-pointer group">
            <input type="checkbox" className="mr-2 h-4 w-4 rounded border-[#E8E7F0] text-[#7C5CFC] focus:ring-[#7C5CFC] dark:border-[#27272A] dark:bg-[#141416]" /> 
            <span className="group-hover:text-[#111118] dark:group-hover:text-white transition-colors">Remember me</span>
          </label>
          <Link href="#" className="font-semibold text-[#7C5CFC] hover:text-[#6A4BE5] dark:text-[#A78BFA] transition-colors">
            Forgot password?
          </Link>
        </div>
        
        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] font-semibold text-white hover:opacity-90 shadow-[0_4px_14px_rgba(124,92,252,0.3)] transition-opacity"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
        </Button>
      </form>
      
      <p className="mt-8 text-center text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-[#111118] hover:text-[#7C5CFC] dark:text-white dark:hover:text-[#A78BFA] transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#7C5CFC]"/></div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
