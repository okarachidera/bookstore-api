# Bookstore API

An Express + TypeScript REST API for managing authors, their published books, and authenticated users. The service uses MongoDB (via Mongoose), enforces validation with Joi, paginates collection responses, and protects every data endpoint with JWT-based authentication.

## Key Features

- CRUD endpoints for Authors, Books, and Users with strict data validation.
- Pagination helpers (default 5 items/page) and metadata returned for both Authors and Books collections.
- JWT authentication & authorization middleware so only registered users can access protected routes.
- Centralized request validation via Joi and file upload hooks (Cloudinary-ready).
- Automated test suite powered by Jest, Supertest, and mongodb-memory-server.

## Tech Stack

- **Runtime:** Node.js + Express
- **Language:** TypeScript (compiled to CommonJS)
- **Database:** MongoDB via Mongoose
- **Auth:** JWT + bcrypt
- **Testing:** Jest, Supertest, mongodb-memory-server
- **Views:** EJS landing page for quick project introduction

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm 9+ (project is npm-first; do not mix with Yarn)
- A MongoDB connection string (local or hosted)

### Installation

```bash
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api
cp .env.example .env   # fill in real secrets
npm install
```

### Environment Variables

Create a `.env` file (or set the vars in your hosting provider) using `.env.example` as a guide:

| Variable | Description |
| --- | --- |
| `MONGO_URL` | MongoDB connection string used in non-test environments. |
| `JWT_SECRET_KEY` | Secret key used to sign JWT access tokens. |
| `JWT_EXPIRES_IN` | Token lifetime (e.g., `1d`, `12h`). |
| `PORT` | Optional HTTP port (defaults to 3000). |
| `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET` | Only required if you enable Cloudinary uploads. |

> Test runs (`NODE_ENV=test npm test`) use mongodb-memory-server and ignore `MONGO_URL`.

### Available npm Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Hot-reload dev server. Watches `src/`, rebuilds TypeScript into `dist/`, then restarts `bin/www`. |
| `npm start` | Production start. Automatically runs `npm run build` first, then `node ./bin/www`. |
| `npm run build` | Compile TypeScript (`src/`) into JavaScript (`dist/`). |
| `npm run clean` | Remove and recreate the `dist/` directory. |
| `npm test` | Runs Jest + Supertest suite (uses in-memory Mongo). |
| `npm run compile` | `tsc -w` watch mode; useful if you prefer building in a separate terminal. |

### Running Locally

1. `npm run dev` to start the API with automatic rebuilds.
2. Visit `http://localhost:3000` (auto-redirects to Swagger UI at `/docs`) to browse endpoints.
3. Alternatively, use the Postman collection below. Signup/login to obtain a JWT, then call `/author/*` routes with your `Authorization: Bearer <token>`.

### Testing

```bash
NODE_ENV=test npm test
```

Supertest spins up the Express server and mongo-memory-server supplies an isolated database. Close the process when finished to release the temporary Mongo instance.

## Deployment

Any platform that runs Node.js can host this project. Popular zero-cost-friendly targets:

1. **Render Web Service** – connect your GitHub repo, set the environment variables above (plus `NODE_ENV=production`), and use the default npm build/start commands.
2. **Railway** – import the repo, add your Mongo connection (or use their add-on), and set the same env vars. Railway offers preview deployments for every PR.
3. **Fly.io / Koyeb** – use the existing `Dockerfile`, set secrets (`fly secrets set …` or Koyeb console), and deploy globally behind HTTPS.

> Remember to configure a production-grade MongoDB instance (MongoDB Atlas or a managed database) before sharing the app publicly.

## API & Documentation

- Swagger UI (local): `http://localhost:3000/docs`
- Live reference (if deployed): `https://book-test-api.herokuapp.com/`
- Postman docs: https://documenter.getpostman.com/view/18331158/UVXhpG9q

## Contributing

1. Fork the repo and create a feature branch.
2. Run `npm run dev` while coding; add/update tests where relevant.
3. Ensure `npm test` passes and add/update documentation.
4. Submit a pull request with a clear description of the change.

Issues and feature suggestions are welcome—open a ticket if you spot bugs or want to request enhancements. Happy hacking!
