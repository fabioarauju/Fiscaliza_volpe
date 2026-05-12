"use client";

import { useState } from "react";

// ─── Icon sizes ───────────────────────────────────────────────
const sz14 = { width: 14, height: 14, flexShrink: 0 } as const;
const sz16 = { width: 16, height: 16, flexShrink: 0 } as const;
const sz18 = { width: 18, height: 18, flexShrink: 0 } as const;
const sz20 = { width: 20, height: 20, flexShrink: 0 } as const;

// ─── Icons ────────────────────────────────────────────────────
const IcoShield = ({ s = sz20 }: { s?: typeof sz20 }) => (
    <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
    </svg>
);
const IcoGrid = ({ s = sz18 }: { s?: typeof sz18 }) => (
    <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);
const IcoDoc = ({ s = sz18 }: { s?: typeof sz18 }) => (
    <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
const IcoFlag = ({ s = sz18 }: { s?: typeof sz18 }) => (
    <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
    </svg>
);
const IcoChart = ({ s = sz18 }: { s?: typeof sz18 }) => (
    <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);
const IcoEdit = () => (
    <svg style={sz14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    </svg>
);
const IcoEye = () => (
    <svg style={sz14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const IcoTrash = () => (
    <svg style={sz14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);
const IcoCheck = () => (
    <svg style={sz14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);
const IcoArchive = () => (
    <svg style={sz14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);
const IcoPlus = () => (
    <svg style={sz16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
const IcoBell = () => (
    <svg style={sz18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);
const IcoUser = () => (
    <svg style={sz18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// ─── Data ─────────────────────────────────────────────────────
const secretarias = [
    { nome: "Saúde", valor: 42.5, cor: "#3b82f6" },
    { nome: "Educação", valor: 31.2, cor: "#8b5cf6" },
    { nome: "Infraestrutura", valor: 18.7, cor: "#f97316" },
    { nome: "Segurança", valor: 14.3, cor: "#10b981" },
    { nome: "Cultura", valor: 6.8, cor: "#f59e0b" },
    { nome: "Meio Ambiente", valor: 5.1, cor: "#06b6d4" },
];

const projetos = [
    { num: "PL-001/2025", titulo: "Reforma do Calçadão Central", cat: "Infraestrutura", status: "Em votação", votos: 12 },
    { num: "PL-002/2025", titulo: "Programa Saúde nas Escolas", cat: "Saúde", status: "Aprovado", votos: 21 },
    { num: "PL-003/2025", titulo: "Incentivo à Cultura Local", cat: "Cultura", status: "Em análise", votos: 7 },
    { num: "PL-004/2025", titulo: "Ampliação do Parque Municipal", cat: "Meio Ambiente", status: "Rascunho", votos: 0 },
    { num: "PL-005/2025", titulo: "Câmeras de Segurança em Praças", cat: "Segurança", status: "Aprovado", votos: 19 },
    { num: "PL-006/2025", titulo: "Bolsa Estudante Universitário", cat: "Educação", status: "Rejeitado", votos: 4 },
];

const denunciasIniciais = [
    { id: "DN-081", desc: "Buraco na Rua das Flores nº 42", local: "Centro", status: "Pendente", data: "09/05/2026" },
    { id: "DN-080", desc: "Iluminação apagada na Av. Brasil", local: "Jardim Norte", status: "Em análise", data: "08/05/2026" },
    { id: "DN-079", desc: "Esgoto a céu aberto no Bairro Novo", local: "Bairro Novo", status: "Aprovada", data: "07/05/2026" },
    { id: "DN-078", desc: "Pichação em patrimônio histórico", local: "Centro Histórico", status: "Arquivada", data: "05/05/2026" },
    { id: "DN-077", desc: "Lixo acumulado na Praça da Paz", local: "Vila Alta", status: "Pendente", data: "04/05/2026" },
    { id: "DN-076", desc: "Semáforo quebrado na Av. Central", local: "Centro", status: "Em análise", data: "03/05/2026" },
];

const atividades = [
    { acao: "PL-002/2025 aprovado em votação", tempo: "há 2 horas", tipo: "success" },
    { acao: "Nova denúncia DN-081 registrada", tempo: "há 3 horas", tipo: "warn" },
    { acao: "Gastos de Saúde atualizados", tempo: "há 5 horas", tipo: "info" },
    { acao: "DN-078 arquivada pelo admin", tempo: "há 1 dia", tipo: "neutral" },
    { acao: "PL-006/2025 rejeitado em plenário", tempo: "há 2 dias", tipo: "danger" },
];

// ─── Helpers ──────────────────────────────────────────────────
const statusProjetoCor: Record<string, { bg: string; color: string }> = {
    "Aprovado": { bg: "#dcfce7", color: "#166534" },
    "Em votação": { bg: "#dbeafe", color: "#1e40af" },
    "Em análise": { bg: "#fef9c3", color: "#854d0e" },
    "Rascunho": { bg: "#f1f5f9", color: "#475569" },
    "Rejeitado": { bg: "#fee2e2", color: "#991b1b" },
};
const statusDenunciaCor: Record<string, { bg: string; color: string }> = {
    "Pendente": { bg: "#fee2e2", color: "#991b1b" },
    "Em análise": { bg: "#fef9c3", color: "#854d0e" },
    "Aprovada": { bg: "#dcfce7", color: "#166534" },
    "Arquivada": { bg: "#f1f5f9", color: "#475569" },
};
const atividadeDot: Record<string, string> = {
    success: "#10b981", warn: "#f59e0b", info: "#3b82f6", neutral: "#94a3b8", danger: "#ef4444",
};

const totalGastos = secretarias.reduce((a, s) => a + s.valor, 0);

// ─── Pie chart SVG ────────────────────────────────────────────
function PieChart() {
    const cx = 100; const cy = 100; const r = 80;
    let angle = -Math.PI / 2;
    const slices = secretarias.map(s => {
        const slice = (s.valor / totalGastos) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(angle);
        const y1 = cy + r * Math.sin(angle);
        angle += slice;
        const x2 = cx + r * Math.cos(angle);
        const y2 = cy + r * Math.sin(angle);
        const large = slice > Math.PI ? 1 : 0;
        return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, cor: s.cor };
    });
    return (
        <svg viewBox="0 0 200 200" style={{ width: 200, height: 200 }}>
            {slices.map((s, i) => <path key={i} d={s.d} fill={s.cor} stroke="#fff" strokeWidth={2} />)}
        </svg>
    );
}

// ─── Bar chart ────────────────────────────────────────────────
function BarChart() {
    const max = Math.max(...secretarias.map(s => s.valor));
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140, padding: "0 4px" }}>
            {secretarias.map(s => (
                <div key={s.nome} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>R${s.valor}M</span>
                    <div style={{
                        width: "100%", borderRadius: "4px 4px 0 0",
                        height: `${(s.valor / max) * 100}px`,
                        background: s.cor, minHeight: 4,
                    }} />
                    <span style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", lineHeight: 1.2 }}>{s.nome}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────
type Tab = "painel" | "projetos" | "denuncias" | "gastos";

export default function AdminDashboard() {
    const [tab, setTab] = useState<Tab>("painel");
    const [denunciasData, setDenunciasData] =
        useState(denunciasIniciais);
    const [gastosData, setGastosData] = useState(secretarias.map(s => ({ ...s })));
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [editVal, setEditVal] = useState("");
    const [filtroDenuncia, setFiltroDenuncia] =
        useState("Todas");

    const [denunciaSelecionada, setDenunciaSelecionada] =
        useState<any>(null);

    const pendentes = denunciasData.filter(
        d => d.status === "Pendente"
    ).length;

    function saveEdit(i: number) {
        const v = parseFloat(editVal);
        if (!isNaN(v) && v >= 0) {
            setGastosData(prev => prev.map((s, idx) => idx === i ? { ...s, valor: v } : s));
        }
        setEditIdx(null);
    }

    const denunciasFiltradas =
        filtroDenuncia === "Todas"
            ? denunciasData
            : denunciasData.filter(
                d => d.status === filtroDenuncia
            );
    const totalEdit = gastosData.reduce((a, s) => a + s.valor, 0);
    function atualizarStatusDenuncia(
        id: string,
        novoStatus: string
    ) {
        const hoje = new Date().toLocaleDateString("pt-BR");

        setDenunciasData(prev =>
            prev.map(d =>
                d.id === id
                    ? {
                        ...d,
                        status: novoStatus,
                        data: hoje,
                    }
                    : d
            )
        );
    }

    // ── Sidebar nav item
    const NavItem = ({ id, label, icon }: { id: Tab; label: string; icon: React.ReactNode }) => {
        const active = tab === id;
        return (
            <button onClick={() => setTab(id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px", borderRadius: 8, width: "100%",
                border: "none", cursor: "pointer", textAlign: "left",
                background: active ? "#eff6ff" : "transparent",
                color: active ? "#2563eb" : "#374151",
                fontWeight: active ? 600 : 400, fontSize: 14,
                position: "relative",
            }}>
                {icon}
                {label}
                {id === "denuncias" && pendentes > 0 && (
                    <span style={{
                        marginLeft: "auto",
                        background: "#ef4444", color: "#fff",
                        fontSize: 11, fontWeight: 700,
                        borderRadius: 10, padding: "1px 7px", minWidth: 20, textAlign: "center",
                    }}>{pendentes}</span>
                )}
            </button>
        );
    };

    // ── Metric card
    const Metric = ({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) => (
        <div style={{
            background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12,
            padding: "20px 24px", borderTop: `3px solid ${color}`,
        }}>
            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>{sub}</div>
        </div>
    );

    // ── Status badge
    const Badge = ({ status, map }: { status: string; map: Record<string, { bg: string; color: string }> }) => {
        const c = map[status] ?? { bg: "#f1f5f9", color: "#475569" };
        return (
            <span style={{ background: c.bg, color: c.color, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
                {status}
            </span>
        );
    };

    // ── Action button
    const ActBtn = ({ onClick, title, children, danger }: { onClick: () => void; title: string; children: React.ReactNode; danger?: boolean }) => (
        <button onClick={onClick} title={title} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, borderRadius: 6, border: `1px solid ${danger ? "#fca5a5" : "#e2e8f0"}`,
            background: danger ? "#fff1f2" : "#f8fafc",
            color: danger ? "#dc2626" : "#475569", cursor: "pointer",
        }}>{children}</button>
    );

    // ── Table styles
    const th: React.CSSProperties = { padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textAlign: "left", whiteSpace: "nowrap", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" };
    const td: React.CSSProperties = { padding: "12px 14px", fontSize: 13, color: "#1e293b", borderBottom: "1px solid #f8fafc", verticalAlign: "middle" };

    return (
        <>
            <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .nav-item:hover { background: #f8fafc !important; }
        .act-btn:hover { filter: brightness(0.95); }
        .row:hover td { background: #fafafa !important; }
        input:focus { outline: none; box-shadow: 0 0 0 2px rgba(59,130,246,0.3); border-color: #3b82f6 !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
      `}</style>

            <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif" }}>

                {/* ══ BODY ════════════════════════════════════════════ */}
                <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

                    {/* ── Sidebar ── */}
                    <aside style={{
                        width: 220, background: "#fff", borderRight: "1px solid #f1f5f9",
                        display: "flex", flexDirection: "column", padding: "20px 12px", flexShrink: 0,
                    }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "0 16px", marginBottom: 8 }}>Navegação</div>
                        <NavItem id="painel" label="Visão Geral" icon={<IcoGrid s={sz18} />} />
                        <NavItem id="projetos" label="Projetos de Lei" icon={<IcoDoc s={sz18} />} />
                        <NavItem id="denuncias" label="Denúncias" icon={<IcoFlag s={sz18} />} />
                        <NavItem id="gastos" label="Gastos Públicos" icon={<IcoChart s={sz18} />} />
                        <div style={{ flex: 1 }} />
                        <div style={{
                            borderTop: "1px solid #f1f5f9",
                            paddingTop: 16,
                            margin: "0 4px",
                        }}>
                            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16, margin: "0 4px" }}>
                                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                                    Sessão ativa
                                </div>

                                <div style={{
                                    fontSize: 13,
                                    color: "#374151",
                                    fontWeight: 500,
                                    marginTop: 2
                                }}>
                                    admin@camara.gov.br
                                </div>

                                <button
                                    onClick={async () => {
                                        await fetch("/api/admin/logout", {
                                            method: "POST",
                                        });

                                        window.location.href = "/admin";
                                    }}
                                    style={{
                                        marginTop: 12,
                                        width: "100%",
                                        padding: "10px 12px",
                                        borderRadius: 8,
                                        border: "1px solid #fecaca",
                                        background: "#fef2f2",
                                        color: "#dc2626",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Sair do painel
                                </button>
                            </div>

                            <button
                                onClick={async () => {
                                    await fetch("/api/admin/logout", {
                                        method: "POST",
                                    });

                                    window.location.href = "/admin";
                                }}
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    borderRadius: 8,
                                    border: "1px solid #fee2e2",
                                    background: "#fff1f2",
                                    color: "#dc2626",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Sair do painel
                            </button>
                        </div>
                    </aside>

                    {/* ── Content ── */}
                    <main style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>

                        {/* ════ PAINEL ════ */}
                        {tab === "painel" && (
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>Visão Geral</h2>
                                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px" }}>Resumo das atividades do painel.</p>

                                {/* Métricas */}
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                                    <Metric label="Denúncias" value="81" sub={`${pendentes} pendentes`} color="#ef4444" />
                                    <Metric label="Projetos de Lei" value="6" sub="2 aprovados" color="#3b82f6" />
                                    <Metric label="Visitantes (mês)" value="4.320" sub="+12% vs. anterior" color="#10b981" />
                                    <Metric label="Pendências" value={String(pendentes)} sub="requerem ação" color="#f59e0b" />
                                </div>

                                {/* Gráfico + Feed */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
                                    {/* Bar chart */}
                                    <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12, padding: "20px 24px" }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>Gastos por Secretaria (R$ milhões)</div>
                                        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>Orçamento 2026</div>
                                        <BarChart />
                                    </div>

                                    {/* Feed */}
                                    <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12, padding: "20px 24px" }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 16 }}>Atividade Recente</div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                            {atividades.map((a, i) => (
                                                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                                    <div style={{ width: 8, height: 8, borderRadius: 4, background: atividadeDot[a.tipo], marginTop: 5, flexShrink: 0 }} />
                                                    <div>
                                                        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.4 }}>{a.acao}</div>
                                                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{a.tempo}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ════ PROJETOS ════ */}
                        {tab === "projetos" && (
                            <div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                                    <div>
                                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>Projetos de Lei</h2>
                                        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{projetos.length} projetos cadastrados</p>
                                    </div>
                                    <button style={{
                                        display: "flex", alignItems: "center", gap: 8,
                                        padding: "9px 18px", borderRadius: 8,
                                        background: "#3b82f6", color: "#fff",
                                        border: "none", cursor: "pointer",
                                        fontSize: 13, fontWeight: 600,
                                    }}>
                                        <IcoPlus /> Novo Projeto
                                    </button>
                                </div>

                                <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12, overflow: "hidden" }}>
                                    <div style={{ overflowX: "auto" }}>
                                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    <th style={th}>Número</th>
                                                    <th style={th}>Título</th>
                                                    <th style={th}>Categoria</th>
                                                    <th style={th}>Status</th>
                                                    <th style={{ ...th, textAlign: "center" }}>Votos</th>
                                                    <th style={{ ...th, textAlign: "center" }}>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projetos.map((p, i) => (
                                                    <tr key={i} className="row">
                                                        <td style={td}><span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{p.num}</span></td>
                                                        <td style={{ ...td, maxWidth: 240 }}><span style={{ fontWeight: 500 }}>{p.titulo}</span></td>
                                                        <td style={td}><span style={{ fontSize: 12, color: "#475569" }}>{p.cat}</span></td>
                                                        <td style={td}><Badge status={p.status} map={statusProjetoCor} /></td>
                                                        <td style={{ ...td, textAlign: "center" }}>
                                                            <span style={{ fontWeight: 700, fontSize: 14, color: p.votos > 0 ? "#1e293b" : "#94a3b8" }}>{p.votos}</span>
                                                        </td>
                                                        <td style={{ ...td, textAlign: "center" }}>
                                                            <div style={{ display: "inline-flex", gap: 6 }}>
                                                                <ActBtn onClick={() => { }} title="Editar"><IcoEdit /></ActBtn>
                                                                <ActBtn
                                                                    onClick={() => setDenunciaSelecionada(p)}
                                                                    title="Visualizar"
                                                                >
                                                                    <IcoEye />
                                                                </ActBtn>
                                                                <ActBtn onClick={() => { }} title="Excluir" danger><IcoTrash /></ActBtn>
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
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                                    <div>
                                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>Denúncias</h2>
                                        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{pendentes} denúncia{pendentes !== 1 ? "s" : ""} pendente{pendentes !== 1 ? "s" : ""} aguardando ação</p>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {["Todas", "Pendente", "Em análise", "Aprovada", "Arquivada"].map(f => (
                                            <button
                                                key={f}
                                                onClick={() => setFiltroDenuncia(f)}
                                                style={{
                                                    padding: "6px 14px",
                                                    borderRadius: 20,
                                                    border: "1px solid #e2e8f0",
                                                    background:
                                                        filtroDenuncia === f
                                                            ? "#3b82f6"
                                                            : "#fff",

                                                    color:
                                                        filtroDenuncia === f
                                                            ? "#fff"
                                                            : "#475569",

                                                    fontSize: 12,
                                                    fontWeight: 500,
                                                    cursor: "pointer",
                                                    transition: "0.2s",
                                                }}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12, overflow: "hidden" }}>
                                    <div style={{ overflowX: "auto" }}>
                                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    <th style={th}>ID</th>
                                                    <th style={th}>Descrição</th>
                                                    <th style={th}>Local</th>
                                                    <th style={th}>Status</th>
                                                    <th style={th}>Data</th>
                                                    <th style={{ ...th, textAlign: "center" }}>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {denunciasFiltradas.map((d, i) => (
                                                    <tr key={i} className="row">
                                                        <td style={td}><span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.id}</span></td>
                                                        <td style={{ ...td, maxWidth: 260 }}>{d.desc}</td>
                                                        <td style={td}><span style={{ fontSize: 12, color: "#64748b" }}>{d.local}</span></td>
                                                        <td style={td}><Badge status={d.status} map={statusDenunciaCor} /></td>
                                                        <td style={td}><span style={{ fontSize: 12, color: "#94a3b8" }}>{d.data}</span></td>
                                                        <td style={{ ...td, textAlign: "center" }}>
                                                            <div style={{ display: "inline-flex", gap: 6 }}>
                                                                {d.status !== "Aprovada" && d.status !== "Arquivada" && (
                                                                    <ActBtn
                                                                        onClick={() => atualizarStatusDenuncia(d.id, "Aprovada")}
                                                                        title="Aprovar"
                                                                    >
                                                                        <IcoCheck />
                                                                    </ActBtn>
                                                                )}
                                                                {d.status !== "Arquivada" && (
                                                                    <ActBtn
                                                                        onClick={() => atualizarStatusDenuncia(d.id, "Arquivada")}
                                                                        title="Arquivar"
                                                                        danger
                                                                    >
                                                                        <IcoArchive />
                                                                    </ActBtn>
                                                                )}
                                                                <ActBtn onClick={() => { }} title="Visualizar"><IcoEye /></ActBtn>
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

                        {/* ════ GASTOS ════ */}
                        {tab === "gastos" && (
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>Gastos Públicos</h2>
                                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px" }}>Distribuição orçamentária por secretaria — 2025</p>

                                {/* Pie + Legenda */}
                                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12, padding: "24px 28px", marginBottom: 24, alignItems: "center" }}>
                                    <PieChart />
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>Legenda</div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            {gastosData.map((s, i) => (
                                                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                        <div style={{ width: 12, height: 12, borderRadius: 3, background: s.cor, flexShrink: 0 }} />
                                                        <span style={{ fontSize: 13, color: "#374151" }}>{s.nome}</span>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>R$ {s.valor}M</span>
                                                        <span style={{ fontSize: 11, color: "#94a3b8" }}>({((s.valor / totalEdit) * 100).toFixed(1)}%)</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 10, marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Total</span>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>R$ {totalEdit.toFixed(1)}M</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabela de edição */}
                                <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12, overflow: "hidden" }}>
                                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Editar Valores por Secretaria</div>
                                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Clique no valor para editar</div>
                                    </div>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                <th style={th}>Secretaria</th>
                                                <th style={{ ...th, textAlign: "right" }}>Valor (R$ milhões)</th>
                                                <th style={{ ...th, textAlign: "right" }}>% do Total</th>
                                                <th style={{ ...th, textAlign: "center" }}>Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gastosData.map((s, i) => (
                                                <tr key={i} className="row">
                                                    <td style={td}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                            <div style={{ width: 10, height: 10, borderRadius: 2, background: s.cor, flexShrink: 0 }} />
                                                            <span style={{ fontWeight: 500 }}>{s.nome}</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ ...td, textAlign: "right" }}>
                                                        {editIdx === i ? (
                                                            <input
                                                                type="number"
                                                                value={editVal}
                                                                onChange={e => setEditVal(e.target.value)}
                                                                onKeyDown={e => { if (e.key === "Enter") saveEdit(i); if (e.key === "Escape") setEditIdx(null); }}
                                                                autoFocus
                                                                style={{
                                                                    width: 100, padding: "4px 8px", fontSize: 13,
                                                                    borderRadius: 6, border: "1px solid #3b82f6",
                                                                    textAlign: "right", color: "#1e293b",
                                                                }}
                                                            />
                                                        ) : (
                                                            <span
                                                                onClick={() => { setEditIdx(i); setEditVal(String(s.valor)); }}
                                                                style={{ cursor: "pointer", fontWeight: 600, color: "#1e293b", padding: "2px 6px", borderRadius: 4, border: "1px solid transparent" }}
                                                                title="Clique para editar"
                                                            >
                                                                R$ {s.valor}M
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td style={{ ...td, textAlign: "right", color: "#64748b", fontSize: 12 }}>
                                                        {((s.valor / totalEdit) * 100).toFixed(1)}%
                                                    </td>
                                                    <td style={{ ...td, textAlign: "center" }}>
                                                        {editIdx === i ? (
                                                            <div style={{ display: "inline-flex", gap: 6 }}>
                                                                <button onClick={() => saveEdit(i)} style={{ padding: "4px 12px", borderRadius: 6, background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Salvar</button>
                                                                <button onClick={() => setEditIdx(null)} style={{ padding: "4px 12px", borderRadius: 6, background: "#f1f5f9", color: "#475569", border: "none", cursor: "pointer", fontSize: 12 }}>Cancelar</button>
                                                            </div>
                                                        ) : (
                                                            <ActBtn onClick={() => { setEditIdx(i); setEditVal(String(s.valor)); }} title="Editar valor"><IcoEdit /></ActBtn>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
{denunciaSelecionada && (
    <div
        style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: 20,
        }}
    >
        <div
            style={{
                width: "100%",
                maxWidth: 520,
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#1e293b",
                        }}
                    >
                        Detalhes da denúncia
                    </div>

                    <div
                        style={{
                            fontSize: 12,
                            color: "#94a3b8",
                            marginTop: 4,
                        }}
                    >
                        {denunciaSelecionada.id}
                    </div>
                </div>

                <button
                    onClick={() => setDenunciaSelecionada(null)}
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        border: "none",
                        background: "#f1f5f9",
                        cursor: "pointer",
                        fontSize: 18,
                        color: "#475569",
                    }}
                >
                    ×
                </button>
            </div>

            {/* Conteúdo */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                }}
            >
                <div>
                    <div style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        marginBottom: 4,
                        textTransform: "uppercase",
                        fontWeight: 600,
                    }}>
                        Descrição
                    </div>

                    <div style={{
                        fontSize: 14,
                        color: "#334155",
                        lineHeight: 1.5,
                    }}>
                        {denunciaSelecionada.desc}
                    </div>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                }}>
                    <div>
                        <div style={{
                            fontSize: 11,
                            color: "#94a3b8",
                            marginBottom: 4,
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}>
                            Local
                        </div>

                        <div style={{
                            fontSize: 14,
                            color: "#334155",
                        }}>
                            {denunciaSelecionada.local}
                        </div>
                    </div>

                    <div>
                        <div style={{
                            fontSize: 11,
                            color: "#94a3b8",
                            marginBottom: 4,
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}>
                            Data
                        </div>

                        <div style={{
                            fontSize: 14,
                            color: "#334155",
                        }}>
                            {denunciaSelecionada.data}
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        marginBottom: 4,
                        textTransform: "uppercase",
                        fontWeight: 600,
                    }}>
                        Status
                    </div>

                    <Badge
                        status={denunciaSelecionada.status}
                        map={statusDenunciaCor}
                    />
                </div>
            </div>
        </div>
    </div>
)}
                    </main>
                </div>
            </div>
        </>
    );
}