"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const sz16 = { width: 16, height: 16, flexShrink: 0 } as const;
const sz14 = { width: 14, height: 14, flexShrink: 0 } as const;
const sz20 = { width: 20, height: 20, flexShrink: 0 } as const;

function IconShield({ size = sz16 }: { size?: typeof sz16 }) {
    return (
        <svg style={size} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
        </svg>
    );
}
function IconMail() {
    return (
        <svg style={sz16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    );
}
function IconKey() {
    return (
        <svg style={sz16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
    );
}
function IconLock() {
    return (
        <svg style={sz16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
    );
}
function IconEyeOff() {
    return (
        <svg style={sz16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    );
}
function IconEye() {
    return (
        <svg style={sz16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}
function IconWarning() {
    return (
        <svg style={sz14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    );
}

const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px 10px 36px",
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#1e293b",
    outline: "none",
    boxSizing: "border-box",
};

const inputErr: React.CSSProperties = {
    ...inputBase,
    border: "1px solid #fb923c",
    background: "#fff7ed",
    boxShadow: "0 0 0 3px rgba(251,146,60,0.25)",
};

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({ email: false, inviteCode: false, password: false });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const inviteErr = touched.inviteCode && inviteCode.trim() === "";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setTouched({
            email: true,
            inviteCode: true,
            password: true,
        });

        if (!inviteCode.trim()) return;

        try {
            setLoading(true);

            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    inviteCode,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push("/paineladm");
                return;
            }

            alert(data.message || "Login inválido");
        } catch {
            alert("Erro ao fazer login");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        input:focus { box-shadow: 0 0 0 3px rgba(59,130,246,0.3) !important; border-color: #3b82f6 !important; outline: none; }
        .btn-primary:hover:not(:disabled) { background: #2563eb !important; }
        .eye-btn:hover { color: #475569 !important; }
        .forgot:hover { color: #1d4ed8 !important; }
      `}</style>

            <main style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif" }}>


                {/* ── Body ── */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px" }}>
                    <div style={{ width: "100%", maxWidth: 440 }}>

                        {/* Card */}
                        <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                            border: "1px solid #f1f5f9",
                            overflow: "hidden",
                        }}>
                            {/* color strip */}
                            <div style={{ height: 5, background: "linear-gradient(to right, #2563eb, #3b82f6, #fdba74)" }} />

                            <div style={{ padding: "32px 32px 28px" }}>
                                <h1 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", margin: "0 0 4px" }}>
                                    Entrar como administrador
                                </h1>
                                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 28px" }}>
                                    Utilize suas credenciais institucionais para acessar.
                                </p>

                                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                                    {/* E-mail */}
                                    <div>
                                        <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                                            E-mail institucional
                                        </label>
                                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                            <span style={{ position: "absolute", left: 10, color: "#94a3b8", display: "flex", pointerEvents: "none" }}>
                                                <IconMail />
                                            </span>
                                            <input id="email" type="email" required autoComplete="email"
                                                placeholder="voce@empresa.com.br"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                                                style={inputBase}
                                            />
                                        </div>
                                    </div>

                                    {/* Código de convite */}
                                    <div>
                                        <label htmlFor="invite" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                                            Código de convite <span style={{ color: "#fb923c", fontWeight: 700 }}>*</span>
                                        </label>
                                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                            <span style={{ position: "absolute", left: 10, color: "#94a3b8", display: "flex", pointerEvents: "none" }}>
                                                <IconKey />
                                            </span>
                                            <input id="invite" type="text" required autoComplete="off"
                                                placeholder="XXXX-XXXX-XXXX"
                                                value={inviteCode}
                                                onChange={e => setInviteCode(e.target.value)}
                                                onBlur={() => setTouched(t => ({ ...t, inviteCode: true }))}
                                                style={inviteErr ? inputErr : inputBase}
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: 6, display: "flex", alignItems: "flex-start", gap: 5,
                                            fontSize: 12, color: inviteErr ? "#f97316" : "#94a3b8",
                                        }}>
                                            <span style={{ marginTop: 1, display: "flex" }}><IconWarning /></span>
                                            {inviteErr
                                                ? "O código de convite é obrigatório para acesso administrativo."
                                                : "Campo obrigatório — necessário para acesso administrativo."}
                                        </div>
                                    </div>

                                    {/* Senha */}
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                                            <label htmlFor="password" style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Senha</label>
                                            <a href="#" className="forgot" style={{ fontSize: 12, color: "#3b82f6", textDecoration: "none" }}>
                                                Esqueceu a senha?
                                            </a>
                                        </div>
                                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                            <span style={{ position: "absolute", left: 10, color: "#94a3b8", display: "flex", pointerEvents: "none" }}>
                                                <IconLock />
                                            </span>
                                            <input id="password" type={showPassword ? "text" : "password"} required autoComplete="current-password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                                                style={{ ...inputBase, paddingRight: 40 }}
                                            />
                                            <button type="button" className="eye-btn" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                                onClick={() => setShowPassword(v => !v)}
                                                style={{
                                                    position: "absolute", right: 10,
                                                    background: "none", border: "none", cursor: "pointer",
                                                    color: "#94a3b8", padding: 0, display: "flex",
                                                }}>
                                                {showPassword ? <IconEyeOff /> : <IconEye />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button type="submit" disabled={loading} className="btn-primary"
                                        style={{
                                            width: "100%", padding: "11px 16px", borderRadius: 8,
                                            background: "#3b82f6", color: "#fff",
                                            fontSize: 14, fontWeight: 600, border: "none",
                                            cursor: loading ? "not-allowed" : "pointer",
                                            opacity: loading ? 0.65 : 1,
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                            marginTop: 4,
                                        }}>
                                        {loading
                                            ? <><svg className="spin" style={sz16} fill="none" viewBox="0 0 24 24">
                                                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg> Entrando…</>
                                            : "Entrar no painel"}
                                    </button>
                                </form>
                            </div>

                            {/* Card footer */}
                            <div style={{
                                background: "#f8fafc", borderTop: "1px solid #f1f5f9",
                                padding: "14px 32px",
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                            }}>
                                <span style={{ fontSize: 12, color: "#94a3b8" }}>Acesso apenas para administradores</span>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#fb923c", fontWeight: 500 }}>
                                    <IconShield size={sz14} />
                                    Conexão segura
                                </span>
                            </div>
                        </div>

                        <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 20 }}>
                            Problemas de acesso? Fale com o suporte técnico interno.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}