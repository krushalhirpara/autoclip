"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Filter,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditLogMetadata {
  actor?: string;
  ip?: string;
  reason?: string;
  targetEmail?: string;
  note?: string;
  filename?: string;
  [key: string]: unknown;
}

interface AuditLogRecord {
  id: string;
  action: string;
  fullAction: string;
  entityType: string;
  entityId: string | null;
  metadata: AuditLogMetadata | null;
  targetUser?: {
    id: string;
    name: string | null;
    email: string;
  };
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "25",
        action: actionFilter,
      });

      const res = await fetch(`/api/v1/admin/audit-logs?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/control-center-2807/login");
          return;
        }
        throw new Error("Failed to load audit logs");
      }
      const data = await res.json();
      setLogs(data.logs || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalCount(data.pagination?.total || 0);
    } catch (err) {
      console.error("Error loading audit logs:", err);
    } finally {
      setLoading(false);
    }
  }, [page, actionFilter, router]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "25",
          action: actionFilter,
        });

        const res = await fetch(`/api/v1/admin/audit-logs?${params.toString()}`);
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/control-center-2807/login");
            return;
          }
          throw new Error("Failed to load audit logs");
        }
        const data = await res.json();
        if (!ignore) {
          setLogs(data.logs || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalCount(data.pagination?.total || 0);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error loading audit logs:", err);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [page, actionFilter, router]);

  const getActionBadge = (action: string) => {
    switch (action) {
      case "LOGIN_SUCCESS":
        return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Login Success</span>;
      case "LOGIN_FAILED":
        return <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/30">Login Failed</span>;
      case "LOGOUT":
        return <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Logout</span>;
      case "SUSPEND_USER":
        return <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/30">User Suspended</span>;
      case "REACTIVATE_USER":
        return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">User Reactivated</span>;
      case "USER_NOTE":
        return <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">Note Added</span>;
      case "REPORT_EXPORTED":
        return <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">Report Exported</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">{action}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Security & Audit Logs</h2>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log of administrative operations, logins, user mutations, and exports
          </p>
        </div>
        <Button
          onClick={fetchLogs}
          variant="outline"
          size="sm"
          disabled={loading}
          className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Logs
        </Button>
      </div>

      {/* Filter */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-slate-500" />
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter audit logs by action"
            className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
          >
            <option value="">All Action Types</option>
            <option value="LOGIN_SUCCESS">Login Success</option>
            <option value="LOGIN_FAILED">Login Failed</option>
            <option value="LOGOUT">Logout</option>
            <option value="SUSPEND_USER">User Suspended</option>
            <option value="REACTIVATE_USER">User Reactivated</option>
            <option value="USER_NOTE">User Note</option>
            <option value="REPORT_EXPORTED">Report Exported</option>
          </select>
        </div>
        <div className="text-xs text-slate-400">Total {totalCount} events recorded</div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Details / Metadata</th>
                <th className="py-3 px-4 text-right">Timestamp (UTC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-sans">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-500 mx-auto mb-2" />
                    <span>Loading audit records...</span>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-sans">
                    No audit records found matching criteria
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans">{getActionBadge(log.action)}</td>
                    <td className="py-3 px-4 text-slate-300 font-sans font-medium">
                      {String(log.metadata?.actor || "System")}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{String(log.metadata?.ip || "127.0.0.1")}</td>
                    <td className="py-3 px-4 text-slate-300 font-sans">
                      {Boolean(log.metadata?.reason) && (
                        <div>
                          <span className="text-slate-500">Reason:</span> {String(log.metadata?.reason)}
                        </div>
                      )}
                      {Boolean(log.metadata?.targetEmail) && (
                        <div>
                          <span className="text-slate-500">Target:</span> {String(log.metadata?.targetEmail)}
                        </div>
                      )}
                      {Boolean(log.metadata?.note) && (
                        <div>
                          <span className="text-slate-500">Note:</span> {String(log.metadata?.note)}
                        </div>
                      )}
                      {Boolean(log.metadata?.filename) && (
                        <div>
                          <span className="text-slate-500">File:</span> {String(log.metadata?.filename)}
                        </div>
                      )}
                      {!log.metadata?.reason &&
                        !log.metadata?.targetEmail &&
                        !log.metadata?.note &&
                        !log.metadata?.filename && (
                          <span className="text-slate-500">Completed without extra parameters</span>
                        )}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-400">
                      {new Date(log.createdAt).toLocaleString()}
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
            Page {page} of {totalPages}
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
    </div>
  );
}
