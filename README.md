# Fiscaliza Volpe 🦊

Projeto desenvolvido para o **Enterprise Challenge 2SIO 2026 — HackGov (FIAP + EGESP)**.

O Fiscaliza Volpe é uma **plataforma digital de transparência e gestão pública**, que centraliza e organiza dados governamentais de forma clara e acessível, incentivando a participação ativa do cidadão na fiscalização da gestão pública. O sistema permite:

- Visualizar **dashboards** com gastos públicos por setor (Saúde, Educação, Urbanismo, Administração, Previdência Social, Assistência Social e Outros);
- Acompanhar **projetos de lei** em tramitação, consultados em tempo real na API de Dados Abertos da Câmara dos Deputados;
- Registrar e acompanhar **denúncias** de problemas urbanos (Saneamento, Ambiental, Infraestrutura ou Perturbação) em um mapa interativo, com preenchimento automático de endereço via CEP;
- Gerenciar tudo isso através de um **painel administrativo** restrito, para triagem de denúncias e edição de gastos por secretaria.

---

## 🚀 Tecnologias utilizadas

| Camada | Tecnologia | Uso no projeto |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) | Renderização das páginas, roteamento e API Routes |
| Biblioteca de UI | React 19 | Componentização da interface |
| Linguagem | TypeScript / JavaScript (JSX) | Tipagem nas rotas de API e autenticação; JSX nas páginas de conteúdo |
| Estilização | Tailwind CSS 4 | Layout responsivo e componentes visuais |
| Gráficos | Recharts | Gráficos de barra e pizza (despesas e categorias de denúncias) |
| Mapas | Leaflet + React-Leaflet | Mapa interativo com as denúncias georreferenciadas |
| Backend | API Routes (Route Handlers) do Next.js | Endpoints de denúncias (GET/POST) e autenticação do painel admin |
| Banco de dados | PostgreSQL (via biblioteca `pg`) | Armazenamento das denúncias registradas pelos cidadãos |
| Integração externa | API ViaCEP | Preenchimento automático de endereço a partir do CEP informado |
| Integração externa | API de Dados Abertos da Câmara dos Deputados | Consulta de proposições legislativas em tempo real |
| Autenticação | Cookie de sessão HTTP-only + middleware | Proteção da rota do painel administrativo |
| Hospedagem | [Vercel](https://vercel.com/) | Deploy contínuo integrado ao repositório GitHub |

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Uma instância de banco de dados **PostgreSQL** (local ou em nuvem, ex: [Neon](https://neon.tech/), [Supabase](https://supabase.com/) ou [Vercel Postgres](https://vercel.com/storage/postgres))

---

## ⚙️ Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/<seu-usuario>/Fiscaliza_volpe.git
cd Fiscaliza_volpe
```

### 2. Instale as dependências

```bash
npm install
```

ou, se preferir usar yarn:

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com a string de conexão do seu banco PostgreSQL:

```env
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_do_banco
```

> ✍️ Se o painel administrativo usar credenciais fixas de acesso (usuário/senha) ou algum segredo para o cookie de sessão, adicione aqui as variáveis correspondentes (ex: `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`).

### 4. Crie a tabela de denúncias no banco de dados

Execute no seu banco PostgreSQL a criação da tabela `denuncias` (ajuste os campos conforme o schema real usado no projeto):

```sql
CREATE TABLE denuncias (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  categoria VARCHAR(50) NOT NULL, -- Saneamento, Ambiental, Infraestrutura ou Perturbação
  cep VARCHAR(9),
  rua VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  estado VARCHAR(2),
  numero_referencia VARCHAR(50),
  descricao TEXT,
  status VARCHAR(50) DEFAULT 'pendente',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  criado_em TIMESTAMP DEFAULT NOW()
);
```

> ✍️ Substitua pelo script real utilizado no projeto, se houver um arquivo `.sql` de migração no repositório.

### 5. Execute o servidor de desenvolvimento

```bash
npm run dev
```

ou

```bash
yarn dev
```

O projeto estará disponível em:

```
http://localhost:3000
```

### 6. Build para produção (opcional)

```bash
npm run build
npm run start
```

---

## 🔐 Acesso ao Painel Administrativo

O painel administrativo é uma área restrita, protegida por autenticação via cookie de sessão HTTP-only e middleware. Nesta versão, a autenticação utiliza credenciais fixas (a serem substituídas futuramente por um sistema de usuários com senha protegida por hash).

Acesse em `http://localhost:3000/admin` (ou o caminho equivalente da rota admin) com:

- **Usuário:** `✍️ preencher`
- **Senha:** `✍️ preencher`

---

## 📁 Estrutura do repositório

O código-fonte segue a convenção do Next.js App Router:

```
Fiscaliza_volpe/
├── app/            # Páginas e rotas (dashboard, denúncias, gestão pública,
│                   # projetos de lei, painel admin, sobre) e API Routes
│                   # (denúncias e autenticação)
├── components/     # Componentes reutilizáveis: gráficos, mapa, tabela,
│                   # cabeçalho e rodapé
├── data/           # Dados de exemplo utilizados durante o desenvolvimento
├── public/         # Arquivos estáticos e middleware de proteção da rota admin
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 👥 Equipe

| RM | Nome | Função no projeto | Cidade |
|---|---|---|---|
| RM565181 | Fabio | Software Engineer | ✍️ |
| RM563495 | Giullia | Frontend Developer | ✍️ |
| RM563165 | Isabella | Frontend Developer | ✍️ |
| RM565308 | Zilton | Game Developer | ✍️ |
| RM566202 | Maria Eduarda | Frontend Developer | ✍️ |

---

## 🔗 Links do projeto

- **Site publicado:** https://fiscaliza-volpe.vercel.app/
- **Repositórios:**
  - https://github.com/fabioarauju/Fiscaliza_volpe
  - https://github.com/volpebits/FizcalizaVolpe-React
- **Protótipo (Figma):** https://www.figma.com/design/D49XfVXLoUWgO6SJPaf1lB/Fiscaliza-Volpe?node-id=0-1&p=f
- **Slides:** https://canva.link/jjsqvarjab8ie71
- **Vídeo demonstrativo:** ✍️ adicionar link

---

## 📌 Status atual e próximos passos

**Já funcional:**
- Dashboard público com gráficos de gastos por setor;
- Registro e visualização de denúncias, com persistência em banco PostgreSQL;
- Mapa interativo das denúncias;
- Consulta de projetos de lei via API pública da Câmara dos Deputados;
- Painel administrativo navegável.

**Próximos passos:**
- Substituir a autenticação fixa do painel admin por um sistema de usuários com senha protegida por hash;
- Persistir no banco as edições feitas no painel admin (status das denúncias e valores por secretaria), hoje mantidas apenas em memória durante a sessão;
- Implementar o módulo de Inteligência Artificial (classificação de imagens por visão computacional e chatbot de triagem via NLP);
- Desenvolver os módulos de análise preditiva e dashboards de ciência de dados.

---

## 📄 Licença

Projeto acadêmico desenvolvido para o Enterprise Challenge 2SIO 2026 (FIAP), em parceria com a EGESP — Escola de Governo do Estado de São Paulo, sob a temática HackGov.
