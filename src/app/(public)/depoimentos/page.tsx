import { getTestimonials } from "@/lib/data";
import TestimonialsPageContent from "@/components/public/TestimonialsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Depoimentos | Dr. Bruno Aparecido",
  description: "Veja o que nossos pacientes dizem sobre o atendimento do Dr. Bruno Aparecido.",
};

export const dynamic = "force-dynamic";

export default async function DepoimentosPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsPageContent testimonials={testimonials} />;
}
