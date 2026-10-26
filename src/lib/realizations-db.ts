import { nanoid } from "nanoid";
import {
  getDb,
  tryGetDb,
  type RealizationImage,
  type RealizationRow,
  type RealizationWithImages,
} from "@/lib/db";
import { categoryLabel, publicCategoryFilters } from "@/lib/categories";
import { slugify } from "@/lib/slug";

export { categoryLabel };

export function realizationFilters() {
  return publicCategoryFilters();
}

function rowToRealization(row: Record<string, unknown>): RealizationRow {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    category: String(row.category),
    problem: String(row.problem ?? ""),
    work: String(row.work ?? ""),
    description: String(row.description ?? ""),
    published: Number(row.published),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

function rowToImage(row: Record<string, unknown>): RealizationImage {
  return {
    id: String(row.id),
    realization_id: String(row.realization_id),
    url: String(row.url),
    alt: String(row.alt ?? ""),
    kind: String(row.kind) as RealizationImage["kind"],
    sort_order: Number(row.sort_order),
  };
}

function withImages(row: RealizationRow): RealizationWithImages {
  const db = getDb();
  const images = db
    .prepare(
      `SELECT * FROM realization_images
       WHERE realization_id = ?
       ORDER BY sort_order ASC`,
    )
    .all(row.id) as Record<string, unknown>[];

  return {
    ...row,
    images: images.map(rowToImage),
  };
}

export function listAllRealizations(): RealizationWithImages[] {
  const db = getDb();
  const rows = db
    .prepare(`SELECT * FROM realizations ORDER BY datetime(created_at) DESC`)
    .all() as Record<string, unknown>[];
  return rows.map((r) => withImages(rowToRealization(r)));
}

export function listPublicRealizations(limit?: number): RealizationWithImages[] {
  const db = tryGetDb();
  if (!db) return [];
  try {
    const sql = limit
      ? `SELECT * FROM realizations WHERE published = 1 ORDER BY datetime(created_at) DESC LIMIT ?`
      : `SELECT * FROM realizations WHERE published = 1 ORDER BY datetime(created_at) DESC`;
    const rows = (
      limit ? db.prepare(sql).all(limit) : db.prepare(sql).all()
    ) as Record<string, unknown>[];
    return rows.map((r) => withImages(rowToRealization(r)));
  } catch {
    return [];
  }
}

export function getRealizationById(id: string): RealizationWithImages | null {
  const db = getDb();
  const row = db
    .prepare(`SELECT * FROM realizations WHERE id = ?`)
    .get(id) as Record<string, unknown> | undefined;
  return row ? withImages(rowToRealization(row)) : null;
}

export function getPublicRealizationBySlug(
  slug: string,
): RealizationWithImages | null {
  const db = tryGetDb();
  if (!db) return null;
  try {
    const row = db
      .prepare(`SELECT * FROM realizations WHERE slug = ? AND published = 1`)
      .get(slug) as Record<string, unknown> | undefined;
    return row ? withImages(rowToRealization(row)) : null;
  } catch {
    return null;
  }
}

export function uniqueRealizationSlug(base: string, excludeId?: string) {
  const db = getDb();
  let slug = slugify(base) || "realizacja";
  let i = 0;
  while (true) {
    const candidate = i === 0 ? slug : `${slug}-${i}`;
    const row = db
      .prepare(`SELECT id FROM realizations WHERE slug = ?`)
      .get(candidate) as { id: string } | undefined;
    if (!row || row.id === excludeId) return candidate;
    i += 1;
  }
}

export type RealizationInput = {
  title: string;
  slug?: string;
  category: string;
  problem?: string;
  work?: string;
  description?: string;
  published?: boolean;
  images?: Array<{
    url: string;
    alt?: string;
    kind?: "before" | "after" | "gallery";
    sort_order?: number;
  }>;
};

export function createRealization(
  input: RealizationInput,
): RealizationWithImages {
  const db = getDb();
  const now = new Date().toISOString();
  const id = nanoid();
  const slug = uniqueRealizationSlug(input.slug || input.title);

  db.prepare(
    `INSERT INTO realizations
     (id, title, slug, category, problem, work, description, published, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.title.trim(),
    slug,
    input.category,
    input.problem?.trim() || "",
    input.work?.trim() || "",
    input.description?.trim() || "",
    input.published === false ? 0 : 1,
    now,
    now,
  );

  if (input.images?.length) {
    const stmt = db.prepare(
      `INSERT INTO realization_images
       (id, realization_id, url, alt, kind, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
    );
    input.images.forEach((img, index) => {
      stmt.run(
        nanoid(),
        id,
        img.url,
        img.alt || "",
        img.kind || "gallery",
        img.sort_order ?? index,
      );
    });
  }

  return getRealizationById(id)!;
}

export function updateRealization(
  id: string,
  input: RealizationInput,
): RealizationWithImages | null {
  const existing = getRealizationById(id);
  if (!existing) return null;

  const db = getDb();
  const now = new Date().toISOString();
  const slug = uniqueRealizationSlug(input.slug || input.title, id);

  db.prepare(
    `UPDATE realizations SET
      title = ?, slug = ?, category = ?, problem = ?, work = ?,
      description = ?, published = ?, updated_at = ?
     WHERE id = ?`,
  ).run(
    input.title.trim(),
    slug,
    input.category,
    input.problem?.trim() || "",
    input.work?.trim() || "",
    input.description?.trim() || "",
    input.published === false ? 0 : 1,
    now,
    id,
  );

  if (input.images) {
    db.prepare(`DELETE FROM realization_images WHERE realization_id = ?`).run(
      id,
    );
    const stmt = db.prepare(
      `INSERT INTO realization_images
       (id, realization_id, url, alt, kind, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
    );
    input.images.forEach((img, index) => {
      stmt.run(
        nanoid(),
        id,
        img.url,
        img.alt || "",
        img.kind || "gallery",
        img.sort_order ?? index,
      );
    });
  }

  return getRealizationById(id);
}

export function deleteRealization(id: string) {
  const db = getDb();
  db.prepare(`DELETE FROM realization_images WHERE realization_id = ?`).run(id);
  db.prepare(`DELETE FROM realizations WHERE id = ?`).run(id);
}
