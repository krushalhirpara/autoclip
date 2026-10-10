import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In to Your Account",
  description: "Sign in to your AutoClipp dashboard to create, edit, and export AI-powered vertical video clips.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
