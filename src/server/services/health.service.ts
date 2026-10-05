import { prisma } from "../db/prisma";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export interface ServiceHealth {
  name: string;
  status: "operational" | "degraded" | "outage" | "not_configured";
  description: string;
  latencyMs?: number;
  message?: string;
  provider?: string;
  engine?: string;
  driver?: string;
}

export interface SystemHealthResponse {
  status: "operational" | "degraded" | "outage";
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  responseTimeMs: number;
  uptimeSeconds: number;
  services: {
    api: ServiceHealth;
    database: ServiceHealth;
    storage: ServiceHealth;
    auth: ServiceHealth;
    videoProcessing: ServiceHealth;
    queue: ServiceHealth;
    ai: ServiceHealth;
  };
  storageProvider: string;
  queueDriver: string;
  aiProvider: string;
  videoProcessor: string;
  paymentProvider: string;
}

export async function getSystemHealth(): Promise<SystemHealthResponse> {
  const startTime = performance.now();

  // 1. Check Database connectivity with 2s timeout
  let dbStatus: "operational" | "degraded" = "operational";
  let dbLatency = 0;
  let dbMessage = "Connected to PostgreSQL database";

  const dbStart = performance.now();
  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database check timeout")), 2000)
      ),
    ]);
    dbLatency = Math.round(performance.now() - dbStart);
  } catch (error) {
    dbStatus = "degraded";
    dbLatency = Math.round(performance.now() - dbStart);
    dbMessage = "Database connection degraded or offline";
    logger.warn("Health check database probe failed", "HealthService", error);
  }

  // 2. Check Storage Configuration
  let storageStatus: "operational" | "not_configured" = "operational";
  let storageDesc = "Local filesystem storage (development)";
  if (env.STORAGE_PROVIDER === "s3") {
    if (env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY) {
      storageStatus = "operational";
      storageDesc = env.S3_ENDPOINT?.includes("r2")
        ? "Cloudflare R2 Object Storage"
        : "AWS S3 Object Storage";
    } else {
      storageStatus = "not_configured";
      storageDesc = "S3 Object Storage (Credentials not configured)";
    }
  }

  // 3. AI Service
  const aiStatus: "operational" = "operational";
  const aiDesc =
    env.AI_PROVIDER === "openai"
      ? "OpenAI Whisper & GPT-4o Intelligence"
      : "Mock AI Intelligence (Development)";

  // 4. Video Processor
  const videoStatus: "operational" = "operational";
  const videoDesc =
    env.VIDEO_PROCESSOR === "ffmpeg"
      ? "FFmpeg Video Pipeline & Encoding"
      : "Mock Video Processing Pipeline (Development)";

  // 5. Queue & Workers
  const queueStatus: "operational" = "operational";
  const queueDesc =
    env.QUEUE_DRIVER === "bullmq"
      ? "BullMQ Redis Job Queue Workers"
      : "In-Memory Background Worker Pool";

  // 6. Authentication
  const authStatus: "operational" = "operational";
  const authDesc = "Firebase Auth & NextAuth Session Manager";

  // Overall system status
  let overallStatus: "operational" | "degraded" | "outage" = "operational";
  if (dbStatus === "degraded") {
    overallStatus = "degraded";
  }

  const responseTimeMs = Math.max(1, Math.round(performance.now() - startTime));

  return {
    status: overallStatus,
    service: "AutoClipp Core API",
    version: "1.0.0",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    responseTimeMs,
    uptimeSeconds:
      typeof process !== "undefined" && typeof process.uptime === "function"
        ? Math.round(process.uptime())
        : 0,
    services: {
      api: {
        name: "API Service",
        status: "operational",
        description: "Core AutoClipp REST API endpoints & route handlers",
        latencyMs: Math.max(1, responseTimeMs - dbLatency),
      },
      database: {
        name: "Database",
        status: dbStatus,
        description: "PostgreSQL database with Prisma ORM",
        latencyMs: dbLatency,
        message: dbMessage,
      },
      storage: {
        name: "Storage Service",
        status: storageStatus,
        description: storageDesc,
        provider: env.STORAGE_PROVIDER,
      },
      auth: {
        name: "Authentication",
        status: authStatus,
        description: authDesc,
      },
      videoProcessing: {
        name: "Video Processing",
        status: videoStatus,
        description: videoDesc,
        engine: env.VIDEO_PROCESSOR,
      },
      queue: {
        name: "Queue & Background Workers",
        status: queueStatus,
        description: queueDesc,
        driver: env.QUEUE_DRIVER,
      },
      ai: {
        name: "AI Services",
        status: aiStatus,
        description: aiDesc,
        provider: env.AI_PROVIDER,
      },
    },
    storageProvider: env.STORAGE_PROVIDER,
    queueDriver: env.QUEUE_DRIVER,
    aiProvider: env.AI_PROVIDER,
    videoProcessor: env.VIDEO_PROCESSOR,
    paymentProvider: env.PAYMENT_PROVIDER,
  };
}
