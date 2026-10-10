"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentRecord {
  id: string;
  orderId: string;
  captureId: string | null;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED" | "CANCELLED";
  planId: string;
  billingInterval: string;
  amount: number;
  currency: string;
  creditsGranted: number;
  provider: string;
  payerName: string;
  payerEmail: string;
  userId: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [summary, setSummary] = useState({
    completed: 0,
    pending: 0,
    failed: 0,
    refunded: 0,
    cancelled: 0,
  });

  const [selectedTx, setSelectedTx] = useState<PaymentRecord | null>(null);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
        search: search.trim(),
        status: statusFilter,
        provider: providerFilter,
      });

      const res = await fetch(`/api/v1/admin/payments?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/control-center-2807/login");
          return;
        }
        throw new Error("Failed to load transactions");
      }
      const data = await res.json();
      setPayments(data.payments || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalCount(data.pagination?.total || 0);
      if (data.summary) setSummary(data.summary);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, providerFilter, search, router]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "15",
          search: search.trim(),
          status: statusFilter,
          provider: providerFilter,
        });

        const res = await fetch(`/api/v1/admin/payments?${params.toString()}`);
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/control-center-2807/login");
            return;
          }
          throw new Error("Failed to load transactions");
        }
        const data = await res.json();
        if (!ignore) {
          setPayments(data.payments || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalCount(data.pagination?.total || 0);
          if (data.summary) setSummary(data.summary);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error loading payments:", err);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [page, statusFilter, providerFilter, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPayments();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Payments & Transactions</h2>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative provider transaction records &bull; Verified orders & captures
          </p>
        </div>
        <Button
          onClick={fetchPayments}
          variant="outline"
          size="sm"
          disabled={loading}
          className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Ledger
        </Button>
      </div>

      {/* Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 text-center">
          <div className="text-[11px] text-slate-400">Completed</div>
          <div className="text-lg font-bold text-emerald-400 mt-0.5">{summary.completed}</div>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 text-center">
          <div className="text-[11px] text-slate-400">Pending</div>
          <div className="text-lg font-bold text-amber-400 mt-0.5">{summary.pending}</div>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 text-center">
          <div className="text-[11px] text-slate-400">Failed</div>
          <div className="text-lg font-bold text-rose-400 mt-0.5">{summary.failed}</div>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 text-center">
          <div className="text-[11px] text-slate-400">Refunded</div>
          <div className="text-lg font-bold text-purple-400 mt-0.5">{summary.refunded}</div>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
          <div className="text-[11px] text-slate-400">Cancelled</div>
          <div className="text-lg font-bold text-slate-400 mt-0.5">{summary.cancelled}</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID, Capture ID, Email, Payer..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter transactions by status"
            className="w-full md:w-36 px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-4">Order / Capture ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Plan & Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date (UTC)</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-500 mx-auto mb-2" />
                    <span>Loading payment ledger...</span>
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No transactions found matching criteria
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-200 font-medium">{p.orderId}</div>
                      {p.captureId && (
                        <div className="text-[10px] text-slate-500 font-mono">Cap: {p.captureId}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{p.payerName}</div>
                      <div className="text-[11px] text-slate-400">{p.payerEmail}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="capitalize font-medium text-slate-200">{p.planId}</div>
                      <div className="text-[10px] text-slate-500">{p.billingInterval}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-100">
                      ${p.amount.toFixed(2)} {p.currency}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">
                        {p.provider}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          p.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : p.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : p.status === "REFUNDED"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        onClick={() => setSelectedTx(p)}
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-[11px] text-indigo-400 hover:text-indigo-300"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Page {page} of {totalPages} ({totalCount} transactions)
          </span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs bg-slate-950 border-slate-800"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Previous
            </Button>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs bg-slate-950 border-slate-800"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <span>Transaction Inspector</span>
              </h3>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Status</span>
                  <span className="font-bold text-emerald-400">{selectedTx.status}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Amount</span>
                  <span className="font-bold text-white">
                    ${selectedTx.amount.toFixed(2)} {selectedTx.currency}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div><span className="text-slate-500">Record ID:</span> <span className="text-slate-300">{selectedTx.id}</span></div>
                <div><span className="text-slate-500">PayPal Order ID:</span> <span className="text-slate-300">{selectedTx.orderId}</span></div>
                <div><span className="text-slate-500">PayPal Capture ID:</span> <span className="text-slate-300">{selectedTx.captureId || "N/A"}</span></div>
                <div><span className="text-slate-500">Payer Email:</span> <span className="text-slate-300">{selectedTx.payerEmail}</span></div>
                <div><span className="text-slate-500">Payer Name:</span> <span className="text-slate-300">{selectedTx.payerName}</span></div>
                <div><span className="text-slate-500">Credits Granted:</span> <span className="text-slate-300">{selectedTx.creditsGranted} Minutes</span></div>
                <div><span className="text-slate-500">Created At:</span> <span className="text-slate-300">{selectedTx.createdAt}</span></div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setSelectedTx(null)} size="sm" className="bg-slate-800 hover:bg-slate-700 text-xs">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
