import { useState } from 'react';

export default function ComparisonOps() {
  const [a, setA] = useState(10);
  const [b, setB] = useState(5);
  const ops = [
    { sym: '==', name: 'เท่ากับ', result: a === b },
    { sym: '!=', name: 'ไม่เท่ากับ', result: a !== b },
    { sym: '>', name: 'มากกว่า', result: a > b },
    { sym: '<', name: 'น้อยกว่า', result: a < b },
    { sym: '>=', name: 'มากกว่าหรือเท่ากับ', result: a >= b },
    { sym: '<=', name: 'น้อยกว่าหรือเท่ากับ', result: a <= b },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">⚖️ ตัวดำเนินการเปรียบเทียบ</h3>
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center"><label className="text-xs text-gray-500">a</label><input type="number" value={a} onChange={e => setA(+e.target.value)} className="block w-20 text-center text-xl font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
        <div className="text-center"><label className="text-xs text-gray-500">b</label><input type="number" value={b} onChange={e => setB(+e.target.value)} className="block w-20 text-center text-xl font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ops.map((op, i) => (
          <div key={i} className={`rounded-2xl p-4 text-center border-2 transition-all ${op.result ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
            <div className="font-mono text-sm text-gray-600">{a} {op.sym} {b}</div>
            <div className={`text-xl font-bold mt-1 ${op.result ? 'text-green-600' : 'text-red-600'}`}>{op.result ? 'True' : 'False'}</div>
            <div className="text-xs text-gray-500 mt-1">{op.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
