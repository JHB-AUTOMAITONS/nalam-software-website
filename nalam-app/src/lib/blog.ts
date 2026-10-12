/**
 * Blog data layer.
 *
 * Posts live in `src/lib/blog-posts/*.ts` (one file per article, each exporting
 * a `BlogPost`) and are registered in `loadPosts()` below. `/blog` renders a
 * "coming soon" empty state whenever the list is empty, and `/blog/[slug]`
 * calls `notFound()` for any slug that is not registered. Listing page,
 * article template, sitemap entries, Article/FAQ JSON-LD and metadata all
 * consume these functions, so publishing a post only means adding a file and
 * registering it here.
 *
 * Do NOT add placeholder/sample posts — anything returned from this module is
 * published and indexed. To move to a headless CMS or MDX later, replace the
 * body of `loadPosts()`.
 */

import { clinicAppointmentSchedulingSoftware } from "./blog-posts/clinic-appointment-scheduling-software";
import { clinicPatientRecordsAndBilling } from "./blog-posts/clinic-patient-records-and-billing";
import { hospitalManagementSoftwareFeatures } from "./blog-posts/hospital-management-software-features";
import { hospitalPatientFlowManagement } from "./blog-posts/hospital-patient-flow-management";
import { labManagementSoftwareKeyFeatures } from "./blog-posts/lab-management-software-key-features";
import { laboratoryManagementSystemKeyFeatures } from "./blog-posts/laboratory-management-system-key-features";

/** Structured article body. Swap for MDX/rich text if the CMS provides it. */
export type BlogContentBlock =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  /** `text` may contain internal links written as `[anchor text](/path)`. */
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export interface BlogPost {
  /** URL segment: /blog/{slug} */
  slug: string;
  /** Article H1. */
  title: string;
  /** Used for the meta description and listing excerpt (~150 chars). */
  description: string;
  /** Optional <title> override (full title, brand suffix not appended). Defaults to `{title} | Nalam Blog`. */
  seoTitle?: string;
  /** Optional meta description override. Defaults to `description`. */
  metaDescription?: string;
  /** Main keyword the article targets (SEO bookkeeping; also first entry of the keywords meta tag). */
  primaryKeyword?: string;
  /** Related terms emitted in the keywords meta tag. */
  secondaryKeywords?: string[];
  /** ISO 8601 date, e.g. "2026-10-01". */
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; type?: "Person" | "Organization" };
  category?: string;
  readingTimeMinutes?: number;
  /** Optional cover image in /public. `alt` must describe the image. */
  coverImage?: { src: string; alt: string; width: number; height: number };
  content: BlogContentBlock[];
  /**
   * Optional FAQ rendered as a final "FAQs" section (H2 + H3 questions) and
   * emitted as FAQPage JSON-LD. Answers must be plain text (no links).
   */
  faqs?: { question: string; answer: string }[];
}

async function loadPosts(): Promise<BlogPost[]> {
  return [
    laboratoryManagementSystemKeyFeatures,
    labManagementSoftwareKeyFeatures,
    hospitalPatientFlowManagement,
    hospitalManagementSoftwareFeatures,
    clinicAppointmentSchedulingSoftware,
    clinicPatientRecordsAndBilling,
  ];
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
