import { NextResponse } from "next/server";
import { getSystemHealth } from "@/server/services/health.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const health = await getSystemHealth();
    return NextResponse.json(health, {
      status: health.status === "outage" ? 503 : 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "outage",
        service: "AutoClipp Core API",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        error: "Internal health check failure",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}
