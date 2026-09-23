import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { formatPostDate, getBlogPosts, type BlogPost } from "@/lib/blog";
import { routes } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Healthcare Software Blog | Nalam Software",
  description:
    "Insights on hospital, laboratory and clinic management software from the Nalam team. New articles are on the way.",
  path: routes.blog,
  absoluteTitle: true,
});

const breadcrumbs = [
  { name: "Home", path: routes.home },
  { name: "Blog", path: routes.blog },
];

const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-surface group flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-ice-500/35 hover:shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate-500">
        {post.category ? <span className="text-emerald-onlight">{post.category}</span> : null}
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      </div>
      <h2 className="font-display text-xl font-medium leading-snug text-navy-950">
        <Link href={`${routes.blog}/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {post.title}
        </Link>
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">{post.description}</p>
      <span className="mt-auto pt-2 text-sm font-semibold text-navy-950 transition-colors group-hover:text-emerald-onlight">
        Read article
      </span>
    </article>
  );
}

function EmptyState() {
  return (
    <RevealOnScroll className="glass-surface-strong mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[28px] border border-ice-500/20 p-6 text-center shadow-glass backdrop-blur-md sm:p-10">
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-emerald-onlight ring-1 ring-inset ring-teal-500/25"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 4h10l4 4v12H5z M15 4v4h4 M8 12h8 M8 16h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="text-balance font-display text-2xl font-medium text-navy-950 sm:text-3xl">
        Posts Are Coming Soon
      </h2>
      <p className="text-balance text-base leading-relaxed text-slate-600">
        We&apos;re preparing articles on hospital, laboratory and clinic management software. Stay
        tuned — in the meantime, explore our solutions or talk to our team.
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button href={routes.solutions} size="lg" variant="primary" className="w-full sm:w-auto">
          Explore Our Solutions
        </Button>
        <Button href={routes.contact} size="lg" variant="secondary" className="w-full sm:w-auto">
          Talk to Our Team
        </Button>
      </div>
    </RevealOnScroll>
  );
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageBackdrop />

      <PageHero breadcrumbs={breadcrumbs} eyebrow="Blog" title="Healthcare Software Insights">
        <p className="text-balance">
          Articles from the Nalam team on running hospitals, laboratories and clinics with
          connected healthcare management software.
        </p>
      </PageHero>

      <section className={sectionClass}>
        <Container>
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug} className="relative min-w-0">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
