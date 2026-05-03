import React, { useState } from 'react';

const examples = [
  { code: 'print("Hello", "World")', output: 'Hello World', note: 'sep เริ่มต้นคือช่องว่าง' },
  { code: 'print("A", "B", sep="-")', output: 'A-B', note: 'เปลี่ยน sep เป็น -' },
  { code: 'print("Hello", end="!\\n")', output: 'Hello!', note: 'เปลี่ยน end จาก \\n เป็น !' },
  { code: 'print(f"ราคา {100*1.07:.2f} บาท")', output: 'ราคา 107.00 บาท', note: 'f-string จัดทศนิยม 2 ตำแหน่ง' },
  { code: 'print(f"{"Python":>10}")', output: '    Python', note: 'จัดชิดขวา 10 ตำแหน่ง' },
];

export default function PrintFormat() {
  const [active, setActive] = useState(0);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🖨️ การจัดรูปแบบ print()</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดดูรูปแบบต่างๆ ของคำสั่ง print</p>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {examples.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${active === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>รูปแบบ {i + 1}</button>
        ))}
      </div>
      <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm max-w-lg mx-auto">
        <div className="text-green-400 mb-3">{examples[active].code}</div>
        <div className="border-t border-slate-700 pt-3">
          <span className="text-slate-500 text-xs">Output:</span>
          <div className="text-yellow-300 text-lg mt-1">{examples[active].output}</div>
        </div>
      </div>
      <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 text-center max-w-lg mx-auto">
        💡 {examples[active].note}
      </div>
    </div>
  );
}
