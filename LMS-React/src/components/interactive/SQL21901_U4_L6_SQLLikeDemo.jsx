import React, { useState, useRef, useEffect } from 'react';
import { Search, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L6_SQLLikeDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'LIKE Pattern Matching Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const customers = [
    { id: 1, name: 'Somchai', city: 'กรุงเทพฯ' },
    { id: 2, name: 'Somsri', city: 'เชียงใหม่' },
    { id: 3, name: 'Manee', city: 'กรุงเทพฯ' },
    { id: 4, name: 'Banana', city: 'ขอนแก่น' },
    { id: 5, name: 'Piti', city: 'กรุงเทพฯ' },
  ];

  const scenarios = {
    start: {
      title: '1. ขึ้นต้น S%', desc: "ค้นหาชื่อที่ขึ้นต้นด้วย 'S' (% = กี่ตัวก็ได้)",
      sqlStr: "SELECT * FROM customers WHERE name LIKE 'S%';",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">customers</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> name <span className="text-[#89dceb]">LIKE</span> <span className="text-[#a6e3a1]">'S%'</span>;</>),
      run: () => customers.filter(c => c.name.startsWith('S')),
    },
    contain: {
      title: '2. มี %a%', desc: "ค้นหาชื่อที่มีตัว 'a' อยู่ข้างใน",
      sqlStr: "SELECT * FROM customers WHERE name LIKE '%a%';",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">customers</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> name <span className="text-[#89dceb]">LIKE</span> <span className="text-[#a6e3a1]">'%a%'</span>;</>),
      run: () => customers.filter(c => c.name.toLowerCase().includes('a')),
    },
    underscore: {
      title: '3. _ (1 ตัวอักษร)', desc: "ค้นหาชื่อ 4 ตัวอักษร: ____",
      sqlStr: "SELECT * FROM customers WHERE name LIKE '____';",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">customers</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> name <span className="text-[#89dceb]">LIKE</span> <span className="text-[#a6e3a1]">'____'</span>;</>),
      run: () => customers.filter(c => c.name.length === 4),
    },
  };

  const [active, setActive] = useState('start');
  const [results, setResults] = useState([]);
  const [hlIds, setHlIds] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]); setHlIds([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setHlIds(r.map(c => c.id)); setAnim(false);
      log(`> ${r.length} row(s) matched`, 'success');
      r.forEach(row => log(`> ${row.name} (${row.city})`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); setHlIds([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: "% = กี่ตัวอักษรก็ได้ (หรือไม่มีเลย), _ = 1 ตัวอักษรเท่านั้น", correct: true },
    { val: 'b', label: "% = 1 ตัวอักษร, _ = กี่ตัวก็ได้" },
    { val: 'c', label: "% และ _ ทำงานเหมือนกัน" },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! % = wildcard กี่ตัวก็ได้, _ = พอดี 1 ตัว' : '> ❌ % แทนกี่ตัวก็ได้ แต่ _ แทนได้แค่ 1 ตัว', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-fuchsia-100 text-fuchsia-700 rounded-lg"><Search size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การค้นหาข้อความ (LIKE)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">LIKE ค้นหาข้อความบางส่วน — <code className="bg-fuchsia-50 text-fuchsia-700 px-1 rounded font-bold">%</code> แทนกี่ตัวอักษรก็ได้ <code className="bg-fuchsia-50 text-fuchsia-700 px-1 rounded font-bold">_</code> แทน 1 ตัวอักษร</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); setHlIds([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-fuchsia-600"/> ตาราง customers</h4>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-100 text-slate-600"><tr><th className="p-2 border-b font-semibold text-center">id</th><th className="p-2 border-b font-semibold">name</th><th className="p-2 border-b font-semibold">city</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map(r => (
                    <tr key={r.id} className={`transition-all duration-500 ${hlIds.includes(r.id) ? 'bg-fuchsia-50 ring-1 ring-fuchsia-300' : 'bg-white hover:bg-slate-50'}`}>
                      <td className="p-2 text-center font-mono text-xs text-slate-500">{r.id}</td>
                      <td className="p-2 font-medium text-slate-700 font-mono">{r.name}</td>
                      <td className="p-2 text-slate-600">{r.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {results.length > 0 && <p className="text-sm text-fuchsia-700 font-bold animate-in fade-in duration-300">✓ {results.length} แถวตรง pattern</p>}
            <div className="flex gap-3 text-xs text-slate-500">
              <span className="bg-slate-100 px-2 py-1 rounded-lg font-mono"><strong>%</strong> = กี่ตัวก็ได้</span>
              <span className="bg-slate-100 px-2 py-1 rounded-lg font-mono"><strong>_</strong> = 1 ตัว</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-fuchsia-500"/> Quiz: LIKE Wildcards</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ความแตกต่างของ % และ _ ใน LIKE คืออะไร?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-fuchsia-50 border-fuchsia-400 text-fuchsia-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-fuchsia-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-fuchsia-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
