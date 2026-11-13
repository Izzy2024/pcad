#!/usr/bin/env python3
"""Fetch public uploads used by the captured homepage."""
import json
import subprocess
from pathlib import Path

root = Path('.firecrawl/pccadla.com')
data = json.loads((root / 'source/home-visual').read_text())
urls = sorted(set(
    value for value in data.get('images', [])
    if value.startswith('https://pccadla.com/wp-content/uploads/')
))
failed = []
for url in urls:
    relative = url.removeprefix('https://pccadla.com/wp-content/uploads/')
    target = root / 'assets' / relative
    if target.exists() and target.stat().st_size:
        continue
    target.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run([
        'curl', '-L', '--fail', '--silent', '--show-error',
        '--connect-timeout', '10', '--max-time', '45',
        '-A', 'Mozilla/5.0 PCCAD-research-export/1.0',
        '-o', str(target), url,
    ])
    if result.returncode:
        failed.append(url)
        if target.exists() and not target.stat().st_size:
            target.unlink()
print(f'Homepage uploads: {len(urls)}')
print(f'Unavailable: {len(failed)}')
for url in failed:
    print(url)
