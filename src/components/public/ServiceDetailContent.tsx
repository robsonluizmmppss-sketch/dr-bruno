"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import type { Service } from "@/types";

interface Props {
  service: Service;
  whatsappUrl: string;
}

export default function ServiceDetailContent({ service, whatsappUrl }: Props) {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#07141C] to-[#0B2029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/servicos" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar aos serviços
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{service.name}</h1>
            <p className="text-white/50 mt-3 max-w-2xl">{service.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {service.image && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden mb-10">
              <Image src={service.image} alt={service.name} fill className="object-cover" sizes="100vw" />
            </motion.div>
          )}

          <div className="rich-content text-[#0B2029]/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.fullDescription }} />

          <div className="mt-12 p-8 rounded-2xl bg-[#F7FAFC] border border-[#E7EEF1] text-center">
            <h3 className="text-xl font-semibold text-[#07141C] mb-3">
              Interesse neste serviço?
            </h3>
            <p className="text-[#0B2029]/60 mb-6">
              Entre em contato e agende uma avaliação personalizada.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
