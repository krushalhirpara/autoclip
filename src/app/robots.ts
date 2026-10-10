import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.autoclipp.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/profile",
          "/profile/",
          "/settings",
          "/settings/",
          "/projects",
          "/projects/",
          "/editor",
          "/editor/",
          "/uploads",
          "/uploads/",
          "/clips",
          "/clips/",
          "/automation",
          "/automation/",
          "/scheduler",
          "/scheduler/",
          "/publishing",
          "/publishing/",
          "/control-center-2807",
          "/control-center-2807/",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
