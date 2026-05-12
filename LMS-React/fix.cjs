const fs = require('fs');
const files = [
  'src/components/InheritanceBuilder.jsx',
  'src/components/PythonTerminalSimulator.jsx',
  'src/components/SelfKeywordDemo.jsx',
  'src/components/EncapsulationDemo.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\\`/g, '\`');
  content = content.replace(/\\\$\{/g, '${');
  fs.writeFileSync(f, content);
  console.log('Fixed ' + f);
});
