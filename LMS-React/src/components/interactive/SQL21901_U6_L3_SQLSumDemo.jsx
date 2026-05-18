import React, { useState, useRef, useEffect } from 'react';
import { Sigma, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, Code2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L3_SQLSumDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'SUM() Function Demo loaded.' },
    { type: 'system', text: 'เลือก Query แล้วกด Run เพื่อดูผลลัพธ์' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);
  const log = (text, type = 'output') => setConsoleHistory(prev => [...prev, { text, type }]);

  const employees = [
    { id: 1, name: 'สมชาย',  dept: 'IT',    salary: 45000 },
    { id: 2, name: 'สมหญิง', dept: 'HR',    salary: 35000 },
    { id: 3, name: 'วิชัย',  dept: 'Sales', salary: 55000 },
    { id: 4, name: 'มาลี',   dept: 'IT',    salary: 48000 },
  ];

  const scenarios = {
    total: {
      title: '1. SUM ทั้งตาราง',
      desc: 'หาผลรวมเงินเดือนพนักงานทั้งหมด',
      sqlStr: 'SELECT SUM(salary) AS total_salary FROM employees;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">SUM</span>(salary) <span className="text-[#f9e2af]">AS</span> total_salary<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span>;
      </>),
      result: () => {
        const total = employees.reduce((s, e) => s + e.salary, 0);
        return { type: 'single', label: 'total_salary', value: total.toLocaleString() };
      },
      highlight: employees.map(e => e.id),
    },
    group: {
      title: '2. SUM + GROUP BY',
      desc: 'หาผลรวมเงินเดือนแยกตามแผนก',
      sqlStr: 'SELECT dept, SUM(salary) AS total FROM employees GROUP BY dept;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> dept, <span className="text-[#89dceb]">SUM</span>(salary) <span className="text-[#f9e2af]">AS</span> total<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span><br/>
        <span className="text-[#cba6f7] font-bold">GROUP BY</span> dept;
      </>),
      result: () => {
        const groups = {};
        employees.forEach(e => { groups[e.dept] = (groups[e.dept] || 0) + e.salary; });
        return { type: 'table', rows: Object.entries(groups).map(([dept, total]) => ({ dept, total: total.toLocaleString() })) };
      },
      highlight: employees.map(e => e.id),
    },
    where: {
      title: '3. SUM + WHERE',
      desc: 'หาผลรวมเงินเดือนเฉพาะแผนก IT',
      sqlStr: "SELECT SUM(salary) AS it_total FROM employees WHERE dept = 'IT';",
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">SUM</span>(salary) <span className="text-[#f9e2af]">AS</span> it_total<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span><br/>
        <span className="text-[#cba6f7] font-bold">WHERE</span> dept = <span className="text-[#a6e3a1]">'IT'</span>;
      </>),
      result: () => {
        const total = employees.filter(e => e.dept === 'IT').reduce((s, e) => s + e.salary, 0);
        return { type: 'single', label: 'it_total', value: total.toLocaleString() };
      },
      highlight: employees.filter(e => e.dept === 'IT').map(e => e.id),
    },
  };

  const [activeScenario, setActiveScenario] = useState('total');
  const [result, setResult] = useState(null);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRun = () => {
    setIsAnimating(true); setResult(null); setHighlightedRows([]);
    const s = scenarios[activeScenario];
    log(`mysql> ${s.sqlStr}`, 'command');
    setTimeout(() => {
      const r = s.result();
      setResult(r);
      setHighlightedRows(s.highlight);
      setIsAnimating(false);
      if (r.type === 'single') log(`> ${r.label}: ${r.value}`, 'success');
      else r.rows.forEach(row => log(`> ${row.dept}: ${row.total}`, 'success'));
    }, 500);
  };

  const reset = () => { setResult(null); setHighlightedRows([]); log('> System: Reset.', 'system'); };

  // Quiz
  const [quizAns, setQuizAns] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const opts = [
    { val: 'a', label: 'SELECT SUM(price) FROM orders;', correct: true },
    { val: 'b', label: 'SELECT price + price FROM orders;' },
    { val: 'c', label: 'SELECT TOTAL(price) FROM orders;' },
  ];
  const checkQuiz = () => {
    setQuizChecked(true);
    const correct = opts.find(o => o.val === quizAns)?.correct;
    if (correct) log('> ✅ ถูกต้อง! SUM(col) คือฟังก์ชันที่ใช้หาผลรวมของคอลัมน์', 'success');
    else log('> ❌ ยังไม่ถูก TOTAL() ไม่มีใน MySQL ต้องใช้ SUM()', 'error');
  };

  const s = scenarios[activeScenario];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Sigma size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ฟังก์ชัน SUM() — หาผลรวม</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          SUM() คำนวณผลรวมของค่าในคอลัมน์ตัวเลข ใช้ได้กับตัวเลขเท่านั้น และจะข้ามค่า NULL โดยอัตโนมัติ
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          {/* SQL Panel */}
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(key => (
                <button key={key} onClick={() => { setActiveScenario(key); setResult(null); setHighlightedRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1
                    ${activeScenario === key ? 'bg-[#1e1e2e] text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-3 rounded-lg text-sm flex items-center gap-1 transition-all active:scale-95"><RefreshCcw size={13}/></button>
                <button onClick={handleRun} disabled={isAnimating}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {isAnimating ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          {/* Table + Result */}
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-blue-600"/> ตาราง employees</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="p-2 border-b font-semibold text-center">id</th>
                      <th className="p-2 border-b font-semibold">name</th>
                      <th className="p-2 border-b font-semibold text-center">dept</th>
                      <th className="p-2 border-b font-semibold text-right">salary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map(row => (
                      <tr key={row.id} className={`transition-all duration-500 ${highlightedRows.includes(row.id) ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{row.id}</td>
                        <td className="p-2 font-medium text-slate-700">{row.name}</td>
                        <td className="p-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.dept==='IT'?'bg-blue-100 text-blue-700':row.dept==='HR'?'bg-pink-100 text-pink-700':'bg-orange-100 text-orange-700'}`}>{row.dept}</span></td>
                        <td className="p-2 text-right font-mono text-sm">{row.salary.toLocaleString()}</td>
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
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <div className="text-xs text-blue-600 font-bold uppercase mb-1">{result.label}</div>
                    <div className="text-3xl font-bold text-blue-700 font-mono">{result.value}</div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100"><tr><th className="p-2 border-b text-left font-semibold">dept</th><th className="p-2 border-b text-right font-semibold">total</th></tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.rows.map(r => (
                          <tr key={r.dept} className="bg-blue-50">
                            <td className="p-2 font-medium">{r.dept}</td>
                            <td className="p-2 text-right font-mono font-bold text-blue-700">{r.total}</td>
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
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-blue-500"/> Quiz</h4>
            <button onClick={() => { setQuizAns(null); setQuizChecked(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ต้องการหา "รายได้รวมทั้งหมด" จากคอลัมน์ price ในตาราง orders ต้องใช้คำสั่งใด?</p>
          <div className="space-y-2 mb-4">
            {opts.map(o => (
              <button key={o.val} onClick={() => !quizChecked && setQuizAns(o.val)} disabled={quizChecked}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-mono transition-all
                  ${quizAns === o.val ? 'bg-blue-50 border-blue-400 text-blue-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'}
                  ${quizChecked && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''}
                  ${quizChecked && quizAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQuiz} disabled={!quizAns || quizChecked}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95">
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
                {line.type==='command' && <div className="text-blue-300 font-bold">{line.text}</div>}
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
