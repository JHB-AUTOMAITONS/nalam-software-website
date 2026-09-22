import type { Metadata } from "next";
import { GlobalVideoBackground } from "@/components/sections/GlobalVideoBackground";
import { Hero } from "@/components/sections/Hero";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { CustomizationSection } from "@/components/sections/CustomizationSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WhyNalam } from "@/components/sections/WhyNalam";
import { KKAiSection } from "@/components/sections/KKAiSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { RequirementsSection } from "@/components/sections/RequirementsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { buildAllProductsSchema, buildFaqSchema } from "@/lib/structured-data";
import { products } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nalam Software | Hospital, Lab & Clinic Management Software",
  description:
    "Nalam Software provides modern hospital, laboratory and clinic management software with connected workflows, customization and intelligent healthcare solutions.",
  path: "/",
  keywords: [
    "Nalam Software",
    "hospital management software",
    "lab management software",
    "laboratory management software",
    "clinic management software",
    "healthcare management software",
    "hospital and lab management software",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[...buildAllProductsSchema(), buildFaqSchema()]} />
      <GlobalVideoBackground />

      <Hero />
      <ProductsOverview />
      <ProductDetail product={products.lms} index={1} />
      <ProductDetail product={products.hms} index={2} reverse />
      <ProductDetail product={products.cms} index={3} />
      <CustomizationSection />
      <FeatureGrid />
      <WhyNalam />
      <KKAiSection />
      <ClientsSection />
      <RequirementsSection />
      <FinalCta />
      <FaqSection />
    </>
  );
}
