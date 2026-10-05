import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db/prisma";
import { createSessionToken, setSessionCookie } from "@/server/auth/auth.config";
import { CreditService } from "@/server/services/credit.service";
import { isValidIndianMobile, normalizeIndianMobile } from "@/lib/validation";

const firebaseSessionSchema = z.object({
  uid: z.string().min(1),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  mobileNumber: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  provider: z.string().default("firebase"),
  mode: z.enum(["login", "signup", "check"]).default("signup"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = firebaseSessionSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid session payload", details: validated.error.format() },
        { status: 400 }
      );
    }

    const { uid, email, name, mobileNumber, image, provider, mode } = validated.data;
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check mode: Check if account exists
    if (mode === "check") {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ firebaseUid: uid }, { email: normalizedEmail }],
        },
      });

      return NextResponse.json({
        exists: !!user,
        user: user
          ? {
              id: user.id,
              firebaseUid: user.firebaseUid,
              name: user.name,
              email: user.email,
              mobileNumber: user.mobileNumber,
              image: user.image,
              role: user.role,
            }
          : null,
      });
    }

    // 2. Login Mode: Require existing application user profile
    if (mode === "login") {
      let user = await prisma.user.findFirst({
        where: {
          OR: [{ firebaseUid: uid }, { email: normalizedEmail }],
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Account not found. Please create an account first." },
          { status: 404 }
        );
      }

      // Update firebaseUid / image if not set yet
      if (!user.firebaseUid || (!user.image && image)) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            firebaseUid: user.firebaseUid || uid,
            image: user.image || image || null,
          },
        });
      }

      // Link OAuth account if social provider
      if (provider && provider !== "password" && uid) {
        try {
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider,
                providerAccountId: uid,
              },
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: user.id,
                type: "oauth",
                provider,
                providerAccountId: uid,
              },
            });
          }
        } catch (err) {
          console.warn("Account link error:", err);
        }
      }

      // Create session token and set HTTP cookie
      const token = await createSessionToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
        mobileNumber: user.mobileNumber,
        firebaseUid: user.firebaseUid,
      });

      await setSessionCookie(token);

      return NextResponse.json({
        user: {
          id: user.id,
          firebaseUid: user.firebaseUid,
          name: user.name,
          email: user.email,
          mobileNumber: user.mobileNumber,
          image: user.image,
          role: user.role,
        },
      });
    }

    // 3. Signup / Profile Completion Mode
    if (mode === "signup") {
      // Validate mobile number if provided
      const formattedMobile = mobileNumber ? normalizeIndianMobile(mobileNumber) : null;
      if (mobileNumber && !isValidIndianMobile(mobileNumber)) {
        return NextResponse.json(
          { error: "Please enter a valid 10-digit Indian mobile number." },
          { status: 400 }
        );
      }

      let user = await prisma.user.findFirst({
        where: {
          OR: [{ firebaseUid: uid }, { email: normalizedEmail }],
        },
      });

      if (!user) {
        // Create new User in PostgreSQL
        user = await prisma.user.create({
          data: {
            firebaseUid: uid,
            email: normalizedEmail,
            name: name?.trim() || normalizedEmail.split("@")[0],
            mobileNumber: formattedMobile,
            image: image || null,
            role: "USER",
          },
        });

        // Initialize starter credits
        await CreditService.getBalance(user.id);
      } else {
        // Update existing record with complete profile info
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            firebaseUid: user.firebaseUid || uid,
            name: name?.trim() || user.name,
            mobileNumber: formattedMobile || user.mobileNumber,
            image: image || user.image,
          },
        });
      }

      // Link OAuth account if social
      if (provider && provider !== "password" && uid) {
        try {
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider,
                providerAccountId: uid,
              },
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: user.id,
                type: "oauth",
                provider,
                providerAccountId: uid,
              },
            });
          }
        } catch (err) {
          console.warn("Account link error:", err);
        }
      }

      // Create session token and set HTTP cookie
      const token = await createSessionToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
        mobileNumber: user.mobileNumber,
        firebaseUid: user.firebaseUid,
      });

      await setSessionCookie(token);

      return NextResponse.json({
        user: {
          id: user.id,
          firebaseUid: user.firebaseUid,
          name: user.name,
          email: user.email,
          mobileNumber: user.mobileNumber,
          image: user.image,
          role: user.role,
        },
      });
    }

    return NextResponse.json({ error: "Invalid request mode" }, { status: 400 });
  } catch (error) {
    console.error("Firebase Session Sync Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to establish session" },
      { status: 500 }
    );
  }
}
