import { useState } from 'react';

export default function AssignmentOps() {
  const [x, setX] = useState(10);
  const ops = [
    { sym: '=', code: 'x = 10', result: 10, desc: 'กำหนดค่า' },
    { sym: '+=', code: `x += 3`, result: x + 3, desc: 'บวกแล้วเก็บ (x = x + 3)' },
    { sym: '-=', code: `x -= 3`, result: x - 3, desc: 'ลบแล้วเก็บ (x = x - 3)' },
    { sym: '*=', code: `x *= 2`, result: x * 2, desc: 'คูณแล้วเก็บ (x = x * 2)' },
    { sym: '/=', code: `x /= 2`, result: (x / 2).toFixed(1), desc: 'หารแล้วเก็บ (x = x / 2)' },
    { sym: '//=', code: `x //= 3`, result: Math.floor(x / 3), desc: 'หารปัดลงแล้วเก็บ' },
    { sym: '%=', code: `x %= 3`, result: x % 3, desc: 'หาเศษแล้วเก็บ' },
    { sym: '**=', code: `x **= 2`, result: x * x, desc: 'ยกกำลังแล้วเก็บ' },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📌 ตัวดำเนินการกำหนดค่า</h3>
      <div className="flex justify-center gap-2 mb-4">
        <span className="text-sm text-gray-600">ค่าเริ่มต้น x =</span>
        <input type="number" value={x} onChange={e => setX(+e.target.value)} className="w-20 text-center font-bold border-2 border-indigo-300 rounded-lg p-1" />
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {ops.map((op, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-3 py-2 rounded-xl font-mono font-bold text-sm transition-all ${active === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>{op.sym}</button>
        ))}
      </div>
      <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm max-w-md mx-auto">
        <div className="text-purple-400">x = {x}</div>
        <div className="text-green-400 mt-1">{ops[active].code}</div>
        <div className="text-yellow-300 mt-2">x → {ops[active].result}</div>
        <div className="text-slate-400 text-xs mt-2"># {ops[active].desc}</div>
      </div>
    </div>
  );
}
