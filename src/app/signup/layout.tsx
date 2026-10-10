import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Free Account – Start Video Clipping",
  description: "Sign up for AutoClipp. Get free processing minutes to transform your long-form videos into viral vertical clips.",
  alternates: {
    canonical: "/signup",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
