const fs = require('fs');
const filePath = 'd:/Teach/LMS-React/src/data/pyCourse.js';
let content = fs.readFileSync(filePath, 'utf8');

// Regex to match a lesson object block
// We find blocks starting with { and ending before content: `...`
// Wait, we can parse the AST or use a simple string replacement.
// Let's do it simply:
// Find `title: "...",` and if the next lines don't have mainTitle, subTitle, or description, add them.

let lines = content.split('\n');
let newLines = [];
let insideLesson = false;
let currentLessonStart = -1;
let currentTitle = '';
let currentHasMain = false;
let currentHasSub = false;
let currentHasDesc = false;
let currentHasId = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (line.match(/^\s*\{\s*$/)) {
        // Might be start of lesson if next few lines have id or title
        if (lines[i+1] && (lines[i+1].includes('id:') || lines[i+1].includes('title:'))) {
            insideLesson = true;
            currentHasMain = false;
            currentHasSub = false;
            currentHasDesc = false;
            currentHasId = false;
            currentTitle = '';
        }
    }
    
    if (insideLesson) {
        if (line.includes('id:')) currentHasId = true;
        if (line.includes('title:')) {
            let match = line.match(/title:\s*["']([^"']+)["']/);
            if (match) currentTitle = match[1];
        }
        if (line.includes('mainTitle:')) currentHasMain = true;
        if (line.includes('subTitle:')) currentHasSub = true;
        if (line.includes('description:')) currentHasDesc = true;
        
        if (line.includes('content:')) {
            // Before adding content, add missing fields
            let indentMatch = line.match(/^(\s*)/);
            let indent = indentMatch ? indentMatch[1] : '                    ';
            
            // Generate fallbacks based on title
            // e.g. "1.1 อัลกอริทึม (Algorithm)" -> main = "อัลกอริทึม", sub = "(Algorithm)"
            let mainFallback = currentTitle;
            let subFallback = "";
            let matchTitle = currentTitle.match(/^\d+\.\d+\s+(.*?)(?:\s+(\([^)]+\)))?$/);
            if (matchTitle) {
                mainFallback = matchTitle[1];
                if (matchTitle[2]) subFallback = matchTitle[2];
            }
            
            let idFallback = currentTitle.match(/^(\d+\.\d+)/) ? currentTitle.match(/^(\d+\.\d+)/)[1] : "";
            
            if (!currentHasId && idFallback) {
                newLines.push(indent + 'id: "' + idFallback + '",');
            }
            if (!currentHasMain) {
                newLines.push(indent + 'mainTitle: "' + mainFallback + '",');
            }
            if (!currentHasSub) {
                newLines.push(indent + 'subTitle: "' + subFallback + '",');
            }
            if (!currentHasDesc) {
                newLines.push(indent + 'description: "คำอธิบายเนื้อหาสำหรับบทเรียนนี้",');
            }
            insideLesson = false;
        }
    }
    
    newLines.push(line);
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Fixed missing properties in pyCourse.js');
