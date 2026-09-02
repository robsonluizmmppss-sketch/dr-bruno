import { getTestimonials } from "@/lib/data";
import TestimonialsAdmin from "@/components/admin/TestimonialsAdmin";

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials(false);
  return <TestimonialsAdmin testimonials={testimonials} />;
}
