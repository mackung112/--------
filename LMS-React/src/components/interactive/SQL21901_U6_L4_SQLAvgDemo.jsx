import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';


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

export default function SQL21901_U6_L4_SQLAvgDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'AVG() Function Demo loaded.' },
    { type: 'system', text: 'เลือก Query แล้วกด Run เพื่อดูผลลัพธ์' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);
  const log = (text, type = 'output') => setConsoleHistory(prev => [...prev, { text, type }]);

  const scores = [
    { id: 1, name: 'สมชาย',  subject: 'Math',    score: 85 },
    { id: 2, name: 'สมหญิง', subject: 'Math',    score: 72 },
    { id: 3, name: 'วิชัย',  subject: 'Science', score: 90 },
    { id: 4, name: 'มาลี',   subject: 'Math',    score: 68 },
    { id: 5, name: 'สมศรี',  subject: 'Science', score: 78 },
  ];

  const scenarios = {
    all: {
      title: '1. AVG ทั้งตาราง',
      desc: 'หาคะแนนเฉลี่ยของนักเรียนทั้งหมด',
      sqlStr: 'SELECT AVG(score) AS avg_score FROM students;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">AVG</span>(score) <span className="text-[#f9e2af]">AS</span> avg_score<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">students</span>;
      </>),
      result: () => {
        const avg = scores.reduce((s, r) => s + r.score, 0) / scores.length;
        return { type: 'single', label: 'avg_score', value: avg.toFixed(2) };
      },
      highlight: scores.map(s => s.id),
    },
    group: {
      title: '2. AVG + GROUP BY',
      desc: 'หาคะแนนเฉลี่ยแยกตามวิชา',
      sqlStr: 'SELECT subject, AVG(score) AS avg FROM students GROUP BY subject;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> subject, <span className="text-[#89dceb]">AVG</span>(score) <span className="text-[#f9e2af]">AS</span> avg<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">students</span><br/>
        <span className="text-[#cba6f7] font-bold">GROUP BY</span> subject;
      </>),
      result: () => {
        const groups = {};
        scores.forEach(s => {
          if (!groups[s.subject]) groups[s.subject] = { sum: 0, count: 0 };
          groups[s.subject].sum += s.score; groups[s.subject].count++;
        });
        return { type: 'table', rows: Object.entries(groups).map(([sub, g]) => ({ subject: sub, avg: (g.sum / g.count).toFixed(2) })) };
      },
      highlight: scores.map(s => s.id),
    },
    round: {
      title: '3. ROUND(AVG())',
      desc: 'ปัดทศนิยมผลลัพธ์ AVG ให้อ่านง่าย',
      sqlStr: 'SELECT ROUND(AVG(score), 1) AS avg_rounded FROM students;',
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">ROUND</span>(<span className="text-[#89dceb]">AVG</span>(score), <span className="text-[#fab387]">1</span>) <span className="text-[#f9e2af]">AS</span> avg_rounded<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">students</span>;
      </>),
      result: () => {
        const avg = scores.reduce((s, r) => s + r.score, 0) / scores.length;
        return { type: 'single', label: 'avg_rounded', value: avg.toFixed(1) };
      },
      highlight: scores.map(s => s.id),
    },
  };

  const [activeScenario, setActiveScenario] = useState('all');
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
      else r.rows.forEach(row => log(`> ${row.subject}: ${row.avg}`, 'success'));
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
          <div className="p-2 bg-teal-100 text-teal-700 rounded-lg"><TrendingUp size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ฟังก์ชัน AVG() — หาค่าเฉลี่ย</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          AVG() คำนวณค่าเฉลี่ยของคอลัมน์ตัวเลข จะข้ามค่า NULL โดยอัตโนมัติ มักใช้คู่กับ ROUND() เพื่อปัดทศนิยม
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(key => (
                <button key={key} onClick={() => { setActiveScenario(key); setResult(null); setHighlightedRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1
                    ${activeScenario === key ? 'bg-[#1e1e2e] text-teal-400 border-b-2 border-teal-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {isAnimating ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-teal-600"/> ตาราง students</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="p-2 border-b font-semibold text-center">id</th>
                      <th className="p-2 border-b font-semibold">name</th>
                      <th className="p-2 border-b font-semibold text-center">subject</th>
                      <th className="p-2 border-b font-semibold text-right">score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scores.map(row => (
                      <tr key={row.id} className={`transition-all duration-500 ${highlightedRows.includes(row.id) ? 'bg-teal-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{row.id}</td>
                        <td className="p-2 font-medium text-slate-700">{row.name}</td>
                        <td className="p-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.subject==='Math'?'bg-blue-100 text-blue-700':'bg-emerald-100 text-emerald-700'}`}>{row.subject}</span></td>
                        <td className="p-2 text-right font-mono font-bold text-slate-700">{row.score}</td>
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
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
                    <div className="text-xs text-teal-600 font-bold uppercase mb-1">{result.label}</div>
                    <div className="text-3xl font-bold text-teal-700 font-mono">{result.value}</div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100"><tr><th className="p-2 border-b text-left font-semibold">subject</th><th className="p-2 border-b text-right font-semibold">avg</th></tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.rows.map(r => (
                          <tr key={r.subject} className="bg-teal-50">
                            <td className="p-2 font-medium">{r.subject}</td>
                            <td className="p-2 text-right font-mono font-bold text-teal-700">{r.avg}</td>
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
                {line.type==='command' && <div className="text-teal-300 font-bold">{line.text}</div>}
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
