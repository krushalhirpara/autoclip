import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/auth.config";
import { CreditService } from "@/server/services/credit.service";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const credits = await CreditService.getBalance(session.user.id);

  return NextResponse.json({
    user: {
      ...session.user,
      credits,
    },
  });
}
