import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface StatItem { number: string; label: string; }

interface StatsBarProps {
  googleRating?: number;
}

export default async function StatsBar({ googleRating }: StatsBarProps) {
  const t = await getTranslations('stats');

  const stats: StatItem[] = [
    { number: '5+',   label: t('yearsLabel')        },
    { number: '2K+',  label: t('clientsLabel')      },
    { number: '2',    label: t('vehicles')           },
    { number: '10+',  label: t('destinations')       },
    { number: '24/7', label: t('availability')       },
    ...(googleRating != null ? [{ number: String(googleRating), label: t('googleLabel') }] : []),
  ];

  return (
    <ScrollReveal direction="up">
      <div className="stats-bar">
        <div className="stats-bar__grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stats-bar__number">{stat.number}</div>
              <div className="stats-bar__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
