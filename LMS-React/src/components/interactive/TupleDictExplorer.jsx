import { useState } from 'react';

export default function TupleDictExplorer() {
  const [tab, setTab] = useState('tuple');
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📦 Tuple & Dictionary</h3>
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setTab('tuple')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'tuple' ? 'bg-purple-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>Tuple</button>
        <button onClick={() => setTab('dict')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'dict' ? 'bg-teal-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>Dictionary</button>
      </div>
      {tab === 'tuple' ? (
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-green-400">colors = ("red", "green", "blue")</div>
          <div className="text-purple-400 mt-2">colors[0] → "red"</div>
          <div className="text-purple-400">len(colors) → 3</div>
          <div className="text-red-400 mt-2"># colors[0] = "yellow"  ❌ ERROR!</div>
          <div className="text-slate-400 text-xs"># Tuple แก้ไขค่าไม่ได้ (Immutable)</div>
          <div className="mt-4 bg-amber-50 text-amber-700 rounded-xl p-3 text-xs font-sans">
            ⚠️ <strong>Tuple</strong> ใช้ <code>()</code> เหมือน List แต่แก้ไขค่าไม่ได้ เหมาะเก็บข้อมูลที่ไม่ต้องการเปลี่ยน เช่น พิกัด (x, y)
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-green-400">student = {'{'}</div>
          <div className="ml-4 text-green-400">"name": "สมชาย",</div>
          <div className="ml-4 text-green-400">"age": 18,</div>
          <div className="ml-4 text-green-400">"gpa": 3.45</div>
          <div className="text-green-400">{'}'}</div>
          <div className="text-purple-400 mt-2">student["name"] → "สมชาย"</div>
          <div className="text-purple-400">student.get("age") → 18</div>
          <div className="text-yellow-300 mt-2">student["phone"] = "0812345678"  ✅ เพิ่มได้</div>
          <div className="mt-4 bg-teal-50 text-teal-700 rounded-xl p-3 text-xs font-sans">
            💡 <strong>Dictionary</strong> เก็บข้อมูลแบบ Key-Value เข้าถึงข้อมูลด้วย Key แทน Index
          </div>
        </div>
      )}
    </div>
  );
}
