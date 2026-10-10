"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Video, ArrowRight } from "lucide-react";

interface SmartCtaButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "default" | "sm" | "lg";
  targetRoute?: string;
  showIcon?: boolean;
  showArrow?: boolean;
}

export function SmartCtaButton({
  children,
  className,
  variant = "primary",
  size = "lg",
  targetRoute = "/dashboard",
  showIcon = true,
  showArrow = true,
}: SmartCtaButtonProps) {
  const { user, loading } = useAuth();

  const getDestination = () => {
    if (loading) return targetRoute;
    if (user) {
      return targetRoute;
    }
    return `/login?redirect=${encodeURIComponent(targetRoute)}`;
  };

  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 select-none cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs rounded-full gap-1.5",
    default: "px-6 py-2.5 text-sm rounded-full gap-2",
    lg: "px-8 py-3.5 text-base rounded-full gap-2.5 shadow-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#7C5CFC] via-[#8B6BFD] to-[#9B7CFF] text-white shadow-[0_4px_20px_rgba(124,92,252,0.4)] hover:shadow-[0_8px_30px_rgba(124,92,252,0.6)] hover:-translate-y-0.5",
    secondary:
      "border border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] hover:border-[#7C5CFC]/30 shadow-sm dark:border-[#27272A] dark:bg-[#1B1B1F] dark:text-white dark:hover:bg-[#222227]",
    outline:
      "border-2 border-[#7C5CFC] text-[#7C5CFC] bg-transparent hover:bg-[#7C5CFC]/10 dark:text-[#A78BFA] dark:border-[#7C5CFC]/60",
    white:
      "bg-white text-[#111118] hover:bg-gray-100 shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:scale-105",
  };

  return (
    <Link
      href={getDestination()}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {showIcon && <Video className="h-5 w-5 shrink-0" />}
      <span>{children || "Start Creating"}</span>
      {showArrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />}
    </Link>
  );
}
