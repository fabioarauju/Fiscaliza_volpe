"use client";

import { useState, useEffect } from "react";
import {
  buscarProposicoes,
  buscarDetalhesProposicao,
} from "../services/camaraApi";

function corStatus(status) {
  const s = status?.toLowerCase() || "";
  if (s.includes("aprovad"))
    return "bg-green-100 text-green-700 border-green-200";
  if (s.includes("rejeitad")) return "bg-red-100 text-red-700 border-red-200";
  if (s.includes("votaç"))
    return "bg-orange-100 text-orange-700 border-orange-200";
  if (s.includes("análise") || s.includes("tramitaç"))
    return "bg-blue-100 text-blue-700 border-blue-200";
  return "bg-gray-100 text-gray-600 border-gray-200";
}

// MODAL MINIMALISTA COM O X NO TOPO
function Modal({ projeto, onClose }) {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarDetalhesProposicao(projeto.id)
      .then(setDados)
      .finally(() => setLoading(false));
  }, [projeto.id]);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[85vh] overflow-y-auto border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho com o X alinhado no topo (items-start) */}
        <div className="p-6 border-b flex justify-between items-start bg-gray-50">
          <div className="pr-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              {projeto.tipo}
            </span>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              {projeto.titulo}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl leading-none shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {loading ? (
            <p className="text-center py-10 text-xs text-gray-400 animate-pulse font-bold">
              CARREGANDO...
            </p>
          ) : (
            dados && (
              <>
                <span
                  className={`px-2 py-1 rounded text-[10px] font-bold border uppercase ${corStatus(dados.detalhes.statusProposicao?.descricaoSituacao)}`}
                >
                  {dados.detalhes.statusProposicao?.descricaoSituacao ||
                    "EM TRAMITAÇÃO"}
                </span>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-xs leading-relaxed text-gray-700 font-medium">
                  <strong>Ementa:</strong> {dados.detalhes.ementa}
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                  <div>
                    <p className="text-gray-400 uppercase text-[9px]">Autor</p>
                    <p className="text-gray-800">
                      {dados.autores[0]?.nome || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase text-[9px]">Ano</p>
                    <p className="text-gray-800">{dados.detalhes.ano || "—"}</p>
                  </div>
                </div>
              </>
            )
          )}
        </div>
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold text-xs hover:bg-blue-700"
          >
            FECHAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjetosDeLei() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [anoFiltro, setAnoFiltro] = useState("TODOS");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
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
    <div className="bg-gray-50 min-h-screen py-6 px-4 font-sans text-gray-800">
      {projetoSelecionado && (
        <Modal
          projeto={projetoSelecionado}
          onClose={() => setProjetoSelecionado(null)}
        />
      )}

      <div className="max-w-5xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tighter italic">
            Projetos de Lei
          </h1>
        </div>

        {/* Cards de Resumo Minimalistas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
            <p className="text-[9px] font-bold text-gray-400 uppercase">
              Total na Base
            </p>
            <p className="text-xl font-bold text-gray-900">{projetos.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
            <p className="text-[9px] font-bold text-gray-400 uppercase">
              Filtrados
            </p>
            <p className="text-xl font-bold text-blue-600">
              {filtrados.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center">
            <p className="text-[15px] font-bold text-blue-800 italic uppercase">
              Câmara Federal
            </p>
          </div>
        </div>

        {/* Busca e Filtro Ano */}
        <div className="flex gap-2">
          <input
            placeholder="Buscar por título ou número..."
            className="flex-1 bg-white p-2.5 rounded-md border border-gray-200 outline-none text-xs font-medium focus:ring-1 ring-blue-500"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPaginaAtual(1);
            }}
          />
          <select
            className="bg-white p-2.5 rounded-md border border-gray-200 outline-none text-xs font-bold text-gray-600 cursor-pointer"
            value={anoFiltro}
            onChange={(e) => {
              setAnoFiltro(e.target.value);
              setPaginaAtual(1);
            }}
          >
            <option value="TODOS">TODOS OS ANOS</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center py-10 text-xs font-bold text-gray-400 uppercase animate-pulse">
            Sincronizando...
          </p>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left table-fixed">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">
                  <th className="p-3 w-[20%]">ID</th>
                  <th className="p-3 w-[55%]">Ementa</th>
                  <th className="p-3 w-[25%] text-center">Status</th>
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
                      <td className="p-3 text-[11px] font-bold text-blue-600 truncate">
                        {p.tipo}
                      </td>
                      <td className="p-3 text-[11px] text-gray-600 truncate font-medium">
                        {p.titulo}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase whitespace-nowrap ${corStatus(p.status)}`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="p-3 bg-gray-50 flex items-center justify-between border-t border-gray-200">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Pág {paginaAtual} / {totalPaginas || 1}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPaginaAtual(1)}
                  className="px-2 py-1 bg-white border rounded text-[10px] font-bold disabled:opacity-30"
                  disabled={paginaAtual === 1}
                >
                  «
                </button>
                {paginasVisiveis().map((n) => (
                  <button
                    key={n}
                    onClick={() => setPaginaAtual(n)}
                    className={`px-2 py-1 rounded text-[10px] font-bold border ${paginaAtual === n ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPaginaAtual(totalPaginas)}
                  className="px-2 py-1 bg-white border rounded text-[10px] font-bold disabled:opacity-30"
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
