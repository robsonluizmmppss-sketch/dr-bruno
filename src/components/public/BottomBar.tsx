"use client";

import { MessageCircle, Calendar, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";

interface BottomBarProps {
  whatsappUrl: string;
  show: boolean;
  buttonText: string;
}

const benefits = [
  { icon: ShieldCheck, title: "Consulta gratuita", subtitle: "avaliação e plano de tratamento" },
  { icon: CreditCard, title: "Parcelamento", subtitle: "sem juros no cartão" },
  { icon: Calendar, title: "Garantia", subtitle: "em todos os procedimentos" },
];

export default function BottomBar({ whatsappUrl, show, buttonText }: BottomBarProps) {
  if (!show) return null;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-[#E7EEF1] shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#35B6C8]/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-4 h-4 text-[#35B6C8]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#07141C] leading-tight">{b.title}</p>
                  <p className="text-[10px] text-[#0B2029]/45">{b.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-md shadow-[#35B6C8]/20"
          >
            Agende agora
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-[#E7EEF1] safe-area-bottom">
        <div className="flex gap-3 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-semibold rounded-full"
          >
            <Calendar className="w-4 h-4" />
            Agendar
          </a>
        </div>
      </div>

      <div className="h-16 md:h-14" />
    </>
  );
}
