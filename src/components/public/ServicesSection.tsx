"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

const defaultServiceImg = "/images/service-clinica.jpg";

export default function ServicesSection({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden" id="servicos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-[#1B7A8A] text-xs font-semibold uppercase tracking-[0.15em]">
              Nossos Serviços
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2830] mt-2 leading-tight">
              Cuidado especializado
              <br className="hidden sm:block" />
              para o seu sorriso
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[#0F2830]/50 text-sm max-w-xs hidden md:block">
              Da prevenção ao tratamento completo — excelência em cada procedimento.
            </p>
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:border-gray-300 rounded-lg text-sm font-medium text-[#0F2830] hover:text-[#1B7A8A] transition-colors group whitespace-nowrap"
            >
              Todos os serviços
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-hide">
          {services.slice(0, 4).map((service, i) => {
            const imgSrc = service.image || defaultServiceImg;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[240px] sm:min-w-[280px] lg:min-w-0 snap-start"
              >
                <Link
                  href={`/servicos/${service.slug}`}
                  className="group block h-full rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 280px, 25vw"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[#0F2830] mb-1.5 group-hover:text-[#1B7A8A] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#0F2830]/50 leading-relaxed mb-3 line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center w-8 h-8 rounded-lg bg-gray-100 justify-center group-hover:bg-[#1B7A8A] transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
