import React, { useState } from 'react';

const sections = [
  { title: '1. ปก / README', icon: '📄', content: '# ระบบ Mini POS\nผู้จัดทำ: นายสมชาย ใจดี\nรหัส: 65310001\nวิชา: การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น' },
  { title: '2. คำอธิบายโปรแกรม', icon: '📋', content: '## จุดประสงค์\nจำลองระบบแคชเชียร์ร้านค้าขนาดเล็ก\n\n## ฟีเจอร์\n- เพิ่ม/ลบสินค้าจากตะกร้า\n- คำนวณส่วนลดอัตโนมัติ\n- แสดงใบเสร็จ' },
  { title: '3. วิธีติดตั้ง', icon: '⚙️', content: '## ความต้องการ\n- Python 3.10+\n\n## ติดตั้ง\n```\npip install -r requirements.txt\npython main.py\n```' },
  { title: '4. วิธีใช้งาน', icon: '📖', content: '1. รันโปรแกรม\n2. เลือก 1 เพิ่มสินค้า\n3. เลือก 2 ดูตะกร้า\n4. เลือก 3 ชำระเงิน\n5. เลือก 0 ออกจากโปรแกรม' },
];

export default function DocGenerator() {
  const [active, setActive] = useState(0);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📑 การจัดทำเอกสารประกอบโปรแกรม</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดดูแต่ละส่วนของเอกสารที่ควรมี</p>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {sections.map((s, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${active === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>{s.icon} {s.title}</button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h4 className="text-lg font-bold text-gray-800 mb-3">{sections[active].icon} {sections[active].title}</h4>
        <pre className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">{sections[active].content}</pre>
      </div>
      <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 text-center">
        💡 เอกสารที่ดีช่วยให้คนอื่น (และตัวเราในอนาคต) เข้าใจโปรแกรมได้ง่าย ควรเขียนไปพร้อมกับการพัฒนา
      </div>
    </div>
  );
}
