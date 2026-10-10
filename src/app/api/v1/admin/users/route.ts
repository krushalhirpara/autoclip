import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";
import { Prisma, UserRole } from "@prisma/client";

interface LogMetadata {
  reason?: string;
  note?: string;
  actor?: string;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await requireAdminSession();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const role = searchParams.get("role")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "15", 10)));
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { id: { equals: search } },
        { mobileNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role && (role === "USER" || role === "ADMIN")) {
      where.role = role as UserRole;
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          subscription: true,
          creditBalance: true,
          _count: {
            select: {
              projects: true,
              videos: true,
              exports: true,
              paymentRecords: true,
            },
          },
        },
      }),
    ]);

    // Check suspension status and fetch latest note for each user
    const userIds = users.map((u) => u.id);
    const [suspensionLogs, noteLogs] = await Promise.all([
      prisma.usageLog.findMany({
        where: {
          userId: { in: userIds },
          action: { in: ["ADMIN_SUSPEND_USER", "ADMIN_REACTIVATE_USER"] },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.usageLog.findMany({
        where: {
          userId: { in: userIds },
          action: "ADMIN_USER_NOTE",
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Map suspension status per user
    const suspensionMap = new Map<string, { isSuspended: boolean; reason?: string; date?: string }>();
    for (const log of suspensionLogs) {
      if (!suspensionMap.has(log.userId)) {
        const meta = log.metadata as LogMetadata | null;
        suspensionMap.set(log.userId, {
          isSuspended: log.action === "ADMIN_SUSPEND_USER",
          reason: meta?.reason,
          date: log.createdAt.toISOString(),
        });
      }
    }

    // Map notes per user
    const notesMap = new Map<string, Array<{ id: string; note?: string; addedBy?: string; createdAt: string }>>();
    for (const log of noteLogs) {
      if (!notesMap.has(log.userId)) {
        notesMap.set(log.userId, []);
      }
      const meta = log.metadata as LogMetadata | null;
      notesMap.get(log.userId)?.push({
        id: log.id,
        note: meta?.note,
        addedBy: meta?.actor,
        createdAt: log.createdAt.toISOString(),
      });
    }

    const formattedUsers = users.map((u) => {
      const suspension = suspensionMap.get(u.id);
      return {
        id: u.id,
        name: u.name || "Anonymous",
        email: u.email,
        mobileNumber: u.mobileNumber || "N/A",
        role: u.role,
        image: u.image,
        createdAt: u.createdAt.toISOString(),
        plan: u.subscription?.planId || "free",
        credits: u.creditBalance?.balance ?? 60,
        projectsCount: u._count.projects,
        videosCount: u._count.videos,
        exportsCount: u._count.exports,
        paymentsCount: u._count.paymentRecords,
        isSuspended: suspension?.isSuspended || false,
        suspensionReason: suspension?.reason || null,
        notes: notesMap.get(u.id) || [],
      };
    });

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; name?: string };
    if (err?.statusCode === 401 || err?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Unauthorized Super Admin Access" }, { status: 401 });
    }
    console.error("Admin get users error:", error);
    return NextResponse.json({ error: "Failed to retrieve user list" }, { status: 500 });
  }
}
