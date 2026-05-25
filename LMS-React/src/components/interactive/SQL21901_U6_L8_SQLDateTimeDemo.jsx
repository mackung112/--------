import React, { useState, useRef, useEffect } from 'react';
import { Clock, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';


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

export default function SQL21901_U6_L8_SQLDateTimeDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'DateTime Function Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const orders = [
    { id: 1, product: 'Laptop', order_date: '2026-01-15', amount: 25000 },
    { id: 2, product: 'Mouse', order_date: '2026-03-22', amount: 590 },
    { id: 3, product: 'Keyboard', order_date: '2026-05-10', amount: 1200 },
    { id: 4, product: 'Monitor', order_date: '2025-12-01', amount: 8500 },
  ];

  const now = new Date();
  const fmtDate = (d) => d.toISOString().split('T')[0];
  const fmtDateTime = (d) => `${fmtDate(d)} ${d.toTimeString().split(' ')[0]}`;

  const scenarios = {
    now: {
      title: '1. NOW/CURDATE', desc: 'ดึงวันเวลาปัจจุบัน',
      sqlStr: 'SELECT NOW(), CURDATE(), CURTIME();',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">NOW</span>(),<br/>{'       '}<span className="text-[#89dceb]">CURDATE</span>(),<br/>{'       '}<span className="text-[#89dceb]">CURTIME</span>();</>),
      run: () => ({ type: 'kv', rows: [{ k: 'NOW()', v: fmtDateTime(now) }, { k: 'CURDATE()', v: fmtDate(now) }, { k: 'CURTIME()', v: now.toTimeString().split(' ')[0] }] }),
    },
    extract: {
      title: '2. YEAR/MONTH/DAY', desc: 'ดึงบางส่วนของวันที่',
      sqlStr: 'SELECT product, YEAR(order_date) AS yr, MONTH(order_date) AS mn FROM orders;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> product,<br/>{'  '}<span className="text-[#89dceb]">YEAR</span>(order_date) <span className="text-[#f9e2af]">AS</span> yr,<br/>{'  '}<span className="text-[#89dceb]">MONTH</span>(order_date) <span className="text-[#f9e2af]">AS</span> mn<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">orders</span>;</>),
      run: () => ({ type: 'table', cols: ['product', 'yr', 'mn'], rows: orders.map(o => { const d = new Date(o.order_date); return { product: o.product, yr: d.getFullYear(), mn: d.getMonth() + 1 }; }) }),
    },
    add: {
      title: '3. DATE_ADD/SUB', desc: 'บวก/ลบวันที่',
      sqlStr: 'SELECT product, order_date, DATE_ADD(order_date, INTERVAL 30 DAY) AS due_date FROM orders;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> product, order_date,<br/>{'  '}<span className="text-[#89dceb]">DATE_ADD</span>(order_date, <span className="text-[#cba6f7]">INTERVAL</span> <span className="text-[#fab387]">30</span> <span className="text-[#cba6f7]">DAY</span>)<br/>{'  '}<span className="text-[#f9e2af]">AS</span> due_date<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">orders</span>;</>),
      run: () => ({ type: 'table', cols: ['product', 'order_date', 'due_date'], rows: orders.map(o => { const d = new Date(o.order_date); d.setDate(d.getDate() + 30); return { product: o.product, order_date: o.order_date, due_date: fmtDate(d) }; }) }),
    },
  };

  const [active, setActive] = useState('now');
  const [result, setResult] = useState(null);
  const [hlRows, setHlRows] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResult(null); setHlRows([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResult(r); setHlRows(orders.map(o => o.id)); setAnim(false);
      if (r.type === 'kv') r.rows.forEach(row => log(`> ${row.k}: ${row.v}`, 'success'));
      else r.rows.forEach(row => log(`> ${Object.values(row).join(' | ')}`, 'success'));
    }, 500);
  };
  const reset = () => { setResult(null); setHlRows([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'DATE_ADD(CURDATE(), INTERVAL 30 DAY)', correct: true },
    { val: 'b', label: 'CURDATE() + 30' },
    { val: 'c', label: 'NEXT_MONTH(CURDATE())' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! DATE_ADD กับ INTERVAL คือวิธีมาตรฐานของ MySQL' : '> ❌ MySQL ไม่มีฟังก์ชัน NEXT_MONTH ต้องใช้ DATE_ADD', ok ? 'success' : 'error'); };

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
          <div className="p-2 bg-sky-100 text-sky-700 rounded-lg"><Clock size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การจัดการวันที่และเวลา (DateTime Functions)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">MySQL มีฟังก์ชัน DateTime หลากหลาย — NOW(), CURDATE(), YEAR(), MONTH(), DATE_ADD(), DATEDIFF() และอื่นๆ</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResult(null); setHlRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-sky-400 border-b-2 border-sky-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-sky-600"/> ตาราง orders</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600"><tr><th className="p-2 border-b font-semibold text-center">id</th><th className="p-2 border-b font-semibold">product</th><th className="p-2 border-b font-semibold text-center">order_date</th><th className="p-2 border-b font-semibold text-right">amount</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map(r => (
                      <tr key={r.id} className={`transition-all duration-500 ${hlRows.includes(r.id) ? 'bg-sky-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{r.id}</td>
                        <td className="p-2 font-medium text-slate-700">{r.product}</td>
                        <td className="p-2 text-center font-mono text-sm text-sky-700">{r.order_date}</td>
                        <td className="p-2 text-right font-mono text-sm">{r.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {result && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ (Result)</h4>
                {result.type === 'kv' ? (
                  <div className="grid grid-cols-1 gap-2">
                    {result.rows.map(r => (
                      <div key={r.k} className="bg-sky-50 border border-sky-200 rounded-lg p-3 flex justify-between items-center">
                        <span className="font-mono text-sm text-sky-600 font-bold">{r.k}</span>
                        <span className="font-mono text-sm text-sky-800 font-bold">{r.v}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100"><tr>{result.cols.map(c => <th key={c} className="p-2 border-b text-left font-semibold">{c}</th>)}</tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.rows.map((r, i) => (
                          <tr key={i} className="bg-sky-50">
                            {result.cols.map(c => <td key={c} className="p-2 font-mono text-sm text-sky-700">{r[c]}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-sky-500"/> Quiz: DATE_ADD</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ต้องการหาวันที่อีก 30 วันข้างหน้าจากวันนี้ ควรใช้คำสั่งใด?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-mono transition-all ${qAns === o.val ? 'bg-sky-50 border-sky-400 text-sky-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-sky-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
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
