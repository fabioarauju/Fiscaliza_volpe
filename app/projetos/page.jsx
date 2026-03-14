"use client";

import { useState, useEffect } from "react";

export default function ProjetosDeLei() {
	const [statusFiltro, setStatusFiltro] = useState("todos");
	const [paginaAtual, setPaginaAtual] = useState(1);

	const itensPorPagina = 8;

	const projetos = [
		{
			id: 1,
			titulo: "Reforma da Saúde Municipal",
			autor: "Vereador João Silva",
			status: "Em votação",
			data: "12/03/2026",
		},
		{
			id: 2,
			titulo: "Programa de Mobilidade Urbana Sustentável",
			autor: "Vereadora Ana Souza",
			status: "Em análise",
			data: "08/03/2026",
		},
		{
			id: 3,
			titulo: "Plano de Habitação Popular",
			autor: "Vereador Carlos Lima",
			status: "Em andamento",
			data: "02/03/2026",
		},
		{
			id: 4,
			titulo: "Transparência em Gastos Públicos",
			autor: "Vereadora Marina Costa",
			status: "Aprovado",
			data: "20/02/2026",
		},
		{
			id: 5,
			titulo: "Programa Municipal de Energia Solar",
			autor: "Vereador Roberto Mendes",
			status: "Em análise",
			data: "18/02/2026",
		},
		{
			id: 6,
			titulo: "Criação do Parque Ambiental Norte",
			autor: "Vereadora Juliana Rocha",
			status: "Em andamento",
			data: "15/02/2026",
		},
		{
			id: 7,
			titulo: "Modernização do Transporte Público",
			autor: "Vereador Paulo Teixeira",
			status: "Em votação",
			data: "14/02/2026",
		},
		{
			id: 8,
			titulo: "Programa de Incentivo ao Esporte",
			autor: "Vereador Marcos Andrade",
			status: "Aprovado",
			data: "12/02/2026",
		},
		{
			id: 9,
			titulo: "Ampliação da Rede de Creches",
			autor: "Vereadora Camila Duarte",
			status: "Em análise",
			data: "10/02/2026",
		},
		{
			id: 10,
			titulo: "Plano Municipal de Segurança",
			autor: "Vereador Ricardo Alves",
			status: "Em votação",
			data: "08/02/2026",
		},
		{
			id: 11,
			titulo: "Incentivo à Agricultura Urbana",
			autor: "Vereadora Fernanda Lopes",
			status: "Em andamento",
			data: "06/02/2026",
		},
		{
			id: 12,
			titulo: "Programa Cidade Inteligente",
			autor: "Vereador Daniel Carvalho",
			status: "Em análise",
			data: "04/02/2026",
		},
		{
			id: 13,
			titulo: "Revitalização do Centro Histórico",
			autor: "Vereador Lucas Nascimento",
			status: "Em votação",
			data: "02/02/2026",
		},
		{
			id: 14,
			titulo: "Expansão da Rede de Ciclovias",
			autor: "Vereadora Bianca Melo",
			status: "Aprovado",
			data: "30/01/2026",
		},
		{
			id: 15,
			titulo: "Programa Municipal de Reciclagem",
			autor: "Vereador Thiago Santos",
			status: "Em andamento",
			data: "28/01/2026",
		},
		{
			id: 16,
			titulo: "Criação de Clínicas Populares",
			autor: "Vereadora Daniela Campos",
			status: "Em análise",
			data: "26/01/2026",
		},
		{
			id: 17,
			titulo: "Plano de Arborização Urbana",
			autor: "Vereador Rafael Castro",
			status: "Em votação",
			data: "24/01/2026",
		},
		{
			id: 18,
			titulo: "Incentivo a Startups Locais",
			autor: "Vereadora Paula Freitas",
			status: "Aprovado",
			data: "22/01/2026",
		},
		{
			id: 19,
			titulo: "Programa de Inclusão Digital",
			autor: "Vereador Eduardo Pires",
			status: "Em análise",
			data: "20/01/2026",
		},
		{
			id: 20,
			titulo: "Modernização da Iluminação Pública",
			autor: "Vereadora Amanda Reis",
			status: "Em andamento",
			data: "18/01/2026",
		},
		{
			id: 21,
			titulo: "Plano Municipal de Turismo",
			autor: "Vereador André Moraes",
			status: "Em votação",
			data: "16/01/2026",
		},
		{
			id: 22,
			titulo: "Programa de Alimentação Escolar",
			autor: "Vereadora Patrícia Faria",
			status: "Aprovado",
			data: "14/01/2026",
		},
		{
			id: 23,
			titulo: "Criação do Conselho de Transparência",
			autor: "Vereador Gustavo Martins",
			status: "Em análise",
			data: "12/01/2026",
		},
		{
			id: 24,
			titulo: "Programa de Apoio a Pequenos Negócios",
			autor: "Vereadora Renata Ribeiro",
			status: "Em andamento",
			data: "10/01/2026",
		},
		{
			id: 25,
			titulo: "Ampliação da Guarda Municipal",
			autor: "Vereador Felipe Torres",
			status: "Em votação",
			data: "08/01/2026",
		},
		{
			id: 26,
			titulo: "Programa Bairro Seguro",
			autor: "Vereadora Larissa Couto",
			status: "Em análise",
			data: "06/01/2026",
		},
		{
			id: 27,
			titulo: "Criação de Centros Culturais",
			autor: "Vereador Victor Barros",
			status: "Em andamento",
			data: "04/01/2026",
		},
		{
			id: 28,
			titulo: "Incentivo ao Turismo Histórico",
			autor: "Vereadora Aline Gomes",
			status: "Aprovado",
			data: "02/01/2026",
		},
		{
			id: 29,
			titulo: "Programa de Transporte Escolar Gratuito",
			autor: "Vereador Henrique Vieira",
			status: "Em votação",
			data: "30/12/2025",
		},
		{
			id: 30,
			titulo: "Plano de Combate à Dengue",
			autor: "Vereadora Carla Batista",
			status: "Em análise",
			data: "28/12/2025",
		},
		{
			id: 31,
			titulo: "Modernização dos Postos de Saúde",
			autor: "Vereador Leonardo Dias",
			status: "Em andamento",
			data: "26/12/2025",
		},
		{
			id: 32,
			titulo: "Programa Cidade Limpa",
			autor: "Vereadora Tatiane Nogueira",
			status: "Aprovado",
			data: "24/12/2025",
		},
		{
			id: 33,
			titulo: "Criação de Bibliotecas Comunitárias",
			autor: "Vereador Sérgio Costa",
			status: "Em análise",
			data: "22/12/2025",
		},
		{
			id: 34,
			titulo: "Programa de Capacitação Profissional",
			autor: "Vereadora Michele Duarte",
			status: "Em votação",
			data: "20/12/2025",
		},
		{
			id: 35,
			titulo: "Plano de Redução de Enchentes",
			autor: "Vereador Bruno Rangel",
			status: "Em andamento",
			data: "18/12/2025",
		},
		{
			id: 36,
			titulo: "Revitalização de Praças Públicas",
			autor: "Vereadora Gabriela Pacheco",
			status: "Aprovado",
			data: "16/12/2025",
		},
		{
			id: 37,
			titulo: "Programa de Inclusão para PCD",
			autor: "Vereador Vinícius Ribeiro",
			status: "Em análise",
			data: "14/12/2025",
		},
		{
			id: 38,
			titulo: "Incentivo ao Transporte Elétrico",
			autor: "Vereadora Débora Almeida",
			status: "Em votação",
			data: "12/12/2025",
		},
		{
			id: 39,
			titulo: "Criação de Corredores Verdes",
			autor: "Vereador Matheus Farias",
			status: "Em andamento",
			data: "10/12/2025",
		},
		{
			id: 40,
			titulo: "Programa Escola em Tempo Integral",
			autor: "Vereadora Priscila Torres",
			status: "Aprovado",
			data: "08/12/2025",
		},
		{
			id: 41,
			titulo: "Plano de Combate ao Desemprego",
			autor: "Vereador Diego Ramos",
			status: "Em análise",
			data: "06/12/2025",
		},
		{
			id: 42,
			titulo: "Programa de Incentivo à Cultura",
			autor: "Vereadora Letícia Braga",
			status: "Em votação",
			data: "04/12/2025",
		},
		{
			id: 43,
			titulo: "Criação de Clínicas Veterinárias Públicas",
			autor: "Vereador Rodrigo Tavares",
			status: "Em andamento",
			data: "02/12/2025",
		},
		{
			id: 44,
			titulo: "Programa de Monitoramento por Câmeras",
			autor: "Vereadora Vanessa Barros",
			status: "Aprovado",
			data: "30/11/2025",
		},
		{
			id: 45,
			titulo: "Plano de Recuperação de Rios Urbanos",
			autor: "Vereador Maurício Campos",
			status: "Em análise",
			data: "28/11/2025",
		},
		{
			id: 46,
			titulo: "Programa Jovem Aprendiz Municipal",
			autor: "Vereadora Fernanda Pinto",
			status: "Em votação",
			data: "26/11/2025",
		},
		{
			id: 47,
			titulo: "Incentivo à Agricultura Familiar",
			autor: "Vereador Renato Moura",
			status: "Em andamento",
			data: "24/11/2025",
		},
		{
			id: 48,
			titulo: "Plano Municipal de Acessibilidade",
			autor: "Vereadora Silvia Nunes",
			status: "Aprovado",
			data: "22/11/2025",
		},
		{
			id: 49,
			titulo: "Programa Cidade Digital",
			autor: "Vereador Marcelo Batista",
			status: "Em análise",
			data: "20/11/2025",
		},
		{
			id: 50,
			titulo: "Criação do Fundo Municipal de Inovação",
			autor: "Vereadora Juliana Teixeira",
			status: "Em votação",
			data: "18/11/2025",
		},
	];

	// FILTRO
	const projetosFiltrados =
		statusFiltro === "todos"
			? projetos
			: projetos.filter((p) => p.status === statusFiltro);

	// RESET PAGINA QUANDO MUDA FILTRO
	useEffect(() => {
		setPaginaAtual(1);
	}, [statusFiltro]);

	// PAGINAÇÃO
	const indiceUltimoItem = paginaAtual * itensPorPagina;
	const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;

	const projetosPagina = projetosFiltrados.slice(
		indicePrimeiroItem,
		indiceUltimoItem,
	);

	const totalPaginas = Math.ceil(projetosFiltrados.length / itensPorPagina);

	return (
		<div className="bg-gray-100 min-h-screen py-12">
			<div className="max-w-6xl mx-auto px-6 space-y-10">
				{/* TÍTULO */}
				<div>
					<h1 className="text-4xl font-bold text-black">Projetos de Lei</h1>

					<p className="text-gray-600 mt-2">
						Acompanhe projetos em análise, votação e execução
					</p>
				</div>

				{/* FILTRO */}

				<div className="bg-white p-6 rounded-xl shadow flex gap-6 items-end">
					<div>
						<label className="block text-sm text-gray-600 mb-1">
							Status do Projeto
						</label>

						<select
							className="border text-black border-gray-300 rounded-lg px-4 py-2"
							value={statusFiltro}
							onChange={(e) => setStatusFiltro(e.target.value)}
						>
							<option value="todos">Todos</option>
							<option value="Em análise">Em análise</option>
							<option value="Em votação">Em votação</option>
							<option value="Em andamento">Em andamento</option>
							<option value="Aprovado">Aprovado</option>
						</select>
					</div>
				</div>

				{/* CARDS */}

				<div className="grid md:grid-cols-4 gap-6">
					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Total de Projetos</p>
						<p className="text-3xl font-bold text-black">{projetos.length}</p>
					</div>

					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Em Análise</p>
						<p className="text-3xl font-bold text-black">
							{projetos.filter((p) => p.status === "Em análise").length}
						</p>
					</div>

					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Em Votação</p>
						<p className="text-3xl font-bold text-black">
							{projetos.filter((p) => p.status === "Em votação").length}
						</p>
					</div>

					<div className="bg-white p-6 rounded-xl shadow text-center">
						<p className="text-gray-600">Aprovados</p>
						<p className="text-3xl font-bold text-black">
							{projetos.filter((p) => p.status === "Aprovado").length}
						</p>
					</div>
				</div>

				{/* TABELA */}

				<div className="bg-white rounded-xl shadow p-6">
					<h2 className="text-2xl font-semibold text-black mb-6">
						Lista de Projetos
					</h2>

					<table className="w-full text-left">
						<thead>
							<tr className="border-b text-gray-700">
								<th className="py-3">Projeto</th>
								<th>Autor</th>
								<th>Status</th>
								<th>Data</th>
							</tr>
						</thead>

						<tbody>
							{projetosPagina.map((projeto) => (
								<tr
									key={projeto.id}
									className="border-b hover:bg-gray-50 transition"
								>
									<td className="py-3 font-medium text-black">
										{projeto.titulo}
									</td>

									<td className="text-gray-700">{projeto.autor}</td>

									<td>
										<span
											className={`px-2 py-1 rounded text-sm
											${projeto.status === "Em votação" && "bg-red-200 text-red-800"}
											${projeto.status === "Em análise" && "bg-yellow-200 text-yellow-800"}
											${projeto.status === "Em andamento" && "bg-blue-200 text-blue-800"}
											${projeto.status === "Aprovado" && "bg-green-200 text-green-800"}
										`}
										>
											{projeto.status}
										</span>
									</td>

									<td className="text-gray-700">{projeto.data}</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* PAGINAÇÃO */}

					<div className="flex justify-center gap-2 mt-6">
						{Array.from({ length: totalPaginas }, (_, i) => {
							const pagina = i + 1;

							return (
								<button
									key={pagina}
									onClick={() => setPaginaAtual(pagina)}
									className={`px-4 py-2 rounded-lg border
									${paginaAtual === pagina ? "bg-blue-700 text-white" : "bg-white text-black"}`}
								>
									{pagina}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
