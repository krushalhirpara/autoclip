import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/server/auth/auth.config";

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
