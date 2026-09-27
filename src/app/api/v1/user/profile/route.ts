import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession, createSessionToken, setSessionCookie } from "@/server/auth/auth.config";
import { prisma } from "@/server/db/prisma";
import { isValidIndianMobile, normalizeIndianMobile } from "@/lib/validation";

const profileUpdateSchema = z.object({
  fullName: z.string().min(1, "Full Name is required").max(100),
  mobileNumber: z.string().min(1, "Mobile Number is required"),
  photoURL: z.string().optional().nullable(),
});

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      firebaseUid: user.firebaseUid,
      fullName: user.name,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      photoURL: user.image,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = profileUpdateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid profile data", details: validated.error.format() },
        { status: 400 }
      );
    }

    const { fullName, mobileNumber, photoURL } = validated.data;

    if (!isValidIndianMobile(mobileNumber)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    const formattedMobile = normalizeIndianMobile(mobileNumber);

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: fullName.trim(),
        mobileNumber: formattedMobile,
        image: photoURL || undefined,
      },
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

    // Refresh the session token with updated display name and mobile number
    const token = await createSessionToken({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      image: updatedUser.image,
      mobileNumber: updatedUser.mobileNumber,
      firebaseUid: updatedUser.firebaseUid,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        firebaseUid: updatedUser.firebaseUid,
        fullName: updatedUser.name,
        name: updatedUser.name,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
        photoURL: updatedUser.image,
        image: updatedUser.image,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update profile" },
      { status: 500 }
    );
  }
}
