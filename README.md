# UserHub

Projeto de estudo desenvolvido para praticar a construção de uma API REST completa com Laravel, explorando autenticação via token, recursos de API, validações e integração com um frontend desacoplado em React.

## Sobre o projeto

A ideia foi construir um gerenciador de usuários com uma arquitetura organizada e separação clara entre backend e frontend. O foco foi entender como as camadas se conectam: o Laravel recebe a requisição, o Sanctum autentica via Bearer token, o Controller aplica as regras, o Eloquent fala com o banco, e o React consome a API e renderiza a interface. O Axios foi adicionado com interceptors para gerenciar o token e tratar erros globais de autenticação.

## Tecnologias utilizadas

- **PHP 8.3** + **Laravel 13**
- **Laravel Sanctum** — autenticação stateless via Bearer token
- **Eloquent ORM** — comunicação com o banco de dados
- **SQLite** — banco de dados para desenvolvimento
- **React 19** + **Vite** — SPA com roteamento client-side
- **Axios** — cliente HTTP com interceptors de autenticação
- **React Router DOM** — gerenciamento de rotas e guards

## Arquitetura

O projeto adota uma arquitetura desacoplada com backend API e frontend SPA independentes:

```
apirest-backend/
├── app/Http/Controllers/
│   ├── AuthController.php       # login e logout com Sanctum
│   └── UserController.php       # CRUD de usuários com paginação
├── app/Http/Requests/
│   ├── StoreUserRequest.php     # validação de criação
│   └── UpdateUserRequest.php    # validação de atualização
├── app/Http/Resources/
│   ├── UserResource.php         # serialização de um usuário
│   └── UserCollection.php       # serialização da coleção paginada
├── app/Models/
│   └── User.php                 # model com fillable e hidden via atributos PHP 8
└── database/
    ├── migrations/              # versão do esquema do banco
    ├── factories/               # geração de dados de teste
    └── seeders/                 # popula o banco com admin padrão

apirest-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx             # listagem paginada de usuários
│   │   ├── Login.jsx            # formulário de autenticação
│   │   └── Register.jsx         # formulário de criação e edição
│   ├── components/
│   │   ├── common/              # Button, Input, Form, Loader, Modal, FieldError
│   │   └── layout/              # Navbar, BoxUser
│   ├── routes/Routes.jsx        # roteamento com guard PrivateRoute
│   └── services/api.js          # instância Axios com interceptors
```

O **Laravel** expõe uma API REST stateless protegida por Sanctum.  
O **React** consome essa API, armazena o token no `localStorage` e protege as rotas client-side via `PrivateRoute`.

## Como rodar localmente

**Pré-requisitos:** PHP 8.1+, Composer, Node.js

### Backend

```bash
cd apirest-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend

```bash
cd apirest-frontend
npm install
npm run dev
```

O backend estará disponível em `http://127.0.0.1:8000` e o frontend em `http://localhost:5173`.

Caso queira apontar o frontend para outra URL de API, crie um `.env` na pasta `apirest-frontend`:

```
VITE_API_URL=http://127.0.0.1:8000/api
```

## Credenciais padrão

| Campo | Valor |
|-------|-------|
| Email | admin@admin.com |
| Senha | admin123 |

## Rotas da API

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/login` | ❌ | Autentica e retorna Bearer token |
| POST | `/api/logout` | ✅ | Invalida o token atual |
| GET | `/api/users` | ✅ | Lista usuários com paginação (10/página) |
| POST | `/api/users` | ✅ | Cadastra um novo usuário |
| GET | `/api/users/{id}` | ✅ | Retorna dados de um usuário |
| PUT | `/api/users/{id}` | ✅ | Atualiza dados de um usuário |
| DELETE | `/api/users/{id}` | ✅ | Remove um usuário |

## Validações

Toda entrada de dados é validada no servidor antes de persistir:

- **Nome** — obrigatório
- **E-mail** — obrigatório, formato válido, único na tabela de usuários
- **Data de nascimento** — opcional, data válida anterior ao dia atual

## Deploy

O projeto está publicado com backend no **Railway** e frontend na **Vercel**, cada serviço no seu repositório dedicado.

### Backend — Railway

O Railway detecta automaticamente o projeto Laravel e provisiona o ambiente PHP. As variáveis de ambiente são configuradas pelo painel do Railway:

| Variável | Valor |
|----------|-------|
| `APP_ENV` | `production` |
| `APP_KEY` | gerada via `php artisan key:generate --show` |
| `APP_URL` | URL gerada pelo Railway |
| `DB_CONNECTION` | `pgsql` (Railway injeta `DATABASE_URL` automaticamente via plugin PostgreSQL) |
| `SESSION_DRIVER` | `database` |
| `CACHE_STORE` | `database` |

Após o primeiro deploy, é necessário rodar as migrations pelo terminal do Railway:

```bash
php artisan migrate --seed --force
```

O CORS está configurado para aceitar qualquer origem (`allowed_origins: ['*']`), portanto não são necessárias configurações adicionais de domínio.

### Frontend — Vercel

A Vercel detecta o Vite automaticamente. A única configuração necessária é a variável de ambiente com a URL do backend:

| Variável | Valor |
|----------|-------|
| `VITE_API_URL` | URL do backend no Railway + `/api` |

O arquivo `vercel.json` já está configurado para redirecionar todas as rotas para o `index.html`, necessário para o React Router funcionar corretamente em produção:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## O que aprendi

- Como o Sanctum implementa autenticação stateless com tokens de acesso pessoal
- Como estruturar Form Requests para centralizar regras de validação por operação
- Como usar API Resources para controlar a serialização e desacoplar o modelo da resposta
- Como configurar interceptors no Axios para injetar o token e tratar 401 globalmente
- Como proteger rotas client-side com um guard baseado em token no localStorage
- Como o padrão `UserCollection` + `UserResource` controla a serialização da resposta paginada
- Como o `config/cors.php` do Laravel 11 substitui o middleware manual para liberar origens externas em produção
- Como o `vercel.json` com rewrite catch-all resolve o problema de 404 em rotas SPA
- Como separar backend e frontend em serviços independentes e conectá-los via variável de ambiente