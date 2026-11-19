import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  createBlogPost,
  listAllBlogPosts,
  type BlogInput,
} from "@/lib/blog";
import { CACHE_TAGS, revalidateContent } from "@/lib/cache-tags";
import type { BlogStatus } from "@/lib/db";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, posts: await listAllBlogPosts() });
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
  const post = await createBlogPost({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    content_format: body.content_format,
    cover_image: body.cover_image,
    status,
    published_at: body.published_at,
  });
  revalidateContent(CACHE_TAGS.blog);

  return NextResponse.json({ ok: true, post });
}
