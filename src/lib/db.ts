import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";

export type SqlArg = string | number | null | boolean | Uint8Array;

export type Db = {
  all(sql: string, args?: SqlArg[]): Promise<Record<string, unknown>[]>;
  get(sql: string, args?: SqlArg[]): Promise<Record<string, unknown> | undefined>;
  run(sql: string, args?: SqlArg[]): Promise<void>;
  exec(sql: string): Promise<void>;
};

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

let dbPromise: Promise<Db> | null = null;
let dbFailed = false;

/** Turso / libSQL — obsługa kilku nazw z integracji Vercel. */
export function getTursoConfig() {
  const url = (
    process.env.TURSO_DATABASE_URL ||
    process.env.LIBSQL_URL ||
    process.env.DATABASE_URL ||
    ""
  ).trim();
  const authToken = (
    process.env.TURSO_AUTH_TOKEN ||
    // Integracja Turso z prefixem TURSO_DATABASE potrafi wygenerować tę nazwę
    process.env.TURSO_DATABASE_TURSO_AUTH_TOKEN ||
    process.env.LIBSQL_AUTH_TOKEN ||
    process.env.DATABASE_AUTH_TOKEN ||
    ""
  ).trim();
  return {
    url: url || null,
    authToken: authToken || undefined,
  };
}

function tursoConfigured() {
  return Boolean(getTursoConfig().url);
}

export function isTursoReady() {
  return tursoConfigured();
}

/** Lokalne SQLite jest wyłączone na Vercel / w buildu, chyba że jest Turso. */
export function isDbDisabled() {
  if (tursoConfigured()) return false;
  return Boolean(
    process.env.VERCEL ||
      process.env.DISABLE_SQLITE === "1" ||
      process.env.NEXT_PHASE === "phase-production-build",
  );
}

function loadDatabaseSync(): new (path: string) => DatabaseSync {
  const nodeRequire = createRequire(path.join(process.cwd(), "package.json"));
  return nodeRequire("node:sqlite").DatabaseSync as new (
    path: string,
  ) => DatabaseSync;
}

function wrapSqlite(sqlite: DatabaseSync): Db {
  return {
    async all(sql, args = []) {
      return sqlite.prepare(sql).all(...args) as Record<string, unknown>[];
    },
    async get(sql, args = []) {
      return sqlite.prepare(sql).get(...args) as
        | Record<string, unknown>
        | undefined;
    },
    async run(sql, args = []) {
      sqlite.prepare(sql).run(...args);
    },
    async exec(sql) {
      sqlite.exec(sql);
    },
  };
}

function wrapTurso(client: Client): Db {
  return {
    async all(sql, args = []) {
      const result = await client.execute({ sql, args });
      return result.rows as unknown as Record<string, unknown>[];
    },
    async get(sql, args = []) {
      const result = await client.execute({ sql, args });
      return result.rows[0] as Record<string, unknown> | undefined;
    },
    async run(sql, args = []) {
      await client.execute({ sql, args });
    },
    async exec(sql) {
      await client.executeMultiple(sql);
    },
  };
}

async function hasColumn(db: Db, table: string, column: string) {
  const rows = await db.all(`PRAGMA table_info(${table})`);
  return rows.some((r) => String(r.name) === column);
}

async function migrate(db: Db) {
  await db.exec(`
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

  if (!(await hasColumn(db, "blog_posts", "content_format"))) {
    await db.exec(
      `ALTER TABLE blog_posts ADD COLUMN content_format TEXT NOT NULL DEFAULT 'visual'`,
    );
  }

  await seedCategories(db);
}

async function seedCategories(db: Db) {
  const countRow = await db.get(`SELECT COUNT(*) as c FROM categories`);
  const count = Number(countRow?.c ?? 0);
  if (count > 0) return;

  const now = new Date().toISOString();
  const defaults = [
    { id: "ekspresy", label: "Ekspresy do kawy", sort: 1 },
    { id: "auto", label: "Elektronika samochodowa", sort: 2 },
    { id: "rtv", label: "RTV i elektronika", sort: 3 },
    { id: "rowery", label: "Rowery i hulajnogi", sort: 4 },
    { id: "elektronarzedzia", label: "Elektronarzędzia i sterowniki", sort: 5 },
  ];
  for (const cat of defaults) {
    await db.run(
      `INSERT INTO categories (id, label, sort_order, created_at) VALUES (?, ?, ?, ?)`,
      [cat.id, cat.label, cat.sort, now],
    );
  }
}

async function createDb(): Promise<Db> {
  const turso = getTursoConfig();
  if (turso.url) {
    const client = createClient({
      url: turso.url,
      authToken: turso.authToken,
    });
    const db = wrapTurso(client);
    await migrate(db);
    return db;
  }

  if (isDbDisabled()) {
    throw new Error("DATABASE_UNAVAILABLE");
  }

  const DatabaseSync = loadDatabaseSync();
  fs.mkdirSync(dataDir, { recursive: true });
  const sqlite = new DatabaseSync(dbPath);
  sqlite.exec("PRAGMA foreign_keys = ON;");
  const db = wrapSqlite(sqlite);
  await migrate(db);
  return db;
}

export async function getDb(): Promise<Db> {
  if (dbFailed) throw new Error("DATABASE_UNAVAILABLE");
  if (!dbPromise) {
    dbPromise = createDb().catch((err) => {
      dbFailed = true;
      dbPromise = null;
      console.error("[db] niedostępne:", err);
      throw new Error("DATABASE_UNAVAILABLE");
    });
  }
  return dbPromise;
}

export async function tryGetDb(): Promise<Db | null> {
  if (isDbDisabled() && !tursoConfigured()) return null;
  try {
    return await getDb();
  } catch {
    return null;
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
