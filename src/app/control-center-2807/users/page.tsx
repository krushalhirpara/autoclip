"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Ban,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  role: string;
  image: string | null;
  createdAt: string;
  plan: string;
  credits: number;
  projectsCount: number;
  videosCount: number;
  exportsCount: number;
  paymentsCount: number;
  isSuspended: boolean;
  suspensionReason: string | null;
  notes: Array<{
    id: string;
    note: string;
    addedBy: string;
    createdAt: string;
  }>;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modals & Drawers state
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [suspendingUser, setSuspendingUser] = useState<UserRecord | null>(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Note modal state
  const [noteUser, setNoteUser] = useState<UserRecord | null>(null);
  const [newNote, setNewNote] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
        search: search.trim(),
        role: roleFilter,
      });

      const res = await fetch(`/api/v1/admin/users?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/control-center-2807/login");
          return;
        }
        throw new Error("Failed to load users");
      }
      const data = await res.json();
      setUsers(data.users || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalCount(data.pagination?.total || 0);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  }, [page, roleFilter, search, router]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "15",
          search: search.trim(),
          role: roleFilter,
        });

        const res = await fetch(`/api/v1/admin/users?${params.toString()}`);
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/control-center-2807/login");
            return;
          }
          throw new Error("Failed to load users");
        }
        const data = await res.json();
        if (!ignore) {
          setUsers(data.users || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalCount(data.pagination?.total || 0);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error loading users:", err);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [page, roleFilter, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleToggleSuspend = async () => {
    if (!suspendingUser) return;
    try {
      setActionLoading(true);
      const endpoint = suspendingUser.isSuspended
        ? `/api/v1/admin/users/${suspendingUser.id}/reactivate`
        : `/api/v1/admin/users/${suspendingUser.id}/suspend`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: suspendReason || "Administrative decision" }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Action failed");
      }

      setSuspendingUser(null);
      setSuspendReason("");
      fetchUsers();
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to update user suspension status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteUser || !newNote.trim()) return;

    try {
      setActionLoading(true);
      const res = await fetch(`/api/v1/admin/users/${noteUser.id}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote.trim() }),
      });

      if (!res.ok) throw new Error("Failed to save note");

      setNoteUser(null);
      setNewNote("");
      fetchUsers();
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to save note");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">User Directory</h2>
          <p className="text-xs text-slate-400 mt-1">
            Total {totalCount} registered accounts &bull; Server-side suspension enforcement
          </p>
        </div>
        <Button
          onClick={fetchUsers}
          variant="outline"
          size="sm"
          disabled={loading}
          className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Name, Email, Mobile or User ID..."
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
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter users by role"
            className="w-full md:w-40 px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="USER">Standard Users</option>
            <option value="ADMIN">Super Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Plan & Credits</th>
                <th className="py-3 px-4">Content Stats</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-500 mx-auto mb-2" />
                    <span>Loading database records...</span>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No users found matching search criteria
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                      {u.mobileNumber !== "N/A" && (
                        <div className="text-[10px] text-slate-500 font-mono">{u.mobileNumber}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4">
                      <div className="capitalize font-medium text-slate-200">{u.plan}</div>
                      <div className="text-[11px] text-slate-400">{u.credits} mins available</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-[11px] text-slate-300">
                        {u.projectsCount} projects &bull; {u.videosCount} uploads
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {u.exportsCount} exports &bull; {u.paymentsCount} orders
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {u.isSuspended ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-fit">
                          <Ban className="h-3 w-3" />
                          Suspended
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <Button
                        onClick={() => setSelectedUser(u)}
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-[11px] text-slate-300 hover:text-white"
                      >
                        Details
                      </Button>
                      <Button
                        onClick={() => setNoteUser(u)}
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-[11px] text-indigo-400 hover:text-indigo-300"
                      >
                        Note
                      </Button>
                      {u.role !== "ADMIN" && (
                        <Button
                          onClick={() => setSuspendingUser(u)}
                          variant="ghost"
                          size="sm"
                          className={`h-7 px-2 text-[11px] ${
                            u.isSuspended
                              ? "text-emerald-400 hover:text-emerald-300"
                              : "text-rose-400 hover:text-rose-300"
                          }`}
                        >
                          {u.isSuspended ? "Reactivate" : "Suspend"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Page {page} of {totalPages} ({totalCount} users)
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

      {/* User Details Drawer / Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end backdrop-blur-xs">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-base font-bold text-white">User Intelligence Profile</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 text-slate-400 hover:text-white rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 flex-1 text-xs">
              {/* Profile Card */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white">{selectedUser.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 font-mono">
                    ID: {selectedUser.id}
                  </span>
                </div>
                <div className="text-slate-400 space-y-1">
                  <div>Email: {selectedUser.email}</div>
                  <div>Mobile: {selectedUser.mobileNumber}</div>
                  <div>Registered: {new Date(selectedUser.createdAt).toLocaleString()}</div>
                </div>
              </div>

              {/* Status & Plan Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Plan Entitlement</span>
                  <span className="font-bold text-white capitalize">{selectedUser.plan}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Credit Balance</span>
                  <span className="font-bold text-indigo-400">{selectedUser.credits} Minutes</span>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-semibold text-slate-300">Activity Metrics</h4>
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <div className="font-bold text-white text-base">{selectedUser.projectsCount}</div>
                    <div className="text-[10px] text-slate-500">Projects</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <div className="font-bold text-white text-base">{selectedUser.videosCount}</div>
                    <div className="text-[10px] text-slate-500">Videos</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <div className="font-bold text-white text-base">{selectedUser.exportsCount}</div>
                    <div className="text-[10px] text-slate-500">Exports</div>
                  </div>
                </div>
              </div>

              {/* Internal Notes History */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-300">Admin Notes</h4>
                  <Button
                    onClick={() => {
                      setNoteUser(selectedUser);
                      setSelectedUser(null);
                    }}
                    size="sm"
                    className="h-6 px-2 text-[10px] bg-indigo-600 hover:bg-indigo-500"
                  >
                    + Add Note
                  </Button>
                </div>
                {selectedUser.notes.length === 0 ? (
                  <p className="text-slate-500 italic text-[11px]">No internal notes recorded</p>
                ) : (
                  <div className="space-y-2">
                    {selectedUser.notes.map((n) => (
                      <div key={n.id} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/60">
                        <p className="text-slate-200">{n.note}</p>
                        <div className="mt-1 text-[10px] text-slate-500 flex justify-between">
                          <span>By {n.addedBy}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suspend / Reactivate Confirmation Modal */}
      {suspendingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  suspendingUser.isSuspended ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {suspendingUser.isSuspended ? "Reactivate User Account" : "Suspend User Account"}
                </h3>
                <p className="text-xs text-slate-400">{suspendingUser.email}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {suspendingUser.isSuspended
                ? "Reactivating this account will restore the user's access to studio uploads, clips, and APIs immediately."
                : "Suspending this user will instantly terminate their active sessions and prevent access to all protected features."}
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Administrative Reason
              </label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Reason for this action (logged in audit logs)..."
                rows={3}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                onClick={() => setSuspendingUser(null)}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleToggleSuspend}
                disabled={actionLoading}
                size="sm"
                className={`text-xs ${
                  suspendingUser.isSuspended
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                {actionLoading ? "Processing..." : suspendingUser.isSuspended ? "Confirm Reactivation" : "Confirm Suspension"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Internal Note Modal */}
      {noteUser && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add Admin Note</h3>
              <button onClick={() => setNoteUser(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Target User: {noteUser.email}</p>

            <form onSubmit={handleAddNote} className="space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter internal note here (only visible to Super Admins)..."
                rows={4}
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />

              <div className="flex items-center justify-end gap-3">
                <Button onClick={() => setNoteUser(null)} variant="ghost" size="sm" className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" disabled={actionLoading} size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
                  {actionLoading ? "Saving..." : "Save Note"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
