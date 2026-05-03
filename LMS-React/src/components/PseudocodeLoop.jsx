import React, { useState } from 'react';

export default function PseudocodeLoop() {
  const [n, setN] = useState(5);
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);

  const reset = () => { setStep(0); setLogs([]); };
  const run = () => {
    const newLogs = ['START', 'SET i = 1'];
    for (let i = 1; i <= n; i++) newLogs.push(`WHILE ${i} <= ${n} DO → PRINT ${i}`);
    newLogs.push(`i = ${n + 1} > ${n} → ออกจาก loop`, 'STOP');
    setLogs(newLogs);
    setStep(1);
  };

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔄 WHILE...DO ในรหัสเทียม</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดรันเพื่อดูการทำงานทีละรอบ</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-sm font-bold">N =</span>
        <input type="range" min="1" max="10" value={n} onChange={e => { setN(+e.target.value); reset(); }} className="w-40 accent-indigo-500" />
        <span className="text-xl font-bold text-indigo-600">{n}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-indigo-200 overflow-hidden">
          <div className="bg-indigo-50 text-indigo-700 text-xs font-bold px-4 py-2">📋 Pseudocode</div>
          <div className="bg-slate-900 p-4 font-mono text-sm leading-loose text-indigo-300">
            <div className="text-rose-400">START</div>
            <div>  SET i = 1</div>
            <div className="text-amber-400">  WHILE i &lt;= {n} DO</div>
            <div className="ml-4">PRINT i</div>
            <div className="ml-4">SET i = i + 1</div>
            <div className="text-amber-400">  ENDWHILE</div>
            <div className="text-rose-400">STOP</div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <button onClick={step === 0 ? run : reset} className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-all mb-3">
            {step === 0 ? '▶ รัน' : '🔄 ใหม่'}
          </button>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-green-400 max-h-[200px] overflow-y-auto">
            {logs.length === 0 ? <span className="text-slate-500">กดรัน</span> : logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
