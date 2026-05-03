import React, { useState } from 'react';

export default function PseudocodeCondition() {
  const [age, setAge] = useState(20);
  const canVote = age >= 18;
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔀 IF...THEN...ELSE ในรหัสเทียม</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ลองเปลี่ยนค่าอายุ แล้วดูว่ารหัสเทียมจะเลือกทางไหน</p>
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-sm font-bold text-gray-700">อายุ:</span>
        <input type="range" min="1" max="60" value={age} onChange={e => setAge(+e.target.value)} className="w-48 accent-indigo-500" />
        <span className="text-2xl font-bold text-indigo-600">{age}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-indigo-200 overflow-hidden">
          <div className="bg-indigo-50 text-indigo-700 text-xs font-bold px-4 py-2">📋 Pseudocode</div>
          <div className="bg-slate-900 p-4 font-mono text-sm leading-loose">
            <div className="text-rose-400">START</div>
            <div className="text-green-400">  READ age</div>
            <div className={`${canVote ? 'text-yellow-300' : 'text-slate-600'}`}>  IF age &gt;= 18 THEN</div>
            <div className={`ml-4 ${canVote ? 'text-yellow-300 font-bold' : 'text-slate-600'}`}>PRINT "มีสิทธิ์เลือกตั้ง"</div>
            <div className={`${!canVote ? 'text-yellow-300' : 'text-slate-600'}`}>  ELSE</div>
            <div className={`ml-4 ${!canVote ? 'text-yellow-300 font-bold' : 'text-slate-600'}`}>PRINT "ยังไม่มีสิทธิ์"</div>
            <div className="text-slate-500">  ENDIF</div>
            <div className="text-rose-400">STOP</div>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2">🐍 Python</div>
          <div className="bg-slate-900 p-4 font-mono text-sm leading-loose">
            <div className="text-purple-400">age = int(input("อายุ: "))</div>
            <div className={`text-pink-400`}>if age &gt;= 18:</div>
            <div className={`ml-4 ${canVote ? 'text-green-400 font-bold' : 'text-slate-600'}`}>print("มีสิทธิ์เลือกตั้ง")</div>
            <div className="text-pink-400">else:</div>
            <div className={`ml-4 ${!canVote ? 'text-red-400 font-bold' : 'text-slate-600'}`}>print("ยังไม่มีสิทธิ์")</div>
          </div>
        </div>
      </div>
      <div className={`mt-4 p-4 rounded-2xl text-center font-bold ${canVote ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        ผลลัพธ์: {canVote ? '✅ มีสิทธิ์เลือกตั้ง' : '❌ ยังไม่มีสิทธิ์เลือกตั้ง'}
      </div>
    </div>
  );
}
