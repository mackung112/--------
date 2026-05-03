import React, { useState } from 'react';

const examples = [
  { pseudo: 'START\nREAD name\nPRINT "Hello, " + name\nSTOP', python: '# เริ่มต้น\nname = input("ชื่อ: ")\nprint("Hello, " + name)\n# จบ', title: 'ทักทาย' },
  { pseudo: 'START\nREAD price, qty\nCOMPUTE total = price × qty\nPRINT total\nSTOP', python: '# เริ่มต้น\nprice = float(input("ราคา: "))\nqty = int(input("จำนวน: "))\ntotal = price * qty\nprint(total)\n# จบ', title: 'คำนวณราคา' },
];

export default function PseudocodeIntro() {
  const [active, setActive] = useState(0);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📝 รหัสเทียม (Pseudocode) คืออะไร?</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">เทียบให้เห็น: รหัสเทียม (ซ้าย) vs โค้ด Python จริง (ขวา)</p>
      <div className="flex justify-center gap-3 mb-4">
        {examples.map((e, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${active === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>ตัวอย่าง: {e.title}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-indigo-200 overflow-hidden">
          <div className="bg-indigo-50 text-indigo-700 text-xs font-bold px-4 py-2 border-b border-indigo-200">📋 Pseudocode (รหัสเทียม)</div>
          <pre className="bg-slate-900 p-4 text-indigo-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">{examples[active].pseudo}</pre>
        </div>
        <div className="rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 border-b border-emerald-200">🐍 Python Code</div>
          <pre className="bg-slate-900 p-4 text-emerald-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">{examples[active].python}</pre>
        </div>
      </div>
    </div>
  );
}
