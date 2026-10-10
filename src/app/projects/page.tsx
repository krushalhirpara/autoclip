"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Film,
  Plus,
  Trash2,
  ArrowRight,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectRecord {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  _count?: {
    videos: number;
    clips: number;
  };
}

export default function ProjectsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/projects");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;
    fetch("/api/v1/projects")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (isMounted) {
          setProjects(data.projects || []);
          setLoadingProjects(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch projects", err);
        if (isMounted) setLoadingProjects(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setCreating(true);
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => [data.project, ...prev]);
        setShowCreateModal(false);
        setNewTitle("");
      }
    } catch (err) {
      console.error("Error creating project", err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setDeletingId(projectId);
      const res = await fetch(`/api/v1/projects/${projectId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
      }
    } catch (err) {
      console.error("Error deleting project", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#FAFAFC] dark:bg-[#09090B]">
        <Loader2 className="h-8 w-8 animate-spin text-[#7C5CFC]" />
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-[#FAFAFC] dark:bg-[#09090B] px-4 py-8 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-white/10 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Projects
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Manage video clipping workspaces and viral asset collections
            </p>
          </div>

          <Button
            onClick={() => setShowCreateModal(true)}
            className="rounded-xl bg-[#7C5CFC] px-4 text-xs font-semibold text-white hover:bg-[#6D49F0]"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>

        {/* Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#18181B]">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New Project</h3>
              <form onSubmit={handleCreate} className="mt-4 space-y-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Project Name (e.g. Creator Podcast Ep 1)"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#7C5CFC] focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating || !newTitle.trim()}
                    className="rounded-xl bg-[#7C5CFC] px-4 py-2 text-xs font-semibold text-white hover:bg-[#6D49F0] disabled:opacity-50"
                  >
                    {creating ? "Creating..." : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {loadingProjects ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#7C5CFC]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-white/10 dark:bg-[#121216]">
            <FolderOpen className="h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">No projects found</h3>
            <p className="mt-1 text-xs text-gray-500 max-w-sm">
              Create your first project to upload long-form videos and auto-extract vertical clips.
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 rounded-xl bg-[#7C5CFC] text-xs font-semibold text-white hover:bg-[#6D49F0]"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              <span>Create First Project</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#7C5CFC]/40 hover:shadow-md dark:border-white/10 dark:bg-[#121216]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFC]/10 text-[#7C5CFC]">
                      <Film className="h-5 w-5" />
                    </div>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                      title="Delete Project"
                    >
                      {deletingId === project.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                    {project.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div>
                      <strong>{project._count?.videos ?? 0}</strong> Videos
                    </div>
                    <div>•</div>
                    <div>
                      <strong>{project._count?.clips ?? 0}</strong> Clips
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/dashboard`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#7C5CFC] hover:text-[#6D49F0] dark:text-[#A78BFA]"
                  >
                    <span>Open Studio</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
