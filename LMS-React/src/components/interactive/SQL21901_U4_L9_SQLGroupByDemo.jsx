import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L9_SQLGroupByDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'GROUP BY Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const employees = [
    { id: 1, name: 'สมชาย', dept: 'IT', salary: 50000 },
    { id: 2, name: 'สมหญิง', dept: 'HR', salary: 30000 },
    { id: 3, name: 'วิชัย', dept: 'IT', salary: 40000 },
    { id: 4, name: 'มาลี', dept: 'Sales', salary: 60000 },
    { id: 5, name: 'สมศรี', dept: 'HR', salary: 35000 },
    { id: 6, name: 'พิชัย', dept: 'Sales', salary: 45000 },
    { id: 7, name: 'อรุณ', dept: 'IT', salary: 55000 },
    { id: 8, name: 'ดาว', dept: 'Sales', salary: 50000 },
  ];

  const scenarios = {
    count: {
      title: '1. COUNT', desc: 'นับจำนวนคนแต่ละแผนก',
      sqlStr: 'SELECT dept, COUNT(*) AS cnt FROM employees GROUP BY dept;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> dept, <span className="text-[#89dceb]">COUNT</span>(*) <span className="text-[#f9e2af]">AS</span> cnt<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span><br/><span className="text-[#cba6f7] font-bold">GROUP BY</span> dept;</>),
      run: () => {
        const g = {};
        employees.forEach(e => { g[e.dept] = (g[e.dept] || 0) + 1; });
        return Object.entries(g).map(([d, c]) => ({ dept: d, cnt: c }));
      },
    },
    sum: {
      title: '2. SUM', desc: 'ผลรวมเงินเดือนแต่ละแผนก',
      sqlStr: 'SELECT dept, SUM(salary) AS total FROM employees GROUP BY dept;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> dept, <span className="text-[#89dceb]">SUM</span>(salary) <span className="text-[#f9e2af]">AS</span> total<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span><br/><span className="text-[#cba6f7] font-bold">GROUP BY</span> dept;</>),
      run: () => {
        const g = {};
        employees.forEach(e => { g[e.dept] = (g[e.dept] || 0) + e.salary; });
        return Object.entries(g).map(([d, s]) => ({ dept: d, total: s }));
      },
    },
    avg: {
      title: '3. AVG', desc: 'ค่าเฉลี่ยเงินเดือนแต่ละแผนก',
      sqlStr: 'SELECT dept, ROUND(AVG(salary)) AS avg_sal FROM employees GROUP BY dept;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> dept, <span className="text-[#89dceb]">ROUND</span>(<span className="text-[#89dceb]">AVG</span>(salary))<br/>{'  '}<span className="text-[#f9e2af]">AS</span> avg_sal<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span><br/><span className="text-[#cba6f7] font-bold">GROUP BY</span> dept;</>),
      run: () => {
        const g = {};
        employees.forEach(e => { if (!g[e.dept]) g[e.dept] = { sum: 0, cnt: 0 }; g[e.dept].sum += e.salary; g[e.dept].cnt++; });
        return Object.entries(g).map(([d, v]) => ({ dept: d, avg_sal: Math.round(v.sum / v.cnt) }));
      },
    },
  };

  const [active, setActive] = useState('count');
  const [results, setResults] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setAnim(false);
      log(`> ${r.length} group(s) returned`, 'success');
      r.forEach(row => log(`> ${Object.values(row).join(' | ')}`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); log('> Reset.', 'system'); };

  // Mini bar chart
  const maxVal = results.length > 0 ? Math.max(...results.map(r => Object.values(r)[1])) : 0;
  const barColors = { IT: 'bg-sky-500', HR: 'bg-rose-500', Sales: 'bg-amber-500' };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: '3 แถว — 1 แถวต่อ 1 แผนก (IT, HR, Sales)', correct: true },
    { val: 'b', label: '8 แถว — ทุกคนแสดงผล' },
    { val: 'c', label: '1 แถว — GROUP BY ยุบเป็น 1 แถวเสมอ' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! GROUP BY ยุบเป็น 1 แถวต่อ 1 กลุ่ม (unique dept)' : '> ❌ GROUP BY จัดกลุ่ม ได้จำนวนแถวเท่ากับ unique values ของคอลัมน์ที่ GROUP', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 text-teal-700 rounded-lg"><LayoutGrid size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การจัดกลุ่มข้อมูล (GROUP BY)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">GROUP BY จัดข้อมูลเป็นกลุ่ม แล้วใช้ Aggregate (COUNT, SUM, AVG) คำนวณผลสรุปแต่ละกลุ่ม</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-teal-400 border-b-2 border-teal-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-teal-600"/> ตาราง employees (8 rows)</h4>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-h-44 overflow-y-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-100 text-slate-600 sticky top-0"><tr><th className="p-2 border-b font-semibold text-center">id</th><th className="p-2 border-b font-semibold">name</th><th className="p-2 border-b font-semibold">dept</th><th className="p-2 border-b font-semibold text-right">salary</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map(r => (
                    <tr key={r.id} className="bg-white hover:bg-slate-50 transition-all">
                      <td className="p-1.5 text-center font-mono text-xs text-slate-500">{r.id}</td>
                      <td className="p-1.5 font-medium text-slate-700 text-sm">{r.name}</td>
                      <td className="p-1.5"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${barColors[r.dept]?.replace('bg-', 'bg-') || 'bg-slate-200'} text-white`}>{r.dept}</span></td>
                      <td className="p-1.5 text-right font-mono text-xs">฿{r.salary.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {results.length > 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ GROUP BY ({results.length} กลุ่ม)</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm"><thead className="bg-teal-50 text-teal-700"><tr>{Object.keys(results[0]).map(k => <th key={k} className="p-2 border-b font-semibold text-left">{k}</th>)}</tr></thead>
                    <tbody>{results.map((r, i) => <tr key={i} className="border-t bg-teal-50/50">{Object.entries(r).map(([k, v]) => <td key={k} className="p-2 font-mono text-sm font-bold">{typeof v === 'number' ? v.toLocaleString() : v}</td>)}</tr>)}</tbody>
                  </table>
                </div>
                {/* Mini bar chart */}
                <div className="mt-3 space-y-2">
                  {results.map((r, i) => {
                    const val = Object.values(r)[1];
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs font-bold w-12 text-right text-slate-600">{r.dept}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                          <div className={`h-full ${barColors[r.dept] || 'bg-teal-500'} rounded-full transition-all duration-700 flex items-center justify-end pr-2`} style={{ width: `${(val / maxVal) * 100}%` }}>
                            <span className="text-[10px] text-white font-bold">{typeof val === 'number' ? val.toLocaleString() : val}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-teal-500"/> Quiz: GROUP BY</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">พนักงาน 8 คน 3 แผนก ใช้ GROUP BY dept จะได้ผลลัพธ์กี่แถว?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-teal-50 border-teal-400 text-teal-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-teal-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
