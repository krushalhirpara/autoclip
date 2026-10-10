import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Videos",
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

export default function UploadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
