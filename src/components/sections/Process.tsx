import { ScrollReveal } from "@/components/motion/ScrollReveal";

const steps = [
  {
    title: "Zadzwoń albo napisz",
    text: "Krótko opisz sprzęt i objawy. Łatwiej wtedy ustalić, czy warto przyjechać od razu.",
  },
  {
    title: "Przywieź sprzęt",
    text: "Oddajesz urządzenie w warsztacie na Olszynie 84C. Z dalszej okolicy możesz zapytać o wysyłkę.",
  },
  {
    title: "Diagnostyka i wycena",
    text: "Sprawdzam, co nie działa, i podaję przewidywany koszt. Bez zgody nie zaczynam naprawy.",
  },
  {
    title: "Naprawa",
    text: "Jak ustalimy zakres i cenę, biorę się do roboty. Jeśli naprawa nie ma sensu, mówię to wprost.",
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
            <div className="mb-10 max-w-3xl md:mb-12">
              <p className="section-label">Jak pracujemy</p>
              <h2
                id="proces-title"
                className="text-[clamp(2.1rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[0.02em] text-navy"
              >
                Jak wygląda naprawa
              </h2>
              <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
                Pracuję stacjonarnie w Ostrzeszowie. Nie jeżdżę do klienta. Po
                diagnostyce dostajesz wycenę i dopiero wtedy decydujesz o
                naprawie.
              </p>
            </div>
          </ScrollReveal>
        ) : null}

        <ol className="grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-6">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.title}
              as="li"
              variant="scale"
              delay={index * 90}
              className="relative"
            >
              <p className="font-display text-3xl font-semibold tabular-nums text-steel/80 md:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-semibold uppercase tracking-[0.02em] text-navy md:mt-3 md:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                {step.text}
              </p>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
