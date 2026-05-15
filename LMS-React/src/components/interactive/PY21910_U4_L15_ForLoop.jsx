import { useState } from 'react';

export default function PY21910_U4_L15_ForLoop() {
  const [items] = useState(['🍎 แอปเปิ้ล', '🍌 กล้วย', '🍊 ส้ม', '🍇 องุ่น', '🍓 สตรอเบอร์รี่']);
  const [step, setStep] = useState(-1);

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔁 for loop</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดถัดไปเพื่อดูการวนลูปทีละรอบ</p>
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-purple-400">fruits = {JSON.stringify(items.map(i => i.split(' ')[1]))}</div>
          <div className="text-pink-400 mt-2">for fruit in fruits:</div>
          <div className="ml-4 text-green-400">print(fruit)</div>
        </div>
        <div>
          <div className="space-y-2 mb-4">
            {items.map((item, i) => (
              <div key={i} className={`p-3 rounded-xl text-sm font-bold transition-all ${step === i ? 'bg-indigo-500 text-white shadow-lg scale-105' : step > i ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                {step === i ? `🔹 รอบ ${i + 1}: ${item}` : step > i ? `✅ ${item}` : item}
              </div>
            ))}
          </div>
          <button onClick={() => setStep(step < items.length - 1 ? step + 1 : -1)} className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg">
            {step === -1 ? '▶ เริ่ม' : step < items.length - 1 ? '⏭ ถัดไป' : '🔄 ใหม่'}
          </button>
        </div>
      </div>
    </div>
  );
}
