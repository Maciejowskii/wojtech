import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "wojtech.db");

let dbInstance: DatabaseSync | null = null;

export function getDb() {
  if (dbInstance) return dbInstance;

  fs.mkdirSync(dataDir, { recursive: true });
  dbInstance = new DatabaseSync(dbPath);
  dbInstance.exec("PRAGMA foreign_keys = ON;");
  migrate(dbInstance);
  return dbInstance;
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

    CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status, published_at);
    CREATE INDEX IF NOT EXISTS idx_realizations_published ON realizations(published, created_at);
  `);
}

export type BlogStatus = "draft" | "scheduled" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
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
