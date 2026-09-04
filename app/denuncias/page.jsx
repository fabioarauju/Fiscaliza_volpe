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
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 text-sm">
      Carregando mapa...
    </div>
  ),
});

// Cor por categoria (por nome, não por posição) — mesmo princípio do corSetor()
// usado em Despesas, pra cor nunca dessincronizar entre gráfico, badges e legenda.
const CORES_CATEGORIA = {
  SANEAMENTO: { fill: "#378ADD", badge: "bg-blue-50 text-blue-700" },
  AMBIENTAL: { fill: "#639922", badge: "bg-green-50 text-green-700" },
  INFRAESTRUTURA: { fill: "#D85A30", badge: "bg-orange-50 text-orange-700" },
  "PERTURBAÇÃO": { fill: "#7F77DD", badge: "bg-purple-50 text-purple-700" },
  OUTROS: { fill: "#B4B2A9", badge: "bg-gray-100 text-gray-600" },
};

function corCategoria(categoria) {
  return CORES_CATEGORIA[categoria] || CORES_CATEGORIA.OUTROS;
}

function getStatusStyle(status) {
  const s = status?.toUpperCase().replace("_", " ");
  if (s === "RESOLVIDO") return "bg-emerald-50 text-emerald-700";
  if (s === "EM ANALISE" || s === "EM REALIZAÇÃO")
    return "bg-blue-50 text-blue-700";
  return "bg-amber-50 text-amber-700";
}

export default function DenunciasPage() {
  const [denuncias, setDenuncias] = useState([]);
  const [loadingCep, setLoadingCep] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  const [sucessoEnvio, setSucessoEnvio] = useState(false);
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
    setErroEnvio("");
    setSucessoEnvio(false);
    setEnviando(true);

    try {
      const response = await fetch("/denuncias/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Lê o corpo mesmo em erro — é onde a API manda a mensagem real
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Mostra no console o motivo exato (coluna faltando, rota errada, etc.)
        console.error("Falha ao enviar denúncia:", response.status, data);
        setErroEnvio(
          data?.error ||
            `Não foi possível enviar (erro ${response.status}). Confira o console.`,
        );
        return;
      }

      setDenuncias((prev) => [data, ...prev]);
      setSucessoEnvio(true);
      setTimeout(() => setSucessoEnvio(false), 4000);
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
    } catch (err) {
      console.error("Erro de rede ao enviar denúncia:", err);
      setErroEnvio("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 font-sans text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* MAPA */}
        <div className="bg-white rounded-xl shadow p-4">
          <MapaDenuncias denuncias={denuncias} />
        </div>

        {/* GRÁFICO */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-black mb-4">
            Resumo de ocorrências
          </h2>
          {denuncias.length > 0 ? (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosGrafico}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dadosGrafico.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={corCategoria(entry.name).fill}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center text-gray-400 text-sm">
              Aguardando dados...
            </div>
          )}
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white rounded-xl shadow p-6 text-black">
          <h2 className="text-xl font-semibold text-black mb-6">
            Nova denúncia
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título da denúncia
              </label>
              <input
                placeholder="Ex: buraco na via, vazamento de água..."
                className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm focus:ring-1 focus:ring-blue-500"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm bg-white cursor-pointer"
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                required
              >
                <option value="">Selecione uma categoria...</option>
                <option value="SANEAMENTO">Saneamento</option>
                <option value="AMBIENTAL">Ambiental</option>
                <option value="INFRAESTRUTURA">Infraestrutura</option>
                <option value="PERTURBAÇÃO">Perturbação</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CEP {loadingCep && "..."}
                </label>
                <input
                  placeholder="00000-000"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.cep}
                  onChange={handleCepChange}
                  maxLength={9}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bairro
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm text-gray-500"
                  value={formData.bairro}
                  readOnly
                  placeholder="Seu bairro"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm text-gray-500"
                  value={formData.cidade}
                  readOnly
                  placeholder="Sua cidade"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado (UF)
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm text-gray-500"
                  value={formData.estado}
                  readOnly
                  placeholder="Seu estado"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número ou referência
              </label>
              <input
                placeholder="Ex: 123 ou próximo ao mercado"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm focus:ring-1 focus:ring-blue-500"
                value={formData.numero}
                onChange={(e) =>
                  setFormData({ ...formData, numero: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição detalhada
              </label>
              <textarea
                placeholder="Conte-nos o que está acontecendo..."
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm focus:ring-1 focus:ring-blue-500"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                required
              />
            </div>

            {erroEnvio && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {erroEnvio}
              </p>
            )}

            {sucessoEnvio && (
              <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                Denúncia enviada com sucesso.
              </p>
            )}

            <button
              type="submit"
              disabled={loadingCep || enviando}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-sm shadow hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loadingCep
                ? "Localizando..."
                : enviando
                  ? "Enviando..."
                  : "Enviar denúncia"}
            </button>
          </form>
        </div>

        {/* TABELA */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100">
              <tr className="text-gray-500 font-medium text-xs">
                <th className="p-4">Categoria</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">Data</th>
                <th className="p-4 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {denuncias.slice(0, itensExibidos).map((d) => (
                <tr
                  key={d.id}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="p-4 text-sm">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap inline-block ${corCategoria(d.categoria).badge}`}
                    >
                      {d.categoria}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap inline-block ${getStatusStyle(d.status)}`}
                    >
                      {d.status?.replace("_", " ") || "Pendente"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 font-mono">
                    {new Date(d.data).toLocaleDateString("pt-BR")}
                  </td>
                  <td
                    className="p-4 text-sm text-blue-600 cursor-pointer font-medium text-center"
                    onClick={() => setDenunciaSelecionada(d)}
                  >
                    Detalhes →
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {denuncias.length > itensExibidos && (
            <button
              onClick={() => setItensExibidos((prev) => prev + 5)}
              className="w-full p-4 bg-gray-50 text-blue-600 font-medium text-sm border-t border-gray-100 hover:bg-gray-100"
            >
              Ver mais (+{denuncias.length - itensExibidos})
            </button>
          )}
        </div>
      </div>

      {/* MODAL — mesmo padrão do modal de Projetos de Lei */}
      {denunciaSelecionada && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setDenunciaSelecionada(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div className="pr-4">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full inline-block ${corCategoria(denunciaSelecionada.categoria).badge}`}
                >
                  {denunciaSelecionada.categoria}
                </span>
                <h2 className="text-lg font-semibold text-black leading-tight mt-2">
                  {denunciaSelecionada.titulo || "Detalhes"}
                </h2>
              </div>
              <button
                onClick={() => setDenunciaSelecionada(null)}
                className="text-gray-400 hover:text-black text-xl leading-none shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${getStatusStyle(denunciaSelecionada.status)}`}
              >
                {denunciaSelecionada.status?.replace("_", " ") || "Pendente"}
              </span>

              <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed text-gray-700">
                {denunciaSelecionada.descricao}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                <div>
                  <p className="text-xs text-gray-400">Localização</p>
                  <p className="text-black">
                    {denunciaSelecionada.bairro} —{" "}
                    {denunciaSelecionada.cidade || ""}/
                    {denunciaSelecionada.estado || ""}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Endereço</p>
                  <p className="text-black">
                    {denunciaSelecionada.rua || "Não informada"},{" "}
                    {denunciaSelecionada.numero}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setDenunciaSelecionada(null)}
                className="border border-gray-300 text-black px-5 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}