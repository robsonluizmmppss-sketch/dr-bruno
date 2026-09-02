"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Stethoscope, Sparkles, Wrench, Sun, Star, Anchor, Shield, Heart, Smile, ClipboardList, Cpu, Sofa } from "lucide-react";
import type { Service } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope, Sparkles, Wrench, Sun, Star, Anchor, Shield, Heart, Smile, ClipboardList, Cpu, Sofa,
};

export default function ServicesPageContent({ services }: { services: Service[] }) {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#07141C] to-[#0B2029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#1B7A8A] text-sm font-medium uppercase tracking-wider">Nossos Serviços</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Especialidades e Serviços</h1>
            <p className="text-white/50 mt-3 max-w-2xl mx-auto">
              Da prevenção ao tratamento completo — cuidado especializado para cada necessidade.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="group block h-full bg-[#F7FAFC] hover:bg-white rounded-2xl p-6 border border-[#E7EEF1] hover:border-[#1B7A8A]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#1B7A8A]/5"
                  >
                    {service.image ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden mb-5">
                        <Image src={service.image} alt={service.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#1B7A8A]/10 flex items-center justify-center mb-5 group-hover:bg-[#1B7A8A]/20 transition-colors">
                        <Icon className="w-7 h-7 text-[#1B7A8A]" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-[#07141C] mb-2 group-hover:text-[#1B6878] transition-colors">{service.name}</h3>
                    <p className="text-sm text-[#0B2029]/60 leading-relaxed mb-4">{service.shortDescription}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#1B7A8A] font-medium">
                      Saiba mais <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
