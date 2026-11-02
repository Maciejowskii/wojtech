import type { Service } from "@/data/services/types";

export const service: Service = {
    id: "laptopy",
    title: "Laptopy",
    shortTitle: "Laptopy",
    href: "/oferta",
    summary:
      "Laptopy przyjmuję po wcześniejszej rozmowie. Najpierw opis usterki, potem decyzja o diagnostyce.",
    description:
      "Opisz problem z laptopem. Po rozmowie powiem, czy mogę pomóc i w jakim zakresie.",
    body: [
      "Laptopy biorę selektywnie. Najpierw rozmowa o modelu i objawach, potem decyzja, czy diagnostyka w warsztacie ma sens.",
    ],
    commonIssues: [
      "Nie włącza się, nie ładuje, resetuje się",
      "Problemy po zalaniu albo upadku",
    ],
    scope: [
      "Wstępna ocena po zgłoszeniu usterki",
      "Diagnostyka w zakresie możliwości serwisu",
    ],
    seoTitle: "Serwis laptopów Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Diagnostyka laptopów w Ostrzeszowie po wcześniejszym kontakcie. WOJ-TECH Elektroserwis.",
  };
