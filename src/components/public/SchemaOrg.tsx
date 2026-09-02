import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export default function SchemaOrg({ settings }: Props) {
  if (!settings) return null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
        name: settings.siteName,
        description: "Consultório odontológico do Dr. Bruno Aparecido. Atendimento personalizado com tecnologia e cuidado.",
        url: process.env.NEXT_PUBLIC_SITE_URL || "",
        telephone: settings.phone,
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: settings.city,
          addressRegion: settings.state,
          postalCode: settings.zipCode,
          addressCountry: "BR",
        },
        openingHours: settings.workingHours,
        priceRange: "$$",
        image: settings.logo || "",
        sameAs: [],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
