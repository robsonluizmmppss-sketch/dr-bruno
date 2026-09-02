"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import type { CtaSettings } from "@/types";

interface CtaProps {
  cta: CtaSettings;
  whatsappUrl: string;
}

export default function CtaSection({ cta, whatsappUrl }: CtaProps) {
  if (!cta.isActive) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl bg-[#0A1A22] p-10 lg:p-16 text-center overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {cta.title}
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              {cta.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                {cta.buttonPrimary}
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg border border-white/10 hover:border-white/20 transition-colors duration-200 group"
              >
                {cta.buttonSecondary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
