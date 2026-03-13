@echo off
title GeoClass Auto-Commit Watcher
color 0A

echo.
echo  ╔═══════════════════════════════════════════════╗
echo  ║   GIT AUTO-COMMIT WATCHER - Setup ^& Launch   ║
echo  ╚═══════════════════════════════════════════════╝
echo.

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Python not found. Install from https://python.org
    pause
    exit /b 1
)

echo  [1/3] Installing dependencies...
pip install watchdog colorama --quiet --break-system-packages 2>nul || pip install watchdog colorama --quiet

echo  [2/3] Checking Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Git not found. Install from https://git-scm.com
    pause
    exit /b 1
)

echo  [3/3] Launching watcher...
echo.

:: Run the watcher in the current directory
:: Change the path below if needed:
python "%~dp0auto_commit_watcher.py" --path "." --style smart

pause
