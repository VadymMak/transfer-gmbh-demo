// src/lib/route-pages.ts
// Single source of truth for the programmatic route landing pages (SEO/GEO).
// Slugs match db.service.slug (category 'route'). Live price + localized names
// come from the DB; the numbers/enrichment here add distance, duration and
// airport data, and act as a build-time fallback when the DB row is missing.

export interface RoutePageDef {
  /** URL slug: /[locale]/transfer/<slug> — MUST match db.service.slug. */
  slug: string;
  /** db.service.nameKey (for reference/fallback). */
  nameKey: string;
  /** Fixed price per vehicle (up to 8). Fallback if the DB row is missing. */
  price: number;
  /** Approx. road distance in km. */
  distanceKm: number;
  /** Approx. driving time in minutes. */
  durationMin: number;
  /** Canonical English destination city (schema areaServed). */
  destCity: string;
  /** Destination country (schema areaServed Country). */
  country: string;
  /** IATA code if the destination is an airport. */
  airportIata?: string;
  /** Full airport name (schema Airport). */
  airportName?: string;
}

// Distances/durations are approximate road estimates from Trenčín — refine later if needed.
export const ROUTE_PAGES: RoutePageDef[] = [
  { slug: 'trencin-letisko-bratislava', nameKey: 'Trenčín → Flughafen Bratislava', price: 90,  distanceKm: 120, durationMin: 80,  destCity: 'Bratislava', country: 'Slovakia', airportIata: 'BTS', airportName: 'M. R. Štefánik Airport Bratislava' },
  { slug: 'trencin-letisko-vieden',     nameKey: 'Trenčín → Flughafen Wien',       price: 145, distanceKm: 180, durationMin: 120, destCity: 'Vienna',     country: 'Austria',  airportIata: 'VIE', airportName: 'Vienna International Airport' },
  { slug: 'trencin-vieden',             nameKey: 'Trenčín → Wien',                 price: 155, distanceKm: 200, durationMin: 130, destCity: 'Vienna',     country: 'Austria' },
  { slug: 'trencin-prag',               nameKey: 'Trenčín → Prag',                 price: 235, distanceKm: 360, durationMin: 240, destCity: 'Prague',     country: 'Czechia' },
  { slug: 'trencin-bratislava',         nameKey: 'Trenčín → Bratislava',           price: 100, distanceKm: 130, durationMin: 90,  destCity: 'Bratislava', country: 'Slovakia' },
  { slug: 'trencin-brno',               nameKey: 'Trenčín → Brno',                 price: 100, distanceKm: 115, durationMin: 80,  destCity: 'Brno',       country: 'Czechia' },
  { slug: 'trencin-nove-zamky',         nameKey: 'Trenčín → Nové Zámky',           price: 100, distanceKm: 120, durationMin: 90,  destCity: 'Nové Zámky', country: 'Slovakia' },
  { slug: 'trencin-banska-bystrica',    nameKey: 'Trenčín → Banská Bystrica',      price: 110, distanceKm: 120, durationMin: 100, destCity: 'Banská Bystrica', country: 'Slovakia' },
  { slug: 'trencin-oravsky-podzamok',   nameKey: 'Trenčín → Oravský Podzámok',     price: 120, distanceKm: 180, durationMin: 140, destCity: 'Oravský Podzámok', country: 'Slovakia' },
  { slug: 'trencin-podhajska',          nameKey: 'Trenčín → Podhájska',            price: 120, distanceKm: 140, durationMin: 110, destCity: 'Podhájska',  country: 'Slovakia' },
  { slug: 'trencin-letisko-katowice',   nameKey: 'Trenčín → Flughafen Katowice',   price: 185, distanceKm: 230, durationMin: 160, destCity: 'Katowice',   country: 'Poland',   airportIata: 'KTW', airportName: 'Katowice Airport' },
  { slug: 'trencin-kosice',             nameKey: 'Trenčín → Košice',               price: 225, distanceKm: 330, durationMin: 220, destCity: 'Košice',     country: 'Slovakia' },
  { slug: 'trencin-letisko-prag',       nameKey: 'Trenčín → Flughafen Prag',       price: 245, distanceKm: 370, durationMin: 240, destCity: 'Prague',     country: 'Czechia', airportIata: 'PRG', airportName: 'Václav Havel Airport Prague' },
];

export function getRoutePage(slug: string): RoutePageDef | undefined {
  return ROUTE_PAGES.find((r) => r.slug === slug);
}

/** Localized destination name from DB nameI18n, falling back to nameKey. */
export function localizedRouteName(
  def: RoutePageDef,
  nameI18n: Record<string, string> | undefined,
  locale: string,
): string {
  return nameI18n?.[locale] ?? nameI18n?.['de'] ?? def.nameKey;
}
