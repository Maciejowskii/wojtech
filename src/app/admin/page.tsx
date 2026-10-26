import Link from "next/link";
import { listAllBlogPosts } from "@/lib/blog";
import { requireDynamic } from "@/lib/dynamic";
import { listAllRealizations } from "@/lib/realizations-db";

export const instant = false;

export default async function AdminDashboardPage() {
  await requireDynamic();
  const posts = listAllBlogPosts();
  const realizations = listAllRealizations();
  const publishedPosts = posts.filter(
    (p) =>
      p.status === "published" ||
      (p.status === "scheduled" &&
        p.published_at &&
        p.published_at <= new Date().toISOString()),
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">Pulpit</h1>
      <p className="mt-2 text-muted">
        Zarządzaj wpisami bloga i galerią realizacji.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card-surface p-6">
          <p className="text-sm text-muted">Wpisy bloga</p>
          <p className="mt-2 font-display text-3xl font-semibold text-navy">
            {posts.length}
          </p>
          <p className="mt-1 text-sm text-muted">
            Opublikowane / widoczne: {publishedPosts.length}
          </p>
          <Link href="/admin/blog" className="btn btn-secondary mt-4">
            Przejdź do bloga
          </Link>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm text-muted">Realizacje</p>
          <p className="mt-2 font-display text-3xl font-semibold text-navy">
            {realizations.length}
          </p>
          <p className="mt-1 text-sm text-muted">
            Opublikowane: {realizations.filter((r) => r.published).length}
          </p>
          <Link href="/admin/realizacje" className="btn btn-secondary mt-4">
            Przejdź do realizacji
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/blog/nowy" className="btn btn-primary">
          Nowy wpis
        </Link>
        <Link href="/admin/realizacje/nowa" className="btn btn-primary">
          Nowa realizacja
        </Link>
      </div>
    </div>
  );
}
