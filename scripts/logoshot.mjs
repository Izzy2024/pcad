import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const [w,h] of [[1440,900],[390,844]]) {
  const p = await (await b.newContext({viewport:{width:w,height:h}, deviceScaleFactor:2})).newPage();
  await p.goto('http://localhost:3000/',{waitUntil:'networkidle'});
  await p.waitForTimeout(2000);
  await p.locator('header').screenshot({ path:`docs/design-references/build/logo-nav-${w}.png` });
  const box = await p.locator('header img').first().boundingBox();
  console.log(w, 'logo box', JSON.stringify(box));
  await p.close();
}
// footer
const p = await (await b.newContext({viewport:{width:1440,height:900}, deviceScaleFactor:2})).newPage();
await p.goto('http://localhost:3000/',{waitUntil:'networkidle'});
await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
await p.waitForTimeout(1500);
await p.locator('footer').screenshot({ path:'docs/design-references/build/logo-footer.png' });
await b.close();
