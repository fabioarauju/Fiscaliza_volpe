# Fiscaliza Volpe 🦊

Projeto desenvolvido para o **Enterprise Challenge 2SIO 2026 — HackGov (FIAP + EGESP)**.

O **Fiscaliza Volpe** é uma **plataforma digital de transparência e participação cidadã**, desenvolvida para centralizar e organizar informações públicas de forma clara, acessível e visual.

A plataforma permite que o cidadão acompanhe dados da gestão pública, consulte projetos de lei e registre denúncias sobre problemas urbanos. Ao mesmo tempo, oferece aos gestores um painel administrativo para acompanhar, filtrar, analisar e gerenciar as denúncias recebidas.

O sistema possui:

* 📊 **Dashboard público** com informações e gráficos sobre gastos públicos;
* 🏛️ Consulta de **projetos de lei** através da API de Dados Abertos da Câmara dos Deputados;
* 📍 Registro e acompanhamento de **denúncias** com geolocalização;
* 🗺️ **Mapa interativo** das denúncias;
* 🔎 Sistema completo de **busca e filtros**;
* 🔐 **Painel administrativo** protegido por autenticação;
* 📈 Dashboard administrativo com **métricas reais**;
* 🗃️ Persistência dos dados utilizando **PostgreSQL**;
* 🚦 **Rate limiting** para proteção do endpoint de criação de denúncias;
* 🌎 **Geocodificação automática** utilizando Nominatim/OpenStreetMap;
* 📱 Interface **responsiva para dispositivos móveis**.

---

## 🚀 Tecnologias utilizadas

| Camada           | Tecnologia                                | Uso no projeto                                                  |
| ---------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Frontend         | **Next.js 16**                            | Renderização das páginas, roteamento e integração com o backend |
| Biblioteca de UI | **React 19**                              | Componentização da interface                                    |
| Linguagem        | **TypeScript / JavaScript (JSX)**         | Desenvolvimento do frontend e integrações                       |
| Estilização      | **Tailwind CSS 4**                        | Layout responsivo e componentes visuais                         |
| Gráficos         | **Recharts**                              | Gráficos de gastos, categorias e evolução das denúncias         |
| Mapas            | **Leaflet + React-Leaflet**               | Mapa interativo e visualização geográfica                       |
| Backend          | **Java + Spring Boot**                    | API REST e regras de negócio                                    |
| Banco de dados   | **PostgreSQL**                            | Persistência das denúncias e informações do sistema             |
| ORM/Persistência | **Spring Data JPA / Hibernate**           | Comunicação entre aplicação Java e banco de dados               |
| API externa      | **ViaCEP**                                | Preenchimento automático de endereço pelo CEP                   |
| API externa      | **Nominatim / OpenStreetMap**             | Geocodificação automática de endereços                          |
| API externa      | **Dados Abertos da Câmara dos Deputados** | Consulta de projetos e proposições legislativas                 |
| Autenticação     | **Cookie de sessão HTTP-only**            | Proteção do acesso administrativo                               |
| Rate Limiting    | **Controle por endereço IP**              | Limite de criação de denúncias                                  |
| Hospedagem       | **Vercel**                                | Deploy do frontend                                              |

---

# 📋 Funcionalidades

## 📊 Dashboard Público

O Dashboard apresenta uma visão geral das informações públicas disponibilizadas pelo Fiscaliza Volpe.

Entre os recursos disponíveis estão:

* Indicadores de gastos públicos;
* Gráficos de despesas por setor;
* Visualização de dados de Saúde;
* Educação;
* Urbanismo;
* Administração;
* Previdência Social;
* Assistência Social;
* Outros;
* Informações resumidas sobre projetos de lei;
* Layout responsivo para diferentes dispositivos.

---

## 🏛️ Projetos de Lei

O módulo de Projetos de Lei permite consultar proposições legislativas utilizando a **API de Dados Abertos da Câmara dos Deputados**.

O usuário pode:

* Visualizar projetos de lei;
* Consultar informações atualizadas através da API;
* Filtrar projetos;
* Utilizar paginação;
* Visualizar indicadores estatísticos;
* Consultar as informações de maneira organizada.

No mobile, a tabela possui **scroll horizontal** para preservar a usabilidade e a leitura das informações.

---

# 🚨 Denúncias

O módulo de denúncias é um dos principais recursos de participação cidadã do Fiscaliza Volpe.

O cidadão pode registrar ocorrências relacionadas a problemas urbanos, incluindo:

* Saneamento;
* Ambiental;
* Infraestrutura;
* Perturbação;
* Outros.

As denúncias possuem informações como endereço, categoria, descrição, status, localização geográfica e protocolo único.

### Recursos disponíveis

* Cadastro de denúncias;
* Geração de protocolo UUID;
* Consulta de denúncias;
* Busca por protocolo;
* Busca textual;
* Filtro por status;
* Filtro por categoria;
* Filtro por cidade;
* Filtros avançados;
* Paginação;
* Visualização detalhada;
* Mapa interativo;
* Gráficos estatísticos;
* Geolocalização automática;
* Persistência em PostgreSQL.

A tabela pública foi simplificada para quatro colunas:

| Denúncia | Categoria | Status | Ver |
| -------- | --------- | ------ | --- |

Além disso, **toda a linha da tabela é clicável**, permitindo acessar rapidamente os detalhes da denúncia.

A paginação foi ampliada de **5 para 10 denúncias por página**.

---

# 🔎 Busca e filtros

A página pública de denúncias possui um sistema completo de busca e filtragem.

Os filtros disponíveis incluem:

* 🔍 Texto;
* 📌 Status;
* 🏷️ Categoria;
* 🏙️ Cidade;
* 🆔 Protocolo UUID.

Os filtros avançados utilizam **dropdowns colapsáveis**, mantendo a interface organizada.

O **mapa e os gráficos reagem aos filtros aplicados**, permitindo que o usuário visualize somente os dados relacionados à pesquisa atual.

---

# ⚙️ Backend — Java + Spring Boot

O backend foi desenvolvido utilizando **Java e Spring Boot**, disponibilizando uma API REST responsável pelo gerenciamento das denúncias.

## Endpoints principais

### Buscar denúncias

```http
GET /denuncias
```

Também é possível filtrar pelo status:

```http
GET /denuncias?status=X
```

---

### Paginação

```http
GET /denuncias/paginado
```

Permite consultar as denúncias utilizando paginação.

---

### Estatísticas

```http
GET /denuncias/estatisticas
```

Retorna informações estatísticas, incluindo:

* Total de denúncias;
* Pendentes;
* Em análise;
* Resolvidas;
* Arquivadas;
* Distribuição por categoria;
* Distribuição por mês.

---

### Atualização de status

```http
PATCH /denuncias/{id}/status
```

Permite atualizar o status de uma denúncia.

Os principais estados utilizados são:

* Pendente;
* Em análise;
* Resolvido;
* Arquivada.

---

### Exclusão de denúncia

```http
DELETE /denuncias/{id}
```

Permite excluir uma denúncia através de seu identificador.

---

## 🌎 Geocodificação automática

Ao criar uma denúncia, o backend realiza automaticamente a **geocodificação do endereço** utilizando o serviço **Nominatim**, baseado nos dados do OpenStreetMap.

O processo permite obter automaticamente:

```text
Endereço
   ↓
Nominatim / OpenStreetMap
   ↓
Latitude + Longitude
   ↓
Denúncia
   ↓
Mapa
```

Dessa forma, o cidadão não precisa informar manualmente as coordenadas geográficas.

---

# 🔐 Rate Limiting

Para evitar abuso do endpoint de criação de denúncias, foi implementado um mecanismo de **Rate Limiting baseado no endereço IP**.

O limite atual é:

```text
5 denúncias por minuto por IP
```

Caso o limite seja ultrapassado, novas requisições de criação são bloqueadas temporariamente.

Essa medida contribui para:

* Redução de spam;
* Proteção da API;
* Controle de requisições;
* Maior estabilidade do sistema.

---

# 🔑 Painel Administrativo

O Fiscaliza Volpe possui um painel administrativo destinado ao gerenciamento das denúncias.

Acesse:

```text
/admin
```

O painel apresenta métricas reais provenientes do backend.

## 📊 Dashboard administrativo

São exibidos indicadores de:

* Total de denúncias;
* Pendentes;
* Em análise;
* Resolvidas;
* Arquivadas.

Também estão disponíveis gráficos de:

* Denúncias por categoria;
* Denúncias por mês.

---

## 🛠️ Gerenciamento de denúncias

O administrador pode:

* Visualizar denúncias;
* Filtrar por status;
* Abrir detalhes da denúncia;
* Alterar o status;
* Excluir denúncias;
* Confirmar ações através de modais;
* Receber notificações de sucesso, erro e informação.

### Atualização de status

O painel disponibiliza ações rápidas para alterar uma denúncia para:

* **Resolvido**
* **Em análise**
* **Arquivada**

Após a operação, o sistema apresenta um **toast de confirmação**.

### Exclusão

A exclusão de uma denúncia exige confirmação através de um **modal**, reduzindo o risco de exclusões acidentais.

### Notificações

O sistema utiliza notificações toast para informar:

* ✅ Sucesso;
* ❌ Erro;
* ℹ️ Informações.

---

# 🔐 Login Administrativo

A área administrativa possui uma tela de login.

Foi implementada a opção:

> **Lembrar minhas credenciais**

Quando ativada, as informações necessárias são armazenadas no **localStorage** do navegador para facilitar acessos posteriores.

> ⚠️ O armazenamento de credenciais no navegador deve ser utilizado com atenção em ambientes de produção. Uma evolução futura pode substituir essa abordagem por mecanismos mais robustos de gerenciamento de sessão e autenticação.

---

# 🗄️ Banco de Dados

O projeto utiliza **PostgreSQL** para persistência das denúncias.

Atualmente, o banco possui aproximadamente:

```text
1.000 denúncias
```

Os dados foram cadastrados em massa para possibilitar testes, demonstrações e geração dos gráficos da plataforma.

As denúncias estão distribuídas por:

```text
15 cidades brasileiras
```

### Distribuição aproximada por status

| Status     | Percentual |
| ---------- | ---------: |
| Pendente   |       ~40% |
| Em Análise |       ~25% |
| Resolvido  |       ~25% |
| Arquivada  |       ~10% |

### Categorias

Os registros utilizam diferentes categorias:

* Saneamento;
* Ambiental;
* Infraestrutura;
* Perturbação;
* Outros.

Essa massa de dados permite testar:

* Paginação;
* Filtros;
* Busca;
* Gráficos;
* Estatísticas;
* Mapa;
* Dashboard administrativo.

---

# 📱 Responsividade

A plataforma foi adaptada para diferentes tamanhos de tela.

## Painel Administrativo

No mobile:

* A sidebar transforma-se em um **drawer deslizante**;
* Os grids são adaptáveis;
* Cards e métricas se reorganizam;
* As funcionalidades permanecem acessíveis em telas menores.

## Página Sobre

O grid de estatísticas foi adaptado para diferentes resoluções, evitando quebra de layout.

## Home

Os labels dos gráficos foram ajustados para melhorar a visualização em telas pequenas.

## Projetos de Lei

As tabelas possuem **scroll horizontal** em dispositivos móveis para preservar a estrutura das informações.

---

# 📋 Pré-requisitos

Antes de executar o projeto localmente, é necessário possuir:

* **Node.js 18+**;
* **npm** ou **yarn**;
* **Git**;
* **Java 17+**;
* **Maven**;
* Uma instância do **PostgreSQL**.

---

# ⚙️ Como executar o projeto

## 1. Clone o repositório

```bash
git clone https://github.com/fabioarauju/Fiscaliza_volpe.git

cd Fiscaliza_volpe
```

---

## 2. Instale as dependências do frontend

```bash
npm install
```

Ou:

```bash
yarn install
```

---

## 3. Configure o banco de dados

Crie uma instância PostgreSQL e configure as informações necessárias no backend.

Exemplo:

```text
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_do_banco
```

As variáveis exatas devem seguir a configuração utilizada pelo backend Spring Boot.

---

## 4. Execute o backend

Na pasta do backend:

```bash
mvn spring-boot:run
```

Ou, caso o projeto possua Maven Wrapper:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

---

## 5. Execute o frontend

Na pasta do frontend:

```bash
npm run dev
```

O projeto estará disponível em:

```text
http://localhost:3000
```

---

# 📁 Estrutura do projeto

A estrutura pode variar conforme a organização atual dos repositórios frontend e backend.

### Frontend

```text
Fiscaliza_volpe/
├── app/
│   ├── admin/
│   ├── denuncias/
│   ├── projetos/
│   ├── dashboard/
│   └── ...
├── components/
├── data/
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

### Backend

```text
backend/
└── src/
    └── main/
        ├── java/
        │   └── ...
        └── resources/
            └── ...
```

A camada Java/Spring Boot é responsável pela API REST, regras de negócio, integração com o PostgreSQL e processamento das denúncias.

---

# 👥 Equipe

| RM       | Nome          | Função no projeto  |
| -------- | ------------- | ------------------ |
| RM565181 | Fabio         | Software Engineer  |
| RM563495 | Giullia       | Frontend Developer |
| RM563165 | Isabella      | Frontend Developer |
| RM565308 | Zilton        | Game Developer     |
| RM566202 | Maria Eduarda | Frontend Developer |

---

# 🔗 Links do projeto

* **Site publicado:** https://fiscaliza-volpe.vercel.app/
* **Repositório principal:** https://github.com/fabioarauju/Fiscaliza_volpe
* **Repositório:** https://github.com/volpebits/FizcalizaVolpe-React
* **Protótipo Figma:** https://www.figma.com/design/D49XfVXLoUWgO6SJPaf1lB/Fiscaliza-Volpe?node-id=0-1&p=f
* **Slides:** https://canva.link/jjsqvarjab8ie71
* **Vídeo demonstrativo:** ✍️ adicionar link

---

# 📌 Status atual

## ✅ Funcionalidades implementadas

### Frontend

* [x] Dashboard público;
* [x] Gráficos de gastos;
* [x] Projetos de Lei;
* [x] Integração com API da Câmara dos Deputados;
* [x] Cadastro de denúncias;
* [x] Busca de denúncias;
* [x] Filtros por status;
* [x] Filtros por categoria;
* [x] Filtros por cidade;
* [x] Busca por protocolo UUID;
* [x] Filtros avançados;
* [x] Paginação de 10 itens;
* [x] Mapa interativo;
* [x] Gráficos de denúncias;
* [x] Modal de detalhes;
* [x] Painel administrativo;
* [x] Dashboard administrativo;
* [x] Alteração de status;
* [x] Exclusão de denúncias;
* [x] Modal de confirmação;
* [x] Toasts de sucesso, erro e informação;
* [x] Login administrativo;
* [x] Opção de lembrar credenciais;
* [x] Responsividade mobile.

### Backend

* [x] API REST com Spring Boot;
* [x] PostgreSQL;
* [x] Consulta de denúncias;
* [x] Filtro por status;
* [x] Paginação;
* [x] Endpoint de estatísticas;
* [x] Atualização de status;
* [x] Exclusão de denúncias;
* [x] Geocodificação automática;
* [x] Integração com Nominatim/OpenStreetMap;
* [x] Rate limiting de 5 denúncias por minuto por IP.

### Banco de dados

* [x] Aproximadamente 1.000 denúncias;
* [x] Dados distribuídos em 15 cidades;
* [x] Diferentes categorias;
* [x] Diferentes status;
* [x] Dados preparados para geração de estatísticas e gráficos.

---

# 🔮 Próximos passos

Entre as possíveis evoluções do projeto estão:

* Implementar autenticação completa de cidadãos;
* Criar a Página do Usuário;
* Permitir que o cidadão acompanhe suas próprias denúncias;
* Implementar histórico de alterações de status;
* Adicionar notificações para cidadãos;
* Implementar upload de imagens e documentos nas denúncias;
* Evoluir o controle de acesso baseado em perfis;
* Aprimorar mecanismos de segurança;
* Implementar recursos de Inteligência Artificial;
* Desenvolver classificação automática de imagens;
* Desenvolver chatbot para triagem de denúncias;
* Implementar análises preditivas;
* Expandir os dashboards de Ciência de Dados.

---

# 🎯 Diferenciais da solução

O Fiscaliza Volpe combina **transparência pública, participação cidadã, visualização de dados e geolocalização** em uma única plataforma.

Entre os principais diferenciais estão:

* Centralização de informações públicas;
* Dashboard visual e interativo;
* Consulta de projetos de lei em tempo real;
* Registro de denúncias;
* Geolocalização automática;
* Mapa interativo;
* Busca e filtros avançados;
* Dashboard administrativo;
* Estatísticas baseadas em dados reais;
* API REST com Spring Boot;
* PostgreSQL;
* Rate limiting;
* Interface responsiva;
* Arquitetura preparada para futuras funcionalidades de IA e Ciência de Dados.

---

# 📄 Licença

Projeto acadêmico desenvolvido para o **Enterprise Challenge 2SIO 2026 — HackGov**, da **FIAP**, em parceria com a **EGESP — Escola de Governo do Estado de São Paulo**.

O projeto tem como objetivo desenvolver uma solução tecnológica capaz de facilitar o acesso às informações públicas e fortalecer a participação da população na fiscalização da gestão pública.
