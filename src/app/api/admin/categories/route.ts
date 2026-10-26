import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { createCategory, listCategories } from "@/lib/categories";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, categories: listCategories() });
}

export async function POST(request: Request) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as { label?: string };
  if (!body.label?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Nazwa kategorii jest wymagana" },
      { status: 400 },
    );
  }

  try {
    const category = createCategory(body.label);
    return NextResponse.json({ ok: true, category });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message: err instanceof Error ? err.message : "Błąd zapisu",
      },
      { status: 400 },
    );
  }
}
