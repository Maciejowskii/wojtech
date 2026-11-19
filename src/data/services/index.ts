import type { Service } from "@/data/services/types";
import { service as serwis_ekspresow_do_kawy } from "@/data/services/serwis-ekspresow-do-kawy";
import { service as elektronika_samochodowa } from "@/data/services/elektronika-samochodowa";
import { service as naprawa_rtv } from "@/data/services/naprawa-rtv";
import { service as serwis_rowerow_i_hulajnog } from "@/data/services/serwis-rowerow-i-hulajnog";
import { service as naprawa_elektronarzedzi } from "@/data/services/naprawa-elektronarzedzi";
import { service as sprzet_agd } from "@/data/services/sprzet-agd";
import { service as dorabianie_kluczykow } from "@/data/services/dorabianie-kluczykow-samochodowych";
import { service as laptopy } from "@/data/services/laptopy";

export type { Service, ServiceSlug } from "@/data/services/types";

export const services: Service[] = [
  serwis_ekspresow_do_kawy,
  sprzet_agd,
  elektronika_samochodowa,
  serwis_rowerow_i_hulajnog,
  naprawa_rtv,
  naprawa_elektronarzedzi,
  dorabianie_kluczykow,
  laptopy,
];

export type OfferService = Service & {
  banner: NonNullable<Service["banner"]>;
};

/** Usługi widoczne w ofercie i w karuzeli (kolejność jak w dokumencie klienta). */
export const offerServices = services.filter(
  (s): s is OfferService => s.id !== "laptopy" && !!s.banner,
);
export const allOfferCards = services;

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.id === slug && s.href.startsWith("/"));
}

export const featuredService = offerServices.find((s) => s.featured)!;
