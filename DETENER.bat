@echo off
title Fintech - Deteniendo servicios...
color 0C

echo.
echo  ================================================
echo   FINTECH - Deteniendo servicios
echo  ================================================
echo.

docker compose down

if %errorlevel% neq 0 (
    echo.
    echo  [AVISO] Puede que Docker no este en ejecucion o ya estaba detenido.
) else (
    echo.
    echo  ================================================
    echo   Todos los servicios han sido detenidos.
    echo  ================================================
    echo.
    echo  Los datos de la base de datos se conservaron.
    echo  Ejecuta INICIAR.bat para volver a iniciar.
)

echo.
pause
