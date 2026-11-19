import type { Service } from "@/data/services/types";
import {
  approvalStep,
  pickupStep,
  quoteStep,
} from "@/data/services/process";

export const service: Service = {
  id: "sprzet-agd",
  title: "Sprzęt AGD",
  shortTitle: "Sprzęt AGD",
  href: "/sprzet-agd",
  summary:
    "Suszarki, piekarniki, pralki, zmywarki, płyty indukcyjne i drobne AGD.",
  description:
    "Suszarki, piekarniki, pralki, zmywarki, płyty indukcyjne i drobne AGD.",
  scope: [
    "Naprawa i czyszczenie suszarek do prania",
    "Wymiana grzałek i sterowników w piekarnikach",
    "Naprawa modułów sterujących w pralkach, zmywarkach i innych sprzętach AGD",
    "Wymiana grzałek w pralkach, suszarkach, zmywarkach i innych sprzętach AGD",
    "Naprawa lub wymiana przełączników i zegarów w sprzętach AGD",
    "Serwis pól grzejnych i elektroniki płyt indukcyjnych",
    "Naprawa i serwis drobnych sprzętów AGD: robotów, odkurzaczy, wyciskarek",
  ],
  process: [
    "Diagnoza (bezpłatna przy zleceniu wykonania usługi). Dla sprzętów będących wyposażeniem lokali gastronomicznych istnieje możliwość dojazdu do klienta.",
    quoteStep,
    approvalStep,
    pickupStep,
  ],
  banner: {
    src: "/banery/agd.jpg",
    alt: "Piekarnik z otwartymi drzwiami i płyta indukcyjna",
    position: "65% 40%",
  },
  seoTitle: "Naprawa AGD Ostrzeszów | Piekarniki, pralki, suszarki",
  seoDescription:
    "Naprawa sprzętu AGD w Ostrzeszowie: grzałki, sterowniki, płyty indukcyjne, pralki, suszarki. WOJ-TECH, Olszyna 84C.",
};
