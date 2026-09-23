import type { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  /**
   * When true, the page title is emitted as `{ absolute: title }` so the root
   * layout's `%s | Nalam Software` template is NOT appended. Use this for
   * pages whose title already carries the brand (e.g. "Hospital Management
   * System | Nalam"). Defaults to false to keep existing pages unchanged.
   */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
