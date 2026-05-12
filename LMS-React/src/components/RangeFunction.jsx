import { useState } from 'react';

export default function RangeFunction() {
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(10);
  const [step, setStep] = useState(2);
  const result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) { if (result.length < 20) result.push(i); }
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🎯 ฟังก์ชัน range()</h3>
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center"><label className="text-xs text-gray-500">start</label><input type="number" value={start} onChange={e => setStart(+e.target.value)} className="block w-16 text-center font-bold border-2 border-indigo-300 rounded-lg p-1" /></div>
        <div className="text-center"><label className="text-xs text-gray-500">stop</label><input type="number" value={stop} onChange={e => setStop(+e.target.value)} className="block w-16 text-center font-bold border-2 border-indigo-300 rounded-lg p-1" /></div>
        <div className="text-center"><label className="text-xs text-gray-500">step</label><input type="number" value={step} onChange={e => setStep(+e.target.value || 1)} className="block w-16 text-center font-bold border-2 border-indigo-300 rounded-lg p-1" /></div>
      </div>
      <div className="bg-slate-900 rounded-2xl p-4 font-mono text-sm text-center mb-4">
        <span className="text-pink-400">for</span> <span className="text-green-400">i</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">range({start}, {stop}, {step})</span>:
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {result.map((n, i) => (
          <div key={i} className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg border-2 border-indigo-200">{n}</div>
        ))}
        {result.length === 0 && <span className="text-gray-400 text-sm">ไม่มีผลลัพธ์ (range ว่าง)</span>}
      </div>
      <div className="mt-3 text-xs text-gray-500 text-center">จำนวนรอบ: {result.length} | ⚠️ range ไม่รวมค่า stop</div>
    </div>
  );
}
