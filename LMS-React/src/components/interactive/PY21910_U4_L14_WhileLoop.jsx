import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Play, RotateCcw } from 'lucide-react';

export default function PY21910_U4_L14_WhileLoop() {
  const [target, setTarget] = useState(5);
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'while Loop Simulator Ready.' },
  ]);
  const consoleRef = useRef(null);
  const intervalRef = useRef(null);

  const steps = Array.from({ length: target }, (_, i) => i + 1);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const runLoop = () => {
    setRunning(true);
    setCurrentStep(0);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `count = 1` },
      { type: 'command', text: `while count <= ${target}:` },
    ]);
    let c = 1;
    intervalRef.current = setInterval(() => {
      if (c <= target) {
        const step = c;
        setCurrentStep(step - 1);
        setConsoleHistory(prev => [
          ...prev,
          { type: 'output', text: `  รอบที่ ${step}: count = ${step}` },
        ]);
        c++;
      } else {
        clearInterval(intervalRef.current);
        setConsoleHistory(prev => [
          ...prev,
          { type: 'system', text: `count = ${c} > ${target} → หยุด loop` },
        ]);
        setRunning(false);
        setCurrentStep(target);
      }
    }, 400);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setCurrentStep(-1);
    setConsoleHistory([{ type: 'system', text: 'while Loop Simulator Ready.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
            <RefreshCw size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">while Loop (ลูปเงื่อนไข)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จำลองการทำงานของ <code className="bg-slate-200 px-1 rounded text-pink-600">while</code> loop แบบทีละ step — วนซ้ำตราบเท่าที่เงื่อนไขยังเป็น True
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">กำหนดจำนวนรอบ</h4>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-slate-600">วนซ้ำ</span>
              <input type="range" min="1" max="10" value={target}
                onChange={e => { reset(); setTarget(+e.target.value); }}
                className="w-40 accent-teal-500" />
              <span className="font-bold text-teal-600 text-lg">{target} รอบ</span>
            </div>

            {/* Step boxes */}
            <div className="flex flex-wrap gap-2 mb-6">
              {steps.map((s, i) => (
                <div key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border-2 transition-all duration-300 ${
                  currentStep === i
                    ? 'bg-teal-500 text-white border-teal-600 scale-110 shadow-lg'
                    : currentStep > i
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}>
                  {s}
                </div>
              ))}
            </div>

            {/* Code view */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
              <div className="text-purple-400">count = 1</div>
              <div className="text-pink-400 mt-1">while count &lt;= {target}:</div>
              <div className={`ml-4 mt-0.5 ${running || currentStep >= 0 ? 'text-cyan-300' : 'text-slate-600'}`}>
                print(count)
              </div>
              <div className={`ml-4 ${running || currentStep >= 0 ? 'text-cyan-300' : 'text-slate-600'}`}>
                count += 1
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ควบคุมการจำลอง</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <p className="text-sm text-slate-700 font-bold mb-2">สถานะ</p>
              <div className={`text-sm font-medium px-3 py-2 rounded-lg mb-3 ${
                running ? 'bg-teal-100 text-teal-700' : currentStep >= target ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {running ? `⏳ กำลังวน... รอบที่ ${currentStep + 1}` : currentStep >= target ? '✅ จบ loop แล้ว' : '⏸ รอกดปุ่ม Run'}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                while loop จะวนซ้ำต่อเรื่อยๆ ตราบเท่าที่เงื่อนไขยังเป็น True หากลืมอัปเดตค่าเงื่อนไขอาจเกิด Infinite Loop ได้
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={runLoop} disabled={running}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
                <Play size={16} className="fill-current" /> รัน
              </button>
              <button onClick={reset}
                className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl active:scale-95 transition-all">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python loop.py</span>
            </div>
            <button onClick={reset} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
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
