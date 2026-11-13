#!/usr/bin/env python3
"""Build a reusable PCCAD reference export from public WordPress data."""

from __future__ import annotations

import collections
import csv
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin


ROOT = Path(".firecrawl/pccadla.com")
EXPORT = ROOT / "export"
API = ROOT / "api"


class TextExtractor(HTMLParser):
    block_tags = {
        "address",
        "article",
        "aside",
        "blockquote",
        "br",
        "dd",
        "div",
        "dl",
        "dt",
        "figcaption",
        "figure",
        "footer",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "hr",
        "li",
        "main",
        "nav",
        "ol",
        "p",
        "pre",
        "section",
        "table",
        "td",
        "th",
        "tr",
        "ul",
    }
    ignored_tags = {"script", "style", "noscript", "svg"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.ignored_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in self.ignored_tags:
            self.ignored_depth += 1
        elif not self.ignored_depth and tag in self.block_tags:
            self.parts.append("\n")

    def handle_endtag(self, tag: str) -> None:
        if tag in self.ignored_tags and self.ignored_depth:
            self.ignored_depth -= 1
        elif not self.ignored_depth and tag in self.block_tags:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if not self.ignored_depth:
            self.parts.append(data)

    def text(self) -> str:
        value = html.unescape("".join(self.parts))
        value = re.sub(r"[ \t\r\f\v]+", " ", value)
        value = re.sub(r" *\n *", "\n", value)
        value = re.sub(r"\n{3,}", "\n\n", value)
        return value.strip()


class AssetExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.urls: set[str] = set()

    def add_url(self, value: str | None) -> None:
        if not value:
            return
        value = value.strip()
        if value and not value.startswith(("data:", "mailto:", "tel:", "#")):
            self.urls.add(value)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        for key in ("src", "data-src", "href", "poster"):
            self.add_url(data.get(key))
        for candidate in (data.get("srcset") or "").split(","):
            self.add_url(candidate.strip().split(" ", 1)[0])


def text_from_html(value: str | None) -> str:
    if not value:
        return ""
    parser = TextExtractor()
    parser.feed(value)
    return parser.text()


def assets_from_html(value: str | None) -> list[str]:
    if not value:
        return []
    parser = AssetExtractor()
    parser.feed(value)
    urls = set(parser.urls)
    for match in re.finditer(r"url\(\s*[\"']?([^\"')]+)", value, re.IGNORECASE):
        urls.add(match.group(1).strip())
    normalized = set()
    for url in urls:
        if url.startswith(("http://", "https://", "/", "wp-content")):
            url = urljoin("https://pccadla.com/", url)
            url = re.sub(r"^https?://pccadla\.com", "", url)
            normalized.add(url)
    return sorted(normalized)


def page_type(item: dict) -> str:
    if item.get("type") == "tribe_events" or "/event/" in item.get("link", ""):
        return "event"
    return "page"


def page_path(item: dict) -> str:
    value = re.sub(r"^https?://(?:www\.)?pccadla\.com", "", item["link"])
    return value.rstrip("/") or "/"


def read_csv_was_utf8(path: Path) -> list[dict[str, str]]:
    with path.open(newline="") as handle:
        return list(csv.DictReader(handle))


def write_index_json(path: Path, rows: list[dict]) -> None:
    path.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n")


def build_pages(content: dict, export: Path) -> list[dict]:
    rows = content.get("page", []) + content.get("tribe_events", [])
    index = []
    for item in rows:
        kind = page_type(item)
        slug = item.get("slug") or f"untitled-{item['id']}"
        title = text_from_html(item.get("title", {}).get("rendered")) or slug
        body = item.get("content", {}).get("rendered") or ""
        excerpt = text_from_html(item.get("excerpt", {}).get("rendered"))
        text = text_from_html(body)
        path = page_path(item)
        target = export / f"{kind}s" / f"{item['id']}-{slug}.md"
        assets = assets_from_html(body)
        lines = [
            f"# {title}",
            "",
            f"- URL original: {item['link']}",
            f"- Ruta: {path}",
            f"- Tipo: {kind}",
            f"- ID WordPress: {item['id']}",
            f"- Publicado: {item.get('date', '')}",
            f"- Modificado: {item.get('modified', '')}",
            f"- Extracto: {excerpt}",
            "",
        ]
        if assets:
            lines.extend(["## Recursos enlazados", ""])
            lines.extend(f"- {asset}" for asset in assets)
            lines.append("")
        lines.extend(
            [
                "## Texto",
                "",
                text or "(Sin contenido textual publicado en la API.)",
                "",
            ]
        )
        target.write_text("\n".join(lines))
        index.append(
            {
                "id": item["id"],
                "title": title,
                "slug": slug,
                "type": kind,
                "url": item["link"],
                "path": path,
                "date": item.get("date", ""),
                "modified": item.get("modified", ""),
                "file": str(target),
                "assets": assets,
                "text_length": len(text),
            }
        )
    return index


def write_content_tables(index: list[dict], export: Path) -> None:
    visible_index = []
    for item in index:
        item = dict(item)
        source_file = Path(item["file"])
        if source_file.parts[:2] == (".firecrawl", "pccadla.com"):
            item["file"] = str(
                Path("content") / source_file.parts[3] / source_file.name
            )
        visible_index.append(item)
    write_index_json(export / "content-index.json", visible_index)
    fields = [
        "id",
        "title",
        "slug",
        "type",
        "url",
        "path",
        "date",
        "modified",
        "file",
        "text_length",
        "assets",
    ]
    with (export / "content-index.csv").open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for item in visible_index:
            writer.writerow(
                {
                    key: (
                        ";".join(item[key])
                        if key == "assets"
                        else item[key]
                    )
                    for key in fields
                }
            )

    with (export / "url-map.csv").open("w", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["url", "path", "section", "title", "status"])
        for item in index:
            section = (
                item["path"].strip("/").split("/", 1)[0]
                if item["path"] != "/"
                else "inicio"
            )
            writer.writerow(
                [item["url"], item["path"], section, item["title"], "publicado"]
            )


def build_asset_manifest(media: list[dict], root: Path, export: Path) -> list[dict]:
    assets = []
    for item in media:
        source_url = item.get("source_url") or ""
        details = item.get("media_details") or {}
        relative = details.get("file") or source_url.split("/wp-content/uploads/", 1)[-1]
        target = root / "assets" / relative
        expected = details.get("filesize") or 0
        actual = target.stat().st_size if target.exists() else 0
        size_status = (
            "present"
            if actual > 0
            else "missing"
            if expected > 0
            else "source-empty"
        )
        assets.append(
            {
                "id": item["id"],
                "url": source_url,
                "path": str(target),
                "relative_path": relative,
                "type": item.get("media_type", ""),
                "mime": item.get("mime_type", ""),
                "size": actual,
                "expected_size": expected,
                "size_status": size_status,
                "width": details.get("width") or 0,
                "height": details.get("height") or 0,
                "alt": text_from_html(item.get("alt_text")),
                "date": item.get("date", ""),
            }
        )
    write_index_json(export / "asset-manifest.json", assets)
    fields = [
        "id",
        "relative_path",
        "mime",
        "size",
        "expected_size",
        "size_status",
        "width",
        "height",
        "alt",
        "url",
    ]
    with (export / "asset-manifest.csv").open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows({key: item[key] for key in fields} for item in assets)
    return assets


def write_architecture(index: list[dict], asset_count: int, export: Path) -> None:
    sections: dict[str, list[dict]] = collections.defaultdict(list)
    for item in index:
        section = (
            item["path"].strip("/").split("/", 1)[0]
            if item["path"] != "/"
            else "inicio"
        )
        sections[section].append(item)
    lines = [
        "# Arquitectura de información de PCCAD",
        "",
        "Fuente: https://pccadla.com · Exportación pública del 13 de noviembre de 2026.",
        "",
        f"Se inventariaron **{len(index)} páginas/eventos** y **{asset_count} archivos multimedia** desde la API pública de WordPress.",
        "",
    ]
    for section, items in sorted(
        sections.items(), key=lambda pair: (pair[0] != "inicio", pair[0])
    ):
        lines.extend([f"## {section}", ""])
        lines.extend(
            f"- [{item['title']}]({item['path']})"
            for item in sorted(items, key=lambda item: item["path"])
        )
        lines.append("")
    (export / "INFORMATION-ARCHITECTURE.md").write_text("\n".join(lines))


def write_assets(assets: list[dict], export: Path) -> None:
    lines = [
        "# Catálogo de assets",
        "",
        f"La biblioteca pública contiene {len(assets)} archivos. Los tamaños y rutas locales están en `asset-manifest.csv`.",
        "",
    ]
    for kind, label in (("image", "Imágenes"), ("file", "Documentos y multimedia")):
        group = [item for item in assets if item["type"] == kind]
        lines.extend([f"## {label} ({len(group)})", ""])
        lines.extend(
            f"- `{item['relative_path']}` — {item['mime']} — {item['width']}×{item['height']} — {item['size']:,} bytes"
            for item in group
        )
        lines.append("")
    (export / "ASSETS.md").write_text("\n".join(lines))


def write_navigation(root: Path, export: Path) -> None:
    class LinkExtractor(HTMLParser):
        def __init__(self) -> None:
            super().__init__(convert_charrefs=True)
            self.current: list[str] | None = None
            self.links: list[str] = []

        def handle_starttag(
            self, tag: str, attrs: list[tuple[str, str | None]]
        ) -> None:
            if tag == "a":
                self.current = []

        def handle_data(self, data: str) -> None:
            if self.current is not None:
                self.current.append(data)

        def handle_endtag(self, tag: str) -> None:
            if tag == "a" and self.current is not None:
                value = re.sub(r"\s+", " ", "".join(self.current)).strip()
                if value and value not in self.links:
                    self.links.append(value)
                self.current = None

    parser = LinkExtractor()
    parser.feed((root / "source" / "home.html").read_text(errors="ignore"))
    (export / "HOMEPAGE-NAVIGATION.md").write_text(
        "# Navegación observable en la portada\n\n"
        + "\n".join(f"- {value}" for value in parser.links)
        + "\n"
    )


def build_legacy_event_html(root: Path, export: Path) -> list[dict]:
    source_dir = root / "source" / "events"
    if not source_dir.exists():
        return []
    index = []
    for source in sorted(source_dir.glob("*.html")):
        class EventExtractor(HTMLParser):
            def __init__(self) -> None:
                super().__init__(convert_charrefs=True)
                self.title_parts: list[str] = []
                self.body_parts: list[str] = []
                self.asset_urls: set[str] = set()
                self.in_title = False
                self.title_depth = 0
                self.capture_body = False

            def handle_starttag(
                self, tag: str, attrs: list[tuple[str, str | None]]
            ) -> None:
                data = dict(attrs)
                for key in ("src", "data-src", "href", "poster", "data-srcset"):
                    value = data.get(key)
                    if value:
                        self.asset_urls.update(
                            candidate.strip().split(" ", 1)[0]
                            for candidate in value.split(",")
                        )
                if tag == "title":
                    self.in_title = True
                    self.title_depth = 1
                elif self.in_title:
                    self.title_depth += 1
                if tag in {"main", "article"} or (
                    tag == "div"
                    and "elementor-widget-theme-post-content" in (data.get("class") or "")
                ):
                    self.capture_body = True
                if self.capture_body:
                    for candidate in (data.get("srcset") or "").split(","):
                        self.asset_urls.add(candidate.strip().split(" ", 1)[0])

            def handle_endtag(self, tag: str) -> None:
                if self.in_title:
                    self.title_depth -= 1
                    if tag == "title" or self.title_depth <= 0:
                        self.in_title = False

            def handle_data(self, data: str) -> None:
                if self.in_title:
                    self.title_parts.append(data)
                if self.capture_body:
                    self.body_parts.append(data)

        parser = EventExtractor()
        parser.feed(source.read_text(errors="ignore"))
        title = re.sub(r"\s+", " ", "".join(parser.title_parts)).strip()
        body = re.sub(r"[ \t\r\f\v]+", " ", "".join(parser.body_parts))
        body = re.sub(r" *\n *", "\n", body)
        body = re.sub(r"\n{3,}", "\n\n", body).strip()
        body = re.split(
            r"(?m)\s+Powered by\s+(?:Joinchat|.*?)\s*(?:$|\n)|^\s*Encuéntranos en\s*$",
            body,
            maxsplit=1,
        )[0]
        if not body:
            fallback = source.read_text(errors="ignore")
            start = fallback.find('<section id="tribe-events-pg-template"')
            if start >= 0:
                fallback = fallback[start:]
                end = fallback.find('<div data-elementor-type="footer"')
                if end >= 0:
                    fallback = fallback[:end]
            fallback = re.sub(
                r"(?is)<(?:script|style|noscript|svg|header|footer|nav)\b.*?</(?:script|style|noscript|svg|header|footer|nav)>",
                "",
                fallback,
            )
            fallback = re.split(
                r'(?i)<div[^>]+class="[^"]*(?:site-footer|elementor-location-footer)[^"]*"',
                fallback,
                maxsplit=1,
            )[0]
            body = text_from_html(fallback)
            body = re.split(
                r"(?m)\s+Powered by\s+(?:Joinchat|.*?)\s*(?:$|\n)|^\s*Encuéntranos en\s*$",
                body,
                maxsplit=1,
            )[0]
        title = re.split(r"\s+[|·-]\s+PCCAD", title, maxsplit=1)[0]
        url = f"https://pccadla.com/event/{source.stem}/"
        assets = sorted(
            asset
            for value in parser.asset_urls
            if (asset := re.sub(r"^https?://pccadla\.com", "", urljoin(url, value)))
            and asset.startswith("/wp-content/uploads/")
            and not asset.startswith(
                (
                    "/wp-content/plugins/a3-lazy-load/assets/images/lazy_placeholder",
                )
            )
        )
        target = export / "events" / f"archived-{source.stem}.md"
        visible_source = Path("source/events") / source.name
        target.write_text(
            "\n".join(
                [
                    f"# {title}",
                    "",
                    f"- URL original: {url}",
                    f"- Ruta: /event/{source.stem}",
                    "- Tipo: event",
                    "- Estado: referencia archivada; no figura en el feed público actual",
                    f"- Archivo HTML original: {visible_source}",
                    "",
                    "## Recursos enlazados",
                    "",
                    *[f"- {asset}" for asset in assets],
                    "",
                    "## Texto",
                    "",
                    body or "(Sin texto público observable.)",
                    "",
                ]
            )
        )
        index.append(
            {
                "id": f"archived-{source.stem}",
                "title": title,
                "slug": source.stem,
                "type": "event",
                "url": url,
                "path": f"/event/{source.stem}",
                "date": "",
                "modified": "",
                "file": str(target),
                "assets": assets,
                "text_length": len(body),
                "status": "archived",
            }
        )
    return index


def main() -> None:
    export = EXPORT
    (export / "pages").mkdir(parents=True, exist_ok=True)
    (export / "events").mkdir(parents=True, exist_ok=True)
    content = json.loads((API / "content.json").read_text())
    media = json.loads((API / "media.json").read_text())
    index = build_pages(content, export)
    legacy_events = build_legacy_event_html(ROOT, export)
    current_event_urls = {item["url"].rstrip("/") for item in index}
    index.extend(
        item
        for item in legacy_events
        if item["url"].rstrip("/") not in current_event_urls
    )
    write_content_tables(index, export)
    assets = build_asset_manifest(media, ROOT, export)
    write_architecture(index, len(assets), export)
    write_assets(assets, export)
    write_navigation(ROOT, export)
    downloaded = sum(item["size_status"] == "present" for item in assets)
    print(
        f"Built {len(index)} pages and {len(assets)} asset records; "
        f"{downloaded} assets are present on disk."
    )
    print(
        "Page types: "
        + ", ".join(
            f"{kind}={count}"
            for kind, count in collections.Counter(
                item["type"] for item in index
            ).items()
        )
    )


if __name__ == "__main__":
    main()
