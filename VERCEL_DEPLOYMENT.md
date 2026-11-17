# Vercel deployment

The repository is configured for one native Flask deployment. Static HTML, JavaScript, CSS, fonts, audio, and video are generated into `public/` and served by Vercel's CDN. `/api/health`, `/api/config`, and `/api/chat` are handled by `server.py:app` on the same domain.

## Included configuration

- `vercel.json`: Flask preset, `python prepare_vercel.py` build command, and a 60-second maximum function duration. No catch-all rewrite sends API requests to HTML.
- `.python-version`: Python 3.12.
- `public_assets.py`: shared allowlist for the local Flask server and CDN preparation.
- `prepare_vercel.py`: copies only those approved files to the ignored `public/` directory. It requires all source files and refuses unknown output files or symbolic links.
- `.vercelignore`: excludes virtual environments, local secrets, caches, and temporary files from uploaded source.
- `.env.example`: names of the Vercel environment variables, without credentials.

Existing Windows launchers continue to serve the source files locally. Generated `public/` files should not be committed or edited; they are recreated during each Vercel build.

## Deploy from GitHub

1. Commit and push these changes to `aniketsidhu123/portfolio-website-ai`.
2. At https://vercel.com/new, import that repository. Use its root directory, `./`.
3. Confirm the Flask preset and the build command from `vercel.json`. Remove any previous static-site, Node preview, or output-directory overrides from the project dashboard; the Flask preset supplies the output configuration.
4. Add the environment variables below for Production and Preview before deploying.
5. Deploy. A successful build should report `Prepared 14 approved frontend files in public/ for Vercel.`

| Variable | Required | Value |
| --- | --- | --- |
| `GEMINI_API_KEY` | For AI chat | Your Gemini key, saved as a Secret; enter the value without quotes |
| `GEMINI_MODEL` | No | Defaults to the live-tested `gemini-3.5-flash-lite`; use a generation-capable model your key can access |
| `FORMSPREE_ENDPOINT` | For form delivery | Your Formspree submission URL; email links work without it |

Use Vercel's environment-variable settings for credentials. `.streamlit/secrets.toml` stays local and is deliberately excluded from deployments. When `VERCEL=1`, the app only uses environment configuration. Do not add client-visible prefixes such as `VITE_` to the Gemini key. Redeploy after changing environment variables.

## Verify the deployed website

1. Open `/` and check the hero animation, fonts, keyboard, project cards, and LinkedIn links. Open `/assets/signal-scene.mp4` if the video does not load.
2. Open `/api/health`. With the SDK and key configured, `gemini_ready` should be true. This endpoint does not call Google and does not by itself validate the key or quota.
3. Open the footer's “Ask my assistant” panel and ask about the CodeAlpha internship. A real reply verifies the deployed route and Google connection.
4. Try the contact form if Formspree is configured.
5. Confirm `/.streamlit/secrets.toml`, `/.env`, and `/server.py` return 404.

API responses are marked `Cache-Control: no-store`. Health verification state is per running function instance, so `gemini_verified` is diagnostic rather than durable global state.

On 17 November 2026, the previous `gemini-3.6-flash` model returned an upstream 504 during preparation. A live request to `gemini-3.5-flash-lite` succeeded, so it is now the default for this short portfolio chat. An explicit `GEMINI_MODEL` setting still takes precedence. This verifies the local Google connection, not a cloud deployment or future service availability.

## Local checks

```powershell
.venv\Scripts\python.exe prepare_vercel.py
.venv\Scripts\python.exe -m unittest discover -s tests -v
run.bat --check --no-pause
```

Optional live verification, which consumes a Gemini request:

```powershell
run.bat --check-ai --no-pause
```

## Troubleshooting

- Build dependency errors: inspect Vercel Build Logs and confirm Python 3.12 and the root `requirements.txt` are used.
- HTML returned for `/api/health`: remove old rewrites or static-site overrides and redeploy with the Flask preset.
- `gemini_ready` false: confirm the key is set for the environment actually deployed, then redeploy.
- Chat returns 401/403, 404, or 429: inspect the safe runtime error code for rejected credentials, unavailable model, or Google usage limits.
- Chat returns 503: Google connectivity or its response timeout may be involved. The app uses a 45-second upstream timeout inside the 60-second Vercel function limit; deployment cannot guarantee Google's availability.
- Missing static files: confirm the public preparation build command ran and the source assets were committed.

## Official references

- https://vercel.com/docs/frameworks/backend/flask
- https://vercel.com/docs/functions/runtimes/python/python-version
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/deployments/vercel-ignore
- https://vercel.com/docs/environment-variables
