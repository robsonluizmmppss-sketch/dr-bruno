"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { AboutSettings } from "@/types";

export default function AboutSection({ about }: { about: AboutSettings }) {
  const stats = [
    { number: about.stat1Number, label: about.stat1Label },
    { number: about.stat2Number, label: about.stat2Label },
    { number: about.stat3Number, label: about.stat3Label },
  ];

  return (
    <section className="py-24 bg-[#F7FAFC]" id="sobre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="order-2 lg:order-1"
          >
            <span className="text-[#1B7A8A] text-xs font-semibold uppercase tracking-[0.15em]">
              Sobre o Profissional
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#07141C] mt-2 mb-2 leading-tight">
              Tecnologia.
              <br />
              Experiência. Cuidado.
            </h2>

            <p className="text-[#0B2029]/55 leading-relaxed mb-6 max-w-md">
              {about.biography || "Dedicado à odontologia de excelência, com foco em proporcionar a melhor experiência e resultado para cada paciente."}
            </p>

            <div className="mb-8">
              <h3 className="font-semibold text-[#07141C] text-lg">{about.name}</h3>
              <p className="text-[#1B7A8A] text-sm font-medium">{about.role} — CRO {about.cro}</p>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-gray-200">
              {stats.map((stat, i) => (
                <div key={i} className={`${i > 0 ? "border-l border-gray-200 pl-4 sm:pl-6" : ""}`}>
                  <p className="text-xl sm:text-3xl font-bold text-[#123B48]">{stat.number}</p>
                  <p className="text-xs text-[#0B2029]/45 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 hover:border-gray-300 text-[#07141C] hover:text-[#1B7A8A] font-medium rounded-lg transition-all duration-200 group"
            >
              Conheça mais sobre o Dr. Bruno
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right - Photo + Video overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-black/10">
              {about.photo ? (
                <Image
                  src={about.photo}
                  alt={about.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#123B48] to-[#0B2029]">
                  <Image
                    src="/images/doctor-placeholder.svg"
                    alt={about.name}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07141C]/30 to-transparent" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl transition-all hover:scale-105 group">
                  <Play className="w-6 h-6 text-[#123B48] ml-1 group-hover:text-[#1B7A8A] transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
