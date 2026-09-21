import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/constants";

const solutionLinks = [
  { label: "Nalam Hospital Management System", href: "/#hms" },
  { label: "Nalam Lab Management System", href: "/#lms" },
  { label: "Nalam Clinic Management System", href: "/#cms" },
  { label: "Custom Healthcare Solutions", href: "/#customization" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [{ label: "FAQ", href: "/#faq" }];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-teal-400/15 bg-navy-950/70 text-mist-100 backdrop-blur-md">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center">
            <Logo className="h-9 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-mist-100/70">
            Smart healthcare software for hospitals, laboratories &amp; clinics.
          </p>
        </div>

        <nav aria-label="Solutions">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-teal-400">
            Solutions
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {solutionLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-mist-100/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-teal-400">
            Company
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-mist-100/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-mist-100/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-teal-400">
            Contact
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-mist-100/75">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>{siteConfig.contact.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-mist-100/60 sm:flex-row">
          <p>
            © {year} Nalam Software. All rights reserved.{" "}
            <span className="text-mist-100/45">A Thukal Innovatives LLP company.</span>
          </p>
          <p>Hospital, Laboratory &amp; Clinic Management Software</p>
        </Container>
      </div>
    </footer>
  );
}
