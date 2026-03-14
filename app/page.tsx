import GraficoBarra from "../components/GraficoBarra";
import GraficoPizza from "../components/GraficoPizza";
import Link from "next/link";

export default function Home() {
	const dados = [
		{ setor: "Saúde", valor: 850 },
		{ setor: "Educação", valor: 620 },
		{ setor: "Infra", valor: 480 },
		{ setor: "Segurança", valor: 320 },
	];

	return (
		<div className="bg-blue-100 py-10 md:py-12">
			<div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
				{/* CARDS SUPERIORES */}

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Card Despesas */}
					<div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
						<h2 className="font-semibold text-lg mb-2">Despesas Públicas</h2>

						<p className="text-2xl md:text-3xl font-bold">R$1.245.780.560</p>

						<p className="text-blue-100 mt-2 text-sm">Gastos no mês atual</p>
					</div>

					{/* Card Projetos */}

					<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-100 flex flex-col items-center text-center">
						<h2 className="text-blue-900 font-semibold text-lg mb-2">
							Projetos de Lei
						</h2>

						<div className="flex items-end gap-2">
							<span className="text-3xl md:text-4xl font-bold text-blue-800">
								32
							</span>

							<span className="text-gray-500 text-sm">em andamento</span>
						</div>

						<p className="text-gray-500 text-sm mt-3">
							Acompanhe propostas em votação e análise
						</p>
					</div>

					{/* Card Denúncia */}

					<div className="bg-gradient-to-br from-orange-400 to-orange-300 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
						<h2 className="font-semibold text-lg mb-2">Enviar Denúncia</h2>

						<p className="text-orange-100 mb-4">Faça sua denúncia!</p>

						<button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition">
							Fazer denúncia
						</button>
					</div>
				</div>

				{/* CONTEÚDO PRINCIPAL */}

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					{/* COLUNA ESQUERDA */}

					<div className="space-y-8">
						<h2 className="text-blue-700 text-2xl md:text-3xl font-bold">
							Visão Geral da Gestão Pública
						</h2>

						<div className="bg-white p-4 rounded-xl shadow">
							<GraficoBarra dados={dados} />
						</div>

						<div className="bg-white p-4 rounded-xl shadow">
							<GraficoPizza dados={dados} />
						</div>

						{/* ESTATÍSTICAS */}

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<div className="bg-blue-200 p-4 rounded-lg text-center shadow hover:shadow-xl transition">
								<span className="text-3xl font-bold text-blue-900">120</span>

								<p className="text-sm text-blue-900">Licitações Recentes</p>
							</div>

							<div className="bg-blue-200 p-4 rounded-lg text-center shadow hover:shadow-xl transition">
								<span className="text-3xl font-bold text-blue-900">85</span>

								<p className="text-sm text-blue-900">Obras em Execução</p>
							</div>

							<div className="bg-blue-200 p-4 rounded-lg text-center shadow hover:shadow-xl transition">
								<span className="text-3xl font-bold text-blue-900">45</span>

								<p className="text-sm text-blue-900">Contratos Ativos</p>
							</div>
						</div>

						<div className="flex justify-center">
							<Link
								href="/gestao"
								className="bg-blue-900 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
							>
								Ver detalhes
							</Link>
						</div>
					</div>

					{/* COLUNA DIREITA */}

					<div className="space-y-4">
						<div className="bg-white rounded-xl p-6 shadow">
							<h3 className="text-blue-700 text-2xl font-semibold mb-4">
								Projetos de Lei em Destaque
							</h3>

							<ul className="space-y-4">
								<li className="flex justify-between items-center">
									<span className="text-blue-900 font-semibold">
										Reforma da Saúde
									</span>

									<span className="bg-red-700 text-white text-sm px-2 py-1 rounded">
										Em votação
									</span>
								</li>

								<li className="flex justify-between items-center">
									<span className="text-blue-900 font-semibold">
										Mobilidade urbana sustentável
									</span>

									<span className="bg-orange-400 text-white text-sm px-2 py-1 rounded">
										Em análise
									</span>
								</li>

								<li className="flex justify-between items-center">
									<span className="text-blue-900 font-semibold">
										Programa de habitação
									</span>

									<span className="bg-lime-500 text-white text-sm px-2 py-1 rounded">
										Em andamento
									</span>
								</li>
							</ul>

							<div className="mt-6 text-right">
								<Link
									href="/projetos"
									className="text-blue-900 font-semibold hover:underline"
								>
									Ver todos
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
