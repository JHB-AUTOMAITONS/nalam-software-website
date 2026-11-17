import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { pharmacyPagePath } from "@/lib/pharmacy-page-content";

interface PharmacyLinkCalloutProps {
  /** Short sentence shown before the link. */
  lead: string;
  /** Anchor text for the link to the pharmacy landing page. */
  anchor: string;
}

/** Small contextual pointer to the Pharmacy Management System page. */
export function PharmacyLinkCallout({ lead, anchor }: PharmacyLinkCalloutProps) {
  return (
    <section className="relative border-t border-teal-500/15 bg-white/40 py-6 backdrop-blur-sm">
      <Container>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          {lead}{" "}
          <Link
            href={pharmacyPagePath}
            className="font-medium text-navy-950 underline underline-offset-4 hover:text-emerald-onlight"
          >
            {anchor}
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
