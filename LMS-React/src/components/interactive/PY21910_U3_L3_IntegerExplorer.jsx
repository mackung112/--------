import { useState } from 'react';

export default function PY21910_U3_L3_IntegerExplorer() {
  const [a, setA] = useState(10);
  const [b, setB] = useState(3);
  const ops = [
    { sym: '+', result: a + b, name: 'บวก' },
    { sym: '-', result: a - b, name: 'ลบ' },
    { sym: '*', result: a * b, name: 'คูณ' },
    { sym: '//', result: Math.floor(a / b), name: 'หารปัดทิ้ง' },
    { sym: '%', result: ((a % b) + b) % b, name: 'หารเอาเศษ' },
    { sym: '**', result: Math.pow(a, Math.min(b, 10)), name: 'ยกกำลัง' },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔢 สำรวจจำนวนเต็ม (Integer)</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ลองเปลี่ยนค่า a และ b เพื่อดูผลลัพธ์การคำนวณ</p>
      <div className="flex justify-center gap-6 mb-6">
        <div className="text-center">
          <label className="text-xs text-gray-500">a =</label>
          <input type="number" value={a} onChange={e => setA(+e.target.value || 0)} className="block w-24 text-center text-2xl font-bold border-2 border-indigo-300 rounded-xl p-2 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="text-center">
          <label className="text-xs text-gray-500">b =</label>
          <input type="number" value={b} onChange={e => setB(+e.target.value || 1)} className="block w-24 text-center text-2xl font-bold border-2 border-indigo-300 rounded-xl p-2 focus:outline-none focus:border-indigo-500" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ops.map((op, i) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">{op.name}</div>
            <div className="font-mono text-sm text-gray-700">{a} {op.sym} {b}</div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">{op.result}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
        💡 <code>type({a})</code> → <strong>&lt;class 'int'&gt;</strong> — จำนวนเต็มใน Python ไม่มีขีดจำกัดขนาด!
      </div>
    </div>
  );
}
