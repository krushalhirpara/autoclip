"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  CreditCard,
  Zap,
  ArrowRight,
  Loader2,
  ChevronLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Receipt,
  RotateCcw,
} from "lucide-react";

interface PaymentItem {
  id: string;
  orderId: string;
  captureId?: string | null;
  status: string;
  planId: string;
  billingInterval?: string | null;
  amount: number | string;
  currency: string;
  creditsGranted: number;
  payerEmail?: string | null;
  createdAt: string;
}

interface SubscriptionInfo {
  id?: string;
  status: string;
  planId: string;
  billingInterval?: string | null;
  provider?: string;
  paypalSubscriptionId?: string | null;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
}

export default function BillingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/settings/billing");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchBillingData() {
      if (!user) return;
      try {
        setLoadingData(true);
        const res = await fetch("/api/v1/payments/history");
        if (res.ok) {
          const data = await res.json();
          setPayments(data.payments || []);
          setSubscription(data.subscription || null);
          setCredits(data.credits || 0);
        }
      } catch (err) {
        console.error("Error fetching billing data:", err);
      } finally {
        setLoadingData(false);
      }
    }

    if (user) {
      fetchBillingData();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#FAFAFC] dark:bg-[#09090B]">
        <Loader2 className="h-8 w-8 animate-spin text-[#7C5CFC]" />
      </div>
    );
  }

  const activePlanName =
    subscription?.planId && subscription.planId !== "free"
      ? subscription.planId.toUpperCase()
      : "FREE TIER";

  const isSubActive = subscription?.status === "ACTIVE";

  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-[#FAFAFC] dark:bg-[#09090B] px-4 py-10 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Back navigation & Header */}
        <div>
          <Link
            href="/settings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Settings</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
            <div className="flex items-center space-x-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_4px_14px_rgba(124,92,252,0.35)]">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Billing & Subscriptions
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your AutoClipp plans, credit allowances, and PayPal transaction history
                </p>
              </div>
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C5CFC] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#6A4BE5] transition-all"
            >
              <Zap className="h-4 w-4" />
              <span>Upgrade Plan / Refill</span>
            </Link>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Active Plan */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121216]">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Current Plan</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                {activePlanName}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  isSubActive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {isSubActive ? "Active" : "Free"}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {isSubActive
                ? `Billed via PayPal (${subscription?.billingInterval || "monthly"})`
                : "Standard free starter allowance"}
            </p>
          </div>

          {/* Credit Balance */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121216]">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Available Credits</p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#7C5CFC]">
                {credits}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Minutes</span>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              For AI moment detection, reframe & exports
            </p>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121216]">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Payment Gateway</p>
            <div className="mt-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                PayPal Business
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              USD International Payments
            </p>
          </div>

        </div>

        {/* Payment History Table */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#121216] overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-[#7C5CFC]" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Transaction History & Invoices
              </h2>
            </div>
            <span className="text-xs text-gray-400">
              {payments.length} {payments.length === 1 ? "record" : "records"}
            </span>
          </div>

          {loadingData ? (
            <div className="flex h-36 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#7C5CFC]" />
            </div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-400">
                <Receipt className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
                No payment transactions yet
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                When you upgrade to a paid plan, your PayPal orders and invoices will appear here.
              </p>
              <Link
                href="/pricing"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#7C5CFC] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#6D49F0] transition-colors"
              >
                <span>View Plans</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/75 dark:bg-white/[0.02] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/5">
                  <tr>
                    <th className="py-3.5 px-5 font-semibold">Date</th>
                    <th className="py-3.5 px-5 font-semibold">Order ID</th>
                    <th className="py-3.5 px-5 font-semibold">Plan</th>
                    <th className="py-3.5 px-5 font-semibold">Amount</th>
                    <th className="py-3.5 px-5 font-semibold">Credits Added</th>
                    <th className="py-3.5 px-5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-gray-700 dark:text-gray-300">
                  {payments.map((p) => {
                    const dateStr = new Date(p.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                    const isCompleted = p.status === "COMPLETED";

                    return (
                      <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                        <td className="py-3.5 px-5 whitespace-nowrap">{dateStr}</td>
                        <td className="py-3.5 px-5 font-mono text-[11px] text-gray-500 dark:text-gray-400">
                          {p.orderId}
                        </td>
                        <td className="py-3.5 px-5 font-semibold uppercase text-gray-900 dark:text-white">
                          {p.planId} ({p.billingInterval || "monthly"})
                        </td>
                        <td className="py-3.5 px-5 font-bold text-gray-900 dark:text-white">
                          ${Number(p.amount).toFixed(2)} {p.currency}
                        </td>
                        <td className="py-3.5 px-5 text-emerald-600 dark:text-emerald-400 font-bold">
                          +{p.creditsGranted} min
                        </td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              isCompleted
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                : p.status === "REFUNDED"
                                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : p.status === "REFUNDED" ? (
                              <RotateCcw className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            <span>{p.status}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
