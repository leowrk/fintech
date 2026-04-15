# ── Etapa 1: Build con Vite ───────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# URL del backend (inyectada en tiempo de build)
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Etapa 2: Servir con Nginx ─────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
