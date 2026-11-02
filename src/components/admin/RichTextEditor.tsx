"use client";

import {
  Bold,
  Heading2,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-navy hover:bg-mist"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function setEditorHtml(el: HTMLElement, html: string) {
  const safe = DOMPurify.sanitize(html || "");
  const parsed = new DOMParser().parseFromString(safe, "text/html");
  el.replaceChildren(...Array.from(parsed.body.childNodes));
}

export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lastEmitted = useRef(value);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (value === lastEmitted.current) return;
    setEditorHtml(el, value);
    lastEmitted.current = value;
  }, [value]);

  function emit() {
    const html = ref.current?.innerHTML || "";
    lastEmitted.current = html;
    onChange(html);
  }

  function run(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  }

  function addLink() {
    const url = window.prompt("Adres URL linku:");
    if (!url) return;
    run("createLink", url);
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-white">
      <div className="flex flex-wrap gap-0.5 border-b border-border bg-mist/50 px-2 py-1.5">
        <ToolbarButton label="Pogrubienie" onClick={() => run("bold")}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Kursywa" onClick={() => run("italic")}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Podkreślenie" onClick={() => run("underline")}>
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Nagłówek" onClick={() => run("formatBlock", "h2")}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Lista" onClick={() => run("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerowana"
          onClick={() => run("insertOrderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Link" onClick={addLink}>
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <div
        ref={ref}
        className="rich-editor min-h-64 px-4 py-3 text-base leading-relaxed text-navy outline-none"
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        data-placeholder="Zacznij pisać wpis…"
      />
    </div>
  );
}
