import React, { useState, useRef, useEffect } from 'react';
import { PieChart, BarChart3, CheckCircle2, RefreshCcw, HelpCircle, TerminalSquare, Settings2 } from 'lucide-react';

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
        {/* Quiz */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-indigo-500"/> Quiz: Aggregate + GROUP BY</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ข้อใดอธิบายความสัมพันธ์ของ Aggregate Functions กับ GROUP BY ได้ถูกต้อง?</p>
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
        {/* Terminal */}
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
