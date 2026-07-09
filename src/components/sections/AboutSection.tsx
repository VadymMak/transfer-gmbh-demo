import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GoldDivider from '@/components/ui/GoldDivider';

interface AboutSectionProps {
  aboutImage?: string | null;
}

export default async function AboutSection({ aboutImage }: AboutSectionProps) {
  const t = await getTranslations('about');

  return (
    <section id="ueber-uns" className="about">
      <div className="about__grid">
        <ScrollReveal direction="left">
          <div className="about__image-wrap">
            {aboutImage ? (
              <Image
                src={aboutImage}
                alt={t('imageAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="about__image"
                unoptimized={aboutImage.startsWith('http')}
              />
            ) : (
              <div className="about__image-placeholder" />
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={150}>
          <div>
            <p className="about__label">{t('label')}</p>
            <h2 className="about__title">{t('title')}</h2>
            <GoldDivider />
            <p className="about__text">{t('text1')}</p>
            <p className="about__text">{t('text2')}</p>
            <p className="about__text">{t('text3')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
