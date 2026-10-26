import { z } from "zod";
import { quoteCategories } from "@/data/pricing";

const categoryIds = quoteCategories.map((c) => c.id) as [string, ...string[]];

export const quoteSchema = z.object({
  category: z.enum(categoryIds),
  brand: z.string().trim().min(1, "Podaj producenta").max(100),
  model: z.string().trim().max(100).optional().or(z.literal("")),
  age: z.string().trim().max(50).optional().or(z.literal("")),
  issueType: z.string().trim().min(1, "Opisz rodzaj usterki").max(200),
  description: z
    .string()
    .trim()
    .min(10, "Opisz problem dokładniej (min. 10 znaków)")
    .max(2000),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  name: z.string().trim().min(2, "Podaj imię").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Podaj numer telefonu")
    .max(20)
    .regex(/^[0-9+\s()-]+$/, "Nieprawidłowy numer telefonu"),
  email: z
    .union([z.literal(""), z.string().trim().email("Nieprawidłowy adres e-mail")])
    .optional(),
  contactPreference: z.enum(["phone", "email", "either"]),
  delivery: z.enum(["in_person", "shipping"]),
  consent: z.literal(true),
  website: z.union([z.literal(""), z.string().max(0)]).optional(),
});

export type QuotePayload = z.infer<typeof quoteSchema>;

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Podaj imię").max(80),
    phone: z.string().trim().max(20).optional().or(z.literal("")),
    email: z
      .union([z.literal(""), z.string().trim().email("Nieprawidłowy e-mail")])
      .optional(),
    subject: z.string().trim().min(2, "Podaj temat").max(120),
    message: z
      .string()
      .trim()
      .min(10, "Wiadomość jest za krótka")
      .max(2000),
    consent: z.literal(true),
    website: z.union([z.literal(""), z.string().max(0)]).optional(),
  })
  .refine((data) => Boolean(data.phone?.trim() || data.email?.trim()), {
    message: "Podaj telefon lub e-mail",
    path: ["phone"],
  });

export type ContactPayload = z.infer<typeof contactSchema>;
