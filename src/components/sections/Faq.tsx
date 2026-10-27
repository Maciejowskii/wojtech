"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";

type FaqProps = {
  showHeading?: boolean;
};

export function Faq({ showHeading = true }: FaqProps) {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-pad bg-white"
      aria-labelledby={showHeading ? "faq-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            id="faq-title"
            label="FAQ"
            title="Pytania i odpowiedzi"
            subtitle="Koszty, dostawa sprzętu i zakres usług."
          />
        ) : null}

        <div className="mx-auto max-w-3xl divide-y divide-border border border-border bg-white">
          {faqItems.map((item, index) => {
            const open = openId === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-navy hover:bg-mist/80"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span
                      className="shrink-0 font-display text-xl font-semibold text-accent"
                      aria-hidden
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
