import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { listPublicBlogPosts } from "@/lib/blog";
import { requireDynamic } from "@/lib/dynamic";

export async function BlogTeaser() {
  await requireDynamic();
  let posts: ReturnType<typeof listPublicBlogPosts> = [];
  try {
    posts = listPublicBlogPosts().slice(0, 3);
  } catch {
    posts = [];
  }
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="section-pad bg-white"
      aria-labelledby="blog-title"
    >
      <div className="container-page">
        <ScrollReveal variant="blur">
          <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="section-label">Blog</p>
              <h2
                id="blog-title"
                className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[0.02em] text-navy"
              >
                Porady z warsztatu
              </h2>
              <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
                Krótkie teksty o usterkach, które najczęściej widzę w serwisie.
              </p>
            </div>
            <Link href="/blog" className="btn btn-secondary shrink-0">
              Wszystkie wpisy
            </Link>
          </div>
        </ScrollReveal>

        <ul className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <ScrollReveal
              key={post.id}
              as="li"
              variant={index === 1 ? "scale" : "up"}
              delay={index * 100}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col no-underline"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-navy/5" />
                  )}
                </div>
                <div className="flex flex-1 flex-col border-x border-b border-border px-4 py-5 sm:px-5">
                  {post.published_at ? (
                    <span className="text-sm font-semibold text-accent">
                      {new Date(post.published_at).toLocaleDateString("pl-PL")}
                    </span>
                  ) : null}
                  <span className="mt-2 block text-lg font-semibold uppercase tracking-[0.02em] text-navy transition-colors duration-300 group-hover:text-accent">
                    {post.title}
                  </span>
                  {post.excerpt ? (
                    <span className="mt-2 line-clamp-3 text-[0.98rem] leading-relaxed text-muted">
                      {post.excerpt}
                    </span>
                  ) : null}
                  <span className="mt-4 text-sm font-semibold text-navy underline-offset-4 transition-colors duration-300 group-hover:text-accent group-hover:underline">
                    Czytaj wpis
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
