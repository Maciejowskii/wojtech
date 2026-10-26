"use client";

import { useRouter } from "next/navigation";

export function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter();

  async function onDelete() {
    if (!confirm("Usunąć ten wpis?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button type="button" className="btn btn-ghost py-1.5 text-xs" onClick={onDelete}>
      Usuń
    </button>
  );
}
