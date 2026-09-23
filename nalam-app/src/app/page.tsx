import type { Metadata } from "next";
import { GlobalVideoBackground } from "@/components/sections/GlobalVideoBackground";
import { Hero } from "@/components/sections/Hero";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { CustomizationSection } from "@/components/sections/CustomizationSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { KKAiSection } from "@/components/sections/KKAiSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { RequirementsSection } from "@/components/sections/RequirementsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { buildAllProductsSchema, buildFaqSchema } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Healthcare Management Software | Nalam Software",
  description:
    "Nalam Software provides healthcare management software and healthcare software solutions for hospitals, laboratories and clinics, with customizable workflows and connected healthcare technology.",
  path: "/",
  absoluteTitle: true,
  keywords: [
    "Healthcare Management Software",
    "Healthcare Management System",
    "Healthcare Software Company",
    "Healthcare Software Solutions",
    "Custom Healthcare Software",
    "Custom Healthcare Solutions",
    "Nalam Software",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[...buildAllProductsSchema(), buildFaqSchema()]} />
      <GlobalVideoBackground />

      <Hero />
      <ProductsOverview />
      <CustomizationSection />
      <FeatureGrid />
      <KKAiSection />
      <ClientsSection />
      <RequirementsSection />
      <FinalCta />
      <FaqSection />
    </>
  );
}
