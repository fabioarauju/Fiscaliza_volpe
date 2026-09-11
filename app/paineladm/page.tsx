"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutGrid, FileText, Flag, BarChart3, Plus, Pencil, Eye,
  Trash2, Check, Archive, LogOut, X, Loader2, RefreshCw,
  AlertTriangle, CheckCircle2,
} from "lucide-react";

// ─── Static Data (projetos & gastos) ─────────────────────────
const secretarias = [
  { nome: "Saúde", valor: 42.5 },
  { nome: "Educação", valor: 31.2 },
  { nome: "Infraestrutura", valor: 18.7 },
  { nome: "Segurança", valor: 14.3 },
  { nome: "Cultura", valor: 6.8 },
  { nome: "Meio Ambiente", valor: 5.1 },
];

const secretariasHex: Record<string, string> = {
  "Saúde": "#3b82f6", "Educação": "#8b5cf6", "Infraestrutura": "#f97316",
  "Segurança": "#10b981", "Cultura": "#f59e0b", "Meio Ambiente": "#06b6d4",
};

const categoriaCor: Record<string, string> = {
  SANEAMENTO: "#378ADD", AMBIENTAL: "#639922", INFRAESTRUTURA: "#D85A30",
  "PERTURBAÇÃO": "#7F77DD", OUTROS: "#B4B2A9",
};

const projetosFixos = [
  { num: "PL-001/2025", titulo: "Reforma do Calçadão Central", cat: "Infraestrutura", status: "Em votação", votos: 12 },
  { num: "PL-002/2025", titulo: "Programa Saúde nas Escolas", cat: "Saúde", status: "Aprovado", votos: 21 },
  { num: "PL-003/2025", titulo: "Incentivo à Cultura Local", cat: "Cultura", status: "Em análise", votos: 7 },
  { num: "PL-004/2025", titulo: "Ampliação do Parque Municipal", cat: "Meio Ambiente", status: "Rascunho", votos: 0 },
  { num: "PL-005/2025", titulo: "Câmeras de Segurança em Praças", cat: "Segurança", status: "Aprovado", votos: 19 },
  { num: "PL-006/2025", titulo: "Bolsa Estudante Universitário", cat: "Educação", status: "Rejeitado", votos: 4 },
];

// ─── Helpers ─────────────────────────────────────────────────
const statusProjetoCor: Record<string, string> = {
  Aprovado: "bg-green-50 text-green-800", "Em votação": "bg-blue-50 text-blue-800",
  "Em análise": "bg-yellow-50 text-yellow-800", Rascunho: "bg-gray-100 text-gray-600",
  Rejeitado: "bg-red-50 text-red-800",
};

const statusDenunciaCor: Record<string, string> = {
  PENDENTE: "bg-red-50 text-red-800", EM_ANALISE: "bg-yellow-50 text-yellow-800",
  RESOLVIDO: "bg-green-50 text-green-800", ARQUIVADA: "bg-gray-100 text-gray-600",
};

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDENTE: "Pendente", EM_ANALISE: "Em análise", RESOLVIDO: "Resolvido", ARQUIVADA: "Arquivada",
  };
  return labels[status] || status;
}

// ─── Toast component ────────────────────────────────────────
interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-[slideIn_0.3s_ease-out] ${
            t.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
            t.type === "error" ? "bg-red-50 border-red-200 text-red-800" :
            "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          {t.type === "success" ? <CheckCircle2 size={16} /> :
           t.type === "error" ? <AlertTriangle size={16} /> :
           <Flag size={16} />}
          {t.message}
          <button onClick={() => onRemove(t.id)} className="ml-2 opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── SVG Charts ──────────────────────────────────────────────
function PieChartSVG({ data }: { data: { nome: string; valor: number }[] }) {
  const total = data.reduce((a, s) => a + s.valor, 0);
  const cx = 100, cy = 100, r = 80;
  let angle = -Math.PI / 2;
  const slices = data.map((s) => {
    const slice = (s.valor / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += slice;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const large = slice > Math.PI ? 1 : 0;
    return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, cor: secretariasHex[s.nome] || "#94a3b8" };
  });
  return (
    <svg viewBox="0 0 200 200" className="w-[200px] h-[200px] mx-auto">
      {slices.map((s, i) => <path key={i} d={s.d} fill={s.cor} stroke="#fff" strokeWidth={2} />)}
    </svg>
  );
}

function BarChartSVG({ data }: { data: { nome: string; valor: number }[] }) {
  const max = Math.max(...data.map((s) => s.valor));
  return (
    <div className="flex items-end gap-3 h-[140px] px-1">
      {data.map((s) => (
        <div key={s.nome} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[11px] text-gray-500 font-medium">R${s.valor}M</span>
          <div
            className="w-full rounded-t"
            style={{ height: `${(s.valor / max) * 100}px`, background: secretariasHex[s.nome] || "#94a3b8", minHeight: 4 }}
          />
          <span className="text-[10px] text-gray-400 text-center leading-tight">{s.nome}</span>
        </div>
      ))}
    </div>
  );
}

function MiniBarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex flex-col gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-28 shrink-0 truncate">{d.label}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(d.value / max) * 100}%`, background: d.color }} />
          </div>
          <span className="text-xs font-semibold text-gray-700 w-8 text-right">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Reusable components ─────────────────────────────────────
function Badge({ status, map }: { status: string; map: Record<string, string> }) {
  const cls = map[status] ?? "bg-gray-100 text-gray-600";
  return <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cls}`}>{statusLabel(status)}</span>;
}

function ActBtn({ onClick, title, children, danger, loading }: { onClick: () => void; title: string; children: React.ReactNode; danger?: boolean; loading?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={loading}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-md border cursor-pointer transition hover:brightness-95 disabled:opacity-50 ${
        danger ? "border-red-300 bg-red-50 text-red-600" : "border-gray-200 bg-gray-50 text-gray-500"
      }`}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : children}
    </button>
  );
}

function Metric({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5" style={{ borderTopWidth: 3, borderTopColor: color }}>
      <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1.5">{label}</div>
      <div className="text-[28px] font-bold text-gray-900 leading-none">{value}</div>
      <div className="text-xs text-gray-500 mt-1.5">{sub}</div>
    </div>
  );
}

// ─── Denuncias interface ─────────────────────────────────────
interface Denuncia {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  bairro: string;
  cidade: string;
  estado: string;
  rua: string;
  numero: string;
  status: string;
  data: string;
  cep: string;
}

interface Estatisticas {
  total: number;
  pendentes: number;
  emAnalise: number;
  resolvidas: number;
  arquivadas: number;
  porCategoria: Record<string, number>;
  porMes: Record<string, number>;
}

// ─── Main ────────────────────────────────────────────────────
type Tab = "painel" | "projetos" | "denuncias" | "gastos";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("painel");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loadingDenuncias, setLoadingDenuncias] = useState(true);
  const [erroDenuncias, setErroDenuncias] = useState("");
  const [atualizando, setAtualizando] = useState<string | null>(null);
  const [excluindo, setExcluindo] = useState<string | null>(null);
  const [gastosData, setGastosData] = useState(secretarias.map((s) => ({ ...s })));
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState("");
  const [filtroDenuncia, setFiltroDenuncia] = useState("Todas");
  const [denunciaSelecionada, setDenunciaSelecionada] = useState<Denuncia | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  let toastCounter = 0;
  function addToast(message: string, type: Toast["type"] = "success") {
    const id = Date.now() + toastCounter++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const carregarDenuncias = useCallback(async () => {
    try {
      setLoadingDenuncias(true);
      setErroDenuncias("");
      const res = await fetch("/denuncias/api");
      const data = await res.json();
      if (Array.isArray(data)) setDenuncias(data);
    } catch {
      setErroDenuncias("Erro ao carregar denúncias do servidor.");
    } finally {
      setLoadingDenuncias(false);
    }
  }, []);

  const carregarEstatisticas = useCallback(async () => {
    try {
      const res = await fetch("/denuncias/api/estatisticas");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // stats are optional
    }
  }, []);

  useEffect(() => {
    carregarDenuncias();
    carregarEstatisticas();
  }, [carregarDenuncias, carregarEstatisticas]);

  const pendentes = denuncias.filter((d) => d.status === "PENDENTE").length;

  async function atualizarStatus(id: string, novoStatus: string) {
    setAtualizando(id);
    try {
      const res = await fetch("/api/admin/denuncias", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: novoStatus }),
      });
      setDenuncias((prev) => prev.map((d) => d.id === id ? { ...d, status: novoStatus } : d));
      if (res.ok) {
        addToast(`Denúncia atualizada para "${statusLabel(novoStatus)}"`, "success");
      } else {
        addToast("Atualizado localmente — servidor pode estar indisponível", "info");
      }
    } catch {
      setDenuncias((prev) => prev.map((d) => d.id === id ? { ...d, status: novoStatus } : d));
      addToast("Atualizado localmente — erro de conexão", "info");
    } finally {
      setAtualizando(null);
    }
  }

  async function excluirDenuncia(id: string) {
    setExcluindo(id);
    try {
      const res = await fetch("/api/admin/denuncias", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setDenuncias((prev) => prev.filter((d) => d.id !== id));
        addToast("Denúncia excluída com sucesso", "success");
      } else {
        addToast("Erro ao excluir denúncia no servidor", "error");
      }
    } catch {
      addToast("Erro de conexão ao excluir", "error");
    } finally {
      setExcluindo(null);
      setConfirmDelete(null);
    }
  }

  function saveEdit(i: number) {
    const v = parseFloat(editVal);
    if (!isNaN(v) && v >= 0) {
      setGastosData((prev) => prev.map((s, idx) => (idx === i ? { ...s, valor: v } : s)));
    }
    setEditIdx(null);
  }

  const denunciasFiltradas = filtroDenuncia === "Todas"
    ? denuncias
    : denuncias.filter((d) => d.status === filtroDenuncia);
  const totalEdit = gastosData.reduce((a, s) => a + s.valor, 0);

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "painel", label: "Visão Geral", icon: <LayoutGrid size={18} /> },
    { id: "projetos", label: "Projetos de Lei", icon: <FileText size={18} /> },
    { id: "denuncias", label: "Denúncias", icon: <Flag size={18} /> },
    { id: "gastos", label: "Gastos Públicos", icon: <BarChart3 size={18} /> },
  ];

  const thClass = "px-3.5 py-2.5 text-xs font-semibold text-gray-400 text-left whitespace-nowrap border-b border-gray-100 bg-gray-50";
  const tdClass = "px-3.5 py-3 text-sm text-gray-900 border-b border-gray-50 align-middle";

  const statsCategoria = stats?.porCategoria
    ? Object.entries(stats.porCategoria).map(([label, value]) => ({
        label,
        value: value as number,
        color: categoriaCor[label] || "#94a3b8",
      }))
    : [];

  const statsMes = stats?.porMes
    ? Object.entries(stats.porMes).map(([label, value]) => ({
        label,
        value: value as number,
        color: "#3b82f6",
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Confirm delete dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-gray-900/55 flex items-center justify-center z-[999] p-5" role="dialog" aria-modal="true">
          <div className="w-full max-w-[380px] bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Excluir denúncia?</div>
                <div className="text-xs text-gray-500">Essa ação não pode ser desfeita.</div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => excluirDenuncia(confirmDelete)}
                disabled={excluindo === confirmDelete}
                className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {excluindo === confirmDelete ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3">
        <span className="text-sm font-semibold text-gray-900">Painel Admin</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600">
          {sidebarOpen ? <X size={18} /> : <LayoutGrid size={18} />}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* ── Sidebar ── */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed md:relative z-50 md:z-auto top-0 left-0 h-full w-[260px] md:w-[220px] bg-white border-r border-gray-100 flex flex-col p-5 shrink-0 transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
            Navegação
          </div>
          {navItems.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setTab(item.id); setSidebarOpen(false); }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg w-full text-left text-sm transition ${
                  active ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.label}
                {item.id === "denuncias" && pendentes > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[11px] font-bold rounded-full px-1.5 min-w-[20px] text-center">
                    {pendentes}
                  </span>
                )}
              </button>
            );
          })}

          <div className="flex-1" />

          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="text-xs text-gray-400">Sessão ativa</div>
            <div className="text-sm text-gray-700 font-medium mt-0.5">admin@camara.gov.br</div>
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin";
              }}
              className="mt-3 w-full py-2.5 px-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-semibold cursor-pointer hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
              <LogOut size={14} />
              Sair do painel
            </button>
          </div>
        </aside>

        {/* ── Content ── */}
        <main className="flex-1 overflow-auto p-4 md:p-7">
          {/* ════ PAINEL ════ */}
          {tab === "painel" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Visão Geral</h2>
              <p className="text-sm text-gray-500 mb-6">Resumo das atividades do painel.</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
                <Metric label="Total de Denúncias" value={String(stats?.total ?? denuncias.length)} sub={`${stats?.pendentes ?? pendentes} pendentes`} color="#ef4444" />
                <Metric label="Em Análise" value={String(stats?.emAnalise ?? denuncias.filter(d => d.status === "EM_ANALISE").length)} sub="em andamento" color="#f59e0b" />
                <Metric label="Resolvidas" value={String(stats?.resolvidas ?? denuncias.filter(d => d.status === "RESOLVIDO").length)} sub="concluídas" color="#10b981" />
                <Metric label="Arquivadas" value={String(stats?.arquivadas ?? denuncias.filter(d => d.status === "ARQUIVADA").length)} sub="finalizadas" color="#6b7280" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="bg-white border border-gray-100 rounded-xl p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Por Categoria</div>
                  <div className="text-xs text-gray-400 mb-4">Distribuição de denúncias</div>
                  {statsCategoria.length > 0 ? (
                    <MiniBarChart data={statsCategoria} />
                  ) : (
                    <div className="text-sm text-gray-400 py-4 text-center">Carregando...</div>
                  )}
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Por Mês</div>
                  <div className="text-xs text-gray-400 mb-4">Evolução temporal</div>
                  {statsMes.length > 0 ? (
                    <MiniBarChart data={statsMes} />
                  ) : (
                    <div className="text-sm text-gray-400 py-4 text-center">Carregando...</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
                <div className="bg-white border border-gray-100 rounded-xl p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Gastos por Secretaria (R$ milhões)</div>
                  <div className="text-xs text-gray-400 mb-5">Orçamento 2026</div>
                  <BarChartSVG data={gastosData} />
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-4">Denúncias Recentes</div>
                  {loadingDenuncias ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 size={20} className="animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {denuncias.slice(0, 5).map((d) => (
                        <div key={d.id} className="flex gap-3 items-start">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            d.status === "PENDENTE" ? "bg-red-500" :
                            d.status === "EM_ANALISE" ? "bg-amber-500" :
                            d.status === "RESOLVIDO" ? "bg-emerald-500" : "bg-gray-400"
                          }`} />
                          <div className="min-w-0">
                            <div className="text-sm text-gray-700 leading-snug truncate">{d.titulo}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5">{d.bairro} — {statusLabel(d.status)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ════ PROJETOS ════ */}
          {tab === "projetos" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Projetos de Lei</h2>
                  <p className="text-sm text-gray-500">{projetosFixos.length} projetos cadastrados</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition">
                  <Plus size={16} /> Novo Projeto
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={thClass}>Número</th>
                        <th className={thClass}>Título</th>
                        <th className={thClass}>Categoria</th>
                        <th className={thClass}>Status</th>
                        <th className={`${thClass} text-center`}>Votos</th>
                        <th className={`${thClass} text-center`}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projetosFixos.map((p, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition">
                          <td className={tdClass}><span className="font-mono text-xs text-gray-500">{p.num}</span></td>
                          <td className={`${tdClass} max-w-[240px]`}><span className="font-medium">{p.titulo}</span></td>
                          <td className={tdClass}><span className="text-xs text-gray-500">{p.cat}</span></td>
                          <td className={tdClass}><Badge status={p.status} map={statusProjetoCor} /></td>
                          <td className={`${tdClass} text-center`}>
                            <span className={`font-bold text-sm ${p.votos > 0 ? "text-gray-900" : "text-gray-400"}`}>{p.votos}</span>
                          </td>
                          <td className={`${tdClass} text-center`}>
                            <div className="inline-flex gap-1.5">
                              <ActBtn onClick={() => {}} title="Editar"><Pencil size={14} /></ActBtn>
                              <ActBtn onClick={() => {}} title="Visualizar"><Eye size={14} /></ActBtn>
                              <ActBtn onClick={() => {}} title="Excluir" danger><Trash2 size={14} /></ActBtn>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ════ DENÚNCIAS ════ */}
          {tab === "denuncias" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Denúncias</h2>
                  <p className="text-sm text-gray-500">
                    {loadingDenuncias ? "Carregando..." : `${denuncias.length} denúncias — ${pendentes} pendente${pendentes !== 1 ? "s" : ""}`}
                  </p>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <button
                    onClick={() => { carregarDenuncias(); carregarEstatisticas(); }}
                    disabled={loadingDenuncias}
                    title="Atualizar lista"
                    className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition disabled:opacity-50 shrink-0"
                  >
                    <RefreshCw size={16} className={loadingDenuncias ? "animate-spin" : ""} />
                  </button>
                  {["Todas", "PENDENTE", "EM_ANALISE", "RESOLVIDO", "ARQUIVADA"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFiltroDenuncia(f)}
                      className={`px-3.5 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${
                        filtroDenuncia === f
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {f === "Todas" ? "Todas" : statusLabel(f)}
                    </button>
                  ))}
                </div>
              </div>

              {loadingDenuncias ? (
                <div className="bg-white border border-gray-100 rounded-xl p-8">
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex gap-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-20" />
                        <div className="h-4 bg-gray-200 rounded flex-1" />
                        <div className="h-4 bg-gray-200 rounded w-16" />
                        <div className="h-4 bg-gray-200 rounded w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : erroDenuncias ? (
                <div className="bg-white border border-gray-100 rounded-xl p-10 text-center">
                  <p className="text-sm text-red-600 mb-3">{erroDenuncias}</p>
                  <button onClick={carregarDenuncias} className="text-sm text-blue-600 font-medium hover:underline">
                    Tentar novamente
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={thClass}>Protocolo</th>
                          <th className={thClass}>Título</th>
                          <th className={thClass}>Categoria</th>
                          <th className={thClass}>Local</th>
                          <th className={thClass}>Status</th>
                          <th className={thClass}>Data</th>
                          <th className={`${thClass} text-center`}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {denunciasFiltradas.map((d) => (
                          <tr key={d.id} className="hover:bg-gray-50/50 transition">
                            <td className={tdClass}>
                              <span className="font-mono text-[11px] text-gray-400" title={d.id}>
                                {d.id.slice(0, 8)}...
                              </span>
                            </td>
                            <td className={`${tdClass} max-w-[200px]`}>
                              <span className="font-medium truncate block">{d.titulo}</span>
                            </td>
                            <td className={tdClass}><span className="text-xs text-gray-500">{d.categoria}</span></td>
                            <td className={tdClass}><span className="text-xs text-gray-500">{d.bairro}</span></td>
                            <td className={tdClass}><Badge status={d.status} map={statusDenunciaCor} /></td>
                            <td className={tdClass}>
                              <span className="text-xs text-gray-400">{new Date(d.data).toLocaleDateString("pt-BR")}</span>
                            </td>
                            <td className={`${tdClass} text-center`}>
                              <div className="inline-flex gap-1.5">
                                {d.status !== "RESOLVIDO" && d.status !== "ARQUIVADA" && (
                                  <>
                                    <ActBtn
                                      onClick={() => atualizarStatus(d.id, "RESOLVIDO")}
                                      title="Marcar como resolvida"
                                      loading={atualizando === d.id}
                                    >
                                      <Check size={14} />
                                    </ActBtn>
                                    <ActBtn
                                      onClick={() => atualizarStatus(d.id, "EM_ANALISE")}
                                      title="Em análise"
                                      loading={atualizando === d.id}
                                    >
                                      <Eye size={14} />
                                    </ActBtn>
                                  </>
                                )}
                                {d.status !== "ARQUIVADA" && (
                                  <ActBtn
                                    onClick={() => atualizarStatus(d.id, "ARQUIVADA")}
                                    title="Arquivar"
                                    loading={atualizando === d.id}
                                  >
                                    <Archive size={14} />
                                  </ActBtn>
                                )}
                                <ActBtn onClick={() => setDenunciaSelecionada(d)} title="Detalhes">
                                  <Eye size={14} />
                                </ActBtn>
                                <ActBtn
                                  onClick={() => setConfirmDelete(d.id)}
                                  title="Excluir"
                                  danger
                                  loading={excluindo === d.id}
                                >
                                  <Trash2 size={14} />
                                </ActBtn>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {denunciasFiltradas.length === 0 && (
                          <tr>
                            <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400">
                              Nenhuma denúncia encontrada com esse filtro.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════ GASTOS ════ */}
          {tab === "gastos" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Gastos Públicos</h2>
              <p className="text-sm text-gray-500 mb-6">Distribuição orçamentária por secretaria — 2026</p>

              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 bg-white border border-gray-100 rounded-xl p-6 mb-6 items-center">
                <PieChartSVG data={gastosData} />
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-3">Legenda</div>
                  <div className="flex flex-col gap-2.5">
                    {gastosData.map((s, i) => (
                      <div key={i} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: secretariasHex[s.nome] || "#94a3b8" }} />
                          <span className="text-sm text-gray-700">{s.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">R$ {s.valor}M</span>
                          <span className="text-[11px] text-gray-400">({((s.valor / totalEdit) * 100).toFixed(1)}%)</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-100 pt-2.5 mt-0.5 flex justify-between">
                      <span className="text-sm font-semibold text-gray-700">Total</span>
                      <span className="text-sm font-bold text-gray-900">R$ {totalEdit.toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="text-sm font-semibold text-gray-900">Editar Valores por Secretaria</div>
                  <div className="text-xs text-gray-400 mt-0.5">Clique no valor para editar</div>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={thClass}>Secretaria</th>
                      <th className={`${thClass} text-right`}>Valor (R$ milhões)</th>
                      <th className={`${thClass} text-right`}>% do Total</th>
                      <th className={`${thClass} text-center`}>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gastosData.map((s, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition">
                        <td className={tdClass}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: secretariasHex[s.nome] || "#94a3b8" }} />
                            <span className="font-medium">{s.nome}</span>
                          </div>
                        </td>
                        <td className={`${tdClass} text-right`}>
                          {editIdx === i ? (
                            <input
                              type="number"
                              value={editVal}
                              onChange={(e) => setEditVal(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit(i);
                                if (e.key === "Escape") setEditIdx(null);
                              }}
                              autoFocus
                              className="w-[100px] px-2 py-1 text-sm rounded-md border border-blue-500 text-right text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/30"
                            />
                          ) : (
                            <span
                              onClick={() => { setEditIdx(i); setEditVal(String(s.valor)); }}
                              className="cursor-pointer font-semibold text-gray-900 px-1.5 py-0.5 rounded border border-transparent hover:border-gray-200 transition"
                              title="Clique para editar"
                            >
                              R$ {s.valor}M
                            </span>
                          )}
                        </td>
                        <td className={`${tdClass} text-right text-gray-500 text-xs`}>
                          {((s.valor / totalEdit) * 100).toFixed(1)}%
                        </td>
                        <td className={`${tdClass} text-center`}>
                          {editIdx === i ? (
                            <div className="inline-flex gap-1.5">
                              <button onClick={() => saveEdit(i)} className="px-3 py-1 rounded-md bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition">
                                Salvar
                              </button>
                              <button onClick={() => setEditIdx(null)} className="px-3 py-1 rounded-md bg-gray-100 text-gray-500 text-xs hover:bg-gray-200 transition">
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <ActBtn onClick={() => { setEditIdx(i); setEditVal(String(s.valor)); }} title="Editar valor">
                              <Pencil size={14} />
                            </ActBtn>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Modal de detalhes ── */}
          {denunciaSelecionada && (
            <div className="fixed inset-0 bg-gray-900/55 flex items-center justify-center z-[999] p-5" role="dialog" aria-modal="true" aria-label="Detalhes da denúncia">
              <div className="w-full max-w-[520px] bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <div className="text-xl font-bold text-gray-900">Detalhes da Denúncia</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono">{denunciaSelecionada.id}</div>
                  </div>
                  <button
                    onClick={() => setDenunciaSelecionada(null)}
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Título</div>
                    <div className="text-sm text-gray-900 font-medium">{denunciaSelecionada.titulo}</div>
                  </div>

                  <div>
                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Descrição</div>
                    <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3">{denunciaSelecionada.descricao}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Categoria</div>
                      <div className="text-sm text-gray-800">{denunciaSelecionada.categoria}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Status</div>
                      <Badge status={denunciaSelecionada.status} map={statusDenunciaCor} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Local</div>
                      <div className="text-sm text-gray-800">{denunciaSelecionada.bairro} — {denunciaSelecionada.cidade}/{denunciaSelecionada.estado}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Endereço</div>
                      <div className="text-sm text-gray-800">{denunciaSelecionada.rua}, {denunciaSelecionada.numero}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Data</div>
                    <div className="text-sm text-gray-800">{new Date(denunciaSelecionada.data).toLocaleString("pt-BR")}</div>
                  </div>
                </div>

                {denunciaSelecionada.status !== "RESOLVIDO" && denunciaSelecionada.status !== "ARQUIVADA" && (
                  <div className="flex gap-2 mt-5 pt-5 border-t border-gray-100">
                    <button
                      onClick={() => { atualizarStatus(denunciaSelecionada.id, "RESOLVIDO"); setDenunciaSelecionada(null); }}
                      className="flex-1 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition"
                    >
                      Marcar como resolvida
                    </button>
                    <button
                      onClick={() => { atualizarStatus(denunciaSelecionada.id, "EM_ANALISE"); setDenunciaSelecionada(null); }}
                      className="flex-1 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition"
                    >
                      Em análise
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
