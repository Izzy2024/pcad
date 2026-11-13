import { chromium } from 'playwright';
import fs from 'node:fs';
const exe='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.argv[2] || 'http://localhost:3000/';
const tag = process.argv[3] || 'home';
const W = Number(process.argv[4] || 1440);
const dir='docs/design-references/build';
fs.mkdirSync(dir,{recursive:true});
const browser = await chromium.launch({ headless:true, executablePath: exe });
const ctx = await browser.newContext({ viewport:{width:W,height:900}, deviceScaleFactor:1 });
const page = await ctx.newPage();
const errs=[]; page.on('console', m=>{ if(m.type()==='error') errs.push(m.text().slice(0,200)); });
await page.goto(url,{waitUntil:'networkidle',timeout:60000});
await page.waitForTimeout(2500);
const H = await page.evaluate(()=>document.documentElement.scrollHeight);
console.log('H',H,'errs',errs.length); errs.slice(0,5).forEach(e=>console.log(' ',e));
let i=0;
for (let y=0; y<H; y+=900){
  await page.evaluate(yy=>window.scrollTo(0,yy), y);
  await page.waitForTimeout(900);
  await page.screenshot({path:`${dir}/${tag}-${W}-${String(i).padStart(2,'0')}.png`});
  i++; if(i>28) break;
}
await page.evaluate(()=>window.scrollTo(0,0));
await page.waitForTimeout(1200);
await page.screenshot({path:`${dir}/${tag}-${W}-full.png`, fullPage:true});
await browser.close();
console.log('shots', i);
