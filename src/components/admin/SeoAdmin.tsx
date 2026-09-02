"use client";

import { useState } from "react";
import AdminPageWrapper from "./AdminPageWrapper";
import AdminFormField from "./AdminFormField";
import { updateSeo } from "@/actions/admin";
import type { SeoSettings } from "@/types";

export default function SeoAdmin({ seo }: { seo: SeoSettings | null }) {
  const [form, setForm] = useState({
    metaTitle: seo?.metaTitle || "",
    metaDescription: seo?.metaDescription || "",
    keywords: seo?.keywords || "",
    ogTitle: seo?.ogTitle || "",
    ogDescription: seo?.ogDescription || "",
    ogImage: seo?.ogImage || "",
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updateSeo(form);
  }

  return (
    <AdminPageWrapper title="SEO" subtitle="Otimização para mecanismos de busca" onSave={handleSave}>
      <div className="space-y-5">
        <AdminFormField label="Meta Title" name="metaTitle" value={form.metaTitle} onChange={handleChange} />
        <AdminFormField label="Meta Description" name="metaDescription" value={form.metaDescription} onChange={handleChange} type="textarea" rows={3} />
        <AdminFormField label="Keywords (separadas por vírgula)" name="keywords" value={form.keywords} onChange={handleChange} type="textarea" rows={2} />
        <h3 className="font-semibold text-[#07141C] pt-4">Open Graph</h3>
        <AdminFormField label="OG Title" name="ogTitle" value={form.ogTitle} onChange={handleChange} />
        <AdminFormField label="OG Description" name="ogDescription" value={form.ogDescription} onChange={handleChange} type="textarea" rows={2} />
        <AdminFormField label="OG Image" name="ogImage" value={form.ogImage} onChange={handleChange} type="image" />
      </div>
    </AdminPageWrapper>
  );
}
