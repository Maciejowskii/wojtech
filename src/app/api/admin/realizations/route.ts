import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { CACHE_TAGS, revalidateContent } from "@/lib/cache-tags";
import {
  createRealization,
  listAllRealizations,
  type RealizationInput,
} from "@/lib/realizations-db";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, items: await listAllRealizations() });
}

export async function POST(request: Request) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as RealizationInput;
  if (!body.title?.trim() || !body.category) {
    return NextResponse.json(
      { ok: false, message: "Tytuł i kategoria są wymagane" },
      { status: 400 },
    );
  }

  const item = await createRealization(body);
  revalidateContent(CACHE_TAGS.realizations);
  return NextResponse.json({ ok: true, item });
}
