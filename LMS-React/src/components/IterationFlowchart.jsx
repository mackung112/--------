import React, { useState } from 'react';

export default function IterationFlowchart() {
  const [targetN, setTargetN] = useState(5);
  const [step, setStep] = useState(-1);
  const [i, setI] = useState(1);
  const [sum, setSum] = useState(0);
  const [logs, setLogs] = useState([]);

  const reset = () => { setStep(-1); setI(1); setSum(0); setLogs([]); };
  const nextStep = () => {
    if (step === -1) { setStep(0); setLogs(['START']); return; }
    if (step === 0) { setStep(1); setI(1); setSum(0); setLogs(l => [...l, 'i = 1, sum = 0']); return; }
    if (step === 1) {
      if (i <= targetN) {
        const newSum = sum + i;
        setLogs(l => [...l, `รอบ ${i}: sum = ${sum} + ${i} = ${newSum}`]);
        setSum(newSum);
        setI(i + 1);
      } else {
        setStep(2);
        setLogs(l => [...l, `i = ${i} > ${targetN} → ออกจาก loop`, `ผลรวม = ${sum}`]);
      }
      return;
    }
    reset();
  };

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔄 ผังงานแบบวนซ้ำ (Iteration)</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ทำซ้ำไปเรื่อยๆ จนกว่าเงื่อนไขจะเป็นเท็จ — ตัวอย่าง: หาผลรวม 1 ถึง N</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className={`px-6 py-2 rounded-full text-sm font-bold text-white ${step === 0 ? 'bg-rose-500 ring-4 ring-yellow-400' : 'bg-rose-400 opacity-60'}`}>START</div>
          <div className="text-gray-400">↓</div>
          <div className={`px-5 py-2 rounded-xl text-sm font-bold text-white ${step === 0 ? 'bg-blue-500 ring-4 ring-yellow-400' : 'bg-blue-400 opacity-60'}`}>i = 1, sum = 0</div>
          <div className="text-gray-400">↓</div>
          <div className={`w-28 h-28 rotate-45 border-4 flex items-center justify-center font-bold text-sm ${step === 1 ? 'bg-amber-100 border-amber-400 text-amber-800 ring-4 ring-yellow-400' : 'bg-amber-50 border-amber-300 text-amber-600 opacity-60'}`}>
            <span className="-rotate-45">i ≤ {targetN} ?</span>
          </div>
          <div className="flex gap-10 mt-1">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-green-600">Yes</span>
              <div className={`px-4 py-2 rounded-xl text-xs font-bold ${step === 1 && i <= targetN ? 'bg-blue-500 text-white ring-2 ring-yellow-400' : 'bg-blue-200 text-blue-600 opacity-50'}`}>sum += i, i += 1</div>
              <span className="text-xs text-gray-400">↰ กลับไปตรวจ</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-red-600">No</span>
              <div className={`px-4 py-2 rounded-xl text-xs font-bold ${step === 2 ? 'bg-green-500 text-white ring-2 ring-yellow-400' : 'bg-green-200 text-green-600 opacity-50'}`}>PRINT sum</div>
            </div>
          </div>
          <div className="text-gray-400 mt-1">↓</div>
          <div className={`px-6 py-2 rounded-full text-sm font-bold text-white ${step === 2 ? 'bg-rose-500 ring-4 ring-yellow-400' : 'bg-rose-400 opacity-60'}`}>STOP</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <label className="text-sm text-gray-600">เปลี่ยนค่า N:</label>
          <input type="range" min="1" max="10" value={targetN} onChange={e => { setTargetN(+e.target.value); reset(); }} className="w-full mb-3 accent-indigo-500" />
          <p className="text-sm mb-2 text-gray-700">หาผลรวม 1 ถึง <strong>{targetN}</strong></p>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-green-400 max-h-[200px] overflow-y-auto">
            {logs.length === 0 ? <span className="text-slate-500">กดปุ่มเริ่ม</span> : logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <button onClick={nextStep} className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-all">
            {step === -1 ? '▶ เริ่ม' : step === 2 ? '🔄 ใหม่' : '⏭ ถัดไป'}
          </button>
        </div>
      </div>
    </div>
  );
}
