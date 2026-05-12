import { useState } from 'react';

export default function BitwiseOps() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(10);
  const toBin = n => (n >>> 0).toString(2).padStart(8, '0');
  const ops = [
    { sym: '&', name: 'AND', result: a & b },
    { sym: '|', name: 'OR', result: a | b },
    { sym: '^', name: 'XOR', result: a ^ b },
    { sym: '~', name: 'NOT a', result: ~a },
    { sym: '<<', name: 'เลื่อนซ้าย 1', result: a << 1 },
    { sym: '>>', name: 'เลื่อนขวา 1', result: a >> 1 },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">⚡ ตัวดำเนินการระดับบิต (Bitwise)</h3>
      <div className="flex justify-center gap-4 mb-4">
        <div className="text-center"><label className="text-xs text-gray-500">a</label><input type="number" value={a} onChange={e => setA(+e.target.value)} className="block w-20 text-center font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
        <div className="text-center"><label className="text-xs text-gray-500">b</label><input type="number" value={b} onChange={e => setB(+e.target.value)} className="block w-20 text-center font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
      </div>
      <div className="flex justify-center gap-6 mb-4 text-xs font-mono">
        <span>a = <span className="text-indigo-600">{toBin(a)}</span> ({a})</span>
        <span>b = <span className="text-indigo-600">{toBin(b)}</span> ({b})</span>
      </div>
      <div className="space-y-2">
        {ops.map((op, i) => (
          <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span className="font-mono font-bold text-indigo-600 w-8 text-center">{op.sym}</span>
            <span className="text-xs text-gray-500 w-24">{op.name}</span>
            <span className="font-mono text-xs text-slate-600 flex-1">{toBin(op.result)}</span>
            <span className="font-bold text-emerald-600">= {op.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
