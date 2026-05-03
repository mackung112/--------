import React, { useState } from 'react';

const keywords = [
  { word: 'START', desc: 'กำหนดจุดเริ่มต้นของอัลกอริทึม', example: 'START', color: 'bg-rose-100 text-rose-700' },
  { word: 'STOP', desc: 'กำหนดจุดสิ้นสุดของอัลกอริทึม', example: 'STOP', color: 'bg-rose-100 text-rose-700' },
  { word: 'READ', desc: 'อ่านข้อมูลเข้าจากผู้ใช้ (input)', example: 'READ name', color: 'bg-green-100 text-green-700' },
  { word: 'COMPUTE', desc: 'คำนวณหรือประมวลผล (process)', example: 'COMPUTE total = price × qty', color: 'bg-blue-100 text-blue-700' },
  { word: 'PRINT', desc: 'แสดงผลลัพธ์ออกทางหน้าจอ (output)', example: 'PRINT "ผลรวม = ", total', color: 'bg-amber-100 text-amber-700' },
  { word: 'SET', desc: 'กำหนดค่าเริ่มต้นให้ตัวแปร', example: 'SET count = 0', color: 'bg-purple-100 text-purple-700' },
];

export default function PseudocodeKeywords() {
  const [active, setActive] = useState(null);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔑 คำหลัก (Keywords) ในรหัสเทียม</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดที่คำหลักแต่ละตัวเพื่อดูหน้าที่และตัวอย่าง</p>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {keywords.map((k, i) => (
          <button key={i} onClick={() => setActive(active === i ? null : i)} className={`px-5 py-3 rounded-2xl font-mono font-bold text-sm transition-all ${active === i ? k.color + ' scale-110 shadow-lg ring-2 ring-offset-2' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{k.word}</button>
        ))}
      </div>
      {active !== null && (
        <div className={`rounded-2xl p-6 border ${keywords[active].color}`}>
          <h4 className="font-bold text-lg mb-1 font-mono">{keywords[active].word}</h4>
          <p className="text-sm mb-3">{keywords[active].desc}</p>
          <div className="bg-white/60 rounded-xl p-3 font-mono text-sm">ตัวอย่าง: <strong>{keywords[active].example}</strong></div>
        </div>
      )}
    </div>
  );
}
