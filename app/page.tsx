export default function Home() {
	return (
		<div className="min-h-dvh bg-gray-50 py-12">
			<div className="max-w-6xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Card 1 */}
					<div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-between">
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
					<div className="bg-gradient-to-br from-orange-400 to-orange-300 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-between">
						<div className="flex justify-between items-start mb-4">
							<h2 className="font-semibold text-lg">Enviar Denúncia</h2>
						</div>

						<p className="text-orange-100 mb-6">Faça sua denúncia!</p>

						<button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition">
							Fazer denúncia
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
