import fs from 'fs';
const p = process.argv[2];
let c = fs.readFileSync(p, 'utf8');
const n = (c.match(/motionless/g) || []).length;
c = c.replaceAll('motionless', 'div');
fs.writeFileSync(p, c, 'utf8');
console.log('replaced', n, 'in', p);
