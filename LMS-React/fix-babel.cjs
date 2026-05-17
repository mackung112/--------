const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const dir = 'src/components/interactive';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

let updatedFiles = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  let ast;
  try {
    ast = parser.parse(content, { 
      sourceType: 'module', 
      plugins: ['jsx'] 
    });
  } catch (e) {
    console.error(`Error parsing ${f}:`, e.message);
    return;
  }

  const replacements = [];

  traverse(ast, {
    JSXOpeningElement(path) {
      let isDark = false;
      let curr = path;
      
      while (curr) {
        let opening = null;
        if (curr.node.type === 'JSXOpeningElement') {
          opening = curr.node;
        } else if (curr.node.type === 'JSXElement') {
          opening = curr.node.openingElement;
        }

        if (opening) {
          const classAttr = opening.attributes.find(a => a.name && a.name.name === 'className');
          if (classAttr && classAttr.value && classAttr.value.type === 'StringLiteral') {
            const val = classAttr.value.value;
            // Catch dark backgrounds (700-950)
            if (/bg-(slate|gray|zinc|neutral|emerald|indigo|red|blue|purple|pink)-(700|800|900|950)/.test(val) || val.includes('bg-slate-900') || val.includes('bg-slate-800')) {
              isDark = true;
              break;
            }
          }
        }
        curr = curr.parentPath;
      }
      
      if (!isDark) {
        const classAttr = path.node.attributes.find(a => a.name && a.name.name === 'className');
        if (classAttr && classAttr.value && classAttr.value.type === 'StringLiteral') {
          const oldVal = classAttr.value.value;
          let newVal = oldVal
            .replace(/\btext-(slate|gray|zinc)-[345]00\b/g, 'text-$1-600')
            .replace(/\btext-(indigo|blue|emerald|pink|orange|purple)-[34]00\b/g, 'text-$1-600')
            .replace(/\btext-yellow-[34]00\b/g, 'text-yellow-600');
            
          if (newVal !== oldVal) {
            replacements.push({
              start: classAttr.value.start,
              end: classAttr.value.end,
              newText: `"${newVal}"`
            });
          }
        }
      }
    }
  });

  if (replacements.length > 0) {
    replacements.sort((a, b) => b.start - a.start);
    for (const rep of replacements) {
      content = content.slice(0, rep.start) + rep.newText + content.slice(rep.end);
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      updatedFiles++;
    }
  }
});

console.log('Files updated:', updatedFiles);
