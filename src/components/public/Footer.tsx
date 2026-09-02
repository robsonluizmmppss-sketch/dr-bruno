"use client";

import Link from "next/link";
import type { SiteSettings, SocialLink } from "@/types";

interface FooterProps {
  settings: SiteSettings;
  socials: SocialLink[];
  whatsappUrl: string;
}

const socialIcons: Record<string, JSX.Element> = {
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  Facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  LinkedIn: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  YouTube: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
  ),
  Twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
};

const footerLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Depoimentos", href: "/depoimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export default function Footer({ settings, socials, whatsappUrl }: FooterProps) {
  const activeSocials = socials.filter(s => s.isActive && s.url);

  return (
    <footer className="bg-[#07141C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Social */}
          <div>
            <img
              src="/images/logo.svg"
              alt="Dr. Bruno Aparecido"
              className="h-10 mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Atendimento odontológico personalizado com tecnologia e cuidado em cada etapa do tratamento.
            </p>
            {activeSocials.length > 0 && (
              <div className="flex gap-2 mt-6">
                {activeSocials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                    aria-label={social.platform}
                  >
                    {socialIcons[social.platform] || socialIcons[social.platform.charAt(0).toUpperCase() + social.platform.slice(1)] || <span className="text-xs uppercase">{social.platform[0]}</span>}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-5">
              Navegação
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-5">
              Contato
            </h4>
            <div className="space-y-3 text-sm text-white/40">
              {settings.phone && <p>{settings.phone}</p>}
              {settings.email && <p>{settings.email}</p>}
              {settings.address && <p>{settings.address}</p>}
              {settings.city && settings.state && (
                <p>{settings.city} — {settings.state}</p>
              )}
              {settings.cro && <p className="text-white/30">CRO {settings.cro}</p>}
              {settings.workingHours && (
                <div className="pt-3 mt-3 border-t border-white/10">
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Horário</p>
                  <p>{settings.workingHours}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-xs">{settings.copyrightText}</p>
          <Link
            href="/politica-de-privacidade"
            className="text-white/20 hover:text-white/40 text-xs transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
