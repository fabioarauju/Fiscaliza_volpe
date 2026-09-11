import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const JAVA_API_URL =
  process.env.API_JAVA_URL ||
  "https://fizcalizavolpe-back-end.onrender.com/denuncias";

export async function PATCH(request: Request) {
  const session = (await cookies()).get("admin_session");
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID e status são obrigatórios" },
        { status: 400 },
      );
    }

    const response = await fetch(`${JAVA_API_URL}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao atualizar status no backend" },
        { status: response.status },
      );
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : { id, status };
    } catch {
      data = { id, status, message: text };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao atualizar denúncia:", error);
    return NextResponse.json(
      { error: "Erro de comunicação com o backend" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const session = (await cookies()).get("admin_session");
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 },
      );
    }

    const response = await fetch(`${JAVA_API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao excluir denúncia" },
        { status: response.status },
      );
    }

    return NextResponse.json({ message: "Denúncia excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir denúncia:", error);
    return NextResponse.json(
      { error: "Erro de comunicação com o backend" },
      { status: 500 },
    );
  }
}
