import { NextRequest, NextResponse } from "next/server";
import { getPayPalService } from "@/core/payments";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    const headers = {
      authAlgo: request.headers.get("paypal-auth-algo") || undefined,
      certUrl: request.headers.get("paypal-cert-url") || undefined,
      transmissionId: request.headers.get("paypal-transmission-id") || undefined,
      transmissionSig: request.headers.get("paypal-transmission-sig") || undefined,
      transmissionTime: request.headers.get("paypal-transmission-time") || undefined,
    };

    const paypalService = getPayPalService();

    // Verify webhook signature with PayPal
    const isValid = await paypalService.verifyWebhookSignature(headers, rawBody);
    if (!isValid) {
      logger.warn("PayPal webhook signature verification failed", "PayPalWebhook");
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    let event: Record<string, unknown>;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const result = await paypalService.handleWebhookEvent(event);

    return NextResponse.json({
      received: true,
      handled: result.handled,
      eventType: result.eventType,
    });
  } catch (error) {
    logger.error("PayPal webhook error:", "PayPalWebhook", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Webhook handler failed",
      },
      { status: 500 }
    );
  }
}
