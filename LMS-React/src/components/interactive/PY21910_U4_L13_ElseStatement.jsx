import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, RotateCcw } from 'lucide-react';

export default function PY21910_U4_L13_ElseStatement() {
  const [num, setNum] = useState(7);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'else Statement Simulator Ready.' },
    { type: 'command', text: 'num = 7' },
    { type: 'command', text: 'if num % 2 == 0:' },
    { type: 'system',  text: '    # เงื่อนไขเป็น False — ข้ามไป else' },
    { type: 'command', text: 'else:' },
    { type: 'output',  text: '7 เป็นเลขคี่' },
  ]);
  const consoleRef = useRef(null);
  const isEven = num % 2 === 0;

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleChange = (val) => {
    setNum(val);
    const even = val % 2 === 0;
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `num = ${val}` },
      { type: 'command', text: `if num % 2 == 0:` },
      even
        ? { type: 'output', text: `${val} เป็นเลขคู่` }
        : { type: 'system', text: `    # False → ข้ามไป else` },
      even
        ? { type: 'system', text: `    # True → ไม่รัน else` }
        : { type: 'command', text: `else:` },
      !even ? { type: 'output', text: `${val} เป็นเลขคี่` } : null,
    ].filter(Boolean));
  };

  const clear = () => setConsoleHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
            <GitBranch size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">else Statement (ทางเลือกสุดท้าย)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          บล็อก <code className="bg-slate-200 px-1 rounded text-pink-600">else</code> จะรันก็ต่อเมื่อเงื่อนไข <code className="bg-slate-200 px-1 rounded">if</code> เป็น False เท่านั้น
        </p>
      </div>

      <div className="flex flex-col min-h-[420px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Simulator */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-6">กรอกตัวเลขใด ๆ</h4>
            <div className="flex flex-col items-center gap-6">
              <input type="number" value={num}
                onChange={e => handleChange(+e.target.value)}
                className="w-32 text-center text-5xl font-black border-2 border-violet-300 rounded-2xl p-3 focus:outline-none focus:border-violet-500" />

              {/* Result */}
              <div className={`w-full max-w-xs py-5 px-8 rounded-2xl text-center font-bold text-2xl border-2 transition-all duration-300 ${
                isEven ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-amber-50 border-amber-300 text-amber-700'
              }`}>
                {num} เป็นเลข{isEven ? 'คู่' : 'คี่'}
              </div>

              {/* Flowchart-like code visualization */}
              <div className="w-full max-w-xs bg-slate-900 rounded-xl p-4 font-mono text-sm">
                <div className="text-purple-400">num = {num}</div>
                <div className="text-slate-600 text-xs mt-1 mb-1"># ตรวจหารด้วย 2</div>
                <div className={`text-pink-400 ${isEven ? 'font-bold' : ''}`}>if num % 2 == 0:</div>
                <div className={`ml-4 transition-all ${isEven ? 'text-emerald-400 font-bold' : 'text-slate-600'}`}>
                  print("{num} เป็นเลขคู่")
                </div>
                <div className={`text-pink-400 ${!isEven ? 'font-bold' : ''}`}>else:</div>
                <div className={`ml-4 transition-all ${!isEven ? 'text-amber-400 font-bold' : 'text-slate-600'}`}>
                  print("{num} เป็นเลขคี่")
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">โครงสร้าง if-else</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4">
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-100 leading-relaxed">
                <span className="text-pink-400">if</span> <span className="text-yellow-300">เงื่อนไข</span>:<br/>
                <span className="ml-4 text-cyan-300">{'# รันเมื่อ True'}</span><br/>
                <span className="text-pink-400">else</span>:<br/>
                <span className="ml-4 text-amber-300">{'# รันเมื่อ False'}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mt-3">
                <strong>else</strong> คือ "ทางเลือกสำรอง" — ถ้าเงื่อนไขในบล็อก <strong>if</strong> ไม่เป็น True ทุกข้อ Python จะมารันโค้ดใน <strong>else</strong> แทน
              </p>
            </div>
            <button onClick={clear}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> Clear Terminal
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
            <button onClick={clear} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
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
  );
}
