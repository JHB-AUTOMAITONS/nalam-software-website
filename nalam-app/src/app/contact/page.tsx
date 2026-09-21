import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { RequirementsForm } from "@/components/sections/RequirementsForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Nalam Software",
  description:
    "Talk to the Nalam Software team about hospital management software, lab management software or clinic management software, or share your custom healthcare requirements.",
  path: "/contact",
});

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-navy-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container>
          <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl">
              Talk to Our Team
            </h1>
            <p className="text-balance text-base leading-relaxed text-mist-100/80 sm:text-lg">
              Tell us about your hospital, laboratory or clinic and we&apos;ll
              help you find the right Nalam system — or design a connected
              combination around your requirements.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-mist-50 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <RevealOnScroll className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-xl font-medium text-navy-950">Email</h2>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-1 inline-block text-sm text-emerald-onlight hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-navy-950">Phone</h2>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="mt-1 inline-block text-sm text-emerald-onlight hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-navy-950">Location</h2>
              <p className="mt-1 text-sm text-slate-600">{siteConfig.contact.address}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.1}
            className="rounded-[28px] border border-mist-200 bg-white p-6 shadow-elevated sm:p-10"
          >
            <SectionHeading
              align="left"
              title="Send Your Requirements"
              description="Share a few details and our team will follow up with next steps."
              className="mb-8"
            />
            <RequirementsForm />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
