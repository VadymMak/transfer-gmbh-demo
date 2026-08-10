// src/lib/route-pages-i18n.ts
// UI strings + per-route FAQ for the route landing pages (de/sk/cs/en).
// Single fixed price per vehicle (up to 8). Fallback → de.

export interface RouteStrings {
  home: string;
  fixedPrice: string;
  subtitle: (dest: string) => string;
  intro: (a: { dest: string; dist: number; dur: string; price: number }) => string;
  priceTitle: string;
  thVehicle: string;
  thCapacity: string;
  thPrice: string;
  vehicle: string;
  upTo8: string;
  distanceLabel: string;
  durationLabel: string;
  km: string;
  hUnit: string;
  minUnit: string;
  includedTitle: string;
  included: string[];
  cta: string;
  ctaWhats: string;
  otherTitle: string;
  faqTitle: string;
  faq: (a: { dest: string; dur: string; dist: number; price: number }) => { q: string; a: string }[];
}

const de: RouteStrings = {
  home: 'Startseite',
  fixedPrice: 'Festpreis',
  subtitle: (d) => `Privater Transfer ab Trenčín nach ${d} — Festpreis, 24/7, professioneller Fahrer.`,
  intro: ({ dest, dist, dur, price }) =>
    `Privater Tür-zu-Tür-Transfer von Trenčín nach ${dest}. Festpreis pro Fahrzeug (bis 8 Personen), keine versteckten Gebühren: ${price} €. Die Strecke ist ca. ${dist} km lang, die Fahrzeit beträgt etwa ${dur}. Verfügbar rund um die Uhr, auch für frühe Flüge und Nachtankünfte.`,
  priceTitle: 'Preis',
  thVehicle: 'Fahrzeug',
  thCapacity: 'Kapazität',
  thPrice: 'Festpreis',
  vehicle: 'Fahrzeug (Van)',
  upTo8: 'bis 8 Personen',
  distanceLabel: 'Entfernung',
  durationLabel: 'Fahrzeit',
  km: 'km',
  hUnit: 'Std.',
  minUnit: 'Min.',
  includedTitle: 'Inklusive',
  included: [
    'Festpreis pro Fahrzeug, keine versteckten Gebühren',
    'Professioneller, mehrsprachiger Fahrer',
    'Tür-zu-Tür-Abholung',
    '24/7 verfügbar — auch nachts und früh morgens',
    'Kindersitze auf Anfrage kostenlos',
    'Flugverfolgung & Wartezeit inklusive',
  ],
  cta: 'Diesen Transfer anfragen',
  ctaWhats: 'WhatsApp',
  otherTitle: 'Weitere Strecken',
  faqTitle: 'Häufige Fragen',
  faq: ({ dest, dur, dist, price }) => [
    { q: `Was kostet der Transfer Trenčín → ${dest}?`, a: `${price} € Festpreis pro Fahrzeug (bis 8 Personen), keine versteckten Gebühren.` },
    { q: 'Wie lange dauert die Fahrt?', a: `Etwa ${dur}, ca. ${dist} km.` },
    { q: 'Welche Zahlungsarten akzeptieren Sie?', a: 'Barzahlung und Kreditkarte (EUR).' },
    { q: 'Gibt es Kindersitze?', a: 'Ja, Kindersitze sind auf Anfrage kostenlos — bitte bei der Buchung angeben.' },
    { q: 'Sind Sie rund um die Uhr verfügbar?', a: 'Ja, wir fahren 24/7 — auch für frühe Flüge und Nachtankünfte.' },
  ],
};

const sk: RouteStrings = {
  home: 'Domov',
  fixedPrice: 'Pevná cena',
  subtitle: (d) => `Súkromný transfer z Trenčína do ${d} — pevná cena, 24/7, profesionálny vodič.`,
  intro: ({ dest, dist, dur, price }) =>
    `Súkromný transfer od dverí k dverám z Trenčína do ${dest}. Pevná cena za vozidlo (do 8 osôb) bez skrytých poplatkov: ${price} €. Trasa má približne ${dist} km, čas jazdy je asi ${dur}. K dispozícii nonstop — aj skoré lety a nočné prílety.`,
  priceTitle: 'Cena',
  thVehicle: 'Vozidlo',
  thCapacity: 'Kapacita',
  thPrice: 'Pevná cena',
  vehicle: 'Vozidlo (van)',
  upTo8: 'do 8 osôb',
  distanceLabel: 'Vzdialenosť',
  durationLabel: 'Čas jazdy',
  km: 'km',
  hUnit: 'h',
  minUnit: 'min',
  includedTitle: 'V cene',
  included: [
    'Pevná cena za vozidlo, žiadne skryté poplatky',
    'Profesionálny viacjazyčný vodič',
    'Vyzdvihnutie od dverí k dverám',
    'Dostupné 24/7 — aj v noci a skoro ráno',
    'Detské sedačky na požiadanie zdarma',
    'Sledovanie letu a čakanie v cene',
  ],
  cta: 'Vyžiadať tento transfer',
  ctaWhats: 'WhatsApp',
  otherTitle: 'Ďalšie trasy',
  faqTitle: 'Časté otázky',
  faq: ({ dest, dur, dist, price }) => [
    { q: `Koľko stojí transfer Trenčín → ${dest}?`, a: `${price} € pevná cena za vozidlo (do 8 osôb), žiadne skryté poplatky.` },
    { q: 'Ako dlho trvá cesta?', a: `Približne ${dur}, asi ${dist} km.` },
    { q: 'Aké spôsoby platby akceptujete?', a: 'Hotovosť a platobná karta (EUR).' },
    { q: 'Sú k dispozícii detské sedačky?', a: 'Áno, detské sedačky sú na požiadanie zdarma — uveďte ich pri objednávke.' },
    { q: 'Ste dostupní nonstop?', a: 'Áno, jazdíme 24/7 — aj skoré lety a nočné prílety.' },
  ],
};

const cs: RouteStrings = {
  home: 'Domů',
  fixedPrice: 'Pevná cena',
  subtitle: (d) => `Soukromý transfer z Trenčína do ${d} — pevná cena, 24/7, profesionální řidič.`,
  intro: ({ dest, dist, dur, price }) =>
    `Soukromý transfer ode dveří ke dveřím z Trenčína do ${dest}. Pevná cena za vozidlo (do 8 osob) bez skrytých poplatků: ${price} €. Trasa měří přibližně ${dist} km, doba jízdy je asi ${dur}. K dispozici nonstop — i brzké lety a noční přílety.`,
  priceTitle: 'Cena',
  thVehicle: 'Vozidlo',
  thCapacity: 'Kapacita',
  thPrice: 'Pevná cena',
  vehicle: 'Vozidlo (van)',
  upTo8: 'do 8 osob',
  distanceLabel: 'Vzdálenost',
  durationLabel: 'Doba jízdy',
  km: 'km',
  hUnit: 'h',
  minUnit: 'min',
  includedTitle: 'V ceně',
  included: [
    'Pevná cena za vozidlo, žádné skryté poplatky',
    'Profesionální vícejazyčný řidič',
    'Vyzvednutí ode dveří ke dveřím',
    'Dostupné 24/7 — i v noci a brzy ráno',
    'Dětské sedačky na vyžádání zdarma',
    'Sledování letu a čekání v ceně',
  ],
  cta: 'Poptat tento transfer',
  ctaWhats: 'WhatsApp',
  otherTitle: 'Další trasy',
  faqTitle: 'Časté dotazy',
  faq: ({ dest, dur, dist, price }) => [
    { q: `Kolik stojí transfer Trenčín → ${dest}?`, a: `${price} € pevná cena za vozidlo (do 8 osob), žádné skryté poplatky.` },
    { q: 'Jak dlouho cesta trvá?', a: `Přibližně ${dur}, asi ${dist} km.` },
    { q: 'Jaké způsoby platby přijímáte?', a: 'Hotovost a platební karta (EUR).' },
    { q: 'Jsou k dispozici dětské sedačky?', a: 'Ano, dětské sedačky jsou na vyžádání zdarma — uveďte je při objednávce.' },
    { q: 'Jste dostupní nonstop?', a: 'Ano, jezdíme 24/7 — i brzké lety a noční přílety.' },
  ],
};

const en: RouteStrings = {
  home: 'Home',
  fixedPrice: 'Fixed price',
  subtitle: (d) => `Private transfer from Trenčín to ${d} — fixed price, 24/7, professional driver.`,
  intro: ({ dest, dist, dur, price }) =>
    `Private door-to-door transfer from Trenčín to ${dest}. Fixed price per vehicle (up to 8 passengers), no hidden fees: €${price}. The route is about ${dist} km and takes roughly ${dur}. Available 24/7 — including early flights and night arrivals.`,
  priceTitle: 'Price',
  thVehicle: 'Vehicle',
  thCapacity: 'Capacity',
  thPrice: 'Fixed price',
  vehicle: 'Vehicle (van)',
  upTo8: 'up to 8 passengers',
  distanceLabel: 'Distance',
  durationLabel: 'Driving time',
  km: 'km',
  hUnit: 'h',
  minUnit: 'min',
  includedTitle: "What's included",
  included: [
    'Fixed price per vehicle, no hidden fees',
    'Professional, multilingual driver',
    'Door-to-door pickup',
    'Available 24/7 — including nights and early mornings',
    'Child seats free on request',
    'Flight tracking & waiting time included',
  ],
  cta: 'Request this transfer',
  ctaWhats: 'WhatsApp',
  otherTitle: 'Other routes',
  faqTitle: 'FAQ',
  faq: ({ dest, dur, dist, price }) => [
    { q: `How much is the Trenčín → ${dest} transfer?`, a: `€${price} fixed price per vehicle (up to 8 passengers), no hidden fees.` },
    { q: 'How long does the trip take?', a: `About ${dur}, roughly ${dist} km.` },
    { q: 'What payment methods do you accept?', a: 'Cash and credit card (EUR).' },
    { q: 'Are child seats available?', a: 'Yes, child seats are free on request — please mention it when booking.' },
    { q: 'Are you available 24/7?', a: 'Yes, we drive 24/7 — including early flights and night arrivals.' },
  ],
};

const STRINGS: Record<string, RouteStrings> = { de, sk, cs, en };

export function routeStrings(locale: string): RouteStrings {
  return STRINGS[locale] ?? de;
}

/** Format minutes as a localized "1 h 30 min" string. */
export function formatDuration(min: number, s: RouteStrings): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} ${s.minUnit}`;
  if (m === 0) return `${h} ${s.hUnit}`;
  return `${h} ${s.hUnit} ${m} ${s.minUnit}`;
}
