import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/auth.config";
import { prisma } from "@/server/db/prisma";
import { CreditService } from "@/server/services/credit.service";

export async function GET() {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch user's payment records (strict user isolation)
    const paymentRecords = await prisma.paymentRecord.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderId: true,
        captureId: true,
        status: true,
        planId: true,
        billingInterval: true,
        amount: true,
        currency: true,
        creditsGranted: true,
        payerEmail: true,
        createdAt: true,
      },
    });

    // Fetch user's subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: {
        id: true,
        status: true,
        planId: true,
        billingInterval: true,
        provider: true,
        paypalSubscriptionId: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        cancelAtPeriodEnd: true,
      },
    });

    // Fetch current credit balance
    const credits = await CreditService.getBalance(userId);

    return NextResponse.json({
      payments: paymentRecords,
      subscription: subscription || {
        status: "INACTIVE",
        planId: "free",
      },
      credits,
    });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment records" },
      { status: 500 }
    );
  }
}
