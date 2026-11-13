import sharp from 'sharp';
import fs from 'node:fs';
const dir='docs/design-references/build';
const tag=process.argv[2]||'all';
const files = fs.readdirSync(dir).filter(f=>/-\d\d\.png$/.test(f) && (tag==='all'||f.startsWith(tag))).sort();
const cols=5, w=340, h=212;
const rows=Math.ceil(files.length/cols);
const comps=[];
for (let i=0;i<files.length;i++){
  const buf = await sharp(`${dir}/${files[i]}`).resize(w,h,{fit:'cover'}).toBuffer();
  comps.push({input:buf, left:(i%cols)*w, top:Math.floor(i/cols)*h});
}
await sharp({create:{width:cols*w,height:rows*h,channels:3,background:'#111'}}).composite(comps).jpeg({quality:80}).toFile(`${dir}/sheet-${tag}.jpg`);
console.log(files.length, 'files →', `sheet-${tag}.jpg`);
