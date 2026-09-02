"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSettings } from "@/types";

interface HeroProps {
  hero: HeroSettings;
  whatsappUrl: string;
}

const benefits = [
  "Tecnologia digital",
  "Sem dor e sem medo",
  "Profissional experiente",
  "Resultado garantido",
];

export default function HeroSection({ hero, whatsappUrl }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1A22]">
      {/* Static subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center lg:min-h-screen lg:py-32">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-md px-3 py-1.5 mb-6">
              <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-white">Seu sorriso merece </span>
              <br className="hidden sm:block" />
              <span className="text-white">cuidado, </span>
              <span className="text-[#5AABB8]">precisão</span>
              <span className="text-white"> e </span>
              <br className="hidden sm:block" />
              <span className="text-[#5AABB8]">confiança.</span>
            </h1>

            <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
              {hero.subtitle}
            </p>

            {/* Benefit list */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-8 max-w-md">
              {benefits.map((label, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/50 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5AABB8] flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={whatsappUrl}
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#1B7A8A] hover:bg-[#166A78] text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200"
              >
                {hero.buttonPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-3 text-white/60 hover:text-white/80 font-medium transition-colors group"
              >
                <span className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </span>
                {hero.buttonSecondary}
              </Link>
            </div>
          </motion.div>

          {/* Right - Doctor photo + floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[320px] h-[400px] sm:w-[360px] sm:h-[450px] lg:w-[420px] lg:h-[520px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                {hero.image ? (
                  <Image
                    src={hero.image}
                    alt="Dr. Bruno Aparecido"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 420px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-[#0F2830]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A22]/60 via-transparent to-transparent" />
              </div>

              {/* Doctor info card */}
              <div className="absolute -right-6 top-8 sm:top-12 bg-white rounded-xl p-4 shadow-lg w-[220px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F2830] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                      <path d="M16.5 3C14.6 1.1 12 0 10 0C8 0 6 .8 4.5 2.5C3 4.2 2 6.5 2 9C2 11.5 2.8 13.5 3.2 15.5C3.6 17.5 4 19.5 4.3 22C4.6 24.5 5.3 28 6.5 30.5C7.2 32 8 33 9 33C10 33 10.5 31.5 10.8 29.5C11 28 11.2 26.5 11.5 26.5C11.8 26.5 12 28 12.2 29.5C12.5 31.5 13 33 14 33C15 33 15.8 32 16.5 30.5C17.7 28 18.4 24.5 18.7 22C19 19.5 19.4 17.5 19.8 15.5C20.2 13.5 21 11.5 21 9C21 6.5 19.8 4.2 16.5 3Z" fill="#5AABB8"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#0F2830] font-semibold text-sm leading-tight">Dr. Bruno Aparecido</p>
                    <p className="text-[#0F2830]/45 text-xs mt-0.5">Cirurgião-Dentista</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#0F2830] font-bold text-sm">4.9</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[#0F2830]/30 text-xs">(148)</span>
                </div>
              </div>

              {/* Experience card */}
              <div className="absolute -left-6 bottom-20 sm:bottom-24 bg-white rounded-xl p-4 shadow-lg w-[170px]">
                <p className="text-[#0F2830]/40 text-xs mb-0.5">Há mais de</p>
                <p className="text-[#0F2830] font-bold text-2xl leading-tight">14 anos</p>
                <p className="text-[#0F2830]/40 text-xs">cuidando do seu sorriso</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
