#!/usr/bin/env python3
"""Extrae el contenido de reference/ a JSON estructurado para la nueva web."""
import csv, json, re, os
from pathlib import Path

REF = Path('reference')
OUT = Path('src/data'); OUT.mkdir(parents=True, exist_ok=True)

rows = list(csv.DictReader(open(REF/'data/content-index.csv')))

def read_md(p):
    return (REF/p).read_text(errors='replace')

def split_md(txt):
    """devuelve (frontmatter dict, texto plano del apartado ## Texto)"""
    meta = {}
    for line in txt.split('\n')[:14]:
        m = re.match(r'^- ([^:]+):\s*(.*)$', line)
        if m: meta[m.group(1).strip()] = m.group(2).strip()
    if '## Texto' in txt:
        body = txt.split('## Texto',1)[1]
    else:
        body = txt
    return meta, body

NOISE = re.compile(r'^(Home|Cotizar [A-Za-z0-9 .&®]+|Ver Más|Ver más|Comprar Ahora|Comprar ahora|Contáctanos|Contáctenos|Ver Información|Más información|Explorar|Cotizar|Siguiente|Anterior|Enviar|Suscríbete)$', re.I)

def blocks(body):
    out, cur = [], []
    for raw in body.split('\n'):
        line = raw.strip()
        if not line:
            if cur: out.append(' '.join(cur)); cur=[]
            continue
        if line.startswith('- /') or line.startswith('- http'):
            continue
        if line.startswith('* '): line = line[2:]
        cur.append(line)
    if cur: out.append(' '.join(cur))
    return [b for b in out if not NOISE.match(b)]

# ---------- PRODUCTOS ----------
BRANDS = {}
brand_order = ['autodesk','bentley-systems','oracle-construction-and-engineering','adobe','csi-software',
  'sketchup','chaos','microsoft-365','bluebeam-revu','corel-draw-graphics-suite','rhinoceros-3d',
  'rib-presto','transoft-solutions','twinmotion','esri']
BRAND_LABEL = {
 'autodesk':'Autodesk','bentley-systems':'Bentley Systems','oracle-construction-and-engineering':'Oracle',
 'adobe':'Adobe','csi-software':'CSI Software','sketchup':'SketchUp','chaos':'Chaos','microsoft-365':'Microsoft 365',
 'bluebeam-revu':'Bluebeam','corel-draw-graphics-suite':'Corel','rhinoceros-3d':'Rhinoceros 3D',
 'rib-presto':'RIB Presto','transoft-solutions':'Transoft Solutions','twinmotion':'Twinmotion','esri':'Esri'}

products, families = [], {}
for r in rows:
    if r['type'] != 'page': continue
    p = r['path']
    if not p.startswith('/software/'): continue
    parts = [x for x in p.split('/') if x]
    meta, body = split_md(read_md(r['file']))
    txt = blocks(body)
    if len(parts) == 2:
        slug = parts[1]
        families[slug] = {
            'slug': slug, 'name': BRAND_LABEL.get(slug, r['title']), 'title': r['title'],
            'url': r['url'], 'summary': meta.get('Extracto','')[:400],
            'lede': next((b for b in txt[1:6] if 25 < len(b) < 180), ''),
            'products': []
        }
    elif len(parts) == 3:
        brand, slug = parts[1], parts[2]
        if slug.startswith('gracias'): continue
        imgs = [a for a in r['assets'].split(';') if a.startswith('/wp-content') and not re.search(r'-\d+x\d+\.', a)]
        desc = ''
        if '## Texto' in read_md(r['file']):
            after = read_md(r['file']).split('## Texto',1)[1]
        lead = [b for b in txt if 40 < len(b) < 260 and not b.lower().startswith(('home','cotizar'))]
        products.append({
            'slug': slug, 'brand': brand, 'name': r['title'], 'path': p, 'url': r['url'],
            'summary': meta.get('Extracto','')[:420],
            'lede': lead[0] if lead else '',
            'body': txt[1:14],
            'images': imgs[:4],
        })

for p in products:
    families.setdefault(p['brand'], {'slug':p['brand'],'name':BRAND_LABEL.get(p['brand'],p['brand']),'products':[]})
    families[p['brand']]['products'].append(p)

# Marcas de un solo producto: el propio brand page es la ficha del producto.
for slug, fam in families.items():
    if not fam['products']:
        fam['products'].append({
            'slug': slug, 'brand': slug, 'name': fam['name'], 'path': f'/software/{slug}',
            'url': fam.get('url',''), 'summary': fam.get('summary','')[:420],
            'lede': fam.get('lede',''), 'body': [], 'images': [],
            'selfPage': True,
        })

fam_list = [families[b] for b in brand_order if b in families]
for b in families:
    if b not in brand_order: fam_list.append(families[b])

json.dump({'families': fam_list, 'products': products}, open(OUT/'software.json','w'), ensure_ascii=False, indent=1)
print('software:', len(products), 'products in', len(fam_list), 'families')

# ---------- EVENTOS / CURSOS ----------
events = []
for r in rows:
    if r['type'] != 'event': continue
    meta, body = split_md(read_md(r['file']))
    txt = blocks(body)
    joined = ' \n '.join(txt)
    price = re.search(r'(USD\s*\$[\d.,]+(?:\s*\+\s*\d+%)?)', joined)
    hours = re.search(r'(\d+)\s*horas', joined)
    start = re.search(r'Fecha de Inicio:\s*\n?\s*([A-Za-zÁÉÍÓÚáéíóúñ]+ \d{1,2})', read_md(r['file']))
    sched = re.search(r'Horario:\s*([0-9:apm\.\s\-–]+)', joined)
    imgs = [a for a in r['assets'].split(';') if a.startswith('/wp-content') and not re.search(r'-\d+x\d+\.', a)]
    events.append({
        'slug': r['slug'], 'title': r['title'], 'path': r['path'], 'url': r['url'],
        'summary': meta.get('Extracto','')[:420],
        'description': next((b for b in txt if len(b) > 120), ''),
        'details': [b for b in txt if 15 < len(b) < 200 and re.match(r'^(Nivel|Clases|Certificado|\d+ horas|\d+%|Básico|Intermedio)', b, re.I)],
        'price': price.group(1) if price else None,
        'hours': hours.group(1) if hours else None,
        'start': start.group(1) if start else None,
        'schedule': sched.group(1).strip() if sched else None,
        'images': imgs[:3],
        'published': r['date'], 'modified': r['modified'],
    })
json.dump(events, open(OUT/'courses.json','w'), ensure_ascii=False, indent=1)
print('events:', len(events))
for e in events: print('  ', e['slug'], '|', e['price'], '|', e['hours'],'h |', e['start'], '|', e['schedule'])
