import { useState } from 'react';

export default function PY21910_U3_L4_FloatExplorer() {
  const [val, setVal] = useState('3.14');
  const num = parseFloat(val) || 0;
  const demos = [
    { label: 'round(x, 2)', result: num.toFixed(2) },
    { label: 'int(x)', result: Math.trunc(num) },
    { label: 'x * 2', result: (num * 2).toFixed(4) },
    { label: '0.1 + 0.2', result: (0.1 + 0.2).toFixed(17) },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔬 สำรวจทศนิยม (Float)</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ลองพิมพ์ค่าทศนิยมเพื่อดูพฤติกรรม</p>
      <div className="flex justify-center mb-6">
        <input type="text" value={val} onChange={e => setVal(e.target.value)} className="text-center text-2xl font-bold font-mono border-2 border-teal-300 rounded-xl p-3 w-40 focus:outline-none focus:border-teal-500" placeholder="3.14" />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {demos.map((d, i) => (
          <div key={i} className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
            <div className="font-mono text-xs text-teal-600 mb-1">{d.label}</div>
            <div className="text-xl font-bold text-teal-800">{d.result}</div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
        ⚠️ <strong>ข้อควรระวัง</strong>: 0.1 + 0.2 ใน Python ≠ 0.3 พอดี! เพราะ Float เก็บเป็นเลขฐาน 2 ซึ่งมีความคลาดเคลื่อนเล็กน้อย (Floating Point Precision)
      </div>
    </div>
  );
}
