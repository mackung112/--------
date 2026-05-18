import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, Play, CheckCircle2, RefreshCcw, HelpCircle, TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L10_SQLTrendAnalysis() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Trend Analysis Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const sales = [
    { id: 1, month: 1, month_name: 'ม.ค.', year: 2025, amount: 45000 },
    { id: 2, month: 2, month_name: 'ก.พ.', year: 2025, amount: 52000 },
    { id: 3, month: 3, month_name: 'มี.ค.', year: 2025, amount: 38000 },
    { id: 4, month: 4, month_name: 'เม.ย.', year: 2025, amount: 61000 },
    { id: 5, month: 5, month_name: 'พ.ค.', year: 2025, amount: 55000 },
    { id: 6, month: 6, month_name: 'มิ.ย.', year: 2025, amount: 72000 },
    { id: 7, month: 1, month_name: 'ม.ค.', year: 2026, amount: 58000 },
    { id: 8, month: 2, month_name: 'ก.พ.', year: 2026, amount: 63000 },
    { id: 9, month: 3, month_name: 'มี.ค.', year: 2026, amount: 49000 },
  ];

  const scenarios = {
    monthly: {
      title: '1. รายเดือน', desc: 'GROUP BY MONTH ดูยอดขายแยกเดือน (ปี 2025)',
      sqlStr: "SELECT MONTH(sale_date) AS mn, SUM(amount) AS total FROM sales WHERE YEAR(sale_date)=2025 GROUP BY mn;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">MONTH</span>(sale_date) <span className="text-[#f9e2af]">AS</span> mn,<br/>{'  '}<span className="text-[#89dceb]">SUM</span>(amount) <span className="text-[#f9e2af]">AS</span> total<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">sales</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> <span className="text-[#89dceb]">YEAR</span>(sale_date) = <span className="text-[#fab387]">2025</span><br/><span className="text-[#cba6f7] font-bold">GROUP BY</span> mn;</>),
      run: () => sales.filter(s => s.year === 2025),
    },
    yoy: {
      title: '2. Year-over-Year', desc: 'เปรียบเทียบ ม.ค.-มี.ค. ปี 2025 vs 2026',
      sqlStr: "SELECT MONTH(sale_date) AS mn, YEAR(sale_date) AS yr, SUM(amount) FROM sales GROUP BY yr, mn;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">MONTH</span>(sale_date) <span className="text-[#f9e2af]">AS</span> mn,<br/>{'  '}<span className="text-[#89dceb]">YEAR</span>(sale_date) <span className="text-[#f9e2af]">AS</span> yr,<br/>{'  '}<span className="text-[#89dceb]">SUM</span>(amount) <span className="text-[#f9e2af]">AS</span> total<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">sales</span><br/><span className="text-[#cba6f7] font-bold">GROUP BY</span> yr, mn;</>),
      run: () => {
        const m25 = sales.filter(s => s.year === 2025 && s.month <= 3);
        const m26 = sales.filter(s => s.year === 2026);
        return [...m25, ...m26];
      },
    },
    running: {
      title: '3. ผลรวมสะสม', desc: 'Running Total — ยอดสะสมเพิ่มขึ้นทุกเดือน',
      sqlStr: "SELECT mn, amount, SUM(amount) OVER (ORDER BY mn) AS running_total FROM sales WHERE yr=2025;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> mn, amount,<br/>{'  '}<span className="text-[#89dceb]">SUM</span>(amount) <span className="text-[#cba6f7] font-bold">OVER</span> (<br/>{'    '}<span className="text-[#cba6f7]">ORDER BY</span> mn<br/>{'  '}) <span className="text-[#f9e2af]">AS</span> running_total<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">sales</span><br/><span className="text-[#cba6f7] font-bold">WHERE</span> yr = <span className="text-[#fab387]">2025</span>;</>),
      run: () => {
        let sum = 0;
        return sales.filter(s => s.year === 2025).map(s => { sum += s.amount; return { ...s, running: sum }; });
      },
    },
  };

  const [active, setActive] = useState('monthly');
  const [results, setResults] = useState([]);
  const [anim, setAnim] = useState(false);
  const maxAmt = 75000;

  const handleRun = () => {
    setAnim(true); setResults([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setAnim(false);
      if (active === 'running') r.forEach(row => log(`> ${row.month_name}: ${row.amount.toLocaleString()} (สะสม: ${row.running.toLocaleString()})`, 'success'));
      else r.forEach(row => log(`> ${row.year}/${row.month_name}: ฿${row.amount.toLocaleString()}`, 'success'));
    }, 500);
  };
  const reset = () => { setResults([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'WHERE YEAR(date)=2024 และ GROUP BY MONTH(date)', correct: true },
    { val: 'b', label: 'ORDER BY MONTH(date)' },
    { val: 'c', label: 'SUM(MONTH(date))' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! WHERE กรองปี + GROUP BY แยกเดือน = ยอดรายเดือนของปีที่ต้องการ' : '> ❌ ORDER BY แค่เรียงลำดับ ไม่ได้รวมยอด และ SUM(MONTH) จะรวมตัวเลขเดือน ไม่ใช่ยอดขาย', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  const barColor25 = 'from-indigo-500 to-blue-400';
  const barColor26 = 'from-emerald-500 to-teal-400';

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><TrendingUp size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การวิเคราะห์แนวโน้ม (Trend Analysis)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">ใช้ GROUP BY กับ Date Functions เพื่อดูยอดขายรายเดือน เปรียบเทียบปีต่อปี และคำนวณผลรวมสะสม</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <h4 className="font-bold text-slate-700 text-sm">📊 Mini Chart — ยอดขาย</h4>
            {results.length > 0 ? (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                {active === 'yoy' ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map(mn => {
                      const d25 = results.find(r => r.year === 2025 && r.month === mn);
                      const d26 = results.find(r => r.year === 2026 && r.month === mn);
                      return (
                        <div key={mn} className="flex items-center gap-3">
                          <span className="w-12 text-xs font-bold text-slate-600 text-right">{d25?.month_name}</span>
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <div className={`h-5 rounded bg-gradient-to-r ${barColor25} transition-all duration-700`} style={{ width: `${(d25?.amount / maxAmt) * 100}%` }}></div>
                              <span className="text-xs text-indigo-600 font-bold">฿{d25?.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`h-5 rounded bg-gradient-to-r ${barColor26} transition-all duration-700`} style={{ width: `${((d26?.amount || 0) / maxAmt) * 100}%` }}></div>
                              <span className="text-xs text-emerald-600 font-bold">฿{d26?.amount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-indigo-500"></span> 2025</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500"></span> 2026</span>
                    </div>
                  </div>
                ) : active === 'running' ? (
                  <div className="space-y-2">
                    {results.map(r => (
                      <div key={r.id} className="flex items-center gap-3">
                        <span className="w-12 text-xs font-bold text-slate-600 text-right">{r.month_name}</span>
                        <div className="flex-1 relative">
                          <div className={`h-6 rounded bg-gradient-to-r from-indigo-500 to-purple-400 transition-all duration-700`} style={{ width: `${(r.running / results[results.length - 1].running) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-mono text-indigo-700 font-bold w-24 text-right">฿{r.running.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {results.map(r => (
                      <div key={r.id} className="flex items-center gap-3">
                        <span className="w-12 text-xs font-bold text-slate-600 text-right">{r.month_name}</span>
                        <div className="flex-1">
                          <div className={`h-6 rounded bg-gradient-to-r ${barColor25} transition-all duration-700`} style={{ width: `${(r.amount / maxAmt) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-mono text-indigo-700 font-bold w-20 text-right">฿{r.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm gap-2">
                <TrendingUp size={32} className="opacity-30"/>
                <span>กด Run Query เพื่อดูกราฟ</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-indigo-500"/> Quiz: Trend Analysis</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ต้องการดูยอดขายรวม "แยกตามแต่ละเดือน" ในปี 2024 ต้องใช้เทคนิคใด?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-indigo-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
