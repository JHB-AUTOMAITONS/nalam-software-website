import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { products, routes, siteConfig } from "@/lib/constants";

const solutionLinks = [
  { label: "All Solutions", href: routes.solutions },
  { label: products.hms.fullName, href: products.hms.landingSlug },
  { label: products.lms.fullName, href: products.lms.landingSlug },
  { label: products.cms.fullName, href: products.cms.landingSlug },
  { label: "Custom Healthcare Software", href: routes.customSolutions },
];

const companyLinks = [
  { label: "About", href: routes.about },
  { label: "Blog", href: routes.blog },
  { label: "Contact", href: routes.contact },
];

// The FAQ lives only on the homepage, so this intentionally stays an in-page anchor.
const resourceLinks = [{ label: "FAQ", href: "/#faq" }];

const legalLinks = [
  { label: "Terms and Conditions", href: routes.terms },
  { label: "Privacy Policy", href: routes.privacy },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-teal-500/15 bg-white/70 text-navy-800 backdrop-blur-md">
      <Container className="grid grid-cols-1 gap-5 py-9 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-4 lg:py-20">
        <div className="flex flex-col gap-3 sm:col-span-2 sm:gap-4 lg:col-span-1">
          <Link href="/" className="flex items-center">
            <Logo className="h-9 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-slate-600">
            Smart healthcare software for hospitals, laboratories &amp; clinics.
          </p>
        </div>

        <nav aria-label="Solutions">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-emerald-onlight">
            Solutions
          </h2>
          <ul className="mt-2.5 flex flex-col gap-2 sm:mt-5 sm:gap-3">
            {solutionLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 transition-colors hover:text-navy-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-emerald-onlight">
            Company
          </h2>
          <ul className="mt-2.5 flex flex-col gap-2 sm:mt-5 sm:gap-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 transition-colors hover:text-navy-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 transition-colors hover:text-navy-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-emerald-onlight">
            Contact
          </h2>
          <ul className="mt-2.5 flex flex-col gap-2.5 text-sm text-slate-600 sm:mt-5 sm:gap-3">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="[overflow-wrap:anywhere] transition-colors hover:text-navy-950"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="transition-colors hover:text-navy-950"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="[overflow-wrap:anywhere]">{siteConfig.contact.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-navy-900/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-center sm:gap-3 sm:py-6 text-xs text-slate-500 lg:flex-row lg:text-left">
          <p>
            © {year} Nalam Software. All rights reserved.{" "}
            <span className="text-slate-500/70">A Thukal Innovatives LLP company.</span>
          </p>
          <p>Hospital, Laboratory &amp; Clinic Management Software</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-navy-950">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
