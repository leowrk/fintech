#!/bin/bash
# FINTECH - Script de inicio para Mac / Linux

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}  ================================================${NC}"
echo -e "${CYAN}   FINTECH - Sistema de Financiamiento${NC}"
echo -e "${CYAN}  ================================================${NC}"
echo ""

# ── Verificar Docker ──────────────────────────────────────────────────────────
if ! command -v docker &> /dev/null; then
    echo -e "${RED}  [ERROR] Docker no está instalado.${NC}"
    echo ""
    echo "  Descarga Docker Desktop desde:"
    echo "  https://www.docker.com/products/docker-desktop"
    echo ""
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}  [ERROR] Docker Desktop no está en ejecución.${NC}"
    echo ""
    echo "  Abre Docker Desktop, espera que inicie y vuelve a ejecutar."
    echo ""
    exit 1
fi

echo -e "${GREEN}  [OK] Docker está listo.${NC}"
echo ""

# ── Iniciar servicios ─────────────────────────────────────────────────────────
echo "  Iniciando servicios..."
echo "  (La primera vez puede tardar 3-5 minutos)"
echo ""

docker compose up -d --build

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}  [ERROR] No se pudieron iniciar los servicios.${NC}"
    exit 1
fi

echo ""
echo "  Esperando que los servicios estén listos..."
sleep 20

# ── Información de acceso ─────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}  ================================================${NC}"
echo -e "${GREEN}   SISTEMA INICIADO CORRECTAMENTE${NC}"
echo -e "${GREEN}  ================================================${NC}"
echo ""
echo -e "   Sitio Web:   ${CYAN}http://localhost:3000${NC}"
echo -e "   Panel Admin: ${CYAN}http://localhost:3000/admin/login${NC}"
echo -e "   API Backend: ${CYAN}http://localhost:3001${NC}"
echo ""
echo "   Credenciales Admin:"
echo "   Email:    admin@fintech.edu.pe"
echo "   Password: Admin123!"
echo ""
echo -e "  ================================================"
echo ""

# ── Abrir navegador ───────────────────────────────────────────────────────────
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "http://localhost:3000"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "http://localhost:3000" 2>/dev/null || true
fi
