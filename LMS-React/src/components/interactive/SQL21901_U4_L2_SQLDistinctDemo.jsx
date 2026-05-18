import React, { useState, useRef, useEffect } from 'react';
import { Filter, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L2_SQLDistinctDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'DISTINCT Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const employees = [
    { id: 1, name: 'สมชาย', dept: 'IT', city: 'กรุงเทพฯ' },
    { id: 2, name: 'สมหญิง', dept: 'HR', city: 'เชียงใหม่' },
    { id: 3, name: 'วิชัย', dept: 'IT', city: 'กรุงเทพฯ' },
    { id: 4, name: 'มาลี', dept: 'Sales', city: 'กรุงเทพฯ' },
    { id: 5, name: 'สมศรี', dept: 'HR', city: 'เชียงใหม่' },
    { id: 6, name: 'พิชัย', dept: 'IT', city: 'ขอนแก่น' },
  ];

  const scenarios = {
    single: {
      title: '1. DISTINCT col', desc: 'ดึงค่า dept ที่ไม่ซ้ำ',
      sqlStr: 'SELECT DISTINCT dept FROM employees;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#cba6f7] font-bold">DISTINCT</span> dept<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span>;</>),
      run: () => [...new Set(employees.map(e => e.dept))].map(d => ({ dept: d })),
      hlAll: true,
    },
    multi: {
      title: '2. DISTINCT 2 col', desc: 'ซ้ำเมื่อ "ทั้ง 2 คอลัมน์" เหมือนกัน',
      sqlStr: 'SELECT DISTINCT dept, city FROM employees;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#cba6f7] font-bold">DISTINCT</span> dept, city<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span>;</>),
      run: () => {
        const seen = new Set();
        return employees.filter(e => { const k = `${e.dept}|${e.city}`; if (seen.has(k)) return false; seen.add(k); return true; }).map(e => ({ dept: e.dept, city: e.city }));
      },
      hlAll: true,
    },
    count: {
      title: '3. COUNT DISTINCT', desc: 'นับจำนวนค่าที่ไม่ซ้ำ',
      sqlStr: 'SELECT COUNT(DISTINCT dept) AS unique_depts FROM employees;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">COUNT</span>(<span className="text-[#cba6f7] font-bold">DISTINCT</span> dept)<br/>{'  '}<span className="text-[#f9e2af]">AS</span> unique_depts<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span>;</>),
      run: () => [{ unique_depts: new Set(employees.map(e => e.dept)).size }],
      hlAll: true,
    },
  };

  const [active, setActive] = useState('single');
  const [results, setResults] = useState([]);
  const [hlRows, setHlRows] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]); setHlRows([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setHlRows(employees.map(e => e.id)); setAnim(false);
      log(`> ${r.length} row(s) returned`, 'success');
      r.forEach(row => log(`> ${Object.values(row).join(' | ')}`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); setHlRows([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: '3 แถว — เพราะมีแค่ 3 แผนก: IT, HR, Sales', correct: true },
    { val: 'b', label: '10 แถว — แสดงทุกแถว' },
    { val: 'c', label: '1 แถว — DISTINCT รวมทุกอย่างเป็น 1' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! DISTINCT ตัดค่าซ้ำ เหลือเฉพาะค่าที่ไม่ซ้ำกัน' : '> ❌ DISTINCT ไม่ได้แสดงทุกแถว แต่ตัดค่าซ้ำออก', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 text-pink-700 rounded-lg"><Filter size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การดึงข้อมูลไม่ซ้ำ (DISTINCT)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">DISTINCT ตัดข้อมูลที่ซ้ำกันออก — ใช้กับ 1 คอลัมน์หรือหลายคอลัมน์ก็ได้ รวมถึงใช้ร่วมกับ COUNT()</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); setHlRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-pink-400 border-b-2 border-pink-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-pink-600"/> ตาราง employees</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600"><tr><th className="p-2 border-b font-semibold text-center">id</th><th className="p-2 border-b font-semibold">name</th><th className="p-2 border-b font-semibold">dept</th><th className="p-2 border-b font-semibold">city</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map(r => (
                      <tr key={r.id} className={`transition-all duration-500 ${hlRows.includes(r.id) ? 'bg-pink-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{r.id}</td>
                        <td className="p-2 font-medium text-slate-700">{r.name}</td>
                        <td className="p-2"><span className="px-2 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-700">{r.dept}</span></td>
                        <td className="p-2 text-slate-600">{r.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {results.length > 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ ({results.length} แถว)</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100"><tr>{Object.keys(results[0]).map(k => <th key={k} className="p-2 border-b text-left font-semibold">{k}</th>)}</tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.map((r, i) => (
                        <tr key={i} className="bg-pink-50"><td className="p-2 font-mono text-sm text-pink-700 font-bold" colSpan={Object.keys(r).length}>{Object.values(r).join(' | ')}</td></tr>
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
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-pink-500"/> Quiz: DISTINCT</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ถ้ามีพนักงาน 10 คน ทำงานใน 3 แผนก (IT, HR, Sales) คำสั่ง SELECT DISTINCT dept FROM employees จะได้กี่แถว?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-pink-50 border-pink-400 text-pink-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-pink-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-pink-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
