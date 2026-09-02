"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, PanelTop, Info, Briefcase, MessageSquareQuote,
  Image, FileText, Phone, Share2, Search, Settings, Users, Menu, X,
  LogOut, ExternalLink, MessageCircle,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: PanelTop },
  { label: "Sobre", href: "/admin/sobre", icon: Info },
  { label: "Serviços", href: "/admin/servicos", icon: Briefcase },
  { label: "Depoimentos", href: "/admin/depoimentos", icon: MessageSquareQuote },
  { label: "Galeria", href: "/admin/galeria", icon: Image },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Contato", href: "/admin/contato", icon: Phone },
  { label: "WhatsApp", href: "/admin/whatsapp", icon: MessageCircle },
  { label: "Redes Sociais", href: "/admin/redes-sociais", icon: Share2 },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
  { label: "Usuários", href: "/admin/usuarios", icon: Users },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-sm border border-[#E7EEF1]"
        aria-label="Menu"
      >
        <Menu className="w-5 h-5 text-[#07141C]" />
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-[#E7EEF1] z-50 transform transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-[#E7EEF1] flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#07141C] text-sm">Dr. Bruno Aparecido</h2>
              <p className="text-xs text-[#0B2029]/40">Painel Administrativo</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-[#0B2029]/40">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    isActive
                      ? "bg-[#35B6C8]/10 text-[#1B6878] font-medium"
                      : "text-[#0B2029]/60 hover:bg-[#F7FAFC] hover:text-[#07141C]"
                  }`}
                >
                  <item.icon className={`w-4.5 h-4.5 ${isActive ? "text-[#35B6C8]" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-[#E7EEF1] space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#0B2029]/60 hover:bg-[#F7FAFC] hover:text-[#07141C] transition-all"
            >
              <ExternalLink className="w-4.5 h-4.5" />
              Visualizar site
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500/70 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut className="w-4.5 h-4.5" />
              Sair
            </button>
          </div>

          <div className="p-4 border-t border-[#E7EEF1]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#123B48] flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{userName.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#07141C]">{userName}</p>
                <p className="text-xs text-[#0B2029]/40">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
