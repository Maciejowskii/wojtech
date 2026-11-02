"use client";

import { Plus } from "lucide-react";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import type { Category } from "@/lib/db";

export type RealizationImageDraft = {
  url: string;
  alt: string;
  kind: "before" | "after" | "gallery";
};

type Props = {
  title: string;
  setTitle: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  categories: Category[];
  problem: string;
  setProblem: (v: string) => void;
  work: string;
  setWork: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  published: boolean;
  setPublished: (v: boolean) => void;
  images: RealizationImageDraft[];
  setImages: React.Dispatch<React.SetStateAction<RealizationImageDraft[]>>;
  newCategoryLabel: string;
  setNewCategoryLabel: (v: string) => void;
  showNewCategory: boolean;
  setShowNewCategory: (v: boolean) => void;
  addingCategory: boolean;
  error: string;
  saving: boolean;
  onAddCategory: () => void;
  onUploadImages: (files: FileList) => Promise<void>;
  onError: (message: string) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function RealizationEditorFields({
  title,
  setTitle,
  slug,
  setSlug,
  category,
  setCategory,
  categories,
  problem,
  setProblem,
  work,
  setWork,
  description,
  setDescription,
  published,
  setPublished,
  images,
  setImages,
  newCategoryLabel,
  setNewCategoryLabel,
  showNewCategory,
  setShowNewCategory,
  addingCategory,
  error,
  saving,
  onAddCategory,
  onUploadImages,
  onError,
  onCancel,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Tytuł *
        </span>
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
              <option value="">Brak kategorii - dodaj poniżej</option>
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
              />
              <button
                type="button"
                className="btn btn-primary shrink-0 py-2 text-sm"
                disabled={addingCategory || !newCategoryLabel.trim()}
                onClick={onAddCategory}
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
          <span className="mb-1.5 block text-sm font-semibold text-navy">
            Slug
          </span>
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
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Zdjęcia
        </span>
        <ImageUploadButton
          label="Dodaj zdjęcia realizacji"
          onFiles={async (files) => {
            try {
              await onUploadImages(files);
            } catch (err) {
              onError(err instanceof Error ? err.message : "Błąd uploadu");
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
                            kind: e.target.value as RealizationImageDraft["kind"],
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
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Anuluj
        </button>
      </div>
    </form>
  );
}
