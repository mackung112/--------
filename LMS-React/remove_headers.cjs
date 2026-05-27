const fs = require('fs');
const path = require('path');

const filesToProcess = [
    'pyUnit4_3_PrintFormat.jsx',
    'pyUnit4_2_InputDemo.jsx',
    'pyUnit4_4_ArithmeticOps.jsx',
    'pyUnit4_5_AssignmentOps.jsx',
    'pyUnit4_6_ComparisonOps.jsx',
    'pyUnit4_7_LogicalOps.jsx',
    'pyUnit4_8_IdentityOps.jsx',
    'pyUnit4_9_MembershipOps.jsx'
];

const componentsDir = path.join(__dirname, 'src/components/interactive');

let processedCount = 0;

for (let filename of filesToProcess) {
    let filePath = path.join(componentsDir, filename);
    if (!fs.existsSync(filePath)) {
        console.warn('File not found:', filename);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to find the <header> block and optional preceding comment
    // e.g. {/* Header Section */} \n <header ...> ... </header>
    const headerRegex = /(?:\{\/\*.*?[hH]eader.*?\*\/\}\s*)?<header\b[^>]*>[\s\S]*?<\/header>\s*/g;
    
    if (headerRegex.test(content)) {
        let newContent = content.replace(headerRegex, '');
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Removed header from:', filename);
        processedCount++;
    } else {
        console.log('No <header> block found in:', filename);
    }
}

console.log(`Finished processing. Removed headers from ${processedCount} files.`);
