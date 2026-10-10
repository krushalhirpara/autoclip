import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { env } from "@/lib/env";
import { prisma } from "../db/prisma";
import { UnauthorizedError } from "@/core/errors/app-error";
import { Prisma } from "@prisma/client";

export const ADMIN_COOKIE_NAME = "autoclipp_admin_session";
const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || env.NEXTAUTH_SECRET || "fallback-admin-session-secret-at-least-32-chars-long"
);

// In-memory rate limiting map for admin login attempts
interface RateLimitEntry {
  attempts: number;
  blockedUntil: number | null;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export function checkAdminRateLimit(identifier: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry) {
    return { allowed: true };
  }

  if (entry.blockedUntil && entry.blockedUntil > now) {
    const remainingSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  // Lockout expired
  if (entry.blockedUntil && entry.blockedUntil <= now) {
    rateLimitMap.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAdminAttempt(identifier: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier) || { attempts: 0, blockedUntil: null };

  entry.attempts += 1;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + LOCKOUT_MS;
  }

  rateLimitMap.set(identifier, entry);
}

export function resetAdminRateLimit(identifier: string) {
  rateLimitMap.delete(identifier);
}

export interface AdminSession {
  username: string;
  role: "SUPER_ADMIN";
  loginAt: string;
}

/**
 * Creates a signed JWT specifically for Super Admin session
 */
export async function createAdminToken(username: string): Promise<string> {
  return new SignJWT({
    username,
    role: "SUPER_ADMIN",
    type: "ADMIN_SESSION",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(ADMIN_SECRET);
}

/**
 * Verifies admin session token
 */
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, ADMIN_SECRET);
    if (payload.type !== "ADMIN_SESSION" || payload.role !== "SUPER_ADMIN") {
      return null;
    }
    return {
      username: (payload.username as string) || "admin",
      role: "SUPER_ADMIN",
      loginAt: new Date(typeof payload.iat === "number" ? payload.iat * 1000 : Date.now()).toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Returns current admin session or null
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

/**
 * Guard that enforces Super Admin privileges
 */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new UnauthorizedError("Super Admin authentication required");
  }
  return session;
}

/**
 * Sets secure admin cookie
 */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 12 * 60 * 60, // 12 hours
  });
}

/**
 * Clears admin cookie
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Records an admin action in UsageLog for audit trails
 */
export async function recordAdminAuditLog(
  action: string,
  entityType?: string,
  entityId?: string,
  metadata?: Record<string, unknown>
) {
  try {
    const session = await getAdminSession();
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";

    // Find or link to admin user if exists in DB, or use a system placeholder
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (adminUser) {
      await prisma.usageLog.create({
        data: {
          userId: adminUser.id,
          action: `ADMIN_${action}`,
          entityType: entityType || "SYSTEM",
          entityId: entityId || null,
          metadata: {
            actor: session?.username || "SuperAdmin",
            ip: ip.split(",")[0].trim(),
            timestamp: new Date().toISOString(),
            ...(metadata || {}),
          } as Prisma.InputJsonValue,
        },
      });
    }
  } catch (error) {
    console.error("Failed to record admin audit log:", error);
  }
}
