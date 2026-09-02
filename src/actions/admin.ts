"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/lib/utils";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

// ── Hero ──
export async function updateHero(data: Record<string, unknown>) {
  await requireAuth();
  const hero = await prisma.heroSettings.findFirst();
  if (hero) {
    await prisma.heroSettings.update({ where: { id: hero.id }, data });
  }
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

// ── About ──
export async function updateAbout(data: Record<string, unknown>) {
  await requireAuth();
  const about = await prisma.aboutSettings.findFirst();
  if (about) {
    await prisma.aboutSettings.update({ where: { id: about.id }, data });
  }
  revalidatePath("/");
  revalidatePath("/sobre");
  revalidatePath("/admin/sobre");
}

// ── Services ──
export async function createService(data: {
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
}) {
  await requireAuth();
  const slug = generateSlug(data.name);
  const maxOrder = await prisma.service.aggregate({ _max: { order: true } });
  await prisma.service.create({
    data: { ...data, slug, order: (maxOrder._max.order || 0) + 1 },
  });
  revalidatePath("/");
  revalidatePath("/servicos");
  revalidatePath("/admin/servicos");
}

export async function updateService(id: string, data: Record<string, unknown>) {
  await requireAuth();
  if (data.name && typeof data.name === "string") {
    data.slug = generateSlug(data.name);
  }
  await prisma.service.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/servicos");
  revalidatePath("/admin/servicos");
}

export async function deleteService(id: string) {
  await requireAuth();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/servicos");
  revalidatePath("/admin/servicos");
}

export async function reorderServices(ids: string[]) {
  await requireAuth();
  await Promise.all(ids.map((id, i) => prisma.service.update({ where: { id }, data: { order: i } })));
  revalidatePath("/");
  revalidatePath("/servicos");
}

// ── Testimonials ──
export async function createTestimonial(data: {
  name: string;
  text: string;
  rating?: number;
  photo?: string;
}) {
  await requireAuth();
  const maxOrder = await prisma.testimonial.aggregate({ _max: { order: true } });
  await prisma.testimonial.create({
    data: { ...data, order: (maxOrder._max.order || 0) + 1 },
  });
  revalidatePath("/");
  revalidatePath("/depoimentos");
  revalidatePath("/admin/depoimentos");
}

export async function updateTestimonial(id: string, data: Record<string, unknown>) {
  await requireAuth();
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/depoimentos");
  revalidatePath("/admin/depoimentos");
}

export async function deleteTestimonial(id: string) {
  await requireAuth();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/depoimentos");
  revalidatePath("/admin/depoimentos");
}

// ── Gallery ──
export async function createGalleryImage(data: {
  url: string;
  alt?: string;
  caption?: string;
  category?: string;
}) {
  await requireAuth();
  const maxOrder = await prisma.galleryImage.aggregate({ _max: { order: true } });
  await prisma.galleryImage.create({
    data: { ...data, order: (maxOrder._max.order || 0) + 1 },
  });
  revalidatePath("/admin/galeria");
}

export async function updateGalleryImage(id: string, data: Record<string, unknown>) {
  await requireAuth();
  await prisma.galleryImage.update({ where: { id }, data });
  revalidatePath("/admin/galeria");
}

export async function deleteGalleryImage(id: string) {
  await requireAuth();
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/galeria");
}

// ── Blog ──
export async function createBlogPost(data: {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags?: string;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
}) {
  await requireAuth();
  const slug = generateSlug(data.title);
  const publishedAt = data.status === "published" ? new Date() : null;
  await prisma.blogPost.create({
    data: { ...data, slug, publishedAt },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function updateBlogPost(id: string, data: Record<string, unknown>) {
  await requireAuth();
  if (data.title && typeof data.title === "string") {
    data.slug = generateSlug(data.title);
  }
  if (data.status === "published") {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing?.publishedAt) {
      data.publishedAt = new Date();
    }
  }
  await prisma.blogPost.update({ where: { id }, data });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireAuth();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

// ── Differentials ──
export async function createDifferential(data: { title: string; description: string; icon?: string }) {
  await requireAuth();
  const maxOrder = await prisma.differential.aggregate({ _max: { order: true } });
  await prisma.differential.create({
    data: { ...data, order: (maxOrder._max.order || 0) + 1 },
  });
  revalidatePath("/");
  revalidatePath("/sobre");
}

export async function updateDifferential(id: string, data: Record<string, unknown>) {
  await requireAuth();
  await prisma.differential.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/sobre");
}

export async function deleteDifferential(id: string) {
  await requireAuth();
  await prisma.differential.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/sobre");
}

// ── WhatsApp ──
export async function updateWhatsapp(data: Record<string, unknown>) {
  await requireAuth();
  const ws = await prisma.whatsappSettings.findFirst();
  if (ws) {
    await prisma.whatsappSettings.update({ where: { id: ws.id }, data });
  }
  revalidatePath("/");
  revalidatePath("/admin/whatsapp");
}

// ── Social Links ──
export async function updateSocialLink(platform: string, data: { url: string; isActive: boolean }) {
  await requireAuth();
  await prisma.socialLink.upsert({
    where: { platform },
    update: data,
    create: { platform, ...data },
  });
  revalidatePath("/");
  revalidatePath("/admin/redes-sociais");
}

// ── SEO ──
export async function updateSeo(data: Record<string, unknown>) {
  await requireAuth();
  const seo = await prisma.seoSettings.findFirst();
  if (seo) {
    await prisma.seoSettings.update({ where: { id: seo.id }, data });
  }
  revalidatePath("/");
  revalidatePath("/admin/seo");
}

// ── Site Settings ──
export async function updateSiteSettings(data: Record<string, unknown>) {
  await requireAuth();
  const settings = await prisma.siteSettings.findFirst();
  if (settings) {
    await prisma.siteSettings.update({ where: { id: settings.id }, data });
  }
  revalidatePath("/");
  revalidatePath("/contato");
  revalidatePath("/admin/configuracoes");
}

// ── Contact Settings ──
export async function updateContactSettings(data: Record<string, unknown>) {
  await requireAuth();
  const cs = await prisma.contactSettings.findFirst();
  if (cs) {
    await prisma.contactSettings.update({ where: { id: cs.id }, data });
  }
  revalidatePath("/contato");
  revalidatePath("/admin/contato");
}

// ── CTA ──
export async function updateCta(data: Record<string, unknown>) {
  await requireAuth();
  const cta = await prisma.ctaSettings.findFirst();
  if (cta) {
    await prisma.ctaSettings.update({ where: { id: cta.id }, data });
  }
  revalidatePath("/");
}

// ── Clinic Section ──
export async function updateClinicSection(data: Record<string, unknown>) {
  await requireAuth();
  const clinic = await prisma.clinicSection.findFirst();
  if (clinic) {
    await prisma.clinicSection.update({ where: { id: clinic.id }, data });
  }
  revalidatePath("/");
}

// ── Upload ──
export async function uploadImage(formData: FormData) {
  await requireAuth();

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Tipo de arquivo não permitido");
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("Arquivo muito grande (máximo 5MB)");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  if (process.env.CLOUDINARY_API_KEY && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    const cloudinary = (await import("cloudinary")).v2;
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "drbruno",
    });

    return result.secure_url;
  }

  const fs = await import("fs/promises");
  const path = await import("path");
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filepath = path.join(uploadDir, filename);

  await fs.writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}
