import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT='docs/design-references/build/animo';
fs.mkdirSync(OUT,{recursive:true});
const b = await chromium.launch({ headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:3000/',{waitUntil:'networkidle'});
await p.waitForTimeout(2500);

// encontrar el <ul> de pilares
const ulTop = await p.evaluate(()=>{
  const li=document.querySelector('ul > li');
  const ul=li?.parentElement;
  return ul? Math.round(ul.getBoundingClientRect().top+scrollY) : 0;
});
console.log('ul top', ulTop);

const frames=[];
for (let k=0;k<8;k++){
  const y = Math.round(ulTop - 600 + k*220);
  await p.evaluate(yy=>window.scrollTo(0,yy), y);
  await p.waitForTimeout(500);
  // medir alturas de los bloques de color
  const hs = await p.evaluate(()=>[...document.querySelectorAll('ul > li')].map(li=>{
    const div=li.querySelector('div[style*="height"]');
    return div? Math.round(div.getBoundingClientRect().height) : -1;
  }));
  await p.screenshot({path:`${OUT}/f${k}-y${y}.png`});
  frames.push({y, hs});
}
frames.forEach(f=>console.log('y',f.y,'alturas celda:',f.hs.join(', ')));
await b.close();
