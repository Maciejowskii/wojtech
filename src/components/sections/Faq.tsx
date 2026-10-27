"use client";

import Link from "next/link";
import { useState } from "react";
import { faqItems } from "@/data/faq";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type FaqProps = {
  /** Na landingu: skrócona lista + link do /faq. Na /faq: pełna lista. */
  variant?: "preview" | "full";
  /** Ukryj nagłówek sekcji (np. gdy strona /faq ma własny hero). */
  showHeading?: boolean;
};

export function Faq({ variant = "preview", showHeading = true }: FaqProps) {
  const items = variant === "preview" ? faqItems.slice(0, 5) : faqItems;
  const [openId, setOpenId] = useState<number | null>(0);

  const title =
    variant === "preview"
      ? "Pytania przed oddaniem sprzętu"
      : "Pytania i odpowiedzi";

  const accordion = (
    <div className="divide-y divide-border border border-border bg-white">
      {items.map((item, index) => {
        const open = openId === index;
        const panelId = `faq-panel-${variant}-${index}`;
        const buttonId = `faq-button-${variant}-${index}`;

        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-mist md:px-6"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : index)}
              >
                <span className="font-display text-base font-semibold text-navy md:text-lg">
                  {item.question}
                </span>
                <span
                  className={`mt-0.5 shrink-0 text-2xl leading-none text-accent transition-transform duration-300 ease-out ${
                    open ? "rotate-45" : "rotate-0"
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-5 pb-5 text-sm leading-relaxed text-muted transition-opacity duration-300 md:px-6 md:text-base ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      id="faq"
      className={`${
        showHeading
          ? "section-pad border-t border-border"
          : "pb-[clamp(2.75rem,6vw,5.75rem)] pt-2"
      } bg-white`}
      aria-labelledby={showHeading ? "faq-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <ScrollReveal>
              <p className="section-label">FAQ</p>
              <h2
                id="faq-title"
                className="text-balance text-[clamp(1.85rem,3.5vw,2.65rem)] font-semibold tracking-tight text-navy"
              >
                {title}
              </h2>
              <p className="mt-3 max-w-[65ch] text-pretty text-base leading-relaxed text-muted md:text-lg">
                Koszty, dostawa i zakres usług, zebrane w jednym miejscu.
              </p>
              {variant === "preview" ? (
                <Link
                  href="/faq"
                  className="btn btn-secondary mt-8 inline-flex text-sm"
                >
                  Wszystkie pytania
                </Link>
              ) : null}
            </ScrollReveal>

            <ScrollReveal delay={80}>{accordion}</ScrollReveal>
          </div>
        ) : (
          <ScrollReveal>{accordion}</ScrollReveal>
        )}
      </div>
    </section>
  );
}
