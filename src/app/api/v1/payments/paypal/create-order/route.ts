import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/server/auth/auth.config";
import { getPayPalService } from "@/core/payments";

const createOrderSchema = z.object({
  planId: z.enum(["starter", "pro", "agency"]),
  billingInterval: z.enum(["month", "year", "one_time"]).default("month"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in to purchase a plan." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const validated = createOrderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid order parameters.",
          details: validated.error.format(),
        },
        { status: 400 }
      );
    }

    const { planId, billingInterval } = validated.data;
    const paypalService = getPayPalService();

    const order = await paypalService.createOrder({
      userId: session.user.id,
      userEmail: session.user.email,
      planId,
      billingInterval,
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create PayPal order",
      },
      { status: 500 }
    );
  }
}
