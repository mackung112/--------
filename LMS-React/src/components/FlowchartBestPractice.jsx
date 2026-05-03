import React, { useState } from 'react';

const good = [
  { text: 'มีจุดเริ่มต้น (START) และจุดสิ้นสุด (STOP) เพียงจุดเดียว', icon: '✅' },
  { text: 'เส้นลำดับงานมีทิศทางชัดเจน ไม่ย้อนกลับสับสน', icon: '✅' },
  { text: 'ใช้สัญลักษณ์มาตรฐานตาม ISO 5807', icon: '✅' },
  { text: 'ข้อความในสัญลักษณ์สั้น กระชับ เข้าใจง่าย', icon: '✅' },
];
const bad = [
  { text: 'เส้นลำดับงานตัดกันไปมาไม่เป็นระเบียบ', icon: '❌' },
  { text: 'ใช้สัญลักษณ์ผิดประเภท (เช่น ใช้สี่เหลี่ยมแทนเพชร)', icon: '❌' },
  { text: 'ไม่มี START หรือ STOP ทำให้ไม่รู้ว่าเริ่ม/จบตรงไหน', icon: '❌' },
  { text: 'เขียนรายละเอียดยาวเกินในสัญลักษณ์เดียว', icon: '❌' },
];

export default function FlowchartBestPractice() {
  const [tab, setTab] = useState('good');
  const items = tab === 'good' ? good : bad;
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📋 คุณลักษณะของผังงานที่ดี</h3>
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setTab('good')} className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${tab === 'good' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>✅ ผังงานที่ดี</button>
        <button onClick={() => setTab('bad')} className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${tab === 'bad' ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>❌ ข้อผิดพลาดที่พบบ่อย</button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border ${tab === 'good' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm text-gray-700 font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
