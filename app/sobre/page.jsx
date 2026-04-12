import Link from "next/link";

export default function Sobre() {
	const equipe = [
		{
			nome: "Giullia",
			cargo: "Frontend Developer",
			idade: 20,
			local: "São Paulo - SP",
		},
		{
			nome: "Fabio",
			cargo: "Software Engineer",
			idade: 24,
			local: "Juiz de Fora - MG",
		},
		{
			nome: "Isabella",
			cargo: "Frontend Developer",
			idade: 20,
			local: "Cajuru - SP",
		},
		{
			nome: "Zilton",
			cargo: "Game Developer",
			idade: 18,
			local: "Montes Claros - MG",
		},
		{
			nome: "Maria Eduarda",
			cargo: "Frontend Developer",
			idade: 20,
			local: "Itapevi - SP",
		},
	];

	return (
		<div className="bg-blue-100 py-12 min-h-screen">
			<div className="max-w-6xl mx-auto px-6 space-y-12">
				{/* HERO */}
				<div className="bg-linear-to-br from-blue-700 to-blue-500 text-white p-10 rounded-xl shadow-xl">
					<h1 className="text-4xl font-bold mb-4">Sobre o Projeto</h1>

					<p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
						O <strong>Fiscaliza Volpe</strong> é uma plataforma criada para
						promover transparência pública e incentivar a participação cidadã.
						Nosso objetivo é tornar dados públicos mais acessíveis e permitir
						que qualquer pessoa acompanhe como os recursos estão sendo
						utilizados, além de registrar problemas da cidade de forma simples.
					</p>

					<p className="text-blue-100 mt-4 max-w-3xl">
						Acreditamos que tecnologia pode aproximar a população da gestão
						pública, criando uma cultura mais forte de fiscalização,
						responsabilidade e melhoria urbana.
					</p>
				</div>

				{/* MISSÃO */}
				<div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
					<h2 className="text-2xl font-bold text-blue-900 mb-4">
						Nossa Missão
					</h2>

					<p className="text-gray-700 leading-relaxed">
						Facilitar o acesso à informação pública e incentivar a participação
						da sociedade no acompanhamento da gestão municipal. A plataforma
						reúne dados de despesas públicas, projetos de lei e denúncias
						urbanas em um ambiente simples e visual.
					</p>

					<p className="text-gray-700 mt-3 leading-relaxed">
						Com isso, buscamos contribuir para cidades mais transparentes,
						eficientes e participativas.
					</p>
				</div>

				{/* FUNCIONALIDADES */}
				<div className="space-y-6">
					<h2 className="text-3xl font-bold text-blue-900">
						O que você pode fazer na plataforma
					</h2>

					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
							<h3 className="font-semibold text-blue-800 text-lg mb-2">
								📊 Acompanhar despesas públicas
							</h3>

							<p className="text-gray-600 text-sm">
								Visualize como os recursos públicos estão sendo utilizados
								através de gráficos e indicadores organizados por setor.
							</p>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
							<h3 className="font-semibold text-blue-800 text-lg mb-2">
								📜 Consultar projetos de lei
							</h3>

							<p className="text-gray-600 text-sm">
								Acompanhe propostas legislativas e iniciativas que podem
								impactar diretamente a cidade.
							</p>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
							<h3 className="font-semibold text-blue-800 text-lg mb-2">
								📍 Registrar denúncias
							</h3>

							<p className="text-gray-600 text-sm">
								Informe problemas urbanos como buracos na via, iluminação
								pública quebrada, lixo acumulado ou outros problemas da cidade.
							</p>
						</div>
					</div>
				</div>

				{/* ESTATÍSTICAS */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-blue-200 p-6 rounded-xl text-center shadow-lg">
						<span className="text-4xl font-bold text-blue-900">2026</span>
						<p className="text-blue-900 mt-2">Ano de criação</p>
					</div>

					<div className="bg-blue-200 p-6 rounded-xl text-center shadow-lg">
						<span className="text-4xl font-bold text-blue-900">5</span>
						<p className="text-blue-900 mt-2">Desenvolvedores</p>
					</div>

					<div className="bg-blue-200 p-6 rounded-xl text-center shadow-lg">
						<span className="text-4xl font-bold text-blue-900">1 missão</span>
						<p className="text-blue-900 mt-2">Promover transparência pública</p>
					</div>
				</div>

				{/* EQUIPE */}
				<div className="space-y-6">
					<h2 className="text-3xl font-bold text-blue-900">Nossa Equipe</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
						{equipe.map((membro, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center"
							>
								<h3 className="text-xl font-bold text-blue-900">
									{membro.nome}
								</h3>

								<p className="text-blue-700 text-sm mt-1">{membro.cargo}</p>

								<p className="text-gray-500 text-sm mt-3">
									{membro.idade} anos
								</p>

								<p className="text-gray-600 text-sm">📍 {membro.local}</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="bg-linear-to-br from-blue-600 to-blue-500 text-white p-8 rounded-xl shadow-xl text-center">
					<h2 className="text-2xl font-bold mb-3">
						Quer contribuir com o projeto?
					</h2>

					<p className="text-blue-100 mb-4">
						Sugestões, ideias e melhorias são sempre bem-vindas.
					</p>

					<Link
						href="/denuncias"
						className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
					>
						Participar da plataforma
					</Link>
				</div>
			</div>
		</div>
	);
}
