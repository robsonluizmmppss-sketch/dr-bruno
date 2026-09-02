import { getAboutSettings } from "@/lib/data";
import AboutAdmin from "@/components/admin/AboutAdmin";

export default async function AboutAdminPage() {
  const about = await getAboutSettings();
  return <AboutAdmin about={about} />;
}
