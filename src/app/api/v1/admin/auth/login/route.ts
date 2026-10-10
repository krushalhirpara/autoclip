import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  checkAdminRateLimit,
  recordFailedAdminAttempt,
  resetAdminRateLimit,
  createAdminToken,
  setAdminSessionCookie,
  recordAdminAuditLog,
} from "@/server/auth/admin-auth";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    
    // Check Rate Limit
    const rateLimit = checkAdminRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Account locked for ${rateLimit.remainingSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { username, password } = body;

    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
      recordFailedAdminAttempt(ip);
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const cleanUser = username.trim();
    const envAdminUser = process.env.ADMIN_USERNAME || "admin";
    const envAdminHash = process.env.ADMIN_PASSWORD_HASH;

    let isAuthenticated = false;

    // 1. Check Primary Environment Variable configuration
    if (envAdminHash) {
      if (cleanUser.toLowerCase() === envAdminUser.toLowerCase()) {
        isAuthenticated = await bcrypt.compare(password, envAdminHash);
      }
    } else {
      // 2. Fallback: Check if there is an ADMIN user in the database
      const dbAdmin = await prisma.user.findFirst({
        where: {
          email: cleanUser.toLowerCase(),
          role: "ADMIN",
        },
      });

      if (dbAdmin && dbAdmin.passwordHash) {
        isAuthenticated = await bcrypt.compare(password, dbAdmin.passwordHash);
      } else if (cleanUser === "admin" && password === "autoclipp_admin_2026") {
        // Safe development bootstrap fallback if no hash configured yet
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      recordFailedAdminAttempt(ip);
      await recordAdminAuditLog("LOGIN_FAILED", "AUTH", undefined, {
        attemptedUser: cleanUser,
        ip,
        reason: "Invalid credentials",
      });

      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Success: Reset rate limit and generate token
    resetAdminRateLimit(ip);
    const token = await createAdminToken(cleanUser);
    await setAdminSessionCookie(token);

    await recordAdminAuditLog("LOGIN_SUCCESS", "AUTH", undefined, {
      user: cleanUser,
      ip,
    });

    return NextResponse.json({
      success: true,
      user: {
        username: cleanUser,
        role: "SUPER_ADMIN",
      },
    });
  } catch (error: unknown) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
