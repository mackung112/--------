import React, { useState } from 'react';

export default function BooleanExplorer() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const ops = [
    { expr: 'a and b', result: a && b },
    { expr: 'a or b', result: a || b },
    { expr: 'not a', result: !a },
    { expr: 'not b', result: !b },
    { expr: 'a == b', result: a === b },
    { expr: 'a != b', result: a !== b },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔘 สำรวจตรรกศาสตร์ (Boolean)</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">สลับค่า True / False แล้วดูผลลัพธ์ของ and, or, not</p>
      <div className="flex justify-center gap-6 mb-6">
        <button onClick={() => setA(!a)} className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${a ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'}`}>
          a = {a ? 'True' : 'False'}
        </button>
        <button onClick={() => setB(!b)} className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${b ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'}`}>
          b = {b ? 'True' : 'False'}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ops.map((op, i) => (
          <div key={i} className={`rounded-2xl p-4 text-center border ${op.result ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="font-mono text-sm text-gray-600 mb-1">{op.expr}</div>
            <div className={`text-xl font-bold ${op.result ? 'text-green-600' : 'text-red-600'}`}>{op.result ? 'True' : 'False'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
