"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
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
          title="Zobacz, co naprawiamy"
          subtitle="Galeria realizacji będzie uzupełniana rzeczywistymi zdjęciami napraw. Poniżej znajdziesz strukturę gotową do rozbudowy."
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
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "bg-white text-navy ring-1 ring-border hover:bg-card"
                }`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {items.length === 0 ? (
          <div className="card-surface mt-8 flex flex-col items-center px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-card text-accent">
              <ImageIcon className="size-7" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-bold text-navy">
              Realizacje w przygotowaniu
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Nie publikujemy fikcyjnych napraw ani zdjęć stockowych jako
              wykonanych prac. Po dodaniu zdjęć przed/po pojawią się tutaj wraz z
              krótkim opisem.
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
                  <h3 className="font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.problem}</p>
                  <p className="mt-2 text-sm text-navy">{item.work}</p>
                  {item.demo ? (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">
                      Przykład demonstracyjny
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
