"use client";

import { useState } from "react";
import AdminPageWrapper from "./AdminPageWrapper";
import AdminFormField from "./AdminFormField";
import { updateAbout } from "@/actions/admin";
import type { AboutSettings } from "@/types";

export default function AboutAdmin({ about }: { about: AboutSettings | null }) {
  const [form, setForm] = useState({
    name: about?.name || "",
    role: about?.role || "",
    cro: about?.cro || "",
    biography: about?.biography || "",
    photo: about?.photo || "",
    education: about?.education || "",
    specializations: about?.specializations || "",
    experience: about?.experience || "",
    stat1Number: about?.stat1Number || "",
    stat1Label: about?.stat1Label || "",
    stat2Number: about?.stat2Number || "",
    stat2Label: about?.stat2Label || "",
    stat3Number: about?.stat3Number || "",
    stat3Label: about?.stat3Label || "",
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updateAbout(form);
  }

  return (
    <AdminPageWrapper title="Sobre" subtitle="Informações sobre o profissional" onSave={handleSave}>
      <div className="space-y-5">
        <AdminFormField label="Foto" name="photo" value={form.photo} onChange={handleChange} type="image" />
        <div className="grid sm:grid-cols-3 gap-4">
          <AdminFormField label="Nome" name="name" value={form.name} onChange={handleChange} />
          <AdminFormField label="Cargo" name="role" value={form.role} onChange={handleChange} />
          <AdminFormField label="CRO" name="cro" value={form.cro} onChange={handleChange} />
        </div>
        <AdminFormField label="Biografia" name="biography" value={form.biography} onChange={handleChange} type="textarea" rows={4} />
        <AdminFormField label="Formação" name="education" value={form.education} onChange={handleChange} type="textarea" rows={3} />
        <AdminFormField label="Especializações" name="specializations" value={form.specializations} onChange={handleChange} type="textarea" rows={3} />
        <AdminFormField label="Experiência" name="experience" value={form.experience} onChange={handleChange} type="textarea" rows={3} />
        <h3 className="font-semibold text-[#07141C] pt-4">Estatísticas</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminFormField label="Número 1" name="stat1Number" value={form.stat1Number} onChange={handleChange} placeholder="500+" />
          <AdminFormField label="Label 1" name="stat1Label" value={form.stat1Label} onChange={handleChange} placeholder="Pacientes atendidos" />
          <AdminFormField label="Número 2" name="stat2Number" value={form.stat2Number} onChange={handleChange} placeholder="10 anos" />
          <AdminFormField label="Label 2" name="stat2Label" value={form.stat2Label} onChange={handleChange} placeholder="de experiência" />
          <AdminFormField label="Número 3" name="stat3Number" value={form.stat3Number} onChange={handleChange} placeholder="1000+" />
          <AdminFormField label="Label 3" name="stat3Label" value={form.stat3Label} onChange={handleChange} placeholder="Procedimentos" />
        </div>
      </div>
    </AdminPageWrapper>
  );
}
