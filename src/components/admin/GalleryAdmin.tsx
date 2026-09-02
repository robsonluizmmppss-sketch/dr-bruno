"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { Plus, Trash2, X } from "lucide-react";
import { createGalleryImage, deleteGalleryImage, updateGalleryImage } from "@/actions/admin";
import { uploadImage } from "@/actions/admin";
import type { GalleryImage } from "@/types";

const categories = ["Consultório", "Atendimento", "Estrutura", "Resultados", "Equipe"];

export default function GalleryAdmin({ images: initial }: { images: GalleryImage[] }) {
  const [images, setImages] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const url = await uploadImage(formData);
        await createGalleryImage({ url, alt: file.name, category: "Consultório" });
      } catch (err) {
        alert(err instanceof Error ? err.message : "Erro no upload");
      }
    }

    setUploading(false);
    window.location.reload();
  }

  function handleDelete(id: string) {
    if (!confirm("Excluir imagem?")) return;
    startTransition(async () => {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    });
  }

  function handleCategoryChange(id: string, category: string) {
    startTransition(async () => {
      await updateGalleryImage(id, { category });
      setImages((prev) => prev.map((img) => img.id === id ? { ...img, category } : img));
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#07141C]">Galeria</h1>
          <p className="text-sm text-[#0B2029]/50 mt-1">Gerencie as imagens do consultório</p>
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50">
            <Plus className="w-4 h-4" /> {uploading ? "Enviando..." : "Upload de Imagens"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative bg-white rounded-xl border border-[#E7EEF1] overflow-hidden">
            <div className="relative aspect-square">
              <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <button onClick={() => handleDelete(img.id)} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
            <div className="p-3">
              <select value={img.category} onChange={(e) => handleCategoryChange(img.id, e.target.value)} className="w-full text-xs bg-[#F7FAFC] border border-[#E7EEF1] rounded-lg px-2 py-1.5">
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#E7EEF1]">
          <p className="text-[#0B2029]/40 mb-2">Nenhuma imagem na galeria</p>
          <button onClick={() => fileRef.current?.click()} className="text-[#35B6C8] text-sm hover:underline">Enviar imagens</button>
        </div>
      )}
    </div>
  );
}
