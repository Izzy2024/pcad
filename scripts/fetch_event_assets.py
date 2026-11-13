#!/usr/bin/env python3
"""Fetch public uploads referenced by archived event pages."""
import json
import re
import subprocess
from pathlib import Path

root = Path('.firecrawl/pccadla.com')
index = json.loads((root / 'export/content-index.json').read_text())
assets = sorted(set(
    value
    for page in index
    if page['type'] == 'event'
    for value in page['assets']
    if value.startswith('/wp-content/uploads/')
    and not re.search(r'\.(?:html?|php)(?:\?|$)', value, re.I)
))
missing = []
for value in assets:
    relative = value.removeprefix('/wp-content/uploads/')
    target = root / 'assets' / relative
    if target.exists() and target.stat().st_size:
        continue
    target.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run([
        'curl', '-L', '--fail', '--silent', '--show-error',
        '--connect-timeout', '10', '--max-time', '45',
        '-A', 'Mozilla/5.0 PCCAD-research-export/1.0',
        '-o', str(target), f'https://pccadla.com{value}'
    ])
    if result.returncode:
        missing.append(value)
        if target.exists() and not target.stat().st_size:
            target.unlink()
print(f'Referenced event uploads: {len(assets)}')
print(f'Unavailable: {len(missing)}')
for value in missing:
    print(value)
