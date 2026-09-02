"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Heart, Cpu, Sofa, ClipboardList, Smile, Stethoscope, Star, Sparkles, Award } from "lucide-react";
import type { AboutSettings, Differential } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Heart, Cpu, Sofa, ClipboardList, Smile, Stethoscope, Star, Sparkles,
};

interface Props {
  about: AboutSettings | null;
  differentials: Differential[];
}

export default function AboutPageContent({ about, differentials }: Props) {
  if (!about) return null;

  const stats = [
    { number: about.stat1Number, label: about.stat1Label },
    { number: about.stat2Number, label: about.stat2Label },
    { number: about.stat3Number, label: about.stat3Label },
  ];

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#07141C] to-[#0B2029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-[#1B7A8A] text-sm font-medium uppercase tracking-wider">Sobre o Profissional</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Dr. Bruno Aparecido</h1>
            <p className="text-white/50 mt-3">{about.role} — CRO {about.cro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden max-w-md">
                {about.photo ? (
                  <Image src={about.photo} alt={about.name} fill className="object-cover" sizes="50vw" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#123B48] to-[#0B2029] flex items-center justify-center">
                    <Award className="w-16 h-16 text-[#1B7A8A]/30" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-[#F7FAFC] rounded-xl p-4 text-center border border-[#E7EEF1]">
                    <p className="text-xl font-bold text-[#123B48]">{stat.number}</p>
                    <p className="text-xs text-[#0B2029]/50 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="text-3xl font-bold text-[#07141C]">
                Experiência, cuidado e precisão em cada atendimento.
              </h2>
              <p className="text-[#0B2029]/60 leading-relaxed">{about.biography}</p>

              {about.education && about.education !== "[FORMAÇÃO ACADÊMICA]" && (
                <div className="bg-[#F7FAFC] rounded-xl p-5 border border-[#E7EEF1]">
                  <h3 className="font-semibold text-[#07141C] mb-2">Formação Acadêmica</h3>
                  <p className="text-sm text-[#0B2029]/60 whitespace-pre-line">{about.education}</p>
                </div>
              )}

              {about.specializations && about.specializations !== "[ESPECIALIZAÇÕES]" && (
                <div className="bg-[#F7FAFC] rounded-xl p-5 border border-[#E7EEF1]">
                  <h3 className="font-semibold text-[#07141C] mb-2">Especializações</h3>
                  <p className="text-sm text-[#0B2029]/60 whitespace-pre-line">{about.specializations}</p>
                </div>
              )}

              {about.experience && about.experience !== "[EXPERIÊNCIA PROFISSIONAL]" && (
                <div className="bg-[#F7FAFC] rounded-xl p-5 border border-[#E7EEF1]">
                  <h3 className="font-semibold text-[#07141C] mb-2">Experiência</h3>
                  <p className="text-sm text-[#0B2029]/60 whitespace-pre-line">{about.experience}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {differentials.length > 0 && (
        <section className="py-20 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#07141C] text-center mb-12">Nossos Diferenciais</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentials.map((diff, i) => {
                const Icon = iconMap[diff.icon] || Shield;
                return (
                  <motion.div
                    key={diff.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-[#E7EEF1]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1B7A8A]/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1B7A8A]" />
                    </div>
                    <h3 className="font-semibold text-[#07141C] mb-2">{diff.title}</h3>
                    <p className="text-sm text-[#0B2029]/60">{diff.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
