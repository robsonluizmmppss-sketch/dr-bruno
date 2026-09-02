import { getServiceBySlug, getServices, getWhatsappSettings } from "@/lib/data";
import { formatWhatsAppUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import ServiceDetailContent from "@/components/public/ServiceDetailContent";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const services = await getServices();
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle || `${service.name} | Dr. Bruno Aparecido`,
    description: service.seoDescription || service.shortDescription,
  };
}

export const dynamic = "force-dynamic";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, whatsapp] = await Promise.all([
    getServiceBySlug(slug),
    getWhatsappSettings(),
  ]);

  if (!service) notFound();

  const whatsappUrl = whatsapp
    ? formatWhatsAppUrl(whatsapp.phoneNumber, whatsapp.serviceMessage + service.name)
    : "#";

  return <ServiceDetailContent service={service} whatsappUrl={whatsappUrl} />;
}
