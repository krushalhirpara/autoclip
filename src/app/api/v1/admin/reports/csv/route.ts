import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession, recordAdminAuditLog } from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";

function sanitizeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  let str = String(field).replace(/"/g, '""');

  // Prevent Spreadsheet Formula Injection (CSV injection)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  try {
    const adminSession = await requireAdminSession();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "payments"; // "payments" | "users"

    let csvContent = "";
    let filename = "";

    if (type === "payments") {
      filename = `autoclipp_payments_report_${new Date().toISOString().split("T")[0]}.csv`;
      const records = await prisma.paymentRecord.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      });

      const headers = [
        "Payment ID",
        "Order ID",
        "Capture ID",
        "User Name",
        "User Email",
        "Plan",
        "Interval",
        "Amount",
        "Currency",
        "Status",
        "Provider",
        "Credits Granted",
        "Created Date (UTC)",
      ];

      const rows = records.map((r) => [
        sanitizeCsvField(r.id),
        sanitizeCsvField(r.orderId),
        sanitizeCsvField(r.captureId || "N/A"),
        sanitizeCsvField(r.user?.name || r.payerName || "N/A"),
        sanitizeCsvField(r.user?.email || r.payerEmail || "N/A"),
        sanitizeCsvField(r.planId),
        sanitizeCsvField(r.billingInterval || "one_time"),
        sanitizeCsvField(r.amount),
        sanitizeCsvField(r.currency),
        sanitizeCsvField(r.status),
        sanitizeCsvField(r.provider),
        sanitizeCsvField(r.creditsGranted),
        sanitizeCsvField(r.createdAt.toISOString()),
      ]);

      csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    } else {
      filename = `autoclipp_users_report_${new Date().toISOString().split("T")[0]}.csv`;
      const users = await prisma.user.findMany({
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
      });

      const headers = [
        "User ID",
        "Name",
        "Email",
        "Mobile",
        "Role",
        "Plan",
        "Credit Balance",
        "Total Projects",
        "Total Videos",
        "Total Exports",
        "Total Payments",
        "Created Date (UTC)",
      ];

      const rows = users.map((u) => [
        sanitizeCsvField(u.id),
        sanitizeCsvField(u.name || "Anonymous"),
        sanitizeCsvField(u.email),
        sanitizeCsvField(u.mobileNumber || "N/A"),
        sanitizeCsvField(u.role),
        sanitizeCsvField(u.subscription?.planId || "free"),
        sanitizeCsvField(u.creditBalance?.balance ?? 60),
        sanitizeCsvField(u._count.projects),
        sanitizeCsvField(u._count.videos),
        sanitizeCsvField(u._count.exports),
        sanitizeCsvField(u._count.paymentRecords),
        sanitizeCsvField(u.createdAt.toISOString()),
      ]);

      csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    }

    await recordAdminAuditLog("REPORT_EXPORTED", "REPORT", undefined, {
      reportType: type,
      filename,
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; name?: string };
    if (err?.statusCode === 401 || err?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Unauthorized Super Admin Access" }, { status: 401 });
    }
    console.error("Admin CSV export error:", error);
    return NextResponse.json({ error: "Failed to generate CSV export" }, { status: 500 });
  }
}
