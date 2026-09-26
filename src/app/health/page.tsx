"use client";

import React, { useEffect, useState } from "react";
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  Layers, 
  Clock,
  RefreshCw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/shared/navbar";

interface HealthData {
  status: string;
  service: string;
  version: string;
  environment: string;
  storageProvider: string;
  queueDriver: string;
  aiProvider: string;
  videoProcessor: string;
  paymentProvider: string;
  timestamp: string;
}

export default function HealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/v1/health");
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch health:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#0A0A0C]">
      <Navbar />
      <main className="relative px-6 py-24">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7C5CFC]/10 blur-[120px] dark:bg-[#7C5CFC]/15" />

        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-4 py-1.5 text-xs font-semibold text-[#7C5CFC] shadow-sm dark:border-[#27272A] dark:bg-[#141416] dark:text-[#A78BFA]">
                <Activity className="h-3.5 w-3.5" />
                <span>System Status</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl">
                AutoClipp API Health
              </h1>
              <p className="mt-3 text-base text-[#6B6B78] dark:text-[#A1A1AA]">
                Real-time operational status for API services and background workers.
              </p>
            </div>

            <Button 
              onClick={fetchHealth} 
              disabled={loading}
              variant="outline" 
              className="rounded-full border-[#E8E7F0] bg-white dark:border-[#27272A] dark:bg-[#141416]"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Global Status Card */}
          <Card className="mb-8 overflow-hidden border-0 shadow-lg ring-1 ring-[#E8E7F0] dark:bg-[#141416] dark:ring-[#27272A]">
            <div className="flex flex-col items-center justify-between gap-6 border-b border-[#E8E7F0] bg-white p-6 sm:flex-row dark:border-[#27272A] dark:bg-[#1A1A1F]">
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F3FF] dark:bg-white/5">
                  {loading ? (
                    <RefreshCw className="h-6 w-6 animate-spin text-[#7C5CFC] dark:text-[#A78BFA]" />
                  ) : error ? (
                    <XCircle className="h-7 w-7 text-red-500" />
                  ) : (
                    <>
                      <div className="absolute inset-0 animate-ping rounded-full bg-[#059669]/20" />
                      <CheckCircle2 className="relative z-10 h-7 w-7 text-[#059669]" />
                    </>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#111118] dark:text-white">
                    {loading ? "Checking System Status..." : error ? "System Degraded" : "All Systems Operational"}
                  </h2>
                  <div className="mt-1 flex items-center gap-2 text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      Last checked: {data ? new Date(data.timestamp).toLocaleString() : new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {!loading && !error && data && (
                <Badge variant="success" className="px-3 py-1.5">
                  API Version: {data.version}
                </Badge>
              )}
            </div>

            <CardContent className="bg-white/50 p-6 dark:bg-[#141416]/50">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                
                {/* API Service */}
                <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#1A1A1F]">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#111118] dark:text-white">
                      <Server className="h-4 w-4 text-[#7C5CFC]" /> API Service
                    </div>
                    {loading ? (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300" />
                    ) : error ? (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-[#059669]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                    {data ? data.service : "AutoClipp Core API"}
                  </div>
                </div>

                {/* Database */}
                <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#1A1A1F]">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#111118] dark:text-white">
                      <Database className="h-4 w-4 text-[#7C5CFC]" /> Database
                    </div>
                    {loading ? (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300" />
                    ) : error ? (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-[#059669]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">
                    Status: Operational
                  </div>
                </div>

                {/* Storage */}
                <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#1A1A1F]">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#111118] dark:text-white">
                      <HardDrive className="h-4 w-4 text-[#7C5CFC]" /> Storage
                    </div>
                    {loading ? (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300" />
                    ) : error ? (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-[#059669]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] uppercase">
                    {data ? data.storageProvider : "Provider"}
                  </div>
                </div>

                {/* AI Service */}
                <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#1A1A1F]">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#111118] dark:text-white">
                      <Cpu className="h-4 w-4 text-[#7C5CFC]" /> AI Service
                    </div>
                    {loading ? (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300" />
                    ) : error ? (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-[#059669]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] uppercase">
                    {data ? data.aiProvider : "Provider"}
                  </div>
                </div>

                {/* Processing Queue */}
                <div className="rounded-2xl border border-[#E8E7F0] bg-white p-4 shadow-sm dark:border-[#27272A] dark:bg-[#1A1A1F]">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#111118] dark:text-white">
                      <Layers className="h-4 w-4 text-[#7C5CFC]" /> Processing Queue
                    </div>
                    {loading ? (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300" />
                    ) : error ? (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-[#059669]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B6B78] dark:text-[#A1A1AA] uppercase">
                    {data ? data.queueDriver : "Driver"}
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
