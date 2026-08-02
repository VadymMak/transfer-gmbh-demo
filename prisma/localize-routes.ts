import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const db = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL })) });

// match = actual nameKey in DB (German); nameI18n = translations per locale
const data = [
  { match:'Trenčín → Flughafen Bratislava', nameI18n:{ sk:'Trenčín → Letisko Bratislava', cs:'Trenčín → Letiště Bratislava', de:'Trenčín → Flughafen Bratislava', en:'Trenčín → Bratislava Airport', ru:'Тренчин → Аэропорт Братиславы', uk:'Тренчин → Аеропорт Братислави' } },
  { match:'Trenčín → Flughafen Wien',        nameI18n:{ sk:'Trenčín → Letisko Viedeň',      cs:'Trenčín → Letiště Vídeň',      de:'Trenčín → Flughafen Wien',        en:'Trenčín → Vienna Airport',     ru:'Тренчин → Аэропорт Вены',          uk:'Тренчин → Аеропорт Відня' } },
  { match:'Trenčín → Wien',                  nameI18n:{ sk:'Trenčín → Viedeň',               cs:'Trenčín → Vídeň',               de:'Trenčín → Wien',                  en:'Trenčín → Vienna',             ru:'Тренчин → Вена',                   uk:'Тренчин → Відень' } },
  { match:'Trenčín → Prag',                  nameI18n:{ sk:'Trenčín → Praha',                cs:'Trenčín → Praha',               de:'Trenčín → Prag',                  en:'Trenčín → Prague',             ru:'Тренчин → Прага',                  uk:'Тренчин → Прага' } },
  { match:'Trenčín → Bratislava',            nameI18n:{ sk:'Trenčín → Bratislava',           cs:'Trenčín → Bratislava',          de:'Trenčín → Bratislava',            en:'Trenčín → Bratislava',         ru:'Тренчин → Братислава',             uk:'Тренчин → Братислава' } },
  { match:'Trenčín → Brno',                  nameI18n:{ sk:'Trenčín → Brno',                 cs:'Trenčín → Brno',                de:'Trenčín → Brno',                  en:'Trenčín → Brno',               ru:'Тренчин → Брно',                   uk:'Тренчин → Брно' } },
  { match:'Trenčín → Nové Zámky',            nameI18n:{ sk:'Trenčín → Nové Zámky',           cs:'Trenčín → Nové Zámky',          de:'Trenčín → Nové Zámky',            en:'Trenčín → Nové Zámky',         ru:'Тренчин → Нове-Замки',             uk:'Тренчин → Нове-Замки' } },
  { match:'Trenčín → Banská Bystrica',       nameI18n:{ sk:'Trenčín → Banská Bystrica',      cs:'Trenčín → Banská Bystrica',     de:'Trenčín → Banská Bystrica',       en:'Trenčín → Banská Bystrica',    ru:'Тренчин → Банска-Бистрица',        uk:'Тренчин → Банська-Бистриця' } },
  { match:'Trenčín → Oravský Podzámok',      nameI18n:{ sk:'Trenčín → Oravský Podzámok',     cs:'Trenčín → Oravský Podzámok',    de:'Trenčín → Oravský Podzámok',      en:'Trenčín → Oravský Podzámok',   ru:'Тренчин → Оравски-Подзамок',       uk:'Тренчин → Оравський Подзамок' } },
  { match:'Trenčín → Podhájska',             nameI18n:{ sk:'Trenčín → Podhájska',            cs:'Trenčín → Podhájska',           de:'Trenčín → Podhájska',             en:'Trenčín → Podhájska',          ru:'Тренчин → Подгайска',              uk:'Тренчин → Подгайська' } },
  { match:'Trenčín → Flughafen Katowice',    nameI18n:{ sk:'Trenčín → Letisko Katowice',     cs:'Trenčín → Letiště Katowice',    de:'Trenčín → Flughafen Kattowitz',   en:'Trenčín → Katowice Airport',   ru:'Тренчин → Аэропорт Катовице',      uk:'Тренчин → Аеропорт Катовіце' } },
  { match:'Trenčín → Košice',                nameI18n:{ sk:'Trenčín → Košice',               cs:'Trenčín → Košice',              de:'Trenčín → Košice',                en:'Trenčín → Košice',             ru:'Тренчин → Кошице',                 uk:'Тренчин → Кошице' } },
  { match:'Trenčín → Flughafen Prag',        nameI18n:{ sk:'Trenčín → Letisko Praha',        cs:'Trenčín → Letiště Praha',       de:'Trenčín → Flughafen Prag',        en:'Trenčín → Prague Airport',     ru:'Тренчин → Аэропорт Праги',         uk:'Тренчин → Аеропорт Праги' } },
];

async function main() {
  const store = await db.store.findUniqueOrThrow({ where: { slug: 'transfer-gmbh' }, select: { id: true } });
  for (const d of data) {
    const rows = await db.service.findMany({ where: { storeId: store.id, category: 'route', nameKey: d.match }, select: { id: true, metadata: true } });
    for (const r of rows) {
      const meta = { ...((r.metadata as object) ?? {}), nameI18n: d.nameI18n };
      await db.service.update({ where: { id: r.id }, data: { metadata: meta } });
      console.log('✓', d.match);
    }
    if (!rows.length) console.log('✗ not found:', d.match);
  }
}
main().catch(e=>{console.error(e);process.exit(1);}).finally(()=>db.$disconnect());
