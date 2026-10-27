import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Process } from "@/components/sections/Process";
import { Quote } from "@/components/sections/Quote";
import { Realizations } from "@/components/sections/Realizations";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Shipping } from "@/components/sections/Shipping";
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
      <Services />
      <Quote />
      <Process />
      <Shipping />
      <Suspense fallback={null}>
        <Realizations />
      </Suspense>
      <Suspense fallback={null}>
        <BlogTeaser />
      </Suspense>
      <Reviews />
      <Location />
      <Faq />
      <Contact />
    </>
  );
}
