import React, { useState } from 'react';

export default function ArithmeticOps() {
  const [a, setA] = useState(17);
  const [b, setB] = useState(5);
  const ops = [
    { sym: '+', name: 'บวก (Addition)', result: a + b },
    { sym: '-', name: 'ลบ (Subtraction)', result: a - b },
    { sym: '*', name: 'คูณ (Multiplication)', result: a * b },
    { sym: '/', name: 'หาร (Division)', result: b !== 0 ? (a / b).toFixed(4) : 'Error' },
    { sym: '//', name: 'หารปัดลง (Floor)', result: b !== 0 ? Math.floor(a / b) : 'Error' },
    { sym: '%', name: 'เศษ (Modulo)', result: b !== 0 ? ((a % b) + Math.abs(b)) % Math.abs(b) : 'Error' },
    { sym: '**', name: 'ยกกำลัง (Power)', result: Math.pow(a, Math.min(b, 15)) },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🧮 ตัวดำเนินการทางคณิตศาสตร์</h3>
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center"><label className="text-xs text-gray-500">a</label><input type="number" value={a} onChange={e => setA(+e.target.value)} className="block w-20 text-center text-xl font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
        <div className="text-center"><label className="text-xs text-gray-500">b</label><input type="number" value={b} onChange={e => setB(+e.target.value)} className="block w-20 text-center text-xl font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
      </div>
      <div className="space-y-2">
        {ops.map((op, i) => (
          <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span className="font-mono text-lg font-bold text-indigo-600 w-10 text-center">{op.sym}</span>
            <span className="text-xs text-gray-500 flex-1">{op.name}</span>
            <code className="text-sm text-gray-700">{a} {op.sym} {b}</code>
            <span className="text-sm text-gray-400">=</span>
            <span className="text-lg font-bold text-emerald-600 min-w-[60px] text-right">{op.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
