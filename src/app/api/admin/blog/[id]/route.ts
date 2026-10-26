import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  deleteBlogPost,
  getBlogById,
  updateBlogPost,
  type BlogInput,
} from "@/lib/blog";
import type { BlogStatus } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await ctx.params;
  const post = getBlogById(id);
  if (!post) {
    return NextResponse.json({ ok: false, message: "Nie znaleziono" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, post });
}

export async function PUT(request: Request, ctx: Ctx) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = (await request.json()) as BlogInput;
  if (!body.title?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Tytuł jest wymagany" },
      { status: 400 },
    );
  }
  const post = updateBlogPost(id, {
    ...body,
    status: (body.status || "draft") as BlogStatus,
  });
  if (!post) {
    return NextResponse.json({ ok: false, message: "Nie znaleziono" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await ctx.params;
  deleteBlogPost(id);
  return NextResponse.json({ ok: true });
}
