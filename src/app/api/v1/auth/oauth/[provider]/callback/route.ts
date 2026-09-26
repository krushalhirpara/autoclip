import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import { prisma } from "@/server/db/prisma";
import { createSessionToken, setSessionCookie } from "@/server/auth/auth.config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  if (state !== storedState) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", request.url));
  }

  let userInfo: { id: string; email: string; name: string; image?: string; provider: string } | null = null;
  const redirectUri = `${env.NEXT_PUBLIC_APP_URL}/api/v1/auth/oauth/${provider}/callback`;

  try {
    if (provider === "google") {
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID || "",
          client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        }),
      });
      const tokens = await tokenResponse.json();

      if (!tokens.access_token) {
        throw new Error("Failed to get access token");
      }

      const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      const profile = await userResponse.json();

      userInfo = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        image: profile.picture,
        provider: "google",
      };

    } else if (provider === "apple") {
      // For a real production app, Apple requires generating a JWT client_secret
      // using p8 certificates. We will use a simplified flow here or error out if not configured.
      return NextResponse.redirect(new URL("/login?error=apple_not_configured", request.url));
    } else {
      return NextResponse.redirect(new URL("/login?error=unknown_provider", request.url));
    }

    if (!userInfo) {
      return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
    }

    // Upsert User and Account
    let user = await prisma.user.findUnique({
      where: { email: userInfo.email.toLowerCase() },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userInfo.email.toLowerCase(),
          name: userInfo.name,
          image: userInfo.image,
        },
      });
    }

    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: userInfo.provider,
          providerAccountId: userInfo.id,
        },
      },
    });

    if (!account) {
      await prisma.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: userInfo.provider,
          providerAccountId: userInfo.id,
        },
      });
    }

    // Set Session
    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    };

    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);

    // Clear state
    cookieStore.delete("oauth_state");

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error(`OAuth Callback Error (${provider}):`, error);
    return NextResponse.redirect(new URL(`/login?error=oauth_error`, request.url));
  }
}
