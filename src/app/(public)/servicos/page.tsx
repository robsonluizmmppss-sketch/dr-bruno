import { getServices } from "@/lib/data";
import ServicesPageContent from "@/components/public/ServicesPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços | Dr. Bruno Aparecido",
  description: "Conheça os serviços e especialidades do Dr. Bruno Aparecido.",
};

export const dynamic = "force-dynamic";

export default async function ServicosPage() {
  const services = await getServices();
  return <ServicesPageContent services={services} />;
}
