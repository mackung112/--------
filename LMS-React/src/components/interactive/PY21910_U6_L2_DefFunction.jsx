import { useState } from 'react';

export default function PY21910_U6_L2_DefFunction() {
  const [name, setName] = useState('สมชาย');
  const [times, setTimes] = useState(3);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🏗️ สร้างฟังก์ชันด้วย def</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ลองเปลี่ยนค่า Parameter แล้วดูผลลัพธ์</p>
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center"><label className="text-xs text-gray-500">name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="block w-32 text-center font-bold border-2 border-indigo-300 rounded-xl p-2 text-sm" /></div>
        <div className="text-center"><label className="text-xs text-gray-500">times</label><input type="number" min="1" max="10" value={times} onChange={e => setTimes(Math.min(10, +e.target.value))} className="block w-20 text-center font-bold border-2 border-indigo-300 rounded-xl p-2 text-sm" /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-slate-500"># นิยามฟังก์ชัน</div>
          <div className="text-pink-400">def <span className="text-yellow-300">greet</span>(name, times=1):</div>
          <div className="ml-4 text-green-400">for i in range(times):</div>
          <div className="ml-8 text-green-400">print(f"สวัสดี {'{'}name{'}'}")</div>
          <div className="mt-4 text-slate-500"># เรียกใช้งาน</div>
          <div className="text-yellow-300">greet("{name}", {times})</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-gray-500 mb-2">🖥️ Output:</p>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-yellow-300">
            {Array.from({ length: Math.min(times, 10) }, (_, i) => (
              <div key={i}>สวัสดี {name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
