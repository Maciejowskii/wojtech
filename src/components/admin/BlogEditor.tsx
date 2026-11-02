"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BlogEditorFields } from "@/components/admin/BlogEditorFields";
import type { BlogContentFormat, BlogPost, BlogStatus } from "@/lib/db";

type Props = {
  initial?: BlogPost | null;
};

export function BlogEditor({ initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [contentFormat, setContentFormat] = useState<BlogContentFormat>(
    initial?.content_format || "visual",
  );
  const [coverImage, setCoverImage] = useState(initial?.cover_image || "");
  const [status, setStatus] = useState<BlogStatus>(initial?.status || "draft");
  const [publishedAt, setPublishedAt] = useState(
    initial?.published_at ? initial.published_at.slice(0, 16) : "",
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function uploadCover(files: FileList) {
    const file = files[0];
    if (!file) return;
    const form = new FormData();
    form.set("file", file);
    form.set("folder", "blog");
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Upload failed");
    setCoverImage(data.url);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      slug: slug || undefined,
      excerpt,
      content,
      content_format: contentFormat,
      cover_image: coverImage || null,
      status,
      published_at:
        status === "draft"
          ? null
          : publishedAt
            ? new Date(publishedAt).toISOString()
            : null,
    };

    try {
      const res = await fetch(
        initial ? `/api/admin/blog/${initial.id}` : "/api/admin/blog",
        {
          method: initial ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Nie udało się zapisać");
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Błąd połączenia");
    } finally {
      setSaving(false);
    }
  }

  return (
    <BlogEditorFields
      title={title}
      setTitle={setTitle}
      slug={slug}
      setSlug={setSlug}
      excerpt={excerpt}
      setExcerpt={setExcerpt}
      content={content}
      setContent={setContent}
      contentFormat={contentFormat}
      setContentFormat={setContentFormat}
      coverImage={coverImage}
      setCoverImage={setCoverImage}
      status={status}
      setStatus={setStatus}
      publishedAt={publishedAt}
      setPublishedAt={setPublishedAt}
      error={error}
      saving={saving}
      onUploadCover={uploadCover}
      onCancel={() => router.push("/admin/blog")}
      onError={setError}
      onSubmit={onSubmit}
    />
  );
}
