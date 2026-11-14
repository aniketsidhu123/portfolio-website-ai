@echo off
setlocal EnableExtensions DisableDelayedExpansion
set "RUN_NO_PAUSE="
set "RUN_CHECK_ONLY="
set "RUN_CHECK_AI="
for %%A in (%*) do (
    if /I "%%~A"=="--no-pause" set "RUN_NO_PAUSE=1"
    if /I "%%~A"=="--check" set "RUN_CHECK_ONLY=1"
    if /I "%%~A"=="--check-ai" set "RUN_CHECK_AI=1"
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
if not exist ".venv\Scripts\python.exe" goto repair_environment
".venv\Scripts\python.exe" -c "import sys,flask; from google import genai; sys.exit(0 if sys.version_info >= (3, 11) and sys.prefix != sys.base_prefix else 1)" >nul 2>&1
if errorlevel 1 goto repair_environment
goto ready

:repair_environment
echo [INFO] Repairing the missing or unusable Python environment...
call "%~dp0setup.bat" --no-pause
if errorlevel 1 goto failed

:ready
if defined RUN_CHECK_AI (
    ".venv\Scripts\python.exe" -u runtime_check.py --gemini
    if errorlevel 1 goto failed
    goto success
)
".venv\Scripts\python.exe" -u runtime_check.py
if errorlevel 1 goto failed
if defined RUN_CHECK_ONLY goto success

echo.
echo Open http://127.0.0.1:5000 in your browser once the server starts.
echo Keep this window open. Press Ctrl+C to stop the server.
echo.
set "FLASK_DEBUG=0"
".venv\Scripts\python.exe" -m flask --app server run --host 127.0.0.1 --port 5000 --no-debugger --no-reload
set "PORTFOLIO_EXIT_CODE=%ERRORLEVEL%"
if not "%PORTFOLIO_EXIT_CODE%"=="0" (
    echo.
    echo [ERROR] The server stopped with exit code %PORTFOLIO_EXIT_CODE%.
    echo If port 5000 is busy, stop the other server before retrying.
    popd
    if not defined RUN_NO_PAUSE pause
    exit /b %PORTFOLIO_EXIT_CODE%
)

:success
popd
if not defined RUN_NO_PAUSE pause
exit /b 0

:failed
popd
if not defined RUN_NO_PAUSE pause
exit /b 1

:directory_error
echo [ERROR] Could not open the project folder.
if not defined RUN_NO_PAUSE pause
exit /b 1
