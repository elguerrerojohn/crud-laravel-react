# Prueba Técnica — Sistema CRUD Productos (Laravel 11 API + React 18 TS)

CRUD completo de **Productos** (nombre, descripción, precio, cantidad),
con buenas prácticas, validación, paginación, autenticación por token, y frontend moderno.

## Estructura

- `backend/` → Laravel 11 (API REST)
- `frontend/` → React 18 + TypeScript + Vite + Tailwind + React Query

## Requisitos

- PHP >= 8.2, Composer 2.x
- Node >= 18 (recomendado 20+), npm o pnpm
- MySQL

---

## Backend (Laravel 11 API)

### 1) Instalación

cd backend
cp .env.example .env 
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

Por defecto se crea un usuario de prueba:

- **Email:** `admin@demo.com`
- **Password:** `password`

### 2) Autenticación (Sanctum — Personal Access Tokens)

1. Login y obtén token
2. Usa el token en `Authorization: Bearer <token>` para rutas protegidas

### 3) Endpoints principales (v1)

Base URL: `http://127.0.0.1:8000/api/v1`

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/productos` | Listado paginado + búsqueda | Sí |
| POST | `/productos` | Crear producto | Sí |
| GET | `/productos/{id}` | Ver detalle | Sí |
| PUT/PATCH | `/productos/{id}` | Actualizar producto | Sí |
| DELETE | `/productos/{id}` | Eliminar (soft delete) | Sí |



## Frontend (React + TS)

### 1) Instalación y ejecución

```bash
cd frontend
npm install
npm run dev

Configura la URL del backend en `frontend/.env`:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

### 2) Flujo

1. Inicia sesión en `/login`
2. Administra productos en `/productos`


NOTAS: No hay que crear tablas en la base de datos porque ya esta definida en migraciones (tabla productos).