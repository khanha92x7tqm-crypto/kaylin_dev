@echo off
cd /d "%~dp0"
where python >nul 2>nul
if %errorlevel%==0 (set PY=python) else (set PY=py)
echo Starting local server: http://localhost:8000/
start "" http://localhost:8000/
%PY% -m http.server 8000
