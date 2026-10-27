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
          label="Wycena"
          title="Zapytaj o koszt naprawy"
          subtitle="Opisz urządzenie i usterkę. Oddzwonimy z informacją o dalszych krokach."
        />
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
