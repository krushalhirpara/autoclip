import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminSession = await requireAdminSession();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const note = body.note?.trim();

    if (!note) {
      return NextResponse.json({ error: "Note content is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Save note in UsageLog
    const createdLog = await prisma.usageLog.create({
      data: {
        userId: user.id,
        action: "ADMIN_USER_NOTE",
        entityType: "User",
        entityId: user.id,
        metadata: {
          note,
          actor: adminSession.username,
          timestamp: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      note: {
        id: createdLog.id,
        note,
        addedBy: adminSession.username,
        createdAt: createdLog.createdAt.toISOString(),
      },
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; name?: string };
    if (err?.statusCode === 401 || err?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Unauthorized Super Admin Access" }, { status: 401 });
    }
    console.error("Admin add note error:", error);
    return NextResponse.json({ error: "Failed to add internal note" }, { status: 500 });
  }
}
