import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.autoclipp.com";
  const lastModified = new Date();

  interface SitemapEntry {
    route: string;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
  }

  const publicRoutes: SitemapEntry[] = [
    { route: "", changeFrequency: "daily", priority: 1.0 },
    { route: "/get-started", changeFrequency: "weekly", priority: 0.95 },
    { route: "/pricing", changeFrequency: "weekly", priority: 0.9 },
    
    // Core Features
    { route: "/features/ai-clipping", changeFrequency: "weekly", priority: 0.85 },
    { route: "/features/ai-captions", changeFrequency: "weekly", priority: 0.85 },
    { route: "/features/smart-reframe", changeFrequency: "weekly", priority: 0.85 },
    { route: "/features/ai-b-roll", changeFrequency: "weekly", priority: 0.8 },
    { route: "/features/ai-video-editor", changeFrequency: "weekly", priority: 0.8 },
    { route: "/features/ai-clip-scoring", changeFrequency: "weekly", priority: 0.8 },
    { route: "/features/ai-transcription", changeFrequency: "weekly", priority: 0.8 },
    { route: "/features/brand-kit", changeFrequency: "weekly", priority: 0.75 },
    { route: "/features/export-rendering", changeFrequency: "weekly", priority: 0.75 },

    // Audience Solutions
    { route: "/solutions/creators", changeFrequency: "weekly", priority: 0.8 },
    { route: "/solutions/podcasters", changeFrequency: "weekly", priority: 0.8 },
    { route: "/solutions/youtubers", changeFrequency: "weekly", priority: 0.8 },
    { route: "/solutions/agencies", changeFrequency: "weekly", priority: 0.75 },
    { route: "/solutions/businesses", changeFrequency: "weekly", priority: 0.75 },

    // Resources & Educational
    { route: "/blog", changeFrequency: "weekly", priority: 0.75 },
    { route: "/docs", changeFrequency: "weekly", priority: 0.7 },
    { route: "/examples", changeFrequency: "weekly", priority: 0.7 },
    { route: "/help", changeFrequency: "weekly", priority: 0.65 },
    { route: "/health", changeFrequency: "weekly", priority: 0.5 },

    // Authentication
    { route: "/login", changeFrequency: "monthly", priority: 0.5 },
    { route: "/signup", changeFrequency: "monthly", priority: 0.6 },
    { route: "/forgot-password", changeFrequency: "monthly", priority: 0.3 },

    // Legal & Security
    { route: "/privacy", changeFrequency: "monthly", priority: 0.4 },
    { route: "/terms", changeFrequency: "monthly", priority: 0.4 },
    { route: "/refund", changeFrequency: "monthly", priority: 0.4 },
    { route: "/cookies", changeFrequency: "monthly", priority: 0.3 },
    { route: "/security", changeFrequency: "monthly", priority: 0.4 },
    { route: "/dmca", changeFrequency: "monthly", priority: 0.3 },
  ];

  return publicRoutes.map((entry) => ({
    url: `${baseUrl}${entry.route}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
