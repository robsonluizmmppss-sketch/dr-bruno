import { getContactSettings } from "@/lib/data";
import ContactAdmin from "@/components/admin/ContactAdmin";

export default async function ContactAdminPage() {
  const contact = await getContactSettings();
  return <ContactAdmin contact={contact} />;
}
