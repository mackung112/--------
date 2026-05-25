import React, { useState, useEffect, useRef } from 'react';
import { Box, RotateCcw, Play } from 'lucide-react';


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

export default function pyUnit6_2_DefFunction() {
  const [name, setName] = useState('สมชาย');
  const [times, setTimes] = useState(3);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Function Definition Simulator Ready.' },
    { type: 'system', text: '# ฟังก์ชันนี้พร้อมใช้งานแล้ว' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runCode = () => {
    const t = Math.max(1, Math.min(10, times));
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `greet("${name}", ${t})` },
    ]);

    setTimeout(() => {
      const outputs = [];
      for (let i = 0; i < t; i++) {
        outputs.push({ type: 'output', text: `สวัสดี ${name}` });
      }
      
      setConsoleHistory(prev => [
        ...prev,
        ...outputs
      ]);
    }, 200);
  };

  const clear = () => {
    setName('สมชาย');
    setTimes(3);
    setConsoleHistory([
      { type: 'system', text: 'Function Definition Simulator Ready.' },
      { type: 'system', text: '# ฟังก์ชันนี้พร้อมใช้งานแล้ว' }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Box size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">def Function (สร้างฟังก์ชันเอง)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          คำสั่ง <code className="bg-slate-200 px-1 rounded text-pink-600">def</code> ใช้สำหรับสร้างฟังก์ชันใหม่เพื่อรวมกลุ่มโค้ดที่ต้องเรียกใช้ซ้ำ ๆ 
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Section */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">กำหนด Parameters</h4>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="text-xs text-slate-700 block mb-1 font-medium">name (ชื่อ)</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full text-center font-bold border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none rounded-xl p-2 text-sm transition-colors" />
              </div>
              <div className="w-full sm:w-24">
                <label className="text-xs text-slate-700 block mb-1 font-medium">times (จำนวนรอบ)</label>
                <input type="number" min="1" max="10" value={times} onChange={e => setTimes(Math.min(10, Math.max(1, +e.target.value)))}
                  className="w-full text-center font-bold border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none rounded-xl p-2 text-sm transition-colors" />
              </div>
            </div>

            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-3">โค้ดฟังก์ชัน Greet</h4>
            <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm shadow-inner flex-1 mb-4 flex flex-col justify-center">
              <div className="text-slate-700 mb-1"># 1. นิยามฟังก์ชัน (Definition)</div>
              <div>
                <span className="text-pink-400">def</span> <span className="text-blue-400 font-bold">greet</span>(<span className="text-orange-300">name</span>, <span className="text-orange-300">times</span>=1):
              </div>
              <div className="ml-4 text-pink-400 mt-1">for <span className="text-slate-600">i</span> in <span className="text-sky-300">range</span>(<span className="text-slate-600">times</span>):</div>
              <div className="ml-8 text-sky-300">print(<span className="text-emerald-300">f"สวัสดี {'{'}name{'}'}"</span>)</div>
              
              <div className="mt-6 text-slate-700 mb-1"># 2. เรียกใช้งานฟังก์ชัน (Calling)</div>
              <div className="flex items-center gap-2">
                <div className="bg-slate-800/80 rounded px-2 py-1 border border-slate-700">
                  <span className="text-blue-400 font-bold">greet</span>(<span className="text-emerald-300">"{name}"</span>, <span className="text-purple-300">{times}</span>)
                </div>
              </div>
            </div>

            <button onClick={runCode}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <Play size={16} className="fill-current" /> เรียกใช้ฟังก์ชัน greet()
            </button>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ส่วนประกอบของฟังก์ชัน</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <ul className="space-y-4 text-sm text-slate-600">
                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-pink-100 text-pink-700 font-mono font-bold px-1.5 py-0.5 rounded text-xs">def</span>
                    <strong className="text-slate-700">Keyword</strong>
                  </div>
                  <p className="text-xs leading-relaxed">คำสั่งบังคับสำหรับประกาศสร้างฟังก์ชันใหม่</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 font-mono font-bold px-1.5 py-0.5 rounded text-xs">greet</span>
                    <strong className="text-slate-700">Function Name</strong>
                  </div>
                  <p className="text-xs leading-relaxed">ชื่อฟังก์ชัน (ตั้งตามกฎการตั้งชื่อตัวแปร)</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-700 font-mono font-bold px-1.5 py-0.5 rounded text-xs">(name, times)</span>
                    <strong className="text-slate-700">Parameters</strong>
                  </div>
                  <p className="text-xs leading-relaxed">ตัวแปรรับค่าเข้ามาในฟังก์ชัน (ถ้ามี <code className="font-mono text-[10px]">=1</code> คือค่า Default)</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-600 font-bold ml-1">...</span>
                    <strong className="text-slate-700">Function Body</strong>
                  </div>
                  <p className="text-xs leading-relaxed">โค้ดที่จะทำงานเมื่อถูกเรียกใช้ <span className="text-rose-500 font-bold">ต้องมีย่อหน้า (Indent) เสมอ</span></p>
                </li>
              </ul>
            </div>
            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python -i</span>
            </div>
            <button onClick={() => setConsoleHistory([
              { type: 'system', text: 'Function Definition Simulator Ready.' },
              { type: 'system', text: '# ฟังก์ชันนี้พร้อมใช้งานแล้ว' }
            ])} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-green-400 mr-2">{">>>"}</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700">{line.text}</div>}
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
