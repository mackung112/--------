import React, { useState, useRef, useEffect } from 'react';
import { Zap, Play, CheckCircle2, RefreshCcw, HelpCircle, Code2, TerminalSquare } from 'lucide-react';


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
  const resetQuiz = () => { setQuizAns(null); setQuizChecked(false); log('> System: Quiz reset.', 'system'); };

  const fnTypes = [
    { name: 'Aggregate', icon: '📊', desc: 'ทำงานกับหลายแถว', ex: 'SUM(), AVG(), COUNT()' },
    { name: 'String',    icon: '📝', desc: 'จัดการข้อความ',   ex: 'UPPER(), CONCAT(), LENGTH()' },
    { name: 'Date/Time', icon: '📅', desc: 'จัดการวันที่/เวลา', ex: 'NOW(), DATE_FORMAT()' },
    { name: 'Math',      icon: '🔢', desc: 'คำนวณตัวเลข',     ex: 'ROUND(), ABS(), CEIL()' },
  ];

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
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
