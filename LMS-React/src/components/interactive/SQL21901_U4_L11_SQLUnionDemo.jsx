import React, { useState, useRef, useEffect } from 'react';
import { Layers, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';


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

export default function SQL21901_U4_L11_SQLUnionDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'UNION Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const staff2025 = [
    { name: 'สมชาย', dept: 'IT' },
    { name: 'สมหญิง', dept: 'HR' },
    { name: 'วิชัย', dept: 'Sales' },
  ];
  const staff2026 = [
    { name: 'สมชาย', dept: 'IT' },
    { name: 'มาลี', dept: 'HR' },
    { name: 'พิชัย', dept: 'IT' },
  ];

  const scenarios = {
    union: {
      title: '1. UNION', desc: 'ต่อบน-ล่าง + ตัดค่าซ้ำ',
      sqlStr: 'SELECT name, dept FROM staff_2025 UNION SELECT name, dept FROM staff_2026;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> name, dept <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">staff_2025</span><br/><span className="text-[#89dceb] font-bold">UNION</span><br/><span className="text-[#f9e2af] font-bold">SELECT</span> name, dept <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">staff_2026</span>;</>),
      run: () => {
        const all = [...staff2025, ...staff2026];
        const seen = new Set();
        return all.filter(r => { const k = `${r.name}|${r.dept}`; if (seen.has(k)) return false; seen.add(k); return true; });
      },
    },
    unionAll: {
      title: '2. UNION ALL', desc: 'ต่อทั้งหมด ไม่ตัดซ้ำ (เร็วกว่า)',
      sqlStr: 'SELECT name, dept FROM staff_2025 UNION ALL SELECT name, dept FROM staff_2026;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> name, dept <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">staff_2025</span><br/><span className="text-[#89dceb] font-bold">UNION ALL</span><br/><span className="text-[#f9e2af] font-bold">SELECT</span> name, dept <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">staff_2026</span>;</>),
      run: () => [...staff2025, ...staff2026],
    },
    compare: {
      title: '3. เปรียบเทียบ', desc: 'UNION vs UNION ALL — ดูจำนวนแถว',
      sqlStr: '-- UNION = ตัดซ้ำ vs UNION ALL = เก็บทั้งหมด',
      sql: (<><span className="text-slate-500">-- เปรียบเทียบจำนวนแถว</span><br/><span className="text-[#89dceb]">UNION</span>: ตัดซ้ำ → 5 แถว<br/><span className="text-[#89dceb]">UNION ALL</span>: เก็บหมด → 6 แถว</>),
      run: () => {
        const unionR = (() => { const all = [...staff2025, ...staff2026]; const seen = new Set(); return all.filter(r => { const k = `${r.name}|${r.dept}`; if (seen.has(k)) return false; seen.add(k); return true; }); })();
        const allR = [...staff2025, ...staff2026];
        return [{ type: 'UNION', rows: unionR.length, dup: 'ตัดซ้ำ' }, { type: 'UNION ALL', rows: allR.length, dup: 'เก็บทั้งหมด' }];
      },
    },
  };

  const [active, setActive] = useState('union');
  const [results, setResults] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setAnim(false);
      log(`> ${r.length} row(s)`, 'success');
      r.forEach(row => log(`> ${Object.values(row).join(' | ')}`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'UNION ต่อ "บน-ล่าง" แต่ JOIN ต่อ "ซ้าย-ขวา"', correct: true },
    { val: 'b', label: 'ไม่ต่างกันเลย เป็นชื่อเรียกเฉยๆ' },
    { val: 'c', label: 'UNION ต่อซ้ายขวา JOIN ต่อบนล่าง' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! UNION = vertical stack, JOIN = horizontal merge' : '> ❌ UNION เอาผลลัพธ์มาต่อกันแนวตั้ง (บน-ล่าง)', ok ? 'success' : 'error'); };

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
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Layers size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การรวมผลลัพธ์ (UNION)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">UNION นำผลลัพธ์มาต่อกัน (บน-ล่าง) ตัดค่าซ้ำ — UNION ALL เก็บทั้งหมดไม่ตัดซ้ำ (เร็วกว่า)</p>
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-xs"><Table2 size={12} className="text-blue-600"/> staff_2025</h4>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-xs"><thead className="bg-blue-50 text-blue-700"><tr><th className="p-1.5 border-b font-semibold">name</th><th className="p-1.5 border-b font-semibold">dept</th></tr></thead>
                    <tbody>{staff2025.map((r, i) => <tr key={i} className="border-t"><td className="p-1.5 font-medium">{r.name}</td><td className="p-1.5">{r.dept}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-xs"><Table2 size={12} className="text-emerald-600"/> staff_2026</h4>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-xs"><thead className="bg-emerald-50 text-emerald-700"><tr><th className="p-1.5 border-b font-semibold">name</th><th className="p-1.5 border-b font-semibold">dept</th></tr></thead>
                    <tbody>{staff2026.map((r, i) => <tr key={i} className="border-t"><td className="p-1.5 font-medium">{r.name}</td><td className="p-1.5">{r.dept}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            </div>
            {results.length > 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ ({results.length} แถว)</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100"><tr>{Object.keys(results[0]).map(k => <th key={k} className="p-2 border-b text-left font-semibold">{k}</th>)}</tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.map((r, i) => <tr key={i} className="bg-blue-50"><td className="p-2 font-mono text-sm font-bold text-blue-700" colSpan={Object.keys(r).length}>{Object.values(r).join(' | ')}</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-blue-500"/> Quiz: UNION vs JOIN</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ความแตกต่างของ UNION กับ JOIN คืออะไร?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-blue-50 border-blue-400 text-blue-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
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
