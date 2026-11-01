@echo off
setlocal EnableExtensions DisableDelayedExpansion
set "RUN_NO_PAUSE="
set "RUN_CHECK_ONLY="
for %%A in (%*) do (
    if /I "%%~A"=="--no-pause" set "RUN_NO_PAUSE=1"
    if /I "%%~A"=="--check" set "RUN_CHECK_ONLY=1"
)
pushd "%~dp0" >nul 2>&1
if errorlevel 1 goto directory_error

echo.
echo === Aniket Sidhu Portfolio ===
echo.
if not exist "server.py" (
    echo [ERROR] server.py is missing from the project folder.
    goto failed
)
if not exist ".venv\Scripts\python.exe" goto setup_required
".venv\Scripts\python.exe" -c "import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)" >nul 2>&1
if errorlevel 1 goto setup_required
".venv\Scripts\python.exe" -c "import flask; from google import genai" >nul 2>&1
if errorlevel 1 goto setup_required
if defined RUN_CHECK_ONLY (
    echo [OK] Python and dependencies are ready.
    goto success
)

echo Open http://127.0.0.1:5000 in your browser once the server starts.
echo Keep this window open. Press Ctrl+C to stop the server.
echo.
rem Run the full backend locally, without a debugger or automatic restarts.
set "FLASK_DEBUG=0"
".venv\Scripts\python.exe" -m flask --app server run --host 127.0.0.1 --port 5000 --no-debugger --no-reload
set "PORTFOLIO_EXIT_CODE=%ERRORLEVEL%"
if not "%PORTFOLIO_EXIT_CODE%"=="0" (
    echo.
    echo [ERROR] The server stopped with exit code %PORTFOLIO_EXIT_CODE%.
    echo Check the output above. If port 5000 is busy, stop the other server first.
    popd
    if not defined RUN_NO_PAUSE pause
    exit /b %PORTFOLIO_EXIT_CODE%
)

:success
popd
if not defined RUN_NO_PAUSE pause
exit /b 0

:setup_required
echo [ERROR] The Python environment is missing, moved, or incomplete.
echo Run setup.bat first, then try run.bat again.
:failed
popd
if not defined RUN_NO_PAUSE pause
exit /b 1

:directory_error
echo [ERROR] Could not open the project folder.
if not defined RUN_NO_PAUSE pause
exit /b 1
