import { getSiteSettings, getWhatsappSettings, getSocialLinks } from "@/lib/data";
import { formatWhatsAppUrl } from "@/lib/utils";
import ContactPageContent from "@/components/public/ContactPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Dr. Bruno Aparecido",
  description: "Entre em contato com o Dr. Bruno Aparecido. Agende sua consulta.",
};

export const dynamic = "force-dynamic";

export default async function ContatoPage() {
  const [settings, whatsapp, socials] = await Promise.all([
    getSiteSettings(),
    getWhatsappSettings(),
    getSocialLinks(),
  ]);

  const whatsappUrl = whatsapp
    ? formatWhatsAppUrl(whatsapp.phoneNumber, whatsapp.contactMessage)
    : "#";

  return (
    <ContactPageContent
      settings={settings}
      whatsappUrl={whatsappUrl}
      socials={socials}
    />
  );
}
