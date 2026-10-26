import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicBlogBySlug } from "@/lib/blog";
import { renderPlainContent } from "@/lib/content";
import { requireDynamic } from "@/lib/dynamic";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await requireDynamic();
  const { slug } = await params;
  const post = getPublicBlogBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  await requireDynamic();
  const { slug } = await params;
  const post = getPublicBlogBySlug(slug);
  if (!post) notFound();

  const paragraphs = renderPlainContent(post.content);

  return (
    <article className="section-pad">
      <div className="container-page max-w-3xl">
        <p className="section-label">Blog</p>
        <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.75rem)] font-semibold text-navy">
          {post.title}
        </h1>
        {post.published_at ? (
          <p className="mt-3 text-sm text-muted">
            {new Date(post.published_at).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}

        {post.cover_image ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] border border-border">
            <Image
              src={post.cover_image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        {post.excerpt ? (
          <p className="mt-8 text-lg leading-relaxed text-muted">{post.excerpt}</p>
        ) : null}

        <div className="mt-8 space-y-4 text-base leading-relaxed text-navy">
          {paragraphs.map((html, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/blog" className="btn btn-secondary">
            Wszystkie wpisy
          </Link>
          <Link href="/#wycena" className="btn btn-primary">
            Zapytaj o wycenę
          </Link>
        </div>
      </div>
    </article>
  );
}
