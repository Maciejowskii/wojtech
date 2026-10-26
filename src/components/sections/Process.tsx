import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Zgłoś problem",
    text: "Opisz usterkę przez formularz lub skontaktuj się z serwisem telefonicznie.",
  },
  {
    title: "Dostarcz urządzenie",
    text: "Przywieź sprzęt bezpośrednio do serwisu w Ostrzeszowie. Jeśli mieszkasz dalej, możesz zapytać o możliwość wysyłki urządzenia.",
  },
  {
    title: "Diagnostyka i wycena",
    text: "Sprawdzimy urządzenie, ustalimy możliwą przyczynę problemu i przedstawimy informacje o przewidywanych kosztach naprawy.",
  },
  {
    title: "Naprawa",
    text: "Po uzgodnieniu zakresu i kosztów przechodzimy do naprawy, jeśli jest ona możliwa i opłacalna.",
  },
];

export function Process() {
  return (
    <section
      id="jak-pracujemy"
      className="section-pad bg-mist"
      aria-labelledby="proces-title"
    >
      <div className="container-page">
        <SectionHeading
          id="proces-title"
          label="Proces"
          title="Naprawa bez niepotrzebnych komplikacji"
          subtitle="Prosty przebieg od zgłoszenia do naprawy — bez dojazdu do klienta."
        />

        <ol className="grid gap-0 border border-border bg-white md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="border-border p-6 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(4n)]:border-r-0 border-b last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0"
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
