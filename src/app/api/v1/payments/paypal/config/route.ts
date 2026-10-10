import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getPayPalService } from "@/core/payments";

export async function GET() {
  const paypalService = getPayPalService();

  return NextResponse.json({
    clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || env.PAYPAL_CLIENT_ID || "",
    currency: "USD",
    environment: env.PAYPAL_ENVIRONMENT || "sandbox",
    isConfigured: paypalService.isConfigured(),
    subscriptionsEnabled: paypalService.isSubscriptionsEnabled(),
  });
}
