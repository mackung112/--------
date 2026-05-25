import React, { useState, useRef, useEffect } from 'react';
import { Type, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';


const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mt-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{taskText}</p>
        </div>
        <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
          {copied ? <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> คัดลอกแล้ว</> : <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> คัดลอกโจทย์</>}
        </button>
      </div>
    </div>
  );
};

export default function SQL21901_U6_L6_SQLCaseDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'UPPER/LOWER Function Demo loaded.' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);
  const log = (text, type = 'output') => setConsoleHistory(prev => [...prev, { text, type }]);

  const users = [
    { id: 1, username: 'john_doe',   email: 'JOHN@EXAMPLE.COM',   role: 'admin' },
    { id: 2, username: 'JANE_SMITH', email: 'jane@example.com',   role: 'user' },
    { id: 3, username: 'Bob_Wilson', email: 'BOB@EXAMPLE.COM',    role: 'user' },
    { id: 4, username: 'alice_lee',  email: 'Alice@Example.com',  role: 'admin' },
  ];

  const scenarios = {
    upper: {
      title: '1. UPPER()',
      desc: 'แปลงข้อความทั้งหมดเป็นตัวพิมพ์ใหญ่',
      sqlStr: 'SELECT UPPER(username) AS username_upper FROM users;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">UPPER</span>(username) <span className="text-[#f9e2af]">AS</span> username_upper<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span>;
      </>),
      transform: (val) => val.toUpperCase(),
      col: 'username',
      resultLabel: 'username_upper',
    },
    lower: {
      title: '2. LOWER()',
      desc: 'แปลงข้อความทั้งหมดเป็นตัวพิมพ์เล็ก (มักใช้กับ email)',
      sqlStr: 'SELECT LOWER(email) AS email_lower FROM users;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">LOWER</span>(email) <span className="text-[#f9e2af]">AS</span> email_lower<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span>;
      </>),
      transform: (val) => val.toLowerCase(),
      col: 'email',
      resultLabel: 'email_lower',
    },
    where: {
      title: '3. UPPER ใน WHERE',
      desc: 'ใช้ UPPER() ใน WHERE เพื่อค้นหาแบบ case-insensitive',
      sqlStr: "SELECT * FROM users WHERE UPPER(role) = 'ADMIN';",
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">*</span><br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span><br/>
        <span className="text-[#cba6f7] font-bold">WHERE</span> <span className="text-[#89dceb]">UPPER</span>(role) = <span className="text-[#a6e3a1]">'ADMIN'</span>;
      </>),
      transform: null,
      col: 'role',
      resultLabel: null,
    },
  };

  const [activeScenario, setActiveScenario] = useState('upper');
  const [results, setResults] = useState([]);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRun = () => {
    setIsAnimating(true); setResults([]); setHighlightedRows([]);
    const s = scenarios[activeScenario];
    log(`mysql> ${s.sqlStr}`, 'command');
    setTimeout(() => {
      if (activeScenario === 'where') {
        const filtered = users.filter(u => u.role.toUpperCase() === 'ADMIN');
        setHighlightedRows(filtered.map(u => u.id));
        setResults(filtered.map(u => ({ id: u.id, val: u.username })));
        log(`> ${filtered.length} row(s) in set.`, 'success');
        filtered.forEach(u => log(`  → id=${u.id} username=${u.username}`, 'output'));
      } else {
        const r = users.map(u => ({ id: u.id, original: u[s.col], transformed: s.transform(u[s.col]) }));
        setResults(r);
        setHighlightedRows(users.map(u => u.id));
        setIsAnimating(false);
        r.forEach(row => log(`> ${row.original} → ${row.transformed}`, 'success'));
      }
      setIsAnimating(false);
    }, 500);
  };

  const reset = () => { setResults([]); setHighlightedRows([]); log('> System: Reset.', 'system'); };

  const s = scenarios[activeScenario];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg"><Type size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ฟังก์ชัน UPPER() / LOWER() — ตัวพิมพ์ใหญ่-เล็ก</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          UPPER() แปลงเป็นตัวพิมพ์ใหญ่ทั้งหมด LOWER() แปลงเป็นตัวพิมพ์เล็กทั้งหมด มักใช้กับ email และการค้นหาแบบ case-insensitive
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(key => (
                <button key={key} onClick={() => { setActiveScenario(key); setResults([]); setHighlightedRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1
                    ${activeScenario === key ? 'bg-[#1e1e2e] text-amber-400 border-b-2 border-amber-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
                  {scenarios[key].title}
                </button>
              ))}
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="font-mono text-[14px] leading-loose mb-3">
                  <div key={activeScenario} className="animate-in fade-in zoom-in-95 duration-300">{s.sql}</div>
                </div>
                <p className="text-xs text-slate-600 border-t border-slate-700/50 pt-3">{s.desc}</p>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-3 rounded-lg text-sm transition-all active:scale-95"><RefreshCcw size={13}/></button>
                <button onClick={handleRun} disabled={isAnimating}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {isAnimating ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-amber-600"/> ตาราง users</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="p-2 border-b font-semibold text-center">id</th>
                      <th className="p-2 border-b font-semibold">username</th>
                      <th className="p-2 border-b font-semibold">email</th>
                      <th className="p-2 border-b font-semibold text-center">role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map(row => (
                      <tr key={row.id} className={`transition-all duration-500 ${highlightedRows.includes(row.id) ? 'bg-amber-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{row.id}</td>
                        <td className="p-2 font-mono text-xs text-slate-700">{row.username}</td>
                        <td className="p-2 font-mono text-xs text-slate-600">{row.email}</td>
                        <td className="p-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.role==='admin'?'bg-amber-100 text-amber-700':'bg-slate-100 text-slate-600'}`}>{row.role}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {results.length > 0 && activeScenario !== 'where' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ — {s.resultLabel}</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100"><tr><th className="p-2 border-b text-left font-semibold">เดิม</th><th className="p-2 border-b text-left font-semibold">→ ผลลัพธ์</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.map(r => (
                        <tr key={r.id} className="bg-amber-50">
                          <td className="p-2 font-mono text-xs text-slate-500 line-through">{r.original}</td>
                          <td className="p-2 font-mono text-xs font-bold text-amber-700">{r.transformed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10">
            <TerminalSquare size={14} className="text-slate-600"/>
            <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type==='command' && <div className="text-amber-300 font-bold">{line.text}</div>}
                {line.type==='output'  && <div className="text-cyan-300">{line.text}</div>}
                {line.type==='system'  && <div className="text-slate-600">{line.text}</div>}
                {line.type==='error'   && <div className="text-rose-400 font-bold">{line.text}</div>}
                {line.type==='success' && <div className="text-emerald-400 font-bold">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
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
