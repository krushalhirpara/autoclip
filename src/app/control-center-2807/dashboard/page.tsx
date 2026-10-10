"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  DollarSign,
  TrendingUp,
  Scissors,
  CreditCard,
  RefreshCw,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatsData {
  overview: {
    totalUsers: number;
    newUsersToday: number;
    newUsers7d: number;
    newUsers30d: number;
    totalProjects: number;
    totalVideos: number;
    totalClips: number;
    totalExports: number;
    activePaidUsers: number;
  };
  payments: {
    totalPayments: number;
    completedPayments: number;
    pendingPayments: number;
    failedPayments: number;
    refundedPayments: number;
    grossVolumeUSD: number;
    refundedVolumeUSD: number;
    netRevenueUSD: number;
  };
  recentUsers: Array<{
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
  }>;
  recentTransactions: Array<{
    id: string;
    orderId: string;
    userName: string;
    userEmail: string;
    planId: string;
    amount: number;
    currency: string;
    status: string;
    provider: string;
    createdAt: string;
  }>;
  dailyTrends: Array<{
    date: string;
    users: number;
    revenue: number;
  }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/v1/admin/stats");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/control-center-2807/login");
          return;
        }
        throw new Error("Failed to load platform metrics");
      }
      const json = await res.json();
      setData(json);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load metrics");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/v1/admin/stats");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/control-center-2807/login");
            return;
          }
          throw new Error("Failed to load platform metrics");
        }
        const json = await res.json();
        if (!ignore) {
          setData(json);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError((err as Error).message || "Failed to load metrics");
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [router]);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-3" />
        <span className="text-xs">Aggregating PostgreSQL & PayPal metrics...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs flex flex-col items-start gap-3">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="h-5 w-5" />
          <span>Error loading administrative metrics</span>
        </div>
        <p className="text-slate-400">{error || "Please try refreshing the page."}</p>
        <Button onClick={fetchStats} variant="outline" size="sm" className="mt-2 text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  const { overview, payments, recentUsers, recentTransactions, dailyTrends } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Executive Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time PostgreSQL database state &bull; Verified financial records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={fetchStats}
            variant="outline"
            size="sm"
            disabled={loading}
            className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Registered Users</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{overview.totalUsers}</span>
            <span className="text-[11px] text-emerald-400 font-medium">
              +{overview.newUsersToday} today
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>7d: +{overview.newUsers7d}</span>
            <span>30d: +{overview.newUsers30d}</span>
          </div>
        </div>

        {/* Gross Volume */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Gross Payment Volume</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              ${payments.grossVolumeUSD.toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-400">USD</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{payments.completedPayments} successful orders</span>
            <span className="text-emerald-400">Verified</span>
          </div>
        </div>

        {/* Net Revenue */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Net Recognized Revenue</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              ${payments.netRevenueUSD.toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-400">USD</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Refunds: ${payments.refundedVolumeUSD.toFixed(2)}</span>
            <span>{overview.activePaidUsers} paying users</span>
          </div>
        </div>

        {/* Studio Content Stats */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total AI Clips Generated</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Scissors className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{overview.totalClips}</span>
            <span className="text-[11px] text-slate-400">clips</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{overview.totalProjects} projects</span>
            <span>{overview.totalExports} exports</span>
          </div>
        </div>
      </div>

      {/* 14-Day Activity Trends Visualizer */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white">14-Day Registration & Revenue Trend</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Daily verified user signups and gross collected payment volume
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
              <span className="text-slate-300">Signups</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              <span className="text-slate-300">Revenue ($)</span>
            </div>
          </div>
        </div>

        {/* Custom Lightweight Trend Bars */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 h-44 items-end pt-6 pb-2 border-b border-slate-800">
          {dailyTrends.map((t, idx) => {
            const maxUsers = Math.max(1, ...dailyTrends.map((d) => d.users));
            const userHeight = Math.min(100, Math.round((t.users / maxUsers) * 80));

            return (
              <div key={idx} className="flex flex-col items-center gap-2 group relative">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg pointer-events-none whitespace-nowrap">
                  <div>{t.date}</div>
                  <div>Users: {t.users}</div>
                  <div>Rev: ${t.revenue}</div>
                </div>

                <div className="w-full flex items-end justify-center gap-1 h-32">
                  <div
                    style={{ height: `${Math.max(6, userHeight)}%` }}
                    className="w-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-t-sm transition-all"
                  />
                  {t.revenue > 0 && (
                    <div
                      style={{ height: "60%" }}
                      className="w-2.5 bg-emerald-500 hover:bg-emerald-400 rounded-t-sm transition-all"
                    />
                  )}
                </div>
                <span className="text-[9px] text-slate-500 truncate w-full text-center">
                  {t.date.split(" ")[0]} {t.date.split(" ")[1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tables Row: Recent Users & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-400" />
              <span>Recent Registrations</span>
            </h3>
            <Link
              href="/control-center-2807/users"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3 pl-1">User</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 pr-1 text-right">Signed Up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-slate-500">
                      No user registrations recorded yet
                    </td>
                  </tr>
                ) : (
                  recentUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 pl-1">
                        <div className="font-medium text-slate-200">{u.name || "Anonymous"}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            u.role === "ADMIN"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 pr-1 text-right text-slate-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-400" />
              <span>Recent Verified Transactions</span>
            </h3>
            <Link
              href="/control-center-2807/payments"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3 pl-1">Order / User</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-1 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">
                      No payment transactions recorded yet
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 pl-1">
                        <div className="font-mono text-slate-300 text-[11px]">
                          {tx.orderId.slice(0, 14)}...
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                          {tx.userEmail}
                        </div>
                      </td>
                      <td className="py-2.5 font-medium text-slate-200">
                        ${tx.amount.toFixed(2)} {tx.currency}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            tx.status === "COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : tx.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                              : tx.status === "REFUNDED"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-2.5 pr-1 text-right text-slate-400 text-[11px]">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
