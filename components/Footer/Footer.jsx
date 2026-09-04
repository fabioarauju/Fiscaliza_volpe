import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-400 text-white">
			<div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
				{/* Logo / descrição */}
				<div className="text-center sm:text-left">
					<h2 className="font-bold text-base">Fiscaliza Volpe</h2>

					<p className="text-xs mt-2 text-blue-100 leading-relaxed">
						Plataforma de transparência pública que permite aos cidadãos
						acompanhar gastos da prefeitura, projetos de lei e realizar
						denúncias de forma simples e acessível.
					</p>
				</div>

				{/* Navegação */}
				<div className="text-center sm:text-left">
					<h3 className="font-semibold text-sm mb-2">Navegação</h3>

					<ul className="space-y-1.5 text-xs">
						<li>
							<Link href="/gestao" className="hover:text-orange-300 transition">
								Despesas Públicas
							</Link>
						</li>

						<li>
							<Link
								href="/projetos"
								className="hover:text-orange-300 transition"
							>
								Projetos de Lei
							</Link>
						</li>

						<li>
							<Link
								href="/denuncias"
								className="hover:text-orange-300 transition"
							>
								Denúncias
							</Link>
						</li>

						<li>
							<Link href="/sobre" className="hover:text-orange-300 transition">
								Sobre
							</Link>
						</li>
					</ul>
				</div>

				{/* Informações */}
				<div className="text-center sm:text-left">
					<h3 className="font-semibold text-sm mb-2">Transparência</h3>

					<ul className="space-y-1.5 text-xs text-blue-100">
						<li>Dados atualizados periodicamente</li>
						<li>Projeto acadêmico de fiscalização pública</li>
						<li>Contato: contato@fiscalizavolpe.com</li>
					</ul>
				</div>
			</div>

			{/* Linha inferior */}
			<div className="border-t border-blue-300/30">
				<div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-1 text-xs text-blue-100 text-center md:text-left">
					<span>
						© {new Date().getFullYear()} Fiscaliza Volpe. Todos os direitos
						reservados.
					</span>

					<span className="text-[11px] opacity-80">
						Portal de transparência pública
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;