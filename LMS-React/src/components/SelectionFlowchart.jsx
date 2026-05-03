import React, { useState } from 'react';

export default function SelectionFlowchart() {
  const [score, setScore] = useState(65);
  const passed = score >= 50;

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔀 ผังงานแบบมีทางเลือก (Selection)</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ใช้เมื่อต้องตัดสินใจ — ผลลัพธ์จะแยกเป็น 2 ทาง (Yes / No)</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="px-6 py-3 bg-rose-500 text-white font-bold rounded-full text-sm">START</div>
          <div className="text-gray-400">↓</div>
          <div className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl text-sm">READ score</div>
          <div className="text-gray-400">↓</div>
          <div className={`px-6 py-4 font-bold text-sm text-center rotate-45 w-36 h-36 flex items-center justify-center border-4 ${passed ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-amber-100 border-amber-400 text-amber-800'}`}>
            <span className="-rotate-45">score ≥ 50 ?</span>
          </div>
          <div className="flex gap-12 mt-2">
            <div className="flex flex-col items-center">
              <span className={`text-xs font-bold ${passed ? 'text-green-600' : 'text-gray-400'}`}>Yes ✓</span>
              <div className={`px-4 py-2 rounded-xl text-sm font-bold mt-1 ${passed ? 'bg-green-500 text-white ring-4 ring-green-300' : 'bg-green-200 text-green-600 opacity-50'}`}>PRINT "ผ่าน"</div>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-xs font-bold ${!passed ? 'text-red-600' : 'text-gray-400'}`}>No ✗</span>
              <div className={`px-4 py-2 rounded-xl text-sm font-bold mt-1 ${!passed ? 'bg-red-500 text-white ring-4 ring-red-300' : 'bg-red-200 text-red-600 opacity-50'}`}>PRINT "ไม่ผ่าน"</div>
            </div>
          </div>
          <div className="text-gray-400 mt-2">↓</div>
          <div className="px-6 py-3 bg-rose-500 text-white font-bold rounded-full text-sm">STOP</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <p className="font-bold text-sm text-slate-700 mb-3">🎮 ลองเปลี่ยนคะแนน:</p>
          <div className="flex items-center gap-3 mb-4">
            <input type="range" min="0" max="100" value={score} onChange={e => setScore(+e.target.value)} className="flex-1 accent-indigo-500" />
            <span className="text-2xl font-bold text-indigo-600 w-12 text-right">{score}</span>
          </div>
          <div className={`rounded-xl p-4 text-center text-lg font-bold ${passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {passed ? '✅ ผ่าน (score ≥ 50)' : '❌ ไม่ผ่าน (score < 50)'}
          </div>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mt-4">
            <div className="text-purple-400">score = {score}</div>
            <div className="text-pink-400">if score &gt;= 50:</div>
            {passed ? <div className="ml-4 text-yellow-300">print("ผ่าน")</div> : <div className="ml-4 text-slate-600"># ไม่เข้าเงื่อนไข</div>}
            <div className="text-pink-400">else:</div>
            {!passed ? <div className="ml-4 text-yellow-300">print("ไม่ผ่าน")</div> : <div className="ml-4 text-slate-600"># ไม่เข้าเงื่อนไข</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
