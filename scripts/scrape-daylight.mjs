import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'docs/research/daylight';
const SHOTS = 'docs/design-references/daylight';
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: process.env.HOME + '/Library/Caches/ms-playwright/chromium-1181/chrome-mac/Chromium.app/Contents/MacOS/Chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
const page = await ctx.newPage();
page.setDefaultTimeout(90000);
await page.goto('https://godaylight.com/', { waitUntil: 'networkidle', timeout: 90000 }).catch(e => console.log('goto warn', e.message));
await page.waitForTimeout(4000);

console.log('TITLE', await page.title());
await page.screenshot({ path: `${SHOTS}/home-1440-top.png` });
await page.screenshot({ path: `${SHOTS}/home-1440-full.png`, fullPage: true });

const struct = await page.evaluate(() => {
  const props = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','textTransform','textDecoration','backgroundColor','backgroundImage','padding','margin','width','height','maxWidth','display','flexDirection','justifyContent','alignItems','gap','gridTemplateColumns','borderRadius','border','boxShadow','overflow','position','top','left','right','bottom','zIndex','opacity','transform','transition','objectFit','mixBlendMode','filter','backdropFilter','whiteSpace','WebkitLineClamp'];
  function st(el){
    const cs = getComputedStyle(el); const o = {};
    for (const p of props) { const v = cs[p]; if (v && v!=='none' && v!=='normal' && v!=='auto' && v!=='0px' && v!=='rgba(0, 0, 0, 0)') o[p]=v; }
    return o;
  }
  function walk(el, d){
    if (d>6) return null;
    const r = el.getBoundingClientRect();
    const kids = [...el.children];
    return {
      tag: el.tagName.toLowerCase(),
      cls: (el.className||'').toString().slice(0,180),
      id: el.id||undefined,
      text: (el.childNodes.length && [...el.childNodes].every(n=>n.nodeType===3)) ? el.textContent.trim().slice(0,300) : null,
      rect: {x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height)},
      styles: st(el),
      img: el.tagName==='IMG' ? {src: el.currentSrc||el.src, alt: el.alt, w: el.naturalWidth, h: el.naturalHeight} : null,
      kids: kids.slice(0,25).map(k=>walk(k,d+1)).filter(Boolean)
    };
  }
  return walk(document.body, 0);
});
fs.writeFileSync(`${OUT}/dom-structure.json`, JSON.stringify(struct, null, 1));

const assets = await page.evaluate(() => ({
  images: [...document.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src, alt:i.alt, w:i.naturalWidth, h:i.naturalHeight, cls:(i.className||'').toString().slice(0,120)})),
  videos: [...document.querySelectorAll('video')].map(v=>({src:v.currentSrc||v.src, poster:v.poster, sources:[...v.querySelectorAll('source')].map(s=>s.src)})),
  bgs: [...document.querySelectorAll('*')].map(el=>{const b=getComputedStyle(el).backgroundImage; return b && b!=='none' ? {url:b, el:el.tagName+'.'+(el.className||'').toString().split(' ')[0]} : null}).filter(Boolean),
  svgs: [...document.querySelectorAll('svg')].length,
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0,400).map(el=>getComputedStyle(el).fontFamily))],
  icons: [...document.querySelectorAll('link[rel*="icon"]')].map(l=>l.href),
  links: [...document.querySelectorAll('a')].map(a=>({href:a.getAttribute('href'), text:a.textContent.trim().slice(0,80)})),
  docH: document.documentElement.scrollHeight
}));
fs.writeFileSync(`${OUT}/assets.json`, JSON.stringify(assets, null, 1));
fs.writeFileSync(`${OUT}/sections.json`, JSON.stringify(await page.evaluate(()=>{
  const out=[]; const seen=new Set();
  document.querySelectorAll('main > *, body > div > main > *, section').forEach((el,i)=>{
    const r=el.getBoundingClientRect(); const key=Math.round(r.y+window.scrollY)+':'+Math.round(r.height);
    if (r.height<40 || seen.has(key)) return; seen.add(key);
    out.push({i, tag:el.tagName.toLowerCase(), cls:(el.className||'').toString().slice(0,150), y:Math.round(r.y+window.scrollY), h:Math.round(r.height), text:el.innerText?.slice(0,160)});
  });
  return out;
}), null, 1));
console.log('docHeight', assets.docH, 'images', assets.images.length, 'videos', assets.videos.length);
await browser.close();
