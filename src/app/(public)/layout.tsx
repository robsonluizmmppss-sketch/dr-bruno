import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import WhatsAppButton from "@/components/public/WhatsAppButton";
import BottomBar from "@/components/public/BottomBar";
import SchemaOrg from "@/components/public/SchemaOrg";
import { getSiteSettings, getWhatsappSettings, getSocialLinks } from "@/lib/data";
import { formatWhatsAppUrl } from "@/lib/utils";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let settings = null;
  let whatsapp = null;
  let socials: any[] = [];

  try {
    [settings, whatsapp, socials] = await Promise.all([
      getSiteSettings(),
      getWhatsappSettings(),
      getSocialLinks(),
    ]);
  } catch {}

  const whatsappUrl = whatsapp
    ? formatWhatsAppUrl(whatsapp.phoneNumber, whatsapp.defaultMessage)
    : "#";

  return (
    <>
      <SchemaOrg settings={settings} />
      <Header
        siteName={settings?.siteName || "Dr. Bruno Aparecido"}
        whatsappUrl={whatsappUrl}
      />
      <main>{children}</main>
      <Footer
        settings={settings || ({} as any)}
        socials={socials}
        whatsappUrl={whatsappUrl}
      />
      <WhatsAppButton
        url={whatsappUrl}
        show={whatsapp?.showFloatingButton ?? true}
      />
      <BottomBar
        whatsappUrl={whatsappUrl}
        show={whatsapp?.showBottomBar ?? true}
        buttonText={whatsapp?.buttonText || "Falar pelo WhatsApp"}
      />
    </>
  );
}
