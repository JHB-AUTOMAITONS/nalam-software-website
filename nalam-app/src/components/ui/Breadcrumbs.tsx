import Link from "next/link";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { Container } from "./Container";

interface BreadcrumbsProps {
  items: { name: string; path: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="border-b border-mist-200 bg-mist-50">
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <Container>
        <nav aria-label="Breadcrumb" className="py-3">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {items.map((item, index) => (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden>/</span> : null}
                {index === items.length - 1 ? (
                  <span className="font-medium text-navy-800" aria-current="page">
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
        </nav>
      </Container>
    </div>
  );
}
