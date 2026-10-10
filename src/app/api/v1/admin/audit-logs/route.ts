import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    await requireAdminSession();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "30", 10)));
    const actionFilter = searchParams.get("action")?.trim() || "";
    const skip = (page - 1) * limit;

    const where: Prisma.UsageLogWhereInput = {
      action: { startsWith: "ADMIN_" },
    };

    if (actionFilter) {
      where.action = actionFilter.startsWith("ADMIN_") ? actionFilter : `ADMIN_${actionFilter}`;
    }

    const [total, logs] = await Promise.all([
      prisma.usageLog.count({ where }),
      prisma.usageLog.findMany({
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
            },
          },
        },
      }),
    ]);

    const formattedLogs = logs.map((log) => ({
      id: log.id,
      action: log.action.replace("ADMIN_", ""),
      fullAction: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      metadata: log.metadata,
      targetUser: log.user,
      createdAt: log.createdAt.toISOString(),
    }));

    return NextResponse.json({
      logs: formattedLogs,
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
    console.error("Admin get audit logs error:", error);
    return NextResponse.json({ error: "Failed to retrieve audit logs" }, { status: 500 });
  }
}
