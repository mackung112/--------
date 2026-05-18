import React, { useState, useRef, useEffect } from 'react';
import { Layers, CheckCircle2, RefreshCcw, HelpCircle, TerminalSquare } from 'lucide-react';

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

  // Quiz
  const [quizAns, setQuizAns] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const opts = [
    { val: 'a', label: 'Aggregate — ทำงานกับหลายแถว, Scalar — ทำงานกับค่าเดียว', correct: true },
    { val: 'b', label: 'Aggregate — ทำงานกับค่าเดียว, Scalar — ทำงานกับหลายแถว' },
    { val: 'c', label: 'ทั้งสองประเภทเหมือนกัน ต่างกันแค่ชื่อ' },
  ];
  const checkQuiz = () => {
    setQuizChecked(true);
    const correct = opts.find(o => o.val === quizAns)?.correct;
    if (correct) log('> ✅ ถูกต้อง! Aggregate ทำงานกับหลายแถว (ใช้กับ GROUP BY) ส่วน Scalar ทำงานทีละแถว', 'success');
    else log('> ❌ ยังไม่ถูก ลองคิดใหม่: SUM() รวมหลายแถว แต่ UPPER() แปลงทีละค่า', 'error');
  };
  const resetAll = () => { setQuizAns(null); setQuizChecked(false); log('> System: Reset.', 'system'); };

  const active = fnTypes[activeType];

  return (
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

        {/* Quiz */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
              <HelpCircle size={16} className="text-indigo-500"/> Quiz: Aggregate vs Scalar
            </h4>
            <button onClick={resetAll} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ข้อใดอธิบายความแตกต่างระหว่าง Aggregate และ Scalar Functions ได้ถูกต้อง?</p>
          <div className="space-y-2 mb-4">
            {opts.map(o => (
              <button key={o.val} onClick={() => !quizChecked && setQuizAns(o.val)} disabled={quizChecked}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all
                  ${quizAns === o.val ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'}
                  ${quizChecked && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''}
                  ${quizChecked && quizAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQuiz} disabled={!quizAns || quizChecked}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95">
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
  );
}
