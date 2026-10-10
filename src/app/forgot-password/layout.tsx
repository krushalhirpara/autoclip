import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your AutoClipp account password securely.",
  alternates: {
    canonical: "/forgot-password",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
