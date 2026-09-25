import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AutoClipp API",
    version: "1.0.0",
    environment: env.NODE_ENV,
    storageProvider: env.STORAGE_PROVIDER,
    queueDriver: env.QUEUE_DRIVER,
    aiProvider: env.AI_PROVIDER,
    videoProcessor: env.VIDEO_PROCESSOR,
    paymentProvider: env.PAYMENT_PROVIDER,
    timestamp: new Date().toISOString(),
  });
}
