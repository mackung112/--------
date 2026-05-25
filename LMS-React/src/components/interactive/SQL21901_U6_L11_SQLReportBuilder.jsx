import React, { useState, useRef, useEffect } from 'react';
import { PieChart, BarChart3, CheckCircle2, RefreshCcw, HelpCircle, TerminalSquare, Settings2 } from 'lucide-react';


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

export default function SQL21901_U6_L11_SQLReportBuilder() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Report Builder Studio ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const [xAxis, setXAxis] = useState('dept');
  const [yAxis, setYAxis] = useState('sum');

  const rawData = [
    { dept: 'IT', role: 'Dev', salary: 50 },
    { dept: 'IT', role: 'Dev', salary: 60 },
    { dept: 'IT', role: 'Manager', salary: 100 },
    { dept: 'Sales', role: 'Staff', salary: 30 },
    { dept: 'Sales', role: 'Manager', salary: 80 },
    { dept: 'Sales', role: 'Staff', salary: 35 },
    { dept: 'HR', role: 'Manager', salary: 70 },
    { dept: 'HR', role: 'Staff', salary: 40 },
  ];

  const getChartData = () => {
    const groups = {};
    rawData.forEach(item => {
      const key = item[xAxis];
      if (!groups[key]) groups[key] = { total: 0, count: 0 };
      groups[key].total += item.salary;
      groups[key].count += 1;
    });
    return Object.keys(groups).map(key => {
      let value = 0;
      if (yAxis === 'sum') value = groups[key].total;
      if (yAxis === 'count') value = groups[key].count;
      if (yAxis === 'avg') value = Math.round(groups[key].total / groups[key].count);
      return { label: key, value };
    });
  };

  const chartData = getChartData();
  const maxVal = Math.max(...chartData.map(d => d.value), 1);

  const handleChange = (axis, val) => {
    if (axis === 'x') setXAxis(val); else setYAxis(val);
    log(`> เปลี่ยน ${axis === 'x' ? 'GROUP BY' : 'Aggregate'}: ${val.toUpperCase()}`, 'output');
  };

  const sqlQuery = `SELECT ${xAxis}, ${yAxis.toUpperCase()}(${yAxis === 'count' ? 'id' : 'salary'}) AS result\nFROM employees\nGROUP BY ${xAxis}\nORDER BY result DESC;`;

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'SUM, AVG, COUNT เป็น Aggregate Functions ที่ใช้กับ GROUP BY', correct: true },
    { val: 'b', label: 'Aggregate Functions ไม่จำเป็นต้องใช้กับ GROUP BY' },
    { val: 'c', label: 'GROUP BY ใช้ได้กับ Scalar Functions เท่านั้น' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! SUM, AVG, COUNT เป็น Aggregate ที่ต้องใช้คู่กับ GROUP BY เพื่อแยกกลุ่ม' : '> ❌ Aggregate Functions ต้องใช้กับ GROUP BY เพื่อแยกกลุ่มข้อมูล', ok ? 'success' : 'error'); };

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
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><PieChart size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Report Builder Studio</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">สรุปผลและทำรายงาน — ปรับแกน X (GROUP BY) และ Y (Aggregate) เพื่อดูกราฟและ SQL Query แบบเรียลไทม์</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row border-b border-slate-200">
          {/* Config Panel */}
          <div className="lg:w-5/12 p-5 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-700"><Settings2 size={16}/> Data Configuration</div>
            <div className="space-y-5">
              <div>
                <label className="block font-bold text-slate-700 text-sm mb-2">แกน X (GROUP BY)</label>
                <div className="space-y-2">
                  {[{ v: 'dept', l: 'แผนก (Department)' }, { v: 'role', l: 'ตำแหน่ง (Role)' }].map(o => (
                    <button key={o.v} onClick={() => handleChange('x', o.v)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all active:scale-95 text-sm ${xAxis === o.v ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold shadow-sm' : 'border-slate-200 hover:border-indigo-300 text-slate-600'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-sm mb-2">แกน Y (Aggregate)</label>
                <div className="space-y-2">
                  {[{ v: 'sum', l: 'ยอดรวม (SUM)' }, { v: 'avg', l: 'ค่าเฉลี่ย (AVG)' }, { v: 'count', l: 'จำนวน (COUNT)' }].map(o => (
                    <button key={o.v} onClick={() => handleChange('y', o.v)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all active:scale-95 text-sm ${yAxis === o.v ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm' : 'border-slate-200 hover:border-emerald-300 text-slate-600'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Chart + SQL */}
          <div className="lg:w-7/12 flex flex-col">
            <div className="p-5 bg-slate-900 flex-1">
              <div className="flex items-center gap-2 mb-4 text-white font-bold text-sm"><BarChart3 size={16} className="text-sky-400"/> Live Dashboard Preview</div>
              <div className="flex items-end justify-around gap-3 h-[180px] pb-2">
                {chartData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center w-full group">
                    <div className="text-xs text-slate-400 mb-1 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {yAxis === 'count' ? `${d.value} คน` : `฿${d.value}k`}
                    </div>
                    <div className="w-full max-w-[60px] bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-lg shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-700 group-hover:brightness-110"
                      style={{ height: `${(d.value / maxVal) * 140}px` }}></div>
                    <div className="mt-2 text-slate-300 font-bold text-xs bg-slate-800 px-2 py-0.5 rounded-full">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1e1e2e] p-4 border-t border-slate-700">
              <div className="text-slate-500 text-xs font-semibold mb-2">Generated SQL Query</div>
              <pre className="font-mono text-sm leading-relaxed text-white whitespace-pre-wrap">
                <span className="text-purple-400">SELECT</span> <span className="text-sky-300">{xAxis}</span>, <span className="text-emerald-400">{yAxis.toUpperCase()}</span>(<span className="text-sky-300">{yAxis === 'count' ? 'id' : 'salary'}</span>) <span className="text-purple-400">AS</span> <span className="text-yellow-300">result</span>{'\n'}
                <span className="text-purple-400">FROM</span> <span className="text-sky-300">employees</span>{'\n'}
                <span className="text-purple-400">GROUP BY</span> <span className="text-sky-300">{xAxis}</span>{'\n'}
                <span className="text-purple-400">ORDER BY</span> <span className="text-yellow-300">result</span> <span className="text-purple-400">DESC</span>;
              </pre>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-indigo-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
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
