import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/lib/constants";

interface RelatedArticle {
  title: string;
  description: string;
  slug: string;
}

interface RelatedArticlesSectionProps {
  title: string;
  description: string;
  articles: RelatedArticle[];
}

/** Sitewide section rhythm — matches SolutionPageTemplate's sectionClass. */
const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

/** Links a solution page to its supporting blog articles. */
export function RelatedArticlesSection({ title, description, articles }: RelatedArticlesSectionProps) {
  return (
    <section className={sectionClass}>
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow="From the Blog" title={title} description={description} />

        <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          {articles.map((article) => (
            <li key={article.slug} className="min-w-0">
              <Link
                href={`${routes.blog}/${article.slug}`}
                className="glass-surface group flex h-full min-w-0 flex-col gap-2 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-ice-500/35 hover:shadow-soft sm:p-6"
              >
                <h3 className="font-display text-lg font-medium leading-snug text-navy-950">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{article.description}</p>
                <span className="mt-auto pt-2 text-sm font-semibold text-navy-950 transition-colors group-hover:text-emerald-onlight">
                  Read article
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
