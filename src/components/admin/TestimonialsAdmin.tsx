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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#07141C]">Depoimentos</h1>
          <p className="text-sm text-[#0B2029]/50 mt-1">Gerencie os depoimentos de pacientes</p>
        </div>
        <button onClick={() => { setShowCreate(true); setForm({ name: "", text: "", rating: "5", photo: "" }); }} className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all">
          <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Novo Depoimento</span><span className="sm:hidden">Novo</span>
        </button>
      </div>

      {(showCreate || editingId) && (
        <div className="bg-white rounded-2xl p-6 border border-[#E7EEF1] mb-6">
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

      <div className="space-y-2">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl p-4 border border-[#E7EEF1] flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-medium text-sm ${t.isActive ? "text-[#07141C]" : "text-[#0B2029]/40"}`}>{t.name}</h3>
                <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}</div>
              </div>
              <p className="text-xs text-[#0B2029]/40 truncate">{t.text}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleToggle(t)} className="p-2 rounded-lg hover:bg-[#F7FAFC]">{t.isActive ? <Eye className="w-4 h-4 text-[#35B6C8]" /> : <EyeOff className="w-4 h-4 text-[#0B2029]/30" />}</button>
              <button onClick={() => startEdit(t)} className="p-2 rounded-lg hover:bg-[#F7FAFC]"><Edit2 className="w-4 h-4 text-[#0B2029]/40" /></button>
              <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
