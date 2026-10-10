import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/server/auth/auth.config";
import { getPayPalService } from "@/core/payments";

const captureOrderSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in to complete payment." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const validated = captureOrderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid capture request.",
          details: validated.error.format(),
        },
        { status: 400 }
      );
    }

    const { orderId } = validated.data;
    const paypalService = getPayPalService();

    const result = await paypalService.captureOrder({
      orderId,
      userId: session.user.id,
    });

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      captureId: result.captureId,
      planId: result.planId,
      creditsAdded: result.creditsAdded,
      newBalance: result.newBalance,
    });
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to capture payment",
      },
      { status: 500 }
    );
  }
}
