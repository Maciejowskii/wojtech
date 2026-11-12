import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { CACHE_TAGS, revalidateContent } from "@/lib/cache-tags";
import {
  deleteRealization,
  getRealizationById,
  updateRealization,
  type RealizationInput,
} from "@/lib/realizations-db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await ctx.params;
  const item = await getRealizationById(id);
  if (!item) {
    return NextResponse.json({ ok: false, message: "Nie znaleziono" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, item });
}

export async function PUT(request: Request, ctx: Ctx) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = (await request.json()) as RealizationInput;
  if (!body.title?.trim() || !body.category) {
    return NextResponse.json(
      { ok: false, message: "Tytuł i kategoria są wymagane" },
      { status: 400 },
    );
  }
  const item = await updateRealization(id, body);
  if (!item) {
    return NextResponse.json({ ok: false, message: "Nie znaleziono" }, { status: 404 });
  }
  revalidateContent(CACHE_TAGS.realizations);
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await ctx.params;
  await deleteRealization(id);
  revalidateContent(CACHE_TAGS.realizations);
  return NextResponse.json({ ok: true });
}
