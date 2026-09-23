import { faqs, siteConfig, products, type Product } from "./constants";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.address,
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function buildSoftwareApplicationSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.fullName,
    applicationCategory: "HealthApplication",
    applicationSubCategory: product.eyebrow,
    operatingSystem: "Web",
    description: product.description,
    url: `${siteConfig.url}${product.landingSlug}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    featureList: product.features.map((feature) => feature.title),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Pricing available on request based on organization requirements.",
      },
    },
  };
}

export function buildAllProductsSchema() {
  return Object.values(products).map((product) => buildSoftwareApplicationSchema(product));
}

export function buildFaqSchema(items: { question: string; answer: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorType?: "Person" | "Organization";
  image?: string;
}

/** BlogPosting schema for /blog/[slug] pages. */
export function buildArticleSchema(article: ArticleSchemaInput) {
  const url = `${siteConfig.url}${article.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": article.authorType ?? "Organization", name: article.authorName },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    ...(article.image ? { image: new URL(article.image, siteConfig.url).toString() } : {}),
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
