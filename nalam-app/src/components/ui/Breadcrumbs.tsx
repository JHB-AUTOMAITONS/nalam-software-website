import Link from "next/link";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { Container } from "./Container";

interface BreadcrumbsProps {
  items: { name: string; path: string }[];
  /**
   * "bar" (default) renders the full-width strip used by About/Contact.
   * "inline" renders just the trail, for placing inside a page hero below
   * the fixed header (used by the solution, custom, blog and legal pages).
   */
  variant?: "bar" | "inline";
  className?: string;
}

function BreadcrumbTrail({ items }: Pick<BreadcrumbsProps, "items">) {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
      {items.map((item, index) => (
        <li key={item.path} className="flex min-w-0 items-center gap-2">
          {index > 0 ? <span aria-hidden>/</span> : null}
          {index === items.length - 1 ? (
            <span className="font-medium text-navy-800 [overflow-wrap:anywhere]" aria-current="page">
              {item.name}
            </span>
          ) : (
            <Link href={item.path} className="hover:text-emerald-onlight">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Breadcrumbs({ items, variant = "bar", className = "" }: BreadcrumbsProps) {
  if (variant === "inline") {
    return (
      <nav aria-label="Breadcrumb" className={className}>
        <JsonLd data={buildBreadcrumbSchema(items)} />
        <BreadcrumbTrail items={items} />
      </nav>
    );
  }

  return (
    <div className={`border-b border-mist-200 bg-mist-50 ${className}`}>
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <Container>
        <nav aria-label="Breadcrumb" className="py-3">
          <BreadcrumbTrail items={items} />
        </nav>
      </Container>
    </div>
  );
}
