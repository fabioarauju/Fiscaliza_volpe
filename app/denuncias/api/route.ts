import { NextResponse } from "next/server";

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
    const body = await request.json();

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
