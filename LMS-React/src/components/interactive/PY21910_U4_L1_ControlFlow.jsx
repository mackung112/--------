import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Play, RotateCcw } from 'lucide-react';

export default function PY21910_U4_L1_ControlFlow() {
  const [selected, setSelected] = useState('if');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Control Flow Demo Ready.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const demos = {
    if: {
      title: 'if statement',
      code: `x = 5\nif x > 3:\n    print("x > 3")\nelse:\n    print("x <= 3")`,
      output: 'x > 3'
    },
    elif: {
      title: 'if‑elif‑else',
      code: `x = 2\nif x > 3:\n    print("gt")\nelif x == 2:\n    print("equals 2")\nelse:\n    print("other")`,
      output: 'equals 2'
    },
    while: {
      title: 'while loop',
      code: `i = 0\nwhile i < 3:\n    print(i)\n    i += 1`,
      output: '0\n1\n2'
    }
  };

  const runDemo = (key) => {
    const d = demos[key];
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: d.code.replace(/\n/g, '\n>>> ') },
      { type: 'output', text: d.output }
    ]);
  };

  const clearConsole = () => setConsoleHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Code size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Control Flow (if / elif / while)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทดลองเงื่อนไขและลูปโดยตรงใน Terminal จำลองของ Python
        </p>
      </div>

      {/* Main */}
      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left Visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">เลือกตัวอย่าง</h4>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {Object.keys(demos).map(key => (
                <button
                  key={key}
                  onClick={() => { setSelected(key); runDemo(key); }}
                  className={`px-4 py-2 rounded-xl font-medium transition-all active:scale-95 ${selected===key ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
                >
                  {demos[key].title}
                </button>
              ))}
            </div>
          </div>
          {/* Right Controls */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">คำอธิบาย</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              {demos[selected] && (
                <>
                  <pre className="font-mono text-sm text-slate-800 whitespace-pre-wrap mb-2">{demos[selected].code}</pre>
                  <p className="text-sm text-slate-600">ผลลัพธ์จะปรากฏที่ Terminal ด้านล่าง</p>
                </>
              )}
            </div>
            <button
              onClick={clearConsole}
              className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Clear Console
            </button>
          </div>
        </div>
        {/* Bottom Console */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python -i</span>
            </div>
            <button onClick={clearConsole} className="text-slate-600 hover:text-white transition-colors flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && (
                  <div className="text-slate-600">
                    <span className="text-green-400 mr-2">{">>>"}</span>{line.text}
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>
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
  );
}
