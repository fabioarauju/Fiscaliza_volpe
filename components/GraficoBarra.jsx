"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export default function GraficoBarra({ dados }) {
	return (
		<div className="bg-white p-6 rounded-xl shadow">
			<h2 className="text-xl font-semibold mb-4">Despesas por Setor</h2>

			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={dados}>
					<XAxis dataKey="setor" />

					<YAxis />

					<Tooltip />

					<Bar dataKey="valor" fill="#2563eb" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
