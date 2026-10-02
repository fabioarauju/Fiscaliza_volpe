// Proxy da foto de "como ficou": /denuncias/api/<id>/foto-resolucao -> Java /denuncias/<id>/foto-resolucao
const JAVA_API_URL =
  process.env.API_JAVA_URL ||
  "https://fizcalizavolpe-back-end.onrender.com/denuncias";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const res = await fetch(
      `${JAVA_API_URL}/${encodeURIComponent(id)}/foto-resolucao`,
      { cache: "no-store" },
    );
    if (!res.ok) return new Response("Foto não encontrada", { status: res.status });

    return new Response(await res.arrayBuffer(), {
      headers: {
        "Content-Type": res.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar foto da resolução:", error);
    return new Response("Erro ao buscar foto", { status: 500 });
  }
}
