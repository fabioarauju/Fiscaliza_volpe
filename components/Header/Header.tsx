"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X, BarChart3, FileText, Flag, Info } from "lucide-react";

const links = [
  { href: "/gestao", label: "Despesas Públicas", icon: <BarChart3 size={16} /> },
  { href: "/projetos", label: "Projetos de Lei", icon: <FileText size={16} /> },
  { href: "/denuncias", label: "Denúncias", icon: <Flag size={16} /> },
  { href: "/sobre", label: "Sobre", icon: <Info size={16} /> },
];

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            FV
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-blue-600 transition">
            Fiscaliza Volpe
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const ativo = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={ativo ? "page" : undefined}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  ativo
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuAberto && (
        <nav aria-label="Menu mobile" className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {links.map((link) => {
            const ativo = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuAberto(false)}
                aria-current={ativo ? "page" : undefined}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  ativo
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
