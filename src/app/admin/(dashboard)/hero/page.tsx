import { getHeroSettings } from "@/lib/data";
import HeroAdmin from "@/components/admin/HeroAdmin";

export default async function HeroAdminPage() {
  const hero = await getHeroSettings();
  return <HeroAdmin hero={hero} />;
}
