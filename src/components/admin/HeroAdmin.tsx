"use client";

import { useState } from "react";
import AdminPageWrapper from "./AdminPageWrapper";
import AdminFormField from "./AdminFormField";
import { updateHero } from "@/actions/admin";
import type { HeroSettings } from "@/types";

export default function HeroAdmin({ hero }: { hero: HeroSettings | null }) {
  const [form, setForm] = useState({
    badge: hero?.badge || "",
    title: hero?.title || "",
    subtitle: hero?.subtitle || "",
    buttonPrimary: hero?.buttonPrimary || "",
    buttonSecondary: hero?.buttonSecondary || "",
    image: hero?.image || "",
    card1Title: hero?.card1Title || "",
    card2Title: hero?.card2Title || "",
    card3Title: hero?.card3Title || "",
    isActive: String(hero?.isActive ?? true),
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updateHero({
      ...form,
      isActive: form.isActive === "true",
    });
  }

  return (
    <AdminPageWrapper title="Hero Section" subtitle="Gerencie o banner principal do site" onSave={handleSave}>
      <div className="space-y-5">
        <AdminFormField label="Ativo" name="isActive" value={form.isActive} onChange={handleChange} type="toggle" />
        <AdminFormField label="Badge" name="badge" value={form.badge} onChange={handleChange} placeholder="ODONTOLOGIA COM EXCELÊNCIA" />
        <AdminFormField label="Título" name="title" value={form.title} onChange={handleChange} type="textarea" rows={2} />
        <AdminFormField label="Subtítulo" name="subtitle" value={form.subtitle} onChange={handleChange} type="textarea" rows={3} />
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminFormField label="Botão Primário" name="buttonPrimary" value={form.buttonPrimary} onChange={handleChange} />
          <AdminFormField label="Botão Secundário" name="buttonSecondary" value={form.buttonSecondary} onChange={handleChange} />
        </div>
        <AdminFormField label="Imagem" name="image" value={form.image} onChange={handleChange} type="image" />
        <div className="grid sm:grid-cols-3 gap-4">
          <AdminFormField label="Card 1" name="card1Title" value={form.card1Title} onChange={handleChange} />
          <AdminFormField label="Card 2" name="card2Title" value={form.card2Title} onChange={handleChange} />
          <AdminFormField label="Card 3" name="card3Title" value={form.card3Title} onChange={handleChange} />
        </div>
      </div>
    </AdminPageWrapper>
  );
}
