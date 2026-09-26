import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const state = Math.random().toString(36).substring(2, 15);
  
  const cookieStore = await cookies();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15, // 15 mins
  });

  const redirectUri = `${env.NEXT_PUBLIC_APP_URL}/api/v1/auth/oauth/${provider}/callback`;

  if (provider === "google") {
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID || "");
    googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "email profile");
    googleAuthUrl.searchParams.set("state", state);
    googleAuthUrl.searchParams.set("access_type", "offline");
    
    return NextResponse.redirect(googleAuthUrl);
  } else if (provider === "facebook") {
    const facebookAuthUrl = new URL("https://www.facebook.com/v19.0/dialog/oauth");
    facebookAuthUrl.searchParams.set("client_id", process.env.FACEBOOK_CLIENT_ID || "");
    facebookAuthUrl.searchParams.set("redirect_uri", redirectUri);
    facebookAuthUrl.searchParams.set("state", state);
    facebookAuthUrl.searchParams.set("scope", "email,public_profile");
    
    return NextResponse.redirect(facebookAuthUrl);
  } else if (provider === "apple") {
    const appleAuthUrl = new URL("https://appleid.apple.com/auth/authorize");
    appleAuthUrl.searchParams.set("client_id", process.env.APPLE_CLIENT_ID || "");
    appleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    appleAuthUrl.searchParams.set("response_type", "code");
    appleAuthUrl.searchParams.set("scope", "name email");
    appleAuthUrl.searchParams.set("response_mode", "form_post");
    appleAuthUrl.searchParams.set("state", state);
    
    return NextResponse.redirect(appleAuthUrl);
  }

  return NextResponse.json({ error: "Provider not supported" }, { status: 400 });
}
