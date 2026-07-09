import { getTranslations } from 'next-intl/server';
import GoldDivider from '@/components/ui/GoldDivider';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface FleetVehicle {
  id: string;
  nameKey: string;
  description: string | null;
  metadata?: unknown;
}

interface VehicleMeta {
  capacity?: string;
  luggage?: string;
  model?: string;
}

interface FleetSectionProps {
  fleet: FleetVehicle[];
}

export default async function FleetSection({ fleet }: FleetSectionProps) {
  const t = await getTranslations('fleet');

  return (
    <section id="fuhrpark" className="team">
      <ScrollReveal direction="up" className="section-header">
        <p className="section-label">{t('label')}</p>
        <h2 className="section-title">{t('title')}</h2>
        <GoldDivider />
        <p className="section-subtitle">{t('subtitle')}</p>
      </ScrollReveal>

      <div className="team-grid">
        {fleet.map((vehicle, i) => {
          const meta = (vehicle.metadata as VehicleMeta) ?? {};
          const capacity = meta?.capacity ?? '';
          const luggage  = meta?.luggage  ?? '';
          const model    = meta?.model    ?? '';

          return (
            <ScrollReveal key={vehicle.id} direction="up" delay={i * 120}>
              <div className="team-card">
                <div className="team-photo-container">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth="1.5"
                    >
                      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h13l4 4v4a2 2 0 0 1-2 2h-2M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="team-name">{vehicle.nameKey}</h3>

                {capacity && (
                  <p className="team-role">
                    {t('capacityLabel')}: {capacity}
                  </p>
                )}

                {(luggage || model) && (
                  <p className="team-exp">
                    {luggage && `${t('luggageLabel')}: ${luggage}`}
                    {luggage && model && ' · '}
                    {model && `${t('modelLabel')}: ${model}`}
                  </p>
                )}

                {vehicle.description && (
                  <p className="team-exp">{vehicle.description}</p>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
