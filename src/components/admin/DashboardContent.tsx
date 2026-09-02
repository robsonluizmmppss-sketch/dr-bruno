"use client";

import { Eye, MessageCircle, Calendar, Briefcase, MessageSquareQuote, FileText, Image } from "lucide-react";
import type { DashboardStats } from "@/types";

const statCards = [
  { key: "totalVisits" as const, label: "Visitas", icon: Eye, color: "bg-blue-500/10 text-blue-500" },
  { key: "whatsappClicks" as const, label: "Cliques WhatsApp", icon: MessageCircle, color: "bg-green-500/10 text-green-500" },
  { key: "appointmentClicks" as const, label: "Cliques Agendar", icon: Calendar, color: "bg-purple-500/10 text-purple-500" },
  { key: "activeServices" as const, label: "Serviços Ativos", icon: Briefcase, color: "bg-[#35B6C8]/10 text-[#35B6C8]" },
  { key: "activeTestimonials" as const, label: "Depoimentos", icon: MessageSquareQuote, color: "bg-amber-500/10 text-amber-500" },
  { key: "totalPosts" as const, label: "Posts", icon: FileText, color: "bg-indigo-500/10 text-indigo-500" },
  { key: "totalImages" as const, label: "Imagens", icon: Image, color: "bg-pink-500/10 text-pink-500" },
];

export default function DashboardContent({ stats }: { stats: DashboardStats }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#07141C]">Dashboard</h1>
        <p className="text-sm text-[#0B2029]/50 mt-1">Visão geral do site</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.key} className="bg-white rounded-2xl p-5 border border-[#E7EEF1]">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color.split(" ")[0]}`}>
                <card.icon className={`w-5 h-5 ${card.color.split(" ")[1]}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#07141C]">{stats[card.key]}</p>
            <p className="text-sm text-[#0B2029]/50 mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
