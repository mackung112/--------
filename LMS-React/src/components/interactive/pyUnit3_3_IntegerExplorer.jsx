import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Hash, Play, RotateCcw, Calculator } from 'lucide-react';


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

export default function pyUnit3_3_IntegerExplorer() {
  const [a, setA] = useState(10);
  const [b, setB] = useState(3);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Integer Explorer Ready.' },
    { type: 'command', text: 'a = 10' },
    { type: 'command', text: 'b = 3' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const updateVars = (newA, newB) => {
    setA(newA);
    setB(newB);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `a = ${newA}` },
      { type: 'command', text: `b = ${newB}` }
    ]);
  };

  const ops = [
    { sym: '+', result: a + b, name: 'บวก', pyCode: 'a + b' },
    { sym: '-', result: a - b, name: 'ลบ', pyCode: 'a - b' },
    { sym: '*', result: a * b, name: 'คูณ', pyCode: 'a * b' },
    { sym: '//', result: Math.floor(a / b), name: 'หารปัดทิ้ง', pyCode: 'a // b' },
    { sym: '%', result: ((a % b) + b) % b, name: 'หารเอาเศษ', pyCode: 'a % b' },
    { sym: '**', result: Math.pow(a, Math.min(b, 10)), name: 'ยกกำลัง', pyCode: 'a ** b' },
  ];

  const runOperation = (op) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `print(${op.pyCode})` },
      { type: 'output', text: `${op.result}` }
    ]);
  };

  const checkType = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `type(a)` },
      { type: 'output', text: `<class 'int'>` }
    ]);
  };

  const clearConsole = () => {
    setConsoleHistory([]);
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
      {/* Simulator Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Hash size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Integer Explorer (จำนวนเต็ม)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          สำรวจชนิดข้อมูล Integer (int) และตัวดำเนินการทางคณิตศาสตร์ใน Python
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">1. กำหนดตัวแปร (Variables)</h4>
            
            <div className="flex justify-center gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <label className="block text-sm font-bold text-blue-700 mb-2">ตัวแปร a</label>
                <input 
                  type="number" 
                  value={a} 
                  onChange={e => updateVars(+e.target.value || 0, b)} 
                  className="w-24 text-center text-2xl font-bold font-mono border-2 border-blue-300 rounded-xl p-2 focus:outline-none focus:border-blue-500 bg-white" 
                />
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <label className="block text-sm font-bold text-purple-700 mb-2">ตัวแปร b</label>
                <input 
                  type="number" 
                  value={b} 
                  onChange={e => updateVars(a, +e.target.value || 1)} 
                  className="w-24 text-center text-2xl font-bold font-mono border-2 border-purple-300 rounded-xl p-2 focus:outline-none focus:border-purple-500 bg-white" 
                />
              </div>
            </div>

            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">2. ตัวดำเนินการ (Operators)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ops.map((op, i) => (
                <button 
                  key={i} 
                  onClick={() => runOperation(op)}
                  className="bg-white border border-slate-200 rounded-xl p-3 text-center transition-all hover:border-blue-400 hover:shadow-md active:scale-95 group"
                >
                  <div className="text-xs font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition-colors">{op.name}</div>
                  <div className="font-mono text-sm text-slate-700 mb-2">{a} {op.sym} {b}</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-blue-600 font-bold bg-blue-50 py-1 rounded">
                    <Play size={12} className="fill-current" /> รันดูผลลัพธ์
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Control / Gamification */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">คำอธิบายเพิ่มเติม</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                Python มีตัวดำเนินการทางคณิตศาสตร์ที่ครบถ้วน ที่น่าสนใจคือ:
              </p>
              <ul className="text-sm text-slate-600 list-disc list-inside mt-2 space-y-2">
                <li><code className="bg-slate-100 px-1 rounded text-pink-600">/</code> หารปกติ จะได้ผลลัพธ์เป็น Float เสมอ</li>
                <li><code className="bg-slate-100 px-1 rounded text-pink-600">//</code> หารปัดเศษทิ้ง จะได้เป็น Integer</li>
                <li><code className="bg-slate-100 px-1 rounded text-pink-600">**</code> ยกกำลัง (เช่น 2**3 = 8)</li>
              </ul>
            </div>

            <button 
              onClick={checkType}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto"
            >
              <Calculator size={18} /> เช็คชนิดข้อมูล type(a)
            </button>
          </div>
        </div>

        {/* Bottom Full-width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python -i</span>
            </div>
            <button 
              onClick={clearConsole}
              className="text-slate-600 hover:text-white transition-colors flex items-center gap-1 text-xs"
            >
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === 'command' && (
                  <div className="text-slate-600">
                    <span className="text-green-400 mr-2">{">>>"}</span>{line.text}
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-cyan-300">{line.text}</div>
                )}
                {line.type === 'system' && (
                  <div className="text-slate-700">{line.text}</div>
                )}
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
