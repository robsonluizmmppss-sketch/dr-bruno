"use client";

import { useState, useTransition } from "react";
import { Save, Check, AtSign, Globe, Video, Share2 } from "lucide-react";
import { updateSocialLink } from "@/actions/admin";
import type { SocialLink } from "@/types";

const platformLabels: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  instagram: { label: "Instagram", icon: AtSign },
  facebook: { label: "Facebook", icon: Globe },
  tiktok: { label: "TikTok", icon: Globe },
  youtube: { label: "YouTube", icon: Video },
  linkedin: { label: "LinkedIn", icon: Share2 },
};

export default function SocialsAdmin({ socials }: { socials: SocialLink[] }) {
  const [items, setItems] = useState(socials);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleChange(platform: string, field: "url" | "isActive", value: string | boolean) {
    setItems((prev) => prev.map((s) => s.platform === platform ? { ...s, [field]: value } : s));
  }

  function handleSave() {
    startTransition(async () => {
      for (const item of items) {
        await updateSocialLink(item.platform, { url: item.url, isActive: item.isActive });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#07141C]">Redes Sociais</h1>
          <p className="text-sm text-[#0B2029]/50 mt-1">Configure os links das redes sociais</p>
        </div>
        <button onClick={handleSave} disabled={isPending} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50">
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isPending ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
        </button>
      </div>

      <div className="space-y-3">
        {items.map((social) => {
          const config = platformLabels[social.platform] || { label: social.platform, icon: Globe };
          const Icon = config.icon;
          return (
            <div key={social.platform} className="bg-white rounded-xl p-4 border border-[#E7EEF1] flex items-center gap-4">
              <Icon className="w-5 h-5 text-[#0B2029]/40 shrink-0" />
              <span className="text-sm font-medium text-[#07141C] w-24 shrink-0">{config.label}</span>
              <input
                type="url"
                value={social.url}
                onChange={(e) => handleChange(social.platform, "url", e.target.value)}
                placeholder={`URL do ${config.label}`}
                className="flex-1 px-3 py-2 bg-[#F7FAFC] border border-[#E7EEF1] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#35B6C8]/30"
              />
              <button
                onClick={() => handleChange(social.platform, "isActive", !social.isActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${social.isActive ? "bg-[#35B6C8]" : "bg-[#E7EEF1]"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${social.isActive ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
