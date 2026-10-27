import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { listPublicBlogPosts } from "@/lib/blog";
import { listPublicRealizations } from "@/lib/realizations-db";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  let blogPosts: MetadataRoute.Sitemap = [];
  let realizations: MetadataRoute.Sitemap = [];

  try {
    blogPosts = listPublicBlogPosts().map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    realizations = listPublicRealizations().map((item) => ({
      url: `${siteConfig.url}/realizacje/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB may be unavailable at build time
  }

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
    {
      url: `${siteConfig.url}/oferta`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/jak-pracujemy`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/opinie`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/kontakt`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/realizacje`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...serviceUrls,
    ...blogPosts,
    ...realizations,
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
