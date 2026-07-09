// Run directly: npx tsx prisma/seed-transfer-gmbh.ts

import { PrismaClient, Vertical, StoreMode } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Transfer GmbH...');

  // Navy theme for transport/business verticals
  const navyTheme = {
    colors: {
      bg:           '#060E18',
      primary:      '#C9A347',
      primaryDark:  '#A8893E',
      primaryLight: '#E0B85A',
      text:         '#FFFFFF',
      textSecondary:'#B8C4D4',
      textMuted:    '#506478',
      border:       'rgba(201, 163, 71, 0.18)',
      bgSubtle:     '#0A1828',
      success:      '#4ade80',
      error:        '#ef4444',
      contrast:     '#FFFFFF',
      overlay:      '#000000',
      overlayAlpha: 'rgba(0,0,0,0.65)',
      headerBg:     'rgba(6,14,24,0.95)',
      bgDark:       '#020D14',
      warning:      '#fbbf24',
      successLight: 'rgba(74,222,128,0.15)',
      errorLight:   'rgba(239,68,68,0.15)',
      infoLight:    'rgba(201,163,71,0.12)',
      surface:      '#0A1828',
      bgAlt:        '#0A1828',
      bgCard:       '#0E2040',
    },
    layout: {
      heroType:     'split',
      cardStyle:    'border',
      navPosition:  'top',
      borderRadius: 'sharp',
    },
  };

  // 1. Store
  const store = await db.store.upsert({
    where: { slug: 'transfer-gmbh' },
    update: { themeConfig: navyTheme, openingHours: null },
    create: {
      slug: 'transfer-gmbh',
      name: 'Transfer GmbH',
      description: 'Professionelle Flughafentransfers Wien ⇄ Bratislava. Festpreise, lizenziert, 24/7.',
      vertical: Vertical.SERVICES,
      primaryMode: StoreMode.PHYSICAL,
      regionBundle: 'EU',
      address: 'Wiedner Hauptstraße 120',
      postalCode: '1050',
      city: 'Wien',
      phone: '+43 664 000 00 00',
      whatsappPhone: '+43664000000',
      email: 'info@transfer-gmbh.at',
      founderName: 'Transfer GmbH',
      instagramUrl: 'https://instagram.com/transfergmbh',
      googleRating: 4.9,
      mapLat: 48.2081743,
      mapLng: 16.3738189,
      themeConfig: navyTheme,
    },
  });

  // 2. HeroConfig
  await db.heroConfig.upsert({
    where: { storeId: store.id },
    update: {
      titleI18n: {
        de: 'Zuverlässige Flughafentransfers Wien ⇄ Bratislava',
        en: 'Reliable Airport Transfers Vienna ⇄ Bratislava',
        sk: 'Spoľahlivé letiskové transfery Viedeň ⇄ Bratislava',
        cs: 'Spolehlivé letištní transfery Vídeň ⇄ Bratislava',
      },
      subtitleI18n: {
        de: 'Festpreise · Lizenziert & versichert · 24/7 erreichbar',
        en: 'Fixed prices · Licensed & insured · Available 24/7',
        sk: 'Pevné ceny · Licencované & poistené · Dostupné 24/7',
        cs: 'Pevné ceny · Licencované & pojištěné · Dostupné 24/7',
      },
      ctaTextI18n: {
        de: 'Angebot anfragen',
        en: 'Request a quote',
        sk: 'Vyžiadať ponuku',
        cs: 'Vyžádat nabídku',
      },
    },
    create: {
      storeId: store.id,
      title: 'Zuverlässige Flughafentransfers Wien ⇄ Bratislava',
      subtitle: 'Festpreise · Lizenziert & versichert · 24/7 erreichbar',
      ctaText: 'Angebot anfragen',
      titleI18n: {
        de: 'Zuverlässige Flughafentransfers Wien ⇄ Bratislava',
        en: 'Reliable Airport Transfers Vienna ⇄ Bratislava',
        sk: 'Spoľahlivé letiskové transfery Viedeň ⇄ Bratislava',
        cs: 'Spolehlivé letištní transfery Vídeň ⇄ Bratislava',
      },
      subtitleI18n: {
        de: 'Festpreise · Lizenziert & versichert · 24/7 erreichbar',
        en: 'Fixed prices · Licensed & insured · Available 24/7',
        sk: 'Pevné ceny · Licencované & poistené · Dostupné 24/7',
        cs: 'Pevné ceny · Licencované & pojištěné · Dostupné 24/7',
      },
      ctaTextI18n: {
        de: 'Angebot anfragen',
        en: 'Request a quote',
        sk: 'Vyžiadať ponuku',
        cs: 'Vyžádat nabídku',
      },
    },
  });

  // 3. LegalConfig
  await db.legalConfig.upsert({
    where: { storeId: store.id },
    update: {},
    create: {
      storeId: store.id,
      enabled: true,
      companyName: 'Transfer GmbH',
      street: 'Wiedner Hauptstraße 120',
      zip: '1050',
      city: 'Wien',
      country: 'Österreich',
      email: 'info@transfer-gmbh.at',
      phone: '+43 664 000 00 00',
      vatId: 'ATU00000000',
    },
  });

  // 4. Routes (category: 'route')
  const routes = [
    { slug: 'vie-bratislava-zentrum', nameKey: 'Wien Flughafen (VIE) → Bratislava Zentrum', price: 65, description: 'ca. 1h 30min · Festpreis' },
    { slug: 'bratislava-bts-wien', nameKey: 'Bratislava (BTS) → Wien Flughafen (VIE)', price: 65, description: 'ca. 1h 30min · Festpreis' },
    { slug: 'wien-zentrum-bratislava', nameKey: 'Wien Zentrum → Bratislava Zentrum', price: 75, description: 'ca. 1h 15min · Festpreis' },
    { slug: 'bratislava-zentrum-wien-zentrum', nameKey: 'Bratislava Zentrum → Wien Zentrum', price: 75, description: 'ca. 1h 15min · Festpreis' },
    { slug: 'vie-wien-innenstadt', nameKey: 'Wien Flughafen (VIE) → Wien Innenstadt', price: 45, description: 'ca. 25min · Festpreis' },
    { slug: 'wien-innenstadt-vie', nameKey: 'Wien Innenstadt → Wien Flughafen (VIE)', price: 45, description: 'ca. 25min · Festpreis' },
  ];

  for (const r of routes) {
    await db.service.upsert({
      where: { storeId_slug: { storeId: store.id, slug: r.slug } },
      update: { price: r.price, description: r.description },
      create: {
        storeId: store.id,
        slug: r.slug,
        nameKey: r.nameKey,
        price: r.price,
        duration: 0,
        description: r.description,
        category: 'route',
        active: true,
      },
    });
  }

  // 5. Fleet (category: 'fleet')
  const fleet = [
    {
      slug: 'limousine',
      nameKey: 'Limousine Premium',
      description: 'Mercedes-Benz E-Klasse oder ähnlich. Klimaanlage, WLAN, Wasser.',
      metadata: { capacity: '1–3 Personen', luggage: '3 Koffer', model: 'Mercedes E-Klasse' },
    },
    {
      slug: 'van',
      nameKey: 'Van Business',
      description: 'Mercedes-Benz V-Klasse oder ähnlich. Ideal für Gruppen und viel Gepäck.',
      metadata: { capacity: '4–8 Personen', luggage: '8 Koffer', model: 'Mercedes V-Klasse' },
    },
    {
      slug: 'minibus',
      nameKey: 'Minibus',
      description: 'Sprinter oder ähnlich. Für größere Gruppen und Gruppenausflüge.',
      metadata: { capacity: '9–16 Personen', luggage: '16 Koffer', model: 'Mercedes Sprinter' },
    },
  ];

  for (const f of fleet) {
    await db.service.upsert({
      where: { storeId_slug: { storeId: store.id, slug: f.slug } },
      update: { description: f.description, metadata: f.metadata },
      create: {
        storeId: store.id,
        slug: f.slug,
        nameKey: f.nameKey,
        price: 0,
        duration: 0,
        description: f.description,
        category: 'fleet',
        metadata: f.metadata,
        active: true,
      },
    });
  }

  // 6. Leistungen (service types, no special category)
  const leistungen = [
    { slug: 'flughafentransfer', nameKey: 'Flughafentransfer', price: 45, duration: 90, description: 'Zuverlässige Transfers zu allen Flughäfen in der Region Wien–Bratislava.' },
    { slug: 'businessfahrten', nameKey: 'Businessfahrten', price: 60, duration: 60, description: 'Diskrete und pünktliche Fahrten für Geschäftsreisende. Stille garantiert.' },
    { slug: 'events-ausfluege', nameKey: 'Events & Ausflüge', price: 50, duration: 120, description: 'Gruppenausflüge, Messen, Konzerte oder Hochzeiten — wir fahren Sie hin und zurück.' },
    { slug: 'langstrecke', nameKey: 'Langstrecke', price: 0, duration: 0, description: 'Fahrten quer durch Europa auf Anfrage. Preisanfrage per WhatsApp oder Formular.' },
  ];

  for (const l of leistungen) {
    await db.service.upsert({
      where: { storeId_slug: { storeId: store.id, slug: l.slug } },
      update: { price: l.price, description: l.description },
      create: {
        storeId: store.id,
        slug: l.slug,
        nameKey: l.nameKey,
        price: l.price,
        duration: l.duration,
        description: l.description,
        active: true,
      },
    });
  }

  // 7. Testimonials (German, approved)
  const testimonials = [
    { text: 'Pünktlich, sauber, freundlicher Fahrer. Transfer vom Flughafen Wien nach Bratislava war absolut problemlos. Sehr empfehlenswert!', rating: 5, authorName: 'Markus W.', locale: 'de' },
    { text: 'Wir haben Transfer GmbH für unsere Messefahrt zur ViennaAutoShow gebucht. Van war perfekt — 6 Personen + Gepäck, kein Problem. Preis-Leistung top.', rating: 5, authorName: 'Johannes K.', locale: 'de' },
    { text: 'Flug hatte 45 Minuten Verspätung, der Fahrer hat trotzdem gewartet ohne Aufpreis. Das ist Service, den man sich wünscht. Danke!', rating: 5, authorName: 'Felix B.', locale: 'de' },
  ];

  for (const t of testimonials) {
    await db.testimonial.create({
      data: {
        storeId: store.id,
        text: t.text,
        rating: t.rating,
        authorName: t.authorName,
        locale: t.locale,
        status: 'APPROVED',
      },
    });
  }

  // 8. Admin user
  const passwordHash = await bcrypt.hash('transfer2026', 12);
  await db.adminUser.upsert({
    where: { email: 'admin@transfer-gmbh.at' },
    update: {},
    create: {
      email: 'admin@transfer-gmbh.at',
      passwordHash,
      name: 'Admin',
      storeId: store.id,
    },
  });

  console.log('Transfer GmbH seed complete!');
  console.log('   Store slug: transfer-gmbh');
  console.log('   Admin: admin@transfer-gmbh.at / transfer2026');
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
