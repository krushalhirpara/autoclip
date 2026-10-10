import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publishing Channels",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function PublishingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
