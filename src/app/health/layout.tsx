import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status & API Health",
  description: "Live operational status, uptime metrics, and API health monitoring for the AutoClipp platform.",
  alternates: {
    canonical: "/health",
  },
};

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
