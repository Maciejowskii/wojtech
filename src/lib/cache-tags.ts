import { revalidateTag } from "next/cache";

export const CACHE_TAGS = {
  blog: "blog",
  realizations: "realizations",
  categories: "categories",
} as const;

/** Odśwież cache po zapisie w panelu admina. */
export function revalidateContent(
  ...tags: Array<(typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]>
) {
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
}
