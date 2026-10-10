"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Users,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/core/payments/plans";

export default function AdminPlansPage() {
  const router = useRouter();
  const [userDistribution, setUserDistribution] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const fetchDistribution = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/admin/users?limit=50");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/control-center-2807/login");
          return;
        }
        throw new Error("Failed to load users");
      }
      const data = await res.json();
      const counts: Record<string, number> = { free: 0, starter: 0, pro: 0, agency: 0 };
      for (const u of data.users || []) {
        const plan = (u.plan || "free").toLowerCase();
        counts[plan] = (counts[plan] || 0) + 1;
      }
      setUserDistribution(counts);
    } catch (err) {
      console.error("Error loading plan distribution:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/v1/admin/users?limit=50");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/control-center-2807/login");
            return;
          }
          throw new Error("Failed to load users");
        }
        const data = await res.json();
        const counts: Record<string, number> = { free: 0, starter: 0, pro: 0, agency: 0 };
        for (const u of data.users || []) {
          const plan = (u.plan || "free").toLowerCase();
          counts[plan] = (counts[plan] || 0) + 1;
        }
        if (!ignore) {
          setUserDistribution(counts);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error loading plan distribution:", err);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [router]);

  const plansList = Object.values(PRICING_PLANS);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Plans & Entitlements Catalog</h2>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative server-side pricing structure and user distribution
          </p>
        </div>
        <Button
          onClick={fetchDistribution}
          variant="outline"
          size="sm"
          disabled={loading}
          className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Stats
        </Button>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plansList.map((plan) => (
          <div
            key={plan.id}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <span className="font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                  ID: {plan.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">{plan.tagline}</p>

              {/* Pricing breakdown */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Monthly Rate</span>
                  <span className="font-bold text-white">${plan.monthlyPrice.toFixed(2)} USD / mo</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Yearly Rate</span>
                  <span className="font-bold text-emerald-400">${plan.yearlyPrice.toFixed(2)} USD / yr</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400">Video Credits</span>
                  <span className="font-bold text-indigo-400">{plan.credits} Minutes</span>
                </div>
              </div>

              {/* Features Included */}
              <div className="space-y-2 mb-6 text-xs">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Entitlement Specs
                </span>
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    {f.included ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <span className={f.included ? "text-slate-300" : "text-slate-500"}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Users on This Tier */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-indigo-400" />
                Active Users:
              </span>
              <span className="font-bold text-white">
                {loading ? "..." : userDistribution[plan.id] || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
