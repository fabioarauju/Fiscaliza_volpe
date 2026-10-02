import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// No corpo do seu componente DenunciasPage:

// Lógica para contar as ocorrências por tipo
const dadosGrafico = Object.values(
  denuncias.reduce((acc, { tipo }) => {
    acc[tipo] = acc[tipo] || { name: tipo, value: 0 };
    acc[tipo].value += 1;
    return acc;
  }, {}),
);

const CORES = ["#1D4ED8", "#10B981", "#F97316", "#A855F7", "#EAB308"];

// Dentro do seu return, substitua a div do gráfico por esta:
<div className="bg-white p-8 rounded-2xl shadow-md border flex flex-col items-center">
  <h2 className="text-2xl font-bold mb-6 text-gray-900">
    Resumo de Ocorrências
  </h2>

  <div className="w-full h-64">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dadosGrafico}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {dadosGrafico.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </div>

  <p className="mt-4 text-sm text-gray-500 font-medium italic">
    Dados atualizados em tempo real com base no banco de dados.
  </p>
</div>;
