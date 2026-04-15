#!/bin/sh
set -e

echo ""
echo "=================================================="
echo "  FINTECH Backend - Iniciando..."
echo "=================================================="
echo ""

# Ejecutar seed de base de datos (seguro: verifica datos existentes)
echo ">> Ejecutando seed de base de datos..."
node dist/database/seed.js
echo ""

# Iniciar servidor NestJS
echo ">> Iniciando servidor en puerto 3001..."
exec node dist/main
