import React, { useState, useEffect, useRef } from 'react';
import { Hash, RotateCcw, Play } from 'lucide-react';

function makeRange(start, stop, step) {
  const result = [];
  if (step === 0) return result;
  if (step > 0) { for (let i = start; i < stop; i += step) { if (result.length >= 20) break; result.push(i); } }
  else { for (let i = start; i > stop; i += step) { if (result.length >= 20) break; result.push(i); } }
  return result;
}

export default function PY21910_U4_L16_RangeFunction() {
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(10);
  const [step, setStep] = useState(2);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'range() Function Explorer Ready.' },
  ]);
  const consoleRef = useRef(null);

  const result = makeRange(start, stop, step || 1);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runRange = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `list(range(${start}, ${stop}, ${step || 1}))` },
      { type: 'output',  text: `[${result.join(', ')}]` },
      { type: 'system',  text: `# ได้ ${result.length} ตัวเลข` },
    ]);
  };

  const clear = () => setConsoleHistory([{ type: 'system', text: 'range() Function Explorer Ready.' }]);

  const presets = [
    { label: 'range(5)',        start: 0, stop: 5,  step: 1 },
    { label: 'range(0, 10, 2)', start: 0, stop: 10, step: 2 },
    { label: 'range(10, 0, -2)',start:10, stop: 0,  step: -2 },
    { label: 'range(1, 100, 10)',start:1, stop:100, step:10 },
  ];

  const applyPreset = (p) => {
    setStart(p.start); setStop(p.stop); setStep(p.step);
    const r = makeRange(p.start, p.stop, p.step);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `list(${p.label})` },
      { type: 'output',  text: `[${r.join(', ')}]` },
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Hash size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">range() Function</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          <code className="bg-slate-200 px-1 rounded text-pink-600">range(start, stop, step)</code> สร้างลำดับตัวเลขเพื่อใช้ใน for loop — ค่า <strong>stop</strong> ไม่รวมในผลลัพธ์
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Preset buttons */}
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-3">ตัวอย่างที่ใช้บ่อย</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {presets.map((p, i) => (
                <button key={i} onClick={() => applyPreset(p)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-mono text-xs font-bold transition-all active:scale-95 border border-indigo-200">
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom controls */}
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-3">ปรับเองได้เลย</h4>
            <div className="flex gap-4 mb-4">
              {[['start', start, setStart], ['stop', stop, setStop], ['step', step, setStep]].map(([label, val, setter]) => (
                <div key={label} className="text-center flex-1">
                  <label className="text-xs text-slate-500 block mb-1 font-medium">{label}</label>
                  <input type="number" value={val}
                    onChange={e => setter(+e.target.value || (label === 'step' ? 1 : 0))}
                    className="w-full text-center font-bold border-2 border-indigo-300 rounded-xl p-2 focus:outline-none focus:border-indigo-500 text-lg" />
                </div>
              ))}
            </div>

            {/* Syntax display */}
            <div className="bg-slate-900 rounded-xl px-4 py-3 font-mono text-sm text-center mb-4">
              <span className="text-pink-400">for</span>{' '}
              <span className="text-green-400">i</span>{' '}
              <span className="text-pink-400">in</span>{' '}
              <span className="text-yellow-300">range({start}, {stop}, {step || 1})</span>:
            </div>

            {/* Number grid */}
            <div className="flex flex-wrap gap-2">
              {result.length > 0 ? result.map((n, i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg border-2 border-indigo-200 shadow-sm">
                  {n}
                </div>
              )) : (
                <span className="text-slate-400 text-sm">ไม่มีผลลัพธ์ (range ว่าง)</span>
              )}
            </div>
            {result.length > 0 && (
              <p className="text-xs text-slate-500 mt-3">
                จำนวนตัวเลข: <strong>{result.length}</strong> ตัว | ⚠️ ค่า stop ({stop}) ไม่รวมอยู่ในผลลัพธ์
              </p>
            )}
          </div>

          {/* Right: Controls */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">อธิบาย range()</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4">
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-indigo-600 shrink-0">start</span>
                  <span className="text-slate-600">ค่าเริ่มต้น (default = 0)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-pink-600 shrink-0">stop</span>
                  <span className="text-slate-600">ค่าสิ้นสุด (ไม่รวมค่านี้!)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-emerald-600 shrink-0">step</span>
                  <span className="text-slate-600">ก้าวกระโดด (default = 1) ใช้ค่าลบเพื่อนับถอยหลัง</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={runRange}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
                <Play size={16} className="fill-current" /> แปลงเป็น List
              </button>
              <button onClick={clear}
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
              <span className="text-slate-500 text-xs">python -i</span>
            </div>
            <button onClick={clear} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
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
