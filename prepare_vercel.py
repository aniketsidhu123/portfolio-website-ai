"""Build the public CDN directory without importing Flask or loading secrets."""
from __future__ import annotations

import shutil
from pathlib import Path

from public_assets import PUBLIC_FILES, PUBLIC_ROOT


def prepare_public(root: Path = PUBLIC_ROOT) -> int:
    root = root.resolve()
    output = root / "public"
    if output.is_symlink() or output.resolve() != root / "public":
        raise ValueError("The public output must be a directory inside the project.")
    sources = {}
    directories = set()
    for name in PUBLIC_FILES:
        source = (root / name).resolve()
        source.relative_to(root)
        if not source.is_file():
            raise FileNotFoundError(f"Required public file is missing: {name}")
        sources[name] = source
        directories.update(parent.as_posix() for parent in Path(name).parents if parent != Path('.'))
    if output.exists():
        # Never publish unknown files left in the build directory or follow links.
        for path in output.rglob("*"):
            name = path.relative_to(output).as_posix()
            if path.is_symlink() or (path.is_file() and name not in PUBLIC_FILES) or (path.is_dir() and name not in directories):
                raise ValueError(f"Unrecognized public output; remove it before rebuilding: {name}")
    output.mkdir(exist_ok=True)
    for name, source in sorted(sources.items()):
        target = output / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    return len(sources)


if __name__ == "__main__":
    count = prepare_public()
    print(f"Prepared {count} approved frontend files in public/ for Vercel.")
