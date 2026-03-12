"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const data = [
	{ setor: "Saúde", valor: 20000 },
	{ setor: "Educação", valor: 15000 },
	{ setor: "Infraestrutura", valor: 12000 },
	{ setor: "Segurança", valor: 9000 },
	{ setor: "Outros", valor: 14000 },
];

export default function GraficoBarra() {
	return (
		<div className="bg-white rounded-xl shadow-lg p-6">
			<h2 className="text-lg font-semibold mb-4">Despesas por Setor</h2>

			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />

					<XAxis dataKey="setor" />

					<YAxis />

					<Tooltip />

					<Legend />

					<Bar dataKey="valor" fill="#2563eb" radius={[6, 6, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
