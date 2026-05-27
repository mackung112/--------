const fs = require('fs');
const path = require('path');

const pyCoursePath = path.join(__dirname, 'src/data/pyCourse.js');
const currPath = path.join(__dirname, 'docs/curriculum/py_curriculum.md');

// 1. Parse Curriculum
const currContent = fs.readFileSync(currPath, 'utf8');
const currLines = currContent.split('\n');
let currMap = {};
let currentLesson = null;
let currentSubtopics = [];

for (let line of currLines) {
    let matchLesson = line.match(/^- (\d+\.\d+) (.*)/);
    if (matchLesson) {
        if (currentLesson) {
            currMap[currentLesson] = currentSubtopics;
        }
        currentLesson = matchLesson[1];
        currentSubtopics = [];
    } else {
        let matchSub = line.match(/^  - \d+\.\d+\.\d+ (.*)/);
        if (matchSub && currentLesson) {
            currentSubtopics.push(matchSub[1]);
        }
    }
}
if (currentLesson) currMap[currentLesson] = currentSubtopics;

// 2. English Subtitle Mapping
const engSubtitles = {
    "1.1": "(Introduction to Programming)",
    "1.2": "(Levels of Programming Languages)",
    "1.3": "(Interpreter vs Compiler)",
    "1.4": "(Features of Python)",
    "1.5": "(Python & IDE Setup)",
    "2.1": "(Concepts & Algorithms)",
    "2.2": "(Software Development Life Cycle)",
    "2.3": "(Flowchart Symbols)",
    "2.4": "(Sequential Flowchart)",
    "2.5": "(Selection Flowchart)",
    "2.6": "(Iteration Flowchart)",
    "2.7": "(Flowchart Best Practices)",
    "2.8": "(Writing Pseudocode)",
    "2.9": "(Basic Pseudocode Commands)",
    "2.10": "(Conditional Pseudocode)",
    "2.11": "(Looping Pseudocode)",
    "2.12": "(Pseudocode Structuring)",
    "3.1": "(Python Code Structure)",
    "3.2": "(Variable Naming Rules)",
    "3.3": "(Integer Data Type)",
    "3.4": "(Float Data Type)",
    "3.5": "(String Data Type)",
    "3.6": "(Boolean Data Type)",
    "3.7": "(Importing Modules)",
    "3.8": "(Memory Allocation)",
    "4.1": "(Print Function)",
    "4.2": "(Input Function)",
    "4.3": "(Arithmetic Operators)",
    "4.4": "(Assignment Operators)",
    "4.5": "(Comparison Operators)",
    "4.6": "(Logical Operators)",
    "4.7": "(Identity Operators)",
    "4.8": "(Membership Operators)",
    "4.9": "(Bitwise Operators)",
    "4.10": "(If Statement)",
    "4.11": "(Elif Statement)",
    "4.12": "(Else Statement)",
    "4.13": "(While Loop)",
    "4.14": "(For Loop)",
    "4.15": "(Range Function)",
    "5.1": "(List Operations)",
    "5.2": "(Tuple and Dictionary)",
    "5.3": "(Set and String Slicing)",
    "6.1": "(Built-in Functions)",
    "6.2": "(Functions & Parameters)",
    "6.3": "(Return & Variable Scope)",
    "6.4": "(Testing & Using Functions)",
    "7.1": "(Business Program Design)",
    "7.2": "(Condition & Loop Practice)",
    "7.3": "(Error Handling)",
    "7.4": "(File I/O)",
    "8.1": "(System Documentation)",
    "8.2": "(Mini Project: POS)"
};

// 3. Update pyCourse.js
let pyCourse = fs.readFileSync(pyCoursePath, 'utf8');
let lines = pyCourse.split('\n');
let newLines = [];
let insideLesson = false;
let currentId = '';

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (line.match(/^\s*\{\s*$/)) {
        if (lines[i+1] && lines[i+1].includes('id:')) {
            insideLesson = true;
            let idMatch = lines[i+1].match(/id:\s*["']([^"']+)["']/);
            if (idMatch) {
                currentId = idMatch[1];
            }
        }
    }
    
    if (insideLesson) {
        if (line.includes('subTitle:')) {
            // Replace subTitle if we have one in map
            let indent = line.match(/^(\s*)/)[1];
            if (engSubtitles[currentId]) {
                line = indent + 'subTitle: "' + engSubtitles[currentId] + '",';
            }
        }
        
        if (line.includes('description:')) {
            // Check if curriculum has subtopics to enrich description
            let indent = line.match(/^(\s*)/)[1];
            let subtopics = currMap[currentId] || [];
            if (subtopics.length > 0) {
                // Prepend original description with subtopics
                let origDescMatch = line.match(/description:\s*["'](.*)["'],?/);
                if (origDescMatch) {
                    let origDesc = origDescMatch[1];
                    let enriched = `ครอบคลุมหัวข้อ: ${subtopics.join(', ')} | ${origDesc}`;
                    line = indent + 'description: "' + enriched + '",';
                }
            }
        }
        
        if (line.includes('content:')) {
            insideLesson = false;
        }
    }
    
    newLines.push(line);
}

fs.writeFileSync(pyCoursePath, newLines.join('\n'), 'utf8');
console.log('Successfully enriched pyCourse.js with curriculum data and English subtitles!');
