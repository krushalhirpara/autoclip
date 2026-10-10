import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://autoclipp.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/profile",
          "/settings",
          "/scheduler",
          "/publishing",
          "/automation",
          "/api/",
          "/control-center-2807",
          "/control-center-2807/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
