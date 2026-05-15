import React, { useState, useEffect, useRef } from 'react';
import { Repeat, ArrowRight, RotateCcw } from 'lucide-react';

const FRUITS = ['🍎 แอปเปิ้ล', '🍌 กล้วย', '🍊 ส้ม', '🍇 องุ่น', '🍓 สตรอเบอร์รี่'];

export default function PY21910_U4_L15_ForLoop() {
  const [step, setStep] = useState(-1);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'for Loop Simulator Ready.' },
    { type: 'command', text: 'fruits = ["แอปเปิ้ล","กล้วย","ส้ม","องุ่น","สตรอเบอร์รี่"]' },
    { type: 'command', text: 'for fruit in fruits:' },
    { type: 'system',  text: '    # กดปุ่มเพื่อดูการวน loop ทีละรอบ' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const next = () => {
    if (step < FRUITS.length - 1) {
      const nextStep = step + 1;
      const fruit = FRUITS[nextStep].split(' ')[1];
      setStep(nextStep);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'output', text: `    รอบที่ ${nextStep + 1}: fruit = "${fruit}"  → print(fruit)` },
        { type: 'output', text: `    ${fruit}` },
      ]);
    }
  };

  const reset = () => {
    setStep(-1);
    setConsoleHistory([
      { type: 'system', text: 'for Loop Simulator Ready.' },
      { type: 'command', text: 'fruits = ["แอปเปิ้ล","กล้วย","ส้ม","องุ่น","สตรอเบอร์รี่"]' },
      { type: 'command', text: 'for fruit in fruits:' },
      { type: 'system',  text: '    # กดปุ่มเพื่อดูการวน loop ทีละรอบ' },
    ]);
  };

  const isFinished = step >= FRUITS.length - 1;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <Repeat size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">for Loop (วนซ้ำตามชุดข้อมูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          <code className="bg-slate-200 px-1 rounded text-pink-600">for</code> loop วนซ้ำผ่านสมาชิกแต่ละตัวในลิสต์ทีละค่า กดปุ่มถัดไปเพื่อดูการทำงานแบบ Step-by-step
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">รายการผลไม้ (List)</h4>
            <div className="space-y-2 mb-6">
              {FRUITS.map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                  step === i
                    ? 'bg-emerald-50 border-emerald-400 shadow-md scale-[1.02]'
                    : step > i
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200'
                }`}>
                  <div className={`text-2xl ${step === i ? '' : step > i ? 'opacity-40' : 'opacity-60'}`}>
                    {item.split(' ')[0]}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${step === i ? 'text-emerald-800 font-bold' : step > i ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {item.split(' ')[1]}
                    </div>
                    {step === i && <div className="text-xs text-emerald-600 font-mono">fruit = "{item.split(' ')[1]}"</div>}
                  </div>
                  {step > i && <div className="text-emerald-500 text-sm font-bold">✓</div>}
                  {step === i && <div className="text-emerald-600 text-xs font-bold bg-emerald-100 px-2 py-1 rounded">รอบที่ {i + 1}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">โค้ด Python</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm mb-4">
              <div className="text-purple-400">fruits = [...]</div>
              <div className="text-pink-400 mt-1">for fruit in fruits:</div>
              <div className={`ml-4 mt-0.5 ${step >= 0 ? 'text-cyan-300' : 'text-slate-600'}`}>print(fruit)</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 mb-4 text-sm text-slate-600 leading-relaxed flex-1">
              {isFinished
                ? '✅ วน loop ครบทุกรายการในลิสต์แล้ว!'
                : step === -1
                ? 'กดปุ่ม "ถัดไป" เพื่อเริ่มวน loop ทีละรอบ'
                : `กำลังประมวลผล: รอบที่ ${step + 1} จากทั้งหมด ${FRUITS.length} รอบ`}
            </div>
            <div className="flex gap-2">
              <button onClick={next} disabled={isFinished}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
                <ArrowRight size={16} /> ถัดไป
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
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">python for_loop.py</span>
            </div>
            <button onClick={reset} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-green-400 mr-2">{">>>"}</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
