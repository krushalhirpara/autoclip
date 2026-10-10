"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Server,
  Database,
  HardDrive,
  CreditCard,
  Key,
  Copy,
  Check,
  AlertCircle,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [copied, setCopied] = useState(false);
  const command = `node scripts/generate-admin-hash.js "YourStrongPasswordHere"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">System & Security Settings</h2>
        <p className="text-xs text-slate-400 mt-1">
          Server-side environment configuration status and administrative credentials setup
        </p>
      </div>

      {/* System Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Infrastructure */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Infrastructure Stack</h3>
              <p className="text-xs text-slate-400">Active server components</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Database className="h-4 w-4 text-emerald-400" />
                PostgreSQL Database
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-mono">
                Connected (Neon DB)
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-indigo-400" />
                Media Storage Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 font-mono">
                Local / S3 Provider
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-purple-400" />
                Payment Gateway
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 font-mono">
                PayPal (Sandbox Mode)
              </span>
            </div>
          </div>
        </div>

        {/* Security & Access Policies */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Security & Guardrails</h3>
              <p className="text-xs text-slate-400">Active authorization policies</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Admin Session Cookie</span>
                <span className="text-[10px] text-emerald-400 font-mono">HttpOnly &bull; SameSite=Strict</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Isolated from standard user cookies with 12-hour expiration window.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Brute Force Protection</span>
                <span className="text-[10px] text-emerald-400 font-mono">5 Attempts / 15m Lockout</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Automatic lockout after multiple consecutive failed administrative authentication attempts.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Search Engine Shield</span>
                <span className="text-[10px] text-emerald-400 font-mono">noindex, nofollow, robots.txt</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Admin control center is completely hidden from public indexers and sitemaps.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Hash Generator Instructions */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Generate Admin Password Hash</h3>
            <p className="text-xs text-slate-400">
              Use the built-in CLI utility to generate a secure bcrypt hash for production deployment
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <Terminal className="h-4 w-4 text-indigo-400" />
              Terminal Command
            </span>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="h-7 px-2.5 text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
              {copied ? "Copied!" : "Copy Command"}
            </Button>
          </div>

          <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
            {command}
          </pre>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Run this command locally in your terminal. Copy the generated <code className="text-indigo-400">ADMIN_PASSWORD_HASH</code> into your <code className="text-slate-300">.env</code> file or Vercel Environment Variables.
          </p>
        </div>
      </div>
    </div>
  );
}
