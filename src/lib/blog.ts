import { nanoid } from "nanoid";
import { seedBlogPosts } from "@/data/blog-seed";
import {
  getDb,
  tryGetDb,
  type BlogContentFormat,
  type BlogPost,
  type BlogStatus,
} from "@/lib/db";
import { slugify } from "@/lib/slug";

function mergePublicPosts(fromDb: BlogPost[]): BlogPost[] {
  const slugs = new Set(fromDb.map((p) => p.slug));
  const seeds = seedBlogPosts.filter((p) => !slugs.has(p.slug)) as BlogPost[];
  return [...fromDb, ...seeds].sort((a, b) => {
    const da = a.published_at ?? a.created_at;
    const dbDate = b.published_at ?? b.created_at;
    return dbDate.localeCompare(da);
  });
}

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

export async function listAllBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const rows = await db.all(
    `SELECT * FROM blog_posts ORDER BY datetime(COALESCE(published_at, created_at)) DESC`,
  );
  return rows.map(rowToBlog);
}

/** Opublikowane + zaplanowane, których data już minęła (+ seed gdy brak treści) */
export async function listPublicBlogPosts(): Promise<BlogPost[]> {
  const db = await tryGetDb();
  if (!db) return mergePublicPosts([]);
  try {
    const now = new Date().toISOString();
    const rows = await db.all(
      `SELECT * FROM blog_posts
       WHERE status = 'published'
          OR (status = 'scheduled' AND published_at IS NOT NULL AND published_at <= ?)
       ORDER BY datetime(published_at) DESC`,
      [now],
    );
    return mergePublicPosts(rows.map(rowToBlog));
  } catch {
    return mergePublicPosts([]);
  }
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  const db = await getDb();
  const row = await db.get(`SELECT * FROM blog_posts WHERE id = ?`, [id]);
  return row ? rowToBlog(row) : null;
}

export async function getPublicBlogBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const db = await tryGetDb();
  if (db) {
    try {
      const now = new Date().toISOString();
      const row = await db.get(
        `SELECT * FROM blog_posts
         WHERE slug = ?
           AND (
             status = 'published'
             OR (status = 'scheduled' AND published_at IS NOT NULL AND published_at <= ?)
           )`,
        [slug, now],
      );
      if (row) return rowToBlog(row);
    } catch {
      /* fallback to seed */
    }
  }
  const seed = seedBlogPosts.find((p) => p.slug === slug);
  return seed ? (seed as BlogPost) : null;
}

export async function uniqueBlogSlug(base: string, excludeId?: string) {
  const db = await getDb();
  let slug = slugify(base) || "wpis";
  let i = 0;
  while (true) {
    const candidate = i === 0 ? slug : `${slug}-${i}`;
    const row = await db.get(`SELECT id FROM blog_posts WHERE slug = ?`, [
      candidate,
    ]);
    if (!row || String(row.id) === excludeId) return candidate;
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

export async function createBlogPost(input: BlogInput): Promise<BlogPost> {
  const db = await getDb();
  const now = new Date().toISOString();
  const id = nanoid();
  const slug = await uniqueBlogSlug(input.slug || input.title);
  const publishedAt =
    input.status === "draft" ? null : input.published_at || now;
  const contentFormat = input.content_format === "html" ? "html" : "visual";

  await db.run(
    `INSERT INTO blog_posts
     (id, title, slug, excerpt, content, content_format, cover_image, status, published_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
    ],
  );

  return (await getBlogById(id))!;
}

export async function updateBlogPost(
  id: string,
  input: BlogInput,
): Promise<BlogPost | null> {
  const existing = await getBlogById(id);
  if (!existing) return null;

  const db = await getDb();
  const now = new Date().toISOString();
  const slug = await uniqueBlogSlug(input.slug || input.title, id);
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

  await db.run(
    `UPDATE blog_posts SET
      title = ?, slug = ?, excerpt = ?, content = ?, content_format = ?, cover_image = ?,
      status = ?, published_at = ?, updated_at = ?
     WHERE id = ?`,
    [
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
    ],
  );

  return getBlogById(id);
}

export async function deleteBlogPost(id: string) {
  const db = await getDb();
  await db.run(`DELETE FROM blog_posts WHERE id = ?`, [id]);
}
