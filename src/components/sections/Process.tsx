import { ClipboardPen, PackageOpen, SearchCheck, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: ClipboardPen,
    title: "Zgłoś problem",
    text: "Opisz usterkę przez formularz lub skontaktuj się z serwisem telefonicznie.",
  },
  {
    icon: PackageOpen,
    title: "Dostarcz urządzenie",
    text: "Przywieź sprzęt bezpośrednio do serwisu w Ostrzeszowie. Jeśli mieszkasz dalej, możesz zapytać o możliwość wysyłki urządzenia.",
  },
  {
    icon: SearchCheck,
    title: "Diagnostyka i wycena",
    text: "Sprawdzimy urządzenie, ustalimy możliwą przyczynę problemu i przedstawimy informacje o przewidywanych kosztach naprawy.",
  },
  {
    icon: Wrench,
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
          title="Naprawa bez niepotrzebnych komplikacji"
          subtitle="Prosty przebieg od zgłoszenia do naprawy — bez dojazdu do klienta i bez ukrytych obietnic."
        />

        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative card-surface flex flex-col p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-card text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-display text-3xl font-bold text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
