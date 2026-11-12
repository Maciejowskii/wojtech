import { nanoid } from "nanoid";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
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

export async function realizationFilters() {
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

async function withImages(
  row: RealizationRow,
): Promise<RealizationWithImages> {
  const db = await getDb();
  const images = await db.all(
    `SELECT * FROM realization_images
     WHERE realization_id = ?
     ORDER BY sort_order ASC`,
    [row.id],
  );

  return {
    ...row,
    images: images.map(rowToImage),
  };
}

export async function listAllRealizations(): Promise<RealizationWithImages[]> {
  const db = await getDb();
  const rows = await db.all(
    `SELECT * FROM realizations ORDER BY datetime(created_at) DESC`,
  );
  return Promise.all(rows.map((r) => withImages(rowToRealization(r))));
}

export async function listPublicRealizations(
  limit?: number,
): Promise<RealizationWithImages[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.realizations);

  const db = await tryGetDb();
  if (!db) return [];
  try {
    const rows = limit
      ? await db.all(
          `SELECT * FROM realizations WHERE published = 1 ORDER BY datetime(created_at) DESC LIMIT ?`,
          [limit],
        )
      : await db.all(
          `SELECT * FROM realizations WHERE published = 1 ORDER BY datetime(created_at) DESC`,
        );
    return Promise.all(rows.map((r) => withImages(rowToRealization(r))));
  } catch {
    return [];
  }
}

export async function getRealizationById(
  id: string,
): Promise<RealizationWithImages | null> {
  const db = await getDb();
  const row = await db.get(`SELECT * FROM realizations WHERE id = ?`, [id]);
  return row ? withImages(rowToRealization(row)) : null;
}

export async function getPublicRealizationBySlug(
  slug: string,
): Promise<RealizationWithImages | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.realizations);

  const db = await tryGetDb();
  if (!db) return null;
  try {
    const row = await db.get(
      `SELECT * FROM realizations WHERE slug = ? AND published = 1`,
      [slug],
    );
    return row ? withImages(rowToRealization(row)) : null;
  } catch {
    return null;
  }
}

export async function uniqueRealizationSlug(base: string, excludeId?: string) {
  const db = await getDb();
  let slug = slugify(base) || "realizacja";
  let i = 0;
  while (true) {
    const candidate = i === 0 ? slug : `${slug}-${i}`;
    const row = await db.get(`SELECT id FROM realizations WHERE slug = ?`, [
      candidate,
    ]);
    if (!row || String(row.id) === excludeId) return candidate;
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

async function replaceRealizationImages(
  realizationId: string,
  images: NonNullable<RealizationInput["images"]>,
) {
  const db = await getDb();
  await db.run(`DELETE FROM realization_images WHERE realization_id = ?`, [
    realizationId,
  ]);
  for (const [index, img] of images.entries()) {
    await db.run(
      `INSERT INTO realization_images
       (id, realization_id, url, alt, kind, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nanoid(),
        realizationId,
        img.url,
        img.alt || "",
        img.kind || "gallery",
        img.sort_order ?? index,
      ],
    );
  }
}

export async function createRealization(
  input: RealizationInput,
): Promise<RealizationWithImages> {
  const db = await getDb();
  const now = new Date().toISOString();
  const id = nanoid();
  const slug = await uniqueRealizationSlug(input.slug || input.title);

  await db.run(
    `INSERT INTO realizations
     (id, title, slug, category, problem, work, description, published, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
    ],
  );

  if (input.images?.length) {
    await replaceRealizationImages(id, input.images);
  }

  return (await getRealizationById(id))!;
}

export async function updateRealization(
  id: string,
  input: RealizationInput,
): Promise<RealizationWithImages | null> {
  const existing = await getRealizationById(id);
  if (!existing) return null;

  const db = await getDb();
  const now = new Date().toISOString();
  const slug = await uniqueRealizationSlug(input.slug || input.title, id);

  await db.run(
    `UPDATE realizations SET
      title = ?, slug = ?, category = ?, problem = ?, work = ?,
      description = ?, published = ?, updated_at = ?
     WHERE id = ?`,
    [
      input.title.trim(),
      slug,
      input.category,
      input.problem?.trim() || "",
      input.work?.trim() || "",
      input.description?.trim() || "",
      input.published === false ? 0 : 1,
      now,
      id,
    ],
  );

  if (input.images) {
    await replaceRealizationImages(id, input.images);
  }

  return getRealizationById(id);
}

export async function deleteRealization(id: string) {
  const db = await getDb();
  await db.run(`DELETE FROM realization_images WHERE realization_id = ?`, [id]);
  await db.run(`DELETE FROM realizations WHERE id = ?`, [id]);
}
