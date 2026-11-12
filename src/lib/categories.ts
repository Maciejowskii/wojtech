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

export async function listCategories(): Promise<Category[]> {
  const db = await tryGetDb();
  if (!db) return DEFAULT_CATEGORIES;
  try {
    const rows = await db.all(
      `SELECT * FROM categories ORDER BY sort_order ASC, label ASC`,
    );
    const cats = rows.map(rowToCategory);
    return cats.length > 0 ? cats : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export async function getCategory(id: string): Promise<Category | null> {
  const db = await tryGetDb();
  if (!db) {
    return DEFAULT_CATEGORIES.find((c) => c.id === id) || null;
  }
  try {
    const row = await db.get(`SELECT * FROM categories WHERE id = ?`, [id]);
    return row
      ? rowToCategory(row)
      : DEFAULT_CATEGORIES.find((c) => c.id === id) || null;
  } catch {
    return DEFAULT_CATEGORIES.find((c) => c.id === id) || null;
  }
}

export async function categoryLabel(categoryId: string) {
  return (await getCategory(categoryId))?.label || categoryId;
}

export async function uniqueCategoryId(label: string) {
  const db = await getDb();
  let id = slugify(label) || "kategoria";
  let i = 0;
  while (true) {
    const candidate = i === 0 ? id : `${id}-${i}`;
    const row = await db.get(`SELECT id FROM categories WHERE id = ?`, [
      candidate,
    ]);
    if (!row) return candidate;
    i += 1;
  }
}

export async function createCategory(label: string): Promise<Category> {
  const db = await getDb();
  const trimmed = label.trim();
  if (!trimmed) throw new Error("Nazwa kategorii jest wymagana");

  const existing = await db.get(
    `SELECT * FROM categories WHERE lower(label) = lower(?) LIMIT 1`,
    [trimmed],
  );
  if (existing) return rowToCategory(existing);

  const id = await uniqueCategoryId(trimmed);
  const maxSort = await db.get(
    `SELECT COALESCE(MAX(sort_order), 0) as m FROM categories`,
  );
  const now = new Date().toISOString();

  await db.run(
    `INSERT INTO categories (id, label, sort_order, created_at) VALUES (?, ?, ?, ?)`,
    [id, trimmed, Number(maxSort?.m ?? 0) + 1, now],
  );

  return (await getCategory(id))!;
}

/** Filtry na stronie publicznej: Wszystkie + kategorie z bazy */
export async function publicCategoryFilters() {
  const categories = await listCategories();
  return [
    { id: "all" as const, label: "Wszystkie" },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ];
}
