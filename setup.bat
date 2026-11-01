@echo off
setlocal EnableExtensions DisableDelayedExpansion
set "SETUP_NO_PAUSE="
if /I "%~1"=="--no-pause" set "SETUP_NO_PAUSE=1"
pushd "%~dp0" >nul 2>&1
if errorlevel 1 goto directory_error

echo.
echo === Aniket Sidhu Portfolio - Setup ===
echo.
if not exist "requirements.txt" (
    echo [ERROR] requirements.txt is missing from the project folder.
    goto failed
)

rem Prefer an existing working environment, including its Python version.
if exist ".venv\Scripts\python.exe" (
    ".venv\Scripts\python.exe" -c "import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)" >nul 2>&1
    if not errorlevel 1 goto install_dependencies
)

rem Probe actual interpreters, not just PATH entries or Microsoft Store aliases.
set "PORTFOLIO_PYTHON="
py -3 -c "import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)" >nul 2>&1
if not errorlevel 1 (
    set "PORTFOLIO_PYTHON=py -3"
    goto create_environment
)
python -c "import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)" >nul 2>&1
if not errorlevel 1 (
    set "PORTFOLIO_PYTHON=python"
    goto create_environment
)
python3 -c "import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)" >nul 2>&1
if not errorlevel 1 (
    set "PORTFOLIO_PYTHON=python3"
    goto create_environment
)
echo [ERROR] A working Python 3.11 or newer installation was not found.
echo Install Python from https://www.python.org/downloads/windows/
echo Enable the Python launcher or add Python to PATH, then run setup.bat again.
goto failed

:create_environment
if not exist ".venv" goto new_environment
echo Preserving the unusable environment in a .venv.backup-* folder...
rem Verify resolved source and destination stay directly inside this project.
%PORTFOLIO_PYTHON% -c "from pathlib import Path; from uuid import uuid4; root=Path.cwd().resolve(); source=(root/'.venv').resolve(); target=root/('.venv.backup-'+uuid4().hex[:12]); assert source.parent == root and source.name == '.venv' and target.parent == root, 'Environment path is outside this project'; source.rename(target)"
if errorlevel 1 (
    echo [ERROR] Could not back up the existing environment. No files were deleted.
    goto failed
)

:new_environment
echo Creating .venv...
%PORTFOLIO_PYTHON% -m venv .venv
if errorlevel 1 (
    echo [ERROR] Could not create the virtual environment.
    goto failed
)

:install_dependencies
echo Installing dependencies from requirements.txt...
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Dependency installation failed. Check the output and your internet connection.
    echo You can safely run setup.bat again to retry.
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
rem Empty optional settings avoid treating example credentials as real keys.
>".streamlit\secrets.toml" echo # Optional local settings. Never commit this file.
>>".streamlit\secrets.toml" echo GEMINI_API_KEY = ""
>>".streamlit\secrets.toml" echo FORMSPREE_ENDPOINT = ""
if errorlevel 1 (
    echo [ERROR] Could not write the optional settings file.
    goto failed
)

:ready
echo.
echo [OK] Setup complete. Run run.bat to start the portfolio.
echo Optional: set GEMINI_API_KEY and FORMSPREE_ENDPOINT in the environment
echo or edit .streamlit\secrets.toml to enable AI chat and contact delivery.
echo Existing settings have been preserved.
popd
if not defined SETUP_NO_PAUSE pause
exit /b 0

:failed
popd
if not defined SETUP_NO_PAUSE pause
exit /b 1

:directory_error
echo [ERROR] Could not open the project folder.
if not defined SETUP_NO_PAUSE pause
exit /b 1
