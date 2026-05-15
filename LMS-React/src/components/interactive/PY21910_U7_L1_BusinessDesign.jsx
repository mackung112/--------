import { useState } from 'react';

const principles = [
  { title: 'ใช้ฟังก์ชันแยกงาน', desc: 'แบ่งโปรแกรมเป็นฟังก์ชันย่อย แต่ละฟังก์ชันทำงาน 1 อย่าง', icon: '🧩', good: 'def calc_tax(price):\n    return price * 0.07', bad: '# เขียนยาวๆ ไม่แบ่งฟังก์ชัน\ntax = price * 0.07\nprint(tax)' },
  { title: 'ตรวจสอบข้อมูล Input', desc: 'ก่อนนำข้อมูลไปใช้ ต้องตรวจสอบว่าถูกต้องเสมอ', icon: '🛡️', good: 'if price > 0:\n    process(price)\nelse:\n    print("ราคาต้อง > 0")', bad: 'process(price)\n# ถ้า price = -5 จะพัง!' },
  { title: 'ตั้งชื่อตัวแปรสื่อความหมาย', desc: 'ชื่อตัวแปรต้องบอกได้ว่าเก็บข้อมูลอะไร', icon: '📛', good: 'total_price = price * qty\ndiscount_rate = 0.1', bad: 'x = p * q\nd = 0.1' },
  { title: 'เขียน Comment อธิบาย', desc: 'อธิบายตรรกะที่ซับซ้อน ไม่ใช่อธิบายทุกบรรทัด', icon: '📝', good: '# คิดส่วนลดถ้าซื้อเกิน 1000\nif total > 1000:\n    discount = total * 0.1', bad: '# กำหนดค่า x เป็น 10\nx = 10  # ไม่จำเป็น!' },
];

export default function PY21910_U7_L1_BusinessDesign() {
  const [active, setActive] = useState(0);
  const p = principles[active];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">💼 หลักการออกแบบโปรแกรมทางธุรกิจ</h3>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {principles.map((pr, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${active === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>{pr.icon} {pr.title}</button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-gray-700 mb-4 text-sm">{p.desc}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-200 overflow-hidden">
            <div className="bg-green-50 text-green-700 text-xs font-bold px-4 py-2">✅ แนะนำ</div>
            <pre className="bg-slate-900 p-4 text-green-400 font-mono text-xs whitespace-pre-wrap">{p.good}</pre>
          </div>
          <div className="rounded-xl border border-red-200 overflow-hidden">
            <div className="bg-red-50 text-red-700 text-xs font-bold px-4 py-2">❌ ไม่แนะนำ</div>
            <pre className="bg-slate-900 p-4 text-red-400 font-mono text-xs whitespace-pre-wrap">{p.bad}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
