#!/bin/sh

echo ""
echo "=================================================="
echo "  FINTECH Backend - Iniciando..."
echo "=================================================="
echo ""

# Ejecutar seed (si falla, se loguea pero el servidor igual arranca)
echo ">> Ejecutando seed de base de datos..."
node dist/database/seed.js || echo "⚠️  Seed omitido (reintentará en próximo deploy)"
echo ""

# Iniciar servidor NestJS
echo ">> Iniciando servidor en puerto 3001..."
exec node dist/main
