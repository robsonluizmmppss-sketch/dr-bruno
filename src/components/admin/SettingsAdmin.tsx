"use client";

import { useState } from "react";
import AdminPageWrapper from "./AdminPageWrapper";
import AdminFormField from "./AdminFormField";
import { updateSiteSettings } from "@/actions/admin";
import type { SiteSettings } from "@/types";

export default function SettingsAdmin({ settings }: { settings: SiteSettings | null }) {
  const [form, setForm] = useState({
    siteName: settings?.siteName || "",
    siteSubtitle: settings?.siteSubtitle || "",
    logo: settings?.logo || "",
    favicon: settings?.favicon || "",
    email: settings?.email || "",
    phone: settings?.phone || "",
    address: settings?.address || "",
    city: settings?.city || "",
    state: settings?.state || "",
    zipCode: settings?.zipCode || "",
    cro: settings?.cro || "",
    workingHours: settings?.workingHours || "",
    googleMapsUrl: settings?.googleMapsUrl || "",
    googleMapsEmbed: settings?.googleMapsEmbed || "",
    copyrightText: settings?.copyrightText || "",
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updateSiteSettings(form);
  }

  return (
    <AdminPageWrapper title="Configurações Gerais" subtitle="Informações do site e do consultório" onSave={handleSave}>
      <div className="space-y-5">
        <h3 className="font-semibold text-[#07141C]">Identidade</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminFormField label="Nome do site" name="siteName" value={form.siteName} onChange={handleChange} />
          <AdminFormField label="Subtítulo" name="siteSubtitle" value={form.siteSubtitle} onChange={handleChange} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminFormField label="Logo" name="logo" value={form.logo} onChange={handleChange} type="image" />
          <AdminFormField label="Favicon" name="favicon" value={form.favicon} onChange={handleChange} type="image" />
        </div>

        <h3 className="font-semibold text-[#07141C] pt-4">Contato</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminFormField label="E-mail" name="email" value={form.email} onChange={handleChange} />
          <AdminFormField label="Telefone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <AdminFormField label="CRO" name="cro" value={form.cro} onChange={handleChange} />

        <h3 className="font-semibold text-[#07141C] pt-4">Endereço</h3>
        <AdminFormField label="Endereço completo" name="address" value={form.address} onChange={handleChange} />
        <div className="grid sm:grid-cols-3 gap-4">
          <AdminFormField label="Cidade" name="city" value={form.city} onChange={handleChange} />
          <AdminFormField label="Estado" name="state" value={form.state} onChange={handleChange} />
          <AdminFormField label="CEP" name="zipCode" value={form.zipCode} onChange={handleChange} />
        </div>

        <h3 className="font-semibold text-[#07141C] pt-4">Funcionamento</h3>
        <AdminFormField label="Horário de atendimento" name="workingHours" value={form.workingHours} onChange={handleChange} type="textarea" rows={2} />

        <h3 className="font-semibold text-[#07141C] pt-4">Google Maps</h3>
        <AdminFormField label="URL do Google Maps" name="googleMapsUrl" value={form.googleMapsUrl} onChange={handleChange} />
        <AdminFormField label="Embed do Google Maps (iframe src)" name="googleMapsEmbed" value={form.googleMapsEmbed} onChange={handleChange} type="textarea" rows={2} placeholder="https://www.google.com/maps/embed?pb=..." />

        <h3 className="font-semibold text-[#07141C] pt-4">Outros</h3>
        <AdminFormField label="Texto do copyright" name="copyrightText" value={form.copyrightText} onChange={handleChange} />
      </div>
    </AdminPageWrapper>
  );
}
