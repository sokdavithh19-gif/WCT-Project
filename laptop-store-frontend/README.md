# Nordkit — React Frontend for the Laravel Laptop Store API

This is the React frontend for the Laravel API delivered previously
(`laptop-store-api.zip`). It talks to that backend over REST — browsing,
cart, checkout, order history, and (for admins) a dashboard with full
laptop/order/user management.

## What's in this package

```
laptop-store-frontend/
├── src/                  React app (components, pages, context, api calls)
├── database/schema.sql   Full MySQL schema + seed data (same shape as
│                         the Laravel migrations — use this OR
│                         `php artisan migrate --seed`, not both)
├── backend-patch/
│   └── config/cors.php   Drop-in replacement so the Laravel API accepts
│                         requests from the React dev server
└── .env.example          Points the frontend at your API URL
```

## 1. Set up the database

Pick one:

**Option A — Laravel migrations (recommended, matches the backend exactly)**
```bash
# inside the Laravel project
php artisan migrate --seed
```

**Option B — Run the SQL directly**
```bash
mysql -u root -p < database/schema.sql
```
Then point the Laravel `.env` at it:
```
DB_DATABASE=laptop_store
DB_USERNAME=root
DB_PASSWORD=your_password
```
Either way you get the same seeded accounts: `admin@example.com` /
`user@example.com`, password `password` for both.

## 2. Connect the backend to the frontend (CORS)

Laravel blocks cross-origin requests by default. Copy the CORS config in
this package into the backend:

```bash
cp backend-patch/config/cors.php /path/to/laptop-store-api/config/cors.php
```

This allows `http://localhost:5173` (the Vite dev server) to call the API
with an `Authorization: Bearer <token>` header.

Start the backend:
```bash
cd /path/to/laptop-store-api
php artisan serve   # http://localhost:8000
```

## 3. Run the frontend

```bash
cd laptop-store-frontend
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:8000/api
npm run dev                # http://localhost:5173
```

Log in with the seeded admin to see `/admin`, or the seeded user to shop
and check out as a customer.

## How the frontend maps to the backend

| Frontend feature | Backend endpoint(s) |
|---|---|
| Register / login / logout | `POST /register`, `POST /login`, `POST /logout` |
| Browse / search / filter laptops | `GET /laptops` |
| Product detail | `GET /laptops/{id}` |
| Cart (add/update/remove) | `GET|POST /cart`, `/cart/items[/{id}]` |
| Checkout | `POST /checkout` |
| Order history | `GET /orders`, `GET /orders/{id}` |
| Admin dashboard stats | `GET /admin/dashboard` |
| Admin inventory CRUD | `GET|POST|PUT|DELETE /admin/laptops[/{id}]` |
| Admin order management | `GET /admin/orders`, `PATCH /admin/orders/{id}/status` |
| Admin user management | `GET /admin/users`, `PATCH /admin/users/{id}/role` |

**Wishlist/favorites** and **saved addresses** are implemented client-side
(localStorage) — the backend has no tables for these yet. They work fine
for a single browser, but won't sync across devices. If you want them
persisted server-side, I can add a `favorites` table + endpoints and an
`addresses` table + endpoints to the Laravel backend to match.

## Architecture

- **State management**: three React Context providers —
  `AuthContext` (session, login/register/logout, role), `CartContext`
  (syncs with the backend cart on every mutation), `FavoritesContext`
  (local wishlist).
- **Routing**: React Router, with `ProtectedRoute` (any logged-in user)
  and `AdminRoute` (role === 'admin') guards wrapping the relevant routes.
- **API layer**: `src/api/*.js` — one file per resource, all requests go
  through a shared Axios instance (`src/api/client.js`) that attaches the
  bearer token and clears it on a 401.
- **Design system**: CSS variables in `src/index.css` — a graphite/cobalt
  palette with a monospace "spec strip" component used throughout (product
  cards, detail page, admin tables) since laptops are sold by spec sheet.

## Notes for production

- Swap `VITE_API_URL` to your deployed API domain and update
  `allowed_origins` in `config/cors.php` to your deployed frontend domain.
- Consider adding `throttle:6,1` to `/login` and `/register` in the
  backend for basic brute-force protection.
- The admin role-promotion endpoint (`PATCH /admin/users/{id}/role`) is
  powerful — restrict who has admin access to trusted seeded/promoted
  accounts only.
