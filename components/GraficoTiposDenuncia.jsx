"use client";

import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

export default function GraficoTiposDenuncia({ dados }) {
	const cores = ["#2563eb", "#f97316", "#22c55e", "#eab308", "#a855f7"];

	return (
		<div className="h-[300px]">
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={dados}
						dataKey="valor"
						nameKey="tipo"
						outerRadius={100}
						label
					>
						{dados.map((_, i) => (
							<Cell key={i} fill={cores[i % cores.length]} />
						))}
					</Pie>

					<Tooltip />

					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
