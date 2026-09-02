import { getSeoSettings } from "@/lib/data";
import SeoAdmin from "@/components/admin/SeoAdmin";

export default async function SeoAdminPage() {
  const seo = await getSeoSettings();
  return <SeoAdmin seo={seo} />;
}
