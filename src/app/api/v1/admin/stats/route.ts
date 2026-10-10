import { NextResponse } from "next/server";
import { requireAdminSession } from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";
import { PaymentStatus } from "@prisma/client";

export async function GET() {
  try {
    await requireAdminSession();

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // 1. User Metrics
    const [totalUsers, newUsersToday, newUsers7d, newUsers30d] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    ]);

    // 2. Content & Job Metrics
    const [totalProjects, totalVideos, totalClips, totalExports] = await Promise.all([
      prisma.project.count(),
      prisma.video.count(),
      prisma.clip.count(),
      prisma.export.count(),
    ]);

    // 3. Payment Metrics
    const [
      totalPayments,
      completedPayments,
      pendingPayments,
      failedPayments,
      refundedPayments,
      allCompletedRecords,
      allRefundedRecords,
    ] = await Promise.all([
      prisma.paymentRecord.count(),
      prisma.paymentRecord.count({ where: { status: PaymentStatus.COMPLETED } }),
      prisma.paymentRecord.count({ where: { status: PaymentStatus.PENDING } }),
      prisma.paymentRecord.count({ where: { status: PaymentStatus.FAILED } }),
      prisma.paymentRecord.count({ where: { status: PaymentStatus.REFUNDED } }),
      prisma.paymentRecord.findMany({
        where: { status: PaymentStatus.COMPLETED },
        select: { amount: true, currency: true, userId: true },
      }),
      prisma.paymentRecord.findMany({
        where: { status: PaymentStatus.REFUNDED },
        select: { amount: true, currency: true },
      }),
    ]);

    // Calculate gross & net volume in USD
    const grossVolumeUSD = allCompletedRecords
      .filter((r) => r.currency === "USD")
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const refundedVolumeUSD = allRefundedRecords
      .filter((r) => r.currency === "USD")
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const netRevenueUSD = Math.max(0, grossVolumeUSD - refundedVolumeUSD);

    // Unique paying users
    const uniquePayingUserIds = new Set(allCompletedRecords.map((r) => r.userId));
    const activePaidUsers = uniquePayingUserIds.size;

    // 4. Recent Data
    const [recentUsers, recentTransactions] = await Promise.all([
      prisma.user.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.paymentRecord.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
    ]);

    // 5. Daily Trend (last 14 days)
    const dailyTrends = [];
    for (let i = 13; i >= 0; i--) {
      const dayStart = new Date();
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const dateStr = dayStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      const dayUsers = await prisma.user.count({
        where: { createdAt: { gte: dayStart, lte: dayEnd } },
      });

      const dayPayments = await prisma.paymentRecord.findMany({
        where: {
          createdAt: { gte: dayStart, lte: dayEnd },
          status: PaymentStatus.COMPLETED,
        },
        select: { amount: true },
      });

      const dayRevenue = dayPayments.reduce((sum, p) => sum + Number(p.amount), 0);

      dailyTrends.push({
        date: dateStr,
        users: dayUsers,
        revenue: dayRevenue,
      });
    }

    return NextResponse.json({
      overview: {
        totalUsers,
        newUsersToday,
        newUsers7d,
        newUsers30d,
        totalProjects,
        totalVideos,
        totalClips,
        totalExports,
        activePaidUsers,
      },
      payments: {
        totalPayments,
        completedPayments,
        pendingPayments,
        failedPayments,
        refundedPayments,
        grossVolumeUSD,
        refundedVolumeUSD,
        netRevenueUSD,
      },
      recentUsers,
      recentTransactions: recentTransactions.map((tx) => ({
        id: tx.id,
        orderId: tx.orderId,
        userName: tx.user?.name || tx.payerName || "Anonymous",
        userEmail: tx.user?.email || tx.payerEmail || "N/A",
        planId: tx.planId,
        amount: Number(tx.amount),
        currency: tx.currency,
        status: tx.status,
        provider: tx.provider,
        createdAt: tx.createdAt,
      })),
      dailyTrends,
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; name?: string; message?: string };
    if (err?.statusCode === 401 || err?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Unauthorized Super Admin Access" }, { status: 401 });
    }
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to load dashboard metrics" }, { status: 500 });
  }
}
