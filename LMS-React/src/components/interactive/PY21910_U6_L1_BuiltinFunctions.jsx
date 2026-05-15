import { useState } from 'react';

const builtins = [
  { name: 'len()', desc: 'นับจำนวนสมาชิก', example: 'len([1,2,3])', result: '3' },
  { name: 'type()', desc: 'ตรวจชนิดข้อมูล', example: 'type(3.14)', result: "<class 'float'>" },
  { name: 'int()', desc: 'แปลงเป็นจำนวนเต็ม', example: 'int("42")', result: '42' },
  { name: 'float()', desc: 'แปลงเป็นทศนิยม', example: 'float("3.14")', result: '3.14' },
  { name: 'str()', desc: 'แปลงเป็นข้อความ', example: 'str(100)', result: '"100"' },
  { name: 'max()', desc: 'หาค่ามากสุด', example: 'max(3,7,1)', result: '7' },
  { name: 'min()', desc: 'หาค่าน้อยสุด', example: 'min(3,7,1)', result: '1' },
  { name: 'sum()', desc: 'หาผลรวม', example: 'sum([1,2,3])', result: '6' },
  { name: 'abs()', desc: 'หาค่าสัมบูรณ์', example: 'abs(-5)', result: '5' },
  { name: 'round()', desc: 'ปัดเศษ', example: 'round(3.567,1)', result: '3.6' },
  { name: 'sorted()', desc: 'เรียงลำดับ', example: 'sorted([3,1,2])', result: '[1,2,3]' },
  { name: 'input()', desc: 'รับข้อมูลจากผู้ใช้', example: 'input("ชื่อ: ")', result: '(รอผู้ใช้พิมพ์)' },
];

export default function PY21910_U6_L1_BuiltinFunctions() {
  const [search, setSearch] = useState('');
  const filtered = builtins.filter(b => b.name.includes(search) || b.desc.includes(search));
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🧰 ฟังก์ชันมาตรฐาน (Built-in Functions)</h3>
      <div className="flex justify-center mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="border-2 border-indigo-300 rounded-xl px-4 py-2 text-sm w-64" placeholder="🔍 ค้นหาฟังก์ชัน..." />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((b, i) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all">
            <div className="font-mono font-bold text-indigo-600 text-sm">{b.name}</div>
            <div className="text-xs text-gray-500 mt-1">{b.desc}</div>
            <div className="bg-slate-900 rounded-lg p-2 mt-2 font-mono text-xs">
              <div className="text-green-400">{b.example}</div>
              <div className="text-yellow-300">→ {b.result}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
