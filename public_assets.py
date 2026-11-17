"""Shared allowlist for Flask serving and the Vercel CDN build."""
from pathlib import Path

PUBLIC_ROOT = Path(__file__).resolve().parent
PUBLIC_FILES = frozenset({
    "index.html", "styles.css", "script.js", "projects.js", "github-data.js", "details.js",
    "assets/favicon.svg", "assets/aniket-github.png",
    "assets/signal-scene.mp4", "assets/signal-scene-poster.jpg",
    "assets/space-grotesk-latin.woff2", "assets/unbounded-latin.woff2",
    "assets/key-press.mp3", "assets/key-release.mp3",
})
