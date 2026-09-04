"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { corSetor } from "../data/coresSetor";

export default function GraficoBarra({ dados }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl text-black font-semibold mb-4">
        Despesas por Setor
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} margin={{ top: 20, bottom: 40 }}>
          <XAxis
            dataKey="setor"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={70}
            fontSize={11}
          />

          <YAxis />

          <Tooltip />

          <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={corSetor(entry.setor)} />
            ))}
            <LabelList dataKey="valor" position="top" fontSize={11} fill="#5F5E5A" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}