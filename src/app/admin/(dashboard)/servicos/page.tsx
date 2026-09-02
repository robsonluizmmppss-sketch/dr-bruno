import { getServices } from "@/lib/data";
import ServicesAdmin from "@/components/admin/ServicesAdmin";

export default async function ServicesAdminPage() {
  const services = await getServices(false);
  return <ServicesAdmin services={services} />;
}
