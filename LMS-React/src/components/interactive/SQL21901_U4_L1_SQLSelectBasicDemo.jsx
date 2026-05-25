import React, { useState, useRef, useEffect } from 'react';
import { Database, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare, ChevronRight } from 'lucide-react';


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

export default function SQL21901_U4_L1_SQLSelectBasicDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'SQL Terminal Quest v2.0 loaded.' },
    { type: 'system', text: 'พิมพ์คำสั่ง SQL เพื่อทำภารกิจ — หรือกด Run ดู Scenario' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const employees = [
    { id: 1, name: 'Alice', role: 'Admin', salary: 45000 },
    { id: 2, name: 'Bob', role: 'User', salary: 35000 },
    { id: 3, name: 'Charlie', role: 'Admin', salary: 50000 },
    { id: 4, name: 'Diana', role: 'User', salary: 32000 },
  ];

  const scenarios = {
    star: {
      title: '1. SELECT *', desc: 'ดึงทุกคอลัมน์ทั้งตาราง',
      sqlStr: 'SELECT * FROM employees;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#fab387]">*</span><br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span>;</>),
      run: () => employees,
      cols: ['id', 'name', 'role', 'salary'],
    },
    cols: {
      title: '2. เลือกคอลัมน์', desc: 'ดึงเฉพาะคอลัมน์ name และ role',
      sqlStr: 'SELECT name, role FROM employees;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> name, role<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span>;</>),
      run: () => employees.map(e => ({ name: e.name, role: e.role })),
      cols: ['name', 'role'],
    },
    where: {
      title: '3. WHERE', desc: 'กรองเฉพาะ role = Admin',
      sqlStr: "SELECT * FROM employees WHERE role = 'Admin';",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#fab387]">*</span><br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> role = <span className="text-[#a6e3a1]">'Admin'</span>;</>),
      run: () => employees.filter(e => e.role === 'Admin'),
      cols: ['id', 'name', 'role', 'salary'],
    },
  };

  const [active, setActive] = useState('star');
  const [results, setResults] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setAnim(false);
      log(`> ${r.length} row(s) returned`, 'success');
      r.forEach(row => log(`> ${Object.values(row).join(' | ')}`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'SELECT name FROM employees;', correct: true },
    { val: 'b', label: 'SELECT * FROM employees;' },
    { val: 'c', label: 'GET name FROM employees;' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! ระบุชื่อคอลัมน์แทน * เพื่อดึงเฉพาะข้อมูลที่ต้องการ' : '> ❌ SQL ไม่มี GET keyword, และ * ดึงทุกคอลัมน์ ไม่ใช่เฉพาะ name', ok ? 'success' : 'error'); };

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
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Database size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">คำสั่ง SELECT พื้นฐาน</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">SELECT ดึงข้อมูลจากตาราง — ใช้ <code className="bg-blue-50 text-blue-700 px-1 rounded font-bold">*</code> ดึงทุกคอลัมน์ หรือระบุชื่อคอลัมน์เพื่อดึงเฉพาะส่วนที่ต้องการ</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-3 rounded-lg text-sm transition-all active:scale-95"><RefreshCcw size={13}/></button>
                <button onClick={handleRun} disabled={anim} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-blue-600"/> {results.length > 0 ? `ผลลัพธ์ (${results.length} แถว)` : 'ตาราง employees'}</h4>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-100 text-slate-600"><tr>{(results.length > 0 ? Object.keys(results[0]) : ['id', 'name', 'role', 'salary']).map(k => <th key={k} className="p-2 border-b font-semibold">{k}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {(results.length > 0 ? results : employees).map((r, i) => (
                    <tr key={i} className={`transition-all duration-500 ${results.length > 0 ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                      {Object.values(r).map((v, j) => <td key={j} className="p-2 font-mono text-sm">{typeof v === 'number' ? v.toLocaleString() : v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-blue-500"/> Quiz: SELECT</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ถ้าต้องการดึงเฉพาะชื่อ (name) จากตาราง employees ต้องใช้คำสั่งใด?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-mono transition-all ${qAns === o.val ? 'bg-blue-50 border-blue-400 text-blue-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-blue-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
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
