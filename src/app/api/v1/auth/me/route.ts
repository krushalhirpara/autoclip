import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/auth.config";
import { prisma } from "@/server/db/prisma";
import { CreditService } from "@/server/services/credit.service";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Fetch full and latest user record from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      firebaseUid: true,
      name: true,
      email: true,
      mobileNumber: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const credits = await CreditService.getBalance(user.id);

  return NextResponse.json({
    user: {
      id: user.id,
      firebaseUid: user.firebaseUid,
      name: user.name,
      fullName: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      image: user.image,
      photoURL: user.image,
      role: user.role,
      createdAt: user.createdAt,
      credits,
    },
  });
}
