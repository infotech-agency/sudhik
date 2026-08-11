# E-commerce Backend

A complete, production-ready-but-simple e-commerce **backend** built with
**Node.js + Express + MongoDB (Mongoose)** using an **MVC** architecture.
It is designed to be consumed by two separate frontend apps later:

- an **Admin Dashboard** (React) for store management
- a **Main Website** (React / Next.js) for customers

No frontend is included — this is backend only.

---

## Features

- **Authentication**
  - Admin login (email + password, JWT)
  - User signup / login (email + password, JWT)
  - Google OAuth login (Passport.js)
  - Guest checkout (no login required) — a `User` record with `isGuest: true`
    is created from the checkout form
- **Product management (admin CRUD)**
  - Title, description, price, discount price, stock, SKU, category
  - Up to **5 images per product** uploaded to Cloudinary (multer + Cloudinary storage)
  - Detailed sections: description, benefits, ingredients, how to use,
    specifications, shipping info, product information, FAQ
- **Reviews** — 1–5 star rating + comment, linked to product + user (guest name
  allowed), average rating stored on the product
- **Cart** — server-side cart for guests (cart token) and logged-in users
- **Checkout & Orders**
  - **COD** → order created immediately, pushed to Shiprocket
  - **ONLINE** → PhonePe payment initiated → on success (verify / webhook)
    order is confirmed, stock decremented, and pushed to Shiprocket
  - Shiprocket order id, shipment id, AWB code, and shipment status stored on
    the order; order status tracking (Processing, Shipped, Delivered, Cancelled)
- **Admin dashboard APIs** — totals, revenue, monthly sales report, per-user
  spend, user list, low-stock report
- **Integrations**: Cloudinary, Shiprocket, PhonePe, Google OAuth

---

## Tech Stack

| Concern        | Choice                              |
| -------------- | ----------------------------------- |
| Runtime        | Node.js + Express                   |
| Database       | MongoDB + Mongoose                  |
| Auth           | JWT (jsonwebtoken) + bcryptjs       |
| OAuth          | Passport.js (Google OAuth 2.0)      |
| Images         | Cloudinary (multer-storage-cloudinary) |
| Payments       | PhonePe Payment Gateway             |
| Shipping       | Shiprocket API v2                   |
| Validation     | express-validator                   |
| HTTP client    | axios                               |

---

## Folder Structure (MVC)

```
/config        -> db connection, cloudinary, phonepe, shiprocket, passport configs
/models        -> User, Category, Product, Review, Cart, Order
/controllers   -> authController, productController, reviewController,
                  orderController, cartController, dashboardController
/routes        -> authRoutes, productRoutes, reviewRoutes, cartRoutes,
                  orderRoutes, dashboardRoutes
/middlewares   -> auth (protect/admin/optionalAuth), errorHandler, upload, notFound
/services      -> shiprocketService, phonepeService, cloudinaryService
/utils         -> generateToken, apiResponse, validators, id, seed
server.js      -> express app entry point
.env.example   -> all required environment variables
api.http       -> REST Client test file covering every endpoint
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example file and fill in your real credentials:

```bash
cp .env.example .env
```

Required env vars (all documented in `.env.example`):

| Key                              | Purpose                                        |
| -------------------------------- | ---------------------------------------------- |
| `PORT`                           | Server port (default 5000)                     |
| `MONGODB_URI`                    | MongoDB connection string                      |
| `JWT_SECRET`                     | Secret used to sign JWTs                       |
| `JWT_EXPIRES_IN`                 | JWT lifetime (e.g. `7d`)                       |
| `GOOGLE_CLIENT_ID` / `_SECRET`   | Google OAuth credentials                       |
| `GOOGLE_CALLBACK_URL`            | e.g. `http://localhost:5000/api/auth/google/callback` |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | Cloudinary credentials            |
| `PHONEPE_MERCHANT_ID` / `_SALT_KEY` / `_SALT_INDEX`  | PhonePe merchant + salt         |
| `PHONEPE_BASE_URL`               | Sandbox or production base URL                 |
| `PHONEPE_REDIRECT_URL`           | Frontend URL to redirect after payment         |
| `SHIPROCKET_EMAIL` / `_PASSWORD` | Shiprocket login                               |
| `SHIPROCKET_PICKUP_LOCATION`     | Pickup location name registered in Shiprocket  |

### 3. Seed sample data (optional)

Creates an admin account (`admin@example.com` / `admin123`), a category, and
two sample products so you can try the API immediately:

```bash
npm run seed
```

### 4. Run the server

```bash
npm start          # production
npm run dev        # development with auto-reload (node --watch)
```

The server starts on `http://localhost:5000`.

### 5. Test the API

Open `api.http` in VS Code with the **REST Client** extension and click
"Send Request" on each entry. See the "API Endpoints" section below.

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Path                    | Auth   | Description                                      |
| ------ | ----------------------- | ------ | ------------------------------------------------ |
| POST   | `/admin/create`         | none   | Create the initial admin account (first run only)|
| POST   | `/admin/login`          | none   | Admin login, returns JWT                         |
| POST   | `/signup`               | none   | User signup (email + password)                   |
| POST   | `/login`                | none   | User login (email + password)                    |
| GET    | `/google`               | none   | Start Google OAuth flow                          |
| GET    | `/google/callback`      | none   | Google OAuth callback (redirects with token)     |
| GET    | `/me`                   | user   | Get current user from token                      |

### Products (`/api/products`)

| Method | Path                  | Auth   | Description                                       |
| ------ | --------------------- | ------ | ------------------------------------------------- |
| GET    | `/`                   | none   | List active products (filters: search, category, minPrice, maxPrice, page, limit) |
| GET    | `/:id`                | none   | Get a single product (by id or slug)              |
| POST   | `/`                   | admin  | Create product (multipart, up to 5 images)        |
| PUT    | `/:id`                | admin  | Update product (JSON and/or new images)           |
| DELETE | `/:id`                | admin  | Delete product (also removes Cloudinary images)   |
| GET    | `/admin`              | admin  | List all products including inactive              |
| GET    | `/categories/all`     | none   | List all categories                               |
| POST   | `/categories`         | admin  | Create a category                                 |
| DELETE | `/categories/:id`     | admin  | Delete a category (unsets it on products)         |

### Reviews (`/api/reviews`)

| Method | Path                  | Auth        | Description                                |
| ------ | --------------------- | ----------- | ------------------------------------------ |
| GET    | `/product/:productId` | none        | List all reviews for a product             |
| POST   | `/product/:productId` | optional    | Add a review (guests send `guestName`)     |
| DELETE | `/:id`                | owner/admin | Delete a review                            |

### Cart (`/api/cart`)

Guests send their cart token via the `x-cart-token` response/header. Logged-in
users are identified by their JWT.

| Method | Path      | Auth     | Description                                  |
| ------ | --------- | -------- | -------------------------------------------- |
| GET    | `/`       | optional | Get/create cart                             |
| POST   | `/`       | optional | Add item to cart                             |
| PUT    | `/`       | optional | Update item quantity                         |
| DELETE | `/`       | optional | Remove an item                               |
| DELETE | `/clear`  | optional | Clear the cart                               |

### Orders (`/api/orders`)

| Method | Path                  | Auth   | Description                                              |
| ------ | --------------------- | ------ | -------------------------------------------------------- |
| POST   | `/`                   | none   | Checkout — COD creates order; ONLINE initiates PhonePe   |
| POST   | `/verify-payment`     | none   | Verify a PhonePe payment by `merchantTransactionId`      |
| POST   | `/phonepe/webhook`    | none   | PhonePe webhook (server-to-server)                       |
| GET    | `/me`                 | user   | List the current user's orders                           |
| GET    | `/me/:id`             | user   | Get one of the current user's orders                     |
| GET    | `/`                   | admin  | List all orders (filters: status, paymentStatus)         |
| GET    | `/:id`                | admin  | Get a single order                                       |
| PUT    | `/:id/status`         | admin  | Update order status                                      |
| POST   | `/:id/awb`            | admin  | Generate AWB via Shiprocket                              |
| GET    | `/:id/track`          | admin  | Track shipment via Shiprocket                            |
| PUT    | `/:id/cancel`         | admin  | Cancel an order (restores stock, cancels on Shiprocket)  |

### Dashboard (`/api/dashboard`) — all admin only

| Method | Path               | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/summary`         | Totals: orders, revenue, products, users     |
| GET    | `/monthly-sales`   | Units sold + revenue per month (?year=)      |
| GET    | `/user-spend`      | Per-user spend + order count                 |
| GET    | `/users`           | List all users (paginated)                   |
| GET    | `/low-stock`       | Products at or below a stock threshold       |

---

## How COD vs Online Payment Works

### COD (Cash on Delivery)

```
Customer -> POST /api/orders { paymentMethod: "COD", items, shippingAddress }
  1. Server validates items and computes total from current product prices.
  2. Order is saved with paymentStatus = "PENDING".
  3. Stock is decremented immediately.
  4. Order is pushed to Shiprocket in the background (best-effort).
  5. Source cart is cleared.
  6. Order is returned to the client.
```

No payment gateway is involved. The admin marks the order as Delivered after
the courier collects payment.

### ONLINE (PhonePe)

```
Customer -> POST /api/orders { paymentMethod: "ONLINE", items, shippingAddress }
  1. Server validates items and computes total.
  2. Order is saved with paymentStatus = "PENDING" and a merchantTransactionId.
  3. PhonePe /pg/v1/pay is called; a payment URL is returned to the client.
  4. Customer is redirected to the PhonePe payment page.

Customer returns -> POST /api/orders/verify-payment { merchantTransactionId }
  1. Server calls PhonePe /pg/v1/status to check the payment state.
  2. If COMPLETED -> paymentStatus = "PAID", stock decremented, Shiprocket push.
  3. If not -> paymentStatus = "FAILED", returns 402.

PhonePe server -> POST /api/orders/phonepe/webhook { response: <base64> }
  1. Server decodes the base64 payload and inspects the code/state.
  2. On PAYMENT_SUCCESS -> marks PAID, decrements stock, pushes to Shiprocket.
  3. Otherwise -> marks FAILED.
```

> **Important:** for ONLINE orders, stock is only decremented after payment is
> confirmed. This avoids overselling if a customer abandons the payment page.

---

## How Shiprocket Order Push Works

After an order is confirmed (COD at creation, ONLINE after payment success),
the server calls Shiprocket's `POST /v1/external/orders/create/adhoc` endpoint
with the order details (items, billing/shipping address, payment method, total).
The response provides:

- `shiprocketOrderId` — Shiprocket's internal order id
- `shiprocketShipmentId` — the shipment id, used for AWB generation and tracking

Both are saved on the Order document. The push happens in the background and
is **best-effort**: if Shiprocket is down, the order still succeeds in our
database and the admin can retry from the dashboard via:

- `POST /api/orders/:id/awb` — generate an AWB for the shipment
- `GET /api/orders/:id/track` — fetch tracking timeline
- `PUT /api/orders/:id/cancel` — cancel on Shiprocket and restore stock

Shiprocket authentication uses email/password login; the resulting bearer token
is cached in-process for ~9 days and refreshed automatically on 401.

---

## Connecting Frontends Later

This backend is API-only (JSON). Two separate frontend projects can consume it:

### Admin Dashboard (React)

- Use the admin JWT (from `POST /api/auth/admin/login`) as a Bearer token.
- Call `/api/products/admin`, `/api/products` (POST/PUT/DELETE),
  `/api/orders` (GET/PUT), and `/api/dashboard/*` to build the dashboard.
- Display order lists with payment + shipment status, update order status,
  generate AWBs, and view sales reports.

### Main Website (React / Next.js)

- No auth required for browsing (`GET /api/products`, `GET /api/reviews`).
- Optional user login via `POST /api/auth/login` or Google OAuth for a
  personalized experience.
- Use `/api/cart` with a guest `x-cart-token` (or the user JWT) to manage the
  cart server-side.
- Checkout via `POST /api/orders` with either `COD` or `ONLINE`.
- For ONLINE, redirect the browser to the `paymentUrl` returned by the API,
  then call `/api/orders/verify-payment` after the user returns.

### CORS

The server enables CORS with `origin: true, credentials: true`, so any frontend
origin is accepted. Tighten this in production by setting a specific origin.

---

## Notes

- **Security**: passwords are hashed with bcrypt; JWTs protect admin/user
  routes; input is validated with express-validator; a central error handler
  returns consistent JSON errors.
- **Image limits**: max 5 images per product, 5 MB per image, image types only.
- **Reviews**: one review per logged-in user per product; guests can review
  with a `guestName`.
- **Stock**: decremented on COD order creation and on ONLINE payment success;
  restored on cancellation.
- **Error shape**: `{ success: boolean, message: string, code?: string }`.
