@echo off
echo Instalando Radio Agent como servicio de Windows...
echo.

:: Verificar que se esta ejecutando como administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Debes ejecutar este archivo como Administrador.
    echo Clic derecho sobre el archivo ^> Ejecutar como administrador
    pause
    exit /b 1
)

:: Instalar dependencias si no existen
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)

:: Instalar el servicio
node install-service.js

echo.
echo Listo. El servicio Radio Agent esta corriendo y arrancara automaticamente con Windows.
pause
