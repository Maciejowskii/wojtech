export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Jakie urządzenia można oddać do naprawy?",
    answer:
      "Ekspresy do kawy i AGD, elektronikę samochodową, sprzęt RTV, rowery i hulajnogi elektryczne, elektronarzędzia, sterowniki oraz, po rozmowie, laptopy. Jak nie jesteś pewien, zadzwoń albo napisz, co się dzieje ze sprzętem.",
  },
  {
    question: "Czy naprawiacie ekspresy do kawy?",
    answer:
      "Tak. To główna specjalizacja warsztatu. Zależnie od usterki biorę też inne urządzenia AGD.",
  },
  {
    question: "Czy trzeba wcześniej zgłaszać usterkę?",
    answer:
      "Warto. Krótki opis po telefonie albo w formularzu ułatwia przyjęcie sprzętu i wstępną rozmowę o naprawie.",
  },
  {
    question: "Czy można wysłać urządzenie z innej miejscowości?",
    answer:
      "Tak, po wcześniejszym kontakcie. Opisz usterkę i zapytaj o wysyłkę. Nie organizuję transportu sam z siebie i nie pokrywam kosztów przesyłki bez osobnego ustalenia.",
  },
  {
    question: "Czy jest dojazd do klienta?",
    answer:
      "Nie. Sprzęt trzeba przywieźć do serwisu w Ostrzeszowie albo, po uzgodnieniu, przesłać.",
  },
  {
    question: "Jak wygląda wycena naprawy?",
    answer:
      "Po przyjęciu urządzenia robię diagnostykę, ustalam przyczynę i podaję przewidywany koszt. Naprawę zaczynam dopiero po Twojej zgodzie na zakres i cenę.",
  },
  {
    question: "Czy można wcześniej poznać koszt naprawy?",
    answer:
      "Po telefonie albo formularzu mogę orientacyjnie powiedzieć, co zwykle bywa przyczyną. Ostateczna wycena jest po diagnostyce, bo zależy od modelu, usterki i dostępności części.",
  },
  {
    question: "Ile trwa diagnostyka?",
    answer:
      "Zależy od sprzętu i kolejki. Po przyjęciu urządzenia powiem, kiedy mniej więcej będzie informacja zwrotna. Nie podaję sztywnych terminów bez obejrzenia konkretnego przypadku.",
  },
  {
    question: "Czy naprawiacie rowery i hulajnogi elektryczne?",
    answer:
      "Tak. Rowery tradycyjne i elektryczne oraz hulajnogi, w tym wymianę opon. Zakres ustalam po diagnostyce.",
  },
  {
    question: "Czy zajmujecie się elektroniką samochodową i kluczykami?",
    answer:
      "Tak. Diagnostyka komputerowa, dorabianie i kodowanie kluczyków, piloty, car audio, Apple CarPlay i Android Auto. Szczegóły ustalamy przed pracą.",
  },
  {
    question: "Czy naprawa zawsze jest możliwa?",
    answer:
      "Nie. Po diagnostyce oceniam, czy da się naprawić i czy to się opłaca. Jak nie, mówię to wprost, zanim podejmiesz decyzję.",
  },
];
