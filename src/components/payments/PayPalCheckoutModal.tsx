"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlanDefinition, BillingInterval, formatUSD, getPlanPrice } from "@/core/payments/plans";
import { PayPalButton } from "./PayPalButton";
import { useAuth } from "@/context/AuthContext";
import {
  X,
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  ShieldCheck,
  ArrowRight,
  LogIn,
  AlertCircle,
} from "lucide-react";

interface PayPalCheckoutModalProps {
  plan: PlanDefinition;
  billingInterval: BillingInterval;
  isOpen: boolean;
  onClose: () => void;
}

export const PayPalCheckoutModal: React.FC<PayPalCheckoutModalProps> = ({
  plan,
  billingInterval,
  isOpen,
  onClose,
}) => {
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const [successData, setSuccessData] = useState<{
    orderId: string;
    captureId?: string;
    planId: string;
    creditsAdded: number;
    newBalance: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const price = getPlanPrice(plan.id, billingInterval);
  const intervalLabel =
    billingInterval === "year"
      ? "/year"
      : billingInterval === "one_time"
      ? "one-time"
      : "/month";

  const handleSuccess = async (data: {
    orderId: string;
    captureId?: string;
    planId: string;
    creditsAdded: number;
    newBalance: number;
  }) => {
    setSuccessData(data);
    setErrorMessage(null);
    try {
      await refreshProfile();
    } catch {
      // ignore
    }
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
  };

  const getPlanIcon = () => {
    switch (plan.id) {
      case "pro":
        return <Sparkles className="h-6 w-6 text-[#7C5CFC]" />;
      case "agency":
        return <Building2 className="h-6 w-6 text-[#7C5CFC]" />;
      default:
        return <Zap className="h-6 w-6 text-[#7C5CFC]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-[#141416] dark:border dark:border-[#27272A] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {successData ? (
          /* Success Screen */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                Payment Completed
              </span>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                Welcome to {plan.name}!
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your payment was verified and processed via PayPal.
              </p>
            </div>

            {/* Credit Grant Summary */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20 text-left">
              <div className="flex justify-between items-center text-sm py-1 border-b border-emerald-200/50 dark:border-emerald-800/30">
                <span className="text-emerald-900 dark:text-emerald-200 font-medium">Credits Added:</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">+{successData.creditsAdded} Minutes</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 pt-2">
                <span className="text-emerald-900 dark:text-emerald-200 font-medium">New Available Balance:</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-extrabold">{successData.newBalance} Minutes</span>
              </div>
              {successData.captureId && (
                <div className="mt-2 pt-2 border-t border-emerald-200/40 dark:border-emerald-800/20 text-[11px] text-emerald-800/80 dark:text-emerald-400/80 truncate">
                  PayPal Capture ID: {successData.captureId}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  router.push("/dashboard");
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C5CFC] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#6A4BE5] transition-all"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/settings/billing"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                View Invoices
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form Screen */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C5CFC]/10 text-[#7C5CFC]">
                {getPlanIcon()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Checkout: {plan.name} Plan
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {billingInterval === "year"
                    ? "Annual billing (Save 2 months)"
                    : billingInterval === "one_time"
                    ? "One-time credit refill pass"
                    : "Monthly billing pass"}
                </p>
              </div>
            </div>

            {/* Price Card */}
            <div className="flex items-baseline justify-between rounded-2xl border border-[#7C5CFC]/20 bg-[#F4F3FF]/60 p-4 dark:border-[#27272A] dark:bg-[#1B1B1F]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7C5CFC]">
                  Total Due Today
                </span>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {formatUSD(price)}
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
                    {intervalLabel} (USD)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  +{plan.credits} Minutes
                </span>
                <p className="text-[11px] text-gray-400 mt-1">Instant Activation</p>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Features preview */}
            <div className="space-y-2 border-t border-b border-gray-100 py-4 dark:border-white/5">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Included in this tier:</p>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                {plan.features.filter(f => f.included).slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth check or PayPal button */}
            {!user ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-center dark:border-amber-900/30 dark:bg-amber-950/20">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                  Please sign in or create an account before completing your payment.
                </p>
                <Link
                  href={`/login?redirect=/pricing`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C5CFC] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#6A4BE5] shadow-sm transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In to Continue</span>
                </Link>
              </div>
            ) : (
              <div>
                <PayPalButton
                  planId={plan.id}
                  planName={plan.name}
                  amount={price}
                  billingInterval={billingInterval}
                  onSuccess={handleSuccess}
                  onError={handleError}
                  onCancel={() => setErrorMessage("PayPal checkout was cancelled.")}
                />
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>International payments processed securely in USD via PayPal Business</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
