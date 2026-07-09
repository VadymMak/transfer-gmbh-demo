import { setRequestLocale } from 'next-intl/server';
import { db } from '@/lib/db';
import { getStoreConfig } from '@/lib/store-config';
import HeroSection from '@/components/sections/HeroSection';
import DecorativeDivider from '@/components/ui/DecorativeDivider';
import StatsBar from '@/components/sections/StatsBar';
import TransferQuoteSection from '@/components/sections/TransferQuoteSection';
import RoutesSection from '@/components/sections/RoutesSection';
import FleetSection from '@/components/sections/FleetSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import GallerySection from '@/components/sections/GallerySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const config = await getStoreConfig();
  const { presence, whatsappLinks } = config;

  const [heroConfig, galleryImages, dbTestimonials, dbServices, dbFleet] = await Promise.all([
    db.heroConfig.findUnique({ where: { storeId: config.id } }),
    db.galleryImage.findMany({
      where: { storeId: config.id, active: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, url: true, alt: true },
    }),
    db.testimonial.findMany({
      where: { storeId: config.id, status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { customer: { select: { name: true } } },
    }),
    // Routes: services with category 'route'
    db.service.findMany({
      where: { storeId: config.id, active: true, category: 'route' },
      orderBy: { price: 'asc' },
      select: { id: true, nameKey: true, price: true, description: true },
    }),
    // Fleet: services with category 'fleet'
    db.service.findMany({
      where: { storeId: config.id, active: true, category: 'fleet' },
      orderBy: { price: 'asc' },
      select: { id: true, nameKey: true, description: true },
    }),
  ]);

  return (
    <>
      <HeroSection
        config={heroConfig}
        city={presence.city}
        googleRating={presence.googleRating}
        openingHours={presence.openingHours}
        whatsappBookingLink={whatsappLinks.booking}
        instagram={presence.instagram}
      />
      <DecorativeDivider />
      <StatsBar googleRating={presence.googleRating} />
      <TransferQuoteSection
        whatsappNumber={presence.whatsapp ?? presence.phone ?? undefined}
      />
      <RoutesSection routes={dbServices} />
      <FleetSection fleet={dbFleet} />
      <ServicesSection />
      <WhyUsSection city={presence.city} googleRating={presence.googleRating} address={presence.address} />
      <GallerySection images={galleryImages} layout={config.galleryLayout ?? undefined} />
      <TestimonialsSection testimonials={dbTestimonials.map((t) => ({
        id: t.id,
        name: t.authorName ?? t.customer?.name ?? 'Anonym',
        content: t.text,
        rating: t.rating,
        createdAt: t.createdAt.toISOString(),
        adminReply: t.adminReply,
        adminReplyAt: t.adminReplyAt?.toISOString() ?? null,
      }))} />
      <ContactSection
        address={presence.address}
        city={presence.city}
        phone={presence.phone}
        email={presence.email}
        mapLat={presence.mapCoords?.lat}
        mapLng={presence.mapCoords?.lng}
        workingHours={presence.openingHours}
        whatsappLocationLink={whatsappLinks.location}
      />
      <WhatsAppButton href={whatsappLinks.general} />
    </>
  );
}
