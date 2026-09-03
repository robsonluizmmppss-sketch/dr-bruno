"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Star } from "lucide-react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/actions/admin";
import AdminFormField from "./AdminFormField";
import type { Testimonial } from "@/types";

export default function TestimonialsAdmin({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", text: "", rating: "5", photo: "" });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(t: Testimonial) {
    setEditingId(t.id);
    setShowCreate(false);
    setForm({ name: t.name, text: t.text, rating: String(t.rating), photo: t.photo || "" });
  }

  function handleCreate() {
    startTransition(async () => {
      await createTestimonial({ ...form, rating: parseInt(form.rating) });
      setShowCreate(false);
      setForm({ name: "", text: "", rating: "5", photo: "" });
      window.location.reload();
    });
  }

  function handleUpdate(id: string) {
    startTransition(async () => {
      await updateTestimonial(id, { ...form, rating: parseInt(form.rating) });
      setEditingId(null);
      window.location.reload();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Excluir depoimento?")) return;
    startTransition(async () => {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    });
  }

  function handleToggle(t: Testimonial) {
    startTransition(async () => {
      await updateTestimonial(t.id, { isActive: !t.isActive });
      setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, isActive: !x.isActive } : x));
    });
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#07141C]">Depoimentos</h1>
          <p className="text-sm text-[#0B2029]/50 mt-0.5">Gerencie os depoimentos de pacientes</p>
        </div>
        <button
          onClick={() => { setShowCreate(true); setEditingId(null); setForm({ name: "", text: "", rating: "5", photo: "" }); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Depoimento</span>
        </button>
      </div>

      {(showCreate || editingId) && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E7EEF1] mb-6">
          <h3 className="font-semibold text-[#07141C] mb-4">{editingId ? "Editar" : "Novo"} Depoimento</h3>
          <div className="space-y-4">
            <AdminFormField label="Nome" name="name" value={form.name} onChange={handleChange} />
            <AdminFormField label="Depoimento" name="text" value={form.text} onChange={handleChange} type="textarea" rows={3} />
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminFormField label="Nota (1-5)" name="rating" value={form.rating} onChange={handleChange} type="select" options={[
                { label: "5 estrelas", value: "5" }, { label: "4 estrelas", value: "4" },
                { label: "3 estrelas", value: "3" }, { label: "2 estrelas", value: "2" }, { label: "1 estrela", value: "1" },
              ]} />
              <AdminFormField label="Foto" name="photo" value={form.photo} onChange={handleChange} type="image" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => editingId ? handleUpdate(editingId) : handleCreate()} disabled={isPending || !form.name} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50">
                <Check className="w-4 h-4" /> {isPending ? "Salvando..." : "Salvar"}
              </button>
              <button onClick={() => { setShowCreate(false); setEditingId(null); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F7FAFC] text-[#0B2029]/60 text-sm rounded-xl hover:bg-[#E7EEF1] transition-all">
                <X className="w-4 h-4" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className={`bg-white rounded-xl border border-[#E7EEF1] overflow-hidden transition-shadow hover:shadow-sm ${!t.isActive ? "opacity-60" : ""}`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm text-[#07141C] truncate">{t.name}</h3>
                <div className="flex gap-0.5 shrink-0 ml-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#0B2029]/50 leading-relaxed line-clamp-3">{t.text}</p>
            </div>
            <div className="flex items-center justify-end gap-1 px-3 py-2 border-t border-[#E7EEF1] bg-[#F7FAFC]/50">
              <button onClick={() => handleToggle(t)} className="p-1.5 rounded-lg hover:bg-white" title={t.isActive ? "Desativar" : "Ativar"}>
                {t.isActive ? <Eye className="w-3.5 h-3.5 text-[#35B6C8]" /> : <EyeOff className="w-3.5 h-3.5 text-[#0B2029]/30" />}
              </button>
              <button onClick={() => startEdit(t)} className="p-1.5 rounded-lg hover:bg-white" title="Editar">
                <Edit2 className="w-3.5 h-3.5 text-[#0B2029]/40" />
              </button>
              <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50" title="Excluir">
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
