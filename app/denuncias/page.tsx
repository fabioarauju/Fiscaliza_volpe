/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Search, Filter, X, ChevronDown, MapPin, Tag, Clock } from "lucide-react";

const MapaDenuncias = dynamic(() => import("../../components/MapaDenuncias"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 text-sm">
      Carregando mapa...
    </div>
  ),
});

const CORES_CATEGORIA: Record<string, { fill: string; badge: string }> = {
  SANEAMENTO: { fill: "#378ADD", badge: "bg-blue-50 text-blue-700" },
  AMBIENTAL: { fill: "#639922", badge: "bg-green-50 text-green-700" },
  INFRAESTRUTURA: { fill: "#D85A30", badge: "bg-orange-50 text-orange-700" },
  "PERTURBAÇÃO": { fill: "#7F77DD", badge: "bg-purple-50 text-purple-700" },
  OUTROS: { fill: "#B4B2A9", badge: "bg-gray-100 text-gray-600" },
};

function corCategoria(categoria: string) {
  return CORES_CATEGORIA[categoria] || CORES_CATEGORIA.OUTROS;
}

function getStatusStyle(status: string | undefined) {
  const s = status?.toUpperCase().replace("_", " ");
  if (s === "RESOLVIDO") return "bg-emerald-50 text-emerald-700";
  if (s === "EM ANALISE" || s === "EM REALIZAÇÃO") return "bg-blue-50 text-blue-700";
  if (s === "ARQUIVADA") return "bg-gray-100 text-gray-500";
  return "bg-amber-50 text-amber-700";
}

function statusLabel(s: string) {
  const m: Record<string, string> = { PENDENTE: "Pendente", EM_ANALISE: "Em análise", RESOLVIDO: "Resolvido", ARQUIVADA: "Arquivada" };
  return m[s] || s?.replace("_", " ") || "Pendente";
}

export default function DenunciasPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [denuncias, setDenuncias] = useState<any[]>([]);
  const [loadingCep, setLoadingCep] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  const [sucessoEnvio, setSucessoEnvio] = useState(false);
  const [itensExibidos, setItensExibidos] = useState(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [denunciaSelecionada, setDenunciaSelecionada] = useState<any>(null);

  const [loadingDenuncias, setLoadingDenuncias] = useState(true);
  const [erroDenuncias, setErroDenuncias] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [protocolo, setProtocolo] = useState("");
  const [buscaProtocolo, setBuscaProtocolo] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resultadoBusca, setResultadoBusca] = useState<any>(null);
  const [buscando, setBuscando] = useState(false);
  const [erroBusca, setErroBusca] = useState("");

  // ─── Filtros ───────────────────────────────────────────────
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

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

  // ─── Dados derivados ──────────────────────────────────────
  const cidades = useMemo(() => {
    const set = new Set(denuncias.map((d) => d.cidade).filter(Boolean));
    return Array.from(set).sort();
  }, [denuncias]);

  const categorias = useMemo(() => {
    const set = new Set(denuncias.map((d) => d.categoria).filter(Boolean));
    return Array.from(set).sort();
  }, [denuncias]);

  const denunciasFiltradas = useMemo(() => {
    return denuncias.filter((d) => {
      if (filtroStatus && d.status !== filtroStatus) return false;
      if (filtroCategoria && d.categoria !== filtroCategoria) return false;
      if (filtroCidade && d.cidade !== filtroCidade) return false;
      if (filtroTexto) {
        const q = filtroTexto.toLowerCase();
        const campos = [d.titulo, d.descricao, d.bairro, d.rua, d.cidade, d.estado, d.categoria, d.id].map((v) => (v || "").toLowerCase());
        if (!campos.some((c) => c.includes(q))) return false;
      }
      return true;
    });
  }, [denuncias, filtroTexto, filtroStatus, filtroCategoria, filtroCidade]);

  const filtrosAtivos = [filtroTexto, filtroStatus, filtroCategoria, filtroCidade].filter(Boolean).length;

  const dadosGrafico: { name: string; value: number }[] = Object.values(
    denunciasFiltradas.reduce((acc: Record<string, { name: string; value: number }>, { categoria }) => {
      const key = categoria || "OUTROS";
      acc[key] = acc[key] || { name: key, value: 0 };
      acc[key].value += 1;
      return acc;
    }, {}),
  );

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoadingDenuncias(true);
        setErroDenuncias("");
        const res = await fetch("/denuncias/api");
        const data = await res.json();
        if (Array.isArray(data)) setDenuncias(data);
      } catch {
        setErroDenuncias("Não foi possível carregar as denúncias. Tente novamente.");
      } finally {
        setLoadingDenuncias(false);
      }
    };
    carregarDados();
  }, []);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Falha ao enviar denúncia:", response.status, data);
        setErroEnvio(
          data?.error ||
            `Não foi possível enviar (erro ${response.status}). Confira o console.`,
        );
        return;
      }

      setDenuncias((prev) => [data, ...prev]);
      setSucessoEnvio(true);
      setProtocolo(data.id || "");
      setTouched({});
      setTimeout(() => { setSucessoEnvio(false); setProtocolo(""); }, 15000);
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

  function limparFiltros() {
    setFiltroTexto("");
    setFiltroStatus("");
    setFiltroCategoria("");
    setFiltroCidade("");
    setItensExibidos(10);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Denúncias</h1>
          <p className="text-gray-500">Registre problemas urbanos e acompanhe o andamento.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* BUSCA POR PROTOCOLO */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1">Acompanhar denúncia</h2>
          <p className="text-xs text-gray-400 mb-4">Informe o protocolo recebido ao enviar sua denúncia.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!buscaProtocolo.trim()) return;
              setBuscando(true);
              setErroBusca("");
              setResultadoBusca(null);
              try {
                const res = await fetch(`/denuncias/api/${buscaProtocolo.trim()}`);
                if (res.ok) {
                  setResultadoBusca(await res.json());
                } else {
                  const encontrada = denuncias.find((d) => d.id === buscaProtocolo.trim());
                  if (encontrada) {
                    setResultadoBusca(encontrada);
                  } else {
                    setErroBusca("Nenhuma denúncia encontrada com esse protocolo.");
                  }
                }
              } catch {
                const encontrada = denuncias.find((d) => d.id === buscaProtocolo.trim());
                if (encontrada) {
                  setResultadoBusca(encontrada);
                } else {
                  setErroBusca("Nenhuma denúncia encontrada com esse protocolo.");
                }
              } finally {
                setBuscando(false);
              }
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              placeholder="Cole seu protocolo aqui..."
              value={buscaProtocolo}
              onChange={(e) => setBuscaProtocolo(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition font-mono"
            />
            <button
              type="submit"
              disabled={buscando || !buscaProtocolo.trim()}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buscar
            </button>
          </form>

          {erroBusca && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mt-3">{erroBusca}</p>
          )}

          {resultadoBusca && (
            <div className="mt-4 bg-gray-50 rounded-lg p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900">{resultadoBusca.titulo}</h3>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusStyle(resultadoBusca.status)}`}>
                  {statusLabel(resultadoBusca.status)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-gray-400">Categoria</span>
                  <p className="text-gray-700">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${corCategoria(resultadoBusca.categoria).badge}`}>
                      {resultadoBusca.categoria}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Data</span>
                  <p className="text-gray-700 font-mono text-xs">{new Date(resultadoBusca.data).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Local</span>
                  <p className="text-gray-700">{resultadoBusca.bairro} — {resultadoBusca.cidade}/{resultadoBusca.estado}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Endereço</span>
                  <p className="text-gray-700">{resultadoBusca.rua}, {resultadoBusca.numero}</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xs text-gray-400">Descrição</span>
                <p className="text-sm text-gray-600 mt-0.5">{resultadoBusca.descricao}</p>
              </div>
              <div className="mt-3">
                <span className="text-xs text-gray-400">Protocolo</span>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{resultadoBusca.id}</p>
              </div>
            </div>
          )}
        </div>

        {/* MAPA */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <MapaDenuncias denuncias={denunciasFiltradas} />
        </div>

        {/* ─── FILTROS + BUSCA ─── */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Buscar denúncias</h2>
            {filtrosAtivos > 0 && (
              <button
                onClick={limparFiltros}
                className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
              >
                <X size={12} />
                Limpar filtros ({filtrosAtivos})
              </button>
            )}
          </div>

          {/* Barra de busca por texto */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            <input
              type="text"
              placeholder="Buscar por título, descrição, bairro, rua, cidade ou protocolo..."
              value={filtroTexto}
              onChange={(e) => { setFiltroTexto(e.target.value); setItensExibidos(10); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {filtroTexto && (
              <button
                onClick={() => setFiltroTexto("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filtros rápidos por status */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["", "PENDENTE", "EM_ANALISE", "RESOLVIDO", "ARQUIVADA"].map((s) => {
              const count = s ? denuncias.filter((d) => d.status === s).length : denuncias.length;
              return (
                <button
                  key={s}
                  onClick={() => { setFiltroStatus(s); setItensExibidos(10); }}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                    filtroStatus === s
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {s === "" ? "Todas" : statusLabel(s)}
                  <span className="ml-1 opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Filtros avançados (categoria + cidade) */}
          <button
            onClick={() => setFiltrosAbertos(!filtrosAbertos)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition mb-3"
          >
            <Filter size={14} />
            Filtros avançados
            <ChevronDown size={14} className={`transition-transform ${filtrosAbertos ? "rotate-180" : ""}`} />
          </button>

          {filtrosAbertos && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                  <Tag size={12} />
                  Categoria
                </label>
                <select
                  value={filtroCategoria}
                  onChange={(e) => { setFiltroCategoria(e.target.value); setItensExibidos(10); }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                  <MapPin size={12} />
                  Cidade
                </label>
                <select
                  value={filtroCidade}
                  onChange={(e) => { setFiltroCidade(e.target.value); setItensExibidos(10); }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Todas as cidades</option>
                  {cidades.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Resultado da filtragem */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {loadingDenuncias
                ? "Carregando..."
                : `${denunciasFiltradas.length} denúncia${denunciasFiltradas.length !== 1 ? "s" : ""} encontrada${denunciasFiltradas.length !== 1 ? "s" : ""}`}
              {filtrosAtivos > 0 && ` (de ${denuncias.length} no total)`}
            </p>
          </div>
        </div>

        {/* GRÁFICO */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1">Resumo de ocorrências</h2>
          <p className="text-xs text-gray-400 mb-4">Distribuição por categoria{filtrosAtivos > 0 ? " (filtrado)" : ""}</p>
          {denunciasFiltradas.length > 0 ? (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosGrafico}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }: { name?: string; percent?: number }) =>
                      `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
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
              {filtrosAtivos > 0 ? "Nenhuma denúncia corresponde aos filtros." : "Aguardando dados..."}
            </div>
          )}
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-black">
          <h2 className="text-xl font-semibold text-black mb-6">
            Nova denúncia
          </h2>
          <form onSubmit={(e) => {
            setTouched({ titulo: true, categoria: true, cep: true, numero: true, descricao: true });
            handleSubmit(e);
          }} className="space-y-4" noValidate>
            <div>
              <label htmlFor="den-titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título da denúncia <span className="text-red-500">*</span>
              </label>
              <input
                id="den-titulo"
                placeholder="Ex: buraco na via, vazamento de água..."
                className={`w-full p-3 border rounded-lg outline-none text-sm focus:ring-1 transition ${
                  touched.titulo && !formData.titulo.trim()
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, titulo: true }))}
                aria-required="true"
                aria-invalid={touched.titulo && !formData.titulo.trim()}
                required
              />
              {touched.titulo && !formData.titulo.trim() && (
                <p className="text-xs text-red-500 mt-1">Informe um título para a denúncia.</p>
              )}
            </div>

            <div>
              <label htmlFor="den-categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                id="den-categoria"
                className={`w-full p-3 border rounded-lg outline-none text-sm bg-white cursor-pointer transition ${
                  touched.categoria && !formData.categoria
                    ? "border-red-400 focus:ring-1 focus:ring-red-400"
                    : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                }`}
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, categoria: true }))}
                aria-required="true"
                aria-invalid={touched.categoria && !formData.categoria}
                required
              >
                <option value="">Selecione uma categoria...</option>
                <option value="SANEAMENTO">Saneamento</option>
                <option value="AMBIENTAL">Ambiental</option>
                <option value="INFRAESTRUTURA">Infraestrutura</option>
                <option value="PERTURBAÇÃO">Perturbação</option>
              </select>
              {touched.categoria && !formData.categoria && (
                <p className="text-xs text-red-500 mt-1">Selecione uma categoria.</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="den-cep" className="block text-sm font-medium text-gray-700 mb-1">
                  CEP <span className="text-red-500">*</span> {loadingCep && <span className="text-blue-500 text-xs ml-1">buscando...</span>}
                </label>
                <input
                  id="den-cep"
                  placeholder="00000-000"
                  className={`w-full p-3 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                    touched.cep && formData.cep.replace("-", "").length < 8
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={formData.cep}
                  onChange={handleCepChange}
                  onBlur={() => setTouched((t) => ({ ...t, cep: true }))}
                  maxLength={9}
                  aria-required="true"
                  aria-invalid={touched.cep && formData.cep.replace("-", "").length < 8}
                  required
                />
                {touched.cep && formData.cep.replace("-", "").length < 8 && (
                  <p className="text-xs text-red-500 mt-1">Informe um CEP válido com 8 dígitos.</p>
                )}
              </div>
              <div>
                <label htmlFor="den-bairro" className="block text-sm font-medium text-gray-700 mb-1">
                  Bairro
                </label>
                <input
                  id="den-bairro"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm text-gray-500"
                  value={formData.bairro}
                  readOnly
                  placeholder="Preenchido automaticamente pelo CEP"
                  aria-readonly="true"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="den-cidade" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  id="den-cidade"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm text-gray-500"
                  value={formData.cidade}
                  readOnly
                  placeholder="Preenchido automaticamente pelo CEP"
                  aria-readonly="true"
                />
              </div>
              <div>
                <label htmlFor="den-estado" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado (UF)
                </label>
                <input
                  id="den-estado"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm text-gray-500"
                  value={formData.estado}
                  readOnly
                  placeholder="Preenchido automaticamente pelo CEP"
                  aria-readonly="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="den-numero" className="block text-sm font-medium text-gray-700 mb-1">
                Número ou referência <span className="text-red-500">*</span>
              </label>
              <input
                id="den-numero"
                placeholder="Ex: 123 ou próximo ao mercado"
                className={`w-full p-3 border rounded-lg outline-none text-sm focus:ring-1 transition ${
                  touched.numero && !formData.numero.trim()
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, numero: true }))}
                aria-required="true"
                aria-invalid={touched.numero && !formData.numero.trim()}
                required
              />
              {touched.numero && !formData.numero.trim() && (
                <p className="text-xs text-red-500 mt-1">Informe o número ou uma referência do local.</p>
              )}
            </div>

            <div>
              <label htmlFor="den-descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição detalhada <span className="text-red-500">*</span>
              </label>
              <textarea
                id="den-descricao"
                placeholder="Conte-nos o que está acontecendo..."
                rows={3}
                className={`w-full p-3 border rounded-lg outline-none text-sm focus:ring-1 transition ${
                  touched.descricao && !formData.descricao.trim()
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, descricao: true }))}
                aria-required="true"
                aria-invalid={touched.descricao && !formData.descricao.trim()}
                required
              />
              {touched.descricao && !formData.descricao.trim() && (
                <p className="text-xs text-red-500 mt-1">Descreva o problema encontrado.</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{formData.descricao.length}/500 caracteres</p>
            </div>

            {erroEnvio && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {erroEnvio}
              </p>
            )}

            {sucessoEnvio && (
              <div role="status" className="bg-emerald-50 rounded-lg px-4 py-3 border border-emerald-200">
                <p className="text-sm text-emerald-700 font-medium">Denúncia enviada com sucesso!</p>
                {protocolo && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-emerald-600">Seu protocolo:</span>
                    <code className="bg-white text-emerald-800 px-2 py-0.5 rounded text-xs font-mono border border-emerald-200 select-all">
                      {protocolo}
                    </code>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(protocolo)}
                      className="text-xs text-emerald-600 hover:text-emerald-800 underline"
                    >
                      Copiar
                    </button>
                  </div>
                )}
                <p className="text-xs text-emerald-500 mt-1.5">Guarde o protocolo para acompanhar sua denúncia.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loadingCep || enviando}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-sm shadow hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loadingDenuncias ? (
            <div className="p-6 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-28" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              ))}
            </div>
          ) : erroDenuncias ? (
            <div className="p-10 text-center">
              <p className="text-sm text-red-600 mb-3">{erroDenuncias}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Recarregar página
              </button>
            </div>
          ) : denunciasFiltradas.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-sm">
              {filtrosAtivos > 0
                ? "Nenhuma denúncia corresponde aos filtros aplicados."
                : "Nenhuma denúncia registrada ainda. Seja o primeiro a registrar!"}
            </div>
          ) : (
          <>
          <table className="w-full text-left">
            <thead className="border-b border-gray-100">
              <tr className="text-gray-500 font-medium text-xs">
                <th className="p-4">Denúncia</th>
                <th className="p-4">Categoria</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {denunciasFiltradas.slice(0, itensExibidos).map((d) => (
                <tr
                  key={d.id}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                  onClick={() => setDenunciaSelecionada(d)}
                >
                  <td className="p-4">
                    <span className="font-medium text-gray-900 text-sm block">{d.titulo}</span>
                    <span className="text-xs text-gray-400 mt-0.5 block">{d.bairro}{d.cidade ? ` — ${d.cidade}/${d.estado}` : ""} · {new Date(d.data).toLocaleDateString("pt-BR")}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${corCategoria(d.categoria).badge}`}>
                      {d.categoria}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusStyle(d.status)}`}>
                      {statusLabel(d.status)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-blue-600 font-medium">Ver →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {denunciasFiltradas.length > itensExibidos && (
            <button
              onClick={() => setItensExibidos((prev) => prev + 10)}
              className="w-full p-4 bg-gray-50 text-blue-600 font-medium text-sm border-t border-gray-100 hover:bg-gray-100 transition"
            >
              Ver mais ({denunciasFiltradas.length - itensExibidos} restantes)
            </button>
          )}
          </>
          )}
        </div>
      </div>

      {/* MODAL */}
      {denunciaSelecionada && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setDenunciaSelecionada(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Detalhes da denúncia"
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
                {statusLabel(denunciaSelecionada.status)}
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
                <div>
                  <p className="text-xs text-gray-400">Data</p>
                  <p className="text-black font-mono text-xs">
                    {new Date(denunciaSelecionada.data).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Protocolo</p>
                  <p className="text-black font-mono text-xs select-all">
                    {denunciaSelecionada.id}
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
