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

/** Minimalna sanitizacja HTML z panelu admina (zaufane źródło). */
export function sanitizeBlogHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
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
