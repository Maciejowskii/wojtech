import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const steps = [
  {
    title: "Zgłoś problem",
    text: "Opisz usterkę w formularzu albo zadzwoń. Dzięki temu łatwiej przygotujemy przyjęcie sprzętu.",
  },
  {
    title: "Dostarcz urządzenie",
    text: "Przywieź sprzęt do serwisu w Ostrzeszowie. Z dalszej okolicy możesz zapytać o wysyłkę po wcześniejszym kontakcie.",
  },
  {
    title: "Diagnostyka i wycena",
    text: "Sprawdzimy urządzenie, ustalimy możliwą przyczynę problemu i podamy przewidywany koszt naprawy.",
  },
  {
    title: "Naprawa",
    text: "Po uzgodnieniu zakresu i kosztów przechodzimy do naprawy, jeśli jest możliwa i opłacalna.",
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
          <ScrollReveal>
            <SectionHeading
              id="proces-title"
              label="Metodologia"
              title="Jak pracujemy"
              subtitle="Od zgłoszenia do naprawy. Bez dojazdu do klienta. Sprzęt dostarczasz do serwisu."
            />
          </ScrollReveal>
        ) : null}

        <ol className="grid gap-0 border border-border bg-white md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.title}
              as="li"
              delay={index * 90}
              className="border-b border-border p-6 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(4n)]:border-r-0"
            >
              <p className="font-display text-3xl font-semibold tabular-nums text-steel">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-navy">
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
