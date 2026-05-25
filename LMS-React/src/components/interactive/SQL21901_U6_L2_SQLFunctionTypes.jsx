import React, { useState, useRef, useEffect } from 'react';
import { Layers, CheckCircle2, RefreshCcw, HelpCircle, TerminalSquare } from 'lucide-react';


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

export default function SQL21901_U6_L2_SQLFunctionTypes() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Function Types Explorer loaded.' },
    { type: 'system', text: 'คลิกที่ประเภทฟังก์ชันเพื่อดูตัวอย่าง' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);
  const log = (text, type = 'output') => setConsoleHistory(prev => [...prev, { text, type }]);

  const [activeType, setActiveType] = useState('aggregate');

  const fnTypes = {
    aggregate: {
      label: 'Aggregate Functions', icon: '📊', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
      desc: 'ทำงานกับ "หลายแถว" แล้วส่งผลลัพธ์ "แถวเดียว" กลับมา มักใช้คู่กับ GROUP BY',
      fns: [
        { name: 'SUM(col)',   result: 'ผลรวมทั้งหมด',    ex: 'SELECT SUM(salary) FROM employees; → 183000' },
        { name: 'AVG(col)',   result: 'ค่าเฉลี่ย',        ex: 'SELECT AVG(salary) FROM employees; → 45750' },
        { name: 'COUNT(*)',   result: 'นับจำนวนแถว',      ex: 'SELECT COUNT(*) FROM employees; → 4' },
        { name: 'MAX(col)',   result: 'ค่าสูงสุด',        ex: 'SELECT MAX(salary) FROM employees; → 55000' },
        { name: 'MIN(col)',   result: 'ค่าต่ำสุด',        ex: 'SELECT MIN(salary) FROM employees; → 35000' },
      ],
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span> dept,<br/>
        {'       '}<span className="text-[#89dceb]">SUM</span>(salary) <span className="text-[#f9e2af]">AS</span> total<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span><br/>
        <span className="text-[#cba6f7] font-bold">GROUP BY</span> dept;
      </>)
    },
    scalar: {
      label: 'Scalar Functions', icon: '🔤', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200',
      desc: 'ทำงานกับ "ค่าเดียว" แล้วส่งผลลัพธ์ "ค่าเดียว" กลับมา ทำงานทีละแถว',
      fns: [
        { name: 'UPPER(str)',      result: 'ตัวพิมพ์ใหญ่',   ex: 'UPPER("hello") → "HELLO"' },
        { name: 'LOWER(str)',      result: 'ตัวพิมพ์เล็ก',   ex: 'LOWER("HELLO") → "hello"' },
        { name: 'LENGTH(str)',     result: 'ความยาวข้อความ', ex: 'LENGTH("hello") → 5' },
        { name: 'ROUND(n, d)',     result: 'ปัดทศนิยม',      ex: 'ROUND(3.14159, 2) → 3.14' },
        { name: 'NOW()',           result: 'วันที่/เวลาปัจจุบัน', ex: 'NOW() → 2026-05-18 10:30:00' },
      ],
      sql: (<>
        <span className="text-[#f9e2af] font-bold">SELECT</span><br/>
        {'  '}<span className="text-[#89dceb]">UPPER</span>(name) <span className="text-[#f9e2af]">AS</span> name_upper,<br/>
        {'  '}<span className="text-[#89dceb]">ROUND</span>(salary/1000, 1) <span className="text-[#f9e2af]">AS</span> salary_k<br/>
        <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">employees</span>;
      </>)
    }
  };

  const handleTypeClick = (key) => {
    setActiveType(key);
    const t = fnTypes[key];
    log(`> [${t.label}]: ${t.desc}`, 'output');
  };

  const handleFnClick = (fn) => {
    log(`mysql> SELECT ${fn.name} ...`, 'command');
    log(`> ${fn.ex}`, 'output');
  };
  const resetAll = () => { setQuizAns(null); setQuizChecked(false); log('> System: Reset.', 'system'); };

  const active = fnTypes[activeType];

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
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><Layers size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ประเภทฟังก์ชัน (Aggregate vs Scalar)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ฟังก์ชันใน SQL แบ่งเป็น 2 ประเภทหลัก: <strong>Aggregate</strong> (ทำงานกับหลายแถว) และ <strong>Scalar</strong> (ทำงานกับค่าเดียว)
        </p>
      </div>

      <div className="flex flex-col">
        {/* Type Selector */}
        <div className="flex border-b border-slate-200">
          {Object.entries(fnTypes).map(([key, t]) => (
            <button key={key} onClick={() => handleTypeClick(key)}
              className={`flex-1 py-4 px-4 flex items-center justify-center gap-3 font-bold text-sm transition-all border-b-2
                ${activeType === key ? `${t.border} ${t.color} bg-white border-b-2` : 'border-transparent text-slate-500 hover:bg-slate-50'}`}>
              <span className="text-xl">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          {/* SQL Preview */}
          <div className="bg-[#1e1e2e] md:w-5/12 p-6 border-r border-slate-700">
            <div className={`text-xs font-bold uppercase tracking-wider mb-4 ${active.color}`}>{active.icon} {active.label}</div>
            <div className="font-mono text-[14px] leading-loose mb-4">
              <div key={activeType} className="animate-in fade-in zoom-in-95 duration-300">{active.sql}</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-700/50 pt-3">{active.desc}</p>
          </div>
          {/* Function List */}
          <div className="md:w-7/12 p-6 bg-slate-50">
            <h4 className="font-bold text-slate-700 mb-3 text-sm">ฟังก์ชันที่ใช้บ่อย — คลิกเพื่อดูตัวอย่าง</h4>
            <div className="space-y-2">
              {active.fns.map(fn => (
                <button key={fn.name} onClick={() => handleFnClick(fn)}
                  className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-sm active:scale-[0.99] ${active.bg} ${active.border}`}>
                  <div className="flex items-center justify-between">
                    <code className={`font-mono font-bold text-sm ${active.color}`}>{fn.name}</code>
                    <span className="text-xs text-slate-500">{fn.result}</span>
                  </div>
                </button>
              ))}
            </div>
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
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type==='command' && <div className="text-indigo-300 font-bold">{line.text}</div>}
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
