import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

type DatabaseSync = {
  exec(sql: string): void;
  prepare(sql: string): {
    run(...params: unknown[]): unknown;
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
  };
  close(): void;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "wojtech.db");

let dbInstance: DatabaseSync | null = null;
let dbFailed = false;

/** Na Vercel lokalne SQLite nie działa (read-only FS + brak trwałego storage). */
export function isDbDisabled() {
  return Boolean(
    process.env.VERCEL ||
      process.env.DISABLE_SQLITE === "1" ||
      process.env.NEXT_PHASE === "phase-production-build",
  );
}

function loadDatabaseSync(): new (path: string) => DatabaseSync {
  // createRequire omija bundling Turbopack i działa w Node runtime.
  const nodeRequire = createRequire(path.join(process.cwd(), "package.json"));
  return nodeRequire("node:sqlite").DatabaseSync as new (
    path: string,
  ) => DatabaseSync;
}

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;
  if (dbFailed || isDbDisabled()) {
    throw new Error("DATABASE_UNAVAILABLE");
  }

  try {
    const DatabaseSync = loadDatabaseSync();
    fs.mkdirSync(dataDir, { recursive: true });
    dbInstance = new DatabaseSync(dbPath);
    dbInstance.exec("PRAGMA foreign_keys = ON;");
    migrate(dbInstance);
    return dbInstance;
  } catch (err) {
    dbFailed = true;
    console.error("[db] SQLite niedostępne:", err);
    throw new Error("DATABASE_UNAVAILABLE");
  }
}

export function tryGetDb(): DatabaseSync | null {
  if (isDbDisabled()) return null;
  try {
    return getDb();
  } catch {
    return null;
  }
}

function hasColumn(db: DatabaseSync, table: string, column: string) {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all() as {
    name: string;
  }[];
  return rows.some((r) => r.name === column);
}

function migrate(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS realizations (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      problem TEXT NOT NULL DEFAULT '',
      work TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS realization_images (
      id TEXT PRIMARY KEY,
      realization_id TEXT NOT NULL,
      url TEXT NOT NULL,
      alt TEXT NOT NULL DEFAULT '',
      kind TEXT NOT NULL DEFAULT 'gallery',
      sort_order INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (realization_id) REFERENCES realizations(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status, published_at);
    CREATE INDEX IF NOT EXISTS idx_realizations_published ON realizations(published, created_at);
  `);

  if (!hasColumn(db, "blog_posts", "content_format")) {
    db.exec(
      `ALTER TABLE blog_posts ADD COLUMN content_format TEXT NOT NULL DEFAULT 'visual'`,
    );
  }

  seedCategories(db);
}

function seedCategories(db: DatabaseSync) {
  const count = db
    .prepare(`SELECT COUNT(*) as c FROM categories`)
    .get() as { c: number };
  if (count.c > 0) return;

  const now = new Date().toISOString();
  const defaults = [
    { id: "ekspresy", label: "Ekspresy do kawy", sort: 1 },
    { id: "auto", label: "Elektronika samochodowa", sort: 2 },
    { id: "rtv", label: "RTV i elektronika", sort: 3 },
    { id: "rowery", label: "Rowery i hulajnogi", sort: 4 },
    { id: "elektronarzedzia", label: "Elektronarzędzia i sterowniki", sort: 5 },
  ];
  const stmt = db.prepare(
    `INSERT INTO categories (id, label, sort_order, created_at) VALUES (?, ?, ?, ?)`,
  );
  for (const cat of defaults) {
    stmt.run(cat.id, cat.label, cat.sort, now);
  }
}

export type BlogStatus = "draft" | "scheduled" | "published";
export type BlogContentFormat = "visual" | "html";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_format: BlogContentFormat;
  cover_image: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  label: string;
  sort_order: number;
  created_at: string;
};

export type RealizationRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  problem: string;
  work: string;
  description: string;
  published: number;
  created_at: string;
  updated_at: string;
};

export type RealizationImage = {
  id: string;
  realization_id: string;
  url: string;
  alt: string;
  kind: "before" | "after" | "gallery";
  sort_order: number;
};

export type RealizationWithImages = RealizationRow & {
  images: RealizationImage[];
};
