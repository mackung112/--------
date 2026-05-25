import React, { useState, useRef, useEffect } from 'react';
import { Sigma, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, Code2, TerminalSquare } from 'lucide-react';


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

  const s = scenarios[activeScenario];

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
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
