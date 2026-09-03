"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Cpu, Sofa, ClipboardList, Smile, Stethoscope, Star, Sparkles } from "lucide-react";
import type { Differential } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Heart, Cpu, Sofa, ClipboardList, Smile, Stethoscope, Star, Sparkles,
};

export default function DifferentialsSection({ differentials }: { differentials: Differential[] }) {
  if (differentials.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[#1B7A8A] text-sm font-medium uppercase tracking-wider">
            Diferenciais
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2830] mt-2">
            Por que escolher o Dr. Bruno Aparecido
          </h2>
          <p className="text-[#0F2830]/50 mt-3 max-w-2xl mx-auto">
            Cada detalhe do atendimento é pensado para proporcionar a melhor experiência e resultado.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((diff, i) => {
            const Icon = iconMap[diff.icon] || Shield;
            return (
              <motion.div
                key={diff.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1B7A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#1B7A8A] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#1B7A8A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F2830] mb-2">{diff.title}</h3>
                <p className="text-sm text-[#0F2830]/50 leading-relaxed">{diff.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
