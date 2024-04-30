FROM node:18-slim AS build

WORKDIR /app

COPY .npmrc ./apps/frontend ./

RUN corepack enable

RUN pnpm i

ARG VITE_BACKEND_API_URL
ARG VITE_STRIPE_API_KEY
ARG VITE_S3_BASE_URL

RUN VITE_S3_BASE_URL=${VITE_S3_BASE_URL} VITE_STRIPE_API_KEY=${VITE_STRIPE_API_KEY} VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL} pnpm build

FROM devforth/spa-to-http:latest

COPY --from=build /app/dist .