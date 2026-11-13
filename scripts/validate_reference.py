#!/usr/bin/env python3
"""Validate the assembled PCCAD reference package without network access."""
from __future__ import annotations

import csv
import json
import re
import shutil
from pathlib import Path

reference = Path('reference')
errors: list[str] = []
required = [
    'README.md',
    'REDESIGN-BRIEF.md',
    'DESIGN_REFERENCE.md',
    'data/content-index.csv',
    'data/asset-manifest.csv',
    'site-skeleton/COMPONENT-MAP.md',
    'source/home.html',
    'source/homepage-full.png',
]
for relative in required:
    if not (reference / relative).is_file():
        errors.append(f'missing required file: {relative}')

for directory in ('content/pages', 'content/events'):
    for page in (reference / directory).glob('*.md'):
        text = page.read_text(errors='replace')
        if not text.startswith('# '):
            errors.append(f'missing title: {page}')
        if '## Texto' not in text:
            errors.append(f'missing body marker: {page}')

with (reference / 'data/content-index.csv').open(newline='') as handle:
    index = list(csv.DictReader(handle))
for item in index:
    visible = reference / item['file']
    if not visible.exists():
        errors.append(f'missing page file: {item["file"]}')

with (reference / 'data/asset-manifest.csv').open(newline='') as handle:
    assets = list(csv.DictReader(handle))
for item in assets:
    if item['size_status'] == 'present':
        target = reference / 'assets' / item['relative_path']
        if not target.is_file() or target.stat().st_size == 0:
            errors.append(f'missing present asset: {item["relative_path"]}')

for markdown in reference.rglob('*.md'):
    text = markdown.read_text(errors='replace')
    if '.firecrawl/pccadla.com/' in text:
        errors.append(f'internal source path leaked into {markdown}')

if errors:
    print(f'FAILED with {len(errors)} errors')
    for error in errors[:50]:
        print(error)
    raise SystemExit(1)

print(f'Validated {len(index)} content records and {len(assets)} media records.')
print(f'Visible files: {sum(1 for path in reference.rglob("*") if path.is_file())}')
total_size = sum(
    path.stat().st_size for path in reference.rglob('*') if path.is_file()
)
print(f'Total size: {total_size / (1024 ** 2):.1f} MiB')
