// One-off: replace demo/Wien placeholder data with Nikolay's real business data.
// Run: npx tsx prisma/update-nikolay-store.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

// ── Brand/display name. Domain is euroschnell.eu; "Transfer GmbH" is a demo
//    placeholder and is legally wrong for a Slovak živnosť. Change here if desired.
const BRAND = 'Euroschnell';

async function main() {
  const store = await db.store.update({
    where: { slug: 'transfer-gmbh' },
    data: {
      name: BRAND,
      description:
        'Spoľahlivé letiskové, skupinové a osobné transfery z Trenčína. Pevné ceny, licencované, 24/7.',
      address: 'Východná 2336/13',
      postalCode: '91108',
      city: 'Trenčín',
      phone: '+421 948 976 954',
      whatsappPhone: '+421948976954',   // was fake +43664000000 → wa.me link now correct
      founderName: 'Mykola Bieliaiev',
      email: null,            // remove fake info@transfer-gmbh.at (no real email provided)
      instagramUrl: null,     // remove fake instagram
      googleRating: null,     // remove fake 4.9 rating
      mapLat: 48.8945,        // Trenčín (was Wien 48.2081)
      mapLng: 18.0444,
    },
    select: { name: true, city: true, whatsappPhone: true, googleRating: true },
  });
  console.log('Updated:', store);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
