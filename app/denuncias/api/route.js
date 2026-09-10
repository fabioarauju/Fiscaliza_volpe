import { NextResponse } from "next/server";

// URL apontando exatamente para a rota do Controller no Java
const JAVA_API_URL =
  process.env.API_JAVA_URL ||
  "https://fizcalizavolpe-back-end.onrender.com/denuncias";

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

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(JAVA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Lê como texto primeiro para não quebrar se o Java retornar uma String simples
    const textResponse = await response.text();
    let data;
    try {
      data = textResponse ? JSON.parse(textResponse) : {};
    } catch (e) {
      data = { message: textResponse }; // Se não for JSON, envia como mensagem
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
