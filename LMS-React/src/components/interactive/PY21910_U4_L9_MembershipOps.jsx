import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, Code } from 'lucide-react';

const examples = [
  { id: 1, title: 'in (อยู่ในลิสต์)', code: '3 in [1,2,3,4]', output: 'True' },
  { id: 2, title: 'not in (ไม่อยู่ในลิสต์)', code: '5 not in [1,2,3,4]', output: 'True' },
];

export default function PY21910_U4_L9_MembershipOps() {
  const [active, setActive] = useState(0);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Membership Ops Demo Ready.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runExample = (ex) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: ex.code },
      { type: 'output', text: ex.output }
    ]);
  };

  const clear = () => setConsoleHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Code size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Membership Ops (in / not in)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          ตรวจสอบว่าค่าหนึ่งอยู่ในคอลเลกชันหรือไม่
        </p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">เลือกตัวอย่าง</h4>
            <div className="flex flex-col gap-2">
              {examples.map((ex, i) => (
                <button key={i}
                  onClick={() => { setActive(i); runExample(ex); }}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 transition-all active:scale-95 text-left">
                  {ex.title}
                </button>
              ))}
            </div>
          </div>
          {/* Right controls */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">อธิบาย</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <p className="text-sm text-slate-600 leading-relaxed">`in` คืนค่า True ถ้าค่าที่ตรวจสอบอยู่ในลิสต์/เทuple/เซต และ `not in` ให้ค่า True เมื่อค่าไม่อยู่ในคอลเลกชันนั้น</p>
            </div>
            <button onClick={clear}
              className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> Clear Console
            </button>
          </div>
        </div>
        {/* Bottom terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
            <button onClick={clear} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-green-400 mr-2">{">>>"}</span>{line.text}</div>}
                {line.type === 'output' && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system' && <div className="text-slate-500">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
