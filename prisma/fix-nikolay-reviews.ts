import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const db = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL })) });

const updates = [
  { match: 'Laura',   rating: 5, date: '2026-07-14T09:20:00Z' },
  { match: 'Theodor', rating: 5, date: '2026-07-22T16:05:00Z' },
  { match: 'Mária',   rating: 5, date: '2026-07-29T11:40:00Z' },
];

async function main() {
  const store = await db.store.findUniqueOrThrow({ where: { slug: 'transfer-gmbh' }, select: { id: true } });
  for (const u of updates) {
    const rows = await db.testimonial.findMany({
      where: { storeId: store.id, authorName: { startsWith: u.match } },
      select: { id: true, authorName: true },
    });
    for (const r of rows) {
      await db.testimonial.update({ where: { id: r.id }, data: { rating: u.rating, createdAt: new Date(u.date) } });
      console.log('Updated', r.authorName, '→', u.rating + '★', u.date);
    }
  }
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
