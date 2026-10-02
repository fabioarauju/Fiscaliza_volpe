export const CORES_SETOR: Record<string, string> = {
  "Saúde": "#378ADD",
  "Educação": "#D85A30",
  "Urbanismo (Obras)": "#639922",
  "Administração": "#EF9F27",
  "Previdência Social": "#7F77DD",
  "Assistência Social": "#E24B4A",
  "Outros": "#1D9E75",
};

export function corSetor(setor: string): string {
  return CORES_SETOR[setor] || "#B4B2A9";
}