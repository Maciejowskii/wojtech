"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site.config";

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-mist/95 backdrop-blur-sm transition-colors ${
        scrolled ? "border-border" : "border-border/60"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center gap-4 sm:gap-8">
        <Logo className="min-w-0" />

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <nav className="flex items-center gap-1" aria-label="Główna nawigacja">
            {siteConfig.nav.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active ? "nav-link nav-link-active text-accent" : "nav-link"
                  }
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <a href={siteConfig.phone.href} className="btn-nav-phone ml-3">
            <Phone className="size-3.5" aria-hidden strokeWidth={2} />
            {siteConfig.phone.display}
          </a>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <a
            href={siteConfig.phone.href}
            className="touch-target inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-graphite/25 text-navy"
            aria-label={`Zadzwoń: ${siteConfig.phone.display}`}
          >
            <Phone className="size-5" aria-hidden strokeWidth={2} />
          </a>
          <button
            type="button"
            className="touch-target inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-graphite/25 bg-transparent text-navy"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-border bg-mist lg:hidden"
        >
          <nav
            className="container-page flex flex-col pb-[calc(var(--mobile-cta-h)+var(--safe-bottom)+1rem)] pt-2"
            aria-label="Menu mobilne"
          >
            {siteConfig.nav.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`min-h-12 px-3 py-3 text-[0.95rem] font-bold uppercase tracking-[0.1em] ${
                    active ? "text-accent" : "text-navy"
                  }`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={siteConfig.phone.href}
              className="btn btn-primary mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.phone.display}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
