# Aniket Sidhu — Portfolio

Personal portfolio featuring selected projects, professional experience, credentials, and a Gemini-powered assistant.

Built with HTML, CSS, JavaScript, and Flask. Includes an interactive 3D keyboard, animated hero, GitHub integration, and responsive layouts.

[GitHub](https://github.com/aniketsidhu123) · [LinkedIn](https://www.linkedin.com/in/aniket-sidhu-9bb180373)

## Local development

Requires Python 3.12. On Windows:

```powershell
.\setup.bat
.\run.bat
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000). Press Ctrl+C to stop the server.

For a frontend-only preview with Node.js, run `node preview.mjs` and open [http://127.0.0.1:4173](http://127.0.0.1:4173). The Flask server is required for the assistant.

## Configuration

Set these environment variables, or configure them locally in the ignored `.streamlit/secrets.toml` file. See [.env.example](.env.example) for the variable names.

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Required for the AI assistant |
| `GEMINI_MODEL` | Optional; defaults to `gemini-3.5-flash-lite` |
| `FORMSPREE_ENDPOINT` | Required for contact-form delivery; email links work without it |

Keep API keys in local configuration or hosting environment variables.

## Vercel deployment

The repository includes Flask configuration, a Python version pin, and a build step that prepares approved frontend assets for Vercel's CDN.

Import the repository root into Vercel and add `GEMINI_API_KEY` for the deployment environment. Follow [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for setup and verification.

## Checks

```powershell
.\run.bat --check --no-pause
.venv\Scripts\python.exe -m unittest discover -s tests -v
```

For a live assistant check, run `.\run.bat --check-ai --no-pause`. This makes one Gemini API request. Frontend syntax checks are available through `npm run check` when Node.js is installed.

## Attribution

Design reference: Naresh Khatri's [3D portfolio](https://github.com/Naresh-Khatri/3d-portfolio) and the GitSkins keyboard template.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and [licenses](licenses/) for asset and font notices. Professional content sources are documented in [PROFILE_SOURCES.md](PROFILE_SOURCES.md).
