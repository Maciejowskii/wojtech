import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafeHtml } from "@/components/ui/SafeHtml";
import { getPublicBlogBySlug, listPublicBlogPosts } from "@/lib/blog";
import { renderBlogHtml } from "@/lib/content";
import { requireDynamic } from "@/lib/dynamic";
import { blogPostJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";

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

function formatDate(value: string | null | undefined) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  await requireDynamic();
  const { slug } = await params;
  const post = getPublicBlogBySlug(slug);
  if (!post) notFound();

  const html = renderBlogHtml(post.content, post.content_format);
  const related = listPublicBlogPosts()
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  const jsonLd = blogPostJsonLd({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    coverImage: post.cover_image,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
  });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-border bg-mist">
        <div className="container-page py-12 md:py-16">
          <p className="section-label">
            <Link
              href="/blog"
              className="text-accent underline-offset-2 hover:underline"
            >
              Blog
            </Link>
          </p>
          <h1 className="mt-3 max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase tracking-[0.02em] text-navy">
            {post.title}
          </h1>
          {post.published_at ? (
            <p className="mt-5 text-sm font-semibold text-muted">
              {formatDate(post.published_at)}
            </p>
          ) : null}
          {post.excerpt ? (
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-graphite md:text-xl">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </header>

      <div className="section-pad bg-white">
        <div className="container-page max-w-3xl">
          {post.cover_image ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden border border-border bg-mist">
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

          <SafeHtml className="blog-content" html={html} />

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-base leading-relaxed text-muted">
              Potrzebujesz naprawy w Ostrzeszowie? Zobacz{" "}
              <Link href="/oferta" className="font-semibold text-accent underline">
                ofertę warsztatu
              </Link>
              , zadzwoń albo wyślij zgłoszenie.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href={siteConfig.phone.href} className="btn btn-primary">
                {siteConfig.phone.display}
              </a>
              <Link href="/kontakt#wycena" className="btn btn-secondary">
                Zapytaj o wycenę
              </Link>
              <Link
                href="/blog"
                className="text-sm font-semibold text-navy underline-offset-4 hover:text-accent hover:underline"
              >
                Wszystkie wpisy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-border bg-mist section-pad">
          <div className="container-page">
            <p className="section-label">Blog</p>
            <h2 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold uppercase tracking-[0.02em] text-navy">
              Inne porady
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden border border-border bg-white no-underline"
                  >
                    {item.cover_image ? (
                      <div className="relative aspect-[16/10] bg-mist">
                        <Image
                          src={item.cover_image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, 40vw"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col px-5 py-5">
                      {item.published_at ? (
                        <span className="text-sm font-semibold text-accent">
                          {formatDate(item.published_at)}
                        </span>
                      ) : null}
                      <span className="mt-2 text-lg font-semibold uppercase tracking-[0.02em] text-navy transition-colors group-hover:text-accent">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
