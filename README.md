# doctoo

WIP.

## Installation

1. Install [nvm](https://github.com/nvm-sh/nvm) (Optional).
2. Install node `v18` or high.
3. Activate corepack - `corepack enable`.
4. Clone repository - `git clone https://github.com/Radency/internship-2024-doctoo`.
5. Install all dependencies - `pnpm i -r`.

## Development

1. Make sure you are in the `development` branch.
2. Create a new branch from the `development` branch with the name of what you are going to do.
3. Make the necessary changes and create a PR that will be directed to the `development` branch.

## Docker

### Development Mode

1. Create `.env.dev` from `.env.dev.example` and fill all variables.
2. In backend create `.env` from `.env.example` and fill all variables.
3. Run `docker compose -f docker-compose.dev.yaml --env-file=.env.dev up -d`.
4. Use psql connection string `postgresql://[user]:[pass]@localhost:[port]/[db]?schema=public` for
   `DATABASE_URL` inside `./apps/backend/.env` file.
5. Done. When running locally, the backend should have a connection to the database.

### Production Mode

1. Create `.env.prod` from `.env.prod.example` and fill all variables.
2. Run `docker compose -f docker-compose.prod.yaml --env-file=.env.prod up --build -d`.
3. Done. With the `docker ps` command you should see the database, backend, frontend and more
   additional services.

> To stop **prod** or **dev** containers, you need run
> `docker compose -f docker-compose.[dev|prod].yaml down`.

## Conventional Commits

We must use [CC standarts](https://www.conventionalcommits.org/en/v1.0.0/).
