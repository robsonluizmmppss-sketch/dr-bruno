import { getSocialLinks } from "@/lib/data";
import SocialsAdmin from "@/components/admin/SocialsAdmin";

export default async function SocialsAdminPage() {
  const socials = await getSocialLinks(false);
  return <SocialsAdmin socials={socials} />;
}
