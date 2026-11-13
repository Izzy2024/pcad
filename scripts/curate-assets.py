#!/usr/bin/env python3
import json, shutil
from pathlib import Path
REF=Path('reference/assets'); OUT=Path('public/img'); OUT.mkdir(parents=True,exist_ok=True)

def cp(rel, name):
    p = REF/rel
    if p.exists():
        shutil.copy2(p, OUT/name)
        return (OUT/name).stat().st_size//1024
    print('MISS', rel); return 0

# --- Hero / editorial ---
cp('2025/03/aggregate-iterate-communicate-1920x1080-293def62593f.jpg','hero-architecture.jpg')
cp('2025/03/quehacemos.jpg','about-team.jpg')
cp('2026/08/fondo-scaled.png','construtech-bg.png')
cp('2026/08/bg_construtech_pa.jpg','construtech-banner.jpg')
cp('2025/03/hero-home-architecture-nature-179604268.jpg','nature-architecture.jpg')
cp('2025/03/hero-OpenBuildings-Designer-900x600-1.jpg','skyline.jpg')
cp('2025/03/CT_1440x700_prefooter.jpg','footer-cta.jpg')

# --- Pilares / servicios ---
cp('2025/08/servicios-banner_0004_01-Implementacion-BIM-ok.png','pillar-bim.png')
cp('2025/08/servicios-banner_0003_02-Capacitacion.png','pillar-training.png')
cp('2025/08/servicios-banner_0002_03-Consultoria-para-Proyectos.png','pillar-consulting.png')
cp('2025/08/servicios-banner_0001_04-Gestion-de-proyectos.png','pillar-management.png')
cp('2025/08/servicios-banner_0004_01-Nube-de-puntos.png','pillar-pointcloud.png')

# --- Certificaciones ---
cp('2025/03/certiport-partner.jpg','certiport-partner.jpg')
cp('2025/03/oracle-gold-partner.jpg','oracle-gold-partner.jpg')
cp('2025/03/banner_cursos.jpg','courses-banner.jpg')

# --- Logos de marca ---
logos = {
 'autodesk.png':'2025/03/logo-autodesk.png',
 'bentley.png':'2025/03/Bentley-logo-producto.png',
 'adobe.png':'2025/03/adobe-logo-principal.png',
 'bluebeam.png':'2025/03/bluebeam-logo-productos.png',
 'oracle.png':'2025/03/oracle-logo-productos.png',
 'presto.png':'2025/03/presto-logo-productos.png',
 'csi.png':'2025/03/csi-logo-2.webp',
 'microsoft365.webp':'2025/03/microsoft365.webp',
 'coreldraw.png':'2025/03/coreldraw-gs.png',
 'chaos.png':'2025/03/chaos.png',
 'twinmotion.png':'2025/03/Twinmotion-Logo-Horizontal-500px.png',
 'sketchup.png':'2025/03/logo-graphisoft-product.png',
}
for n,r in logos.items(): cp(r, 'brand-'+n)

# --- Logo PCCAD ---
cp('2025/03/logo_pccad_white_color-1.png','logo-pccad-white.png')
print('done')
