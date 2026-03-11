import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-400 text-white mt-20">
			<div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
				{/* Logo / descrição */}
				<div>
					<h2 className="font-bold text-lg">Fiscaliza Volpe</h2>
					<p className="text-sm mt-3 text-blue-100">
						Plataforma de transparência pública que permite aos cidadãos
						acompanhar gastos da prefeitura, projetos de lei e realizar
						denúncias de forma simples e acessível.
					</p>
				</div>

				{/* Navegação */}
				<div>
					<h3 className="font-semibold mb-3">Navegação</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link href="/" className="hover:text-orange-300">
								Despesas Públicas
							</Link>
						</li>
						<li>
							<Link href="/" className="hover:text-orange-300">
								Projetos de Lei
							</Link>
						</li>
						<li>
							<Link href="/" className="hover:text-orange-300">
								Denúncias
							</Link>
						</li>
						<li>
							<Link href="/" className="hover:text-orange-300">
								Sobre
							</Link>
						</li>
					</ul>
				</div>

				{/* Informações */}
				<div>
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
				<div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between text-sm text-blue-100">
					<span>
						© {new Date().getFullYear()} Fiscaliza Volpe. Todos os direitos
						reservados.
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
