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
          title="Formularz wyceny"
          subtitle="Opisz sprzęt i usterkę. Oddzwonię albo odpiszę z informacją, co dalej."
        />
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
