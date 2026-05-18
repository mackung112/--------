import React, { useState, useRef, useEffect } from 'react';
import { Hash, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L5_SQLCountDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'COUNT() Function Demo loaded.' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);
  const log = (text, type = 'output') => setConsoleHistory(prev => [...prev, { text, type }]);

  const orders = [
    { id: 1, customer: 'สมชาย',  status: 'completed', amount: 1500 },
    { id: 2, customer: 'สมหญิง', status: 'pending',   amount: null },
    { id: 3, customer: 'วิชัย',  status: 'completed', amount: 3200 },
    { id: 4, customer: 'มาลี',   status: 'cancelled', amount: null },
    { id: 5, customer: 'สมศรี',  status: 'completed', amount: 800  },
  ];

  const scenarios = {
    star: {
      title: '1. COUNT(*)',
      desc: 'นับทุกแถวในตาราง รวมแถวที่มี NULL',
      sqlStr: 'SELECT COUNT(*) AS total_rows FROM orders;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">COUNT</span>(<span className="text-[#fab387]">*</span>) <span className="text-[#f9e2af]">AS</span> total_rows<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">orders</span>;
      </>),
      result: () => ({ type: 'single', label: 'total_rows', value: orders.length }),
      highlight: orders.map(o => o.id),
    },
    col: {
      title: '2. COUNT(col)',
      desc: 'นับเฉพาะแถวที่คอลัมน์ amount ไม่เป็น NULL',
      sqlStr: 'SELECT COUNT(amount) AS non_null_count FROM orders;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">COUNT</span>(amount) <span className="text-[#f9e2af]">AS</span> non_null_count<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">orders</span>;
      </>),
      result: () => ({ type: 'single', label: 'non_null_count', value: orders.filter(o => o.amount !== null).length }),
      highlight: orders.filter(o => o.amount !== null).map(o => o.id),
    },
    group: {
      title: '3. COUNT + GROUP BY',
      desc: 'นับจำนวน order แยกตามสถานะ',
      sqlStr: 'SELECT status, COUNT(*) AS cnt FROM orders GROUP BY status;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> status, <span className="text-[#89dceb]">COUNT</span>(<span className="text-[#fab387]">*</span>) <span className="text-[#f9e2af]">AS</span> cnt<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">orders</span><br/>
        <span className="text-[#cba6f7] font-bold">GROUP BY</span> status;
      </>),
      result: () => {
        const groups = {};
        orders.forEach(o => { groups[o.status] = (groups[o.status] || 0) + 1; });
        return { type: 'table', rows: Object.entries(groups).map(([status, cnt]) => ({ status, cnt })) };
      },
      highlight: orders.map(o => o.id),
    },
  };

  const [activeScenario, setActiveScenario] = useState('star');
  const [result, setResult] = useState(null);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRun = () => {
    setIsAnimating(true); setResult(null); setHighlightedRows([]);
    const s = scenarios[activeScenario];
    log(`mysql> ${s.sqlStr}`, 'command');
    setTimeout(() => {
      const r = s.result();
      setResult(r); setHighlightedRows(s.highlight); setIsAnimating(false);
      if (r.type === 'single') log(`> ${r.label}: ${r.value}`, 'success');
      else r.rows.forEach(row => log(`> ${row.status}: ${row.cnt} rows`, 'success'));
    }, 500);
  };

  const reset = () => { setResult(null); setHighlightedRows([]); log('> System: Reset.', 'system'); };

  // Quiz
  const [quizAns, setQuizAns] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const opts = [
    { val: 'a', label: 'COUNT(*) = 5, COUNT(amount) = 3 เพราะ COUNT(col) ข้าม NULL', correct: true },
    { val: 'b', label: 'COUNT(*) = 5, COUNT(amount) = 5 เพราะนับเหมือนกัน' },
    { val: 'c', label: 'COUNT(*) = 3, COUNT(amount) = 3 เพราะข้าม NULL ทั้งคู่' },
  ];
  const checkQuiz = () => {
    setQuizChecked(true);
    const correct = opts.find(o => o.val === quizAns)?.correct;
    if (correct) log('> ✅ ถูกต้อง! COUNT(*) นับทุกแถว แต่ COUNT(col) ข้ามแถวที่ col เป็น NULL', 'success');
    else log('> ❌ ยังไม่ถูก ลองรัน Scenario 1 และ 2 เปรียบเทียบกัน', 'error');
  };

  const s = scenarios[activeScenario];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 text-violet-700 rounded-lg"><Hash size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ฟังก์ชัน COUNT() — นับจำนวน</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          COUNT(*) นับทุกแถวรวม NULL แต่ COUNT(col) นับเฉพาะแถวที่ col ไม่เป็น NULL — ความแตกต่างนี้สำคัญมาก
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(key => (
                <button key={key} onClick={() => { setActiveScenario(key); setResult(null); setHighlightedRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1
                    ${activeScenario === key ? 'bg-[#1e1e2e] text-violet-400 border-b-2 border-violet-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                  className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {isAnimating ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-violet-600"/> ตาราง orders</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="p-2 border-b font-semibold text-center">id</th>
                      <th className="p-2 border-b font-semibold">customer</th>
                      <th className="p-2 border-b font-semibold text-center">status</th>
                      <th className="p-2 border-b font-semibold text-right">amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map(row => (
                      <tr key={row.id} className={`transition-all duration-500 ${highlightedRows.includes(row.id) ? 'bg-violet-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{row.id}</td>
                        <td className="p-2 font-medium text-slate-700">{row.customer}</td>
                        <td className="p-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.status==='completed'?'bg-emerald-100 text-emerald-700':row.status==='pending'?'bg-amber-100 text-amber-700':'bg-rose-100 text-rose-700'}`}>{row.status}</span></td>
                        <td className="p-2 text-right font-mono text-sm">{row.amount !== null ? row.amount.toLocaleString() : <span className="text-slate-400 italic">NULL</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {result && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ (Result)</h4>
                {result.type === 'single' ? (
                  <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
                    <div className="text-xs text-violet-600 font-bold uppercase mb-1">{result.label}</div>
                    <div className="text-3xl font-bold text-violet-700 font-mono">{result.value}</div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100"><tr><th className="p-2 border-b text-left font-semibold">status</th><th className="p-2 border-b text-right font-semibold">cnt</th></tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.rows.map(r => (
                          <tr key={r.status} className="bg-violet-50">
                            <td className="p-2 font-medium">{r.status}</td>
                            <td className="p-2 text-right font-mono font-bold text-violet-700">{r.cnt}</td>
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

        {/* Quiz */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-violet-500"/> Quiz: COUNT(*) vs COUNT(col)</h4>
            <button onClick={() => { setQuizAns(null); setQuizChecked(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ตาราง orders มี 5 แถว แต่คอลัมน์ amount มี NULL 2 แถว ผลลัพธ์ของ COUNT(*) และ COUNT(amount) คืออะไร?</p>
          <div className="space-y-2 mb-4">
            {opts.map(o => (
              <button key={o.val} onClick={() => !quizChecked && setQuizAns(o.val)} disabled={quizChecked}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all
                  ${quizAns === o.val ? 'bg-violet-50 border-violet-400 text-violet-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-violet-300'}
                  ${quizChecked && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''}
                  ${quizChecked && quizAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQuiz} disabled={!quizAns || quizChecked}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95">
              <CheckCircle2 size={16}/> ตรวจคำตอบ
            </button>
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
                {line.type==='command' && <div className="text-violet-300 font-bold">{line.text}</div>}
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
  );
}
