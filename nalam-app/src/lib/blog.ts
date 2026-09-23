/**
 * Blog data layer.
 *
 * ARCHITECTURE ONLY — there are intentionally no posts yet. `/blog` renders a
 * "coming soon" empty state while `getBlogPosts()` returns an empty list, and
 * `/blog/[slug]` calls `notFound()` for every slug while `getBlogPost()`
 * returns `undefined`.
 *
 * To publish real posts later, replace the body of `loadPosts()` with one of:
 *   - a headless CMS fetch (e.g. Sanity/Contentful/Strapi) mapped to `BlogPost`,
 *   - MDX/Markdown files read from a `content/blog` folder at build time, or
 *   - a hand-maintained array of `BlogPost` objects.
 * Everything downstream (listing page, article template, sitemap entries,
 * Article JSON-LD, metadata) already consumes these functions, so no other
 * file needs to change. Do NOT add placeholder/sample posts here — anything
 * returned from this module is published and indexed.
 */

/** Structured article body. Swap for MDX/rich text if the CMS provides it. */
export type BlogContentBlock =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export interface BlogPost {
  /** URL segment: /blog/{slug} */
  slug: string;
  title: string;
  /** Used for the meta description and listing excerpt (~150 chars). */
  description: string;
  /** ISO 8601 date, e.g. "2026-10-01". */
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; type?: "Person" | "Organization" };
  category?: string;
  readingTimeMinutes?: number;
  /** Optional cover image in /public. `alt` must describe the image. */
  coverImage?: { src: string; alt: string; width: number; height: number };
  content: BlogContentBlock[];
}

async function loadPosts(): Promise<BlogPost[]> {
  // Real post data plugs in here (CMS fetch, MDX loader, etc.).
  return [];
}

/** All published posts, newest first. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await loadPosts();
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** A single post by slug, or `undefined` if it doesn't exist. */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await loadPosts();
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
