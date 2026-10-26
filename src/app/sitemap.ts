import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls = services
    .filter((s) => s.href.startsWith("/") && !s.href.includes("#"))
    .map((s) => ({
      url: `${siteConfig.url}${s.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceUrls,
    {
      url: `${siteConfig.url}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
