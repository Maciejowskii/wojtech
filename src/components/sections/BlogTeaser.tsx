import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section id="blog" className="section-pad" aria-labelledby="blog-title">
      <div className="container-page">
        <SectionHeading
          id="blog-title"
          label="Blog"
          title="Najnowsze wpisy"
          subtitle="Porady i informacje z serwisu."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="card-surface overflow-hidden transition-colors hover:border-accent/40"
            >
              {post.cover_image ? (
                <div className="relative aspect-[16/9] bg-card">
                  <Image
                    src={post.cover_image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <p className="text-xs text-muted">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("pl-PL")
                    : ""}
                </p>
                <h3 className="mt-2 font-semibold text-navy">{post.title}</h3>
                {post.excerpt ? (
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/blog" className="btn btn-secondary">
            Wszystkie wpisy
          </Link>
        </div>
      </div>
    </section>
  );
}
