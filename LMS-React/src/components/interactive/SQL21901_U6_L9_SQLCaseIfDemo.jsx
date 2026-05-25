import React, { useState, useRef, useEffect } from 'react';
import { GitBranch, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';


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

export default function SQL21901_U6_L9_SQLCaseIfDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'CASE/IF Function Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const students = [
    { id: 1, name: 'สมชาย', score: 85, email: null },
    { id: 2, name: 'สมหญิง', score: 45, email: 'somying@test.com' },
    { id: 3, name: 'วิชัย', score: 72, email: null },
    { id: 4, name: 'มาลี', score: 58, email: 'malee@test.com' },
    { id: 5, name: 'สมศรี', score: 91, email: 'somsri@test.com' },
  ];

  const getGrade = (s) => { if (s >= 80) return 'A'; if (s >= 70) return 'B'; if (s >= 60) return 'C'; if (s >= 50) return 'D'; return 'F'; };
  const gradeColor = (g) => { const m = { A: 'bg-emerald-100 text-emerald-700', B: 'bg-blue-100 text-blue-700', C: 'bg-amber-100 text-amber-700', D: 'bg-orange-100 text-orange-700', F: 'bg-rose-100 text-rose-700' }; return m[g] || ''; };

  const scenarios = {
    ifFn: {
      title: '1. IF()', desc: 'เงื่อนไขง่ายๆ 2 ทาง: ผ่าน/ไม่ผ่าน',
      sqlStr: "SELECT name, score, IF(score >= 50, 'ผ่าน', 'ไม่ผ่าน') AS result FROM students;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> name, score,<br/>{'  '}<span className="text-[#89dceb]">IF</span>(score {">"}= <span className="text-[#fab387]">50</span>, <span className="text-[#a6e3a1]">'ผ่าน'</span>, <span className="text-[#a6e3a1]">'ไม่ผ่าน'</span>)<br/>{'  '}<span className="text-[#f9e2af]">AS</span> result<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">students</span>;</>),
      run: () => students.map(s => ({ id: s.id, name: s.name, score: s.score, result: s.score >= 50 ? 'ผ่าน' : 'ไม่ผ่าน', ok: s.score >= 50 })),
    },
    caseFn: {
      title: '2. CASE WHEN', desc: 'เงื่อนไขหลายทาง: จัดเกรด A-F',
      sqlStr: "SELECT name, score, CASE WHEN score>=80 THEN 'A' WHEN score>=70 THEN 'B' WHEN score>=60 THEN 'C' WHEN score>=50 THEN 'D' ELSE 'F' END AS grade FROM students;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> name, score,<br/>{'  '}<span className="text-[#cba6f7] font-bold">CASE</span><br/>{'    '}<span className="text-[#cba6f7]">WHEN</span> score {">"}= <span className="text-[#fab387]">80</span> <span className="text-[#cba6f7]">THEN</span> <span className="text-[#a6e3a1]">'A'</span><br/>{'    '}<span className="text-[#cba6f7]">WHEN</span> score {">"}= <span className="text-[#fab387]">70</span> <span className="text-[#cba6f7]">THEN</span> <span className="text-[#a6e3a1]">'B'</span><br/>{'    '}<span className="text-[#cba6f7]">WHEN</span> score {">"}= <span className="text-[#fab387]">60</span> <span className="text-[#cba6f7]">THEN</span> <span className="text-[#a6e3a1]">'C'</span><br/>{'    '}<span className="text-[#cba6f7]">WHEN</span> score {">"}= <span className="text-[#fab387]">50</span> <span className="text-[#cba6f7]">THEN</span> <span className="text-[#a6e3a1]">'D'</span><br/>{'    '}<span className="text-[#cba6f7]">ELSE</span> <span className="text-[#a6e3a1]">'F'</span><br/>{'  '}<span className="text-[#cba6f7] font-bold">END</span> <span className="text-[#f9e2af]">AS</span> grade<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">students</span>;</>),
      run: () => students.map(s => ({ id: s.id, name: s.name, score: s.score, result: getGrade(s.score), ok: s.score >= 50 })),
    },
    ifnull: {
      title: '3. IFNULL()', desc: 'แทนค่า NULL ด้วยค่าเริ่มต้น',
      sqlStr: "SELECT name, IFNULL(email, '(ไม่มี email)') AS contact FROM students;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> name,<br/>{'  '}<span className="text-[#89dceb]">IFNULL</span>(email, <span className="text-[#a6e3a1]">'(ไม่มี email)'</span>)<br/>{'  '}<span className="text-[#f9e2af]">AS</span> contact<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">students</span>;</>),
      run: () => students.map(s => ({ id: s.id, name: s.name, score: '-', result: s.email ?? '(ไม่มี email)', ok: s.email !== null })),
    },
  };

  const [active, setActive] = useState('ifFn');
  const [results, setResults] = useState([]);
  const [hlRows, setHlRows] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]); setHlRows([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setHlRows(students.map(s => s.id)); setAnim(false);
      r.forEach(row => log(`> ${row.name} (${row.score}) → ${row.result}`, row.ok ? 'success' : 'error'));
    }, 500);
  };
  const reset = () => { setResults([]); setHlRows([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'CASE WHEN condition THEN result ELSE result END', correct: true },
    { val: 'b', label: 'IF condition THEN result ELSE result END IF' },
    { val: 'c', label: 'SWITCH condition CASE result END' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! CASE WHEN...THEN...ELSE...END คือมาตรฐาน SQL' : '> ❌ SQL ไม่มี SWITCH หรือ IF...THEN...END IF ใน SELECT', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
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
          <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><GitBranch size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ฟังก์ชันเงื่อนไข (CASE, IF, IFNULL)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">IF() ใช้กับเงื่อนไข 2 ทาง, CASE WHEN ใช้กับหลายเงื่อนไข, IFNULL() แทนค่า NULL ด้วยค่าเริ่มต้น</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); setHlRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
                  {scenarios[k].title}
                </button>
              ))}
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="font-mono text-[14px] leading-loose mb-3"><div key={active} className="animate-in fade-in zoom-in-95 duration-300">{sc.sql}</div></div>
                <p className="text-xs text-slate-600 border-t border-slate-700/50 pt-3">{sc.desc}</p>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-3 rounded-lg text-sm flex items-center gap-1 transition-all active:scale-95"><RefreshCcw size={13}/></button>
                <button onClick={handleRun} disabled={anim} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-purple-600"/> ตาราง students</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600"><tr><th className="p-2 border-b font-semibold text-center">id</th><th className="p-2 border-b font-semibold">name</th><th className="p-2 border-b font-semibold text-right">score</th><th className="p-2 border-b font-semibold">email</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map(r => (
                      <tr key={r.id} className={`transition-all duration-500 ${hlRows.includes(r.id) ? 'bg-purple-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{r.id}</td>
                        <td className="p-2 font-medium text-slate-700">{r.name}</td>
                        <td className="p-2 text-right font-mono font-bold text-slate-700">{r.score}</td>
                        <td className="p-2 font-mono text-xs">{r.email ?? <span className="text-slate-400 italic">NULL</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {results.length > 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100"><tr><th className="p-2 border-b text-left font-semibold">name</th><th className="p-2 border-b text-center font-semibold">score</th><th className="p-2 border-b text-left font-semibold">result</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.map(r => (
                        <tr key={r.id} className="bg-purple-50">
                          <td className="p-2 font-medium">{r.name}</td>
                          <td className="p-2 text-center font-mono">{r.score}</td>
                          <td className="p-2"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${r.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{r.result}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-purple-500"/> Quiz: CASE Statement</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ข้อใดคือโครงสร้างพื้นฐานที่ถูกต้องของ CASE statement?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-mono transition-all ${qAns === o.val ? 'bg-purple-50 border-purple-400 text-purple-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-purple-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
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
