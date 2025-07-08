# Dev Samurai Server

A backend REST API built with **Express.js + TypeScript**, using **PostgreSQL** and **TypeORM**. Implements secure **JWT authentication** with access and refresh tokens, and password hashing using bcrypt.

---

## 🛠 Setup Instructions

### Prerequisites

- Node.js >= 18
- PostgreSQL (local or via Docker)
- npm

### Clone & Install

```bash
git clone https://github.com/ldthien203/dev-samurai-server.git
cd dev-samurai-server
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

| Variable                    | Description               | Default                    |
| --------------------------- | ------------------------- | -------------------------- |
| `PORT`                      | Server port               | `4000`                     |
| `DATABASE_USER`             | Database user             | `db_user`                  |
| `DATABASE_HOST`             | Database host             | `db_host`                  |
| `DATABASE_DATABASE`         | Database name             | `dt_username`              |
| `DATABASE_PASSWORD`         | Database password         | `db_password`              |
| `DATABASE_PORT`             | Database port             | `db_port`                  |
| `ACCESS_TOKEN_SECRET`       | Secret for access tokens  | `your_access_token_secret` |
| `ACCESS_TOKEN_EXPIRE_TIME`  | Access token time expire  | `15 * 60 * 1000`           |
| `REFRESH_TOKEN_SECRET`      | Secret for refresh tokens | `your_fresh_token_secret`  |
| `REFRESH_TOKEN_EXPIRE_TIME` | Refresh token time expire | `7 * 24 * 60 * 60 * 1000`  |
| `CLIENT_DEV_DOMAIN`         | For cors middleware       | `your_dev_domain`          |
| `CLIENT_PRODUCT_DOMAIN`     | For cors middleware       | `your_deploy_domain`       |

### Start Development Server

```bash
npm run dev
```

### 🔐 Authentication Endpoints

| Method | Endpoint        | Description                      |
| ------ | --------------- | -------------------------------- |
| POST   | `/auth/sign-up` | Register a new user              |
| POST   | `/auth/sign-in` | Authenticate user & get tokens   |
| GET    | /me             | Get current user (requires auth) |

### 🔄 Auth Flow

- Password Hashing: User passwords are hashed using bcrypt.

- Access Token: Short-lived token for authenticated routes.

- Refresh Token: Longer-lived token used to renew access.

- JWT Middleware: Protects routes like /me by verifying token.

- Token Storage: Tokens are signed with secrets from .env. Refresh tokens are stored in cookies

### ⚙️ Design Decisions & Trade-offs

- Express.js is chosen for flexibility and simplicity.

- Prisma provides type-safe database access and easy migrations.

- JWT-based auth is used for stateless, scalable session handling.

- bcrypt ensures password security.
