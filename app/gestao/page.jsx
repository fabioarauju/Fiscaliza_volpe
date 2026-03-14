"use client";

import { useState } from "react";
import GraficoBarra from "../../components/GraficoBarra";
import GraficoPizza from "../../components/GraficoPizza";

export default function GestaoPublica() {
	const [tipoGasto, setTipoGasto] = useState("todos");

	return (
		<div className="bg-gray-100 min-h-screen py-12">
			<div className="max-w-6xl mx-auto px-6 space-y-10">
				{/* Título */}
				<div>
					<h1 className="text-4xl font-bold text-black">
						Visão Geral da Gestão Pública
					</h1>
					<p className="text-gray-600 mt-2">
						Acompanhe dados consolidados de despesas e investimentos públicos
					</p>
				</div>

				{/* FILTRO */}
				<div className="bg-white p-6 rounded-xl shadow flex flex-wrap gap-6 items-end">
					<div>
						<label className="block text-sm text-gray-600 mb-1">
							Tipo de Gasto
						</label>

						<select
							className="border border-gray-300 rounded-lg px-4 py-2 text-black"
							value={tipoGasto}
							onChange={(e) => setTipoGasto(e.target.value)}
						>
							<option value="todos">Todos</option>
							<option value="saude">Saúde</option>
							<option value="educacao">Educação</option>
							<option value="infraestrutura">Infraestrutura</option>
							<option value="seguranca">Segurança</option>
						</select>
					</div>

					<button className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
						Aplicar Filtro
					</button>
				</div>

				{/* GRÁFICOS */}
				<div className="grid md:grid-cols-2 gap-8">
					<GraficoBarra />

					<GraficoPizza />
				</div>

				{/* INDICADORES */}
				<div className="grid md:grid-cols-4 gap-6">
					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Total Investido</p>
						<p className="text-3xl font-bold text-black">R$ 2.3 Bi</p>
					</div>

					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Projetos Ativos</p>
						<p className="text-3xl font-bold text-black">87</p>
					</div>

					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Obras em Execução</p>
						<p className="text-3xl font-bold text-black">42</p>
					</div>

					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Contratos Ativos</p>
						<p className="text-3xl font-bold text-black">128</p>
					</div>
				</div>

				{/* RANKING */}
				<div className="bg-white rounded-xl shadow p-6">
					<h2 className="text-2xl font-semibold text-black mb-6">
						Ranking de Investimentos por Setor
					</h2>

					<ul className="space-y-4">
						<li className="flex justify-between border-b pb-2 text-black">
							<span>Saúde</span>
							<span className="font-semibold">R$ 850 milhões</span>
						</li>

						<li className="flex justify-between border-b pb-2 text-black">
							<span>Educação</span>
							<span className="font-semibold">R$ 620 milhões</span>
						</li>

						<li className="flex justify-between border-b pb-2 text-black">
							<span>Infraestrutura</span>
							<span className="font-semibold">R$ 480 milhões</span>
						</li>

						<li className="flex justify-between border-b pb-2 text-black">
							<span>Segurança</span>
							<span className="font-semibold">R$ 320 milhões</span>
						</li>
					</ul>
				</div>

				{/* TABELA */}
				<div className="bg-white rounded-xl shadow p-6">
					<h2 className="text-2xl font-semibold text-black mb-6">
						Detalhamento de Despesas
					</h2>

					<table className="w-full text-left">
						<thead>
							<tr className="border-b text-gray-700">
								<th className="py-2">Setor</th>
								<th>Projeto</th>
								<th>Valor</th>
								<th>Status</th>
							</tr>
						</thead>

						<tbody>
							<tr className="border-b text-black">
								<td className="py-3">Saúde</td>
								<td>Reforma Hospital Municipal</td>
								<td>R$ 45 milhões</td>
								<td>
									<span className="bg-green-200 text-green-800 px-2 py-1 rounded">
										Em execução
									</span>
								</td>
							</tr>

							<tr className="border-b text-black">
								<td className="py-3">Educação</td>
								<td>Construção de Escola Técnica</td>
								<td>R$ 28 milhões</td>
								<td>
									<span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
										Em análise
									</span>
								</td>
							</tr>

							<tr className="text-black">
								<td className="py-3">Infraestrutura</td>
								<td>Duplicação da Rodovia Central</td>
								<td>R$ 120 milhões</td>
								<td>
									<span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
										Planejamento
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
