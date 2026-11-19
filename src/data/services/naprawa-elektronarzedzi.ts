import type { Service } from "@/data/services/types";
import { approvalStep, pickupStep, quoteStep } from "@/data/services/process";

export const service: Service = {
  id: "naprawa-elektronarzedzi",
  title: "Elektronarzędzia i sprzęty specjalistyczne",
  shortTitle: "Elektronarzędzia i sprzęt specjalistyczny",
  href: "/naprawa-elektronarzedzi",
  summary: "Wiertarki, szlifierki, piły, wkrętarki, młoty udarowe oraz sprzęt medyczny i przemysłowy.",
  description: "Wiertarki, szlifierki, piły, wkrętarki, młoty udarowe oraz sprzęt medyczny i przemysłowy.",
  scope: [
    "Konserwacja i naprawa elektronarzędzi, w tym: wiertarek, szlifierek, pił, wkrętarek, młotów udarowych i innych narzędzi technicznych",
    "Konserwacja i naprawa sprzętów specjalistycznych medycznych i przemysłowych",
  ],
  process: [
    "Diagnoza (bezpłatna przy zleceniu wykonania usługi). Dla sprzętu specjalistycznego możliwość dojazdu do klienta.",
    quoteStep,
    approvalStep,
    pickupStep,
  ],
  banner: {
    src: "/banery/elektronarzedzia.jpg",
    alt: "Wiertarka, szlifierka, piła tarczowa i spawarka na blacie warsztatowym",
    position: "50% 55%",
  },
  seoTitle: "Naprawa elektronarzędzi Ostrzeszów | WOJ-TECH Elektroserwis",
  seoDescription: "Diagnostyka i naprawa elektronarzędzi oraz sterowników w Ostrzeszowie. WOJ-TECH Elektroserwis.",
};
