const fs = require('fs');

const fixFile = (path) => {
  let content = fs.readFileSync(path, 'utf8');
  
  // Cut everything after the helper function name to remove the bad tail
  // We can just use string splitting
  
  const funcSplit = content.split('\nfunction ');
  if (funcSplit.length > 1) {
    let mainPart = funcSplit[0];
    let helperPart = funcSplit[1];
    
    // In the main part, we need to inject the immersive closing BEFORE the end
    // Find the last </div>\\s*\\);\\s*}
    const lastDivs = /<\/div>\s*\);\s*}\s*$/;
    mainPart = mainPart.replace(lastDivs, \          </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="???????????????????" taskText="??????????????????????? Simulator ???" />
      </div>
    </div>
  );
}
\);
    
    // In the helper part, the script added the immersive tail to it, we need to strip it.
    // The helper function should just end normally.
    // For FileIcon, it should end with: </svg>\n  );\n}
    // For FlowNode, it ends with: </div>\n  );\n}
    // For HighlightPseudo, it ends with: </div>\n  );\n}
    
    // We will just find the first closing brace \n} of the helper function, 
    // and slice the rest of the garbage off.
    // Wait, some helper functions have multiple blocks.
    
    // Actually, I can just restore them from the original files if I have backups? No backups.
    // Let's just fix it manually.
  }
};

