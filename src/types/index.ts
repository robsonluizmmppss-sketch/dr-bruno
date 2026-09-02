import type {
  SiteSettings,
  HeroSettings,
  AboutSettings,
  Service,
  Testimonial,
  GalleryImage,
  BlogPost,
  Differential,
  SocialLink,
  ContactSettings,
  WhatsappSettings,
  SeoSettings,
  CtaSettings,
  ClinicSection,
} from "@prisma/client";

export type {
  SiteSettings,
  HeroSettings,
  AboutSettings,
  Service,
  Testimonial,
  GalleryImage,
  BlogPost,
  Differential,
  SocialLink,
  ContactSettings,
  WhatsappSettings,
  SeoSettings,
  CtaSettings,
  ClinicSection,
};

export interface DashboardStats {
  totalVisits: number;
  whatsappClicks: number;
  appointmentClicks: number;
  activeServices: number;
  activeTestimonials: number;
  totalPosts: number;
  totalImages: number;
}
