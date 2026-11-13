#!/usr/bin/env python3
"""Assemble the visible PCCAD reference package for the redesign."""

from __future__ import annotations

import csv
import json
import shutil
from pathlib import Path


ROOT = Path(".firecrawl/pccadla.com")
EXPORT = ROOT / "export"
REFERENCE = Path("reference")


def copy_tree(source: Path, target: Path) -> None:
    if not source.exists():
        return
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target)


def copy_file(source: Path, target: Path) -> None:
    if source.exists():
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)


def write_reference_readme() -> None:
    text = """# PCCAD · paquete de referencia para la nueva web

Extracción pública de `https://pccadla.com`, realizada el **13 de noviembre de 2026**.

## Qué contiene

- `content/`: 115 páginas y 11 eventos convertidos a Markdown.
- `assets/`: biblioteca pública de imágenes, PDF, videos y JSON descargada del sitio.
- `data/`: índices CSV/JSON, URL map, catálogo de assets, contenido estructurado y metadatos.
- `source/`: HTML de la portada y eventos, capturas visuales, CSS y manifiestos técnicos.
- `site-skeleton/`: estructura propuesta para reconstruir la experiencia.
- `DESIGN_REFERENCE.md`: colores, tipografías, jerarquía visual y patrones observados.
- `REDESIGN-BRIEF.md`: contenido prioritario, arquitectura y decisiones para la nueva versión.

## Cómo usarlo

1. Empieza por `REDESIGN-BRIEF.md` y `data/INFORMATION-ARCHITECTURE.md`.
2. Usa `data/content-index.csv` para relacionar IDs, rutas, títulos y archivos Markdown.
3. Consulta `data/asset-manifest.csv` para escoger imágenes por tamaño, alt y tipo.
4. Usa `site-skeleton/COMPONENT-MAP.md` como base de componentes y rutas.
5. Sustituye contenido desactualizado o especulativo antes de publicar.

## Cobertura

- 126 páginas/eventos documentados.
- 832 registros de la biblioteca multimedia.
- 916 archivos presentes en `assets/` incluyendo variantes responsive y uploads adicionales.
- 46 imágenes usadas en la portada; todas presentes localmente.
- 93 imágenes y documentos adicionales enlazados desde páginas de eventos; todos disponibles al cierre.
- Un video principal `.mov` de 71.6 MB y tres videos `.webm`.

## Limitaciones de la fuente

- El contenido se obtuvo de la API pública de WordPress y del HTML público. La biblioteca privada de Elementor exige autenticación.
- Cinco SVG de iconos Adobe Express responden `200` pero con **0 bytes**; la fuente no entrega contenido. Sus URLs están conservadas en el manifiesto como `source-empty`.
- Las páginas de eventos fuera del feed actual se conservan como referencia archivada. Fechas y precios deben validarse antes de reutilizarlos.
- Las imágenes y marcas pertenecen a sus titulares. Este paquete es una referencia del proyecto; no concede licencias de reutilización.
- La portada y los eventos fueron capturados en escritorio. La adaptación móvil debe diseñarse de nuevo y probarse por separado.
"""
    (REFERENCE / "README.md").write_text(text)


def write_design_reference() -> None:
    text = """# Referencia visual y sistema base

## Identidad observada

| Rol | Valor observado |
|---|---|
| Negro de marca | `#000000` |
| Superficie clara | `#F2F2F2` |
| Fondo suave | `#EBEAEA` |
| Texto principal | `#444444` |
| Amarillo de marca | `#F6C11B` |
| Azul de acento | `#264E7E` |
| Tipografía de titulares | Lexend |
| Tipografía de cuerpo | Poppins |
| Tipografía de acento | Exo / Exo 2 |
| Título base (Desktop) | 28 px, peso 600 |
| Cuerpo base (Desktop) | 14 px, peso 400 |

## Patrones de portada

1. Header negro fijo con logo blanco y botón amarillo de contacto.
2. Hero de arquitectura a la derecha, degradado oscuro a la izquierda, titular blanco de tres líneas y dos CTAs rectangulares.
3. Cuatro pilares: Software, Hardware, Capacitaciones y Consultoría BIM.
4. Bloque editorial de eventos y ConstruTech 2026 con galería de fotos.
5. Retícula de 13 marcas de software en cajas blancas muy ligeras.
6. Sección “¿Qué hacemos?” en dos columnas, imagen grande y texto a la derecha.
7. Certificaciones con partner de Certiport y CTA de curso.
8. Próximo curso destacado y tarjetas de cursos disponibles.
9. Footer negro con newsletter, redes, navegación, oficina, teléfono, correo y selectores de país.

## Interpretación para la nueva versión

- Mantén la claridad del negro/amarillo y el carácter técnico AEC.
- Reemplaza la retícula genérica de logos por una navegación de familias con estados de foco claros.
- Trata la formación y las certificaciones como ruta de conversión propia.
- Haz que el selector de país y los contactos por oficina sean persistentes y comprensibles.
- Reduce el exceso de espacio vertical, conserva imágenes amplias y mejora la jerarquía de cards.
- Evita depender de Elementor o de la estructura visual actual: reconstruye con componentes propios.

## Capturas

- `source/homepage-full.png`: portada completa de escritorio, 1920×6817.

El detalle de estilos originales está en `source/styles/`. No se debe importar el CSS completo: se conserva como evidencia del diseño fuente.
"""
    (REFERENCE / "DESIGN_REFERENCE.md").write_text(text)


def write_skeleton() -> None:
    index = json.loads((EXPORT / "content-index.json").read_text())
    by_slug = {item["slug"]: item for item in index}
    by_path = {item["path"].strip("/"): item for item in index}

    def source(path: str) -> str:
        return by_path[path]["file"]

    directory = REFERENCE / "site-skeleton"
    directory.mkdir(parents=True, exist_ok=True)
    text = f"""# Esqueleto para la nueva web

## Rutas principales

| Ruta | Objetivo | Fuente de contenido |
|---|---|---|
| `/` | Presentar propuesta, pilares, marcas, eventos y cursos | `{source("")}` |
| `/nosotros` | Historia, misión y visión | `{source("nosotros")}` |
| `/servicios` | Implementación BIM, capacitación, consultoría y levantamiento | `{source("servicios")}` |
| `/software` | Catálogo por fabricante y producto | `{source("software")}` |
| `/software/[marca]` | Familia de productos y presentación de partner | índice de arquitectura |
| `/software/[marca]/[producto]` | Detalle de producto, beneficios y CTA | 90 páginas de software |
| `/hardware` | Plotters, computadoras y equipos | `{source("hardware")}` |
| `/cursos` | Catálogo formativo, próximo curso y cursos disponibles | `{source("cursos")}` |
| `/eventos/[slug]` | Detalle de curso/evento, agenda, precio y CTA | `content/events/` |
| `/certificaciones` | Certificación oficial y partner | `{source("certificaciones")}` |
| `/contacto` | Formulario, oficinas, canales y selector de país | `{source("contacto")}` |
| `/nosotros/trabaje-con-nosotros` | Oportunidades profesionales | `{by_slug["trabaje-con-nosotros"]["file"]}` |
| `/politicas-de-cumplimiento` | Código de conducta y políticas fiscales | `{source("politicas-de-cumplimiento")}` |

## Componentes

`SiteHeader` · `CountrySelector` · `MegaMenu` · `Hero` · `SolutionPillars` · `BrandGrid` · `ProductFamilyCard` · `ProductHero` · `ProductFeatureList` · `EventSpotlight` · `EventCard` · `CourseCard` · `CertificationBand` · `ContactPanel` · `ContactForm` · `OfficeDetails` · `SiteFooter` · `WhatsAppCTA`

## Modelo de datos mínimo

```ts
type ProductFamily = {{
  name: string
  slug: string
  logo: string
  description: string
  products: Product[]
}}

type Product = {{
  name: string
  slug: string
  summary?: string
  images: string[]
  body: string
  sourceUrl: string
}}

type Course = {{
  title: string
  slug: string
  status: 'scheduled' | 'archived'
  image?: string
  description: string
  curriculum: string[]
  price?: string
  schedule?: string
  ctaUrl?: string
}}

type Office = {{
  country: string
  address: string[]
  email: string[]
  phone: string[]
  url: string
}}
```

## Orden recomendado de implementación

1. Design tokens y componentes de shell.
2. Inicio, navegación y selector país.
3. Catálogo de software, familias y una plantilla de producto.
4. Cursos/eventos y certificaciones.
5. Servicios, nosotros, contacto, legales y las demás rutas.
6. Migración de imágenes optimizadas y validación de derechos de uso.
"""
    (directory / "COMPONENT-MAP.md").write_text(text)
    (directory / "routes.csv").write_text(
        f"""route,template,source
/,Home,{source("")}
/nosotros,About,{source("nosotros")}
/servicios,Services,{source("servicios")}
/software,Catalog,{source("software")}
/software/[marca],Family,data/content-index.csv
/software/[marca]/[producto],Product,data/content-index.csv
/hardware,Hardware,{source("hardware")}
/cursos,Courses,{source("cursos")}
/eventos/[slug],CourseDetail,content/events
/certificaciones,Certifications,{source("certificaciones")}
/contacto,Contact,{source("contacto")}
/nosotros/trabaje-con-nosotros,Jobs,{by_slug["trabaje-con-nosotros"]["file"]}
/politicas-de-cumplimiento,Compliance,{source("politicas-de-cumplimiento")}
"""
    )


def write_brief() -> None:
    text = """# Brief para reconstruir PCCAD

## Propósito del sitio

PCCAD vende, implementa y acompaña soluciones de software y hardware para arquitectura, ingeniería y construcción (AEC) en Latinoamérica. El sitio debe convertir visitantes en prospectos de software, servicios BIM, formación y certificaciones.

## Audiencias

- Arquitectos, ingenieros estructurales, civiles y MEP.
- Constructoras, PMO, despachos de arquitectura y oficinas técnicas.
- Empresas que migran a BIM o necesitan control documental y de proyectos.
- Profesionales y estudiantes que buscan cursos y certificaciones.

## Pilares

1. Software especializado por fabricante.
2. Hardware: plotters HP y computadoras MSI.
3. Formación y certificación.
4. Consultoría e implementación BIM.

## Rutas comerciales prioritarias

- Explorar el catálogo y encontrar un producto concreto.
- Solicitar una cotización o asesoría.
- Reservar un curso y entender precio, fecha y contenido.
- Validar certificaciones y respaldo de partners.
- Encontrar la oficina o contacto del país correspondiente.

## Riesgos editoriales

- Algunas fechas y precios de cursos están desactualizados.
- Varias páginas conservan textos de terceros o referencias de producto.
- Algunas imágenes tienen nombres internos poco útiles y falta texto alternativo.
- La portada actual muestra eventos y cursos con estados mixtos.
- La migración debe convertir nombres de archivo y textos a una taxonomía propia.

## Entregables de contenido

- Textos en Markdown por página y evento.
- Biblioteca de assets y manifiesto CSV.
- Arquitectura de información navegable.
- Fuentes y tokens visuales de referencia.
- Modelo de datos y mapa de componentes.

## Criterios de aceptación para la nueva web

- Todas las rutas públicas principales tienen contenido intencional y CTA claro.
- La navegación de software permite descubrir familias y productos.
- Los datos obsoletos se actualizan o se retiran antes de publicar.
- Las imágenes se optimizan y llevan alt útil.
- El formulario y los contactos funcionan por mercado.
- La experiencia móvil, teclado y lectores de pantalla se valida.
"""
    (REFERENCE / "REDESIGN-BRIEF.md").write_text(text)


def write_data_summary() -> None:
    index = json.loads((EXPORT / "content-index.json").read_text())
    assets = json.loads((EXPORT / "asset-manifest.json").read_text())
    lines = [
        "# Resumen del inventario",
        "",
        f"- Páginas y eventos: {len(index)}",
        f"- Páginas: {sum(item['type'] == 'page' for item in index)}",
        f"- Eventos: {sum(item['type'] == 'event' for item in index)}",
        f"- Registros multimedia: {len(assets)}",
        f"- Recursos presentes: {sum(item['size_status'] == 'present' for item in assets)}",
        f"- Recursos faltantes: {sum(item['size_status'] == 'missing' for item in assets)}",
        f"- Recursos de origen vacío: {sum(item['size_status'] == 'source-empty' for item in assets)}",
        "",
        "## Conteo por tipo de página",
        "",
    ]
    counts = {}
    for item in index:
        path = item["path"]
        if path == "/":
            section = "inicio"
        elif path.startswith("/software/"):
            section = "software"
        elif path.startswith("/hardware"):
            section = "hardware"
        elif path.startswith("/event"):
            section = "eventos"
        elif path.startswith("/cursos"):
            section = "cursos"
        elif path.startswith("/nosotros"):
            section = "nosotros"
        else:
            section = "institucional y conversión"
        counts[section] = counts.get(section, 0) + 1
    lines.extend(f"- {name}: {count}" for name, count in sorted(counts.items()))
    lines += [
        "",
        "## Recursos principales de portada",
        "",
        "- `assets/2025/03/hp-twinmotion-aec-hero-banner-1600x680-1.jpg`",
        "- `assets/2025/03/logo_pccad_white_color-1.png`",
        "- `assets/2025/03/quehacemos.jpg`",
        "- `assets/2025/03/certiport-partner.jpg`",
        "- `assets/2025/03/oracle-gold-partner.jpg`",
        "- `source/homepage-full.png`",
    ]
    (REFERENCE / "data" / "INVENTORY-SUMMARY.md").write_text("\n".join(lines) + "\n")


def main() -> None:
    REFERENCE.mkdir(exist_ok=True)
    copy_tree(EXPORT / "pages", REFERENCE / "content" / "pages")
    copy_tree(EXPORT / "events", REFERENCE / "content" / "events")
    copy_tree(ROOT / "assets", REFERENCE / "assets")
    copy_tree(ROOT / "source" / "styles", REFERENCE / "source" / "styles")
    copy_tree(ROOT / "source" / "events", REFERENCE / "source" / "events")
    (REFERENCE / "data").mkdir(exist_ok=True)
    (REFERENCE / "source").mkdir(exist_ok=True)
    for name in (
        "content-index.json",
        "content-index.csv",
        "url-map.csv",
        "asset-manifest.json",
        "asset-manifest.csv",
        "INFORMATION-ARCHITECTURE.md",
        "HOMEPAGE-NAVIGATION.md",
        "ASSETS.md",
    ):
        copy_file(EXPORT / name, REFERENCE / "data" / name)
    for name in ("home.html", "home-visual", "css-files.txt", "js-files.txt"):
        copy_file(ROOT / "source" / name, REFERENCE / "source" / name)
    copy_file(
        Path("reference/homepage-full.png"),
        REFERENCE / "source" / "homepage-full.png",
    )
    write_reference_readme()
    write_design_reference()
    write_skeleton()
    write_brief()
    write_data_summary()
    print("Visible reference package assembled in reference/")


if __name__ == "__main__":
    main()
