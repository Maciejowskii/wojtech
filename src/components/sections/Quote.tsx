import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/forms/QuoteForm";

export function Quote() {
  return (
    <section
      id="wycena"
      className="section-pad bg-mist"
      aria-labelledby="wycena-title"
    >
      <div className="container-page">
        <SectionHeading
          id="wycena-title"
          title="Ile może kosztować naprawa?"
          subtitle="Opisz problem ze swoim urządzeniem. Przekażemy Ci informacje o możliwej wycenie i dalszych krokach."
        />
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
