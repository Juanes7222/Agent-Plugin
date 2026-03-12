@echo off
echo Desinstalando Radio Agent...
echo.

net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Debes ejecutar este archivo como Administrador.
    echo Clic derecho sobre el archivo ^> Ejecutar como administrador
    pause
    exit /b 1
)

node uninstall-service.js

echo.
echo Servicio desinstalado.
pause
