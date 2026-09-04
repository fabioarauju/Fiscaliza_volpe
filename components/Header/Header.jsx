"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const links = [
  { href: "/gestao", label: "Despesas Públicas" },
  { href: "/projetos", label: "Projetos de Lei" },
  { href: "/denuncias", label: "Denúncias" },
  { href: "/sobre", label: "Sobre" },
];

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-lg">Fiscaliza Volpe</h1>
        </Link>

        <nav className="hidden md:flex gap-6">
          {links.map((link) => {
            const ativo = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-1 border-b-2 transition-colors ${
                  ativo
                    ? "border-orange-400 text-white"
                    : "border-transparent text-blue-100 hover:text-orange-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>
      </div>

      {menuAberto && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              className={`block ${
                pathname === link.href ? "text-orange-300 font-semibold" : "hover:text-orange-300"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;