import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Realizations } from "@/components/sections/Realizations";
import { Reviews } from "@/components/sections/Reviews";
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
      <ScrollReveal delay={40}>
        <Reviews />
      </ScrollReveal>
      <ScrollReveal delay={60}>
        <Suspense fallback={null}>
          <BlogTeaser />
        </Suspense>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <Faq />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <Contact />
      </ScrollReveal>
    </>
  );
}
