"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);

    const handleStorage = () => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setTheme(isDarkNow ? "dark" : "light");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const nextTheme = isCurrentlyDark ? "light" : "dark";

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setTheme(nextTheme);
    try {
      localStorage.setItem("autoclipp-theme", nextTheme);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Storage might be unavailable (e.g. private mode)
    }
  };

  if (!mounted) {
    return (
      <div className="fixed bottom-5 left-5 z-50">
        <div className="h-11 w-11 rounded-full border border-[#E8E7F0] bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-white/15 dark:bg-[#141418]/90" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E7F0] bg-white/90 text-[#111118] shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#7C5CFC] hover:shadow-[0_0_20px_rgba(124,92,252,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] dark:border-white/15 dark:bg-[#141418]/90 dark:text-white dark:hover:border-[#7C5CFC]/50 dark:hover:shadow-[0_0_20px_rgba(124,92,252,0.4)]"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Moon className="h-5 w-5 text-[#7C5CFC] transition-transform duration-300 group-hover:-rotate-12" />
        )}

        {/* Tooltip */}
        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg border border-[#E8E7F0] bg-white px-2.5 py-1 text-xs font-medium text-[#111118] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:border-white/10 dark:bg-[#1B1B1F] dark:text-white">
          {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </span>
      </button>
    </div>
  );
}
