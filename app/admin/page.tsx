"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, KeyRound, Lock, Eye, EyeOff, AlertTriangle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [lembrar, setLembrar] = useState(false);
    const [touched, setTouched] = useState({ email: false, inviteCode: false, password: false });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const router = useRouter();

    useEffect(() => {
        try {
            const saved = localStorage.getItem("admin_credentials");
            if (saved) {
                const { email: e, inviteCode: ic, password: p } = JSON.parse(saved);
                setEmail(e || "");
                setInviteCode(ic || "");
                setPassword(p || "");
                setLembrar(true);
            }
        } catch { /* empty */ }
    }, []);

    const inviteErr = touched.inviteCode && inviteCode.trim() === "";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro("");

        setTouched({ email: true, inviteCode: true, password: true });
        if (!inviteCode.trim()) return;

        try {
            setLoading(true);

            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, inviteCode }),
            });

            const data = await response.json();

            if (response.ok) {
                if (lembrar) {
                    localStorage.setItem("admin_credentials", JSON.stringify({ email, inviteCode, password }));
                } else {
                    localStorage.removeItem("admin_credentials");
                }
                router.push("/paineladm");
                return;
            }

            setErro(data.message || "Login inválido");
        } catch {
            setErro("Erro ao fazer login. Verifique sua conexão.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-[440px]">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Color strip */}
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-orange-300" />

                    <div className="p-8">
                        <h1 className="text-xl font-semibold text-gray-900 mb-1">
                            Entrar como administrador
                        </h1>
                        <p className="text-sm text-gray-500 mb-7">
                            Utilize suas credenciais institucionais para acessar.
                        </p>

                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                            {/* E-mail */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    E-mail institucional
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="voce@empresa.com.br"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onBlur={() => setTouched(t => ({ ...t, email: true }))}
                                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Código de convite */}
                            <div>
                                <label htmlFor="invite" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Código de convite <span className="text-orange-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                    <input
                                        id="invite"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        placeholder="XXXX-XXXX-XXXX"
                                        value={inviteCode}
                                        onChange={e => setInviteCode(e.target.value)}
                                        onBlur={() => setTouched(t => ({ ...t, inviteCode: true }))}
                                        className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none transition ${
                                            inviteErr
                                                ? "border-orange-400 bg-orange-50 ring-2 ring-orange-400/25 focus:border-orange-400"
                                                : "border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                                        }`}
                                    />
                                </div>
                                <div className={`mt-1.5 flex items-start gap-1.5 text-xs ${inviteErr ? "text-orange-500" : "text-gray-400"}`}>
                                    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                                    {inviteErr
                                        ? "O código de convite é obrigatório para acesso administrativo."
                                        : "Campo obrigatório — necessário para acesso administrativo."}
                                </div>
                            </div>

                            {/* Senha */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
                                    <a href="#" className="text-xs text-blue-500 hover:text-blue-700 transition">
                                        Esqueceu a senha?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onBlur={() => setTouched(t => ({ ...t, password: true }))}
                                        className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                                    />
                                    <button
                                        type="button"
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Lembrar credenciais */}
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={lembrar}
                                    onChange={(e) => {
                                        setLembrar(e.target.checked);
                                        if (!e.target.checked) localStorage.removeItem("admin_credentials");
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500/30"
                                />
                                <span className="text-sm text-gray-600">Lembrar minhas credenciais</span>
                            </label>

                            {/* Erro */}
                            {erro && (
                                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                                    {erro}
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 mt-1 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Entrando…
                                    </>
                                ) : (
                                    "Entrar no painel"
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Card footer */}
                    <div className="bg-gray-50 border-t border-gray-100 px-8 py-3.5 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Acesso apenas para administradores</span>
                        <span className="inline-flex items-center gap-1 text-xs text-orange-500 font-medium">
                            <Shield size={14} />
                            Conexão segura
                        </span>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-5">
                    Problemas de acesso? Fale com o suporte técnico interno.
                </p>
            </div>
        </main>
    );
}
