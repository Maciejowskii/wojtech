export const QUOTE_STEPS = [
  "Kategoria",
  "Urządzenie",
  "Problem",
  "Dodatki",
  "Kontakt",
  "Dostawa",
  "Podsumowanie",
] as const;

export type QuoteFormState = {
  category: string;
  brand: string;
  model: string;
  age: string;
  issueType: string;
  description: string;
  budget: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  contactPreference: "phone" | "email" | "either" | "";
  delivery: "in_person" | "shipping" | "";
  consent: boolean;
  website: string;
};

export const quoteFormInitial: QuoteFormState = {
  category: "",
  brand: "",
  model: "",
  age: "",
  issueType: "",
  description: "",
  budget: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
  contactPreference: "",
  delivery: "",
  consent: false,
  website: "",
};
