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
		<div className="bg-blue-100 py-12">
			<div className="max-w-6xl mx-auto px-6 space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Card 1 */}
					<div className="bg-linear-to-br from-blue-600 to-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-between">
						<div className="flex justify-between items-start mb-4">
							<h2 className="font-semibold text-lg">Despesas Públicas</h2>
						</div>

						<p className="text-3xl font-bold">R$1.245.780.560</p>

						<p className="text-blue-100 mt-2 text-sm">Gastos no mês atual</p>
					</div>

					{/* Card 2 */}
					<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-100 flex flex-col items-center justify-between">
						<div className="flex justify-between items-start mb-4">
							<h2 className="text-blue-900 font-semibold text-lg">
								Projetos de Lei
							</h2>
						</div>

						<div className="flex items-end gap-3">
							<span className="text-4xl font-bold text-blue-800">32</span>
							<span className="text-gray-500 mb-1">em andamento</span>
						</div>
						<p className="text-gray-500 text-sm mt-3">
							Acompanhe propostas em votação e análise
						</p>
					</div>

					{/* Card 3 */}
					<div className="bg-linear-to-br from-orange-400 to-orange-300 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-between">
						<div className="flex justify-between items-start mb-4">
							<h2 className="font-semibold text-lg">Enviar Denúncia</h2>
						</div>

						<p className="text-orange-100 mb-6">Faça sua denúncia!</p>

						<button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition">
							Fazer denúncia
						</button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-8">
					<div className="space-y-6">
						<h2 className="text-blue-700 text-3xl">
							<strong>Visão Geral</strong> da Gestão Pública
						</h2>
						<GraficoBarra dados={dados} />
						<GraficoPizza dados={dados} />
						<div className="flex flex-col items-center space-y-4">
							<div className="grid grid-cols-3 gap-4">
								<div className="bg-blue-200 p-2 rounded-lg text-center shadow-lg hover:shadow-2xl transition">
									<span className="text-4xl text-blue-900">120</span>
									<p className="text-md text-blue-900">Licitações Recentes</p>
								</div>
								<div className="bg-blue-200 p-2 rounded-lg text-center shadow-lg hover:shadow-2xl transition">
									<span className="text-4xl text-blue-900">85</span>
									<p className="text-md text-blue-900">Obras em Execução</p>
								</div>
								<div className="bg-blue-200 p-2 rounded-lg text-center shadow-lg hover:shadow-2xl transition">
									<span className="text-4xl text-blue-900">45</span>
									<p className="text-md text-blue-900">Contratos Ativos</p>
								</div>
							</div>
							<Link
								href="/gestao"
								className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition"
							>
								Ver detalhes
							</Link>
						</div>
					</div>
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-2">
							<h3 className="text-blue-700 text-3xl font-medium">
								Projetos de Lei em Destaque
							</h3>
							<hr className="text-gray-400" />
							<ul className="space-y-4 py-2">
								<div className="flex justify-between items-center">
									<li className="text-blue-900 text-lg font-bold">
										Reforma da Saúde
									</li>
									<span className="bg-red-700 px-2 py-1 rounded-sm">
										Em votação
									</span>
								</div>
								<hr className="text-gray-400" />
								<div className="flex justify-between items-center">
									<li className="text-blue-900 text-lg font-bold">
										Mobilidade urbana sustentável
									</li>
									<span className="bg-orange-400 px-2 py-1 rounded-sm">
										Em análise
									</span>
								</div>
								<hr className="text-gray-400" />
								<div className="flex justify-between items-center">
									<li className="text-blue-900 text-lg font-bold">
										Programa de habitação
									</li>
									<span className="bg-lime-400 px-2 py-1 rounded-sm">
										Em Andamento
									</span>
								</div>
								<hr className="text-gray-400" />
								<div className="flex justify-end">
									<Link
										href="/projetos"
										className="text-blue-900 font-bold text-lg underline cursor-pointer"
									>
										Ver Todos
									</Link>
								</div>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
