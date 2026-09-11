"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList, ResponsiveContainer,
} from "recharts";
import { corSetor } from "../data/coresSetor";

interface DadoSetor { setor: string; valor: number; }

export default function GraficoBarra({ dados }: { dados: DadoSetor[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-base font-bold text-gray-900 mb-1">Despesas por Setor</h2>
      <p className="text-xs text-gray-400 mb-5">Valores em milhões de reais</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} margin={{ top: 20, bottom: 40 }}>
          <XAxis
            dataKey="setor"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={70}
            fontSize={11}
            tick={{ fill: "#9ca3af" }}
            axisLine={{ stroke: "#f3f4f6" }}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #f3f4f6", boxShadow: "0 4px 12px rgba(0,0,0,.08)" }}
          />
          <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={corSetor(entry.setor)} />
            ))}
            <LabelList dataKey="valor" position="top" fontSize={11} fill="#6b7280" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
