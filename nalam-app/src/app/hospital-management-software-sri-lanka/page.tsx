import type { Metadata } from "next";
import { CountryLandingPage } from "@/components/sections/CountryLandingPage";
import { countryPages } from "@/lib/country-pages";
import { buildMetadata } from "@/lib/seo";

const page = countryPages["sri-lanka"];

export const metadata: Metadata = buildMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
  absoluteTitle: true,
  keywords: [page.primaryKeyword, ...page.relatedKeywords],
});

export default function HospitalManagementSoftwareSriLankaPage() {
  return <CountryLandingPage page={page} />;
}
