"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, AtSign, Globe, Share2, Video } from "lucide-react";
import type { SiteSettings, SocialLink } from "@/types";

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: AtSign, facebook: Globe, youtube: Video, linkedin: Share2, whatsapp: MessageCircle, tiktok: Globe,
};

interface Props {
  settings: SiteSettings | null;
  whatsappUrl: string;
  socials: SocialLink[];
}

export default function ContactPageContent({ settings, whatsappUrl, socials }: Props) {
  if (!settings) return null;

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#07141C] to-[#0B2029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#1B7A8A] text-sm font-medium uppercase tracking-wider">Contato</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Entre em contato</h1>
            <p className="text-white/50 mt-3">Estamos prontos para atendê-lo.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="text-2xl font-bold text-[#07141C]">Informações de Contato</h2>

              <div className="space-y-4">
                {settings.phone && (
                  <div className="flex items-start gap-4 p-4 bg-[#F7FAFC] rounded-xl border border-[#E7EEF1]">
                    <div className="w-10 h-10 rounded-lg bg-[#1B7A8A]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#1B7A8A]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#07141C] text-sm">Telefone</p>
                      <p className="text-[#0B2029]/60 text-sm">{settings.phone}</p>
                    </div>
                  </div>
                )}

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-[#F7FAFC] rounded-xl border border-[#E7EEF1] hover:border-[#25D366]/30 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#07141C] text-sm">WhatsApp</p>
                    <p className="text-[#25D366] text-sm group-hover:underline">Enviar mensagem</p>
                  </div>
                </a>

                {settings.email && (
                  <div className="flex items-start gap-4 p-4 bg-[#F7FAFC] rounded-xl border border-[#E7EEF1]">
                    <div className="w-10 h-10 rounded-lg bg-[#1B7A8A]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#1B7A8A]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#07141C] text-sm">E-mail</p>
                      <p className="text-[#0B2029]/60 text-sm">{settings.email}</p>
                    </div>
                  </div>
                )}

                {settings.address && (
                  <div className="flex items-start gap-4 p-4 bg-[#F7FAFC] rounded-xl border border-[#E7EEF1]">
                    <div className="w-10 h-10 rounded-lg bg-[#1B7A8A]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#1B7A8A]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#07141C] text-sm">Endereço</p>
                      <p className="text-[#0B2029]/60 text-sm">{settings.address}</p>
                      {settings.city && <p className="text-[#0B2029]/60 text-sm">{settings.city} — {settings.state}</p>}
                    </div>
                  </div>
                )}

                {settings.workingHours && (
                  <div className="flex items-start gap-4 p-4 bg-[#F7FAFC] rounded-xl border border-[#E7EEF1]">
                    <div className="w-10 h-10 rounded-lg bg-[#1B7A8A]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#1B7A8A]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#07141C] text-sm">Horário de Atendimento</p>
                      <p className="text-[#0B2029]/60 text-sm">{settings.workingHours}</p>
                    </div>
                  </div>
                )}
              </div>

              {socials.length > 0 && (
                <div>
                  <h3 className="font-semibold text-[#07141C] mb-3 text-sm">Redes Sociais</h3>
                  <div className="flex gap-3">
                    {socials.map((social) => {
                      const Icon = platformIcons[social.platform] || Globe;
                      return (
                        <a key={social.platform} href={social.url || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#F7FAFC] border border-[#E7EEF1] flex items-center justify-center hover:border-[#1B7A8A]/30 transition-colors">
                          <Icon className="w-5 h-5 text-[#0B2029]/60" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {settings.googleMapsEmbed ? (
                <div className="rounded-2xl overflow-hidden h-full min-h-[400px] border border-[#E7EEF1]">
                  <iframe src={settings.googleMapsEmbed} width="100%" height="100%" style={{ border: 0, minHeight: 400 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização" />
                </div>
              ) : (
                <div className="rounded-2xl bg-[#F7FAFC] border border-[#E7EEF1] h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#1B7A8A]/20 mx-auto mb-3" />
                    <p className="text-[#0B2029]/40 text-sm">Mapa será exibido aqui</p>
                    <p className="text-[#0B2029]/30 text-xs mt-1">Configure o Google Maps no painel administrativo</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
