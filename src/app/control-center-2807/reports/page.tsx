"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Download,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Layers,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminReportsPage() {
  const [downloadingPayments, setDownloadingPayments] = useState(false);
  const [downloadingUsers, setDownloadingUsers] = useState(false);

  const handleDownload = async (type: "payments" | "users") => {
    try {
      if (type === "payments") setDownloadingPayments(true);
      else setDownloadingUsers(true);

      const res = await fetch(`/api/v1/admin/reports/csv?type=${type}`);
      if (!res.ok) {
        if (res.status === 401) window.location.href = "/control-center-2807/login";
        throw new Error("Failed to generate export");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `autoclipp_${type}_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to download report");
    } finally {
      if (type === "payments") setDownloadingPayments(false);
      else setDownloadingUsers(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Revenue & Executive Reports</h2>
        <p className="text-xs text-slate-400 mt-1">
          Export verified database ledgers &bull; Spreadsheet formula injection protection enabled
        </p>
      </div>

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payments Ledger Export */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Financial & Payment Ledger</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Complete historical transaction dataset including internal IDs, PayPal Order and
              Capture IDs, customer emails, plan identifiers, transaction amounts (USD), and
              payment completion statuses.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Includes all Completed, Pending, and Refunded records</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Sanitized against CSV formula injection</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => handleDownload("payments")}
            disabled={downloadingPayments}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            {downloadingPayments ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Exporting Payments CSV...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Download Payments Ledger (.CSV)</span>
              </span>
            )}
          </Button>
        </div>

        {/* Users & Activity Dataset Export */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Users & Content Directory</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Comprehensive user directory export containing registered user IDs, emails, roles,
              current active subscription tiers, credit balances, and lifetime content activity counts
              (projects, videos, and rendered clips).
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Never exposes passwords, tokens, or hashes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Formatted for Microsoft Excel & Google Sheets</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => handleDownload("users")}
            disabled={downloadingUsers}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            {downloadingUsers ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Exporting Users CSV...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Download Users Directory (.CSV)</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
