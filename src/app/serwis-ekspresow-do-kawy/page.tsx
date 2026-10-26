import type { Metadata } from "next";
import { ServicePageContent } from "@/components/sections/ServicePage";
import { services } from "@/data/services";

const service = services.find((s) => s.id === "serwis-ekspresow-do-kawy")!;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: service.href },
};

export default function Page() {
  return <ServicePageContent service={service} />;
}
