"""Local launcher checks; --gemini makes one real assistant request."""
from __future__ import annotations

import argparse
import sys
from importlib.metadata import version
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--gemini", action="store_true", help="Verify one live Gemini response.")
    args = parser.parse_args()
    if sys.version_info < (3, 11):
        print("[ERROR] Python 3.11 or newer is required. Run setup.bat.")
        return 1
    try:
        from google import genai  # noqa: F401
        import server
    except Exception:
        print("[ERROR] Backend imports or local configuration failed. Run setup.bat and check secrets.toml syntax.")
        return 1
    if getattr(server, "_configuration_error", None):
        print("[ERROR] The local settings file is invalid or unreadable. Check secrets.toml syntax.")
        return 1
    missing = sorted(path for path in server.PUBLIC_FILES if not (Path(server.PUBLIC_ROOT) / path).is_file())
    if missing:
        print("[ERROR] Public portfolio files are missing: " + ", ".join(missing))
        return 1
    print(f"[OK] Python {sys.version.split()[0]} | Flask {version('flask')} | Google GenAI {version('google-genai')}")
    print("[OK] Updated portfolio files and backend are ready.")
    model = getattr(server, "GEMINI_MODEL", "gemini-3.6-flash")
    if not server.GEMINI_API_KEY:
        print("[INFO] Gemini is not configured. Set GEMINI_API_KEY in the environment or .streamlit/secrets.toml.")
        return 1 if args.gemini else 0
    print(f"[OK] Gemini key is configured; model: {model}")
    if args.gemini:
        print("[INFO] Checking one live Gemini assistant response...")
        try:
            with server.app.test_client() as client:
                result = client.post("/api/chat", json={
                    "message": "In one brief sentence, what is your name and what degree are you pursuing?",
                    "history": [],
                })
                body = result.get_json(silent=True) or {}
                if result.status_code != 200 or not isinstance(body.get("response"), str) or not body["response"].strip():
                    # Only the backend's curated public error is shown, never an SDK exception.
                    code = body.get("code", "request_failed")
                    print(f"[ERROR] Gemini verification failed: HTTP {result.status_code} ({code}).")
                    return 1
        except Exception:
            print("[ERROR] Gemini verification could not finish. Check your connection and local configuration.")
            return 1
        print("[OK] Gemini returned a live portfolio assistant response.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
