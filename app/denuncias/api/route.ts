import { NextResponse } from "next/server";
// O Java analisa a foto com o Gemini antes de responder: pode levar alguns segundos
export const maxDuration = 60;

const TAMANHO_MAX_FOTO = 4 * 1024 * 1024; // ~4 MB em base64 (~3 MB de imagem)

const JAVA_API_URL =
  process.env.API_JAVA_URL ||
  "https://fizcalizavolpe-back-end.onrender.com/denuncias";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function GET() {
  try {
    const response = await fetch(JAVA_API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Falha ao buscar na API Java");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas denúncias enviadas. Aguarde um minuto e tente novamente." },
      { status: 429 },
    );
  }

  try {
    const { foto, ...campos } = await request.json();

    const vazio = (v: unknown) => typeof v !== "string" || !v.trim();
    if (
      vazio(campos.titulo) ||
      vazio(campos.categoria) ||
      vazio(campos.cep) ||
      vazio(campos.numero) ||
      vazio(campos.descricao)
    ) {
      return NextResponse.json(
        { error: "Preencha título, categoria, CEP, número e descrição." },
        { status: 400 },
      );
    }

    // Validação rápida aqui; a análise do Gemini e a prioridade
    // são feitas no back-end Java ao salvar.
    if (foto && !/^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(foto)) {
      return NextResponse.json({ error: "Formato de foto inválido." }, { status: 400 });
    }
    if (foto && foto.length > TAMANHO_MAX_FOTO) {
      return NextResponse.json({ error: "Foto muito grande (máx. ~3 MB)." }, { status: 413 });
    }

    const body = { ...campos, foto: foto ?? null };

    // Salva no Java (que chama o Gemini)
    const response = await fetch(JAVA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const textResponse = await response.text();
    let data;
    try {
      data = textResponse ? JSON.parse(textResponse) : {};
    } catch {
      data = { message: textResponse };
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro no Java" },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json(
      { error: "Erro de comunicação com Java" },
      { status: 500 },
    );
  }
}
