const fs = require('fs');
const path = require('path');

const dir = 'src/components/interactive';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // We will split the file by tags.
  // Actually, a safer way to replace light text colors without breaking dark mode:
  // Find instances of text-gray-400, text-gray-500, text-slate-400, text-slate-500
  // and text-slate-300, text-gray-300.
  // Replace ONLY if the class string DOES NOT have dark background classes, 
  // AND we can heuristicly check if the component is likely dark by looking 500 chars backwards.
  
  // A much safer regex: Find the class="..." string.
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
    
    // Otherwise, replace light text colors with darker ones.
    let newClassStr = classStr
      .replace(/\btext-gray-400\b/g, 'text-gray-600')
      .replace(/\btext-gray-500\b/g, 'text-gray-700')
      .replace(/\btext-slate-400\b/g, 'text-slate-600')
      .replace(/\btext-slate-500\b/g, 'text-slate-700')
      .replace(/\btext-slate-300\b/g, 'text-slate-600') // Very light text -> dark
      .replace(/\btext-gray-300\b/g, 'text-gray-600')
      .replace(/\btext-indigo-300\b/g, 'text-indigo-600')
      .replace(/\btext-indigo-400\b/g, 'text-indigo-600');
      
    if (newClassStr !== classStr) {
      return 'className=' + quote + newClassStr + quote;
    }
    return match;
  });

  // What if the dark background was applied to a parent div?
  // Let's also check if the whole file is mostly dark?
  // If the file is mostly dark, we should be careful.
  
  if (newContent !== original) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
});

console.log('Done');
