import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site.config";

export function Contact() {
  return (
    <section
      id="kontakt"
      className="section-pad bg-mist"
      aria-labelledby="kontakt-title"
    >
      <div className="container-page">
        <SectionHeading
          id="kontakt-title"
          title="Masz problem ze sprzętem? Porozmawiajmy."
          subtitle="Najszybszy kontakt to telefon. Możesz też wysłać wiadomość lub skorzystać z formularza wyceny."
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <a
              href={siteConfig.phone.href}
              className="card-surface flex items-center gap-4 p-5 transition-shadow hover:shadow-soft"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-white">
                <Phone className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm text-muted">Zadzwoń</p>
                <p className="font-display text-xl font-bold text-navy">
                  {siteConfig.phone.display}
                </p>
              </div>
            </a>

            {siteConfig.email.display ? (
              <a
                href={siteConfig.email.href}
                className="card-surface flex items-center gap-4 p-5"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-card text-accent">
                  <Mail className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-muted">E-mail</p>
                  <p className="font-semibold text-navy">
                    {siteConfig.email.display}
                  </p>
                </div>
              </a>
            ) : (
              <div className="card-surface flex items-center gap-4 p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-card text-accent">
                  <Mail className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-muted">E-mail</p>
                  <p className="text-sm text-muted">
                    Adres e-mail zostanie uzupełniony w konfiguracji.
                  </p>
                </div>
              </div>
            )}

            <div className="card-surface flex items-start gap-4 p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-card text-accent">
                <MapPin className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm text-muted">Lokalizacja</p>
                <p className="font-semibold text-navy">
                  {siteConfig.address.full}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Urządzenia przyjmujemy w serwisie. Możliwa wysyłka spoza
                  Ostrzeszowa po wcześniejszym kontakcie.
                </p>
              </div>
            </div>

            <Link href="/#wycena" className="btn btn-primary w-full sm:w-auto">
              Przejdź do formularza wyceny
            </Link>
          </div>

          <div className="card-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-navy">
              Formularz kontaktowy
            </h3>
            <p className="mt-2 text-sm text-muted">
              Napisz, w czym możemy pomóc. Odpowiemy tak szybko, jak to możliwe.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
