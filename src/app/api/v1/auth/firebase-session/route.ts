import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db/prisma";
import { createSessionToken, setSessionCookie } from "@/server/auth/auth.config";
import { CreditService } from "@/server/services/credit.service";

const firebaseSessionSchema = z.object({
  uid: z.string().min(1),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  provider: z.string().default("firebase"),
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

    const { uid, email, name, image, provider } = validated.data;
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Find existing user by email to avoid duplicate user creation
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // 2. Create new user in PostgreSQL
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          name: name || normalizedEmail.split("@")[0],
          image: image || null,
          role: "USER",
        },
      });

      // Initialize credits ledger (60 free starter minutes)
      await CreditService.getBalance(user.id);
    } else {
      // Update name/image if previously null
      if ((!user.name && name) || (!user.image && image)) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            name: user.name || name,
            image: user.image || image,
          },
        });
      }
    }

    // 3. Link Account record if provider is social (e.g. google.com, apple.com)
    if (provider && uid) {
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
        // Safe catch for potential unique constraint race conditions
        console.warn("Account linking skipped or already exists:", err);
      }
    }

    // 4. Create standard session token and set HTTP-only cookie
    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Firebase Session Sync Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to establish session" },
      { status: 500 }
    );
  }
}
