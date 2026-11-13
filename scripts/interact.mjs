import { chromium } from 'playwright';
const exe='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b = await chromium.launch({ headless:true, executablePath: exe });
const ctx = await b.newContext({viewport:{width:1440,height:900}});
const p = await ctx.newPage();
await p.goto('http://localhost:3000/',{waitUntil:'networkidle'});
await p.waitForTimeout(2000);

// 1. Hover Software dropdown
await p.hover('button:has-text("Software")');
await p.waitForTimeout(700);
const dd = await p.locator('a:has-text("Bentley Systems")').first().isVisible().catch(()=>false);
console.log('dropdown visible:', dd);
await p.screenshot({path:'docs/design-references/build/ix-dropdown.png'});

// 2. FAQ accordion
await p.mouse.move(700,700);
await p.evaluate(()=>{ const el=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('¿En qué consiste')); el?.scrollIntoView({block:'center'}); });
await p.waitForTimeout(900);
await p.click('button:has-text("¿En qué consiste la implementación BIM?")');
await p.waitForTimeout(800);
const faq = await p.evaluate(()=>{ const e=[...document.querySelectorAll('p')].find(x=>x.textContent.includes('Diseñamos el estándar')); return e? getComputedStyle(e.parentElement.parentElement).gridTemplateRows : 'nf'; });
console.log('faq open rows:', faq);
await p.screenshot({path:'docs/design-references/build/ix-faq.png'});

// 3. HowItWorks scroll-driven step change
await p.evaluate(()=>window.scrollTo(0,0));
await p.waitForTimeout(500);
const stepStart = await p.evaluate(()=>{ const s=[...document.querySelectorAll('section')].find(x=>x.style.height && x.offsetHeight>2000); return s? s.offsetTop : 0; });
await p.evaluate(y=>window.scrollTo(0,y), stepStart + 1800);
await p.waitForTimeout(1200);
await p.screenshot({path:'docs/design-references/build/ix-how.png'});
console.log('stepStart', stepStart);

// 4. Contact form submit
await p.goto('http://localhost:3000/contacto',{waitUntil:'networkidle'});
await p.fill('#nombre','Ana'); await p.fill('#apellido','Pérez');
await p.fill('#email','ana@obra.com'); await p.fill('#telefono','+507 6000');
await p.selectOption('#pais','Panamá'); await p.selectOption('#interes','Software');
await p.fill('#mensaje','Necesitamos 10 licencias de Revit.');
await p.click('button:has-text("Enviar solicitud")');
await p.waitForTimeout(900);
const thanks = await p.locator('text=Gracias. Te contactamos en breve.').isVisible();
console.log('form success:', thanks);
await p.screenshot({path:'docs/design-references/build/ix-form.png'});

// 5. Mobile menu
const m = await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await m.goto('http://localhost:3000/',{waitUntil:'networkidle'});
await m.click('button[aria-label="Abrir menú"]');
await m.waitForTimeout(700);
const menuOpen = await m.locator('a:has-text("Certificaciones")').first().isVisible();
console.log('mobile menu:', menuOpen);
await m.screenshot({path:'docs/design-references/build/ix-mobilemenu.png'});

await b.close();
