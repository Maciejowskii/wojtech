"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { OfferService } from "@/data/services";

const INTERVAL_MS = 5500;

export function ServiceCarousel({ items }: { items: OfferService[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userStopped, setUserStopped] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused || userStopped || reducedMotion || count < 2) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, userStopped, reducedMotion, count, go]);

  return (
      <section
        aria-roledescription="karuzela"
        aria-label="Nasze usługi"
        className="on-dark relative isolate w-full overflow-hidden bg-graphite"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {items.map((service, i) => (
            <div
              key={service.id}
              role="group"
              aria-roledescription="slajd"
              aria-label={`${i + 1} z ${count}: ${service.shortTitle}`}
              inert={i !== index}
              className="relative aspect-[16/10] w-full shrink-0 sm:aspect-[16/7] lg:aspect-[16/5] lg:max-h-[420px]"
            >
              <Image
                src={service.banner.src}
                alt={service.banner.alt}
                fill
                priority={i === 0}
                loading={i === 0 || i === 1 ? "eager" : "lazy"}
                quality={70}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: service.banner.position }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/45 to-graphite/25"
                aria-hidden
              />
              <div className="absolute inset-0 flex items-end">
                <div className="container-page pb-12 sm:pb-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">
                    Usługa {String(i + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 max-w-[22ch] font-display text-[clamp(1.9rem,5.2vw,3.6rem)] font-bold uppercase leading-[1.02] tracking-[0.02em] text-white">
                    {service.shortTitle}
                  </h2>
                  <Link
                    href={service.href}
                    tabIndex={i === index ? undefined : -1}
                    className="btn btn-hero-primary mt-5 inline-flex after:absolute after:inset-0 after:content-['']"
                    aria-label={`Zobacz więcej: ${service.shortTitle}`}
                  >
                    Zobacz więcej
                    <span aria-hidden className="ml-2">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Poprzednia usługa"
          className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-graphite/55 text-xl text-white backdrop-blur-sm hover:bg-graphite/80 lg:inline-flex lg:left-5"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Następna usługa"
          className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-graphite/55 text-xl text-white backdrop-blur-sm hover:bg-graphite/80 lg:inline-flex lg:right-5"
        >
          ›
        </button>

        {count > 1 && !reducedMotion ? (
          <button
            type="button"
            onClick={() => setUserStopped((v) => !v)}
            aria-label={
              userStopped
                ? "Wznów automatyczne przewijanie"
                : "Zatrzymaj automatyczne przewijanie"
            }
            aria-pressed={userStopped}
            className="absolute bottom-2 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-graphite/55 text-xs text-white backdrop-blur-sm hover:bg-graphite/80 lg:right-5"
          >
            {userStopped ? "▶" : "❚❚"}
          </button>
        ) : null}

        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1">
          {items.map((service, i) => (
            <button
              key={service.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Pokaż: ${service.shortTitle}`}
              aria-current={i === index}
              className="group flex h-6 w-7 items-center justify-center"
            >
              <span
                className={`block h-[3px] w-full rounded-full transition-colors ${
                  i === index
                    ? "bg-white"
                    : "bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </section>
  );
}
