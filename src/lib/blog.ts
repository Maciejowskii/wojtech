import { nanoid } from "nanoid";
import {
  getDb,
  tryGetDb,
  type BlogContentFormat,
  type BlogPost,
  type BlogStatus,
} from "@/lib/db";
import { slugify } from "@/lib/slug";

function rowToBlog(row: Record<string, unknown>): BlogPost {
  const format = String(row.content_format || "visual");
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    content_format: (format === "html" ? "html" : "visual") as BlogContentFormat,
    cover_image: row.cover_image ? String(row.cover_image) : null,
    status: String(row.status) as BlogStatus,
    published_at: row.published_at ? String(row.published_at) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function listAllBlogPosts(): BlogPost[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT * FROM blog_posts ORDER BY datetime(COALESCE(published_at, created_at)) DESC`,
    )
    .all() as Record<string, unknown>[];
  return rows.map(rowToBlog);
}

/** Opublikowane + zaplanowane, których data już minęła */
export function listPublicBlogPosts(): BlogPost[] {
  const db = tryGetDb();
  if (!db) return [];
  try {
    const now = new Date().toISOString();
    const rows = db
      .prepare(
        `SELECT * FROM blog_posts
         WHERE status = 'published'
            OR (status = 'scheduled' AND published_at IS NOT NULL AND published_at <= ?)
         ORDER BY datetime(published_at) DESC`,
      )
      .all(now) as Record<string, unknown>[];
    return rows.map(rowToBlog);
  } catch {
    return [];
  }
}

export function getBlogById(id: string): BlogPost | null {
  const db = getDb();
  const row = db
    .prepare(`SELECT * FROM blog_posts WHERE id = ?`)
    .get(id) as Record<string, unknown> | undefined;
  return row ? rowToBlog(row) : null;
}

export function getPublicBlogBySlug(slug: string): BlogPost | null {
  const db = tryGetDb();
  if (!db) return null;
  try {
    const now = new Date().toISOString();
    const row = db
      .prepare(
        `SELECT * FROM blog_posts
         WHERE slug = ?
           AND (
             status = 'published'
             OR (status = 'scheduled' AND published_at IS NOT NULL AND published_at <= ?)
           )`,
      )
      .get(slug, now) as Record<string, unknown> | undefined;
    return row ? rowToBlog(row) : null;
  } catch {
    return null;
  }
}

export function uniqueBlogSlug(base: string, excludeId?: string) {
  const db = getDb();
  let slug = slugify(base) || "wpis";
  let i = 0;
  while (true) {
    const candidate = i === 0 ? slug : `${slug}-${i}`;
    const row = db
      .prepare(`SELECT id FROM blog_posts WHERE slug = ?`)
      .get(candidate) as { id: string } | undefined;
    if (!row || row.id === excludeId) return candidate;
    i += 1;
  }
}

export type BlogInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  content_format?: BlogContentFormat;
  cover_image?: string | null;
  status: BlogStatus;
  published_at?: string | null;
};

export function createBlogPost(input: BlogInput): BlogPost {
  const db = getDb();
  const now = new Date().toISOString();
  const id = nanoid();
  const slug = uniqueBlogSlug(input.slug || input.title);
  const publishedAt =
    input.status === "draft" ? null : input.published_at || now;
  const contentFormat = input.content_format === "html" ? "html" : "visual";

  db.prepare(
    `INSERT INTO blog_posts
     (id, title, slug, excerpt, content, content_format, cover_image, status, published_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.title.trim(),
    slug,
    input.excerpt?.trim() || "",
    input.content || "",
    contentFormat,
    input.cover_image || null,
    input.status,
    publishedAt,
    now,
    now,
  );

  return getBlogById(id)!;
}

export function updateBlogPost(id: string, input: BlogInput): BlogPost | null {
  const existing = getBlogById(id);
  if (!existing) return null;

  const db = getDb();
  const now = new Date().toISOString();
  const slug = uniqueBlogSlug(input.slug || input.title, id);
  let publishedAt = input.published_at ?? existing.published_at;
  const contentFormat =
    input.content_format === "html"
      ? "html"
      : input.content_format === "visual"
        ? "visual"
        : existing.content_format;

  if (input.status === "draft") {
    publishedAt = null;
  } else if (input.status === "published" && !publishedAt) {
    publishedAt = now;
  } else if (input.status === "scheduled" && !publishedAt) {
    publishedAt = now;
  }

  db.prepare(
    `UPDATE blog_posts SET
      title = ?, slug = ?, excerpt = ?, content = ?, content_format = ?, cover_image = ?,
      status = ?, published_at = ?, updated_at = ?
     WHERE id = ?`,
  ).run(
    input.title.trim(),
    slug,
    input.excerpt?.trim() || "",
    input.content || "",
    contentFormat,
    input.cover_image || null,
    input.status,
    publishedAt,
    now,
    id,
  );

  return getBlogById(id);
}

export function deleteBlogPost(id: string) {
  const db = getDb();
  db.prepare(`DELETE FROM blog_posts WHERE id = ?`).run(id);
}
