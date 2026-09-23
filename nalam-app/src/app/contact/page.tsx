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
  title: "Contact",
  description:
    "Talk to the Nalam Software team about hospital management software, laboratory management software or clinic management software, or share your custom healthcare requirements.",
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

      <section className="bg-[#F5F8F6] pt-24 pb-6 xs:pt-26 sm:pt-32 sm:pb-8 lg:pt-36">
        <Container>
          <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center sm:gap-5">
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              Talk to Our Team
            </h1>
            <p className="text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              Tell us about your hospital, laboratory or clinic and we&apos;ll
              help you find the right Nalam system — or design a connected
              combination around your requirements.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-mist-50 py-8 sm:py-12 lg:py-14">
        <Container className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <RevealOnScroll className="flex min-w-0 flex-col gap-6 sm:gap-8">
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
              <p className="mt-1 text-sm text-slate-600 [overflow-wrap:anywhere]">{siteConfig.contact.address}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="flex min-w-0 flex-col">
            <SectionHeading
              align="left"
              title="Send Your Requirements"
              description="Share a few details and our team will follow up with next steps."
              className="mb-6 sm:mb-8"
            />
            <RequirementsForm />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
