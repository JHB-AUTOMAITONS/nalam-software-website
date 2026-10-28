import type { Metadata } from "next";
import { CountryLandingPage } from "@/components/sections/CountryLandingPage";
import { countryPages } from "@/lib/country-pages";
import { buildMetadata } from "@/lib/seo";

const page = countryPages["nigeria"];

export const metadata: Metadata = buildMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
  absoluteTitle: true,
  keywords: [page.primaryKeyword, ...page.relatedKeywords],
});

export default function HospitalManagementSoftwareNigeriaPage() {
  return <CountryLandingPage page={page} />;
}
