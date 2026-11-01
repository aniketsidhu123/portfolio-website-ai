# Aniket Sidhu — Editorial Portfolio

A local redesign of the existing AI portfolio, closely following the visual direction of [ECHO by Jishnu Mondal](https://github.com/Jishnu09-siuu/ECHO-WEBSITE). Built with semantic HTML, CSS, and vanilla JavaScript, retaining the existing Flask / Gemini backend.

## Preview locally

### Windows shortcuts

1. Install Python 3.11+ with the Python launcher or Python on PATH.
2. Double-click `setup.bat` to create `.venv` and install dependencies.
3. Optionally configure `.streamlit/secrets.toml` for Gemini and Formspree. Setup preserves existing settings and creates empty settings only when the file is missing.
4. Double-click `run.bat`, then open http://127.0.0.1:5000. Keep the terminal open; press Ctrl+C to stop.

Both scripts work from any current directory. Setup reuses a working environment and backs up an unusable one inside the project before recreating it. No Node.js installation is needed for this full-backend option. The launcher binds to this computer only, with debugging and automatic reload disabled.

For terminal use, `setup.bat --no-pause` and `run.bat --no-pause` skip the final keypress. `run.bat --check --no-pause` checks Python and dependencies without starting the server.

### Frontend-only preview

No frontend dependencies or build step are required. With Node.js installed:

```sh
node preview.mjs
```

Open http://127.0.0.1:4173. The preview binds only to loopback and serves an explicit list of public files. It does not send contact messages or connect to Gemini; those controls display an unavailable message. Stop with Ctrl+C. Set `PORT` to change the preview port.

For the existing full backend, use Python 3.11+:

```sh
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python server.py
```

Open http://localhost:5000. Configure `GEMINI_API_KEY` and `FORMSPREE_ENDPOINT` as environment variables or in the existing ignored `.streamlit/secrets.toml`. Never commit secrets. The original Gemini model and API integration remain in `server.py`.

## Design and interactions

- Monochrome editorial layout, Plus Jakarta Sans, oversized metallic typography, and the user's GitHub avatar.
- First-visit orbital introduction with a session-level dismissal.
- Scroll-expanding about artwork and a horizontal education / learning journey.
- Six-project cylindrical 3D reel: vertical mouse drag, horizontal touch swipe, arrow buttons, and keyboard navigation. Wheel navigation is enabled when the reel itself is focused.
- Accessible native project dialogs with repository links, Escape dismissal, focus containment, and focus restoration.
- Expanding lab panels, native skill accordions, project archive, achievements, AI assistant, and contact form.
- Mobile layouts and reduced-motion alternatives. Ordinary page scrolling is preserved.

The reel uses CSS 3D transforms instead of an external WebGL dependency. Lab panels use CSS expansion rather than ECHO's OGL liquid shader. Project covers are original abstract illustrations, not screenshots of the applications. No third-party portrait or project work is presented as Aniket's.

## Content

`projects.js` contains the six selected projects and their public GitHub repository paths. Descriptions were checked against the user's public repositories on November 1, 2026. The project archive preserves College Connect, Sanraksh, CZero, and Bins2Bucks from the original portfolio.

The existing bio, education, contact links, certification, and achievements are retained. The original frontend and assistant disagreed on the HackVortex finalist count, so both now say **Finalist** without an unverified ranking. The assistant profile includes the new selected projects.

Replace `assets/aniket-github.png` with a portrait and update the image alt text to personalize the hero later. The current asset is the user's public GitHub identicon, styled in grayscale.

## Files

- `index.html` — page structure and personal content
- `styles.css` — responsive design and motion fallbacks
- `projects.js` — selected project metadata
- `script.js` — interactions, chat, and contact behavior
- `assets/` — public avatar and favicon
- `server.py` — original Flask backend, with updated project context
- `preview.mjs` — dependency-free local frontend preview

## Checks

```sh
node --check script.js
node --check projects.js
node --check preview.mjs
```

If npm is available, `npm run check` runs these together and `npm start` starts the preview.

## Design reference

Visual direction: [ECHO — Editorial Developer & Designer Portfolio](https://github.com/Jishnu09-siuu/ECHO-WEBSITE), by Jishnu Mondal. This implementation adapts its design language and interaction ideas with original frontend code and Aniket's content. All changes are prepared locally; nothing has been deployed or pushed.
