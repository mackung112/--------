import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Hash, Play, RotateCcw, AlertTriangle } from 'lucide-react';




export default function pyUnit3_4_FloatExplorer() {
  const [val, setVal] = useState('3.14');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Float Explorer Ready.' },
    { type: 'command', text: 'x = 3.14' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const updateVal = (newVal) => {
    setVal(newVal);
    if (!isNaN(parseFloat(newVal))) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `x = ${newVal}` }
      ]);
    }
  };

  const num = parseFloat(val) || 0;

  const demos = [
    { label: 'round(x, 2)', result: num.toFixed(2), desc: 'ปัดเศษทศนิยม 2 ตำแหน่ง' },
    { label: 'int(x)', result: Math.trunc(num), desc: 'แปลงเป็นจำนวนเต็ม (ตัดเศษทิ้ง)' },
    { label: 'type(x)', result: "<class 'float'>", desc: 'เช็คชนิดข้อมูล' },
  ];

  const floatTrap = [
    { label: '0.1 + 0.2', code: '0.1 + 0.2', result: '0.30000000000000004' }
  ];

  const runOperation = (demo) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: demo.label.includes('x') ? demo.label : `print(${demo.label})` },
      { type: 'output', text: `${demo.result}` }
    ]);
  };

  const runFloatTrap = (trap) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: trap.code },
      { type: 'output', text: trap.result },
      { type: 'warning', text: 'Warning: Floating Point Precision Issue!' }
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
          <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
            <Hash size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Float Explorer (ทศนิยม)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          สำรวจชนิดข้อมูล Float การปัดเศษ และข้อควรระวังเรื่องความแม่นยำของทศนิยม
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">1. กำหนดค่าตัวแปร x</h4>
            
            <div className="flex justify-center mb-8">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
                <label className="block text-sm font-bold text-teal-700 mb-2">ตัวแปร x (Float)</label>
                <input 
                  type="text" 
                  value={val} 
                  onChange={e => updateVal(e.target.value)} 
                  className="w-40 text-center text-2xl font-bold font-mono border-2 border-teal-300 rounded-xl p-2 focus:outline-none focus:border-teal-500 bg-white" 
                  placeholder="3.14"
                />
              </div>
            </div>

            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">2. ฟังก์ชันจัดการทศนิยม</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {demos.map((d, i) => (
                <button 
                  key={i} 
                  onClick={() => runOperation(d)}
                  className="bg-white border border-slate-200 rounded-xl p-4 text-left transition-all hover:border-teal-400 hover:shadow-md active:scale-95 group flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-sm font-bold text-teal-700 mb-1">{d.label}</div>
                    <div className="text-xs text-slate-700 leading-relaxed mb-3">{d.desc}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-teal-600 font-bold bg-teal-50 py-1.5 px-2 rounded-md w-max">
                    <Play size={12} className="fill-current" /> รันเพื่อดูผล
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Control / Gamification */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">Floating Point Precision</h4>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                <span className="font-bold text-amber-800 text-sm">ข้อควรระวังสำคัญ!</span>
              </div>
              <p className="text-sm text-amber-800 leading-relaxed">
                การบวกทศนิยมในคอมพิวเตอร์ (Float) ไม่ได้แม่นยำ 100% เสมอไป เนื่องจากคอมพิวเตอร์เก็บข้อมูลเป็นเลขฐาน 2 
              </p>
              
              <button 
                onClick={() => runFloatTrap(floatTrap[0])}
                className="mt-4 w-full bg-amber-200 hover:bg-amber-300 text-amber-900 border border-amber-400 font-medium rounded-lg px-3 py-2 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Play size={14} className="fill-current" /> ลองรัน {floatTrap[0].code}
              </button>
            </div>
            
            <p className="text-xs text-slate-700 leading-relaxed mt-auto">
              💡 <strong>คำแนะนำ</strong>: หากต้องการความแม่นยำสูง (เช่น คำนวณเงิน) ให้ใช้ Module <code className="bg-slate-200 px-1 rounded">decimal</code> แทน float ปกติ
            </p>
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
                {line.type === 'warning' && (
                  <div className="text-amber-400 mt-1 mb-2 font-bold">{line.text}</div>
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
