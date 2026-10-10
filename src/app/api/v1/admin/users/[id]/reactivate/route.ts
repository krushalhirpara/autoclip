import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminSession = await requireAdminSession();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const reason = body.reason?.trim() || "Administrative reactivation";

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Record reactivation log in UsageLog
    await prisma.usageLog.create({
      data: {
        userId: user.id,
        action: "ADMIN_REACTIVATE_USER",
        entityType: "User",
        entityId: user.id,
        metadata: {
          actor: adminSession.username,
          reason,
          targetEmail: user.email,
          timestamp: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `User ${user.email} reactivated successfully`,
      isSuspended: false,
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; name?: string };
    if (err?.statusCode === 401 || err?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Unauthorized Super Admin Access" }, { status: 401 });
    }
    console.error("Admin reactivate user error:", error);
    return NextResponse.json({ error: "Failed to reactivate user" }, { status: 500 });
  }
}
