import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://autoclipp.com";
  const lastModified = new Date();

  const publicRoutes = [
    "",
    "/pricing",
    "/health",
    "/features/ai-clipping",
    "/features/ai-captions",
    "/features/smart-reframe",
    "/features/ai-b-roll",
    "/features/ai-video-editor",
    "/solutions/podcasters",
    "/solutions/youtubers",
    "/solutions/creators",
    "/solutions/agencies",
    "/solutions/businesses",
    "/docs",
    "/help",
    "/examples",
    "/blog",
    "/login",
    "/signup",
    "/privacy",
    "/terms",
    "/refund",
    "/cookies",
    "/security",
    "/dmca",
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/features") || route.startsWith("/solutions") ? 0.8 : 0.6,
  }));
}
