"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

export default function TestimonialsPageContent({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#07141C] to-[#0B2029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#1B7A8A] text-sm font-medium uppercase tracking-wider">Depoimentos</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">O que nossos pacientes dizem</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#F7FAFC] rounded-2xl p-6 border border-[#E7EEF1]"
              >
                <Quote className="w-8 h-8 text-[#1B7A8A]/20 mb-4" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-[#0B2029]/70 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E7EEF1]">
                  {t.photo ? (
                    <Image src={t.photo} alt={t.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#1B7A8A]/10 flex items-center justify-center">
                      <span className="text-[#1B7A8A] text-sm font-semibold">{t.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm text-[#07141C]">{t.name}</p>
                    <p className="text-xs text-[#0B2029]/40">Paciente</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {testimonials.length === 0 && (
            <p className="text-center text-[#0B2029]/40 py-12">Nenhum depoimento cadastrado ainda.</p>
          )}
        </div>
      </section>
    </>
  );
}
