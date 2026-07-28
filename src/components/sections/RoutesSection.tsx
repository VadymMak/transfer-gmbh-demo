import { getTranslations } from 'next-intl/server';
import GoldDivider from '@/components/ui/GoldDivider';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface RouteMeta {
  nameI18n?: Record<string, string>;
  featured?: boolean;
}

interface Route {
  id: string;
  nameKey: string;
  price: number;
  description: string | null;
  sortOrder: number;
  metadata: unknown;
}

interface RoutesSectionProps {
  routes: Route[];
  locale: string;
}

export default async function RoutesSection({ routes, locale }: RoutesSectionProps) {
  const t = await getTranslations('routes');

  return (
    <section id="strecken" className="services">
      <ScrollReveal direction="up" className="section-header">
        <p className="section-label">{t('label')}</p>
        <h2 className="section-title">{t('title')}</h2>
        <GoldDivider />
        <p className="section-subtitle">{t('subtitle')}</p>
      </ScrollReveal>

      <div className="services__grid">
        {routes.map((route, i) => {
          const meta = route.metadata as RouteMeta | null;
          const name = meta?.nameI18n?.[locale] ?? meta?.nameI18n?.['de'] ?? route.nameKey;
          const featured = meta?.featured ?? false;
          const priceStr = Number.isInteger(route.price)
            ? `${route.price} €`
            : `${route.price.toFixed(2)} €`;

          return (
            <ScrollReveal key={route.id} direction="scale" delay={i * 80}>
              <div className={`service-card${featured ? ' service-card--featured' : ''}`}>
                <div>
                  {featured && (
                    <span className="service-card__badge">{t('featuredLabel')}</span>
                  )}
                  <h3 className="service-card__name">{name}</h3>
                  {route.description && (
                    <p className="service-card__desc">{route.description}</p>
                  )}
                </div>
                <div className="service-card__price">
                  <span className="service-card__price-label">{t('priceLabel')}</span>
                  <strong>{priceStr}</strong>
                  <span className="service-card__price-caption">{t('vehicleCaption')}</span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <p className="booking__note">{t('note')}</p>
    </section>
  );
}
