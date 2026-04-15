@echo off
title Fintech - Iniciando sistema...
color 0A

echo.
echo  ================================================
echo   FINTECH - Sistema de Financiamiento
echo  ================================================
echo.

REM ── Verificar que Docker está instalado ──────────────────────────────────
where docker >/dev/null 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Docker no esta instalado.
    echo.
    echo  Descarga e instala Docker Desktop desde:
    echo  https://www.docker.com/products/docker-desktop
    echo.
    echo  Una vez instalado, reinicia y vuelve a ejecutar este archivo.
    echo.
    pause
    exit /b 1
)

REM ── Verificar que Docker está en ejecución ────────────────────────────────
docker info >/dev/null 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Docker Desktop no esta en ejecucion.
    echo.
    echo  1. Abre Docker Desktop desde el menu Inicio
    echo  2. Espera que el icono de la barra de tareas diga "Running"
    echo  3. Vuelve a ejecutar este archivo
    echo.
    pause
    exit /b 1
)

echo  [OK] Docker esta listo.
echo.

REM ── Iniciar todos los servicios ────────────────────────────────────────────
echo  Iniciando servicios...
echo  (La primera vez puede tardar 3-5 minutos descargando imagenes)
echo.

docker compose up -d --build

if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] No se pudieron iniciar los servicios.
    echo  Revisa los mensajes anteriores para mas detalles.
    echo.
    pause
    exit /b 1
)

REM ── Esperar a que los servicios estén listos ──────────────────────────────
echo.
echo  Esperando que los servicios esten listos...
timeout /t 20 /nobreak >/dev/null

REM ── Mostrar información de acceso ─────────────────────────────────────────
echo.
echo  ================================================
echo   SISTEMA INICIADO CORRECTAMENTE
echo  ================================================
echo.
echo   Sitio Web:     http://localhost:3000
echo   Panel Admin:   http://localhost:3000/admin/login
echo   API Backend:   http://localhost:3001
echo   Base Datos:    http://localhost:5050  (pgAdmin)
echo.
echo   --- Credenciales de administrador ---
echo   Email:     admin@fintech.edu.pe
echo   Password:  Admin123!
echo.
echo  ================================================
echo.

REM ── Abrir el navegador ────────────────────────────────────────────────────
start "" "http://localhost:3000"

echo  Presiona cualquier tecla para cerrar esta ventana.
echo  Los servicios seguiran corriendo en segundo plano.
echo  Para detenerlos, ejecuta DETENER.bat
echo.
pause >/dev/null
