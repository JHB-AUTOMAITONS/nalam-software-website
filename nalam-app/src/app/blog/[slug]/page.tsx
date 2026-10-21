import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { formatPostDate, getBlogPost, getBlogPosts, type BlogContentBlock } from "@/lib/blog";
import { routes } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { buildArticleSchema, buildFaqSchema } from "@/lib/structured-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render every known post at build time. While `getBlogPosts()` returns
 * no posts this yields no pages, and any /blog/{slug} request resolves to a
 * 404 via `notFound()` below.
 */
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const keywords = [post.primaryKeyword, ...(post.secondaryKeywords ?? [])].filter(
    (keyword): keyword is string => Boolean(keyword)
  );

  return buildMetadata({
    title: post.seoTitle ?? `${post.title} | Nalam Blog`,
    description: post.metaDescription ?? post.description,
    path: `${routes.blog}/${post.slug}`,
    keywords: keywords.length > 0 ? keywords : undefined,
    ogImage: post.coverImage?.src,
    absoluteTitle: true,
  });
}

const inlineLinkClass = "font-medium text-emerald-onlight underline underline-offset-4 hover:text-navy-950";

/**
 * Renders paragraph text, turning `[anchor](/internal-path)` into a Next.js
 * <Link> and `[anchor](https://…)` into an external link that opens in a new
 * tab. Anything else stays plain text.
 */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      match[2].startsWith("/") ? (
        <Link key={`${match[2]}-${match.index}`} href={match[2]} className={inlineLinkClass}>
          {match[1]}
        </Link>
      ) : (
        <a
          key={`${match[2]}-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLinkClass}
        >
          {match[1]}
        </a>
      )
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function ArticleBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 id={block.id} className="scroll-mt-32 pt-4 font-display text-2xl font-medium leading-tight text-navy-950 sm:text-3xl">
          {block.text}
        </h2>
      ) : (
        <h3 id={block.id} className="scroll-mt-32 pt-2 font-display text-xl font-medium leading-snug text-navy-950">
          {block.text}
        </h3>
      );
    case "paragraph":
      return <p>{renderInline(block.text)}</p>;
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className={`flex flex-col gap-2 pl-5 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-emerald-onlight`}>
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ListTag>
      );
    }
    case "quote":
      return (
        <blockquote className="rounded-2xl border-l-2 border-teal-500/50 bg-teal-500/[0.05] px-5 py-4 font-display text-lg text-navy-950">
          <p>{block.text}</p>
          {block.cite ? <cite className="mt-2 block font-sans text-sm not-italic text-slate-500">— {block.cite}</cite> : null}
        </blockquote>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-navy-900/10">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm sm:text-base">
            <thead className="bg-teal-500/[0.08] text-navy-950">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-navy-900/10 align-top">
                  {row.map((cell, index) => (
                    <td key={`${cell}-${index}`} className={`px-4 py-3 ${index === 0 ? "font-medium text-navy-950" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const path = `${routes.blog}/${post.slug}`;
  const breadcrumbs = [
    { name: "Home", path: routes.home },
    { name: "Blog", path: routes.blog },
    { name: post.title, path },
  ];

  return (
    <>
      <JsonLd
        data={buildArticleSchema({
          title: post.title,
          description: post.description,
          path,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          authorName: post.author.name,
          authorType: post.author.type,
          image: post.coverImage?.src,
        })}
      />
      {post.faqs && post.faqs.length > 0 ? <JsonLd data={buildFaqSchema(post.faqs)} /> : null}
      <PageBackdrop />

      <article>
        <header className="relative isolate overflow-hidden pt-24 pb-8 xs:pt-26 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
          <Container className="relative">
            <div className="mx-auto flex max-w-3xl min-w-0 flex-col gap-5 sm:gap-6">
              <Breadcrumbs items={breadcrumbs} variant="inline" />
              {post.category ? (
                <Badge tone="teal" className="self-start">
                  {post.category}
                </Badge>
              ) : null}
              <h1 className="text-balance font-display text-[clamp(1.85rem,7vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
                {post.title}
              </h1>
              <p className="text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-navy-900/10 pt-4 text-sm text-slate-500">
                <span>By {post.author.name}</span>
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                {post.updatedAt ? (
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                  </span>
                ) : null}
                {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
              </div>
            </div>
          </Container>
        </header>

        <div className="border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14">
          <Container>
            <div className="glass-surface-strong mx-auto flex max-w-3xl min-w-0 flex-col gap-5 rounded-[28px] border border-ice-500/20 p-5 text-base leading-relaxed text-slate-600 shadow-soft xs:p-6 sm:p-10 sm:text-lg">
              {post.coverImage ? (
                <Image
                  src={post.coverImage.src}
                  alt={post.coverImage.alt}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="h-auto w-full rounded-2xl"
                />
              ) : null}
              {post.content.map((block, index) => (
                <ArticleBlock key={`${block.type}-${index}`} block={block} />
              ))}
              {post.faqs && post.faqs.length > 0 ? (
                <>
                  <h2 id="faqs" className="scroll-mt-32 pt-4 font-display text-2xl font-medium leading-tight text-navy-950 sm:text-3xl">
                    FAQs
                  </h2>
                  {post.faqs.map((faq) => (
                    <div key={faq.question} className="flex flex-col gap-2">
                      <h3 className="font-display text-xl font-medium leading-snug text-navy-950">{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </Container>
        </div>
      </article>

      <section className="border-t border-teal-500/15 bg-white/40 py-9 backdrop-blur-sm sm:py-12 lg:py-14">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-balance font-display text-2xl font-medium text-navy-950 sm:text-3xl">
            Explore Nalam&apos;s Healthcare Software
          </h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={routes.solutions} size="lg" variant="primary" className="w-full sm:w-auto">
              View All Solutions
            </Button>
            <Button href={routes.blog} size="lg" variant="secondary" className="w-full sm:w-auto">
              Back to the Blog
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
