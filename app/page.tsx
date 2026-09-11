import Link from "next/link";
import { BarChart3, FileText, Flag, ArrowRight, TrendingUp, Building2, Briefcase } from "lucide-react";

export default function Home() {
  const dados = [
    { setor: "Saúde", valor: 831.96, cor: "bg-blue-500" },
    { setor: "Educação", valor: 586.76, cor: "bg-violet-500" },
    { setor: "Urbanismo (Obras)", valor: 265.6, cor: "bg-orange-500" },
    { setor: "Administração", valor: 218.56, cor: "bg-emerald-500" },
    { setor: "Previdência Social", valor: 193.68, cor: "bg-amber-500" },
    { setor: "Assistência Social", valor: 49.0, cor: "bg-cyan-500" },
    { setor: "Outros", valor: 217.86, cor: "bg-gray-400" },
  ];

  const totalDespesas = dados.reduce((acc, item) => acc + item.valor, 0);
  const maxValor = Math.max(...dados.map((d) => d.valor));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Plataforma de transparência pública
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Acompanhe a gestão da sua cidade
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Gastos públicos, projetos de lei e denúncias urbanas em um só lugar.
              Fiscalize, participe e contribua para uma cidade mais transparente.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestao"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Ver despesas <ArrowRight size={16} />
              </Link>
              <Link
                href="/denuncias"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-gray-700 text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition"
              >
                Fazer denúncia
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">R$ {(totalDespesas).toFixed(0)}M</div>
              <div className="text-sm text-gray-500 mt-0.5">Orçamento monitorado</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">85</div>
              <div className="text-sm text-gray-500 mt-0.5">Obras em execução</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">128</div>
              <div className="text-sm text-gray-500 mt-0.5">Contratos ativos</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Chart */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Despesas por Setor</h2>
                <p className="text-sm text-gray-400 mt-0.5">Valores em milhões de reais</p>
              </div>
              <Link href="/gestao" className="text-sm text-blue-600 font-medium hover:underline">
                Ver detalhes
              </Link>
            </div>
            <div className="space-y-3">
              {dados.map((d) => (
                <div key={d.setor} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-[100px] sm:w-[140px] shrink-0 truncate">{d.setor}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${d.cor} transition-all`}
                      style={{ width: `${(d.valor / maxValor) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-[70px] sm:w-[80px] text-right shrink-0">R$ {d.valor}M</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Projetos em Destaque</h3>
              <div className="space-y-3">
                {[
                  { nome: "Reforma da Saúde", status: "Em votação", cor: "bg-red-50 text-red-700" },
                  { nome: "Mobilidade urbana sustentável", status: "Em análise", cor: "bg-amber-50 text-amber-700" },
                  { nome: "Programa de habitação", status: "Em andamento", cor: "bg-emerald-50 text-emerald-700" },
                ].map((p) => (
                  <div key={p.nome} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-700 font-medium truncate">{p.nome}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${p.cor}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/projetos"
                className="block mt-5 text-sm text-blue-600 font-medium hover:underline"
              >
                Ver todos os projetos
              </Link>
            </div>

            <Link
              href="/denuncias"
              className="block bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl p-6 text-white hover:shadow-lg transition"
            >
              <Flag size={24} className="mb-3 opacity-90" />
              <div className="text-lg font-bold mb-1">Faça sua denúncia</div>
              <p className="text-sm text-orange-100 leading-relaxed">
                Informe problemas urbanos e ajude a melhorar sua cidade.
              </p>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <BarChart3 size={20} />, title: "Despesas Públicas", desc: "Visualize como os recursos estão sendo utilizados, com gráficos por setor.", href: "/gestao", color: "text-blue-600 bg-blue-50" },
            { icon: <FileText size={20} />, title: "Projetos de Lei", desc: "Acompanhe propostas legislativas que impactam diretamente a cidade.", href: "/projetos", color: "text-violet-600 bg-violet-50" },
            { icon: <Flag size={20} />, title: "Denúncias", desc: "Registre problemas urbanos como buracos, iluminação e lixo acumulado.", href: "/denuncias", color: "text-orange-600 bg-orange-50" },
          ].map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition group"
            >
              <div className={`w-10 h-10 rounded-lg ${f.color} flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium mt-3 group-hover:gap-2 transition-all">
                Acessar <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
