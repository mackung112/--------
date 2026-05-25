const fs = require('fs');

const fix = (file, search, tail) => {
  let content = fs.readFileSync(file, 'utf8');
  const idx = content.lastIndexOf(search);
  if (idx !== -1) {
    content = content.substring(0, idx + search.length) + tail;
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
}

const tail1 = `
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}

// Helper icon component
function FileIcon() {
  return (
    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.14,7.5A2.86,2.86,0,0,1,16.5,4.86V4.5a2.5,2.5,0,0,0-5,0v.36A2.86,2.86,0,0,1,8.86,7.5H8.5a2.5,2.5,0,0,0,0,5h.36a2.86,2.86,0,0,1,2.64,2.64v.36a2.5,2.5,0,0,0,5,0v-.36A2.86,2.86,0,0,1,19.14,12.5h.36a2.5,2.5,0,0,0,0-5Zm-2.64,3.5A4.35,4.35,0,0,0,12.5,15v.36a1,1,0,0,1-2,0V15A4.35,4.35,0,0,0,6.5,11H6a1,1,0,0,1,0-2H6.5A4.35,4.35,0,0,0,10.5,5V4.64a1,1,0,0,1,2,0V5a4.35,4.35,0,0,0,4,4h.5a1,1,0,0,1,0,2Z"/>
    </svg>
  );
}
`;

fix('d:/Teach/LMS-React/src/components/interactive/pyUnit1_6_PythonicWay.jsx', '{log.msg}', tail1);

const tail2 = `
          </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}

function FlowNode({ step, isActive, y }) {
  return (
    <div className={\`absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-700 \${isActive ? 'scale-110 opacity-100 z-10' : 'scale-90 opacity-60 z-0'}\`} style={{ top: y }}>
      <div className={\`w-48 py-3 px-4 rounded-xl shadow-lg border-2 text-center transition-colors duration-500 \${
        isActive 
          ? 'bg-gradient-to-r ' + step.color + ' border-white/50 text-white' 
          : 'bg-white border-slate-200 text-slate-600'
      }\`}>
        <div className="font-bold text-sm tracking-wide">{step.title}</div>
        <div className={\`text-xs mt-1 opacity-90 \${isActive ? 'text-white' : 'text-slate-500'}\`}>{step.type}</div>
      </div>
    </div>
  );
}
`;

fix('d:/Teach/LMS-React/src/components/interactive/pyUnit2_4_SequenceFlowchart.jsx', '{step.desc}</div>', tail2);

const tail3 = `
          </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}

function HighlightPseudo({ line }) {
  const parts = line.split(/(\\bIF\\b|\\bTHEN\\b|\\bELSE\\b|\\bENDIF\\b|\\bFOR\\b|\\bWHILE\\b|\\bDO\\b|\\bREAD\\b|\\bPRINT\\b|\\bCALCULATE\\b)/);
  return (
    <span>
      {parts.map((part, i) => {
        if (['IF', 'THEN', 'ELSE', 'ENDIF', 'FOR', 'WHILE', 'DO', 'READ', 'PRINT', 'CALCULATE'].includes(part)) {
          return <span key={i} className="text-pink-500 font-bold">{part}</span>;
        }
        return <span key={i} className="text-slate-600">{part}</span>;
      })}
    </span>
  );
}
`;

fix('d:/Teach/LMS-React/src/components/interactive/pyUnit2_8_PseudocodeIntro.jsx', '>{example.code}</code>', tail3);
