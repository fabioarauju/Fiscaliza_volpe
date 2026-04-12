/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { buscarEnderecoPorCep } from "../services/viacep";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const MapaDenuncias = dynamic(() => import("../../components/MapaDenuncias"), {
  ssr: false,
  loading: () => (
    <div className="h-100 w-full bg-gray-200 animate-pulse rounded-xl flex items-center justify-center text-gray-700 font-bold">
      Carregando mapa...
    </div>
  ),
});

const CORES_GRAFICO = ["#1D4ED8", "#10B981", "#F97316", "#A855F7", "#EAB308"];

export default function DenunciasPage() {
  const [denuncias, setDenuncias] = useState([]);
  const [loadingCep, setLoadingCep] = useState(false);
  const [itensExibidos, setItensExibidos] = useState(5);
  const [denunciaSelecionada, setDenunciaSelecionada] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    rua: "",
    numero: "",
    descricao: "",
    lat: -23.55052,
    lng: -46.633308,
  });

  const dadosGrafico = Object.values(
    denuncias.reduce((acc, { categoria }) => {
      const key = categoria || "OUTROS";
      acc[key] = acc[key] || { name: key, value: 0 };
      acc[key].value += 1;
      return acc;
    }, {}),
  );

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await fetch("/denuncias/api");
        const data = await res.json();
        if (Array.isArray(data)) setDenuncias(data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };
    carregarDados();
  }, []);

  const handleCepChange = async (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 5) val = `${val.slice(0, 5)}-${val.slice(5, 8)}`;
    setFormData({ ...formData, cep: val });

    if (val.replace("-", "").length === 8) {
      setLoadingCep(true);
      const res = await buscarEnderecoPorCep(val.replace("-", ""));
      setLoadingCep(false);
      if (res) {
        setFormData((prev) => ({
          ...prev,
          rua: res.logradouro || "",
          bairro: res.bairro || "",
          cidade: res.localidade || "",
          estado: res.uf || "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/denuncias/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const novaDenuncia = await response.json();
        setDenuncias((prev) => [novaDenuncia, ...prev]);
        alert("Denúncia enviada com sucesso!");
        setFormData({
          titulo: "",
          categoria: "",
          cep: "",
          bairro: "",
          cidade: "",
          estado: "",
          rua: "",
          numero: "",
          descricao: "",
          lat: -23.55052,
          lng: -46.633308,
        });
      }
    } catch (err) {
      alert("Erro ao salvar.");
    }
  };

  const getStatusStyle = (status) => {
    const s = status?.toUpperCase().replace("_", " ");
    if (s === "RESOLVIDO")
      return "bg-green-100 text-green-700 border-green-200";
    if (s === "EM ANALISE" || s === "EM REALIZAÇÃO")
      return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-900">
      <div className="w-full mb-8">
        <MapaDenuncias denuncias={denuncias} />
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Gráfico */}
        <div className="bg-white p-8 rounded-xl shadow-md border flex flex-col items-center">
          <h2 className="text-2xl font-black mb-6 text-blue-900 text-center uppercase tracking-tighter italic">
            Resumo de Ocorrências
          </h2>
          <div className="w-full h-80">
            {denuncias.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosGrafico}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dadosGrafico.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CORES_GRAFICO[index % CORES_GRAFICO.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 font-bold italic text-center">
                Aguardando dados...
              </div>
            )}
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white p-8 rounded-xl shadow-md border text-black">
          <h2 className="text-2xl font-black mb-6 text-blue-900 text-center uppercase tracking-tighter italic">
            Nova Denúncia
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1 uppercase">
                Título da Denúncia
              </label>
              <input
                placeholder="Ex: Buraco na via, Vazamento de água..."
                className="w-full p-3 border border-gray-400 rounded-md outline-none font-medium text-black"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1 uppercase">
                Categoria
              </label>
              <select
                className="w-full p-3 border border-gray-400 rounded-md outline-none font-semibold bg-white text-black"
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                required
              >
                <option value="">Selecione uma categoria...</option>
                <option value="SANEAMENTO">SANEAMENTO</option>
                <option value="AMBIENTAL">AMBIENTAL</option>
                <option value="INFRAESTRUTURA">INFRAESTRUTURA</option>
                <option value="PERTURBAÇÃO">PERTURBAÇÃO</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1 uppercase">
                  CEP {loadingCep && "..."}
                </label>
                <input
                  placeholder="00000-000"
                  className="w-full p-3 border border-gray-400 rounded-md font-medium text-black"
                  value={formData.cep}
                  onChange={handleCepChange}
                  maxLength={9}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1 uppercase">
                  Bairro
                </label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 font-semibold text-gray-500"
                  value={formData.bairro}
                  readOnly
                  placeholder="Seu bairro"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1 uppercase">
                  Cidade
                </label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 font-semibold text-gray-500"
                  value={formData.cidade}
                  readOnly
                  placeholder="Sua cidade"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1 uppercase">
                  Estado (UF)
                </label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 font-semibold text-gray-500"
                  value={formData.estado}
                  readOnly
                  placeholder="Seu estado"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1 uppercase">
                Número ou Referência
              </label>
              <input
                placeholder="Ex: 123 ou Próximo ao mercado"
                className="w-full p-3 border border-gray-400 rounded-md outline-none font-medium text-black"
                value={formData.numero}
                onChange={(e) =>
                  setFormData({ ...formData, numero: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1 uppercase tracking-tight">
                Descrição Detalhada
              </label>
              <textarea
                placeholder="Conte-nos o que está acontecendo..."
                rows="3"
                className="w-full p-3 border border-gray-400 rounded-md outline-none font-medium text-black"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={loadingCep}
              className="w-full bg-blue-700 text-white px-8 py-4 rounded-md font-black text-xl shadow-lg hover:bg-blue-800 transition-all disabled:opacity-50 uppercase italic tracking-tighter"
            >
              {loadingCep ? "Localizando..." : "Enviar Denúncia"}
            </button>
          </form>
        </div>

        {/* Tabela HackGov */}
        <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden text-black">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">
                <th className="p-6">Categoria</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6">Data</th>
                <th className="p-6 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {denuncias.slice(0, itensExibidos).map((d) => (
                <tr
                  key={d.id}
                  className="hover:bg-blue-50/30 transition-colors font-bold"
                >
                  <td className="p-6 text-sm">{d.categoria}</td>
                  <td className="p-6 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(d.status)}`}
                    >
                      {d.status?.replace("_", " ") || "PENDENTE"}
                    </span>
                  </td>
                  <td className="p-6 text-sm text-gray-500 font-bold">
                    {new Date(d.data).toLocaleDateString("pt-BR")}
                  </td>
                  <td
                    className="p-6 text-sm text-blue-600 cursor-pointer font-black text-center"
                    onClick={() => setDenunciaSelecionada(d)}
                  >
                    DETALHES ▶
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {denuncias.length > itensExibidos && (
            <button
              onClick={() => setItensExibidos((prev) => prev + 5)}
              className="w-full p-6 bg-gray-50/50 text-blue-600 font-black uppercase text-[10px] tracking-[0.3em] border-t"
            >
              VER MAIS (+{denuncias.length - itensExibidos})
            </button>
          )}
        </div>
      </div>

      {/* Modal HackGov */}
      {denunciaSelecionada && (
        <div
          className="fixed inset-0 bg-blue-900/20 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setDenunciaSelecionada(null)}
        >
          <div
            className="bg-white rounded-[40px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-10 border-b flex justify-between items-start bg-white text-black">
              <h3 className="text-3xl font-black text-blue-900 tracking-tighter uppercase italic">
                {denunciaSelecionada.titulo || "DETALHES"}
              </h3>
              <button
                onClick={() => setDenunciaSelecionada(null)}
                className="text-gray-400 hover:text-red-500 transition-all font-black text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-10 space-y-8 text-black">
              <div className="flex gap-8">
                <div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block">
                    Categoria
                  </span>
                  <p className="text-xl font-black">
                    {denunciaSelecionada.categoria}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                    Situação
                  </span>
                  <span
                    className={`px-3 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-widest inline-block ${getStatusStyle(denunciaSelecionada.status)}`}
                  >
                    {denunciaSelecionada.status?.replace("_", " ") ||
                      "PENDENTE"}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 italic font-bold">
                {denunciaSelecionada.descricao}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">
                  Localização
                </span>
                <p className="font-black text-gray-900 text-xl leading-tight">
                  {denunciaSelecionada.bairro} -{" "}
                  {denunciaSelecionada.cidade || ""}/
                  {denunciaSelecionada.estado || ""}
                </p>
                <p className="text-gray-500 font-bold mt-1 text-sm">
                  {denunciaSelecionada.rua || "Não informada"},{" "}
                  {denunciaSelecionada.numero}
                </p>
              </div>
            </div>
            <div className="p-8">
              <button
                onClick={() => setDenunciaSelecionada(null)}
                className="w-full bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 active:scale-95"
              >
                FECHAR DETALHES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
