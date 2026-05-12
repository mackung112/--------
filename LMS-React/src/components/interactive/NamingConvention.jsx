import { useState } from 'react';

const rules = [
  { id: 'start', rule: 'ต้องขึ้นต้นด้วยตัวอักษร (a-z, A-Z) หรือ _ (underscore)', good: 'student_name', bad: '1student', goodLabel: '✅ ถูก', badLabel: '❌ ผิด' },
  { id: 'chars', rule: 'ประกอบด้วยตัวอักษร ตัวเลข และ _ เท่านั้น (ห้ามเว้นวรรค ห้ามอักขระพิเศษ)', good: 'total_price_2', bad: 'total-price!', goodLabel: '✅ ถูก', badLabel: '❌ ผิด' },
  { id: 'case', rule: 'Python แยกแยะตัวพิมพ์เล็ก-ใหญ่ (Case Sensitive)', good: 'Name ≠ name ≠ NAME', bad: 'ทั้ง 3 เป็นคนละตัวแปร', goodLabel: '⚠️ ระวัง', badLabel: '📌 หมายเหตุ' },
  { id: 'reserved', rule: 'ห้ามใช้คำสงวน (Reserved Words) เช่น if, for, while, True', good: 'is_valid', bad: 'if = 10', goodLabel: '✅ ถูก', badLabel: '❌ ผิด' },
  { id: 'convention', rule: 'ใช้ snake_case สำหรับตัวแปรและฟังก์ชัน (มาตรฐาน PEP8)', good: 'student_age', bad: 'studentAge', goodLabel: '✅ แนะนำ', badLabel: '⚠️ ไม่แนะนำ' },
];

export default function NamingConvention() {
  const [active, setActive] = useState(0);
  const r = rules[active];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📛 กฎการตั้งชื่อตัวแปรใน Python</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดดูกฎแต่ละข้อพร้อมตัวอย่างที่ถูกและผิด</p>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {rules.map((r, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${active === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>กฎข้อ {i + 1}</button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-gray-800 font-bold mb-4">{r.rule}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <span className="text-xs font-bold text-green-700">{r.goodLabel}</span>
            <div className="font-mono text-lg font-bold text-green-800 mt-1">{r.good}</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <span className="text-xs font-bold text-red-700">{r.badLabel}</span>
            <div className="font-mono text-lg font-bold text-red-800 mt-1">{r.bad}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
