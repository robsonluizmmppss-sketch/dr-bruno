import HeroSection from "@/components/public/HeroSection";
import ServicesSection from "@/components/public/ServicesSection";
import AboutSection from "@/components/public/AboutSection";
import DifferentialsSection from "@/components/public/DifferentialsSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import ClinicSection from "@/components/public/ClinicSection";
import CtaSection from "@/components/public/CtaSection";
import {
  getHeroSettings,
  getServices,
  getAboutSettings,
  getDifferentials,
  getTestimonials,
  getWhatsappSettings,
  getClinicSection,
  getCtaSettings,
  getSeoSettings,
} from "@/lib/data";
import { formatWhatsAppUrl } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeoSettings();
    return {
      title: seo?.metaTitle || "Dr. Bruno Aparecido | Cirurgião-Dentista",
      description: seo?.metaDescription || "Consultório odontológico do Dr. Bruno Aparecido.",
      keywords: seo?.keywords || "",
      openGraph: {
        title: seo?.ogTitle || seo?.metaTitle || "",
        description: seo?.ogDescription || seo?.metaDescription || "",
        images: seo?.ogImage ? [seo.ogImage] : [],
        type: "website",
      },
    };
  } catch {
    return {
      title: "Dr. Bruno Aparecido | Cirurgião-Dentista",
      description: "Consultório odontológico do Dr. Bruno Aparecido.",
    };
  }
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, services, about, differentials, testimonials, whatsapp, clinic, cta] =
    await Promise.all([
      getHeroSettings(),
      getServices(),
      getAboutSettings(),
      getDifferentials(),
      getTestimonials(),
      getWhatsappSettings(),
      getClinicSection(),
      getCtaSettings(),
    ]);

  const whatsappUrl = whatsapp
    ? formatWhatsAppUrl(whatsapp.phoneNumber, whatsapp.defaultMessage)
    : "#";

  return (
    <>
      {hero && <HeroSection hero={hero} whatsappUrl={whatsappUrl} />}
      <ServicesSection services={services} />
      {about && <AboutSection about={about} />}
      <DifferentialsSection differentials={differentials} />
      {clinic && <ClinicSection clinic={clinic} />}
      <TestimonialsSection testimonials={testimonials} />
      {cta && <CtaSection cta={cta} whatsappUrl={whatsappUrl} />}
    </>
  );
}
