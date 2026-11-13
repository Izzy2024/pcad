import { chromium } from 'playwright';
const exe='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b = await chromium.launch({ headless:true, executablePath: exe });
const routes = ['/','/software','/software/autodesk','/software/autodesk/revit','/cursos','/cursos/curso-de-autodesk-revit-mep','/contacto','/certificaciones','/servicios','/hardware','/nosotros','/nosotros/trabaje-con-nosotros','/politicas-de-cumplimiento'];
for (const w of [1440, 390]) {
  const p = await (await b.newContext({viewport:{width:w,height:900}})).newPage();
  for (const r of routes) {
    const res = await p.goto('http://localhost:3000'+r, {waitUntil:'networkidle'});
    const o = await p.evaluate(()=>({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      imgs: [...document.images].filter(i=>!i.complete || i.naturalWidth===0).map(i=>i.currentSrc||i.src),
    }));
    const flag = o.sw > o.cw + 1 ? `OVERFLOW +${o.sw-o.cw}` : 'ok';
    console.log(w, res.status(), r.padEnd(42), flag, 'h1:'+o.h1, o.imgs.length?('broken:'+o.imgs.length):'');
    if (o.imgs.length) o.imgs.slice(0,3).forEach(x=>console.log('    ', x));
  }
  await p.close();
}
await b.close();
