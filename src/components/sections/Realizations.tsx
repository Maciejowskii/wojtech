"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  realizationFilters,
  realizations,
  type RealizationCategory,
} from "@/data/realizations";

export function Realizations() {
  const [filter, setFilter] = useState<RealizationCategory | "all">("all");

  const items = useMemo(() => {
    if (filter === "all") return realizations;
    return realizations.filter((r) => r.category === filter);
  }, [filter]);

  return (
    <section
      id="realizacje"
      className="section-pad bg-mist"
      aria-labelledby="realizacje-title"
    >
      <div className="container-page">
        <SectionHeading
          id="realizacje-title"
          label="Realizacje"
          title="Zobacz, co naprawiamy"
          subtitle="Galeria będzie uzupełniana rzeczywistymi zdjęciami napraw — bez stocków udających wykonane prace."
        />

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtr kategorii realizacji"
        >
          {realizationFilters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`min-h-10 rounded-[var(--radius-md)] border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-white text-navy hover:border-accent/50"
                }`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {items.length === 0 ? (
          <div className="card-surface mt-8 px-6 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Portfolio
            </p>
            <h3 className="mt-3 text-xl font-semibold text-navy">
              Realizacje w przygotowaniu
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Po dodaniu zdjęć przed/po pojawią się tutaj wraz z krótkim
              opisem problemu i wykonanych prac.
            </p>
            <Link href="/#oferta" className="btn btn-secondary mt-6">
              Sprawdź ofertę usług
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="card-surface overflow-hidden">
                <div className="aspect-[4/3] bg-card" />
                <div className="p-5">
                  <h3 className="font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.problem}</p>
                  <p className="mt-2 text-sm text-navy">{item.work}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
