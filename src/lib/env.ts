import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/autoclipp?schema=public"),
  NEXTAUTH_SECRET: z.string().min(16).default("development-secret-key-at-least-32-characters-long-auto-clipper"),
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),

  // Storage
  STORAGE_PROVIDER: z.enum(["local", "s3"]).default("local"),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().default("auto"),
  S3_BUCKET_NAME: z.string().default("autoclipp-media"),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_PUBLIC_BASE_URL: z.string().optional(),

  // Queue
  QUEUE_DRIVER: z.enum(["memory", "bullmq"]).default("memory"),
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // AI Providers
  AI_PROVIDER: z.enum(["mock", "openai"]).default("mock"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4o"),
  OPENAI_WHISPER_MODEL: z.string().default("whisper-1"),

  // Payments
  PAYMENT_PROVIDER: z.enum(["mock", "stripe"]).default("mock"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Video Processor
  VIDEO_PROCESSOR: z.enum(["mock", "ffmpeg"]).default("mock"),
  FFMPEG_PATH: z.string().optional(),
  FFPROBE_PATH: z.string().optional(),

  // Logging
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("debug"),
});

export type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(result.error.format(), null, 2));
    // Provide safe defaults for development instead of crashing outright
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV || "development",
    });
  }
  return result.data;
}

export const env = getEnv();
