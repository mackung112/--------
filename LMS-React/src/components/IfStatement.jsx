import React, { useState } from 'react';

export default function IfStatement() {
  const [temp, setTemp] = useState(38);
  const hasFever = temp >= 37.5;
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🌡️ เงื่อนไข if</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ลองเปลี่ยนอุณหภูมิเพื่อดูผล</p>
      <div className="flex justify-center items-center gap-3 mb-6">
        <input type="range" min="35" max="42" step="0.1" value={temp} onChange={e => setTemp(+e.target.value)} className="w-48 accent-red-500" />
        <span className={`text-3xl font-bold ${hasFever ? 'text-red-600' : 'text-green-600'}`}>{temp}°C</span>
      </div>
      <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm max-w-md mx-auto">
        <div className="text-purple-400">temp = {temp}</div>
        <div className={`text-pink-400 ${hasFever ? 'font-bold' : ''}`}>if temp &gt;= 37.5:</div>
        <div className={`ml-4 ${hasFever ? 'text-yellow-300' : 'text-slate-600'}`}>print("มีไข้! ควรไปพบแพทย์")</div>
      </div>
      {hasFever && <div className="mt-3 bg-red-100 text-red-700 rounded-xl p-3 text-center font-bold text-sm max-w-md mx-auto">🤒 มีไข้! ควรไปพบแพทย์</div>}
    </div>
  );
}
