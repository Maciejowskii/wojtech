import { BlogEditor } from "@/components/admin/BlogEditor";

export const instant = false;

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">Nowy wpis</h1>
      <div className="card-surface mt-6 p-6">
        <BlogEditor />
      </div>
    </div>
  );
}
