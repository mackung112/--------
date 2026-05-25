const fs = require('fs');
let content = fs.readFileSync('d:/Teach/LMS-React/src/components/interactive/pyUnit1_6_PythonicWay.jsx', 'utf8');

// Find the last occurrence of '{log.msg}' and replace everything after it.
const searchStr = '{log.msg}\\n                  </span>\\n                </div>\\n              ))}\\n            </div>\\n          </div>\\n      </div>\\n    </div>\\n  );\\n}';
// Since it's currently broken, it just has:
// {log.msg}
//   );
// }

const idx = content.lastIndexOf('{log.msg}');
if (idx !== -1) {
  content = content.substring(0, idx + 9) + \
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="???????????????????" taskText="??????????????????????? Simulator ???" />
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
\;
  fs.writeFileSync('d:/Teach/LMS-React/src/components/interactive/pyUnit1_6_PythonicWay.jsx', content);
  console.log('Fixed pyUnit1_6');
}
