"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
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
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Tytuł *</span>
        <input
          className="field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Slug (opcjonalnie)
        </span>
        <input
          className="field"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="np. naprawa-ekspresu-porady"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Zajawka</span>
        <textarea
          className="field min-h-24"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </label>

      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">
          Sposób pisania treści
        </span>
        <div className="inline-flex rounded-[var(--radius-md)] border border-border bg-mist/40 p-1">
          <button
            type="button"
            className={`rounded-[var(--radius-sm)] px-4 py-2 text-sm font-semibold ${
              contentFormat === "visual"
                ? "bg-accent text-white"
                : "text-navy hover:bg-white"
            }`}
            onClick={() => setContentFormat("visual")}
          >
            Edytor wizualny
          </button>
          <button
            type="button"
            className={`rounded-[var(--radius-sm)] px-4 py-2 text-sm font-semibold ${
              contentFormat === "html"
                ? "bg-accent text-white"
                : "text-navy hover:bg-white"
            }`}
            onClick={() => setContentFormat("html")}
          >
            HTML
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">
          {contentFormat === "visual"
            ? "Formatuj tekst przyciskami (pogrubienie, listy, nagłówki, linki)."
            : "Wklej lub wpisz gotowy kod HTML wpisu."}
        </p>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-semibold text-navy">Treść</span>
        {contentFormat === "visual" ? (
          <RichTextEditor value={content} onChange={setContent} />
        ) : (
          <textarea
            className="field min-h-72 font-mono text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={'<p>Twój tekst…</p>\n<h2>Nagłówek</h2>'}
            spellCheck={false}
          />
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">Status</span>
          <select
            className="field"
            value={status}
            onChange={(e) => setStatus(e.target.value as BlogStatus)}
          >
            <option value="draft">Szkic</option>
            <option value="scheduled">Zaplanowany</option>
            <option value="published">Opublikowany</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">
            Data publikacji / planu
          </span>
          <input
            className="field"
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            disabled={status === "draft"}
          />
        </label>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Zdjęcie okładki
        </span>
        <ImageUploadButton
          label="Dodaj zdjęcie okładki"
          multiple={false}
          onFiles={async (files) => {
            try {
              await uploadCover(files);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Błąd uploadu");
            }
          }}
        />
        {coverImage ? (
          <div className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt=""
              className="max-h-48 rounded-[var(--radius-md)] border border-border object-cover"
            />
            <button
              type="button"
              className="btn btn-ghost mt-2 py-2 text-sm"
              onClick={() => setCoverImage("")}
            >
              Usuń okładkę
            </button>
          </div>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Zapisywanie…" : "Zapisz"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/admin/blog")}
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
