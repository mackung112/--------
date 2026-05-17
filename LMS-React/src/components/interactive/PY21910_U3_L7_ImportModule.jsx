import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Package, Play, RotateCcw, Info } from 'lucide-react';

const modules = [
  { name: 'math', desc: 'ฟังก์ชันทางคณิตศาสตร์ระดับสูง', funcs: [
    { call: 'math.sqrt(16)', result: '4.0', desc: 'หารากที่สอง' },
    { call: 'math.pi', result: '3.141592653589793', desc: 'ค่า Pi' },
    { call: 'math.ceil(4.2)', result: '5', desc: 'ปัดเศษขึ้นเสมอ' },
    { call: 'math.floor(4.8)', result: '4', desc: 'ปัดเศษทิ้งเสมอ' },
  ]},
  { name: 'random', desc: 'การสุ่มตัวเลขและสุ่มเลือกข้อมูล', funcs: [
    { call: 'random.randint(1, 10)', result: '7 (สุ่มเลข 1 ถึง 10)', desc: 'สุ่มจำนวนเต็ม' },
    { call: 'random.choice(["A","B","C"])', result: "'B' (สุ่มเลือก 1 ตัว)", desc: 'สุ่มจากลิสต์' },
    { call: 'random.random()', result: '0.847291...', desc: 'สุ่มทศนิยม 0.0 - 1.0' },
  ]},
  { name: 'datetime', desc: 'การจัดการวันที่และเวลา', funcs: [
    { call: 'datetime.datetime.now()', result: '2026-05-16 10:30:00.000', desc: 'เวลาปัจจุบัน' },
    { call: 'datetime.date.today()', result: '2026-05-16', desc: 'วันที่ปัจจุบัน' },
  ]},
];

export default function PY21910_U3_L7_ImportModule() {
  const [activeMod, setActiveMod] = useState(0);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Module Explorer Ready.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const selectModule = (index) => {
    setActiveMod(index);
    const m = modules[index];
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `import ${m.name}` },
      { type: 'success', text: `✓ Module '${m.name}' imported successfully.` }
    ]);
  };

  const runFunction = (func) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: func.call.includes('(') ? `print(${func.call})` : func.call },
      { type: 'output', text: func.result }
    ]);
  };

  const clearConsole = () => {
    setConsoleHistory([]);
  };

  const mod = modules[activeMod];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Simulator Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Package size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Import Module (การเรียกใช้โมดูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการใช้คำสั่ง <code className="bg-slate-200 px-1 rounded text-pink-600">import</code> เพื่อนำเครื่องมือเสริม (Standard Library) มาใช้งาน
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">1. เลือกโมดูล (Select Module)</h4>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {modules.map((m, i) => {
                const isActive = activeMod === i;
                return (
                  <button 
                    key={i} 
                    onClick={() => selectModule(i)}
                    className={`px-4 py-2 rounded-xl font-bold font-mono transition-all active:scale-95 flex items-center gap-2 ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                    }`}
                  >
                    import {m.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700">2. ฟังก์ชันใน {mod.name}</h4>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-bold">{mod.desc}</span>
            </div>

            <div className="space-y-3">
              {mod.funcs.map((f, i) => (
                <button 
                  key={i} 
                  onClick={() => runFunction(f)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 transition-all hover:border-indigo-400 hover:shadow-md active:scale-95 group flex items-center justify-between"
                >
                  <div className="text-left flex-1">
                    <div className="font-mono text-sm font-bold text-slate-800 mb-1">{f.call}</div>
                    <div className="text-xs text-slate-700">{f.desc}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold bg-indigo-50 py-1.5 px-3 rounded-md">
                    <Play size={12} className="fill-current" /> รันดูผลลัพธ์
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Control / Gamification */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">เกร็ดความรู้ (Did you know?)</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info size={18} className="text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm">Batteries Included</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Python มีปรัชญา "Batteries Included" คือมีโมดูลมาตรฐาน (Standard Library) มากกว่า 200 ตัวที่ติดตั้งมาพร้อมกับตัวภาษา ให้เราเรียกใช้ได้ทันที!
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                การ <code className="bg-slate-100 px-1 rounded text-pink-600">import</code> เปรียบเสมือนการเดินไปหยิบกล่องเครื่องมือเฉพาะทางมาใช้ ทำให้เราไม่ต้องเขียนโค้ดยากๆ เองทั้งหมด
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Full-width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python</span>
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
                    <span className="text-green-400 mr-2">{">>>"}</span>
                    <span className={line.text.startsWith('import') ? 'text-pink-400' : ''}>
                      {line.text.startsWith('import') ? 'import ' : ''}
                    </span>
                    <span className={line.text.startsWith('import') ? 'text-green-300' : ''}>
                      {line.text.startsWith('import') ? line.text.replace('import ', '') : line.text}
                    </span>
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-cyan-300">{line.text}</div>
                )}
                {line.type === 'system' && (
                  <div className="text-slate-700">{line.text}</div>
                )}
                {line.type === 'success' && (
                  <div className="text-emerald-400 text-xs mt-1 mb-2">{line.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
