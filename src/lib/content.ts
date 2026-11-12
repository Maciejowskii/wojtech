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

const ALLOWED_TAGS = new Set([
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
]);

const ALLOWED_ATTRS = new Set(["href", "title", "target", "rel", "class"]);

/**
 * Sanitizacja HTML bez jsdom/DOMPurify — isomorphic-dompurify potrafi
 * zwracać puste odpowiedzi na Vercel (serverless).
 */
export function sanitizeBlogHtml(html: string) {
  let out = String(html || "");

  // Wyrzuć niebezpieczne bloki i protokoły.
  out = out
    .replace(/<(script|style|iframe|object|embed|link|meta|form|svg|math)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed|link|meta|form|svg|math)\b[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(
      /\s(href|src|xlink:href)\s*=\s*(["'])\s*(javascript|data|vbscript):[\s\S]*?\2/gi,
      "",
    );

  out = out.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, rawTag, rawAttrs) => {
    const tag = String(rawTag).toLowerCase();
    const closing = match.startsWith("</");
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (closing) return `</${tag}>`;
    if (tag === "br") return "<br />";

    const attrs: string[] = [];
    const attrRe =
      /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
    let m: RegExpExecArray | null;
    while ((m = attrRe.exec(String(rawAttrs || "")))) {
      const name = m[1].toLowerCase();
      if (!ALLOWED_ATTRS.has(name)) continue;
      const value = m[2] ?? m[3] ?? m[4] ?? "";
      if (name === "href" && /^\s*(javascript|data|vbscript):/i.test(value)) {
        continue;
      }
      if (name === "target" && value !== "_blank" && value !== "_self") continue;
      attrs.push(`${name}="${value.replace(/"/g, "&quot;")}"`);
    }

    if (tag === "a" && attrs.some((a) => a.startsWith("target="))) {
      if (!attrs.some((a) => a.startsWith("rel="))) {
        attrs.push('rel="noopener noreferrer"');
      }
    }

    return attrs.length ? `<${tag} ${attrs.join(" ")}>` : `<${tag}>`;
  });

  return out;
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
