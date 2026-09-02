"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ClinicSection as ClinicSectionType } from "@/types";

export default function ClinicSection({ clinic }: { clinic: ClinicSectionType }) {
  if (!clinic.isActive) return null;

  return (
    <section className="relative" id="clinica">
      <div className="relative h-[500px] lg:h-[550px] overflow-hidden">
        {clinic.image ? (
          <Image
            src={clinic.image}
            alt="Consultório"
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-[#0A1A22]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07141C]/90 via-[#07141C]/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-lg"
            >
              <span className="text-[#5AABB8] text-xs font-semibold uppercase tracking-[0.15em]">
                Estrutura
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 leading-tight">
                {clinic.title}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                {clinic.description}
              </p>
              <Link
                href={clinic.buttonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B7A8A] hover:bg-[#1B7A8A]/90 text-white font-medium rounded-lg transition-colors duration-200 group"
              >
                {clinic.buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
