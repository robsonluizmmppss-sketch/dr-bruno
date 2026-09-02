import { getSiteSettings } from "@/lib/data";
import SettingsAdmin from "@/components/admin/SettingsAdmin";

export default async function SettingsAdminPage() {
  const settings = await getSiteSettings();
  return <SettingsAdmin settings={settings} />;
}
