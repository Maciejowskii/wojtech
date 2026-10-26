import Link from "next/link";
import { DeleteBlogButton } from "@/components/admin/DeleteBlogButton";
import { listAllBlogPosts } from "@/lib/blog";
import { requireDynamic } from "@/lib/dynamic";

export const instant = false;

const statusLabel: Record<string, string> = {
  draft: "Szkic",
  scheduled: "Zaplanowany",
  published: "Opublikowany",
};

export default async function AdminBlogListPage() {
  await requireDynamic();
  const posts = listAllBlogPosts();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">Blog</h1>
          <p className="mt-2 text-muted">Twórz, edytuj i planuj publikacje.</p>
        </div>
        <Link href="/admin/blog/nowy" className="btn btn-primary">
          Nowy wpis
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto card-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-mist/60 text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Tytuł</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3 font-semibold">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-muted">
                  Brak wpisów. Dodaj pierwszy artykuł.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{post.title}</td>
                  <td className="px-4 py-3 text-muted">
                    {statusLabel[post.status] || post.status}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleString("pl-PL")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="btn btn-secondary py-1.5 text-xs"
                      >
                        Edytuj
                      </Link>
                      {post.status !== "draft" ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="btn btn-ghost py-1.5 text-xs"
                          target="_blank"
                        >
                          Podgląd
                        </Link>
                      ) : null}
                      <DeleteBlogButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
