# ── Etapa 1: Compilación ──────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Etapa 2: Producción ───────────────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

ENV TZ=America/Lima
ENV NODE_ENV=production

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar build compilado
COPY --from=builder /app/dist ./dist

# Directorio de uploads (persistido con volumen)
RUN mkdir -p uploads

# Script de entrada (seed + start)
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 3001
CMD ["sh", "entrypoint.sh"]
