"use client";

import { useState } from "react";
import AdminPageWrapper from "./AdminPageWrapper";
import AdminFormField from "./AdminFormField";
import { updateWhatsapp } from "@/actions/admin";
import type { WhatsappSettings } from "@/types";

export default function WhatsappAdmin({ whatsapp }: { whatsapp: WhatsappSettings | null }) {
  const [form, setForm] = useState({
    phoneNumber: whatsapp?.phoneNumber || "",
    defaultMessage: whatsapp?.defaultMessage || "",
    appointmentMessage: whatsapp?.appointmentMessage || "",
    serviceMessage: whatsapp?.serviceMessage || "",
    contactMessage: whatsapp?.contactMessage || "",
    buttonText: whatsapp?.buttonText || "",
    showFloatingButton: String(whatsapp?.showFloatingButton ?? true),
    showBottomBar: String(whatsapp?.showBottomBar ?? true),
    floatingPosition: whatsapp?.floatingPosition || "bottom-right",
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updateWhatsapp({
      ...form,
      showFloatingButton: form.showFloatingButton === "true",
      showBottomBar: form.showBottomBar === "true",
    });
  }

  return (
    <AdminPageWrapper title="WhatsApp" subtitle="Configure a integração com WhatsApp" onSave={handleSave}>
      <div className="space-y-5">
        <AdminFormField label="Número do WhatsApp (com DDI)" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="5511999999999" />
        <AdminFormField label="Mensagem padrão" name="defaultMessage" value={form.defaultMessage} onChange={handleChange} type="textarea" rows={2} />
        <AdminFormField label="Mensagem de agendamento" name="appointmentMessage" value={form.appointmentMessage} onChange={handleChange} type="textarea" rows={2} />
        <AdminFormField label="Mensagem para serviços" name="serviceMessage" value={form.serviceMessage} onChange={handleChange} type="textarea" rows={2} />
        <AdminFormField label="Mensagem de contato" name="contactMessage" value={form.contactMessage} onChange={handleChange} type="textarea" rows={2} />
        <AdminFormField label="Texto do botão" name="buttonText" value={form.buttonText} onChange={handleChange} />
        <AdminFormField label="Botão flutuante" name="showFloatingButton" value={form.showFloatingButton} onChange={handleChange} type="toggle" />
        <AdminFormField label="Barra inferior" name="showBottomBar" value={form.showBottomBar} onChange={handleChange} type="toggle" />
      </div>
    </AdminPageWrapper>
  );
}
