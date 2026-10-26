"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";

export function Faq() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-white" aria-labelledby="faq-title">
      <div className="container-page">
        <SectionHeading
          id="faq-title"
          title="Najczęściej zadawane pytania"
          subtitle="Krótkie odpowiedzi zgodne z rzeczywistym zakresem działalności serwisu."
        />

        <div className="mx-auto max-w-3xl divide-y divide-border rounded-[var(--radius)] border border-border bg-white">
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
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-navy hover:bg-mist/70"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : index)}
                  >
                    {item.question}
                    <ChevronDown
                      className={`size-5 shrink-0 text-accent transition-transform ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="px-5 pb-5 text-sm leading-relaxed text-muted"
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
