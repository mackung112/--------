import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ToggleLeft, Play, RotateCcw, ShieldCheck } from 'lucide-react';




export default function pyUnit3_6_BooleanExplorer() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Boolean Explorer Ready.' },
    { type: 'command', text: 'a = True' },
    { type: 'command', text: 'b = False' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const toggleA = () => {
    const newVal = !a;
    setA(newVal);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `a = ${newVal ? 'True' : 'False'}` }
    ]);
  };

  const toggleB = () => {
    const newVal = !b;
    setB(newVal);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `b = ${newVal ? 'True' : 'False'}` }
    ]);
  };

  const ops = [
    { expr: 'a and b', result: a && b, desc: 'ต้องเป็น True ทั้งคู่' },
    { expr: 'a or b', result: a || b, desc: 'อันใดอันหนึ่งเป็น True ก็พอ' },
    { expr: 'not a', result: !a, desc: 'กลับค่า a ตรงข้าม' },
    { expr: 'not b', result: !b, desc: 'กลับค่า b ตรงข้าม' },
    { expr: 'a == b', result: a === b, desc: 'ตรวจสอบว่าเท่ากันไหม?' },
    { expr: 'a != b', result: a !== b, desc: 'ตรวจสอบว่าไม่เท่ากันไหม?' },
  ];

  const runOperation = (op) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `print(${op.expr})` },
      { type: 'output', text: op.result ? 'True' : 'False' }
    ]);
  };

  const checkType = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `type(a)` },
      { type: 'output', text: `<class 'bool'>` }
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
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <ToggleLeft size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Boolean Explorer (ตรรกศาสตร์)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          สำรวจชนิดข้อมูล Boolean (True/False) และตัวดำเนินการทางตรรกศาสตร์ (Logical Operators)
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">1. กำหนดค่าตัวแปร a และ b</h4>
            
            <div className="flex justify-center gap-6 mb-8">
              <button 
                onClick={toggleA} 
                className={`w-32 py-4 rounded-2xl font-bold text-lg font-mono transition-all active:scale-95 flex flex-col items-center gap-2 ${
                  a ? 'bg-emerald-500 text-white shadow-md border-b-4 border-emerald-700' : 'bg-rose-500 text-white shadow-md border-b-4 border-rose-700'
                }`}
              >
                <div className="text-xs uppercase opacity-80">ตัวแปร a</div>
                <div>{a ? 'True' : 'False'}</div>
              </button>
              
              <button 
                onClick={toggleB} 
                className={`w-32 py-4 rounded-2xl font-bold text-lg font-mono transition-all active:scale-95 flex flex-col items-center gap-2 ${
                  b ? 'bg-emerald-500 text-white shadow-md border-b-4 border-emerald-700' : 'bg-rose-500 text-white shadow-md border-b-4 border-rose-700'
                }`}
              >
                <div className="text-xs uppercase opacity-80">ตัวแปร b</div>
                <div>{b ? 'True' : 'False'}</div>
              </button>
            </div>

            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">2. ตัวดำเนินการตรรกศาสตร์</h4>
            <div className="grid grid-cols-2 gap-3">
              {ops.map((op, i) => (
                <button 
                  key={i} 
                  onClick={() => runOperation(op)}
                  className={`border rounded-xl p-4 text-left transition-all active:scale-95 group flex flex-col justify-between ${
                    op.result 
                      ? 'bg-emerald-50 border-emerald-200 hover:border-emerald-400' 
                      : 'bg-rose-50 border-rose-200 hover:border-rose-400'
                  }`}
                >
                  <div>
                    <div className={`font-mono text-lg font-bold mb-1 ${op.result ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {op.expr}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed mb-3">
                      {op.desc}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold py-1.5 px-2 rounded-md w-max ${
                    op.result ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    <Play size={12} className="fill-current" /> Result: {op.result ? 'True' : 'False'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Control / Gamification */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">Truth Table (ตารางความจริง)</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-2">a</th>
                    <th className="py-2 border-l border-slate-200">b</th>
                    <th className="py-2 border-l border-slate-200">and</th>
                    <th className="py-2 border-l border-slate-200">or</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 font-mono text-xs">
                  <tr className="border-b border-slate-100">
                    <td className="py-2 text-emerald-600 font-bold">T</td>
                    <td className="py-2 border-l border-slate-100 text-emerald-600 font-bold">T</td>
                    <td className="py-2 border-l border-slate-100 text-emerald-600 font-bold">T</td>
                    <td className="py-2 border-l border-slate-100 text-emerald-600 font-bold">T</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="py-2 text-emerald-600 font-bold">T</td>
                    <td className="py-2 border-l border-slate-100 text-rose-600 font-bold">F</td>
                    <td className="py-2 border-l border-slate-100 text-rose-600 font-bold">F</td>
                    <td className="py-2 border-l border-slate-100 text-emerald-600 font-bold">T</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 text-rose-600 font-bold">F</td>
                    <td className="py-2 border-l border-slate-100 text-emerald-600 font-bold">T</td>
                    <td className="py-2 border-l border-slate-100 text-rose-600 font-bold">F</td>
                    <td className="py-2 border-l border-slate-100 text-emerald-600 font-bold">T</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-rose-600 font-bold">F</td>
                    <td className="py-2 border-l border-slate-100 text-rose-600 font-bold">F</td>
                    <td className="py-2 border-l border-slate-100 text-rose-600 font-bold">F</td>
                    <td className="py-2 border-l border-slate-100 text-rose-600 font-bold">F</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-[10px] text-slate-600 mt-2 text-right">T = True, F = False</div>
            </div>

            <button 
              onClick={checkType}
              className="mt-auto w-full bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm border-b-4 border-amber-800"
            >
              <ShieldCheck size={18} /> เช็คชนิดข้อมูล type(a)
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
                  <div className={line.text === 'True' ? "text-emerald-400" : "text-rose-400"}>{line.text}</div>
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
