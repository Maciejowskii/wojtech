import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { Services } from "@/components/sections/Services";
import { VisualBreak } from "@/components/sections/VisualBreak";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { faqItems } from "@/data/faq";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "WOJ-TECH Elektroserwis Ostrzeszów | Naprawa ekspresów, AGD i RTV",
  description:
    "Warsztat w Ostrzeszowie: ekspresy do kawy, AGD, RTV, elektronika samochodowa, rowery i hulajnogi. Olszyna 84C, tel. 606 582 606.",
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
      <ScrollReveal variant="fade" delay={40}>
        <ServiceMarquee />
      </ScrollReveal>
      <Services />
      <Process />
      <VisualBreak image="espressoClose" tall />
      <Reviews />
      <Suspense fallback={null}>
        <BlogTeaser />
      </Suspense>
      <Faq />
      <VisualBreak image="electronicsRepair" />
      <Contact />
    </>
  );
}
