"use client";

import { useState, useTransition } from "react";
import { Save, Check } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  onSave: () => Promise<void>;
  children: React.ReactNode;
}

export default function AdminPageWrapper({ title, subtitle, onSave, children }: Props) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await onSave();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#07141C]">{title}</h1>
          {subtitle && <p className="text-sm text-[#0B2029]/50 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isPending ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
        </button>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-[#E7EEF1]">
        {children}
      </div>
    </div>
  );
}
