import Link from "next/link";
import { Target, BarChart3, FileText, Flag, MapPin, ArrowRight } from "lucide-react";

export default function Sobre() {
  const equipe = [
    { nome: "Giullia", cargo: "Frontend Developer", idade: 20, local: "São Paulo - SP" },
    { nome: "Fabio", cargo: "Software Engineer", idade: 24, local: "Juiz de Fora - MG" },
    { nome: "Isabella", cargo: "Frontend Developer", idade: 20, local: "Cajuru - SP" },
    { nome: "Zilton", cargo: "Game Developer", idade: 18, local: "Montes Claros - MG" },
    { nome: "Maria Eduarda", cargo: "Frontend Developer", idade: 20, local: "Itapevi - SP" },
  ];

  const iniciais = (nome: string) => nome.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-5">
            Sobre o projeto
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Tecnologia a serviço da transparência
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            O <strong className="text-gray-700">Fiscaliza Volpe</strong> é uma plataforma criada para
            promover transparência pública e incentivar a participação cidadã. Nosso objetivo é tornar
            dados públicos mais acessíveis e permitir que qualquer pessoa acompanhe como os recursos
            estão sendo utilizados.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Missão */}
        <div className="bg-white rounded-xl border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Target size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Nossa Missão</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Facilitar o acesso à informação pública e incentivar a participação da sociedade no
            acompanhamento da gestão municipal. A plataforma reúne dados de despesas públicas,
            projetos de lei e denúncias urbanas em um ambiente simples e visual.
          </p>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Com isso, buscamos contribuir para cidades mais transparentes, eficientes e participativas.
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">O que você pode fazer</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: <BarChart3 size={20} />, title: "Acompanhar despesas", desc: "Visualize como os recursos públicos estão sendo utilizados através de gráficos por setor.", color: "text-blue-600 bg-blue-50" },
              { icon: <FileText size={20} />, title: "Consultar projetos de lei", desc: "Acompanhe propostas legislativas e iniciativas que impactam diretamente a cidade.", color: "text-violet-600 bg-violet-50" },
              { icon: <Flag size={20} />, title: "Registrar denúncias", desc: "Informe problemas urbanos como buracos, iluminação quebrada ou lixo acumulado.", color: "text-orange-600 bg-orange-50" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-100 p-6">
                <div className={`w-10 h-10 rounded-lg ${f.color} flex items-center justify-center mb-3`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: "2026", label: "Ano de criação" },
            { value: "5", label: "Desenvolvedores" },
            { value: "1", label: "Missão: transparência" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Equipe */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Nossa Equipe</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {equipe.map((m) => (
              <div key={m.nome} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mx-auto mb-3">
                  {iniciais(m.nome)}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{m.nome}</h3>
                <p className="text-xs text-blue-600 mt-0.5">{m.cargo}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2">
                  <MapPin size={12} />
                  {m.local}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Quer contribuir com o projeto?</h2>
          <p className="text-gray-500 mb-5">Sugestões, ideias e melhorias são sempre bem-vindas.</p>
          <Link
            href="/denuncias"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Participar da plataforma <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
