import React, { useState } from 'react';

export default function LogicalOps() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const rows = [
    { expr: `${a} and ${b}`, result: a && b, desc: 'ทั้งคู่ต้อง True' },
    { expr: `${a} or ${b}`, result: a || b, desc: 'อย่างน้อย 1 ตัว True' },
    { expr: `not ${a}`, result: !a, desc: 'กลับค่า a' },
    { expr: `not ${b}`, result: !b, desc: 'กลับค่า b' },
    { expr: `(${a} and ${b}) or (not ${b})`, result: (a && b) || !b, desc: 'ซ้อนเงื่อนไข' },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🧠 ตัวดำเนินการทางตรรกศาสตร์</h3>
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setA(!a)} className={`px-5 py-2 rounded-xl font-bold ${a ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>a = {String(a)}</button>
        <button onClick={() => setB(!b)} className={`px-5 py-2 rounded-xl font-bold ${b ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>b = {String(b)}</button>
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${r.result ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <code className="text-sm font-bold flex-1">{r.expr}</code>
            <span className={`font-bold ${r.result ? 'text-green-600' : 'text-red-600'}`}>{String(r.result)}</span>
            <span className="text-xs text-gray-500">{r.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
