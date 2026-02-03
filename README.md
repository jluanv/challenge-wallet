# Finance Wallet 🪙  Projeto monorepo utilizando **pnpm workspaces**,
contendo:  
- **`packages/validations`** → biblioteca interna de validações.  
- **`apps/api`** → backend (NestJS + Prisma).   
- **`apps/web`** → frontend (React/Next.js).  

---  ## 📦 Pré-requisitos  
- [Node.js 20+](https://nodejs.org/)   
- [pnpm](https://pnpm.io/) instalado globalmente:   
```bash   npm install -g pnpm```

Criar na raiz:
- **.env**
- **.env.test.local** -> para rodar os testes no banco de testes

Docker e Docker Compose

🚀 Como rodar o projeto

1. Instalar dependências
Na raiz do projeto:
pnpm install

2. Build do pacote @finance/validations
Antes de rodar o backend e o frontend, é necessário compilar o pacote de validações:
pnpm --filter @finance/validations build

Isso gera os arquivos em dist/ que serão usados pelo back e pelo front.

3. Subir containers com Docker
Na raiz do projeto:
docker compose up --build

Isso vai:

Subir o banco Postgres com os bancos finance_wallet e finance_test.

4. Rodar em modo desenvolvimento
Na raiz do projeto:
pnpm run dev

👉 Esse comando sobe API e Frontend juntos, aproveitando o monorepo

🖥️ Acessos

API → http://localhost:3001

Frontend → http://localhost:3000

🧪 Testes Unitários
pnpm test:unit
Integração
pnpm test:integration

👉 Dentro do Docker, os testes já usam automaticamente o banco finance_test.

📂 Estrutura
finance-wallet/ ├── apps/ │   ├── api/        
# Backend NestJS │   

└── web/        
# Frontend React/Next.js ├── packages/ │   └── validations # Biblioteca interna de validações ├── docker-compose.yml ├── pnpm-workspace.yaml
