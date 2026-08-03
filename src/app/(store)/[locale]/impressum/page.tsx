import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import styles from '../legal.module.css';

const BACK: Record<string, string> = {
  sk: '← Späť na hlavnú stránku',
  cs: '← Zpět na hlavní stránku',
  de: '← Zurück zur Startseite',
  en: '← Back to homepage',
  ru: '← На главную',
  uk: '← На головну',
};

type Content = {
  title: string;
  subtitle: string;
  operator: string;
  contact: string;
  phone: string;
  ids: string;
  regLabel: string;
  notVat: string;
  activityHeading: string;
  activity: string;
  disclaimerHeading: string;
  disclaimer: string;
};

const CONTENT: Record<string, Content> = {
  sk: {
    title: 'Prevádzkovateľ',
    subtitle: 'Informácie o prevádzkovateľovi',
    operator: 'Prevádzkovateľ',
    contact: 'Kontakt',
    phone: 'Telefón',
    ids: 'Identifikačné údaje',
    regLabel: 'Číslo živnostenského registra',
    notVat: 'Neplatca DPH',
    activityHeading: 'Predmet podnikania',
    activity: 'Osobná cestná doprava — taxislužba, osobný a skupinový transfer. Preukaz vodiča vozidla taxislužby č. T48180, vydaný dňa 09. 01. 2026, Okresný úrad Trenčín, odbor cestnej dopravy a pozemných komunikácií.',
    disclaimerHeading: 'Vylúčenie zodpovednosti',
    disclaimer: 'Napriek starostlivej kontrole obsahu nepreberáme zodpovednosť za obsah externých odkazov. Za obsah odkazovaných stránok zodpovedajú výlučne ich prevádzkovatelia.',
  },
  cs: {
    title: 'Provozovatel',
    subtitle: 'Informace o provozovateli',
    operator: 'Provozovatel',
    contact: 'Kontakt',
    phone: 'Telefon',
    ids: 'Identifikační údaje',
    regLabel: 'Číslo živnostenského rejstříku',
    notVat: 'Neplátce DPH',
    activityHeading: 'Předmět podnikání',
    activity: 'Osobní silniční doprava — taxislužba, osobní a skupinový transfer. Průkaz řidiče vozidla taxislužby č. T48180, vydaný dne 09. 01. 2026, Okresní úřad Trenčín, odbor silniční dopravy.',
    disclaimerHeading: 'Vyloučení odpovědnosti',
    disclaimer: 'I přes pečlivou kontrolu obsahu nepřebíráme odpovědnost za obsah externích odkazů. Za obsah odkazovaných stránek odpovídají výhradně jejich provozovatelé.',
  },
  de: {
    title: 'Impressum',
    subtitle: 'Angaben zum Betreiber',
    operator: 'Betreiber',
    contact: 'Kontakt',
    phone: 'Telefon',
    ids: 'Identifikationsdaten',
    regLabel: 'Gewerberegisternummer',
    notVat: 'Kein Umsatzsteuerzahler',
    activityHeading: 'Geschäftstätigkeit',
    activity: 'Personenbeförderung im Straßenverkehr — Taxidienst, Einzel- und Gruppentransfer. Fahrerausweis für Taxifahrzeuge Nr. T48180, ausgestellt am 09. 01. 2026, Bezirksamt Trenčín, Abteilung für Straßenverkehr.',
    disclaimerHeading: 'Haftungsausschluss',
    disclaimer: 'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
  },
  en: {
    title: 'Legal Notice',
    subtitle: 'Provider information',
    operator: 'Operator',
    contact: 'Contact',
    phone: 'Phone',
    ids: 'Identification',
    regLabel: 'Trade register number',
    notVat: 'Not a VAT payer',
    activityHeading: 'Business activity',
    activity: 'Passenger road transport — taxi service, individual and group transfers. Taxi driver licence No. T48180, issued on 9 January 2026 by the District Office Trenčín, Department of Road Transport.',
    disclaimerHeading: 'Disclaimer',
    disclaimer: 'Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.',
  },
  ru: {
    title: 'Правовая информация',
    subtitle: 'Сведения о поставщике услуг',
    operator: 'Оператор',
    contact: 'Контакты',
    phone: 'Телефон',
    ids: 'Реквизиты',
    regLabel: 'Номер в реестре предпринимателей',
    notVat: 'Не плательщик НДС',
    activityHeading: 'Вид деятельности',
    activity: 'Пассажирские автомобильные перевозки — такси, индивидуальный и групповой трансфер. Удостоверение водителя такси № T48180, выдано 09.01.2026, Окружное управление Тренчин, отдел дорожного транспорта.',
    disclaimerHeading: 'Отказ от ответственности',
    disclaimer: 'Несмотря на тщательную проверку содержания, мы не несём ответственности за содержание внешних ссылок. За содержание страниц, на которые ведут ссылки, отвечают исключительно их операторы.',
  },
  uk: {
    title: 'Правова інформація',
    subtitle: 'Відомості про постачальника послуг',
    operator: 'Оператор',
    contact: 'Контакти',
    phone: 'Телефон',
    ids: 'Реквізити',
    regLabel: 'Номер у реєстрі підприємців',
    notVat: 'Не платник ПДВ',
    activityHeading: 'Вид діяльності',
    activity: 'Пасажирські автомобільні перевезення — таксі, індивідуальний і груповий трансфер. Посвідчення водія таксі № T48180, видане 09.01.2026, Окружне управління Тренчин, відділ дорожнього транспорту.',
    disclaimerHeading: 'Відмова від відповідальності',
    disclaimer: 'Незважаючи на ретельну перевірку вмісту, ми не несемо відповідальності за вміст зовнішніх посилань. За вміст сторінок, на які ведуть посилання, відповідають виключно їхні оператори.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.sk;
  return { title: `${c.title} | Euroschnell`, robots: { index: false } };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale] ?? CONTENT.sk;
  const back = BACK[locale] ?? BACK.sk;

  return (
    <main className={styles.legal}>
      <div className={styles.legal__inner}>
        <Link href={`/${locale}`} className={styles.legal__back}>{back}</Link>
        <h1 className={styles.legal__title}>{c.title}</h1>
        <p className={styles.legal__subtitle}>{c.subtitle}</p>

        <section className={styles.legal__section}>
          <h2>{c.operator}</h2>
          <p>Mykola Bieliaiev<br />
          Východná 2336/13<br />
          911 08 Trenčín, Slovensko</p>
        </section>

        <section className={styles.legal__section}>
          <h2>{c.contact}</h2>
          <p>{c.phone}: +421 948 976 954<br />
          E-mail: info@euroschnell.eu</p>
        </section>

        <section className={styles.legal__section}>
          <h2>{c.ids}</h2>
          <p>IČO: 53647190<br />
          {c.regLabel}: 350-45888<br />
          {c.notVat}</p>
        </section>

        <section className={styles.legal__section}>
          <h2>{c.activityHeading}</h2>
          <p>{c.activity}</p>
        </section>

        <section className={styles.legal__section}>
          <h2>{c.disclaimerHeading}</h2>
          <p>{c.disclaimer}</p>
        </section>
      </div>
    </main>
  );
}
