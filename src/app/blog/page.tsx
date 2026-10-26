import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPublicBlogPosts } from "@/lib/blog";
import { requireDynamic } from "@/lib/dynamic";

export const instant = false;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Porady i informacje o naprawie elektroniki, ekspresów do kawy i sprzętu AGD — WOJ-TECH Ostrzeszów.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  await requireDynamic();
  const posts = listPublicBlogPosts();

  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionHeading
          label="Blog"
          title="Porady i aktualności z serwisu"
          subtitle="Praktyczne informacje o naprawach i utrzymaniu sprzętu."
        />

        {posts.length === 0 ? (
          <div className="card-surface p-10 text-center text-muted">
            Wkrótce pojawią się pierwsze wpisy.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-surface overflow-hidden hover:border-accent/40"
              >
                {post.cover_image ? (
                  <div className="relative aspect-[16/9] bg-card">
                    <Image
                      src={post.cover_image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <p className="text-xs text-muted">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("pl-PL")
                      : ""}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-navy">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm text-muted">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
