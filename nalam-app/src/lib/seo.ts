import type { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
}: PageMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title,
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
