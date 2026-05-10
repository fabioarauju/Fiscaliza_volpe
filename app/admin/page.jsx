"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


/* ═══════════════════════════════════════════════
   CONSTANTES
═══════════════════════════════════════════════ */
const CODIGO_CONVITE = "CONV-VOLPE-2024";

const GASTOS_DEFAULT = [
    { secretaria: "Saúde", valor: 831961843.72, cor: "#ef4444" },
    { secretaria: "Educação", valor: 586755791.72, cor: "#f97316" },
    { secretaria: "Urbanismo (Obras)", valor: 265595984.84, cor: "#eab308" },
    { secretaria: "Administração", valor: 218557400.00, cor: "#a855f7" },
    { secretaria: "Previdência Social", valor: 193681200.00, cor: "#3b82f6" },
    { secretaria: "Assistência Social", valor: 48996989.14, cor: "#10b981" },
    { secretaria: "Outros", valor: 217860790.58, cor: "#6b7280" },
];

const DENUNCIAS_EXEMPLO = [
    { id: 1001, descricao: "Obra parada há 6 meses na Rua das Palmeiras", categoria: "Obras", status: "pendente", criadoEm: new Date(Date.now() - 3600000).toISOString() },
    { id: 1002, descricao: "Superfaturamento em licitação de merenda escolar", categoria: "Educação", status: "pendente", criadoEm: new Date(Date.now() - 7200000).toISOString() },
    { id: 1003, descricao: "UBS sem médicos há 2 semanas no Jardim Europa", categoria: "Saúde", status: "em análise", criadoEm: new Date(Date.now() - 86400000).toISOString() },
    { id: 1004, descricao: "Iluminação pública ausente na Av. Central", categoria: "Obras", status: "aprovada", criadoEm: new Date(Date.now() - 172800000).toISOString() },
    { id: 1005, descricao: "Buraco na calçada próximo à escola municipal", categoria: "Obras", status: "arquivada", criadoEm: new Date(Date.now() - 432000000).toISOString() },
];

const STATUS_PROJ = ["Proposta", "Em votação", "Aprovado", "Arquivado"];
const CATEGORIAS = ["Saúde", "Educação", "Obras", "Administração", "Assistência Social", "Outro"];

const BADGE_STATUS_PROJ = {
    "Proposta": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    "Em votação": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    "Aprovado": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    "Arquivado": "bg-zinc-700 text-zinc-400 border border-zinc-600",
};
const BADGE_CAT = {
    "Saúde": "bg-red-500/10 text-red-400 border border-red-500/20",
    "Educação": "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    "Obras": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    "Administração": "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    "Assistência Social": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    "Outro": "bg-zinc-700 text-zinc-400 border border-zinc-600",
};
const BADGE_STATUS_DEN = {
    "pendente": "bg-red-500/10 text-red-400 border border-red-500/20",
    "em análise": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    "aprovada": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    "arquivada": "bg-zinc-700 text-zinc-400 border border-zinc-600",
};
const LABEL_STATUS_DEN = { pendente: "Pendente", "em análise": "Em análise", aprovada: "Aprovada", arquivada: "Arquivada" };

/* ═══════════════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════════════ */
function fmt(v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }); }
function fmtS(v) { if (v >= 1e9) return `R$ ${(v / 1e9).toFixed(2)}B`; if (v >= 1e6) return `R$ ${(v / 1e6).toFixed(0)}M`; return fmt(v); }
function fmtD(iso) { return iso ? new Date(iso).toLocaleDateString("pt-BR") : "—"; }
function fmtDH(iso) { return iso ? new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—"; }
function iniciais(n) { return n ? n.split(" ").map(x => x[0]).slice(0, 2).join("").toUpperCase() : "AD"; }

/* ═══════════════════════════════════════════════
   COMPONENTES BASE
═══════════════════════════════════════════════ */
function Badge({ text, cls }) {
    return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cls}`}>{text}</span>;
}

function DarkInput({ className = "", ...props }) {
    return <input className={`w-full rounded-2xl border border-white/10 bg-zinc-800 px-5 py-3.5 text-white placeholder-zinc-500 outline-none transition focus:border-red-500 text-sm ${className}`} {...props} />;
}

function DarkSelect({ children, className = "", ...props }) {
    return (
        <select className={`w-full rounded-2xl border border-white/10 bg-zinc-800 px-5 py-3.5 text-white outline-none transition focus:border-red-500 text-sm ${className}`} {...props}>
            {children}
        </select>
    );
}

function DarkTextarea({ className = "", ...props }) {
    return <textarea className={`w-full rounded-2xl border border-white/10 bg-zinc-800 px-5 py-3.5 text-white placeholder-zinc-500 outline-none transition focus:border-red-500 text-sm resize-none ${className}`} {...props} />;
}

function Field({ label, children }) {
    return <div><label className="mb-2 block text-sm text-zinc-400">{label}</label>{children}</div>;
}

function BtnRed({ children, className = "", ...props }) {
    return <button className={`px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-2xl transition disabled:opacity-50 ${className}`} {...props}>{children}</button>;
}

function BtnGhost({ children, className = "", ...props }) {
    return <button className={`px-5 py-2.5 border border-white/10 hover:bg-white/5 text-zinc-300 text-sm font-medium rounded-2xl transition ${className}`} {...props}>{children}</button>;
}

function IconBtn({ onClick, title, children, danger }) {
    return (
        <button onClick={onClick} title={title}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center text-sm transition ${danger ? "border-zinc-700 text-zinc-500 hover:border-red-500/50 hover:text-red-400" : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-200"}`}>
            {children}
        </button>
    );
}

/* ═══════════════════════════════════════════════
   SLIDE PANEL
═══════════════════════════════════════════════ */
function SlidePanel({ open, onClose, title, children, footer }) {
    return (
        <>
            <div onClick={onClose}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`} />
            <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-zinc-900 border-l border-white/10 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
                    <h2 className="text-lg font-black text-white">{title}</h2>
                    <button onClick={onClose} className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition text-xl leading-none">×</button>
                </div>
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">{children}</div>
                {footer && <div className="px-8 py-5 border-t border-gray-200 justify-end gap-3">{footer}</div>}
            </div>
        </>
    );
}

/* ═══════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════ */
const NAV_ITEMS = [
    { slug: "dashboard", label: "Visão geral", icon: "📊" },
    { slug: "projetos", label: "Projetos de lei", icon: "📄" },
    { slug: "denuncias", label: "Denúncias", icon: "⚠️", badge: true },
    { slug: "gastos", label: "Gastos públicos", icon: "🍕" },
    { slug: "gestao", label: "Administradores", icon: "👥" },
];

function Sidebar({ currentSlug, onNavigate, admin, pendencias, onLogout }) {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-base font-black">F</div>
                <div>
                    <p className="text-sm font-black text-gray-900 leading-tight">Fiscaliza Volpe</p>
                    <span className="text-[10px] bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 border border-blue-200">admin</span>
                </div>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV_ITEMS.map(item => {
                    const ativo = currentSlug === item.slug;
                    return (
                        <button key={item.slug} onClick={() => onNavigate(item.slug)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition text-left ${ativo ? "bg-blue-100 text-blue-700 border border-blue-200" : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"}`}>
                            <span className="text-base">{item.icon}</span>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && pendencias > 0 && (
                                <span className="text-[10px] bg-red-600 text-white rounded-full px-1.5 py-0.5 font-bold">{pendencias}</span>
                            )}
                        </button>
                    );
                })}
            </nav>
            <div className="px-4 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex-shrink-0">{iniciais(admin?.nome)}</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{admin?.nome}</p>
                        <p className="text-[10px] text-zinc-500">{admin?.role || "admin"}</p>
                    </div>
                    <button onClick={onLogout} title="Sair" className="text-zinc-600 hover:text-red-400 transition text-base">🚪</button>
                </div>
            </div>
        </aside>
    );
}

/* ═══════════════════════════════════════════════
   TELA — LOGIN
═══════════════════════════════════════════════ */
function TelaLogin({ onGoRegister }) {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", senha: "" });
    const [erro, setErro] = useState("");
    const [load, setLoad] = useState(false);

    async function submit(e) {
        e.preventDefault(); setErro(""); setLoad(true);
        await new Promise(r => setTimeout(r, 700));
        const admins = JSON.parse(localStorage.getItem("admins") || "[]");
        const admin = admins.find(a => a.email === form.email && a.senha === form.senha);
        if (admin) { localStorage.setItem("adminLogado", JSON.stringify(admin)); router.push("/admin/dashboard"); }
        else { setErro("E-mail ou senha incorretos."); setLoad(false); }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_40%)]" />
            <main className="relative flex min-h-screen items-center justify-center px-6">
                <div className="hidden lg:block max-w-xl mr-20">
                    <span className="mb-5 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm text-red-400">Sistema Administrativo</span>
                    <h1 className="mb-6 text-6xl font-black leading-tight">Painel inteligente de gestão pública</h1>
                    <p className="text-xl leading-relaxed text-zinc-400">Gerencie denúncias, projetos de lei, gastos públicos e métricas do portal em um único painel moderno.</p>
                </div>
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/80 p-10 shadow-2xl backdrop-blur-xl">
                    <div className="mb-10">
                        <span className="mb-4 inline-flex rounded-full bg-red-500/10 px-4 py-1 text-sm text-red-400">Área Administrativa</span>
                        <h2 className="mt-4 text-4xl font-black">Login Admin</h2>
                        <p className="mt-3 text-zinc-400">Entre para acessar o painel do Fiscaliza Volpe.</p>
                    </div>
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">Email institucional</label>
                            <DarkInput type="email" placeholder="admin@volpe.sp.gov.br" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">Senha</label>
                            <DarkInput type="password" placeholder="••••••••" required value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} />
                        </div>
                        {erro && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">{erro}</p>}
                        <button type="submit" disabled={load} className="w-full rounded-2xl bg-red-600 py-4 text-lg font-bold transition hover:bg-red-700 disabled:opacity-50">
                            {load ? "Verificando..." : "Entrar no Painel"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-zinc-500 mt-6">
                        Não tem acesso?{" "}
                        <button onClick={onGoRegister} className="text-red-400 hover:underline font-medium">Solicitar cadastro</button>
                    </p>
                </div>
            </main>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   TELA — CADASTRO
═══════════════════════════════════════════════ */
function TelaCadastro({ onGoLogin }) {
    const [form, setForm] = useState({ nome: "", sobrenome: "", email: "", codigo: "", senha: "", confirmar: "" });
    const [erro, setErro] = useState("");
    const [load, setLoad] = useState(false);
    const [ok, setOk] = useState(false);

    function ch(f) { return e => { const v = f === "codigo" ? e.target.value.toUpperCase() : e.target.value; setForm({ ...form, [f]: v }); setErro(""); }; }

    async function submit(e) {
        e.preventDefault(); setErro("");
        if (form.codigo !== CODIGO_CONVITE) return setErro("Código de convite inválido.");
        if (form.senha.length < 8) return setErro("Senha deve ter no mínimo 8 caracteres.");
        if (form.senha !== form.confirmar) return setErro("As senhas não coincidem.");
        setLoad(true);
        await new Promise(r => setTimeout(r, 700));
        const admins = JSON.parse(localStorage.getItem("admins") || "[]");
        if (admins.find(a => a.email === form.email)) { setErro("E-mail já cadastrado."); setLoad(false); return; }
        admins.push({ id: Date.now(), nome: `${form.nome} ${form.sobrenome}`.trim(), email: form.email, senha: form.senha, role: "admin", criadoEm: new Date().toISOString() });
        localStorage.setItem("admins", JSON.stringify(admins));
        setLoad(false); setOk(true);
    }

    if (ok) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_40%)]" />
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/80 p-10 shadow-2xl text-center backdrop-blur-xl">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">✅</div>
                <h2 className="text-3xl font-black mb-3">Cadastro realizado!</h2>
                <p className="text-zinc-400 mb-8">Sua conta foi criada. Você já pode acessar o painel.</p>
                <button onClick={onGoLogin} className="w-full rounded-2xl bg-red-600 py-4 text-lg font-bold hover:bg-red-700 transition">Ir para o login</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_40%)]" />
            <main className="relative flex min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/80 p-10 shadow-2xl backdrop-blur-xl">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-2.5 mb-5 text-sm text-red-400">
                            🔒 Código de convite obrigatório para prosseguir.
                        </div>
                        <h2 className="text-4xl font-black">Criar conta</h2>
                        <p className="mt-2 text-zinc-400">Preencha os dados abaixo para solicitar acesso.</p>
                    </div>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Nome"><DarkInput placeholder="Maria" required value={form.nome} onChange={ch("nome")} /></Field>
                            <Field label="Sobrenome"><DarkInput placeholder="Santos" required value={form.sobrenome} onChange={ch("sobrenome")} /></Field>
                        </div>
                        <Field label="E-mail institucional"><DarkInput type="email" placeholder="nome@sp.gov.br" required value={form.email} onChange={ch("email")} /></Field>
                        <Field label="Código de convite">
                            <DarkInput placeholder="CONV-XXXX-XXXX" required value={form.codigo} onChange={ch("codigo")} className="tracking-widest uppercase" />
                            <p className="text-xs text-zinc-600 mt-1.5">Use <span className="font-mono text-zinc-500">CONV-VOLPE-2024</span> para testar.</p>
                        </Field>
                        <Field label="Senha"><DarkInput type="password" placeholder="Mínimo 8 caracteres" required value={form.senha} onChange={ch("senha")} /></Field>
                        <Field label="Confirmar senha"><DarkInput type="password" placeholder="Repita a senha" required value={form.confirmar} onChange={ch("confirmar")} /></Field>
                        {erro && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">{erro}</p>}
                        <button type="submit" disabled={load} className="w-full rounded-2xl bg-red-600 py-4 text-lg font-bold transition hover:bg-red-700 disabled:opacity-50">
                            {load ? "Criando conta..." : "Solicitar acesso"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-zinc-500 mt-5">
                        Já tem conta?{" "}
                        <button onClick={onGoLogin} className="text-red-400 hover:underline font-medium">Fazer login</button>
                    </p>
                </div>
            </main>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   TELA — DASHBOARD
═══════════════════════════════════════════════ */
function TelaDashboard() {
    const [stats, setStats] = useState({ projetos: 0, denuncias: 0, pendencias: 0 });
    const [gastos, setGastos] = useState(GASTOS_DEFAULT);
    const [ativs, setAtivs] = useState([]);

    useEffect(() => {
        const proj = JSON.parse(localStorage.getItem("projetos") || "[]");
        const dens = JSON.parse(localStorage.getItem("denuncias") || "[]");
        const gls = localStorage.getItem("gastos");
        if (gls) setGastos(JSON.parse(gls));
        setStats({ projetos: proj.length, denuncias: dens.length, pendencias: dens.filter(d => d.status === "pendente").length });
        const atv = [
            ...dens.map(d => ({ texto: `Denúncia: ${d.descricao?.slice(0, 45) || ""}...`, tempo: d.criadoEm, cor: "#ef4444" })),
            ...proj.map(p => ({ texto: `Projeto "${p.titulo?.slice(0, 35) || ""}" — ${p.status}`, tempo: p.criadoEm, cor: "#3b82f6" })),
        ].sort((a, b) => new Date(b.tempo) - new Date(a.tempo)).slice(0, 5);
        setAtivs(atv);
    }, [router]);

    const total = gastos.reduce((s, g) => s + g.valor, 0);
    const maxGasto = Math.max(...gastos.map(g => g.valor));

    const metrics = [
        { label: "Denúncias", value: stats.denuncias, sub: "total registrado", bg: "bg-red-500/10 border-red-500/20", txt: "text-red-400" },
        { label: "Projetos de lei", value: stats.projetos, sub: "cadastrados", bg: "bg-blue-500/10 border-blue-500/20", txt: "text-blue-400" },
        { label: "Orçamento", value: fmtS(total), sub: "previsto 2024", bg: "bg-purple-500/10 border-purple-500/20", txt: "text-purple-400" },
        { label: "Pendências", value: stats.pendencias, sub: "sem revisão", bg: "bg-yellow-500/10 border-yellow-500/20", txt: "text-yellow-400" },
    ];

    return (
        <div className="max-w-5xl space-y-6">
            <div>
                <h1 className="text-3xl font-black text-white">Visão geral</h1>
                <p className="text-zinc-400 mt-1">Resumo de atividade da plataforma.</p>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {metrics.map(m => (
                    <div key={m.label} className={`rounded-3xl border p-5 ${m.bg}`}>
                        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${m.txt}`}>{m.label}</p>
                        <p className="text-3xl font-black text-white">{m.value}</p>
                        <p className="text-xs text-zinc-500 mt-1">{m.sub}</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm">
                    <p className="text-sm font-black text-white-900 mb-5">Gastos por secretaria <span className="text-zinc-500 font-normal">2024</span></p>
                    <div className="space-y-3.5">
                        {gastos.map(g => (
                            <div key={g.secretaria} className="flex items-center gap-3 text-xs">
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: g.cor }} />
                                <span className="w-32 text-zinc-400 truncate flex-shrink-0">{g.secretaria}</span>
                                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${(g.valor / maxGasto) * 100}%`, background: g.cor }} />
                                </div>
                                <span className="w-14 text-zinc-500 text-right">{fmtS(g.valor)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm">
                    <p className="text-sm font-black text-white mb-5">Atividade recente</p>
                    {ativs.length === 0
                        ? <p className="text-sm text-zinc-600 text-center py-8">Nenhuma atividade ainda.</p>
                        : <div className="space-y-4">
                            {ativs.map((a, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: a.cor }} />
                                    <div>
                                        <p className="text-sm text-zinc-200">{a.texto}</p>
                                        <p className="text-xs text-zinc-600 mt-0.5">{fmtDH(a.tempo)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   TELA — PROJETOS
═══════════════════════════════════════════════ */
const PROJ_VAZIO = { titulo: "", numero: "", categoria: "Saúde", status: "Proposta", descricao: "" };

function TelaProjetos() {
    const [projetos, setProjetos] = useState([]);
    const [busca, setBusca] = useState("");
    const [panel, setPanel] = useState(null);
    const [form, setForm] = useState(PROJ_VAZIO);
    const [editId, setEditId] = useState(null);

    useEffect(() => { setProjetos(JSON.parse(localStorage.getItem("projetos") || "[]")); }, [router]);

    function salvar() {
        const lista = editId !== null
            ? projetos.map(p => p.id === editId ? { ...p, ...form } : p)
            : [...projetos, { ...form, id: Date.now(), criadoEm: new Date().toISOString(), votos: { sim: 0, nao: 0 } }];
        setProjetos(lista); localStorage.setItem("projetos", JSON.stringify(lista));
        setPanel(null); setForm(PROJ_VAZIO); setEditId(null);
    }

    function excluir(id) {
        if (!confirm("Excluir este projeto?")) return;
        const lista = projetos.filter(p => p.id !== id);
        setProjetos(lista); localStorage.setItem("projetos", JSON.stringify(lista));
    }

    const filtrados = projetos.filter(p =>
        p.titulo?.toLowerCase().includes(busca.toLowerCase()) || p.numero?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="max-w-5xl space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white">Projetos de lei</h1>
                    <p className="text-zinc-400 mt-1">Gerencie os projetos exibidos no portal cidadão.</p>
                </div>
                <BtnRed onClick={() => { setForm(PROJ_VAZIO); setEditId(null); setPanel("novo"); }}>+ Novo projeto</BtnRed>
            </div>
            <DarkInput value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por título ou número..." />
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 overflow-hidden backdrop-blur-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            {["Número", "Título", "Categoria", "Status", "Votos", ""].map(h => (
                                <th key={h} className="text-left text-xs font-bold text-zinc-500 uppercase tracking-widest px-5 py-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.length === 0 && <tr><td colSpan={6} className="text-center text-sm text-zinc-600 py-12">{busca ? "Nenhum resultado." : "Nenhum projeto cadastrado ainda."}</td></tr>}
                        {filtrados.map(p => (
                            <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="px-5 py-4 text-xs text-zinc-500">{p.numero || "—"}</td>
                                <td className="px-5 py-4 text-zinc-100 font-medium max-w-[180px] truncate">{p.titulo}</td>
                                <td className="px-5 py-4"><Badge text={p.categoria} cls={BADGE_CAT[p.categoria] || "bg-zinc-700 text-zinc-400 border-zinc-600"} /></td>
                                <td className="px-5 py-4"><Badge text={p.status} cls={BADGE_STATUS_PROJ[p.status] || "bg-zinc-700 text-zinc-400 border-zinc-600"} /></td>
                                <td className="px-5 py-4 text-xs text-zinc-500">{p.votos ? `${p.votos.sim}✓ ${p.votos.nao}✗` : "—"}</td>
                                <td className="px-5 py-4">
                                    <div className="flex gap-1.5 justify-end">
                                        <IconBtn onClick={() => { setForm(p); setPanel("ver"); }} title="Ver">👁️</IconBtn>
                                        <IconBtn onClick={() => { setForm({ titulo: p.titulo, numero: p.numero, categoria: p.categoria, status: p.status, descricao: p.descricao }); setEditId(p.id); setPanel("editar"); }} title="Editar">✏️</IconBtn>
                                        <IconBtn onClick={() => excluir(p.id)} title="Excluir" danger>🗑️</IconBtn>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <SlidePanel
                open={panel !== null} onClose={() => setPanel(null)}
                title={panel === "novo" ? "Novo projeto de lei" : panel === "editar" ? "Editar projeto" : "Detalhes do projeto"}
                footer={
                    panel === "ver"
                        ? <BtnGhost onClick={() => setPanel(null)}>Fechar</BtnGhost>
                        : <><BtnGhost onClick={() => setPanel(null)}>Cancelar</BtnGhost><BtnRed onClick={salvar}>{panel === "novo" ? "Criar projeto" : "Salvar"}</BtnRed></>
                }
            >
                {panel === "ver" ? (
                    <>
                        {[["Número", form.numero || "—"], ["Título", form.titulo], ["Categoria", form.categoria], ["Status", form.status], ["Descrição", form.descricao || "—"]].map(([l, v]) => (
                            <div key={l}><p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{l}</p><p className="text-sm text-zinc-100">{v}</p></div>
                        ))}
                        {form.votos && <div><p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Votos dos cidadãos</p><p className="text-sm"><span className="text-emerald-400 font-bold">{form.votos.sim} sim</span> / <span className="text-red-400 font-bold">{form.votos.nao} não</span></p></div>}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Número"><DarkInput value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} placeholder="PL 0001/2024" /></Field>
                            <Field label="Categoria"><DarkSelect value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>{CATEGORIAS.map(c => <option key={c}>{c}</option>)}</DarkSelect></Field>
                        </div>
                        <Field label="Título"><DarkInput value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} placeholder="Título do projeto" /></Field>
                        <Field label="Status"><DarkSelect value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>{STATUS_PROJ.map(s => <option key={s}>{s}</option>)}</DarkSelect></Field>
                        <Field label="Descrição"><DarkTextarea rows={4} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} placeholder="Descreva o projeto de lei..." /></Field>
                    </>
                )}
            </SlidePanel>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   TELA — DENÚNCIAS
═══════════════════════════════════════════════ */
function TelaDenuncias() {
    const [denuncias, setDenuncias] = useState([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("todos");
    const [sel, setSel] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);

    useEffect(() => {
        const s = localStorage.getItem("denuncias");
        const l = s ? JSON.parse(s) : DENUNCIAS_EXEMPLO;
        if (!s) localStorage.setItem("denuncias", JSON.stringify(DENUNCIAS_EXEMPLO));
        setDenuncias(l);
    }, [router]);

    function atualizar(id, status) {
        const lista = denuncias.map(d => d.id === id ? { ...d, status } : d);
        setDenuncias(lista); localStorage.setItem("denuncias", JSON.stringify(lista));
        if (sel?.id === id) setSel({ ...sel, status });
    }

    function excluir(id) {
        if (!confirm("Excluir esta denúncia?")) return;
        const lista = denuncias.filter(d => d.id !== id);
        setDenuncias(lista); localStorage.setItem("denuncias", JSON.stringify(lista));
        if (sel?.id === id) { setSel(null); setPanelOpen(false); }
    }

    const filtradas = denuncias.filter(d => {
        const mb = d.descricao?.toLowerCase().includes(busca.toLowerCase());
        const ms = filtro === "todos" || d.status === filtro;
        return mb && ms;
    });
    const pendentes = denuncias.filter(d => d.status === "pendente").length;

    return (
        <div className="max-w-5xl space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        Denúncias
                        {pendentes > 0 && <span className="text-sm bg-red-600 text-white rounded-full px-3 py-1 font-bold">{pendentes} pendente{pendentes > 1 ? "s" : ""}</span>}
                    </h1>
                    <p className="text-zinc-400 mt-1">Revise, aprove ou arquive denúncias dos cidadãos.</p>
                </div>
            </div>
            <div className="flex gap-3">
                <DarkInput value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar denúncia..." className="flex-1" />
                <DarkSelect value={filtro} onChange={e => setFiltro(e.target.value)} className="w-48">
                    <option value="todos">Todos os status</option>
                    <option value="pendente">Pendente</option>
                    <option value="em análise">Em análise</option>
                    <option value="aprovada">Aprovada</option>
                    <option value="arquivada">Arquivada</option>
                </DarkSelect>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 overflow-hidden backdrop-blur-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            {["#", "Descrição", "Categoria", "Data", "Status", ""].map(h => (
                                <th key={h} className="text-left text-xs font-bold text-zinc-500 uppercase tracking-widest px-5 py-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtradas.length === 0 && <tr><td colSpan={6} className="text-center text-sm text-zinc-600 py-12">Nenhuma denúncia encontrada.</td></tr>}
                        {filtradas.map(d => (
                            <tr key={d.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="px-5 py-4 text-xs text-zinc-500">#{d.id}</td>
                                <td className="px-5 py-4 text-zinc-100 max-w-[180px]"><span className="line-clamp-2">{d.descricao}</span></td>
                                <td className="px-5 py-4"><Badge text={d.categoria || "Outro"} cls={BADGE_CAT[d.categoria] || "bg-zinc-700 text-zinc-400 border-zinc-600"} /></td>
                                <td className="px-5 py-4 text-xs text-zinc-500">{fmtD(d.criadoEm)}</td>
                                <td className="px-5 py-4"><Badge text={LABEL_STATUS_DEN[d.status] || d.status} cls={BADGE_STATUS_DEN[d.status] || "bg-zinc-700 text-zinc-400 border-zinc-600"} /></td>
                                <td className="px-5 py-4">
                                    <div className="flex gap-1.5 justify-end">
                                        <IconBtn onClick={() => { setSel(d); setPanelOpen(true); }} title="Ver">👁️</IconBtn>
                                        {!["aprovada", "arquivada"].includes(d.status) && <IconBtn onClick={() => atualizar(d.id, "aprovada")} title="Aprovar">✅</IconBtn>}
                                        {d.status !== "arquivada" && <IconBtn onClick={() => atualizar(d.id, "arquivada")} title="Arquivar">📦</IconBtn>}
                                        <IconBtn onClick={() => excluir(d.id)} danger title="Excluir">🗑️</IconBtn>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <SlidePanel open={panelOpen} onClose={() => setPanelOpen(false)} title={sel ? `Denúncia #${sel.id}` : ""} footer={<BtnGhost onClick={() => setPanelOpen(false)}>Fechar</BtnGhost>}>
                {sel && (
                    <>
                        <div><p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Descrição</p><p className="text-sm text-zinc-100 leading-relaxed">{sel.descricao}</p></div>
                        <div className="grid grid-cols-2 gap-5">
                            <div><p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Categoria</p><p className="text-sm text-zinc-100">{sel.categoria || "—"}</p></div>
                            <div><p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Data</p><p className="text-sm text-zinc-100">{fmtDH(sel.criadoEm)}</p></div>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Alterar status</p>
                            <div className="flex gap-2 flex-wrap">
                                {Object.entries(LABEL_STATUS_DEN).map(([s, l]) => (
                                    <button key={s} onClick={() => atualizar(sel.id, s)}
                                        className={`text-sm px-4 py-2 rounded-2xl border transition font-medium ${sel.status === s ? "bg-red-600 text-white border-red-600" : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </SlidePanel>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   TELA — GASTOS
═══════════════════════════════════════════════ */
function DonutChart({ gastos, total }) {
    const r = 48, circ = 2 * Math.PI * r;
    let off = 0;
    const slices = gastos.map(g => { const c = g.valor / total * circ; const s = { ...g, c, off }; off += c; return s; });
    return (
        <svg viewBox="0 0 120 120" className="w-36 h-36">
            {slices.map(s => (<circle key={s.secretaria} cx="60" cy="60" r={r} fill="none" stroke={s.cor} strokeWidth="18" strokeDasharray={`${s.c} ${circ - s.c}`} strokeDashoffset={-s.off} transform="rotate(-90 60 60)" />))}
            <text x="60" y="55" textAnchor="middle" fontSize="9" fill="#71717a" fontFamily="sans-serif">Total</text>
            <text x="60" y="69" textAnchor="middle" fontSize="8" fill="#f4f4f5" fontFamily="sans-serif" fontWeight="900">R$ 2,36B</text>
        </svg>
    );
}

function TelaGastos() {
    const [gastos, setGastos] = useState(GASTOS_DEFAULT);
    const [panelOpen, setPanelOpen] = useState(false);
    const [formVals, setFormVals] = useState({});
    const [salvo, setSalvo] = useState(false);

    useEffect(() => { const g = localStorage.getItem("gastos"); if (g) setGastos(JSON.parse(g)); }, [router]);

    function abrirEdicao() {
        const v = {}; gastos.forEach(g => { v[g.secretaria] = g.valor; });
        setFormVals(v); setPanelOpen(true);
    }

    function salvarGastos() {
        const ats = gastos.map(g => ({ ...g, valor: parseFloat(formVals[g.secretaria]) || g.valor }));
        setGastos(ats); localStorage.setItem("gastos", JSON.stringify(ats));
        setPanelOpen(false); setSalvo(true); setTimeout(() => setSalvo(false), 3000);
    }

    function resetar() {
        setGastos(GASTOS_DEFAULT); localStorage.setItem("gastos", JSON.stringify(GASTOS_DEFAULT));
        setSalvo(true); setTimeout(() => setSalvo(false), 3000);
    }

    const total = gastos.reduce((s, g) => s + g.valor, 0);

    return (
        <div className="max-w-5xl space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white">Gastos públicos</h1>
                    <p className="text-zinc-400 mt-1">Edite os valores exibidos no portal de transparência.</p>
                </div>
                <div className="flex gap-3 items-center">
                    {salvo && <span className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-2">✅ Salvo</span>}
                    <BtnGhost onClick={resetar}>Restaurar padrão</BtnGhost>
                    <BtnRed onClick={abrirEdicao}>✏️ Editar valores</BtnRed>
                </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm">
                <p className="text-sm font-black text-white mb-5">Distribuição orçamentária — 2024</p>
                <div className="flex gap-10 items-center">
                    <DonutChart gastos={gastos} total={total} />
                    <div className="grid grid-cols-2 gap-x-10 gap-y-3 flex-1">
                        {gastos.map(g => (
                            <div key={g.secretaria} className="flex items-center gap-2.5 text-sm">
                                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: g.cor }} />
                                <span className="text-zinc-400 truncate flex-1">{g.secretaria}</span>
                                <span className="text-white font-bold">{((g.valor / total) * 100).toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 overflow-hidden backdrop-blur-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            {["Secretaria", "Valor previsto", "% do total", "Participação"].map(h => (
                                <th key={h} className="text-left text-xs font-bold text-zinc-500 uppercase tracking-widest px-5 py-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.map(g => {
                            const pct = ((g.valor / total) * 100).toFixed(1);
                            return (
                                <tr key={g.secretaria} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 font-medium text-zinc-100"><div className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: g.cor }} />{g.secretaria}</div></td>
                                    <td className="px-5 py-4 text-zinc-300">{fmt(g.valor)}</td>
                                    <td className="px-5 py-4"><Badge text={`${pct}%`} cls="bg-red-500/10 text-red-400 border border-red-500/20" /></td>
                                    <td className="px-5 py-4 w-48"><div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: g.cor }} /></div></td>
                                </tr>
                            );
                        })}
                        <tr className="bg-white/5">
                            <td className="px-5 py-4 font-black text-white">Total</td>
                            <td className="px-5 py-4 font-black text-white">{fmt(total)}</td>
                            <td className="px-5 py-4"><Badge text="100%" cls="bg-zinc-700 text-zinc-300 border border-zinc-600" /></td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
            <SlidePanel open={panelOpen} onClose={() => setPanelOpen(false)} title="Editar valores orçamentários"
                footer={<><BtnGhost onClick={() => setPanelOpen(false)}>Cancelar</BtnGhost><BtnRed onClick={salvarGastos}>Salvar alterações</BtnRed></>}>
                <p className="text-sm text-zinc-400">Os gráficos do portal serão atualizados automaticamente.</p>
                {gastos.map(g => (
                    <Field key={g.secretaria} label={g.secretaria}>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">R$</span>
                            <DarkInput type="number" className="pl-10" value={formVals[g.secretaria] || ""} onChange={e => setFormVals({ ...formVals, [g.secretaria]: e.target.value })} />
                        </div>
                    </Field>
                ))}
            </SlidePanel>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   TELA — GESTÃO DE ADMINS
═══════════════════════════════════════════════ */
function TelaGestao() {
    const [admins, setAdmins] = useState([]);
    const [logado, setLogado] = useState(null);

    useEffect(() => {
        setAdmins(JSON.parse(localStorage.getItem("admins") || "[]"));
        setLogado(JSON.parse(localStorage.getItem("adminLogado") || "null"));
    }, [router]);

    function remover(id) {
        if (!confirm("Remover este administrador?")) return;
        const lista = admins.filter(a => a.id !== id);
        setAdmins(lista); localStorage.setItem("admins", JSON.stringify(lista));
    }

    return (
        <div className="max-w-3xl space-y-5">
            <div>
                <h1 className="text-3xl font-black text-white">Administradores</h1>
                <p className="text-zinc-400 mt-1">Código de convite:{" "}
                    <span className="font-mono bg-zinc-800 border border-white/10 text-zinc-300 rounded-xl px-2 py-0.5 text-xs">{CODIGO_CONVITE}</span>
                </p>
            </div>
            {admins.length === 0
                ? <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-12 text-center"><p className="text-zinc-500">Nenhum administrador cadastrado ainda.</p></div>
                : <div className="rounded-3xl border border-white/10 bg-zinc-900/60 overflow-hidden backdrop-blur-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                {["Admin", "E-mail", "Perfil", "Cadastro", ""].map(h => (
                                    <th key={h} className="text-left text-xs font-bold text-zinc-500 uppercase tracking-widest px-5 py-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(a => (
                                <tr key={a.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xs font-black flex-shrink-0">{iniciais(a.nome)}</div>
                                            <span className="font-bold text-white">{a.nome}</span>
                                            {logado?.email === a.email && <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-2 py-0.5">você</span>}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-zinc-400">{a.email}</td>
                                    <td className="px-5 py-4"><Badge text={a.role || "admin"} cls="bg-purple-500/10 text-purple-400 border border-purple-500/20" /></td>
                                    <td className="px-5 py-4 text-xs text-zinc-500">{fmtD(a.criadoEm)}</td>
                                    <td className="px-5 py-4">{logado?.email !== a.email && <IconBtn onClick={() => remover(a.id)} danger title="Remover">🗑️</IconBtn>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

/* ═══════════════════════════════════════════════
   PAINEL PRINCIPAL (sidebar + telas)
═══════════════════════════════════════════════ */
const TELAS_PAINEL = { dashboard: TelaDashboard, projetos: TelaProjetos, denuncias: TelaDenuncias, gastos: TelaGastos, gestao: TelaGestao };
function PainelAdmin({ slugInicial }) {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const slug = slugInicial;
    const [pendencias, setPendencias] = useState(0);

    useEffect(() => {
        const logado = localStorage.getItem("adminLogado");

        if (!logado) {
            router.push("/admin/login");
            return;
        }

        setAdmin(JSON.parse(logado));

        const dens = JSON.parse(
            localStorage.getItem("denuncias") || "[]"
        );

        setPendencias(
            dens.filter(d => d.status === "pendente").length
        );
    }, [router]);

    if (!admin) return null;

    const Tela = TELAS_PAINEL[slug] || TelaDashboard;

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex">
            <Sidebar
                currentSlug={slug}
                onNavigate={(novaSlug) => {
                    router.push(`/admin/${novaSlug}`);
                }}
                admin={admin}
                pendencias={pendencias}
                onLogout={() => {
                    localStorage.removeItem("adminLogado");
                    router.push("/admin/login");
                }}
            />

            <main className="flex-1 p-8 overflow-auto bg-zinc-950">
                <Tela key={slug} />
            </main>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   ROTEADOR CATCH-ALL
═══════════════════════════════════════════════ */
export default function AdminCatchAll({ params }) {
    const slug = params?.slug?.[0] || "login";
    const router = useRouter();

    if (slug === "login") {
        return (
            <TelaLogin
                onGoRegister={() => {
                    router.push("/admin/cadastro");
                }}
            />
        );
    }

    if (slug === "cadastro") {
        return (
            <TelaCadastro
                onGoLogin={() => {
                    router.push("/admin/login");
                }}
            />
        );
    }

    return <PainelAdmin slugInicial={slug} />;
}
