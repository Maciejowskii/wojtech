"use client";

import Link from "next/link";
import { useState } from "react";
import { faqItems } from "@/data/faq";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FaqProps = {
  variant?: "preview" | "full";
  showHeading?: boolean;
};

export function Faq({ variant = "preview", showHeading = true }: FaqProps) {
  const items = variant === "preview" ? faqItems.slice(0, 3) : faqItems;
  const [openId, setOpenId] = useState<number | null>(0);

  const title =
    variant === "preview" ? "Częste pytania" : "Pytania i odpowiedzi";

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
            <section
              id={panelId}
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
            </section>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      id="faq"
      className={`${
        showHeading ? "section-pad" : "pb-[clamp(2.75rem,6vw,5.75rem)] pt-2"
      } bg-white`}
      aria-labelledby={showHeading ? "faq-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
            <ScrollReveal variant="left" className="lg:col-span-5">
              <SectionHeader
                label="Pytania"
                title={title}
                titleId="faq-title"
                lead="Wycena, dostawa i wizyta w warsztacie."
                className="mb-0 border-b-0 pb-0 md:mb-0 md:pb-0"
                action={
                  variant === "preview" ? (
                    <Link href="/faq" className="btn btn-secondary">
                      Wszystkie pytania
                    </Link>
                  ) : undefined
                }
              />
            </ScrollReveal>

            <ScrollReveal
              variant="right"
              delay={100}
              className="lg:col-span-7"
            >
              {accordion}
            </ScrollReveal>
          </div>
        ) : (
          <ScrollReveal variant="up">{accordion}</ScrollReveal>
        )}
      </div>
    </section>
  );
}
