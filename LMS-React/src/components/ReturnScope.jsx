import React, { useState } from 'react';

export default function ReturnScope() {
  const [tab, setTab] = useState('return');
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">↩️ return & ขอบเขตตัวแปร</h3>
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setTab('return')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'return' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>return</button>
        <button onClick={() => setTab('scope')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'scope' ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>Local vs Global</button>
      </div>
      {tab === 'return' ? (
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-pink-400">def <span className="text-yellow-300">add</span>(a, b):</div>
          <div className="ml-4 text-green-400">result = a + b</div>
          <div className="ml-4 text-blue-400">return result  <span className="text-slate-500"># ส่งค่ากลับ</span></div>
          <div className="mt-3 text-yellow-300">total = add(3, 5)</div>
          <div className="text-yellow-300">print(total)  <span className="text-slate-500"># → 8</span></div>
          <div className="mt-4 bg-blue-50 text-blue-700 rounded-xl p-3 text-xs font-sans">
            💡 ถ้าไม่มี <code>return</code> ฟังก์ชันจะ return <code>None</code> โดยอัตโนมัติ
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-green-400">x = <span className="text-yellow-300">"Global"</span> <span className="text-slate-500"># ตัวแปร Global</span></div>
          <div className="mt-2 text-pink-400">def <span className="text-yellow-300">test</span>():</div>
          <div className="ml-4 text-green-400">x = <span className="text-yellow-300">"Local"</span> <span className="text-slate-500"># ตัวแปร Local</span></div>
          <div className="ml-4 text-green-400">print(x) <span className="text-slate-500"># → "Local"</span></div>
          <div className="mt-2 text-yellow-300">test()</div>
          <div className="text-yellow-300">print(x) <span className="text-slate-500"># → "Global" (ไม่เปลี่ยน!)</span></div>
          <div className="mt-4 bg-amber-50 text-amber-700 rounded-xl p-3 text-xs font-sans">
            ⚠️ ตัวแปรที่สร้างภายในฟังก์ชัน (Local) จะหายไปเมื่อฟังก์ชันทำงานเสร็จ ไม่กระทบตัวแปรภายนอก (Global)
          </div>
        </div>
      )}
    </div>
  );
}
