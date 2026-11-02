"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  RealizationEditorFields,
  type RealizationImageDraft,
} from "@/components/admin/RealizationEditorFields";
import type { Category, RealizationWithImages } from "@/lib/db";

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
  const [images, setImages] = useState<RealizationImageDraft[]>(
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
    <RealizationEditorFields
      title={title}
      setTitle={setTitle}
      slug={slug}
      setSlug={setSlug}
      category={category}
      setCategory={setCategory}
      categories={categories}
      problem={problem}
      setProblem={setProblem}
      work={work}
      setWork={setWork}
      description={description}
      setDescription={setDescription}
      published={published}
      setPublished={setPublished}
      images={images}
      setImages={setImages}
      newCategoryLabel={newCategoryLabel}
      setNewCategoryLabel={setNewCategoryLabel}
      showNewCategory={showNewCategory}
      setShowNewCategory={setShowNewCategory}
      addingCategory={addingCategory}
      error={error}
      saving={saving}
      onAddCategory={addCategory}
      onUploadImages={uploadImages}
      onError={setError}
      onCancel={() => router.push("/admin/realizacje")}
      onSubmit={onSubmit}
    />
  );
}
