"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const messages = [
  "Ponad 30 lat doświadczenia",
  "Usługa stacjonarna lub wysyłkowa",
  "Najpierw diagnoza i wycena, potem naprawa",
  "Zniżki dla stałych klientów",
];

/** Ciemnogranatowy pasek z przewijającą się informacją o firmie. */
export function ServiceMarquee() {
  const reducedMotion = usePrefersReducedMotion();
  const loop = [...messages, ...messages];

  return (
    <div
      className="service-marquee on-dark bg-navy text-white"
      aria-label="Informacje o usługach"
    >
      {reducedMotion ? (
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-[var(--page-gutter)] py-4 text-sm">
          {messages.map((m) => (
            <li
              key={m}
              className="font-semibold uppercase tracking-[0.1em] text-white"
            >
              {m}
            </li>
          ))}
        </ul>
      ) : (
        <div className="overflow-hidden py-4 sm:py-5">
          <ul className="animate-service-marquee flex w-max items-center">
            {loop.map((m, i) => (
              <li
                key={`${m}-${i}`}
                className="flex items-center"
                aria-hidden={i >= messages.length ? true : undefined}
              >
                <span className="whitespace-nowrap px-5 text-sm font-semibold uppercase tracking-[0.1em] text-white sm:px-8 sm:text-[0.95rem]">
                  {m}
                </span>
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-azure"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
