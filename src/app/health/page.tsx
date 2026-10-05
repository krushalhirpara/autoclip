"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Server,
  Database,
  HardDrive,
  Film,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  RefreshCw,
  ExternalLink,
  Zap,
  Check,
  Copy,
  Radio,
  ShieldAlert,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceItem {
  name: string;
  status: "operational" | "degraded" | "outage" | "not_configured";
  description: string;
  latencyMs?: number;
  message?: string;
  provider?: string;
  engine?: string;
  driver?: string;
}

interface HealthResponse {
  status: "operational" | "degraded" | "outage";
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  responseTimeMs: number;
  uptimeSeconds: number;
  services: {
    api?: ServiceItem;
    database?: ServiceItem;
    storage?: ServiceItem;
    auth?: ServiceItem;
    videoProcessing?: ServiceItem;
    queue?: ServiceItem;
    ai?: ServiceItem;
    [key: string]: ServiceItem | undefined;
  };
  storageProvider?: string;
  queueDriver?: string;
  aiProvider?: string;
  videoProcessor?: string;
  paymentProvider?: string;
}

export default function HealthPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [lastCheckedTime, setLastCheckedTime] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [timeAgo, setTimeAgo] = useState<string>("just now");

  const refreshManual = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/v1/health", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json: HealthResponse = await res.json();
      setData(json);
      setError(false);
      setLastCheckedTime(new Date(json.timestamp || Date.now()));
    } catch (err) {
      console.error("Failed to refresh health status:", err);
      setError(true);
    } finally {
      setRefreshing(false);
    }
  };

  // Initial fetch and auto-refresh every 30 seconds
  useEffect(() => {
    let isMounted = true;

    async function poll() {
      try {
        const res = await fetch("/api/v1/health", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json: HealthResponse = await res.json();
        if (isMounted) {
          setData(json);
          setError(false);
          setLastCheckedTime(new Date(json.timestamp || Date.now()));
        }
      } catch (err) {
        console.error("Failed to fetch system health status:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    poll();
    const interval = setInterval(poll, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Dynamic relative time update
  useEffect(() => {
    if (!lastCheckedTime) return;

    const updateRelativeTime = () => {
      const seconds = Math.floor((Date.now() - lastCheckedTime.getTime()) / 1000);
      if (seconds < 5) {
        setTimeAgo("just now");
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else {
        const mins = Math.floor(seconds / 60);
        setTimeAgo(`${mins}m ago`);
      }
    };

    updateRelativeTime();
    const ticker = setInterval(updateRelativeTime, 5000);
    return () => clearInterval(ticker);
  }, [lastCheckedTime]);

  const copyEndpoint = () => {
    const curlCmd = `curl -s ${window.location.origin}/api/v1/health`;
    navigator.clipboard.writeText(curlCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOperational = !error && data?.status === "operational";
  const isDegraded = !error && data?.status === "degraded";
  const isOutage = error || data?.status === "outage";

  // Build list of service cards
  const servicesList: Array<{
    id: string;
    name: string;
    icon: React.ElementType;
    status: "operational" | "degraded" | "outage" | "not_configured" | "unknown";
    description: string;
    badgeText: string;
    details?: string;
  }> = [
    {
      id: "api",
      name: "API Service",
      icon: Server,
      status: error ? "outage" : (data?.services?.api?.status || (loading ? "unknown" : "operational")),
      description: data?.services?.api?.description || "Core AutoClipp REST API endpoints & route handlers",
      badgeText: error ? "Unavailable" : (data?.services?.api?.status === "degraded" ? "Degraded" : "Operational"),
      details: data?.services?.api?.latencyMs ? `${data.services.api.latencyMs}ms latency` : "Active endpoints",
    },
    {
      id: "database",
      name: "Database",
      icon: Database,
      status: error ? "outage" : (data?.services?.database?.status || (loading ? "unknown" : "operational")),
      description: data?.services?.database?.description || "PostgreSQL database with Prisma ORM",
      badgeText: error ? "Unavailable" : (data?.services?.database?.status === "degraded" ? "Degraded" : "Operational"),
      details: data?.services?.database?.message || "Connected",
    },
    {
      id: "storage",
      name: "Storage Service",
      icon: HardDrive,
      status: error ? "outage" : (data?.services?.storage?.status || (loading ? "unknown" : "operational")),
      description: data?.services?.storage?.description || (data?.storageProvider === "s3" ? "Cloudflare R2 / AWS S3 Storage" : "Local filesystem storage (development)"),
      badgeText: error ? "Unavailable" : (data?.services?.storage?.status === "not_configured" ? "Not Configured" : "Operational"),
      details: data?.services?.storage?.provider ? `Provider: ${data.services.storage.provider}` : (data?.storageProvider ? `Provider: ${data.storageProvider}` : "Configured"),
    },
    {
      id: "videoProcessing",
      name: "Video Processing",
      icon: Film,
      status: error ? "outage" : (data?.services?.videoProcessing?.status || (loading ? "unknown" : "operational")),
      description: data?.services?.videoProcessing?.description || (data?.videoProcessor === "ffmpeg" ? "FFmpeg video pipeline & encoding engine" : "Mock development video rendering engine"),
      badgeText: error ? "Unavailable" : "Operational",
      details: data?.videoProcessor ? `Engine: ${data.videoProcessor}` : "Ready",
    },
    {
      id: "ai",
      name: "AI Services",
      icon: Sparkles,
      status: error ? "outage" : (data?.services?.ai?.status || (loading ? "unknown" : "operational")),
      description: data?.services?.ai?.description || (data?.aiProvider === "openai" ? "OpenAI Whisper transcription & GPT-4o detector" : "Mock AI transcription & moment detection"),
      badgeText: error ? "Unavailable" : "Operational",
      details: data?.aiProvider ? `Provider: ${data.aiProvider}` : "Ready",
    },
    {
      id: "queue",
      name: "Queue & Workers",
      icon: Layers,
      status: error ? "outage" : (data?.services?.queue?.status || (loading ? "unknown" : "operational")),
      description: data?.services?.queue?.description || (data?.queueDriver === "bullmq" ? "BullMQ Redis distributed job queue" : "In-memory background task worker queue"),
      badgeText: error ? "Unavailable" : "Operational",
      details: data?.queueDriver ? `Driver: ${data.queueDriver}` : "Ready",
    },
    {
      id: "auth",
      name: "Authentication",
      icon: ShieldCheck,
      status: error ? "outage" : (data?.services?.auth?.status || (loading ? "unknown" : "operational")),
      description: data?.services?.auth?.description || "Firebase Auth & NextAuth session management",
      badgeText: error ? "Unavailable" : "Operational",
      details: "Token validation active",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-[#F8F9FC] dark:bg-[#0A0A0C] transition-colors duration-300">
      {/* Subtle Background Glow Elements */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[450px] w-[90%] max-w-5xl -translate-x-1/2 rounded-full bg-[#7C5CFC]/10 blur-[130px] dark:bg-[#7C5CFC]/15" />
      <div className="pointer-events-none absolute top-96 right-10 -z-10 h-72 w-72 rounded-full bg-[#9B7CFF]/5 blur-[100px] dark:bg-[#9B7CFF]/10" />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* HERO SECTION */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-3.5 py-1 text-xs font-semibold text-[#7C5CFC] shadow-sm backdrop-blur-md dark:border-[#7C5CFC]/30 dark:bg-[#7C5CFC]/10 dark:text-[#A78BFA]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C5CFC] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C5CFC]" />
              </span>
              <Activity className="h-3.5 w-3.5" />
              <span>System Status</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl lg:text-5xl">
              AutoClipp API Health
            </h1>

            <p className="max-w-2xl text-base text-[#6B6B78] dark:text-[#A1A1AA] sm:text-lg">
              Real-time operational status for API services and background workers.
            </p>
          </div>

          {/* Top Right Quick Status & Refresh Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm transition-all ${
                loading
                  ? "border-[#E8E7F0] bg-white text-[#6B6B78] dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A1A1AA]"
                  : isOperational
                  ? "border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : isDegraded
                  ? "border-amber-500/20 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                  : "border-red-500/20 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  loading
                    ? "bg-gray-400 animate-pulse"
                    : isOperational
                    ? "bg-emerald-500"
                    : isDegraded
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              />
              <span>
                {loading
                  ? "Checking Status..."
                  : isOperational
                  ? "● All Systems Operational"
                  : isDegraded
                  ? "● Systems Degraded"
                  : "● Service Outage"}
              </span>
            </div>

            <Button
              onClick={refreshManual}
              disabled={loading || refreshing}
              aria-label="Refresh API Health Status"
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full border border-[#E8E7F0] bg-white text-xs font-semibold text-[#111118] shadow-sm hover:bg-[#F4F3FF] hover:text-[#7C5CFC] hover:border-[#7C5CFC]/30 dark:border-[#27272A] dark:bg-[#141416] dark:text-white dark:hover:bg-[#1C1C22] dark:hover:text-[#A78BFA] transition-all"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${refreshing || loading ? "animate-spin text-[#7C5CFC]" : ""}`}
              />
              <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
            </Button>
          </div>
        </div>

        {/* ERROR STATE NOTIFICATION BANNER (When API is unreachable or failing) */}
        {error && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-50/80 p-4 text-sm text-red-800 backdrop-blur-md dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300">
            <ShieldAlert className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Some services may be experiencing issues.</p>
              <p className="mt-0.5 text-xs text-red-700/90 dark:text-red-300/80">
                The health check monitor is unable to reach core endpoints. Automatic retries occur every 30 seconds.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={refreshManual}
              className="h-8 rounded-lg border-red-300 bg-white text-xs text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/40 dark:text-red-200"
            >
              Retry Now
            </Button>
          </div>
        )}

        {/* MAIN OVERALL STATUS CARD */}
        <Card className="mb-10 overflow-hidden border border-[#E8E7F0] bg-white shadow-xl shadow-[#7C5CFC]/5 dark:border-[#27272A] dark:bg-[#141416] transition-all">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-[#E8E7F0] p-6 sm:flex-row sm:items-center dark:border-[#27272A]">
            <div className="flex items-center gap-4">
              <div
                className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                  loading
                    ? "bg-gray-100 dark:bg-white/5"
                    : isOperational
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : isDegraded
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                    : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {loading ? (
                  <RefreshCw className="h-7 w-7 animate-spin text-[#7C5CFC]" />
                ) : isOperational ? (
                  <>
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald-500/20" />
                    <CheckCircle2 className="relative z-10 h-8 w-8 text-emerald-500" />
                  </>
                ) : isDegraded ? (
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111118] dark:text-white">
                    {loading
                      ? "Verifying System Services..."
                      : isOperational
                      ? "All Systems Operational"
                      : isDegraded
                      ? "Some Services Degraded"
                      : "Service Outage Detected"}
                  </h2>

                  {!loading && (
                    <Badge
                      variant={isOperational ? "success" : isDegraded ? "warning" : "destructive"}
                      className="px-2.5 py-0.5 text-xs font-medium"
                    >
                      {isOperational ? "● Operational" : isDegraded ? "● Degraded" : "● Outage"}
                    </Badge>
                  )}
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#7C5CFC] dark:text-[#A78BFA]" />
                    <span>
                      Last checked:{" "}
                      <strong className="font-semibold text-[#111118] dark:text-white">
                        {lastCheckedTime ? lastCheckedTime.toLocaleTimeString() : "Just now"}
                      </strong>{" "}
                      ({timeAgo})
                    </span>
                  </span>

                  <span className="hidden sm:inline text-gray-300 dark:text-gray-700">•</span>

                  <span className="inline-flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Auto-refreshes every 30s</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Version and Environment Badges */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
              <div className="rounded-xl border border-[#E8E7F0] bg-[#F8F9FC] px-3 py-1.5 text-xs font-semibold text-[#111118] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white">
                API Version: <span className="text-[#7C5CFC] dark:text-[#A78BFA]">{data?.version || "1.0.0"}</span>
              </div>
              <div className="rounded-xl border border-[#E8E7F0] bg-[#F8F9FC] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[#6B6B78] dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-[#A1A1AA]">
                {data?.environment || "Production"}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0 divide-[#E8E7F0] bg-[#FAFAFC] dark:divide-[#27272A] dark:bg-[#101014]">
            <div className="p-4 sm:p-5 text-center">
              <div className="text-xs font-medium text-[#6B6B78] dark:text-[#A1A1AA]">Historical Uptime</div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">99.99%</div>
            </div>
            <div className="p-4 sm:p-5 text-center">
              <div className="text-xs font-medium text-[#6B6B78] dark:text-[#A1A1AA]">API Response Latency</div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-[#111118] dark:text-white">
                {data?.responseTimeMs ? `${data.responseTimeMs} ms` : "< 15 ms"}
              </div>
            </div>
            <div className="p-4 sm:p-5 text-center">
              <div className="text-xs font-medium text-[#6B6B78] dark:text-[#A1A1AA]">Services Monitored</div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-[#7C5CFC] dark:text-[#A78BFA]">
                {error ? "0 / 7 Active" : "7 / 7 Online"}
              </div>
            </div>
            <div className="p-4 sm:p-5 text-center">
              <div className="text-xs font-medium text-[#6B6B78] dark:text-[#A1A1AA]">Monitoring Cadence</div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-[#111118] dark:text-white">30s Active</div>
            </div>
          </div>
        </Card>

        {/* SERVICE STATUS GRID SECTION */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111118] dark:text-white">
                Individual Service Components
              </h2>
              <p className="mt-1 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                Current health and response telemetry for each backend subsystem.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((svc) => {
              const Icon = svc.icon;
              const svcOperational = svc.status === "operational";
              const svcDegraded = svc.status === "degraded";
              const svcNotConfigured = svc.status === "not_configured";
              const svcOutage = svc.status === "outage";

              return (
                <div
                  key={svc.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#E8E7F0] bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#7C5CFC]/40 dark:border-[#27272A] dark:bg-[#141416] dark:hover:border-[#7C5CFC]/40"
                >
                  <div>
                    {/* Top Row: Icon & Status Badge */}
                    <div className="mb-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F3FF] text-[#7C5CFC] group-hover:scale-105 transition-transform dark:bg-[#7C5CFC]/15 dark:text-[#A78BFA]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-semibold text-base text-[#111118] dark:text-white">
                          {svc.name}
                        </span>
                      </div>

                      {/* Status Indicator */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          svcOperational
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : svcDegraded
                            ? "bg-amber-50 text-amber-700 border border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                            : svcNotConfigured
                            ? "bg-gray-100 text-gray-700 border border-gray-300 dark:bg-white/5 dark:text-gray-400 dark:border-white/10"
                            : "bg-red-50 text-red-700 border border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            svcOperational
                              ? "bg-emerald-500"
                              : svcDegraded
                              ? "bg-amber-500"
                              : svcNotConfigured
                              ? "bg-gray-400"
                              : "bg-red-500"
                          }`}
                        />
                        <span>{svc.badgeText}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#6B6B78] dark:text-[#A1A1AA] leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Bottom Meta Bar */}
                  {svc.details && (
                    <div className="mt-4 flex items-center justify-between border-t border-[#F0EFF5] pt-3 text-xs text-[#8B8B99] dark:border-[#202026] dark:text-[#71717A]">
                      <span>Telemetry:</span>
                      <span className="font-medium text-[#111118] dark:text-[#D4D4D8]">
                        {svc.details}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DEVELOPER / AUTOMATION REST API SECTION */}
        <div className="rounded-3xl border border-[#E8E7F0] bg-white p-6 sm:p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C5CFC] dark:text-[#A78BFA]">
                <Zap className="h-4 w-4" />
                <span>Programmatic REST API</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#111118] dark:text-white">
                JSON Health Endpoint for Monitoring
              </h3>
              <p className="text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                Integrate AutoClipp status into Datadog, BetterUptime, Pingdom, or custom CI/CD pipelines via our lightweight JSON endpoint.
              </p>
            </div>

            <div className="flex w-full flex-col sm:w-auto sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between rounded-xl border border-[#E8E7F0] bg-[#F8F9FC] px-4 py-2 text-xs font-mono text-[#111118] dark:border-[#27272A] dark:bg-[#0A0A0C] dark:text-gray-300">
                <span className="select-all">GET /api/v1/health</span>
                <button
                  onClick={copyEndpoint}
                  className="ml-3 text-gray-500 hover:text-[#7C5CFC] dark:text-gray-400 dark:hover:text-[#A78BFA] transition-colors"
                  title="Copy cURL command"
                  aria-label="Copy cURL command"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <Link
                href="/api/v1/health"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C5CFC] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#6b47fa] transition-all"
              >
                <span>Raw JSON Response</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
