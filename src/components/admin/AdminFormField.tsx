"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadImage } from "@/actions/admin";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: "text" | "textarea" | "image" | "toggle" | "select" | "richtext";
  options?: { label: string; value: string }[];
  placeholder?: string;
  rows?: number;
}

export default function AdminFormField({
  label, name, value, onChange, type = "text", options, placeholder, rows = 3,
}: FieldProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (type === "toggle") {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-[#07141C]">{label}</span>
        <button
          type="button"
          onClick={() => onChange(name, value === "true" ? "false" : "true")}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            value === "true" ? "bg-[#35B6C8]" : "bg-[#E7EEF1]"
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value === "true" ? "translate-x-6" : "translate-x-1"
          }`} />
        </button>
      </div>
    );
  }

  if (type === "image") {
    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const url = await uploadImage(formData);
        onChange(name, url);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Erro no upload");
      } finally {
        setUploading(false);
      }
    }

    return (
      <div>
        <label className="block text-sm font-medium text-[#07141C] mb-1.5">{label}</label>
        {value && (
          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2 bg-[#F7FAFC] border border-[#E7EEF1]">
            <Image src={value} alt={label} fill className="object-cover" sizes="400px" />
            <button
              type="button"
              onClick={() => onChange(name, "")}
              className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full py-3 border-2 border-dashed border-[#E7EEF1] rounded-xl text-sm text-[#0B2029]/50 hover:border-[#35B6C8]/30 hover:text-[#35B6C8] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Enviando..." : "Enviar imagem"}
        </button>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-[#07141C] mb-1.5">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-full px-4 py-2.5 bg-[#F7FAFC] border border-[#E7EEF1] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#35B6C8]/30 focus:border-[#35B6C8]"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea" || type === "richtext") {
    return (
      <div>
        <label className="block text-sm font-medium text-[#07141C] mb-1.5">{label}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-[#F7FAFC] border border-[#E7EEF1] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#35B6C8]/30 focus:border-[#35B6C8] resize-y"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#07141C] mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-[#F7FAFC] border border-[#E7EEF1] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#35B6C8]/30 focus:border-[#35B6C8]"
      />
    </div>
  );
}
