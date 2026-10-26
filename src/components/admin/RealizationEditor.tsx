"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import type { Category, RealizationWithImages } from "@/lib/db";

type ImageDraft = {
  url: string;
  alt: string;
  kind: "before" | "after" | "gallery";
};

type Props = {
  initial?: RealizationWithImages | null;
};

export function RealizationEditor({ initial }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [problem, setProblem] = useState(initial?.problem || "");
  const [work, setWork] = useState(initial?.work || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [published, setPublished] = useState(
    initial ? Boolean(initial.published) : true,
  );
  const [images, setImages] = useState<ImageDraft[]>(
    initial?.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      kind: img.kind,
    })) || [],
  );
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.categories)) {
          setCategories(data.categories);
          if (!initial?.category && data.categories[0]) {
            setCategory(data.categories[0].id);
          }
        }
      })
      .catch(() => undefined);
  }, [initial?.category]);

  async function addCategory() {
    if (!newCategoryLabel.trim()) return;
    setAddingCategory(true);
    setError("");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newCategoryLabel }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Nie udało się dodać kategorii");
        return;
      }
      setCategories((prev) => {
        const exists = prev.some((c) => c.id === data.category.id);
        return exists ? prev : [...prev, data.category];
      });
      setCategory(data.category.id);
      setNewCategoryLabel("");
      setShowNewCategory(false);
    } catch {
      setError("Błąd połączenia przy dodawaniu kategorii");
    } finally {
      setAddingCategory(false);
    }
  }

  async function uploadImages(files: FileList) {
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.set("file", file);
      form.set("folder", "realizations");
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Upload failed");
      setImages((prev) => [
        ...prev,
        { url: data.url, alt: "", kind: "gallery" as const },
      ]);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!category) {
      setError("Wybierz lub dodaj kategorię");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        title,
        slug: slug || undefined,
        category,
        problem,
        work,
        description,
        published,
        images,
      };
      const res = await fetch(
        initial
          ? `/api/admin/realizations/${initial.id}`
          : "/api/admin/realizations",
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
      router.push("/admin/realizacje");
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <span className="mb-1.5 block text-sm font-semibold text-navy">
            Kategoria *
          </span>
          <select
            className="field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.length === 0 ? (
              <option value="">Brak kategorii — dodaj poniżej</option>
            ) : null}
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          {!showNewCategory ? (
            <button
              type="button"
              className="btn btn-secondary mt-2 w-full py-2 text-sm"
              onClick={() => setShowNewCategory(true)}
            >
              <Plus className="mr-1 inline h-4 w-4" aria-hidden />
              Nowa kategoria
            </button>
          ) : (
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                className="field"
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
                placeholder="Nazwa nowej kategorii"
                autoFocus
              />
              <button
                type="button"
                className="btn btn-primary shrink-0 py-2 text-sm"
                disabled={addingCategory || !newCategoryLabel.trim()}
                onClick={addCategory}
              >
                {addingCategory ? "Dodawanie…" : "Dodaj"}
              </button>
              <button
                type="button"
                className="btn btn-ghost shrink-0 py-2 text-sm"
                onClick={() => {
                  setShowNewCategory(false);
                  setNewCategoryLabel("");
                }}
              >
                Anuluj
              </button>
            </div>
          )}
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">Slug</span>
          <input
            className="field"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Problem / usterka
        </span>
        <textarea
          className="field min-h-24"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Wykonane prace
        </span>
        <textarea
          className="field min-h-24"
          value={work}
          onChange={(e) => setWork(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Opis dodatkowy
        </span>
        <textarea
          className="field min-h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-navy">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Opublikowana na stronie
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-semibold text-navy">Zdjęcia</span>
        <ImageUploadButton
          label="Dodaj zdjęcia realizacji"
          onFiles={async (files) => {
            try {
              await uploadImages(files);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Błąd uploadu");
            }
          }}
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {images.map((img, index) => (
            <div key={`${img.url}-${index}`} className="card-surface p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt=""
                className="aspect-[4/3] w-full rounded object-cover"
              />
              <select
                className="field mt-2"
                value={img.kind}
                onChange={(e) =>
                  setImages((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            kind: e.target.value as ImageDraft["kind"],
                          }
                        : item,
                    ),
                  )
                }
              >
                <option value="before">Przed</option>
                <option value="after">Po</option>
                <option value="gallery">Galeria</option>
              </select>
              <input
                className="field mt-2"
                placeholder="Opis zdjęcia (alt)"
                value={img.alt}
                onChange={(e) =>
                  setImages((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, alt: e.target.value } : item,
                    ),
                  )
                }
              />
              <button
                type="button"
                className="btn btn-ghost mt-2 w-full py-2 text-sm"
                onClick={() =>
                  setImages((prev) => prev.filter((_, i) => i !== index))
                }
              >
                Usuń zdjęcie
              </button>
            </div>
          ))}
        </div>
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Zapisywanie…" : "Zapisz"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/admin/realizacje")}
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
