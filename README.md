# UserHub

Sistema de gerenciamento de usuários com autenticação via token.

## Stack

- **Backend:** PHP 8.3, Laravel 13, Laravel Sanctum, SQLite
- **Frontend:** React 19, Vite, Axios

## Como rodar

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

## Credenciais padrão

- **Email:** admin@admin.com
- **Senha:** admin123