# PCCAD — nueva web

Reconstrucción de `pccadla.com` sobre la arquitectura visual y el sistema de diseño de
**Daylight** (godaylight.com): tipografía editorial, retícula de líneas, paleta cálida y
scroll narrativo.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 con tokens propios
- Lenis para scroll suave
- Contenido estático en JSON generado desde `reference/`

## Comandos

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Estructura

```
src/
  app/                 rutas (home, software, cursos, servicios, …)
  components/          header, footer, PageIntro, ContactForm, Reveal
  components/home/     secciones de la portada
  data/software.json   72 productos / 15 fabricantes
  data/courses.json    11 cursos con precio, horas y fecha
  lib/content.ts       navegación, pilares y datos de contacto
public/
  fonts/               aeonikPro, featureDeck, socialMono (woff2)
  img/                 imágenes curadas de PCCAD
reference/             paquete de extracción del sitio original (fuente de contenido, no versionado)
docs/                  investigación del sitio de referencia y capturas de QA
```

## Sistema de rejilla

12 columnas con el mismo paso que el sitio de referencia:
`margin 4.26667vw` · `column 5.17778vw` · `gutter 2.66667vw` (paso 7.84445vw).
Se dibuja en `src/components/GridLines.tsx` (global, sutil) y `src/components/GridOverlay.tsx`
(sobre la imagen del hero, blanco al 30%).

## Origen del contenido

Todo el texto, precios y nombres de producto vienen de `reference/` — la extracción pública de
`pccadla.com` (115 páginas + 11 eventos + 916 assets). Los datos se normalizaron con
`scripts/extract-pccad.py`.

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Portada editorial |
| `/software` | Catálogo por fabricante |
| `/software/[brand]` | Familia de productos |
| `/software/[brand]/[product]` | Detalle de producto |
| `/hardware` | Plotters HP y MSI |
| `/servicios` | Implementación BIM, capacitación, consultoría |
| `/cursos` | Calendario de cursos |
| `/cursos/[slug]` | Detalle de curso |
| `/certificaciones` | Certiport / Autodesk |
| `/nosotros` | Trayectoria, misión y visión |
| `/nosotros/trabaje-con-nosotros` | Posiciones abiertas |
| `/contacto` | Formulario y oficinas |
| `/politicas-de-cumplimiento` | Cumplimiento y canal de denuncias |

## Pendientes antes de publicar

- Reemplazar el formulario por el endpoint real (hoy es cliente-only).
- Validar fechas y precios de cursos (varios están desactualizados en la fuente).
- Revisar derechos de uso de imágenes de fabricantes.
- Añadir analítica y metadatos sociales por página.
