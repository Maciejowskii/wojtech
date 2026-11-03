import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
      className="section-pad bg-mist"
      aria-labelledby="blog-title"
    >
      <div className="container-page">
        <ScrollReveal variant="blur">
          <SectionHeader
            label="Blog"
            title="Porady z warsztatu"
            titleId="blog-title"
            lead="Krótko o usterkach z warsztatu."
            action={
              <Link href="/blog" className="btn btn-secondary">
                Wszystkie wpisy
              </Link>
            }
          />
        </ScrollReveal>

        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {posts.map((post, index) => (
            <ScrollReveal
              key={post.id}
              as="li"
              variant={index === 1 ? "scale" : "up"}
              delay={index * 90}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-border bg-white no-underline"
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
                <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
                  {post.published_at ? (
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                      {new Date(post.published_at).toLocaleDateString("pl-PL")}
                    </span>
                  ) : null}
                  <span className="mt-2 block text-base font-semibold uppercase tracking-[0.02em] text-navy transition-colors group-hover:text-accent sm:text-lg">
                    {post.title}
                  </span>
                  {post.excerpt ? (
                    <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </span>
                  ) : null}
                  <span className="mt-auto pt-4 text-sm font-semibold text-navy underline-offset-4 group-hover:text-accent group-hover:underline">
                    Czytaj
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
