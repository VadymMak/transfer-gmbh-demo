import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const db = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL })) });
async function main() {
  const store = await db.store.findUniqueOrThrow({ where: { slug: 'transfer-gmbh' }, select: { id: true } });
  const del = await db.testimonial.deleteMany({ where: { storeId: store.id } });
  console.log('Deleted fake testimonials:', del.count);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
