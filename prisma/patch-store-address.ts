// One-off: fix postalCode '91108' → '911 08' for store transfer-gmbh.
// Run manually: npx tsx prisma/patch-store-address.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
  const result = await db.store.update({
    where: { slug: 'transfer-gmbh' },
    data: {
      postalCode: '911 08',
    },
    select: { slug: true, address: true, postalCode: true, city: true },
  });
  console.log('Updated store:', result.slug);
  console.log('  address:    ', result.address);
  console.log('  postalCode: ', result.postalCode);
  console.log('  city:       ', result.city);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
