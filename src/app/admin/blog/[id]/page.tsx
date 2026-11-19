import { notFound } from "next/navigation";
import { AdminDbMissing } from "@/components/admin/AdminDbMissing";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { getBlogById } from "@/lib/blog";
import { tryGetDb } from "@/lib/db";
import { requireDynamic } from "@/lib/dynamic";

export const instant = false;

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  await requireDynamic();
  const db = await tryGetDb();
  if (!db) return <AdminDbMissing />;
  const { id } = await params;
  const post = await getBlogById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">
        Edycja wpisu
      </h1>
      <div className="card-surface mt-6 p-6">
        <BlogEditor initial={post} />
      </div>
    </div>
  );
}
