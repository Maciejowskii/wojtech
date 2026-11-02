import type { Service } from "@/data/services/types";
import { service as serwis_ekspresow_do_kawy } from "@/data/services/serwis-ekspresow-do-kawy";
import { service as elektronika_samochodowa } from "@/data/services/elektronika-samochodowa";
import { service as naprawa_rtv } from "@/data/services/naprawa-rtv";
import { service as serwis_rowerow_i_hulajnog } from "@/data/services/serwis-rowerow-i-hulajnog";
import { service as naprawa_elektronarzedzi } from "@/data/services/naprawa-elektronarzedzi";
import { service as laptopy } from "@/data/services/laptopy";

export type { Service, ServiceSlug } from "@/data/services/types";

export const services: Service[] = [
  serwis_ekspresow_do_kawy,
  elektronika_samochodowa,
  naprawa_rtv,
  serwis_rowerow_i_hulajnog,
  naprawa_elektronarzedzi,
  laptopy,
];

export const featuredService = services.find((s) => s.featured)!;
export const offerServices = services.filter((s) => s.id !== "laptopy");
export const allOfferCards = services;

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.id === slug && s.href.startsWith("/"));
}
