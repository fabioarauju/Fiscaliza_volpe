import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-400 text-white">
			<div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
				{/* Logo / descrição */}
				<div className="text-center sm:text-left">
					<h2 className="font-bold text-lg">Fiscaliza Volpe</h2>

					<p className="text-sm mt-3 text-blue-100 leading-relaxed">
						Plataforma de transparência pública que permite aos cidadãos
						acompanhar gastos da prefeitura, projetos de lei e realizar
						denúncias de forma simples e acessível.
					</p>
				</div>

				{/* Navegação */}
				<div className="text-center sm:text-left">
					<h3 className="font-semibold mb-3">Navegação</h3>

					<ul className="space-y-2 text-sm">
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
					<h3 className="font-semibold mb-3">Transparência</h3>

					<ul className="space-y-2 text-sm text-blue-100">
						<li>Dados atualizados periodicamente</li>
						<li>Projeto acadêmico de fiscalização pública</li>
						<li>Contato: contato@fiscalizavolpe.com</li>
					</ul>
				</div>
			</div>

			{/* Linha inferior */}
			<div className="border-t border-blue-300/30">
				<div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-blue-100 text-center md:text-left">
					<span>
						© {new Date().getFullYear()} Fiscaliza Volpe. Todos os direitos
						reservados.
					</span>

					<span className="text-xs opacity-80">
						Portal de transparência pública
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
