"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site.config";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-200 ${
        scrolled
          ? "border-border bg-white/95 shadow-soft backdrop-blur-md"
          : "border-transparent bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Główna nawigacja"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy/85 transition-colors hover:bg-mist hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={siteConfig.phone.href}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-navy transition-colors hover:text-accent"
          >
            <Phone className="size-4" aria-hidden />
            {siteConfig.phone.display}
          </a>
          <Link href="/#wycena" className="btn btn-primary">
            Zapytaj o naprawę
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-white text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-white lg:hidden"
        >
          <nav
            className="container-page flex flex-col gap-1 py-4"
            aria-label="Menu mobilne"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.phone.href}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 font-semibold text-navy"
              onClick={() => setOpen(false)}
            >
              <Phone className="size-4" aria-hidden />
              Zadzwoń: {siteConfig.phone.display}
            </a>
            <Link
              href="/#wycena"
              className="btn btn-primary mt-1 w-full"
              onClick={() => setOpen(false)}
            >
              Zapytaj o naprawę
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
