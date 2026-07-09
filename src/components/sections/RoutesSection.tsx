import { getTranslations } from 'next-intl/server';
import GoldDivider from '@/components/ui/GoldDivider';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Route {
  id: string;
  nameKey: string;
  price: number;
  description: string | null;
}

interface RoutesSectionProps {
  routes: Route[];
}

export default async function RoutesSection({ routes }: RoutesSectionProps) {
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
          const priceStr = Number.isInteger(route.price)
            ? `€${route.price}`
            : `€${route.price.toFixed(2)}`;

          return (
            <ScrollReveal key={route.id} direction="scale" delay={i * 100}>
              <div className="service-card">
                <div>
                  <h3 className="service-card__name">{route.nameKey}</h3>
                  {route.description && (
                    <p className="service-card__desc">{route.description}</p>
                  )}
                </div>
                <div className="service-card__price">{priceStr}</div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <p className="booking__note">{t('note')}</p>
    </section>
  );
}
