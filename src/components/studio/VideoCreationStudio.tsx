"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Scissors,
  UploadCloud,
  Film,
  Sparkles,
  Play,
  Pause,
  Clock,
  Flame,
  AlertCircle,
  Loader2,
  Download,
  Plus,
  Zap,
  Crop,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

interface ClipScore {
  overallScore: number;
  hookStrength: number;
  engagementPotential: number;
  clarity: number;
  emotionalImpact: number;
  storyCompleteness: number;
  reasoning?: string;
}

interface CaptionWord {
  word: string;
  start: number;
  end: number;
  score?: number;
}

interface CaptionChunk {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  wordsJson?: CaptionWord[];
}

interface RenderJob {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  progress: number;
  outputUrl?: string;
  error?: string;
}

interface Clip {
  id: string;
  title: string;
  hook: string;
  description?: string;
  startTime: number;
  endTime: number;
  duration: number;
  status: string;
  renderStatus: "NOT_STARTED" | "PROCESSING" | "COMPLETED" | "FAILED";
  score?: ClipScore;
  captions?: CaptionChunk[];
  renderJobs?: RenderJob[];
}

interface VideoRecord {
  id: string;
  title: string;
  status: "UPLOADING" | "PROCESSING" | "READY" | "FAILED";
  storageUrl: string;
  duration?: number;
  clips?: Clip[];
  processingJobs?: Array<{ id: string; status: string; progress: number; error?: string }>;
}

interface ProjectRecord {
  id: string;
  title: string;
  description?: string;
  _count?: { videos: number; clips: number };
  videos?: VideoRecord[];
}

export function VideoCreationStudio({ initialProjectId }: { initialProjectId?: string }) {
  const { user } = useAuth();

  // State
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId || "");
  const [creatingProject, setCreatingProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // Video & Upload State
  const [file, setFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState<VideoRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Selected Clip & Player State
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [renderingClipId, setRenderingClipId] = useState<string | null>(null);
  const [renderStatusMsg, setRenderStatusMsg] = useState<string | null>(null);

  // Editing Clip State
  const [editingTitle, setEditingTitle] = useState("");
  const [editingHook, setEditingHook] = useState("");
  const [savingClip, setSavingClip] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  // 1. Fetch Video Details
  const fetchVideoDetails = useCallback(async (videoId: string) => {
    try {
      const res = await fetch(`/api/v1/videos/${videoId}`);
      if (!res.ok) return;
      const data = await res.json();
      const video = data.video;
      setCurrentVideo(video);

      if (video.clips && video.clips.length > 0) {
        setSelectedClip((prev) => {
          if (!prev || !video.clips.find((c: Clip) => c.id === prev.id)) {
            setEditingTitle(video.clips[0].title);
            setEditingHook(video.clips[0].hook);
            return video.clips[0];
          }
          return prev;
        });
      }
    } catch (err) {
      console.error("Failed to fetch video details", err);
    }
  }, []);

  // Fetch User Projects
  useEffect(() => {
    if (!user) return;
    let isMounted = true;
    fetch("/api/v1/projects")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (isMounted) {
          setProjects(data.projects || []);
          if (data.projects && data.projects.length > 0) {
            setSelectedProjectId((prev) => prev || data.projects[0].id);
          }
        }
      })
      .catch((err) => console.error("Failed to load projects", err));

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Fetch Project Details
  useEffect(() => {
    if (!selectedProjectId) return;
    let isMounted = true;
    fetch(`/api/v1/projects/${selectedProjectId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!isMounted) return;
        if (data.project && data.project.videos && data.project.videos.length > 0) {
          const recentVideo = data.project.videos[0];
          fetchVideoDetails(recentVideo.id);
        } else {
          setCurrentVideo(null);
          setSelectedClip(null);
        }
      })
      .catch((err) => console.error("Failed to load project details", err));

    return () => {
      isMounted = false;
    };
  }, [selectedProjectId, fetchVideoDetails]);

  useEffect(() => {
    if (!currentVideo || currentVideo.status !== "PROCESSING") return;

    const videoId = currentVideo.id;
    const interval = setInterval(() => {
      fetchVideoDetails(videoId);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentVideo, fetchVideoDetails]);

  // 4. Create New Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    try {
      setCreatingProject(true);
      setError(null);
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newProjectTitle.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create project");
      }

      const data = await res.json();
      setProjects((prev) => [data.project, ...prev]);
      setSelectedProjectId(data.project.id);
      setShowNewProjectModal(false);
      setNewProjectTitle("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Project creation failed");
    } finally {
      setCreatingProject(false);
    }
  };

  // 5. Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      // Validate file size (max 500MB)
      if (selected.size > 500 * 1024 * 1024) {
        setError("File size exceeds 500MB limit. Please upload a shorter video.");
        return;
      }
      setFile(selected);
      setVideoTitle(selected.name.replace(/\.[^/.]+$/, ""));
      setError(null);
    }
  };

  // 6. Handle Video Upload & Processing Dispatch
  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a video file to upload");
      return;
    }

    let activeProjId = selectedProjectId;
    // Auto-create a default project if none exists
    if (!activeProjId) {
      try {
        const createRes = await fetch("/api/v1/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "My First AutoClipp Project" }),
        });
        const projData = await createRes.json();
        if (projData.project) {
          activeProjId = projData.project.id;
          setSelectedProjectId(activeProjId);
          setProjects((prev) => [projData.project, ...prev]);
        }
      } catch {
        setError("Failed to initialize project");
        return;
      }
    }

    try {
      setUploading(true);
      setError(null);
      setStatusMessage("Uploading video to storage...");
      setUploadProgress(20);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", activeProjId);
      formData.append("title", videoTitle.trim() || file.name);

      // Simulate smooth progress indicator
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 15 : prev));
      }, 400);

      const res = await fetch("/api/v1/videos", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressTimer);
      setUploadProgress(100);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setStatusMessage("Upload complete! AI Analysis pipeline started.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Fetch newly created video
      if (data.video && data.video.id) {
        fetchVideoDetails(data.video.id);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Video upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  // 7. Save Edited Clip Metadata
  const handleSaveClip = async () => {
    if (!selectedClip) return;
    try {
      setSavingClip(true);
      const res = await fetch(`/api/v1/clips/${selectedClip.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingTitle,
          hook: editingHook,
        }),
      });

      if (!res.ok) throw new Error("Failed to update clip");

      const data = await res.json();
      setSelectedClip(data.clip);
      if (currentVideo && currentVideo.clips) {
        setCurrentVideo({
          ...currentVideo,
          clips: currentVideo.clips.map((c) => (c.id === data.clip.id ? { ...c, ...data.clip } : c)),
        });
      }
    } catch (err) {
      console.error("Error saving clip", err);
    } finally {
      setSavingClip(false);
    }
  };

  // 8. Trigger Clip 9:16 Render
  const handleTriggerRender = async (clipId: string) => {
    try {
      setRenderingClipId(clipId);
      setRenderStatusMsg("Queuing 9:16 vertical render job...");

      const res = await fetch(`/api/v1/clips/${clipId}/render`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to trigger rendering");
      }

      setRenderStatusMsg("Rendering started! FFmpeg is reframing & encoding 1080x1920 MP4.");
      if (currentVideo) {
        fetchVideoDetails(currentVideo.id);
      }
    } catch (err: unknown) {
      setRenderStatusMsg(err instanceof Error ? err.message : "Render request failed");
    } finally {
      setTimeout(() => {
        setRenderingClipId(null);
        setRenderStatusMsg(null);
      }, 4000);
    }
  };

  // Helper for Virality Score Color
  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: "High Viral Potential", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" };
    if (score >= 75) return { label: "Strong Engagement", color: "bg-[#7C5CFC]/15 text-[#7C5CFC] dark:text-[#A78BFA] border-[#7C5CFC]/30" };
    return { label: "Good Retention", color: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30" };
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Controls Bar: Project Switcher & New Project */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#121216]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] text-white shadow-sm">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <label htmlFor="project-select" className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Active Project
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <select
                id="project-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-semibold text-gray-900 focus:border-[#7C5CFC] focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="dark:bg-[#18181B] dark:text-white">
                    {p.title}
                  </option>
                ))}
                {projects.length === 0 && <option value="">No projects yet</option>}
              </select>
              <button
                onClick={() => setShowNewProjectModal(true)}
                className="inline-flex items-center gap-1 rounded-lg border border-dashed border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:border-[#7C5CFC] hover:text-[#7C5CFC] dark:border-white/20 dark:text-gray-300"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Project</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Pipeline Engine: <strong>Active</strong></span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-[#7C5CFC]" />
            <span>5 Credits / Analysis</span>
          </div>
        </div>
      </div>

      {/* Modal: Create New Project */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#18181B]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New Project</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Organize your long-form videos and generated short clips.
            </p>
            <form onSubmit={handleCreateProject} className="mt-4 space-y-4">
              <input
                type="text"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="e.g. YouTube Podcast Season 1"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#7C5CFC] focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingProject || !newProjectTitle.trim()}
                  className="rounded-xl bg-[#7C5CFC] px-4 py-2 text-xs font-semibold text-white hover:bg-[#6D49F0] disabled:opacity-50"
                >
                  {creatingProject ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Studio Area: 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Video Overview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upload Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-[#7C5CFC]" />
                <span>Upload Long-form Video</span>
              </h2>
              <Badge variant="outline" className="text-[10px] uppercase font-bold text-[#7C5CFC] border-[#7C5CFC]/30">
                MP4 • MOV • WEBM
              </Badge>
            </div>

            <form onSubmit={handleUploadVideo} className="space-y-4">
              {/* Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
                  file
                    ? "border-[#7C5CFC] bg-[#7C5CFC]/5"
                    : "border-gray-300 hover:border-[#7C5CFC] hover:bg-gray-50/80 dark:border-white/15 dark:hover:bg-white/[0.02]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C5CFC]/10 text-[#7C5CFC] mb-3">
                  <Scissors className="h-6 w-6" />
                </div>

                {file ? (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Click to choose video or drag & drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Podcasts, interviews, webinars & YouTube videos up to 500MB
                    </p>
                  </div>
                )}
              </div>

              {/* Title input */}
              {file && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Enter video title"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-[#7C5CFC] focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  />
                </div>
              )}

              {/* Upload Progress Bar */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <span>Uploading Video...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Status or Error Alerts */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/30">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {statusMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-purple-50 p-3 text-xs text-[#7C5CFC] dark:bg-purple-950/30 dark:text-[#A78BFA] border border-purple-200 dark:border-purple-900/30">
                  <Sparkles className="h-4 w-4 shrink-0 animate-spin" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={!file || uploading}
                className="w-full rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] py-5 text-sm font-bold text-white shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Video Pipeline...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Extract Viral Clips (5 Credits)
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Video Processing State Tracker */}
          {currentVideo && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216]">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Active Video
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[220px]">
                    {currentVideo.title}
                  </h3>
                </div>

                <Badge
                  className={
                    currentVideo.status === "READY"
                      ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
                      : currentVideo.status === "PROCESSING"
                      ? "bg-purple-500/15 text-[#7C5CFC] border-purple-500/30 animate-pulse"
                      : "bg-red-500/15 text-red-600 border-red-500/30"
                  }
                >
                  {currentVideo.status}
                </Badge>
              </div>

              {/* Processing Pipeline Steps */}
              {currentVideo.status === "PROCESSING" && (
                <div className="space-y-3 py-2">
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Loader2 className="h-4 w-4 animate-spin text-[#7C5CFC]" />
                    <span>Whisper Audio Transcription & Diarization</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Sparkles className="h-4 w-4 text-[#7C5CFC] animate-pulse" />
                    <span>Algorithmic Viral Hook Detection & Scoring</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Crop className="h-4 w-4 text-[#7C5CFC]" />
                    <span>Auto 9:16 Vertical Cropping & Captions</span>
                  </div>
                </div>
              )}

              {/* Generated Clips Count */}
              {currentVideo.status === "READY" && currentVideo.clips && (
                <div className="flex items-center justify-between rounded-xl bg-[#7C5CFC]/5 p-3 text-xs">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Generated Clips
                  </span>
                  <span className="font-bold text-[#7C5CFC] dark:text-[#A78BFA]">
                    {currentVideo.clips.length} Viral Moments
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Clips Grid & Interactive Vertical Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {currentVideo && currentVideo.clips && currentVideo.clips.length > 0 ? (
            <div className="space-y-6">
              {/* Clips Selection Carousel/List */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216]">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-amber-500" />
                    <span>Detected Viral Moments</span>
                  </span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                    Select a clip to preview & edit
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {currentVideo.clips.map((clip) => {
                    const isSelected = selectedClip?.id === clip.id;
                    const score = clip.score?.overallScore ?? 85;
                    const badge = getScoreBadge(score);

                    return (
                      <div
                        key={clip.id}
                        onClick={() => {
                          setSelectedClip(clip);
                          setEditingTitle(clip.title);
                          setEditingHook(clip.hook);
                          if (videoPlayerRef.current) {
                            videoPlayerRef.current.currentTime = clip.startTime;
                          }
                        }}
                        className={`group relative flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-[#7C5CFC] bg-[#7C5CFC]/5 shadow-md dark:bg-[#7C5CFC]/10"
                            : "border-gray-200 bg-gray-50/50 hover:border-gray-300 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant="outline" className={`text-[10px] font-black ${badge.color}`}>
                            Score {score}/100
                          </Badge>
                          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            {Math.round(clip.duration)}s
                          </span>
                        </div>

                        <div className="mt-3">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                            {clip.title}
                          </h4>
                          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 italic">
                            &ldquo;{clip.hook}&rdquo;
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive 9:16 Vertical Preview & Editor */}
              {selectedClip && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121216]">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 9:16 Vertical Frame Container */}
                    <div className="w-full md:w-[260px] shrink-0">
                      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-2xl border border-gray-800">
                        {currentVideo.storageUrl ? (
                          <video
                            ref={videoPlayerRef}
                            src={currentVideo.storageUrl}
                            className="h-full w-full object-cover"
                            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            muted={isMuted}
                            playsInline
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-900 text-gray-500">
                            <Film className="h-10 w-10 text-gray-700" />
                          </div>
                        )}

                        {/* Animated Caption Overlay in Modern Pop Style */}
                        <div className="pointer-events-none absolute inset-x-3 bottom-14 flex flex-col items-center text-center">
                          <div className="rounded-lg bg-black/70 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                            <span className="text-sm font-black uppercase tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              {selectedClip.hook ? (
                                selectedClip.hook.split(" ").map((w, idx) => (
                                  <span
                                    key={idx}
                                    className={idx % 3 === 1 ? "text-[#FACC15] mx-1" : "mx-1"}
                                  >
                                    {w}
                                  </span>
                                ))
                              ) : (
                                "VIRAL MOMENT"
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Video Controls Overlay */}
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent p-3 text-white">
                          <button
                            onClick={() => {
                              if (videoPlayerRef.current) {
                                if (isPlaying) {
                                  videoPlayerRef.current.pause();
                                } else {
                                  videoPlayerRef.current.play();
                                }
                              }
                            }}
                            className="rounded-full bg-white/20 p-1.5 hover:bg-white/30"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                          </button>

                          <span className="text-[10px] font-mono text-gray-300">
                            {currentTime.toFixed(1)}s / {selectedClip.duration.toFixed(0)}s
                          </span>

                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="rounded-full bg-white/20 p-1.5 hover:bg-white/30"
                          >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Clip Metadata & Rendering Tools */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Clip Editor & Hook Optimization
                        </span>
                        <div className="mt-2 space-y-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                              Headline / Title
                            </label>
                            <input
                              type="text"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 focus:border-[#7C5CFC] focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                              Opening Hook Script
                            </label>
                            <textarea
                              rows={3}
                              value={editingHook}
                              onChange={(e) => setEditingHook(e.target.value)}
                              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 focus:border-[#7C5CFC] focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                            />
                          </div>

                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleSaveClip}
                              disabled={savingClip}
                              className="text-xs rounded-lg"
                            >
                              {savingClip ? "Saving..." : "Save Changes"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Multi-factor Virality Matrix */}
                      {selectedClip.score && (
                        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-white/5 dark:bg-white/[0.02] space-y-2">
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            AI Virality Breakdown
                          </h5>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Hook Strength:</span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {selectedClip.score.hookStrength}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Clarity:</span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {selectedClip.score.clarity}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Engagement:</span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {selectedClip.score.engagementPotential}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Emotional Punch:</span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {selectedClip.score.emotionalImpact}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Render & Export Actions */}
                      <div className="pt-2 space-y-2">
                        {renderStatusMsg && (
                          <div className="flex items-center gap-2 rounded-xl bg-purple-50 p-2.5 text-xs text-[#7C5CFC] dark:bg-purple-950/30 dark:text-[#A78BFA]">
                            <Sparkles className="h-3.5 w-3.5 animate-spin" />
                            <span>{renderStatusMsg}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button
                            onClick={() => handleTriggerRender(selectedClip.id)}
                            disabled={renderingClipId === selectedClip.id}
                            className="flex-1 rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6D49F0] text-xs font-semibold py-4"
                          >
                            <Crop className="mr-2 h-4 w-4" />
                            Render Vertical 9:16 MP4
                          </Button>

                          {selectedClip.renderJobs && selectedClip.renderJobs[0]?.outputUrl && (
                            <a
                              href={selectedClip.renderJobs[0].outputUrl}
                              download={`clip-${selectedClip.id}.mp4`}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Download MP4</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty Studio Placeholder */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm dark:border-white/10 dark:bg-[#121216]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C5CFC]/10 text-[#7C5CFC] mb-4">
                <Scissors className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                No Video Loaded in this Project
              </h3>
              <p className="mt-1 max-w-sm text-xs text-gray-500 dark:text-gray-400">
                Upload your first podcast, interview, or webinar on the left to extract viral clips, smart reframing, and animated captions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
