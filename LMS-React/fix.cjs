const fs = require('fs');
const path = require('path');

// 1. Fix interactive components
const dir = 'src/components/interactive';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

console.log(`Fixing ${files.length} interactive components...`);
let updatedInteractiveCount = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace text colors only in class names where there are no dark backgrounds
  let newContent = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classStr) => {
    // If the class string contains a dark bg, leave the text colors alone.
    if (classStr.includes('bg-slate-900') || 
        classStr.includes('bg-slate-800') || 
        classStr.includes('bg-slate-700') ||
        classStr.includes('bg-gray-900') || 
        classStr.includes('bg-gray-800') || 
        classStr.includes('bg-gray-700') ||
        classStr.includes('bg-emerald-900') ||
        classStr.includes('bg-red-900') ||
        classStr.includes('bg-indigo-900')) {
      return match;
    }
    
    // Otherwise, replace light text colors with darker ones for better WCAG contrast.
    let newClassStr = classStr
      .replace(/\btext-gray-400\b/g, 'text-gray-600')
      .replace(/\btext-gray-500\b/g, 'text-gray-700')
      .replace(/\btext-slate-400\b/g, 'text-slate-600')
      .replace(/\btext-slate-500\b/g, 'text-slate-700')
      .replace(/\btext-slate-300\b/g, 'text-slate-600')
      .replace(/\btext-gray-300\b/g, 'text-gray-600')
      .replace(/\btext-indigo-300\b/g, 'text-indigo-600')
      .replace(/\btext-indigo-400\b/g, 'text-indigo-600');
      
    if (newClassStr !== classStr) {
      return 'className=' + quote + newClassStr + quote;
    }
    return match;
  });

  if (newContent !== original) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    updatedInteractiveCount++;
  }
});

console.log(`Updated ${updatedInteractiveCount} interactive files.`);

// 2. Fix src/App.jsx
const appPath = 'src/App.jsx';
if (fs.existsSync(appPath)) {
  console.log('Fixing App.jsx...');
  let appContent = fs.readFileSync(appPath, 'utf8');
  let originalApp = appContent;

  // Let's replace text-gray-400, text-gray-500, text-gray-600 with higher contrast
  let newAppContent = appContent
    .replace(/\btext-gray-600\b/g, 'text-gray-700')
    .replace(/\btext-gray-500\b/g, 'text-gray-600')
    .replace(/\btext-gray-400\b/g, 'text-gray-500')
    .replace(/\btext-slate-500\b/g, 'text-slate-600');

  if (newAppContent !== originalApp) {
    fs.writeFileSync(appPath, newAppContent, 'utf8');
    console.log('App.jsx contrast updated.');
  }
}

// 3. Fix src/index.css
const cssPath = 'src/index.css';
if (fs.existsSync(cssPath)) {
  console.log('Fixing index.css...');
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  let originalCss = cssContent;

  // Replace colors in CSS definitions
  let newCssContent = cssContent.replace(/color:\s*var\(--color-gray-700\);/g, 'color: var(--color-gray-800);');

  if (newCssContent !== originalCss) {
    fs.writeFileSync(cssPath, newCssContent, 'utf8');
    console.log('index.css contrast updated.');
  }
}

console.log('All contrast accessibility fixes completed successfully!');
