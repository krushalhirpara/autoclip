"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { PRICING_PLANS, BillingInterval, PlanDefinition, getPlanPrice } from "@/core/payments/plans";
import { PayPalCheckoutModal } from "@/components/payments/PayPalCheckoutModal";
import { useAuth } from "@/context/AuthContext";

export default function PricingPage() {
  const { user } = useAuth();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  const [selectedPlan, setSelectedPlan] = useState<PlanDefinition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionsEnabled, setSubscriptionsEnabled] = useState(false);

  useEffect(() => {
    async function checkConfig() {
      try {
        const res = await fetch("/api/v1/payments/paypal/config");
        if (res.ok) {
          const data = await res.json();
          setSubscriptionsEnabled(Boolean(data.subscriptionsEnabled));
        }
      } catch {
        // ignore
      }
    }
    checkConfig();
  }, []);

  const handleOpenCheckout = (plan: PlanDefinition) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-24 pt-12 selection:bg-[#7C5CFC]/20 dark:bg-[#0A0A0C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-semibold text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Simple & Transparent Pricing in USD</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-5xl">
          Pay only for what you process
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#6B6B78] dark:text-[#A1A1AA] max-w-2xl mx-auto">
          No hidden fees. Scale your video production seamlessly with instant PayPal Business checkout.
        </p>

        {/* Billing Interval Switcher */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-[#141416]">
            <button
              onClick={() => setBillingInterval("month")}
              className={`rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                billingInterval === "month"
                  ? "bg-[#7C5CFC] text-white shadow-[0_2px_10px_rgba(124,92,252,0.3)]"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {subscriptionsEnabled ? "Monthly Subscription" : "Monthly Pass"}
            </button>
            <button
              onClick={() => setBillingInterval("year")}
              className={`relative rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                billingInterval === "year"
                  ? "bg-[#7C5CFC] text-white shadow-[0_2px_10px_rgba(124,92,252,0.3)]"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <span>{subscriptionsEnabled ? "Yearly Subscription" : "Annual Pass"}</span>
              <span className="ml-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Save 20%
              </span>
            </button>
            <button
              onClick={() => setBillingInterval("one_time")}
              className={`rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                billingInterval === "one_time"
                  ? "bg-[#7C5CFC] text-white shadow-[0_2px_10px_rgba(124,92,252,0.3)]"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              One-Time Refill
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>
              {subscriptionsEnabled
                ? "PayPal Recurring Subscriptions Active • Automatic Renewal • Cancel Anytime"
                : "Single upfront payment (No auto-debit) • Instant processing minutes • All cards & PayPal USD"}
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 text-left">
          
          {/* Starter Plan */}
          {(() => {
            const plan = PRICING_PLANS.starter;
            const price = getPlanPrice(plan.id, billingInterval);
            const displayPrice =
              billingInterval === "year"
                ? `$${Math.round(price / 12)}`
                : `$${price}`;
            const subtext =
              billingInterval === "year"
                ? `$${price} billed annually (2 months free)`
                : billingInterval === "one_time"
                ? "One-time pass (no recurring charges)"
                : "Billed monthly";

            return (
              <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#7C5CFC]" />
                  <h3 className="text-lg font-semibold text-[#111118] dark:text-white">{plan.name}</h3>
                </div>
                <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
                  {displayPrice}
                  <span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">
                    {billingInterval === "one_time" ? " /pass" : "/mo"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {subtext}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                  {plan.tagline}
                </p>
                <ul className="mt-6 space-y-3 text-xs sm:text-sm flex-1 text-[#111118] dark:text-white">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center ${
                        feature.included
                          ? ""
                          : "text-[#6B6B78] dark:text-[#71717A] opacity-60"
                      }`}
                    >
                      <CheckCircle2
                        className={`mr-3 h-4 w-4 shrink-0 ${
                          feature.included ? "text-[#059669]" : "opacity-40"
                        }`}
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleOpenCheckout(plan)}
                  variant="outline"
                  className="mt-8 w-full rounded-xl border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white font-semibold cursor-pointer"
                >
                  {user ? "Buy Starter Plan" : "Get Started Free"}
                </Button>
              </div>
            );
          })()}

          {/* Pro Plan (Most Popular) */}
          {(() => {
            const plan = PRICING_PLANS.pro;
            const price = getPlanPrice(plan.id, billingInterval);
            const displayPrice =
              billingInterval === "year"
                ? `$${Math.round(price / 12)}`
                : `$${price}`;
            const subtext =
              billingInterval === "year"
                ? `$${price} billed annually (2 months free)`
                : billingInterval === "one_time"
                ? "One-time pass (no recurring charges)"
                : "Billed monthly";

            return (
              <div className="relative flex flex-col rounded-3xl border-2 border-[#7C5CFC] bg-white p-8 shadow-xl dark:bg-[#141416]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#7C5CFC] px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Most Popular
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#7C5CFC]" />
                  <h3 className="text-lg font-semibold text-[#111118] dark:text-white">{plan.name}</h3>
                </div>
                <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
                  {displayPrice}
                  <span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">
                    {billingInterval === "one_time" ? " /pass" : "/mo"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {subtext}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                  {plan.tagline}
                </p>
                <ul className="mt-6 space-y-3 text-xs sm:text-sm flex-1 text-[#111118] dark:text-white">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center ${
                        feature.included
                          ? ""
                          : "text-[#6B6B78] dark:text-[#71717A] opacity-60"
                      }`}
                    >
                      <CheckCircle2
                        className={`mr-3 h-4 w-4 shrink-0 ${
                          feature.included ? "text-[#059669]" : "opacity-40"
                        }`}
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleOpenCheckout(plan)}
                  className="mt-8 w-full rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6A4BE5] shadow-[0_4px_14px_rgba(124,92,252,0.35)] font-bold cursor-pointer"
                >
                  Upgrade to Pro
                </Button>
              </div>
            );
          })()}

          {/* Agency Plan */}
          {(() => {
            const plan = PRICING_PLANS.agency;
            const price = getPlanPrice(plan.id, billingInterval);
            const displayPrice =
              billingInterval === "year"
                ? `$${Math.round(price / 12)}`
                : `$${price}`;
            const subtext =
              billingInterval === "year"
                ? `$${price} billed annually (2 months free)`
                : billingInterval === "one_time"
                ? "One-time pass (no recurring charges)"
                : "Billed monthly";

            return (
              <div className="flex flex-col rounded-3xl border border-[#E8E7F0] bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-[#27272A] dark:bg-[#141416]">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#7C5CFC]" />
                  <h3 className="text-lg font-semibold text-[#111118] dark:text-white">{plan.name}</h3>
                </div>
                <div className="mt-4 flex items-baseline text-4xl sm:text-5xl font-extrabold text-[#111118] dark:text-white">
                  {displayPrice}
                  <span className="ml-1 text-lg font-medium text-[#6B6B78] dark:text-[#A1A1AA]">
                    {billingInterval === "one_time" ? " /pass" : "/mo"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {subtext}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                  {plan.tagline}
                </p>
                <ul className="mt-6 space-y-3 text-xs sm:text-sm flex-1 text-[#111118] dark:text-white">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center ${
                        feature.included
                          ? ""
                          : "text-[#6B6B78] dark:text-[#71717A] opacity-60"
                      }`}
                    >
                      <CheckCircle2
                        className={`mr-3 h-4 w-4 shrink-0 ${
                          feature.included ? "text-[#059669]" : "opacity-40"
                        }`}
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleOpenCheckout(plan)}
                  variant="outline"
                  className="mt-8 w-full rounded-xl border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white font-semibold cursor-pointer"
                >
                  Buy Agency Plan
                </Button>
              </div>
            );
          })()}
        </div>

        {/* PayPal India & International Payment Info Banner */}
        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216] text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  PayPal Business Checkout (USD)
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Global checkout supporting international Visa, Mastercard, Amex, and PayPal balances in USD.
                </p>
              </div>
            </div>
            <Link
              href="/settings/billing"
              className="text-xs font-semibold text-[#7C5CFC] hover:underline shrink-0"
            >
              View My Invoices & Credits →
            </Link>
          </div>
        </div>

      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <PayPalCheckoutModal
          plan={selectedPlan}
          billingInterval={billingInterval}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}
