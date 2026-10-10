"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Package,
  FileSpreadsheet,
  ShieldAlert,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "Overview", href: "/control-center-2807/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/control-center-2807/users", icon: Users },
  { name: "Payments & Orders", href: "/control-center-2807/payments", icon: CreditCard },
  { name: "Plans & Entitlements", href: "/control-center-2807/plans", icon: Package },
  { name: "Revenue & Reports", href: "/control-center-2807/reports", icon: FileSpreadsheet },
  { name: "Audit Logs", href: "/control-center-2807/audit-logs", icon: ShieldAlert },
  { name: "System Settings", href: "/control-center-2807/settings", icon: Settings },
];

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // If on login page, render children without sidebar shell
  if (pathname === "/control-center-2807/login" || pathname === "/control-center-2807") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await fetch("/api/v1/admin/auth/logout", { credentials: "include", method: "POST" });
      router.push("/control-center-2807/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Warning Banner for Super Admin */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-300 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
          <span>AUTOCLIPP SUPER ADMIN CONTROL CENTER &bull; ELEVATED PRIVILEGES ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PostgreSQL Live
          </span>
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
            <Link
              href="/control-center-2807/dashboard"
              className="flex items-center gap-2.5 font-bold text-lg text-white"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="tracking-tight text-sm font-semibold">AutoClipp CEO</span>
                <span className="text-[10px] text-slate-400 font-mono">Control Center</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-xs"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer User & Logout */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/50 space-y-2">
            <div className="px-3 py-2 bg-slate-800/40 rounded-lg border border-slate-800/80 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-300">CEO / Super Admin</span>
                <span className="text-[10px] text-emerald-400 font-mono">Verified Session</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>{isLoggingOut ? "Ending Session..." : "Secure Logout"}</span>
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
          {/* Top Header */}
          <header className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-base font-semibold text-white tracking-tight capitalize">
                {navItems.find((n) => n.href === pathname)?.name || "Control Center"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-md border border-slate-800 hover:bg-slate-800 transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                <span>Live App</span>
                <span className="text-[10px] text-indigo-400">&nearr;</span>
              </Link>
            </div>
          </header>

          {/* Page View Body */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
