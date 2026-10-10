import { NextResponse } from "next/server";
import { clearAdminSessionCookie, getAdminSession, recordAdminAuditLog } from "@/server/auth/admin-auth";

export async function POST() {
  const session = await getAdminSession();
  if (session) {
    await recordAdminAuditLog("LOGOUT", "AUTH", undefined, {
      user: session.username,
    });
  }

  await clearAdminSessionCookie();

  return NextResponse.json({
    success: true,
    message: "Admin session cleared",
  });
}
