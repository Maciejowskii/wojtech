import DOMPurify from "isomorphic-dompurify";

/** Prosty renderer: akapity oddzielone pustą linią → HTML (legacy plain text) */
export function renderPlainContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      block
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br />"),
    )
    .map((html) => `<p>${html}</p>`)
    .join("\n");
}

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "a",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "code",
  "pre",
  "span",
  "div",
];

/** Sanitizacja HTML z panelu admina przed renderem na stronie publicznej. */
export function sanitizeBlogHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "title", "target", "rel", "class"],
    ALLOW_DATA_ATTR: false,
  });
}

export function looksLikeHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content.trim());
}

/** HTML gotowy do wyświetlenia na stronie publicznej */
export function renderBlogHtml(content: string, format?: "visual" | "html") {
  const trimmed = content.trim();
  if (!trimmed) return "";

  if (format === "html" || format === "visual" || looksLikeHtml(trimmed)) {
    return sanitizeBlogHtml(trimmed);
  }

  return renderPlainContent(trimmed);
}
