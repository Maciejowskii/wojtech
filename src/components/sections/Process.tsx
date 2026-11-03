import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    title: "Kontakt",
    text: "Opisz sprzęt i objawy. Ustalimy, czy warto przyjechać.",
  },
  {
    title: "Oddanie sprzętu",
    text: "Warsztat na Olszynie 84C. Z dalszej okolicy możliwa wysyłka.",
  },
  {
    title: "Wycena",
    text: "Po diagnostyce mówię koszt. Bez zgody nie naprawiam.",
  },
  {
    title: "Naprawa",
    text: "Robię ustalony zakres. Jak nie ma sensu — mówię wprost.",
  },
];

type ProcessProps = {
  showHeading?: boolean;
};

export function Process({ showHeading = true }: ProcessProps) {
  return (
    <section
      id="jak-pracujemy"
      className="section-pad bg-mist"
      aria-labelledby={showHeading ? "proces-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <ScrollReveal variant="clip">
            <SectionHeader
              label="Jak pracujemy"
              title="Jak wygląda naprawa"
              titleId="proces-title"
              lead="Stacjonarnie w Ostrzeszowie. Najpierw wycena, potem decyzja."
            />
          </ScrollReveal>
        ) : null}

        <ol className="grid gap-0 border border-border bg-white md:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.title}
              as="li"
              variant="up"
              delay={index * 80}
              className={`relative border-border px-5 py-6 sm:px-6 sm:py-8 ${
                index > 0 ? "border-t md:border-t-0 md:border-l" : ""
              }`}
            >
              <p className="font-display text-3xl font-semibold tabular-nums text-steel/70 sm:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-base font-semibold uppercase tracking-[0.02em] text-navy sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
