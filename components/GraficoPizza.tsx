"use client";

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { corSetor } from "../data/coresSetor";

interface DadoSetor { setor: string; valor: number; }

export default function GraficoPizza({ dados }: { dados: DadoSetor[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-base font-bold text-gray-900 mb-1">Distribuição Orçamentária</h2>
      <p className="text-xs text-gray-400 mb-5">Proporção por setor</p>

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
            stroke="none"
          >
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={corSetor(entry.setor)} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #f3f4f6", boxShadow: "0 4px 12px rgba(0,0,0,.08)" }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "#6b7280" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
