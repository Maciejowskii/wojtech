import type { Service } from "@/data/services/types";
import { approvalStep, diagnosisStep, pickupStep, quoteStep } from "@/data/services/process";

export const service: Service = {
  id: "dorabianie-kluczykow-samochodowych",
  title: "Kodowanie i dorabianie kart i kluczyków samochodowych",
  shortTitle: "Kluczyki i karty samochodowe",
  href: "/dorabianie-kluczykow-samochodowych",
  summary: "Zapasowe kluczyki i karty, transpondery, piloty, smart key oraz naprawa stacyjek i zamków.",
  description: "Zapasowe kluczyki i karty, transpondery, piloty, smart key oraz naprawa stacyjek i zamków.",
  scope: [
    "Dorabianie zapasowych i dodatkowych kluczyków do aut",
    "Dorabianie kart samochodowych",
    "Dorabianie kluczy na podstawie kodu (z kodu mechanicznego zamka lub bazy producenta)",
    "Wykonanie pióra (grotu) klucza dopasowanego do zamka i stacyjki",
    "Programowanie transponderów immobilisera",
    "Kodowanie pilotów",
    "Programowanie smart key / keyless",
    "Naprawa uszkodzonych kluczyków i pilotów",
    "Naprawa stacyjek, zamków",
  ],
  process: [
    "Okazanie dowodu własności auta.",
    diagnosisStep,
    quoteStep,
    approvalStep,
    pickupStep,
  ],
  banner: {
    src: "/banery/klucze.jpg",
    alt: "Kluczyki samochodowe i tablet do programowania",
    position: "60% 50%",
  },
  seoTitle: "Dorabianie kluczyków samochodowych Ostrzeszów | Kodowanie",
  seoDescription: "Dorabianie i kodowanie kluczyków oraz kart samochodowych w Ostrzeszowie. Smart key, transpondery, piloty. WOJ-TECH.",
};
