import { NextResponse } from "next/server";

const JAVA_API_URL =
  process.env.API_JAVA_URL ||
  "https://fizcalizavolpe-back-end.onrender.com/denuncias";

export async function GET() {
  try {
    const response = await fetch(`${JAVA_API_URL}/estatisticas`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Falha ao buscar estatísticas");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 },
    );
  }
}
