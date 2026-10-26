import { notFound } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { getBlogById } from "@/lib/blog";
import { requireDynamic } from "@/lib/dynamic";

export const instant = false;

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  await requireDynamic();
  const { id } = await params;
  const post = getBlogById(id);
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
