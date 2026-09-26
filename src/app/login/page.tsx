"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Scissors, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get("error");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="w-full relative z-20">
      {/* Brand & Welcome */}
      <div className="mb-8 text-center sm:text-left flex flex-col items-center sm:items-start">
        <Link href="/" className="mb-6 flex items-center space-x-2 group outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_4px_16px_rgba(124,92,252,0.4)] transition-transform group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-[#7C5CFC]">
            <Scissors className="h-5 w-5 text-white transition-transform group-hover:rotate-12" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#111118] dark:text-white">Auto<span className="text-[#7C5CFC]">Clipp</span></span>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-[#111118] dark:text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-[15px] text-gray-500 dark:text-gray-400">
          Sign in to continue creating.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/50 flex items-center">
          <svg className="w-4 h-4 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      {/* Social Providers */}
      <SocialAuthButtons />

      {/* Clean Divider */}
      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
        <span className="mx-4 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase whitespace-nowrap">
          or continue with email
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="h-[18px] w-[18px]" />
            </div>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="block w-full rounded-[10px] border border-gray-200 bg-white dark:bg-[#0A0A0C] dark:border-white/10 py-[15px] pl-10 pr-4 text-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-[#7C5CFC] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] transition-colors disabled:opacity-60" 
              placeholder="name@example.com" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="h-[18px] w-[18px]" />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="block w-full rounded-[10px] border border-gray-200 bg-white dark:bg-[#0A0A0C] dark:border-white/10 py-[15px] pl-10 pr-10 text-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-[#7C5CFC] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] transition-colors disabled:opacity-60" 
              placeholder="••••••••" 
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center group cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded-[4px] border-gray-300 text-[#7C5CFC] focus:ring-[#7C5CFC] dark:border-white/20 dark:bg-[#0A0A0C]" /> 
            <span className="ml-2.5 text-[14px] text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-[14px] font-semibold text-[#7C5CFC] hover:text-[#6540EB] transition-colors outline-none focus-visible:underline">
            Forgot password?
          </Link>
        </div>
        
        <button 
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full flex items-center justify-center h-[52px] rounded-[10px] bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(124,92,252,0.25)] transition-all hover:shadow-[0_6px_20px_rgba(124,92,252,0.4)] hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C5CFC] disabled:opacity-70 disabled:hover:transform-none disabled:hover:shadow-[0_4px_14px_rgba(124,92,252,0.25)]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Signing in...</span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      
      <p className="mt-8 text-center text-[14px] text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-[#111118] dark:text-white hover:text-[#7C5CFC] transition-colors outline-none focus-visible:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#7C5CFC]"/></div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
