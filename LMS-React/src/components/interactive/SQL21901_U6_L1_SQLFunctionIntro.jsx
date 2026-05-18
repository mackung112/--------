import React, { useState, useRef, useEffect } from 'react';
import { Zap, Play, CheckCircle2, RefreshCcw, HelpCircle, Code2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L1_SQLFunctionIntro() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL Function Engine Initialized.' },
    { type: 'system', text: 'คลิกที่ส่วนประกอบของฟังก์ชันเพื่อเรียนรู้' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);
  const log = (text, type = 'output') => setConsoleHistory(prev => [...prev, { text, type }]);

  const [activeKey, setActiveKey] = useState(null);

  const parts = [
    { key: 'fn',    label: 'UPPER',   color: 'bg-pink-100 text-pink-700 border-pink-300',    activeColor: 'bg-pink-500 text-white border-pink-600' },
    { key: 'paren', label: '(',        color: 'bg-slate-100 text-slate-500 border-slate-300', activeColor: 'bg-slate-500 text-white border-slate-600' },
    { key: 'param', label: '"hello"', color: 'bg-emerald-100 text-emerald-700 border-emerald-300', activeColor: 'bg-emerald-500 text-white border-emerald-600' },
    { key: 'close', label: ')',        color: 'bg-slate-100 text-slate-500 border-slate-300', activeColor: 'bg-slate-500 text-white border-slate-600' },
  ];

  const explanations = {
    fn:    { title: 'ชื่อฟังก์ชัน (Function Name)', desc: 'ชื่อของฟังก์ชันที่ต้องการเรียกใช้ เช่น UPPER, SUM, NOW, CONCAT — MySQL มีฟังก์ชัน Built-in ให้ใช้งานมากมาย', example: 'UPPER("hello") → "HELLO"' },
    paren: { title: 'วงเล็บเปิด', desc: 'ทุกฟังก์ชันต้องมีวงเล็บ () เสมอ แม้จะไม่มี Parameter เช่น NOW() ก็ยังต้องมีวงเล็บ', example: 'NOW() → 2026-05-18 10:30:00' },
    param: { title: 'Parameter (ค่าที่ส่งเข้า)', desc: 'ค่าที่ส่งให้ฟังก์ชันนำไปประมวลผล อาจเป็นชื่อคอลัมน์, ค่าคงที่, หรือนิพจน์ก็ได้', example: 'UPPER(name) — ส่งคอลัมน์ name เข้าไป' },
    close: { title: 'วงเล็บปิด', desc: 'ปิดรายการ Parameter ฟังก์ชันที่มีหลาย Parameter ใช้ลูกน้ำ (,) คั่น เช่น CONCAT(first, " ", last)', example: 'CONCAT("Hello", " ", "World")' },
  };

  const handleClick = (key) => {
    setActiveKey(key);
    const e = explanations[key];
    log(`> [${e.title}]: ${e.desc}`, 'output');
    log(`  ตัวอย่าง: ${e.example}`, 'output');
  };

  // Quiz
  const [quizAns, setQuizAns] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const opts = [
    { val: 'a', label: 'รับค่า (Parameter) เข้าไปประมวลผลและส่งผลลัพธ์ (Return) กลับมา', correct: true },
    { val: 'b', label: 'ใช้สำหรับเก็บข้อมูลชั่วคราวในตาราง' },
    { val: 'c', label: 'เป็นชื่อเรียกอีกอย่างของตาราง' },
  ];
  const checkQuiz = () => {
    setQuizChecked(true);
    const correct = opts.find(o => o.val === quizAns)?.correct;
    if (correct) log('> ✅ ถูกต้อง! ฟังก์ชันรับ Parameter เข้าไปประมวลผลแล้วส่ง Return Value กลับมา', 'success');
    else log('> ❌ ยังไม่ถูก ฟังก์ชันคือโปรแกรมย่อยที่รับค่าเข้าไปแล้วส่งผลลัพธ์กลับ', 'error');
  };
  const resetQuiz = () => { setQuizAns(null); setQuizChecked(false); log('> System: Quiz reset.', 'system'); };

  const fnTypes = [
    { name: 'Aggregate', icon: '📊', desc: 'ทำงานกับหลายแถว', ex: 'SUM(), AVG(), COUNT()' },
    { name: 'String',    icon: '📝', desc: 'จัดการข้อความ',   ex: 'UPPER(), CONCAT(), LENGTH()' },
    { name: 'Date/Time', icon: '📅', desc: 'จัดการวันที่/เวลา', ex: 'NOW(), DATE_FORMAT()' },
    { name: 'Math',      icon: '🔢', desc: 'คำนวณตัวเลข',     ex: 'ROUND(), ABS(), CEIL()' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 text-pink-700 rounded-lg"><Zap size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">หลักการของฟังก์ชัน (SQL Functions)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ฟังก์ชันคือโปรแกรมย่อยที่รับค่าเข้าไปประมวลผลแล้วส่งผลลัพธ์กลับมา MySQL มีฟังก์ชัน Built-in ให้ใช้งานมากมาย
        </p>
      </div>

      <div className="flex flex-col">
        {/* Function Type Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 border-b border-slate-200 bg-white">
          {fnTypes.map(t => (
            <div key={t.name} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="text-2xl mb-2">{t.icon}</div>
              <div className="font-bold text-slate-800 text-sm mb-1">{t.name}</div>
              <p className="text-xs text-slate-600 mb-2">{t.desc}</p>
              <code className="text-xs text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded">{t.ex}</code>
            </div>
          ))}
        </div>

        {/* Interactive Anatomy */}
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-1/2 p-6 flex flex-col gap-4 border-r border-slate-700">
            <div className="text-xs text-pink-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Code2 size={14}/> คลิกที่ส่วนประกอบเพื่อเรียนรู้
            </div>
            <div className="flex items-center gap-1 font-mono text-2xl flex-wrap">
              {parts.map(p => (
                <button key={p.key} onClick={() => handleClick(p.key)}
                  className={`px-3 py-2 rounded-lg border-2 font-bold transition-all active:scale-95 ${activeKey === p.key ? p.activeColor : p.color}`}>
                  {p.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-600 mt-2">→ ผลลัพธ์: <span className="text-emerald-400 font-bold font-mono">"HELLO"</span></div>
          </div>
          <div className="md:w-1/2 p-6 bg-slate-50">
            {activeKey ? (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-800 mb-2">{explanations[activeKey].title}</h4>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">{explanations[activeKey].desc}</p>
                <code className="block bg-slate-800 text-emerald-400 p-3 rounded-lg text-sm font-mono">{explanations[activeKey].example}</code>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-2">
                <Zap size={32} className="opacity-30"/>
                <span>คลิกที่ส่วนประกอบด้านซ้ายเพื่อดูคำอธิบาย</span>
              </div>
            )}
          </div>
        </div>

        {/* Quiz */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
              <HelpCircle size={16} className="text-pink-500"/> Quiz: ทดสอบความเข้าใจ
            </h4>
            <button onClick={resetQuiz} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ข้อใดอธิบายการทำงานของฟังก์ชันใน SQL ได้ถูกต้อง?</p>
          <div className="space-y-2 mb-4">
            {opts.map(o => (
              <button key={o.val} onClick={() => !quizChecked && setQuizAns(o.val)} disabled={quizChecked}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all
                  ${quizAns === o.val ? 'bg-pink-50 border-pink-400 text-pink-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-pink-300'}
                  ${quizChecked && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''}
                  ${quizChecked && quizAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQuiz} disabled={!quizAns || quizChecked}
              className="bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95">
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
