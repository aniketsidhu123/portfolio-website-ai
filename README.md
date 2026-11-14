# Aniket Sidhu — Signal Portfolio

A local, buildless developer portfolio rebuilt around the 14 November 2026 video reference adapting GitSkins' keyboard portfolio (originally created by Naresh Khatri). The site pairs an interactive CSS 3D mechanical keyboard and live GitHub telemetry with an optional Flask backend powered by Google's Gemini API.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
  - [Windows Automated Launchers](#windows-automated-launchers)
  - [Manual Setup (macOS / Linux / Windows)](#manual-setup-macos--linux--windows)
  - [Frontend-Only Preview (Zero Dependencies)](#frontend-only-preview-zero-dependencies)
- [Configuration](#configuration)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Verification & Quality Checks](#verification--quality-checks)
- [Accessibility & Performance](#accessibility--performance)
- [Attribution & Licenses](#attribution--licenses)

---

## Overview

The portfolio presents a cyberpunk aesthetic centered on physical interaction:
- **Interactive CSS 3D Keyboard**: Six physical keycaps rendered with perspective transforms, tactile depression animations, and authentic mechanical switch audio.
- **Signal-Driven Exploration**: Selecting a language or tool key updates the dynamic signal display and filters the narrative trail into the projects below.
- **Dual-Layer GitHub Integration**: Ships with a bundled offline snapshot (`github-data.js`) for instant zero-latency rendering, paired with non-blocking live API refreshes and a 30-minute client-side cache.
- **Integrated AI Assistant**: Context-aware portfolio assistant built on Google GenAI (`gemini-3.6-flash`), with safety boundaries, conversational memory, and strict adherence to verified profile facts.

---

## Key Features

- **Full-Viewport Looping Scene**: High-fidelity character loop and floating glass geometry, served locally with video byte-range streaming and gradient color overlays.
- **Physical Key Sounds**: Authentic press and release sound effects with a persistent mute/unmute audio toggle.
- **Native Modal Dialogs**: Accessible dialog modals for **Resume**, **Ask my assistant**, and **Contact**, featuring focus containment, Escape dismissal, and return focus restoration.
- **Curated & Verified Profile**: Experience dates, team designations (e.g. *Teach Chhota* with Team *Recursive Bytes*), academic metrics (8.73 CGPA @ MSIT), and certifications reconciled across the resume and public LinkedIn records.
- **Zero Frontend Build Step**: Pure semantic HTML5, modern CSS3, and vanilla ES6+ JavaScript. No bundling, transpilation, or frontend package managers required.

---

## Quick Start

### Windows Automated Launchers

The project includes batch scripts that automatically detect Python 3.11+, configure the virtual environment, install dependencies, and maintain backups of corrupt environments.

1. **Setup**: Double-click `setup.bat` (or run `setup.bat --no-pause` in your terminal).
   - Detects Python 3.11+ via the `py` launcher, registry entries, or `PATH`.
   - Automatically preserves unusable environments in an ignored `.venv.backup-*` directory before recreating `.venv`.
   - Creates a template `.streamlit/secrets.toml` if one does not already exist.
2. **Run**: Double-click `run.bat` (or execute `run.bat`).
   - Automatically calls `setup.bat` if `.venv` is missing or broken.
   - Runs preflight runtime checks, binds to `127.0.0.1:5000`, and opens in your browser.
   - Stop anytime with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

#### Batch Command-Line Options

```cmd
:: Run preflight checks without launching the server
run.bat --check --no-pause

:: Validate a live Gemini API request against the configured key and model
run.bat --check-ai --no-pause

:: Run setup unattended without waiting for a keypress
setup.bat --no-pause
```

> **Note on Microsoft Store Python**: If automatic discovery cannot find your installed Python, set the `PORTFOLIO_PYTHON` environment variable to your full `python.exe` path before running `setup.bat`. When using Microsoft Store Python installations, ensure the process has permissions to access the package directory.

---

### Manual Setup (macOS / Linux / Windows)

For non-Windows environments or custom virtual environments:

1. **Create and activate a Python 3.11+ virtual environment**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate       # On Windows: .venv\Scripts\activate
   ```

2. **Install backend dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure local secrets (optional)**:
   ```bash
   cp .streamlit/secrets.toml.example .streamlit/secrets.toml
   # Edit .streamlit/secrets.toml with your GEMINI_API_KEY and FORMSPREE_ENDPOINT
   ```

4. **Verify runtime and start server**:
   ```bash
   python runtime_check.py
   python server.py
   ```
   Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

### Frontend-Only Preview (Zero Dependencies)

To preview the UI without Python or backend dependencies, use the included Node.js server:

```bash
node preview.mjs
# or
npm start
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). The preview server serves all public assets, supports video byte-range requests, and mocks `/api/health` and `/api/config` endpoints with polite unavailable states for chat and contact.

---

## Configuration

Settings are loaded with fallback precedence: **Environment Variables** $\to$ `.streamlit/secrets.toml` $\to$ **Defaults**.

Copy `.streamlit/secrets.toml.example` to `.streamlit/secrets.toml`:

```toml
# .streamlit/secrets.toml (Ignored by git - Never commit real keys)
GEMINI_API_KEY = "your-gemini-api-key"
GEMINI_MODEL = "gemini-3.6-flash"
FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id"
```

| Variable | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for assistant chat. If omitted, assistant states that chat is offline. | `None` |
| `GEMINI_MODEL` | Gemini model identifier used for conversation generation. | `gemini-3.6-flash` |
| `FORMSPREE_ENDPOINT` | Formspree endpoint URL for routing contact form submissions. | `""` |
| `PORTFOLIO_PYTHON` | *(Windows launcher only)* Absolute path to `python.exe` override. | Auto-detected |
| `PORT` | *(Node preview only)* Custom port for `preview.mjs`. | `4173` |

---

## Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│                   Browser Client                       │
│  - Vanilla HTML5 / CSS3 (3D transforms, fluid layout)  │
│  - ES6+ Vanilla JS (script.js, details.js, projects.js)│
│  - Audio Engine (HTMLAudioElement, mute toggle)        │
│  - GitHub Layer (bundled snapshot + live client cache) │
└───────────────────────┬────────────────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
┌──────────────────┐          ┌───────────────────┐
│ Flask Backend    │          │ Node Preview      │
│ (server.py:5000) │          │ (preview.mjs:4173)│
├──────────────────┤          ├───────────────────┤
│ - Static routes  │          │ - Static routes   │
│ - Strict bounds  │          │ - Mock endpoints  │
│ - /api/health    │          │ - Byte-range mp4  │
│ - /api/config    │          │ - Zero packages   │
│ - /api/chat      │          └───────────────────┘
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Google Gemini API               │
│ - SDK: google-genai             │
│ - Model: gemini-3.6-flash       │
│ - Strict persona constraints    │
│ - Safe error mapping & timeout  │
└─────────────────────────────────┘
```

- **Frontend**: Buildless HTML5, CSS 3D transforms (`perspective: 1200px`, `rotateX(57deg)`, `rotateZ(-17deg)`), native audio switches, local WOFF2 webfonts, and zero build toolchain.
- **Backend**: Python 3.11+, Flask 3.1+, Google GenAI SDK 2.34+.
- **Security**: Whitelisted public static file map in `server.py` prevents path traversal; server headers enforce `X-Content-Type-Options: nosniff`; request payloads are bounded to 32 KB and 2,000 characters; secrets are excluded from all static distributions.

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | Serves `index.html`. |
| `/<filename>` | `GET` | Serves whitelisted static assets and scripts from `PUBLIC_FILES`. |
| `/api/health` | `GET` | Checks Python backend and Gemini configuration without making billable generation calls. |
| `/api/config` | `GET` | Exposes public non-sensitive configuration parameters (e.g. `formspree_endpoint`). |
| `/api/chat` | `POST` | Processes chat questions against Aniket's profile with Google Gemini (45s backend timeout). |

---

## Project Structure

```
Portfolio_Website_Self/
├── .gitignore                   # Comprehensive git ignore rules (Python, Node, OS, IDE, secrets)
├── .streamlit/
│   ├── secrets.toml.example     # Template for local environment secrets
│   └── secrets.toml             # Ignored local configuration file
├── assets/
│   ├── aniket-github.png        # Profile avatar
│   ├── favicon.svg              # Vector favicon
│   ├── key-press.mp3            # Mechanical switch keypress audio
│   ├── key-release.mp3          # Mechanical switch key release audio
│   ├── signal-scene.mp4         # Looping hero background animation
│   ├── signal-scene-poster.jpg  # Static fallback poster for hero scene
│   ├── space-grotesk-latin.woff2# Space Grotesk font subset (SIL OFL)
│   └── unbounded-latin.woff2    # Unbounded font subset (SIL OFL)
├── licenses/
│   ├── Naresh-Khatri-MIT.txt    # Upstream design license notice
│   ├── Space-Grotesk-OFL.txt    # Font license
│   └── Unbounded-OFL.txt        # Font license
├── details.js                   # Modal dialog manager (Resume, Assistant, Contact)
├── github-data.js               # Bundled snapshot of public GitHub profile and repositories
├── index.html                   # Semantic HTML5 document & keyboard markup
├── package.json                 # Node package descriptor for syntax checking & preview script
├── preview.mjs                  # Standalone zero-dependency Node.js HTTP preview server
├── projects.js                  # Selected resume projects metadata
├── requirements.txt             # Backend Python dependencies (flask, google-genai)
├── run.bat                      # Windows one-click launcher with health check arguments
├── runtime_check.py             # Preflight check script for dependencies and live Gemini validation
├── script.js                    # Core frontend logic (keyboard 3D interaction, scene control, metrics)
├── server.py                    # Flask server, security guards, and Gemini assistant integration
├── setup.bat                    # Windows environment setup and virtualenv repair script
├── styles.css                   # Responsive styles, 3D keycap geometry, color system
├── DESIGN_REFERENCE.md          # Frame-by-frame visual & motion analysis of the reference
├── PROFILE_SOURCES.md           # Content reconciliation notes for resume, GitHub & LinkedIn
└── THIRD_PARTY_NOTICES.md       # Attribution and provenance records for assets and templates
```

---

## Verification & Quality Checks

### Backend Preflight & Verification

```bash
# Verify Python runtime, dependency versions, secrets syntax, and public files
python runtime_check.py

# Perform a live Gemini request to verify API key, network, and model availability
python runtime_check.py --gemini
```

### Frontend Syntax Verification

```bash
# Validate JavaScript syntax with Node
node --check script.js
node --check projects.js
node --check github-data.js
node --check details.js
node --check preview.mjs

# Or via npm script (when npm is installed)
npm run check
```

---

## Accessibility & Performance

- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by replacing animated background video with the static poster and disabling 3D key travel.
- **Resource Management**: Video playback is automatically paused when scrolled out of viewport or when the browser tab is hidden/minimized.
- **Auditory Control**: Sound effects can be toggled on or off at any time using the keyboard header sound toggle; settings persist across sessions.
- **Keyboard Navigation**: Native focusable `<button>` elements, accessible dialog focus trapping, <kbd>Escape</kbd> dismissal, and proper `aria-live` status regions.
- **Local Assets**: All fonts, audio, and media files are bundled locally to ensure reliable offline presentation.

---

## Attribution & Licenses

- **Design Inspiration**: Keyboard layout, 3D interaction, and aesthetic adapted from GitSkins' “naresh-keyboard” template, derived from Naresh Khatri's [3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio) (MIT License, see `licenses/Naresh-Khatri-MIT.txt`).
- **Typography**: [Space Grotesk](https://github.com/google/fonts/tree/main/ofl/spacegrotesk) and [Unbounded](https://github.com/google/fonts/tree/main/ofl/unbounded) under the SIL Open Font License (see `licenses/Space-Grotesk-OFL.txt` and `licenses/Unbounded-OFL.txt`).
- **Media & Content**: Scene video and audio assets adapted from public reference assets (see `THIRD_PARTY_NOTICES.md`). Personal content, resume facts, and credentials documented in `PROFILE_SOURCES.md`.
