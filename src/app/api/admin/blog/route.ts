import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  createBlogPost,
  listAllBlogPosts,
  type BlogInput,
} from "@/lib/blog";
import type { BlogStatus } from "@/lib/db";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, posts: listAllBlogPosts() });
}

export async function POST(request: Request) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as BlogInput;
  if (!body.title?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Tytuł jest wymagany" },
      { status: 400 },
    );
  }

  const status = (body.status || "draft") as BlogStatus;
  const post = createBlogPost({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    cover_image: body.cover_image,
    status,
    published_at: body.published_at,
  });

  return NextResponse.json({ ok: true, post });
}
