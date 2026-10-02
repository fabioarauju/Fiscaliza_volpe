"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CORES = [
  "#2563eb", // azul
  "#f97316", // laranja
  "#22c55e", // verde
  "#eab308", // amarelo
  "#6366f1", // indigo
  "#ef4444", // vermelho
  "#14b8a6", // teal
];

export default function GraficoPizza({ dados }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Distribuição Orçamentária
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dados}
            dataKey="valor"
            nameKey="setor"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
          >
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
