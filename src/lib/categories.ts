import { getDb, tryGetDb, type Category } from "@/lib/db";
import { slugify } from "@/lib/slug";

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "ekspresy",
    label: "Ekspresy do kawy",
    sort_order: 1,
    created_at: "",
  },
  {
    id: "auto",
    label: "Elektronika samochodowa",
    sort_order: 2,
    created_at: "",
  },
  {
    id: "rtv",
    label: "RTV i elektronika",
    sort_order: 3,
    created_at: "",
  },
  {
    id: "rowery",
    label: "Rowery i hulajnogi",
    sort_order: 4,
    created_at: "",
  },
  {
    id: "elektronarzedzia",
    label: "Elektronarzędzia i sterowniki",
    sort_order: 5,
    created_at: "",
  },
];

function rowToCategory(row: Record<string, unknown>): Category {
  return {
    id: String(row.id),
    label: String(row.label),
    sort_order: Number(row.sort_order),
    created_at: String(row.created_at),
  };
}

export function listCategories(): Category[] {
  const db = tryGetDb();
  if (!db) return DEFAULT_CATEGORIES;
  try {
    const rows = db
      .prepare(`SELECT * FROM categories ORDER BY sort_order ASC, label ASC`)
      .all() as Record<string, unknown>[];
    const cats = rows.map(rowToCategory);
    return cats.length > 0 ? cats : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function getCategory(id: string): Category | null {
  const db = tryGetDb();
  if (!db) {
    return DEFAULT_CATEGORIES.find((c) => c.id === id) || null;
  }
  try {
    const row = db
      .prepare(`SELECT * FROM categories WHERE id = ?`)
      .get(id) as Record<string, unknown> | undefined;
    return row
      ? rowToCategory(row)
      : DEFAULT_CATEGORIES.find((c) => c.id === id) || null;
  } catch {
    return DEFAULT_CATEGORIES.find((c) => c.id === id) || null;
  }
}

export function categoryLabel(categoryId: string) {
  return getCategory(categoryId)?.label || categoryId;
}

export function uniqueCategoryId(label: string) {
  const db = getDb();
  let id = slugify(label) || "kategoria";
  let i = 0;
  while (true) {
    const candidate = i === 0 ? id : `${id}-${i}`;
    const row = db
      .prepare(`SELECT id FROM categories WHERE id = ?`)
      .get(candidate) as { id: string } | undefined;
    if (!row) return candidate;
    i += 1;
  }
}

export function createCategory(label: string): Category {
  const db = getDb();
  const trimmed = label.trim();
  if (!trimmed) throw new Error("Nazwa kategorii jest wymagana");

  const existing = db
    .prepare(
      `SELECT * FROM categories WHERE lower(label) = lower(?) LIMIT 1`,
    )
    .get(trimmed) as Record<string, unknown> | undefined;
  if (existing) return rowToCategory(existing);

  const id = uniqueCategoryId(trimmed);
  const maxSort = db
    .prepare(`SELECT COALESCE(MAX(sort_order), 0) as m FROM categories`)
    .get() as { m: number };
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO categories (id, label, sort_order, created_at) VALUES (?, ?, ?, ?)`,
  ).run(id, trimmed, maxSort.m + 1, now);

  return getCategory(id)!;
}

/** Filtry na stronie publicznej: Wszystkie + kategorie z bazy */
export function publicCategoryFilters() {
  return [
    { id: "all" as const, label: "Wszystkie" },
    ...listCategories().map((c) => ({ id: c.id, label: c.label })),
  ];
}
