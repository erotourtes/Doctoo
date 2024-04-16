# doctoo

WIP.

## Installation

1. Install [nvm](https://github.com/nvm-sh/nvm) (Optional).
2. Install node `v18` or high.
3. Activate corepack - `corepack enable`.
4. Clone repository -
   `git clone --branch feature/new-boilerplate https://github.com/Radency/internship-2024-doctoo`.
5. Install all dependencies - `pnpm i -r`.

## Docker Development

1. Rename `.env.dev.example` to `.env.dev` and fill all variables.
2. Run `docker compose -f docker-compose.dev.yaml --env-file=.env.dev up --build -d`.
3. Use psql connection string `postgresql://[user]:[pass]@localhost:[port]/[db]?schema=public` for
   `DATABASE_URL` inside `./apps/backend/.env`.
4. Done. Check all containers - `docker ps`.

## Docker Production

1. Rename `.env.prod.example` to `.env.prod` and fill all variables.
2. Run `docker compose -f docker-compose.prod.yaml --env-file=.env.prod up --build -d`.
3. Done. Check all containers - `docker ps`.

> To stop prod or dev containers, you need run
> `docker compose -f docker-compose.[dev|prod].yaml down`.

## Conventional Commits

We must use [CC standarts](https://www.conventionalcommits.org/en/v1.0.0/).
