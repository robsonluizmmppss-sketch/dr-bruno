import { prisma } from "./prisma";
import { cache } from "react";

export const getSiteSettings = cache(async () => {
  return prisma.siteSettings.findFirst() ?? null;
});

export const getHeroSettings = cache(async () => {
  return prisma.heroSettings.findFirst() ?? null;
});

export const getAboutSettings = cache(async () => {
  return prisma.aboutSettings.findFirst() ?? null;
});

export const getServices = cache(async (activeOnly = true) => {
  return prisma.service.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getServiceBySlug = cache(async (slug: string) => {
  return prisma.service.findUnique({ where: { slug } });
});

export const getTestimonials = cache(async (activeOnly = true) => {
  return prisma.testimonial.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getDifferentials = cache(async (activeOnly = true) => {
  return prisma.differential.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getGalleryImages = cache(async (category?: string) => {
  return prisma.galleryImage.findMany({
    where: category ? { category } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getBlogPosts = cache(async (publishedOnly = true) => {
  return prisma.blogPost.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { createdAt: "desc" },
  });
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  return prisma.blogPost.findUnique({ where: { slug } });
});

export const getSocialLinks = cache(async (activeOnly = true) => {
  return prisma.socialLink.findMany({
    where: activeOnly ? { isActive: true } : undefined,
  });
});

export const getWhatsappSettings = cache(async () => {
  return prisma.whatsappSettings.findFirst() ?? null;
});

export const getContactSettings = cache(async () => {
  return prisma.contactSettings.findFirst() ?? null;
});

export const getSeoSettings = cache(async () => {
  return prisma.seoSettings.findFirst() ?? null;
});

export const getCtaSettings = cache(async () => {
  return prisma.ctaSettings.findFirst() ?? null;
});

export const getClinicSection = cache(async () => {
  return prisma.clinicSection.findFirst() ?? null;
});

export const getDashboardStats = cache(async () => {
  const [
    totalVisits,
    whatsappClicks,
    appointmentClicks,
    activeServices,
    activeTestimonials,
    totalPosts,
    totalImages,
  ] = await Promise.all([
    prisma.analytics.count({ where: { event: "page_view" } }),
    prisma.analytics.count({ where: { event: "whatsapp_click" } }),
    prisma.analytics.count({ where: { event: "appointment_click" } }),
    prisma.service.count({ where: { isActive: true } }),
    prisma.testimonial.count({ where: { isActive: true } }),
    prisma.blogPost.count(),
    prisma.galleryImage.count(),
  ]);

  return {
    totalVisits,
    whatsappClicks,
    appointmentClicks,
    activeServices,
    activeTestimonials,
    totalPosts,
    totalImages,
  };
});
