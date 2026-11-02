"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import { useId, useRef, useState } from "react";

type Props = {
  label?: string;
  hint?: string;
  multiple?: boolean;
  onFiles: (files: FileList) => Promise<void> | void;
};

export function ImageUploadButton({
  label = "Dodaj zdjęcia",
  hint = "JPG, PNG, WEBP lub GIF · max 8 MB",
  multiple = true,
  onFiles,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      await onFiles(files);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files).catch(() => undefined);
        }}
        className={`flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragOver
            ? "border-accent bg-accent/10"
            : "border-accent/50 bg-accent/5 hover:border-accent hover:bg-accent/10"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-sm">
          {busy ? (
            <Loader2 className="h-7 w-7 animate-spin" aria-hidden />
          ) : (
            <ImagePlus className="h-7 w-7" aria-hidden />
          )}
        </span>
        <p className="text-base font-semibold text-navy">
          {busy ? "Przesyłanie…" : label}
        </p>
        <p className="max-w-xs text-sm text-muted">
          Kliknij lub przeciągnij pliki tutaj · {hint}
        </p>
        <button
          type="button"
          className="btn btn-primary mt-1"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          Wybierz pliki
        </button>
      </div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="sr-only"
        disabled={busy}
        onChange={(e) => {
          handleFiles(e.target.files).catch(() => undefined);
          e.target.value = "";
        }}
      />
    </div>
  );
}
