import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";
import { PaymentStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await requireAdminSession();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const provider = searchParams.get("provider")?.trim() || "";
    const planId = searchParams.get("planId")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "15", 10)));
    const skip = (page - 1) * limit;

    const where: Prisma.PaymentRecordWhereInput = {};

    if (status && Object.values(PaymentStatus).includes(status as PaymentStatus)) {
      where.status = status as PaymentStatus;
    }

    if (provider) {
      where.provider = { equals: provider, mode: "insensitive" };
    }

    if (planId) {
      where.planId = { equals: planId, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { orderId: { contains: search, mode: "insensitive" } },
        { captureId: { contains: search, mode: "insensitive" } },
        { payerEmail: { contains: search, mode: "insensitive" } },
        { payerName: { contains: search, mode: "insensitive" } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { user: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [total, payments, statusCounts] = await Promise.all([
      prisma.paymentRecord.count({ where }),
      prisma.paymentRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      }),
      Promise.all([
        prisma.paymentRecord.count({ where: { status: PaymentStatus.COMPLETED } }),
        prisma.paymentRecord.count({ where: { status: PaymentStatus.PENDING } }),
        prisma.paymentRecord.count({ where: { status: PaymentStatus.FAILED } }),
        prisma.paymentRecord.count({ where: { status: PaymentStatus.REFUNDED } }),
        prisma.paymentRecord.count({ where: { status: PaymentStatus.CANCELLED } }),
      ]),
    ]);

    const formattedPayments = payments.map((p) => ({
      id: p.id,
      orderId: p.orderId,
      captureId: p.captureId || null,
      status: p.status,
      planId: p.planId,
      billingInterval: p.billingInterval || "one_time",
      amount: Number(p.amount),
      currency: p.currency,
      creditsGranted: p.creditsGranted,
      provider: p.provider,
      payerName: p.payerName || p.user?.name || "N/A",
      payerEmail: p.payerEmail || p.user?.email || "N/A",
      userId: p.userId,
      user: p.user,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      payments: formattedPayments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      summary: {
        completed: statusCounts[0],
        pending: statusCounts[1],
        failed: statusCounts[2],
        refunded: statusCounts[3],
        cancelled: statusCounts[4],
      },
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; name?: string };
    if (err?.statusCode === 401 || err?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Unauthorized Super Admin Access" }, { status: 401 });
    }
    console.error("Admin get payments error:", error);
    return NextResponse.json({ error: "Failed to retrieve payments" }, { status: 500 });
  }
}
