import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { products, routes, siteConfig } from "@/lib/constants";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Static public routes. /api/* is intentionally excluded.
  const staticRoutes: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
    { path: routes.home, priority: 1, changeFrequency: "weekly" },
    { path: routes.solutions, priority: 0.9, changeFrequency: "monthly" },
    { path: products.hms.landingSlug, priority: 0.9, changeFrequency: "monthly" },
    { path: products.lms.landingSlug, priority: 0.9, changeFrequency: "monthly" },
    { path: products.cms.landingSlug, priority: 0.9, changeFrequency: "monthly" },
    { path: routes.customSolutions, priority: 0.8, changeFrequency: "monthly" },
    { path: routes.about, priority: 0.6, changeFrequency: "monthly" },
    { path: routes.contact, priority: 0.7, changeFrequency: "monthly" },
    { path: routes.blog, priority: 0.5, changeFrequency: "weekly" },
    { path: routes.terms, priority: 0.3, changeFrequency: "yearly" },
    { path: routes.privacy, priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts: getBlogPosts() currently returns [] (no posts yet), so this
  // adds nothing today. Once real posts are wired into src/lib/blog.ts they
  // appear here automatically with their own lastModified dates.
  const posts = await getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`${routes.blog}/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
