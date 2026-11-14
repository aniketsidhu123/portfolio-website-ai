@echo off
setlocal EnableExtensions DisableDelayedExpansion
set "SETUP_NO_PAUSE="
for %%A in (%*) do if /I "%%~A"=="--no-pause" set "SETUP_NO_PAUSE=1"
pushd "%~dp0" >nul 2>&1
if errorlevel 1 goto directory_error

echo.
echo === Aniket Sidhu Portfolio - Setup ===
echo.
if not exist "requirements.txt" (
    echo [ERROR] requirements.txt is missing from the project folder.
    goto failed
)

rem Reuse only an actual working Python 3.11+ virtual environment.
if exist ".venv\Scripts\python.exe" (
    ".venv\Scripts\python.exe" -c "import sys; sys.exit(0 if sys.version_info >= (3, 11) and sys.prefix != sys.base_prefix else 1)" >nul 2>&1
    if not errorlevel 1 goto install_dependencies
)

rem An optional override is one interpreter path, without command-line arguments.
set "PORTFOLIO_PYTHON_ARGS="
if defined PORTFOLIO_PYTHON (
    call :probe_python
    if not errorlevel 1 goto create_environment
)
set "PORTFOLIO_PYTHON=py"
set "PORTFOLIO_PYTHON_ARGS=-3"
call :probe_python
if not errorlevel 1 goto create_environment

rem Store aliases can be stale even when the real installation is healthy.
rem PEP 514 registry entries point to the actual installed interpreter.
set "PORTFOLIO_PYTHON_ARGS="
for %%R in (HKCU HKLM) do (
    for %%V in (64 32) do (
        for /f "tokens=2,*" %%A in ('reg query "%%R\Software\Python" /s /v ExecutablePath /reg:%%V 2^>nul ^| findstr /c:"REG_SZ"') do (
            set "PORTFOLIO_PYTHON=%%B"
            call :probe_python
            if not errorlevel 1 goto create_environment
        )
    )
)
for %%P in (python python3) do (
    set "PORTFOLIO_PYTHON=%%P"
    call :probe_python
    if not errorlevel 1 goto create_environment
)
echo [ERROR] A working Python 3.11 or newer installation was not found.
echo Install Python from https://www.python.org/downloads/windows/
echo Then run setup.bat again, or set PORTFOLIO_PYTHON to python.exe's full path.
goto failed

:create_environment
echo [OK] Found Python: "%PORTFOLIO_PYTHON%"
if not exist ".venv" goto new_environment
echo Preserving the unusable environment in a .venv.backup-* folder...
rem Resolve both paths and refuse any environment outside this checkout.
"%PORTFOLIO_PYTHON%" %PORTFOLIO_PYTHON_ARGS% -c "from pathlib import Path; from uuid import uuid4; root=Path.cwd().resolve(); source=(root/'.venv').resolve(); target=root/('.venv.backup-'+uuid4().hex[:12]); assert source.parent == root and source.name == '.venv' and target.parent == root, 'Environment path is outside this project'; source.rename(target)"
if errorlevel 1 (
    echo [ERROR] Could not preserve the old environment. No files were deleted.
    goto failed
)

:new_environment
echo Creating .venv...
"%PORTFOLIO_PYTHON%" %PORTFOLIO_PYTHON_ARGS% -m venv .venv
if errorlevel 1 (
    echo [ERROR] Could not create the virtual environment.
    goto failed
)

:install_dependencies
echo Installing dependencies from requirements.txt...
".venv\Scripts\python.exe" -m pip install --disable-pip-version-check -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Dependency installation failed. Check your internet connection.
    echo Run setup.bat again to retry.
    goto failed
)
".venv\Scripts\python.exe" -c "import flask; from google import genai" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] The installed dependencies could not be imported.
    goto failed
)

if not exist ".streamlit" mkdir ".streamlit"
if not exist ".streamlit" (
    echo [ERROR] Could not create the configuration folder.
    goto failed
)
if exist ".streamlit\secrets.toml" goto ready
>".streamlit\secrets.toml" echo # Optional local settings. Never commit this file.
>>".streamlit\secrets.toml" echo GEMINI_API_KEY = ""
>>".streamlit\secrets.toml" echo FORMSPREE_ENDPOINT = ""
if errorlevel 1 (
    echo [ERROR] Could not write the optional settings file.
    goto failed
)

:ready
".venv\Scripts\python.exe" -u runtime_check.py
if errorlevel 1 goto failed
echo.
echo [OK] Setup complete. Run run.bat to start the updated portfolio.
echo Use run.bat --check-ai --no-pause to verify a live Gemini response.
echo Existing local settings have been preserved.
popd
if not defined SETUP_NO_PAUSE pause
exit /b 0

:probe_python
"%PORTFOLIO_PYTHON%" %PORTFOLIO_PYTHON_ARGS% -c "import sys,venv,ensurepip; sys.exit(0 if sys.version_info >= (3, 11) else 1)" >nul 2>&1
exit /b %ERRORLEVEL%

:failed
popd
if not defined SETUP_NO_PAUSE pause
exit /b 1

:directory_error
echo [ERROR] Could not open the project folder.
if not defined SETUP_NO_PAUSE pause
exit /b 1
