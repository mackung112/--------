import React, { useState } from 'react';

const symbols = [
  { id: 'terminal', name: 'เริ่มต้น/สิ้นสุด (Terminal)', shape: '⬮', desc: 'รูปวงรี ใช้แสดงจุดเริ่มต้นและจุดจบของโปรแกรม', example: 'START / STOP', color: 'bg-rose-100 text-rose-700 border-rose-300' },
  { id: 'process', name: 'กระบวนการ (Process)', shape: '▭', desc: 'รูปสี่เหลี่ยมผืนผ้า ใช้แสดงการประมวลผลหรือคำนวณ', example: 'total = price × qty', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'decision', name: 'ตัดสินใจ (Decision)', shape: '◇', desc: 'รูปสี่เหลี่ยมขนมเปียกปูน ใช้แสดงเงื่อนไขที่ต้องตัดสินใจ (ได้ Yes/No)', example: 'score >= 50 ?', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'io', name: 'นำเข้า/แสดงผล (Input/Output)', shape: '▱', desc: 'รูปสี่เหลี่ยมด้านขนาน ใช้แสดงการรับข้อมูลเข้าหรือแสดงผลข้อมูล', example: 'READ name / PRINT result', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 'connector', name: 'จุดเชื่อมต่อ (Connector)', shape: '●', desc: 'รูปวงกลมขนาดเล็ก ใช้เชื่อมต่อเส้นในผังงานที่มีขนาดใหญ่หรือข้ามหน้า', example: 'A, B, 1, 2', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'flow', name: 'เส้นลำดับงาน (Flow Line)', shape: '→', desc: 'ลูกศรบอกทิศทางลำดับการทำงาน จากบนลงล่าง หรือซ้ายไปขวา', example: '↓ →', color: 'bg-slate-100 text-slate-700 border-slate-300' },
];

export default function FlowchartSymbols() {
  const [active, setActive] = useState(null);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📐 สัญลักษณ์มาตรฐานของผังงาน</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">กดที่สัญลักษณ์แต่ละตัวเพื่อดูคำอธิบายและตัวอย่าง</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {symbols.map(s => (
          <button key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
            className={`rounded-2xl p-4 border-2 text-center transition-all ${active === s.id ? s.color + ' scale-105 shadow-lg' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
            <div className="text-4xl mb-2">{s.shape}</div>
            <div className="text-xs font-bold">{s.name}</div>
          </button>
        ))}
      </div>
      {active && (() => {
        const s = symbols.find(x => x.id === active);
        return (
          <div className={`rounded-2xl p-6 border-2 ${s.color} transition-all`}>
            <h4 className="font-bold text-lg mb-2">{s.shape} {s.name}</h4>
            <p className="text-sm mb-3">{s.desc}</p>
            <div className="bg-white/60 rounded-xl p-3 font-mono text-sm">ตัวอย่าง: {s.example}</div>
          </div>
        );
      })()}
    </div>
  );
}
