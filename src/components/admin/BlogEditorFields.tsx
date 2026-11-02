"use client";

import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { BlogContentFormat, BlogStatus } from "@/lib/db";

type Props = {
  title: string; setTitle: (v: string) => void;
  slug: string; setSlug: (v: string) => void;
  excerpt: string; setExcerpt: (v: string) => void;
  content: string; setContent: (v: string) => void;
  contentFormat: BlogContentFormat; setContentFormat: (v: BlogContentFormat) => void;
  coverImage: string; setCoverImage: (v: string) => void;
  status: BlogStatus; setStatus: (v: BlogStatus) => void;
  publishedAt: string; setPublishedAt: (v: string) => void;
  error: string;
  saving: boolean;
  onUploadCover: (files: FileList) => Promise<void>;
  onCancel: () => void;
  onError: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function BlogEditorFields({
  title, setTitle, slug, setSlug, excerpt, setExcerpt,
  content, setContent, contentFormat, setContentFormat,
  coverImage, setCoverImage, status, setStatus,
  publishedAt, setPublishedAt, error, saving,
  onUploadCover, onCancel, onError, onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Tytuł *</span>
        <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Slug (opcjonalnie)</span>
        <input className="field" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="np. naprawa-ekspresu-porady" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Zajawka</span>
        <textarea className="field min-h-24" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </label>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Sposób pisania treści</span>
        <div className="inline-flex rounded-[var(--radius-md)] border border-border bg-mist/40 p-1">
          <button type="button" className={`rounded-[var(--radius-sm)] px-4 py-2 text-sm font-semibold ${contentFormat === "visual" ? "bg-accent text-white" : "text-navy hover:bg-white"}`} onClick={() => setContentFormat("visual")}>Edytor wizualny</button>
          <button type="button" className={`rounded-[var(--radius-sm)] px-4 py-2 text-sm font-semibold ${contentFormat === "html" ? "bg-accent text-white" : "text-navy hover:bg-white"}`} onClick={() => setContentFormat("html")}>HTML</button>
        </div>
        <p className="mt-2 text-sm text-muted">{contentFormat === "visual" ? "Formatuj tekst przyciskami (pogrubienie, listy, nagłówki, linki)." : "Wklej lub wpisz gotowy kod HTML wpisu."}</p>
      </div>
      <div>
        <span className="mb-1.5 block text-sm font-semibold text-navy">Treść</span>
        {contentFormat === "visual" ? (
          <RichTextEditor value={content} onChange={setContent} />
        ) : (
          <textarea className="field min-h-72 font-mono text-sm" value={content} onChange={(e) => setContent(e.target.value)} placeholder={'<p>Twój tekst…</p>\n<h2>Nagłówek</h2>'} spellCheck={false} />
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">Status</span>
          <select className="field" value={status} onChange={(e) => setStatus(e.target.value as BlogStatus)}>
            <option value="draft">Szkic</option>
            <option value="scheduled">Zaplanowany</option>
            <option value="published">Opublikowany</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">Data publikacji / planu</span>
          <input className="field" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} disabled={status === "draft"} />
        </label>
      </div>
      <div>
        <span className="mb-1.5 block text-sm font-semibold text-navy">Zdjęcie okładki</span>
        <ImageUploadButton label="Dodaj zdjęcie okładki" multiple={false} onFiles={async (files) => { try { await onUploadCover(files); } catch (err) { onError(err instanceof Error ? err.message : "Błąd uploadu"); } }} />
        {coverImage ? (
          <div className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt="" className="max-h-48 rounded-[var(--radius-md)] border border-border object-cover" />
            <button type="button" className="btn btn-ghost mt-2 py-2 text-sm" onClick={() => setCoverImage("")}>Usuń okładkę</button>
          </div>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Zapisywanie…" : "Zapisz"}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Anuluj</button>
      </div>
    </form>
  );
}
