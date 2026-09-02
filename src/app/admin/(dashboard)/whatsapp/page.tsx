import { getWhatsappSettings } from "@/lib/data";
import WhatsappAdmin from "@/components/admin/WhatsappAdmin";

export default async function WhatsappAdminPage() {
  const whatsapp = await getWhatsappSettings();
  return <WhatsappAdmin whatsapp={whatsapp} />;
}
