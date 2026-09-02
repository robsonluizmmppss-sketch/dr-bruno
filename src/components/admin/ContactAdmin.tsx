"use client";

import { useState } from "react";
import AdminPageWrapper from "./AdminPageWrapper";
import AdminFormField from "./AdminFormField";
import { updateContactSettings } from "@/actions/admin";
import type { ContactSettings } from "@/types";

export default function ContactAdmin({ contact }: { contact: ContactSettings | null }) {
  const [form, setForm] = useState({
    title: contact?.title || "",
    subtitle: contact?.subtitle || "",
    showMap: String(contact?.showMap ?? true),
    showForm: String(contact?.showForm ?? true),
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updateContactSettings({
      ...form,
      showMap: form.showMap === "true",
      showForm: form.showForm === "true",
    });
  }

  return (
    <AdminPageWrapper title="Contato" subtitle="Configure a página de contato" onSave={handleSave}>
      <div className="space-y-5">
        <AdminFormField label="Título" name="title" value={form.title} onChange={handleChange} />
        <AdminFormField label="Subtítulo" name="subtitle" value={form.subtitle} onChange={handleChange} />
        <AdminFormField label="Mostrar mapa" name="showMap" value={form.showMap} onChange={handleChange} type="toggle" />
        <AdminFormField label="Mostrar formulário" name="showForm" value={form.showForm} onChange={handleChange} type="toggle" />
        <div className="p-4 bg-[#F7FAFC] rounded-xl border border-[#E7EEF1]">
          <p className="text-sm text-[#0B2029]/50">
            As informações de contato (telefone, e-mail, endereço, horário) são gerenciadas em
            <a href="/admin/configuracoes" className="text-[#35B6C8] hover:underline ml-1">Configurações Gerais</a>.
          </p>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
