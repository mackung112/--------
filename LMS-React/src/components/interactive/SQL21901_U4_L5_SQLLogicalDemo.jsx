import React, { useState, useRef, useEffect } from 'react';
import { Workflow, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';


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

export default function SQL21901_U4_L5_SQLLogicalDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Logical Operator Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const people = [
    { id: 1, name: 'สมชาย', gender: 'M', age: 25, dept: 'IT' },
    { id: 2, name: 'สมหญิง', gender: 'F', age: 30, dept: 'HR' },
    { id: 3, name: 'วิชัย', gender: 'M', age: 18, dept: 'Sales' },
    { id: 4, name: 'มาลี', gender: 'F', age: 22, dept: 'IT' },
    { id: 5, name: 'สมศรี', gender: 'F', age: 35, dept: 'HR' },
  ];

  const scenarios = {
    and: {
      title: '1. AND', desc: 'ทั้ง 2 เงื่อนไขต้องเป็นจริง',
      sqlStr: "SELECT * FROM people WHERE gender='M' AND age > 20;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">people</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> gender = <span className="text-[#a6e3a1]">'M'</span><br/>{'  '}<span className="text-[#89dceb] font-bold">AND</span> age {">"} <span className="text-[#fab387]">20</span>;</>),
      run: () => people.filter(p => p.gender === 'M' && p.age > 20),
    },
    or: {
      title: '2. OR', desc: 'อย่างน้อย 1 เงื่อนไขเป็นจริง',
      sqlStr: "SELECT * FROM people WHERE gender='M' OR age > 20;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">people</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> gender = <span className="text-[#a6e3a1]">'M'</span><br/>{'  '}<span className="text-[#89dceb] font-bold">OR</span> age {">"} <span className="text-[#fab387]">20</span>;</>),
      run: () => people.filter(p => p.gender === 'M' || p.age > 20),
    },
    not: {
      title: '3. NOT', desc: 'กลับผลลัพธ์จากจริงเป็นเท็จ',
      sqlStr: "SELECT * FROM people WHERE NOT dept='IT';",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">people</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> <span className="text-[#89dceb] font-bold">NOT</span> dept = <span className="text-[#a6e3a1]">'IT'</span>;</>),
      run: () => people.filter(p => p.dept !== 'IT'),
    },
  };

  const [active, setActive] = useState('and');
  const [results, setResults] = useState([]);
  const [hlIds, setHlIds] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]); setHlIds([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setHlIds(r.map(row => row.id)); setAnim(false);
      log(`> ${r.length} row(s) matched`, 'success');
      r.forEach(row => log(`> ${row.name} (${row.gender}, age ${row.age}, ${row.dept})`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); setHlIds([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'ผู้ชายทุกคน (อายุเท่าไหร่ก็ได้) + ทุกคนที่อายุ > 20 (เพศอะไรก็ได้)', correct: true },
    { val: 'b', label: 'เฉพาะผู้ชายที่อายุมากกว่า 20 เท่านั้น' },
    { val: 'c', label: 'เฉพาะผู้หญิงที่อายุน้อยกว่า 20' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! OR แค่เงื่อนไข 1 อันเป็นจริง ก็แสดงข้อมูลแล้ว' : '> ❌ OR ไม่ต้องเป็นจริงทั้งคู่ แค่อันเดียวก็พอ', ok ? 'success' : 'error'); };

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
          <div className="p-2 bg-orange-100 text-orange-700 rounded-lg"><Workflow size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ตรรกะเชื่อมเงื่อนไข (AND, OR, NOT)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">AND = ทั้งหมดต้องจริง, OR = อย่างน้อย 1 เป็นจริง, NOT = กลับผลลัพธ์</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); setHlIds([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-orange-400 border-b-2 border-orange-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-orange-600"/> ตาราง people</h4>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-100 text-slate-600"><tr><th className="p-2 border-b font-semibold text-center">id</th><th className="p-2 border-b font-semibold">name</th><th className="p-2 border-b font-semibold text-center">gender</th><th className="p-2 border-b font-semibold text-center">age</th><th className="p-2 border-b font-semibold">dept</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {people.map(r => (
                    <tr key={r.id} className={`transition-all duration-500 ${hlIds.includes(r.id) ? 'bg-orange-50 ring-1 ring-orange-300' : 'bg-white hover:bg-slate-50'}`}>
                      <td className="p-2 text-center font-mono text-xs text-slate-500">{r.id}</td>
                      <td className="p-2 font-medium text-slate-700">{r.name}</td>
                      <td className="p-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${r.gender === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>{r.gender}</span></td>
                      <td className="p-2 text-center font-mono font-bold">{r.age}</td>
                      <td className="p-2 text-slate-600">{r.dept}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {results.length > 0 && <p className="text-sm text-orange-700 font-bold animate-in fade-in duration-300">✓ {results.length} แถวตรงเงื่อนไข</p>}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-orange-500"/> Quiz: OR Logic</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">WHERE gender="M" OR age {">"} 20 จะแสดงข้อมูลใครบ้าง?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-orange-50 border-orange-400 text-orange-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-orange-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-orange-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
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
