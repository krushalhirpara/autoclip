"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scissors,
  ArrowRight,
  Sparkles,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  Sliders,
  Crop,
  Film,
  Mic,
  Video,
  UserCheck,
  Building2,
  Briefcase,
  BookOpen,
  HelpCircle,
  Flame,
  Newspaper,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const PRODUCT_ITEMS: DropdownItem[] = [
  {
    title: "AI Clipping",
    desc: "Autonomous engaging viral moment detection",
    href: "/features/ai-clipping",
    icon: Scissors,
    badge: "Core",
  },
  {
    title: "AI Captions",
    desc: "Dynamic animated word-by-word subtitles",
    href: "/features/ai-captions",
    icon: FileText,
  },
  {
    title: "Smart Reframe",
    desc: "Intelligent 9:16 vertical speaker tracking",
    href: "/features/smart-reframe",
    icon: Crop,
  },
  {
    title: "AI B-Roll",
    desc: "Context-aware stock visuals & overlays",
    href: "/features/ai-b-roll",
    icon: Film,
  },
  {
    title: "AI Video Editor",
    desc: "Studio timeline trimming & rapid export",
    href: "/features/ai-video-editor",
    icon: Sliders,
  },
];

const SOLUTIONS_ITEMS: DropdownItem[] = [
  {
    title: "Podcasters",
    desc: "Turn 1-hour shows into 15 viral clips",
    href: "/solutions/podcasters",
    icon: Mic,
  },
  {
    title: "YouTubers",
    desc: "Repurpose long videos into Shorts & Reels",
    href: "/solutions/youtubers",
    icon: Video,
  },
  {
    title: "Creators",
    desc: "Daily automated content generation workflows",
    href: "/solutions/creators",
    icon: UserCheck,
  },
  {
    title: "Agencies",
    desc: "Scale multi-client video clipping pipelines",
    href: "/solutions/agencies",
    icon: Building2,
  },
  {
    title: "Businesses",
    desc: "Transform webinars into punchy social clips",
    href: "/solutions/businesses",
    icon: Briefcase,
  },
];

const RESOURCES_ITEMS: DropdownItem[] = [
  {
    title: "Documentation",
    desc: "Architecture, queue workers & API specs",
    href: "/docs",
    icon: BookOpen,
  },
  {
    title: "Help Center",
    desc: "Guides, troubleshooting & developer FAQs",
    href: "/help",
    icon: HelpCircle,
  },
  {
    title: "Examples",
    desc: "Interactive clip showcase & viral breakdowns",
    href: "/examples",
    icon: Flame,
    badge: "New",
  },
  {
    title: "Blog",
    desc: "AI video processing insights & strategies",
    href: "/blog",
    icon: Newspaper,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password";

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for compact sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        // Clean up hash when scrolling back to top
        if (window.location.pathname === "/" && window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setSearchModalOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchModalOpen]);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (section: string) => {
    setMobileExpandedSection((prev) => (prev === section ? null : section));
  };

  const allSearchableItems = [
    ...PRODUCT_ITEMS.map((item) => ({ ...item, category: "Product" })),
    ...SOLUTIONS_ITEMS.map((item) => ({ ...item, category: "Solutions" })),
    ...RESOURCES_ITEMS.map((item) => ({ ...item, category: "Resources" })),
    { title: "Pricing & Plans", desc: "View SaaS credit tiers & subscriptions", href: "/#pricing", icon: Sparkles, category: "Plans" },
    { title: "Security & Compliance", desc: "Data protection & AES-256 encryption", href: "/security", icon: BookOpen, category: "Legal" },
    { title: "Privacy Policy", desc: "GDPR, CCPA & video data privacy", href: "/privacy", icon: BookOpen, category: "Legal" },
  ];

  const filteredSearchItems = searchQuery.trim()
    ? allSearchableItems.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSearchableItems.slice(0, 6);

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/60 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#09090B]/90 transition-colors">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center space-x-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
            aria-label="AutoClipp Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_0_16px_rgba(124,92,252,0.35)] transition-all duration-200 group-hover:scale-105">
              <Scissors className="h-5 w-5 text-white transition-transform group-hover:rotate-12" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111118] dark:text-white">
              Auto<span className="text-[#7C5CFC] dark:text-[#A78BFA]">Clipp</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <span>Back to Home</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 4. TOP ANNOUNCEMENT BAR */}
      <div className="relative border-b border-[#E8E7F0] bg-[#F4F3FF] text-xs text-[#6B6B78] backdrop-blur-md transition-colors dark:border-[#27272A]/40 dark:bg-[#07070A]/95 dark:text-[#A1A1AA]">
        <div className="mx-auto flex h-9.5 items-center justify-center px-4 sm:px-6 max-w-5xl">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7C5CFC]/15 text-[#7C5CFC] dark:bg-[#7C5CFC]/20 dark:text-[#A78BFA]">
              <Sparkles className="h-2.5 w-2.5 animate-pulse" />
            </span>
            <span className="font-medium text-[#111118] dark:text-[#E4E4E7]">
              AI Video Clipping
              <span className="mx-1.5 hidden text-[#A1A1AA] dark:text-[#52525B] sm:inline">•</span>
              <span className="hidden text-[#6B6B78] dark:text-[#A1A1AA] sm:inline">
                Turn Long Videos Into Short-Form Content
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 5. MAIN FLOATING PILL NAVBAR */}
      <div className="relative mx-auto mt-2.5 w-[94%] max-w-5xl sm:mt-3.5 sm:w-[92%]">
        {/* Subtle Purple Glow behind Navbar */}
        <div className="pointer-events-none absolute -top-8 left-1/2 -z-10 h-24 w-3/4 -translate-x-1/2 rounded-full bg-[#7C5CFC]/10 blur-3xl dark:bg-[#7C5CFC]/15" />

        <div
          className={`relative flex items-center justify-between rounded-[22px] px-4 sm:px-6 transition-all duration-300 ${
            isScrolled
              ? "h-14 border border-[#E8E7F0] bg-white/95 text-[#111118] shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#0A0A0C]/95 dark:text-white dark:shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
              : "h-16 border border-[#E8E7F0] bg-white/85 text-[#111118] shadow-[0_8px_30px_rgba(0,0,0,0.06),0_0_20px_rgba(124,92,252,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0F0F14]/85 dark:text-white dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(124,92,252,0.12)]"
          }`}
        >
          {/* 6. LOGO & GLASS BADGE */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  if (window.location.hash) {
                    window.history.pushState(
                      null,
                      "",
                      window.location.pathname + window.location.search
                    );
                  }
                }
              }}
              className="group flex items-center space-x-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
              aria-label="AutoClipp Home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_0_16px_rgba(124,92,252,0.35)] transition-all duration-200 group-hover:scale-105">
                <Scissors className="h-5 w-5 text-white transition-transform group-hover:rotate-12" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#111118] dark:text-white">
                Auto<span className="text-[#7C5CFC] dark:text-[#A78BFA]">Clipp</span>
              </span>
            </Link>

            {/* Redesigned Glass Badge */}
            <div className="hidden items-center gap-1.5 rounded-full border border-[#7C5CFC]/25 bg-[#F4F3FF] px-2.5 py-0.5 text-[11px] font-medium text-[#7C5CFC] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] dark:text-[#A78BFA] sm:inline-flex">
              <Sparkles className="h-2.5 w-2.5 text-[#7C5CFC] dark:text-[#A78BFA]" />
              <span>v1.0 Foundation</span>
            </div>
          </div>

          {/* 7. CENTER NAVIGATION */}
          <nav
            className="hidden items-center space-x-1 lg:flex"
            aria-label="Primary Navigation"
          >
            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("product")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "product" ? null : "product")}
                aria-expanded={activeDropdown === "product"}
                aria-haspopup="true"
                className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeDropdown === "product"
                    ? "bg-[#F4F3FF] text-[#7C5CFC] dark:border dark:border-[#7C5CFC]/40 dark:bg-[#7C5CFC]/20 dark:text-white"
                    : "text-[#6B6B78] hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:bg-[#7C5CFC]/15 dark:hover:text-white"
                }`}
              >
                {activeDropdown === "product" && (
                  <Sparkles className="h-3 w-3 text-[#7C5CFC] dark:text-[#A78BFA]" />
                )}
                <span>Product</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    activeDropdown === "product" ? "rotate-180 text-[#7C5CFC] dark:text-white" : "text-[#9CA3AF] group-hover:text-[#7C5CFC] dark:group-hover:text-white"
                  }`}
                />
              </button>

              {/* Product Glass Dropdown Panel */}
              <div
                className={`absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[#E8E7F0] bg-white/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all duration-200 ease-out dark:border-white/10 dark:bg-[#0E0E14]/95 dark:shadow-[0_16px_40px_rgba(0,0,0,0.8)] ${
                  activeDropdown === "product"
                    ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                    : "pointer-events-none -translate-y-2 opacity-0 scale-95"
                }`}
              >
                <div className="space-y-1">
                  {PRODUCT_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="group flex items-center justify-between rounded-xl p-2.5 transition-all duration-150 hover:bg-[#F4F3FF] dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E7F0] bg-[#F4F3FF] text-[#7C5CFC] transition-colors group-hover:border-[#7C5CFC]/40 group-hover:bg-[#7C5CFC] group-hover:text-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#A78BFA]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#111118] group-hover:text-[#7C5CFC] dark:text-white dark:group-hover:text-white">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-[#6B6B78] leading-tight dark:text-[#A1A1AA]">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        {item.badge && (
                          <span className="rounded-md border border-[#7C5CFC]/30 bg-[#F4F3FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#7C5CFC] dark:bg-[#7C5CFC]/15 dark:text-[#A78BFA]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")}
                aria-expanded={activeDropdown === "solutions"}
                aria-haspopup="true"
                className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeDropdown === "solutions"
                    ? "bg-[#F4F3FF] text-[#7C5CFC] dark:border dark:border-[#7C5CFC]/40 dark:bg-[#7C5CFC]/20 dark:text-white"
                    : "text-[#6B6B78] hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:bg-[#7C5CFC]/15 dark:hover:text-white"
                }`}
              >
                {activeDropdown === "solutions" && (
                  <Sparkles className="h-3 w-3 text-[#7C5CFC] dark:text-[#A78BFA]" />
                )}
                <span>Solutions</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    activeDropdown === "solutions" ? "rotate-180 text-[#7C5CFC] dark:text-white" : "text-[#9CA3AF] group-hover:text-[#7C5CFC] dark:group-hover:text-white"
                  }`}
                />
              </button>

              {/* Solutions Glass Dropdown Panel */}
              <div
                className={`absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[#E8E7F0] bg-white/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all duration-200 ease-out dark:border-white/10 dark:bg-[#0E0E14]/95 dark:shadow-[0_16px_40px_rgba(0,0,0,0.8)] ${
                  activeDropdown === "solutions"
                    ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                    : "pointer-events-none -translate-y-2 opacity-0 scale-95"
                }`}
              >
                <div className="space-y-1">
                  {SOLUTIONS_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="group flex items-center space-x-3 rounded-xl p-2.5 transition-all duration-150 hover:bg-[#F4F3FF] dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E7F0] bg-[#F4F3FF] text-[#7C5CFC] transition-colors group-hover:border-[#7C5CFC]/40 group-hover:bg-[#7C5CFC] group-hover:text-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#A78BFA]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#111118] group-hover:text-[#7C5CFC] dark:text-white dark:group-hover:text-white">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-[#6B6B78] leading-tight dark:text-[#A1A1AA]">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
                aria-expanded={activeDropdown === "resources"}
                aria-haspopup="true"
                className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeDropdown === "resources"
                    ? "bg-[#F4F3FF] text-[#7C5CFC] dark:border dark:border-[#7C5CFC]/40 dark:bg-[#7C5CFC]/20 dark:text-white"
                    : "text-[#6B6B78] hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:bg-[#7C5CFC]/15 dark:hover:text-white"
                }`}
              >
                {activeDropdown === "resources" && (
                  <Sparkles className="h-3 w-3 text-[#7C5CFC] dark:text-[#A78BFA]" />
                )}
                <span>Resources</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    activeDropdown === "resources" ? "rotate-180 text-[#7C5CFC] dark:text-white" : "text-[#9CA3AF] group-hover:text-[#7C5CFC] dark:group-hover:text-white"
                  }`}
                />
              </button>

              {/* Resources Glass Dropdown Panel */}
              <div
                className={`absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[#E8E7F0] bg-white/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all duration-200 ease-out dark:border-white/10 dark:bg-[#0E0E14]/95 dark:shadow-[0_16px_40px_rgba(0,0,0,0.8)] ${
                  activeDropdown === "resources"
                    ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                    : "pointer-events-none -translate-y-2 opacity-0 scale-95"
                }`}
              >
                <div className="space-y-1">
                  {RESOURCES_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="group flex items-center justify-between rounded-xl p-2.5 transition-all duration-150 hover:bg-[#F4F3FF] dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E7F0] bg-[#F4F3FF] text-[#7C5CFC] transition-colors group-hover:border-[#7C5CFC]/40 group-hover:bg-[#7C5CFC] group-hover:text-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#A78BFA]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#111118] group-hover:text-[#7C5CFC] dark:text-white dark:group-hover:text-white">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-[#6B6B78] leading-tight dark:text-[#A1A1AA]">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        {item.badge && (
                          <span className="rounded-md border border-[#7C5CFC]/30 bg-[#F4F3FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#7C5CFC] dark:bg-[#7C5CFC]/15 dark:text-[#A78BFA]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pricing Direct Link */}
            <Link
              href="/#pricing"
              onClick={(e) => handleNavigation(e, "/#pricing")}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#6B6B78] transition-all duration-200 hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:bg-[#7C5CFC]/15 dark:hover:text-white"
            >
              Pricing
            </Link>
          </nav>

          {/* 8. RIGHT SIDE: Search, Sign In & Get Started CTA */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search features and docs (Cmd+K)"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E7F0] bg-white text-[#6B6B78] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#7C5CFC] hover:bg-[#F4F3FF] hover:text-[#7C5CFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#A1A1AA] dark:hover:border-[#7C5CFC]/40 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Search className="h-[17px] w-[17px]" />
            </button>

            {/* Sign In (Text-only) */}
            <Link
              href="/login"
              onClick={(e) => handleNavigation(e, "/login")}
              className="hidden text-xs font-semibold text-[#111118] transition-colors hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:text-white sm:inline-block px-2"
            >
              Sign In
            </Link>

            {/* Get Started CTA */}
            <Link
              href="/signup"
              onClick={(e) => handleNavigation(e, "/signup")}
              className="group relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(124,92,252,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(124,92,252,0.55)] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E7F0] bg-white text-[#111118] shadow-sm backdrop-blur-md transition-colors hover:bg-[#F4F3FF] lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="mt-2.5 w-full rounded-3xl border border-[#E8E7F0] bg-white/95 p-5 shadow-xl backdrop-blur-2xl lg:hidden dark:border-white/10 dark:bg-[#0F0F14]/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {/* Product Accordion */}
              <div className="rounded-2xl border border-[#E8E7F0] bg-[#F8F9FC] p-2 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("product")}
                  className="flex w-full items-center justify-between px-2 py-2 text-sm font-semibold text-[#111118] dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Scissors className="h-4 w-4 text-[#7C5CFC]" />
                    <span>Product</span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-[#6B6B78] transition-transform duration-200 ${
                      mobileExpandedSection === "product" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "product" && (
                  <div className="mt-1 space-y-1 border-t border-[#E8E7F0] pt-2 dark:border-white/[0.06]">
                    {PRODUCT_ITEMS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-[#6B6B78] hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:bg-white/[0.06] dark:hover:text-white"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="h-3 w-3 opacity-50" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions Accordion */}
              <div className="rounded-2xl border border-[#E8E7F0] bg-[#F8F9FC] p-2 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("solutions")}
                  className="flex w-full items-center justify-between px-2 py-2 text-sm font-semibold text-[#111118] dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-[#7C5CFC]" />
                    <span>Solutions</span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-[#6B6B78] transition-transform duration-200 ${
                      mobileExpandedSection === "solutions" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "solutions" && (
                  <div className="mt-1 space-y-1 border-t border-[#E8E7F0] pt-2 dark:border-white/[0.06]">
                    {SOLUTIONS_ITEMS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-[#6B6B78] hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:bg-white/[0.06] dark:hover:text-white"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="h-3 w-3 opacity-50" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Accordion */}
              <div className="rounded-2xl border border-[#E8E7F0] bg-[#F8F9FC] p-2 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("resources")}
                  className="flex w-full items-center justify-between px-2 py-2 text-sm font-semibold text-[#111118] dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#7C5CFC]" />
                    <span>Resources</span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-[#6B6B78] transition-transform duration-200 ${
                      mobileExpandedSection === "resources" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "resources" && (
                  <div className="mt-1 space-y-1 border-t border-[#E8E7F0] pt-2 dark:border-white/[0.06]">
                    {RESOURCES_ITEMS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-[#6B6B78] hover:bg-[#F4F3FF] hover:text-[#7C5CFC] dark:text-[#A1A1AA] dark:hover:bg-white/[0.06] dark:hover:text-white"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="h-3 w-3 opacity-50" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Direct Pricing Link */}
              <Link
                href="/#pricing"
                onClick={(e) => handleNavigation(e, "/#pricing")}
                className="flex items-center justify-between rounded-2xl border border-[#E8E7F0] bg-[#F8F9FC] px-4 py-3 text-sm font-semibold text-[#111118] hover:bg-[#F4F3FF] dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-white dark:hover:bg-white/[0.06]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#7C5CFC]" />
                  <span>Pricing</span>
                </span>
                <ChevronRight className="h-4 w-4 text-[#6B6B78]" />
              </Link>
            </div>

            {/* Mobile Bottom CTAs */}
            <div className="mt-5 space-y-2.5 border-t border-[#E8E7F0] pt-4 dark:border-white/10">
              <Button
                variant="outline"
                className="w-full justify-center rounded-2xl border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                asChild
              >
                <Link href="/login" onClick={(e) => handleNavigation(e, "/login")}>
                  Sign In
                </Link>
              </Button>
              <Button
                className="w-full justify-center rounded-2xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] text-white shadow-md"
                asChild
              >
                <Link href="/signup" onClick={(e) => handleNavigation(e, "/signup")}>
                  Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* QUICK SEARCH & COMMAND MODAL (Cmd+K) */}
      {searchModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick Search"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-[#E8E7F0] bg-white/95 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/15 dark:bg-[#0F0F14]/95 dark:shadow-[0_24px_60px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-[#E8E7F0] pb-3 px-2 dark:border-white/10">
              <Search className="h-5 w-5 text-[#7C5CFC] dark:text-[#A78BFA]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI features, solutions, docs, pricing..."
                className="w-full bg-transparent text-sm text-[#111118] placeholder-[#9CA3AF] focus:outline-none dark:text-white dark:placeholder-[#71717A]"
              />
              <div className="flex items-center gap-1 rounded-md border border-[#E8E7F0] bg-[#F4F3FF] px-1.5 py-0.5 text-[10px] font-mono text-[#7C5CFC] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#A1A1AA]">
                <Command className="h-3 w-3" />
                <span>ESC</span>
              </div>
            </div>

            {/* Search Results */}
            <div className="mt-3 max-h-72 space-y-1 overflow-y-auto pr-1">
              {filteredSearchItems.length > 0 ? (
                filteredSearchItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setSearchModalOpen(false)}
                      className="group flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-[#F4F3FF] dark:hover:bg-white/[0.08]"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E7F0] bg-[#F4F3FF] text-[#7C5CFC] group-hover:bg-[#7C5CFC] group-hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#A78BFA]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#111118] dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#6B6B78] dark:text-[#A1A1AA]">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <span className="rounded-md border border-[#E8E7F0] bg-[#F4F3FF] px-2 py-0.5 text-[10px] font-mono text-[#7C5CFC] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#71717A]">
                        {item.category}
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-[#6B6B78] dark:text-[#71717A]">
                  No matching features or resources found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
