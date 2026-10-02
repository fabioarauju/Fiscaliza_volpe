import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              FV
            </div>
            <span className="font-bold text-white text-base">Fiscaliza Volpe</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Plataforma de transparência pública que permite aos cidadãos
            acompanhar gastos, projetos de lei e realizar denúncias de forma
            simples e acessível.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white text-sm mb-3">Navegação</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/gestao" className="hover:text-white transition">
                Despesas Públicas
              </Link>
            </li>
            <li>
              <Link href="/projetos" className="hover:text-white transition">
                Projetos de Lei
              </Link>
            </li>
            <li>
              <Link href="/denuncias" className="hover:text-white transition">
                Denúncias
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:text-white transition">
                Sobre
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white text-sm mb-3">Transparência</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Dados atualizados periodicamente</li>
            <li>Projeto acadêmico — FIAP</li>
            <li>contato@fiscalizavolpe.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Fiscaliza Volpe. Todos os direitos reservados.</span>
          <span>Portal de transparência pública</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
