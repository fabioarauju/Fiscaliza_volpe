import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000, // Espera até 10 segundos para conectar
  idleTimeoutMillis: 30000, // Mantém a conexão aberta por 30 segundos
});

// GET: Puxa todas as denúncias (incluindo o título agora)
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM denuncias ORDER BY data DESC",
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 },
    );
  }
}

// POST: Salva a denúncia com o campo TITULO
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      titulo, // Campo título adicionado
      categoria,
      descricao,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      lat,
      lng,
    } = body;

    // Query atualizada para incluir a coluna 'titulo'
    const query = `
      INSERT INTO denuncias (titulo, categoria, descricao, cep, rua, numero, complemento, bairro, lat, lng, data)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      RETURNING *;
    `;

    const values = [
      titulo || "Sem título", // Valor padrão caso venha vazio
      categoria || "INFRAESTRUTURA",
      descricao || "",
      cep || "",
      rua || "",
      numero || "",
      complemento || "",
      bairro || "",
      lat ? parseFloat(lat) : -23.55052,
      lng ? parseFloat(lng) : -46.633308,
    ];

    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json(
      { error: "Erro ao salvar no banco" },
      { status: 500 },
    );
  }
}
