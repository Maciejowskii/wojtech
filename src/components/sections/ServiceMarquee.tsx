"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { offerServices } from "@/data/services";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ServiceMarquee() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );
  const loop = [...offerServices, ...offerServices];

  return (
    <div className="service-marquee bg-navy" aria-label="Zakres usług">
      {reducedMotion ? (
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-[var(--page-gutter)] py-4 text-sm">
          {offerServices.map((service) => (
            <li key={service.id}>
              <Link
                href={service.href}
                className="font-semibold uppercase tracking-[0.1em] text-white/90 hover:text-white"
              >
                {service.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="group overflow-hidden py-4 sm:py-5">
          <ul className="animate-service-marquee flex w-max items-center gap-0 group-hover:[animation-play-state:paused]">
            {loop.map((service, index) => (
              <li
                key={`${service.id}-${index}`}
                className="flex items-center"
                aria-hidden={index >= offerServices.length ? true : undefined}
              >
                <Link
                  href={service.href}
                  tabIndex={index >= offerServices.length ? -1 : undefined}
                  className="whitespace-nowrap px-5 text-sm font-semibold uppercase tracking-[0.1em] text-white/90 transition-colors hover:text-white sm:px-8 sm:text-[0.95rem]"
                >
                  {service.shortTitle}
                </Link>
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-accent"
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
