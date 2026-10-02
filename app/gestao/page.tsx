"use client";

import { useState } from "react";
import GraficoBarra from "../../components/GraficoBarra";
import GraficoPizza from "../../components/GraficoPizza";

const CORES_SETOR_HEX: Record<string, string> = {
  "Saúde": "#3b82f6",
  "Educação": "#8b5cf6",
  "Urbanismo (Obras)": "#f97316",
  "Administração": "#10b981",
  "Previdência Social": "#f59e0b",
  "Assistência Social": "#06b6d4",
  "Outros": "#9ca3af",
};

const statusCor: Record<string, string> = {
  "Em execução": "bg-emerald-50 text-emerald-700",
  "Em análise": "bg-amber-50 text-amber-700",
  "Planejamento": "bg-blue-50 text-blue-700",
};

export default function GestaoPublica() {
  const [tipoGasto, setTipoGasto] = useState("todos");

  const dados = [
    { setor: "Saúde", valor: 831.96 },
    { setor: "Educação", valor: 586.76 },
    { setor: "Urbanismo (Obras)", valor: 265.6 },
    { setor: "Administração", valor: 218.56 },
    { setor: "Previdência Social", valor: 193.68 },
    { setor: "Assistência Social", valor: 49.0 },
    { setor: "Outros", valor: 217.86 },
  ];

  const dadosFiltrados =
    tipoGasto === "todos"
      ? dados
      : dados.filter((item) => item.setor === tipoGasto);

  const totalDespesas = dados.reduce((acc, item) => acc + item.valor, 0);

  const projetos = [
    { setor: "Saúde", projeto: "Reforma Hospital Municipal", valor: "R$ 45 milhões", status: "Em execução" },
    { setor: "Educação", projeto: "Construção de Escola Técnica", valor: "R$ 28 milhões", status: "Em análise" },
    { setor: "Urbanismo (Obras)", projeto: "Revitalização de Avenida Principal", valor: "R$ 120 milhões", status: "Planejamento" },
  ];

  const thClass = "px-4 py-3 text-xs font-semibold text-gray-400 text-left whitespace-nowrap border-b border-gray-100 bg-gray-50";
  const tdClass = "px-4 py-3.5 text-sm text-gray-900 border-b border-gray-50";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestão Pública</h1>
          <p className="text-gray-500">Visão detalhada das despesas e investimentos por setor.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Investido", value: `R$ ${(totalDespesas / 1000).toFixed(2)} Bi` },
            { label: "Projetos Ativos", value: "87" },
            { label: "Obras em Execução", value: "42" },
            { label: "Contratos Ativos", value: "128" },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{m.label}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1.5 font-mono">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-wrap items-center gap-3">
          <label htmlFor="filtro-setor" className="text-sm text-gray-500 font-medium">Filtrar por setor:</label>
          <select
            id="filtro-setor"
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 bg-white cursor-pointer focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={tipoGasto}
            onChange={(e) => setTipoGasto(e.target.value)}
          >
            <option value="todos">Todos os setores</option>
            {dados.map((d) => (
              <option key={d.setor} value={d.setor}>{d.setor}</option>
            ))}
          </select>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <GraficoBarra dados={dadosFiltrados} />
          <GraficoPizza dados={dadosFiltrados} />
        </div>

        {/* Ranking */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ranking por Setor</h2>
          <div className="space-y-3">
            {dados
              .sort((a, b) => b.valor - a.valor)
              .map((d, i) => (
                <div key={d.setor} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-mono w-5">{i + 1}.</span>
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: CORES_SETOR_HEX[d.setor] || "#94a3b8" }} />
                  <span className="text-sm text-gray-700 flex-1">{d.setor}</span>
                  <span className="text-sm font-semibold text-gray-900">R$ {d.valor} milhões</span>
                  <span className="text-xs text-gray-400 w-[50px] text-right">
                    {((d.valor / totalDespesas) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Detalhamento de Despesas</h2>
            <p className="text-sm text-gray-400 mt-0.5">Principais projetos por setor</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={thClass}>Setor</th>
                  <th className={thClass}>Projeto</th>
                  <th className={thClass}>Valor</th>
                  <th className={thClass}>Status</th>
                </tr>
              </thead>
              <tbody>
                {projetos.map((p) => (
                  <tr key={p.projeto} className="hover:bg-gray-50/50 transition">
                    <td className={tdClass}>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: CORES_SETOR_HEX[p.setor] || "#94a3b8" }} />
                        <span className="font-medium">{p.setor}</span>
                      </div>
                    </td>
                    <td className={tdClass}>{p.projeto}</td>
                    <td className={tdClass}><span className="font-semibold">{p.valor}</span></td>
                    <td className={tdClass}>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusCor[p.status] || "bg-gray-100 text-gray-600"}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
