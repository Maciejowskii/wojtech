import type { Metadata } from "next";
import { Suspense } from "react";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Realizations } from "@/components/sections/Realizations";
import { Services } from "@/components/sections/Services";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { faqItems } from "@/data/faq";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "WOJ-TECH Elektroserwis Ostrzeszów | Naprawa elektroniki i AGD",
  description:
    "Naprawa ekspresów do kawy, AGD, RTV, elektroniki samochodowej, rowerów i hulajnóg w Ostrzeszowie. Olszyna 84C · tel. 606 582 606.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqItems)),
        }}
      />
      <Hero />
      <Process />
      <Services />
      <ScrollReveal>
        <Suspense fallback={null}>
          <Realizations />
        </Suspense>
      </ScrollReveal>
      <ScrollReveal delay={60}>
        <Faq />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <Contact />
      </ScrollReveal>
    </>
  );
}
