import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listPublicBlogPosts } from "@/lib/blog";
import { requireDynamic } from "@/lib/dynamic";
import { siteConfig } from "@/lib/site.config";

export const instant = false;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Porady z warsztatu WOJ-TECH w Ostrzeszowie: ekspresy, kluczyki, hulajnogi i typowe usterki.",
  alternates: { canonical: "/blog" },
};

function formatDate(value: string | null | undefined) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  await requireDynamic();
  const posts = listPublicBlogPosts();

  return (
    <>
      <section className="border-b border-border bg-mist">
        <div className="container-page py-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="section-label">Blog</p>
              <h1 className="mt-2 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                Porady z warsztatu
              </h1>
              <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
                Krótko o usterkach, które najczęściej widzę w serwisie:
                ekspresy, kluczyki, hulajnogi. Co warto sprawdzić przed
                wizytą i jak wygląda diagnostyka.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={siteConfig.phone.href} className="btn btn-primary">
                {siteConfig.phone.display}
              </a>
              <Link href="/kontakt#wycena" className="btn btn-secondary">
                Zapytaj o wycenę
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          {posts.length === 0 ? (
            <div className="max-w-xl border-y border-border py-10">
              <p className="text-[1.05rem] leading-relaxed text-navy">
                Wkrótce pojawią się pierwsze wpisy. Jeśli masz usterkę teraz,
                zadzwoń pod {siteConfig.phone.display}.
              </p>
              <a href={siteConfig.phone.href} className="btn btn-primary mt-6">
                Zadzwoń
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`group grid gap-6 py-10 no-underline md:gap-12 md:py-12 ${
                      post.cover_image
                        ? "md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] md:items-center"
                        : ""
                    }`}
                  >
                    <div>
                      {post.published_at ? (
                        <p className="text-sm font-semibold text-accent">
                          {formatDate(post.published_at)}
                        </p>
                      ) : null}
                      <h2 className="mt-2 text-[clamp(1.45rem,2.6vw,2.1rem)] font-semibold uppercase tracking-[0.02em] text-navy transition-colors group-hover:text-accent">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">
                          {post.excerpt}
                        </p>
                      ) : null}
                      <span className="mt-5 inline-block text-sm font-semibold text-navy underline-offset-4 group-hover:text-accent group-hover:underline">
                        Czytaj wpis
                      </span>
                    </div>
                    {post.cover_image ? (
                      <div className="relative aspect-[16/10] overflow-hidden border border-border bg-mist">
                        <Image
                          src={post.cover_image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 36vw"
                        />
                      </div>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[48ch] text-base leading-relaxed text-muted">
              Masz usterkę teraz? Zadzwoń albo napisz, co się dzieje ze
              sprzętem. Po sprawdzeniu dostaniesz wycenę.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={siteConfig.phone.href} className="btn btn-primary">
                Zadzwoń
              </a>
              <Link href="/kontakt#wycena" className="btn btn-secondary">
                Formularz wyceny
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
