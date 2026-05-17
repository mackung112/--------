import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Plus, Minus, XCircle, Divide, Play, RotateCcw } from 'lucide-react';

const operations = [
  { label: 'addition (+)', expr: '5 + 3', result: '8' },
  { label: 'subtraction (-)', expr: '10 - 4', result: '6' },
  { label: 'multiplication (*)', expr: '7 * 6', result: '42' },
  { label: 'division (/)', expr: '20 / 5', result: '4.0' },
];

export default function PY21910_U4_L4_ArithmeticOps() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Arithmetic Operations Demo Ready.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [history]);

  const runOp = (op) => {
    setHistory(prev => [
      ...prev,
      { type: 'command', text: `print(${op.expr})` },
      { type: 'output', text: op.result }
    ]);
  };

  const clear = () => setHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Plus size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Arithmetic Operations (+, -, *, /)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทดลองการคำนวณพื้นฐานของ Python ด้วย Terminal จำลอง
        </p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">เลือกการคำนวณ</h4>
            <div className="grid grid-cols-2 gap-3">
              {operations.map((op, i) => (
                <button key={i}
                  onClick={() => runOp(op)}
                  className="bg-white border border-slate-200 rounded-xl p-3 hover:border-indigo-400 hover:shadow-md active:scale-95 flex flex-col justify-between"
                >
                  <div className="font-mono text-sm font-bold text-slate-800 mb-1">{op.label}</div>
                  <div className="text-xs text-slate-700">{op.expr}</div>
                </button>
              ))}
            </div>
          </div>
          {/* Right controls */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">คำอธิบาย</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 flex-1">
              <p className="text-sm text-slate-600 leading-relaxed">คลิกใด ๆ ด้านซ้ายเพื่อดูผลลัพธ์ของการคำนวณใน Terminal ด้านล่าง</p>
            </div>
            <button onClick={clear}
              className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Clear Console
            </button>
          </div>
        </div>
        {/* Bottom terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
            <button onClick={clear} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {history.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === 'command' && (
                  <div className="text-slate-600"><span className="text-green-400 mr-2">{">>>"}</span>{line.text}</div>
                )}
                {line.type === 'output' && (<div className="text-cyan-300">{line.text}</div>)}
                {line.type === 'system' && (<div className="text-slate-700">{line.text}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
