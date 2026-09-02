import { getAboutSettings, getDifferentials } from "@/lib/data";
import AboutPageContent from "@/components/public/AboutPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Dr. Bruno Aparecido",
  description: "Conheça o Dr. Bruno Aparecido, Cirurgião-Dentista. Formação, experiência e diferenciais.",
};

export const dynamic = "force-dynamic";

export default async function SobrePage() {
  const [about, differentials] = await Promise.all([
    getAboutSettings(),
    getDifferentials(),
  ]);

  return <AboutPageContent about={about} differentials={differentials} />;
}
