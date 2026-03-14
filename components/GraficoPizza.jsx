"use client";

import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ name: "Saúde", value: 400 },
	{ name: "Educação", value: 300 },
	{ name: "Obras", value: 200 },
	{ name: "Administração", value: 150 },
];

const COLORS = ["#2563eb", "#f97316", "#22c55e", "#eab308"];

export default function BudgetPieChart() {
	return (
		<div className="bg-white rounded-xl shadow-lg p-6">
			<h2 className="text-lg text-blue-900 font-semibold mb-4">
				Distribuição Orçamentária
			</h2>

			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={100}
						paddingAngle={5}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={index} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>

					<Tooltip />

					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
