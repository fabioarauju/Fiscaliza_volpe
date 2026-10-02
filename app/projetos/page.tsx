"use client";

import { useState, useEffect } from "react";
import {
  buscarProposicoes,
  buscarDetalhesProposicao,
} from "../services/camaraApi";

function corStatus(status: string | undefined) {
  const s = status?.toLowerCase() || "";
  if (s.includes("aprovad")) return { cor: "#3F6B4F" };
  if (s.includes("rejeitad")) return { cor: "#8B2A2A" };
  if (s.includes("votaç")) return { cor: "#B5511E" };
  if (s.includes("análise") || s.includes("tramitaç"))
    return { cor: "#5F5E5A" };
  return { cor: "#5F5E5A" };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Modal({ projeto, onClose }: { projeto: any; onClose: () => void }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarDetalhesProposicao(projeto.id)
      .then(setDados)
      .finally(() => setLoading(false));
  }, [projeto.id]);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Detalhes do projeto de lei"
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div className="pr-4">
            <span className="text-sm font-medium text-blue-600">
              {projeto.tipo}
            </span>
            <h2 className="text-lg font-semibold text-black leading-tight mt-1">
              {projeto.titulo}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl leading-none shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {loading ? (
            <p className="text-center py-10 text-sm text-gray-400">
              Carregando...
            </p>
          ) : (
            dados && (
              <>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${corStatus(
                    dados.detalhes.statusProposicao?.descricaoSituacao,
                  )}`}
                >
                  {dados.detalhes.statusProposicao?.descricaoSituacao ||
                    "Em tramitação"}
                </span>

                <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed text-gray-700">
                  <span className="font-medium text-black">Ementa: </span>
                  {dados.detalhes.ementa}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                  <div>
                    <p className="text-xs text-gray-400">Autor</p>
                    <p className="text-black">
                      {dados.autores[0]?.nome || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Ano</p>
                    <p className="font-mono text-black">
                      {dados.detalhes.ano || "—"}
                    </p>
                  </div>
                </div>
              </>
            )
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjetosDeLei() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projetos, setProjetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [anoFiltro, setAnoFiltro] = useState("TODOS");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projetoSelecionado, setProjetoSelecionado] = useState<any>(null);
  const ITENS_POR_PAGINA = 10;

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const [res25, res26] = await Promise.all([
          buscarProposicoes({ ano: 2025, itens: 150 }),
          buscarProposicoes({ ano: 2026, itens: 150 }),
        ]);
        const combinados = [...res26.dados, ...res25.dados].map((p) => ({
          id: p.id,
          titulo: p.ementa || p.siglaTipo,
          tipo: `${p.siglaTipo} ${p.numero}/${p.ano}`,
          status: p.statusProposicao?.descricaoSituacao || "Em tramitação",
          data: p.dataApresentacao?.slice(0, 10),
          anoOriginal: p.ano,
        }));
        setProjetos(combinados);
      } finally {
        setLoading(false);
      }
    };
    fetchDados();
  }, []);

  const filtrados = projetos.filter((p) => {
    const matchBusca =
      p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      p.tipo.toLowerCase().includes(busca.toLowerCase());
    const matchAno =
      anoFiltro === "TODOS" || p.anoOriginal.toString() === anoFiltro;
    return matchBusca && matchAno;
  });

  const totalPaginas = Math.ceil(filtrados.length / ITENS_POR_PAGINA);
  const paginasVisiveis = () => {
    let pags = [];
    let start = Math.max(paginaAtual - 2, 1);
    let end = Math.min(start + 4, totalPaginas);
    if (end - start < 4) start = Math.max(end - 4, 1);
    for (let i = start; i <= end; i++) pags.push(i);
    return pags;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {projetoSelecionado && (
        <Modal
          projeto={projetoSelecionado}
          onClose={() => setProjetoSelecionado(null)}
        />
      )}

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Projetos de Lei</h1>
          <p className="text-gray-500">Proposições legislativas da Câmara Federal.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total na base</div>
            <div className="text-2xl font-bold font-mono text-gray-900 mt-1.5">
              {projetos.length}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Filtrados</div>
            <div className="text-2xl font-bold font-mono text-blue-600 mt-1.5">
              {filtrados.length}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-center">
            <p className="text-sm text-gray-400">
              Fonte: Câmara dos Deputados — Dados Abertos
            </p>
          </div>
        </div>

       {/* Busca e filtro ano */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-wrap gap-3">
          <input
            placeholder="Buscar por título ou número..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPaginaAtual(1);
            }}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 cursor-pointer"
            value={anoFiltro}
            onChange={(e) => {
              setAnoFiltro(e.target.value);
              setPaginaAtual(1);
            }}
          >
            <option value="TODOS">Todos os anos</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-4 bg-gray-200 rounded flex-1" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            ))}
          </div>
        ) : projetos.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-400 text-sm">
            Nenhum projeto encontrado na base da Câmara.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed min-w-[500px]">
              <thead className="border-b border-gray-100">
                <tr className="text-gray-500 font-medium text-xs">
                  <th className="p-4 pr-4 w-[18%]">ID</th>
                  <th className="p-4 pr-4 w-[57%]">Ementa</th>
                  <th className="p-4 w-[25%] text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtrados
                  .slice(
                    (paginaAtual - 1) * ITENS_POR_PAGINA,
                    paginaAtual * ITENS_POR_PAGINA,
                  )
                  .map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                      onClick={() => setProjetoSelecionado(p)}
                    >
                      <td className="p-4 pr-4 text-sm font-medium text-blue-600 truncate">
                        {p.tipo}
                      </td>
                      <td className="p-4 pr-4 text-sm text-gray-700 truncate">
                        {p.titulo}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap inline-block ${corStatus(p.status)}`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>

            <div className="p-4 flex items-center justify-between border-t border-gray-100">
              <span className="text-xs text-gray-500 font-mono">
                Pág {paginaAtual} / {totalPaginas || 1}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPaginaAtual(1)}
                  className="px-2.5 py-1 rounded-lg text-xs border border-gray-200 disabled:opacity-30"
                  disabled={paginaAtual === 1}
                >
                  «
                </button>
                {paginasVisiveis().map((n) => (
                  <button
                    key={n}
                    onClick={() => setPaginaAtual(n)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono ${
                      paginaAtual === n
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPaginaAtual(totalPaginas)}
                  className="px-2.5 py-1 rounded-lg text-xs border border-gray-200 disabled:opacity-30"
                  disabled={paginaAtual === totalPaginas}
                >
                  »
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}