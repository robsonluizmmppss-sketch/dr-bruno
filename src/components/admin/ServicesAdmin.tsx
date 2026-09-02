"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, GripVertical, Check, X, Eye, EyeOff } from "lucide-react";
import { createService, updateService, deleteService } from "@/actions/admin";
import AdminFormField from "./AdminFormField";
import type { Service } from "@/types";

export default function ServicesAdmin({ services: initialServices }: { services: Service[] }) {
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: "", shortDescription: "", fullDescription: "", icon: "Stethoscope", image: "",
    seoTitle: "", seoDescription: "",
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      name: service.name,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      icon: service.icon,
      image: service.image || "",
      seoTitle: service.seoTitle || "",
      seoDescription: service.seoDescription || "",
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createService(form);
      setShowCreate(false);
      setForm({ name: "", shortDescription: "", fullDescription: "", icon: "Stethoscope", image: "", seoTitle: "", seoDescription: "" });
      window.location.reload();
    });
  }

  function handleUpdate(id: string) {
    startTransition(async () => {
      await updateService(id, form);
      setEditingId(null);
      window.location.reload();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Deseja excluir este serviço?")) return;
    startTransition(async () => {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    });
  }

  function handleToggle(service: Service) {
    startTransition(async () => {
      await updateService(service.id, { isActive: !service.isActive });
      setServices((prev) => prev.map((s) => s.id === service.id ? { ...s, isActive: !s.isActive } : s));
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#07141C]">Serviços</h1>
          <p className="text-sm text-[#0B2029]/50 mt-1">Gerencie os serviços e especialidades</p>
        </div>
        <button
          onClick={() => { setShowCreate(true); setForm({ name: "", shortDescription: "", fullDescription: "", icon: "Stethoscope", image: "", seoTitle: "", seoDescription: "" }); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" /> Novo Serviço
        </button>
      </div>

      {(showCreate || editingId) && (
        <div className="bg-white rounded-2xl p-6 border border-[#E7EEF1] mb-6">
          <h3 className="font-semibold text-[#07141C] mb-4">{editingId ? "Editar Serviço" : "Novo Serviço"}</h3>
          <div className="space-y-4">
            <AdminFormField label="Nome" name="name" value={form.name} onChange={handleChange} />
            <AdminFormField label="Descrição curta" name="shortDescription" value={form.shortDescription} onChange={handleChange} type="textarea" rows={2} />
            <AdminFormField label="Descrição completa (HTML)" name="fullDescription" value={form.fullDescription} onChange={handleChange} type="textarea" rows={6} />
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminFormField label="Ícone (Lucide)" name="icon" value={form.icon} onChange={handleChange} placeholder="Stethoscope" />
              <AdminFormField label="Imagem" name="image" value={form.image} onChange={handleChange} type="image" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminFormField label="SEO Title" name="seoTitle" value={form.seoTitle} onChange={handleChange} />
              <AdminFormField label="SEO Description" name="seoDescription" value={form.seoDescription} onChange={handleChange} />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => editingId ? handleUpdate(editingId) : handleCreate()}
                disabled={isPending || !form.name}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50"
              >
                <Check className="w-4 h-4" /> {isPending ? "Salvando..." : "Salvar"}
              </button>
              <button
                onClick={() => { setShowCreate(false); setEditingId(null); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F7FAFC] text-[#0B2029]/60 text-sm rounded-xl hover:bg-[#E7EEF1] transition-all"
              >
                <X className="w-4 h-4" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl p-4 border border-[#E7EEF1] flex items-center gap-4">
            <GripVertical className="w-4 h-4 text-[#0B2029]/20 cursor-grab shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-sm ${service.isActive ? "text-[#07141C]" : "text-[#0B2029]/40"}`}>
                {service.name}
              </h3>
              <p className="text-xs text-[#0B2029]/40 truncate">{service.shortDescription}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleToggle(service)} className="p-2 rounded-lg hover:bg-[#F7FAFC] transition-colors" title={service.isActive ? "Desativar" : "Ativar"}>
                {service.isActive ? <Eye className="w-4 h-4 text-[#35B6C8]" /> : <EyeOff className="w-4 h-4 text-[#0B2029]/30" />}
              </button>
              <button onClick={() => startEdit(service)} className="p-2 rounded-lg hover:bg-[#F7FAFC] transition-colors">
                <Edit2 className="w-4 h-4 text-[#0B2029]/40" />
              </button>
              <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-center text-[#0B2029]/40 py-8">Nenhum serviço cadastrado.</p>
        )}
      </div>
    </div>
  );
}
