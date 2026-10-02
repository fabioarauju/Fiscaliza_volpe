const BASE_URL = "https://dadosabertos.camara.leg.br/api/v2";

/**
 * Busca proposições de 2025 e 2026 simultaneamente
 * para garantir que projetos em andamento não fiquem de fora.
 */
export async function buscarProposicoes({
  itens = 100, // Aumentado para carregar uma base maior
} = {}) {
  try {
    // Dispara as duas buscas em paralelo
    const [res2025, res2026] = await Promise.all([
      fetch(
        `${BASE_URL}/proposicoes?ano=2025&itens=${itens}&ordem=DESC&ordenarPor=id`,
      ),
      fetch(
        `${BASE_URL}/proposicoes?ano=2026&itens=${itens}&ordem=DESC&ordenarPor=id`,
      ),
    ]);

    const data2025 = await res2025.json();
    const data2026 = await res2026.json();

    // Junta os dados (2026 primeiro para aparecerem no topo)
    const todasProposicoes = [
      ...(data2026.dados || []),
      ...(data2025.dados || []),
    ];

    return { dados: todasProposicoes };
  } catch (error) {
    console.error("Erro ao buscar proposições dos anos 2025/2026:", error);
    return { dados: [] };
  }
}

export async function buscarDetalhesProposicao(id) {
  try {
    const [detRes, autRes, temRes, tramRes] = await Promise.all([
      fetch(`${BASE_URL}/proposicoes/${id}`),
      fetch(`${BASE_URL}/proposicoes/${id}/autores`),
      fetch(`${BASE_URL}/proposicoes/${id}/temas`),
      fetch(`${BASE_URL}/proposicoes/${id}/tramitacoes?ordem=DESC&itens=5`), // Aumentado para 5 para ver mais histórico
    ]);

    const det = detRes.ok ? await detRes.json() : { dados: {} };
    const aut = autRes.ok ? await autRes.json() : { dados: [] };
    const tem = temRes.ok ? await temRes.json() : { dados: [] };
    const tram = tramRes.ok ? await tramRes.json() : { dados: [] };

    return {
      detalhes: det.dados || {},
      autores: aut.dados || [],
      temas: tem.dados || [],
      tramitacoes: tram.dados || [],
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes:", error);
    return { detalhes: {}, autores: [], temas: [], tramitacoes: [] };
  }
}
