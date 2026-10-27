export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Jakie urządzenia można oddać do naprawy?",
    answer:
      "Przyjmujemy ekspresy do kawy i AGD, elektronikę samochodową, sprzęt RTV, rowery i hulajnogi elektryczne, elektronarzędzia, sterowniki oraz laptopy. Jeśli nie wiesz, czy możemy pomóc, zadzwoń albo opisz problem w formularzu wyceny.",
  },
  {
    question: "Czy naprawiacie ekspresy do kawy?",
    answer:
      "Tak. Naprawiamy ekspresy do kawy i, zależnie od usterki, inne urządzenia AGD.",
  },
  {
    question: "Czy trzeba wcześniej zgłaszać usterkę?",
    answer:
      "Warto wcześniej opisać problem przez formularz lub telefon. Łatwiej wtedy przygotować przyjęcie sprzętu i wstępną rozmowę o naprawie.",
  },
  {
    question: "Czy można wysłać urządzenie z innej miejscowości?",
    answer:
      "Tak, po wcześniejszym kontakcie. Opisz usterkę i zapytaj o wysyłkę. Nie organizujemy transportu automatycznie i nie pokrywamy kosztów przesyłki bez osobnego ustalenia.",
  },
  {
    question: "Czy oferujecie dojazd do klienta?",
    answer:
      "Nie. Urządzenia dostarczasz osobiście do serwisu w Ostrzeszowie albo, po uzgodnieniu, przesyłasz.",
  },
  {
    question: "Jak wygląda wycena naprawy?",
    answer:
      "Po przyjęciu urządzenia robimy diagnostykę, ustalamy możliwą przyczynę i podajemy przewidywany koszt. Naprawę zaczynamy dopiero po uzgodnieniu zakresu i ceny.",
  },
  {
    question: "Czy można wcześniej poznać koszt naprawy?",
    answer:
      "Orientacyjną rozmowę możesz zacząć przez formularz wyceny lub telefon. Ostateczna wycena zależy od usterki, modelu i dostępności części. Ustalamy ją po diagnostyce.",
  },
  {
    question: "Ile trwa diagnostyka?",
    answer:
      "Zależy od urządzenia i usterki. Po przyjęciu sprzętu powiemy, co dalej. Nie podajemy sztywnych terminów bez oceny konkretnego przypadku.",
  },
  {
    question: "Czy naprawiacie rowery i hulajnogi elektryczne?",
    answer:
      "Tak. Serwisujemy rowery tradycyjne i elektryczne oraz hulajnogi elektryczne, w tym wymianę opon. Zakres ustalimy po diagnostyce.",
  },
  {
    question: "Czy naprawiacie elektronikę samochodową i kodujecie kluczyki?",
    answer:
      "Tak. Diagnostyka komputerowa, dorabianie i kodowanie kluczyków, piloty, car audio, Apple CarPlay i Android Auto. Szczegóły ustalamy indywidualnie.",
  },
  {
    question: "Czy naprawa zawsze jest możliwa?",
    answer:
      "Nie zawsze. Po diagnostyce oceniamy, czy naprawa jest możliwa i opłacalna. Jeśli nie, powiemy to wprost, zanim podejmiesz decyzję.",
  },
];
